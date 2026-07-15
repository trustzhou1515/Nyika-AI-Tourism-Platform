import { useMemo } from 'react';
import { FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { destinations } from '../data/destinations';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import DestinationCard from '../components/DestinationCard';
import SectionHeader from '../components/SectionHeader';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const popularDestinations = useMemo(() => destinations.slice(0, 3), []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Nyika Travel</Text>
          <Text style={styles.subtitle}>Zimbabwe trips with premium ease, bold nature, and smart planning.</Text>
        </View>

        <SectionHeader title="Top escapes" subtitle="Choose from iconic Zimbabwe destinations." />
        <FlatList
          data={popularDestinations}
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

        <SectionHeader title="Tour planner" subtitle="Build your itinerary with a few taps." />
        <View style={styles.actionCard}>
          <Text style={styles.actionTitle}>Smart travel planning</Text>
          <Text style={styles.actionText}>Get a premium trip estimate, clothing tips, and a clearer budget breakdown.</Text>
          <Text style={styles.actionHint}>Tap to start your planner.</Text>
        </View>
        <Pressable style={styles.primaryButton} onPress={() => navigation.navigate('Planner')}>
          <Text style={styles.primaryButtonText}>Open planner</Text>
        </Pressable>

        <SectionHeader title="Why Nyika?" subtitle="Fast, elegant, mobile-first travel guidance." />
        <Text style={styles.text}>This app brings Zimbabwe destination ideas, packing advice, and premium trip summaries into a dark, mobile-first experience.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#050505' },
  screen: { padding: 24, paddingBottom: 32, backgroundColor: '#050505' },
  header: { marginBottom: 24 },
  title: { color: '#fff', fontSize: 32, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: '#c8c8c8', fontSize: 16, lineHeight: 24, maxWidth: 320 },
  cardRow: { paddingRight: 24, paddingBottom: 8 },
  actionCard: { marginBottom: 18, borderRadius: 24, backgroundColor: '#121212', padding: 22, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 18, elevation: 4 },
  actionTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 8 },
  actionText: { color: '#d0d0d0', fontSize: 15, lineHeight: 22, marginBottom: 10 },
  actionHint: { color: '#ffb86c', fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.8 },
  primaryButton: { borderRadius: 18, backgroundColor: '#ff8f3f', paddingVertical: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 28 },
  primaryButtonText: { color: '#050505', fontSize: 16, fontWeight: '700' },
  text: { color: '#d0d0d0', fontSize: 15, lineHeight: 22 }
});
