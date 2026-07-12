import { searchSynonyms, stopWords, type SearchConcept } from "./searchSynonyms";

export interface ParsedVisualSearch {
  normalized: string;
  tokens: string[];
  concepts: SearchConcept[];
  phrases: string[];
}

export function normalizeSearchText(query: string) {
  return query
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function singularize(word: string) {
  if (word.length > 4 && word.endsWith("ies")) return `${word.slice(0, -3)}y`;
  if (word.length > 3 && word.endsWith("s")) return word.slice(0, -1);
  return word;
}

export function parseVisualSearch(query: string): ParsedVisualSearch {
  const normalized = normalizeSearchText(query);
  const rawTokens = normalized.split(" ").filter(Boolean);
  const tokens = Array.from(
    new Set(rawTokens.map(singularize).filter((token) => token.length > 1 && !stopWords.has(token)))
  );
  const concepts: SearchConcept[] = [];
  const phrases: string[] = [];

  for (const [concept, synonyms] of Object.entries(searchSynonyms) as Array<[SearchConcept, string[]]>) {
    const matched = synonyms.some((synonym) => {
      const cleanSynonym = normalizeSearchText(synonym);
      if (cleanSynonym.includes(" ")) {
        const hasPhrase = normalized.includes(cleanSynonym);
        if (hasPhrase) phrases.push(cleanSynonym);
        return hasPhrase;
      }

      return tokens.includes(singularize(cleanSynonym));
    });

    if (matched) concepts.push(concept);
  }

  return {
    normalized,
    tokens,
    concepts: Array.from(new Set(concepts)),
    phrases: Array.from(new Set(phrases))
  };
}

