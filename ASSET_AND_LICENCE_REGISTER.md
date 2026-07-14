# Asset and Licence Register

| Asset / Dependency | Use in Project | Licence / Status | Notes |
| --- | --- | --- | --- |
| React | Frontend UI framework | MIT | Listed through npm dependency metadata. |
| React DOM | Browser rendering | MIT | Listed through npm dependency metadata. |
| Vite | Web build tooling | MIT | Used for local development and production build. |
| TypeScript | Static typing | Apache-2.0 | Used for safer frontend logic. |
| Leaflet / React Leaflet | Interactive map | BSD-2-Clause / MIT ecosystem | Used for Zimbabwe tourism map. |
| Lucide React | Icons | ISC | Used for interface icons. |
| Node.js | Backend runtime | MIT-style Node.js licence | Used for API layer. |
| pg | PostgreSQL driver | MIT | Used for PostgreSQL-backed login. |
| PostgreSQL | Database for login/accounts | PostgreSQL Licence | Required when `DATABASE_URL` is configured. |
| Hostinger or equivalent hosting | Deployment target | Commercial service | Environment variables required for production. |
| Destination text dataset | Zimbabwe tourism destination profiles | Project-curated MVP dataset | Includes real destinations with curated descriptions and estimates. |
| Destination imagery | Visual discovery and memory examples | Mixed project-generated / provided / curated assets | Needs final production licensing review before public commercial scale. |
| OpenAI/Gemini/third-party LLM APIs | Not used in current MVP | Not applicable | Current MVP intentionally avoids paid Chat API dependency. |
| Nyika AI brand, UX and proposal content | Project identity | Proprietary | Owned by project team unless separately licensed. |

## Notes

The current MVP uses deterministic matching, parsing and budgeting logic. It does not send traveller prompts to a third-party AI API. Before commercial launch, every image should be replaced with fully owned, licensed, partner-provided or generated assets with usage rights recorded here.
