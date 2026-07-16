import { useMemo, useState } from 'react';
import { FlatList, Image, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DestinationCard from '../components/DestinationCard';
import SectionHeader from '../components/SectionHeader';
import { Destination, destinations } from '../data/destinations';

type MatchResult = Destination & {
  score: number;
  reason: string;
};

const DEFAULT_PROMPT = 'I want a peaceful getaway with nature, wildlife and beautiful views.';

const promptAliases: Record<string, string[]> = {
  animal: ['wildlife', 'safari'],
  animals: ['wildlife', 'safari'],
  bird: ['birds', 'birding', 'nature'],
  birds: ['birds', 'birding', 'nature'],
  boating: ['boat', 'lake', 'water'],
  buffalo: ['buffalo', 'wildlife', 'safari'],
  cave: ['caves', 'rocks'],
  caves: ['caves', 'rocks'],
  cheetah: ['cheetahs', 'wildlife', 'sanctuary'],
  cheetahs: ['cheetahs', 'wildlife', 'sanctuary'],
  elephant: ['elephants', 'wildlife', 'safari'],
  elephants: ['elephants', 'wildlife', 'safari'],
  fishing: ['fishing', 'lake', 'water'],
  fish: ['fishing', 'lake', 'water'],
  history: ['history', 'heritage', 'culture'],
  lion: ['lions', 'wildlife', 'safari'],
  lions: ['lions', 'wildlife', 'safari'],
  mountain: ['mountains', 'hiking', 'cool'],
  mountains: ['mountains', 'hiking', 'cool'],
  quiet: ['quiet', 'relaxation', 'nature'],
  rhino: ['rhinos', 'wildlife', 'safari'],
  rhinos: ['rhinos', 'wildlife', 'safari'],
  ruins: ['ruins', 'heritage', 'history'],
  safari: ['wildlife', 'safari'],
  swim: ['water', 'lake'],
  swimming: ['water', 'lake'],
  waterfall: ['waterfalls', 'water', 'nature'],
  waterfalls: ['waterfalls', 'water', 'nature'],
  zebra: ['zebras', 'wildlife', 'safari'],
  zebras: ['zebras', 'wildlife', 'safari']
};

function tokenize(value: string) {
  const baseTerms = value
    .toLowerCase()
    .replace(/[’']/g, '')
    .split(/[^a-z0-9]+/)
    .filter((term) => term.length > 2);

  return Array.from(
    new Set(baseTerms.flatMap((term) => [term, ...(promptAliases[term] ?? [])]))
  );
}

function hashPrompt(value: string) {
  return value.split('').reduce((total, character) => total + character.charCodeAt(0), 0);
}

function matchDestinations(promptValue: string): MatchResult[] {
  const terms = tokenize(promptValue);
  const promptHash = hashPrompt(promptValue);

  const scored = destinations.map((destination, index) => {
    const fields = [
      destination.name,
      destination.region,
      destination.category,
      destination.description,
      ...destination.tags,
      ...destination.highlights,
      ...destination.bestFor
    ];
    const searchable = fields.join(' ').toLowerCase();
    const score = terms.reduce((total, term) => total + (searchable.includes(term) ? 1 : 0), 0);
    const tieBreaker = ((promptHash + index * 7) % 11) / 100;
    const matchedTerm = terms.find((term) => searchable.includes(term));

    return {
      ...destination,
      score: score + tieBreaker,
      reason: matchedTerm ? `Fits ${matchedTerm}` : destination.category
    };
  });

  const strongMatches = scored.filter((item) => item.score >= 1);
  const fallbackMatches = scored.filter((item) => ['Victoria Falls', 'Hwange National Park', 'Lake Kariba', 'Nyanga'].includes(item.name));

  return (strongMatches.length ? strongMatches : fallbackMatches)
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({
      ...item,
      match: `${Math.max(76, 98 - index * 4)}%`
    }));
}

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [prompt, setPrompt] = useState('');
  const [submittedPrompt, setSubmittedPrompt] = useState(DEFAULT_PROMPT);
  const [visibleCount, setVisibleCount] = useState(3);
  const [showMorePrompt, setShowMorePrompt] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const matchedDestinations = useMemo(() => matchDestinations(submittedPrompt), [submittedPrompt]);
  const visibleMatches = matchedDestinations.slice(0, visibleCount);
  const popularDestinations = useMemo(() => destinations.slice(0, 5), []);

  function handleSend() {
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt) return;
    setSubmittedPrompt(cleanPrompt);
    setVisibleCount(3);
    setShowMorePrompt(true);
    setPrompt('');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#071b13" />
      <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
        <View style={styles.brandRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open menu"
            style={styles.menuButton}
            onPress={() => setMenuOpen((current) => !current)}
          >
            <Text style={styles.menuIcon}>☰</Text>
          </Pressable>
          <View>
            <Text style={styles.brand}>Nyika AI</Text>
            <Text style={styles.brandSmall}>Explore Zimbabwe</Text>
          </View>
        </View>

        {menuOpen ? (
          <View style={styles.menuPanel}>
            <Pressable style={styles.menuItem} onPress={() => setMenuOpen(false)}>
              <Text style={styles.menuItemText}>Home</Text>
              <Text style={styles.menuItemMeta}>Current</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={() => setMenuOpen(false)}>
              <Text style={styles.menuItemText}>Explore</Text>
              <Text style={styles.menuItemMeta}>Nyika AI chat</Text>
            </Pressable>
            <Pressable
              style={styles.menuItem}
              onPress={() => {
                setMenuOpen(false);
                navigation.navigate('Planner');
              }}
            >
              <Text style={styles.menuItemText}>Plan</Text>
              <Text style={styles.menuItemMeta}>Budget trip</Text>
            </Pressable>
            <View style={styles.menuItemMuted}>
              <Text style={styles.menuItemText}>Map</Text>
              <Text style={styles.menuItemMeta}>Coming soon</Text>
            </View>
            <View style={styles.menuItemMuted}>
              <Text style={styles.menuItemText}>Memories</Text>
              <Text style={styles.menuItemMeta}>Coming soon</Text>
            </View>
          </View>
        ) : null}

        <View style={styles.chatPanel}>
          <Text style={styles.kicker}>Nyika AI · Discover</Text>
          <View style={styles.assistantBubble}>
            <Text style={styles.assistantTitle}>Chat with your imagination.</Text>
            <Text style={styles.assistantText}>Tell me the kind of place, feeling or trip you want. I will suggest places that feel right for you.</Text>
          </View>

          <View style={styles.userBubble}>
            <Text style={styles.userText}>{submittedPrompt}</Text>
          </View>

          <View style={styles.assistantBubbleSmall}>
            <Text style={styles.assistantText}>Great choice. I found places that fit your feeling.</Text>
          </View>

          <View style={styles.matchPanel}>
            <Text style={styles.matchTitle}>Here are {visibleMatches.length} matches for you</Text>
            {visibleMatches.map((item) => (
              <Pressable
                key={item.id}
                style={styles.matchRow}
                onPress={() => navigation.navigate('Destination', { destinationId: item.id })}
              >
                <View style={styles.matchThumb}>
                  <Image source={item.image} style={styles.matchImage} resizeMode="cover" />
                </View>
                <View style={styles.matchCopy}>
                  <Text style={styles.matchName}>{item.name}</Text>
                  <Text style={styles.matchMeta}>{item.match} match · {item.reason}</Text>
                </View>
                <Text style={styles.pin}>⌖</Text>
              </Pressable>
            ))}

            {showMorePrompt && visibleCount < matchedDestinations.length ? (
              <View style={styles.moreCard}>
                <Text style={styles.moreTitle}>Do you want more places?</Text>
                <View style={styles.moreActions}>
                  <Pressable
                    style={styles.moreButton}
                    onPress={() => setVisibleCount((current) => Math.min(current + 3, matchedDestinations.length))}
                  >
                    <Text style={styles.moreButtonText}>Yes, show more</Text>
                  </Pressable>
                  <Pressable style={styles.moreButtonMuted} onPress={() => setShowMorePrompt(false)}>
                    <Text style={styles.moreButtonMutedText}>No</Text>
                  </Pressable>
                </View>
              </View>
            ) : null}
          </View>

          <View style={styles.composer}>
            <TextInput
              style={styles.input}
              value={prompt}
              onChangeText={setPrompt}
              placeholder="Type your message..."
              placeholderTextColor="rgba(237,228,207,.58)"
              multiline
            />
            <Pressable style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendText}>Send</Text>
            </Pressable>
          </View>
        </View>

        <SectionHeader title="Top destinations" subtitle="Open a place, then plan the route and budget." />
        <FlatList
          data={matchedDestinations.slice(0, 5)}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardRow}
          renderItem={({ item }) => (
            <DestinationCard
              destination={item}
              onPress={() => navigation.navigate('Destination', { destinationId: item.id })}
            />
          )}
        />

        <Pressable style={styles.primaryButton} onPress={() => navigation.navigate('Planner')}>
          <Text style={styles.primaryButtonText}>Plan with Nyika AI</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#071b13' },
  screen: { padding: 20, paddingBottom: 34, backgroundColor: '#071b13' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 22 },
  menuButton: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(245,209,138,.12)', borderWidth: 1, borderColor: 'rgba(245,209,138,.28)' },
  menuIcon: { color: '#fff7e8', fontSize: 24, fontWeight: '900', lineHeight: 28 },
  brand: { color: '#f5d18a', fontSize: 28, lineHeight: 31, fontWeight: '900' },
  brandSmall: { color: 'rgba(237,228,207,.78)', fontSize: 11, letterSpacing: 2.2, textTransform: 'uppercase', fontWeight: '800' },
  menuPanel: { marginTop: -10, marginBottom: 22, borderRadius: 24, backgroundColor: '#fffaf0', padding: 10, gap: 8 },
  menuItem: { borderRadius: 18, backgroundColor: '#f3ede2', paddingVertical: 13, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  menuItemMuted: { borderRadius: 18, backgroundColor: '#f7f1e8', paddingVertical: 13, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', opacity: 0.7 },
  menuItemText: { color: '#171412', fontSize: 15, fontWeight: '900' },
  menuItemMeta: { color: '#0b4d31', fontSize: 12, fontWeight: '800' },
  chatPanel: { borderRadius: 30, backgroundColor: '#0d2b1f', borderWidth: 1, borderColor: 'rgba(245,209,138,.16)', padding: 16, marginBottom: 28, gap: 14 },
  kicker: { alignSelf: 'flex-start', color: '#f5d18a', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.4, fontWeight: '900' },
  assistantBubble: { maxWidth: '94%', borderRadius: 22, backgroundColor: '#fffaf0', padding: 18 },
  assistantBubbleSmall: { maxWidth: '88%', borderRadius: 20, backgroundColor: '#fffaf0', padding: 16 },
  assistantTitle: { color: '#171412', fontSize: 21, fontWeight: '900', marginBottom: 6 },
  assistantText: { color: '#2e2922', fontSize: 15, lineHeight: 22, fontWeight: '700' },
  userBubble: { alignSelf: 'flex-end', maxWidth: '86%', borderRadius: 22, backgroundColor: '#08743e', padding: 18 },
  userText: { color: '#fff7e8', fontSize: 16, lineHeight: 23, fontWeight: '800' },
  matchPanel: { borderRadius: 24, backgroundColor: '#fffaf0', padding: 14, gap: 10 },
  matchTitle: { color: '#171412', fontSize: 17, fontWeight: '900', marginBottom: 2 },
  matchRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 10, borderRadius: 18, backgroundColor: '#f3ede2' },
  matchThumb: { width: 54, height: 54, borderRadius: 16, backgroundColor: '#0b4d31', overflow: 'hidden' },
  matchImage: { width: '100%', height: '100%' },
  matchCopy: { flex: 1 },
  matchName: { color: '#171412', fontSize: 16, fontWeight: '900' },
  matchMeta: { color: '#0b4d31', fontSize: 12, lineHeight: 18, fontWeight: '800' },
  pin: { color: '#0b4d31', fontSize: 20, fontWeight: '900' },
  moreCard: { marginTop: 4, padding: 14, borderRadius: 18, backgroundColor: '#f3ede2', borderWidth: 1, borderColor: '#e5d6c0' },
  moreTitle: { color: '#171412', fontSize: 15, fontWeight: '900', marginBottom: 10 },
  moreActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  moreButton: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 16, backgroundColor: '#0b4d31', marginRight: 10 },
  moreButtonText: { color: '#fff7e8', fontSize: 13, fontWeight: '900' },
  moreButtonMuted: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 16, backgroundColor: '#fffaf0', borderWidth: 1, borderColor: '#dfd2bf' },
  moreButtonMutedText: { color: '#6b6258', fontSize: 13, fontWeight: '900' },
  composer: { flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 24, backgroundColor: 'rgba(255,250,240,.08)', borderWidth: 1, borderColor: 'rgba(245,209,138,.18)', padding: 10 },
  input: { flex: 1, minHeight: 42, maxHeight: 90, color: '#fff7e8', fontSize: 15, lineHeight: 21, fontWeight: '700', paddingHorizontal: 10 },
  sendButton: { borderRadius: 18, backgroundColor: '#c87236', paddingVertical: 13, paddingHorizontal: 18 },
  sendText: { color: '#fff7e8', fontSize: 15, fontWeight: '900' },
  cardRow: { paddingRight: 20, paddingBottom: 14 },
  primaryButton: { borderRadius: 20, backgroundColor: '#f5d18a', paddingVertical: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  primaryButtonText: { color: '#071b13', fontSize: 16, fontWeight: '900' }
});
