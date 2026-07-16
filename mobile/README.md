# Mobile Package Note

The active React Native companion app is implemented in `../mobileapp`.

This `mobile/` folder remains as a legacy evaluator placeholder from the earlier repository structure. Use `mobileapp/` for the current Expo React Native source, package manifest, lockfile, image assets and mobile screens.

Current mobile app highlights:

- Expo React Native app with Home, Destination and Planner screens.
- Nyika AI chat-style discovery with local matching logic.
- Imported destination images in `mobileapp/assets/destinations/`.
- Hamburger menu on the Home screen.
- Expo Web preview support through `react-dom` and `react-native-web`.

Run the active mobile app:

```bash
cd ../mobileapp
npm install
npm run start
```
