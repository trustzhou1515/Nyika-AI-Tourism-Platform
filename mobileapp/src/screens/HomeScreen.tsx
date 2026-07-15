import { useMemo, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DestinationCard from '../components/DestinationCard';
import SectionHeader from '../components/SectionHeader';
import { destinations } from '../data/destinations';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [prompt, setPrompt] = useState('');
  const [submittedPrompt, setSubmittedPrompt] = useState('I want a peaceful getaway with nature, wildlife and beautiful views.');
  const popularDestinations = useMemo(() => destinations.slice(0, 3), []);

  function handleSend() {
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt) return;
    setSubmittedPrompt(cleanPrompt);
    setPrompt('');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#071b13" />
      <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
        <View style={styles.brandRow}>
          <View style={styles.logoMark}>
            <Text style={styles.logoSpark}>✦</Text>
          </View>
          <View>
            <Text style={styles.brand}>Nyika AI</Text>
            <Text style={styles.brandSmall}>Explore Zimbabwe</Text>
          </View>
        </View>

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
            <Text style={styles.matchTitle}>Here are {popularDestinations.length} matches for you</Text>
            {popularDestinations.map((item) => (
              <Pressable
                key={item.id}
                style={styles.matchRow}
                onPress={() => navigation.navigate('Destination', { destinationId: item.id })}
              >
                <View style={styles.matchThumb}>
                  <Text style={styles.matchInitial}>{item.name.slice(0, 1)}</Text>
                </View>
                <View style={styles.matchCopy}>
                  <Text style={styles.matchName}>{item.name}</Text>
                  <Text style={styles.matchMeta}>{item.match} match · {item.tags.slice(0, 2).join(' / ')}</Text>
                </View>
                <Text style={styles.pin}>⌖</Text>
              </Pressable>
            ))}
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
  logoMark: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(245,209,138,.12)', borderWidth: 1, borderColor: 'rgba(245,209,138,.28)' },
  logoSpark: { color: '#f5d18a', fontSize: 24, fontWeight: '900' },
  brand: { color: '#f5d18a', fontSize: 28, lineHeight: 31, fontWeight: '900' },
  brandSmall: { color: 'rgba(237,228,207,.78)', fontSize: 11, letterSpacing: 2.2, textTransform: 'uppercase', fontWeight: '800' },
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
  matchThumb: { width: 54, height: 54, borderRadius: 16, backgroundColor: '#0b4d31', alignItems: 'center', justifyContent: 'center' },
  matchInitial: { color: '#f5d18a', fontSize: 22, fontWeight: '900' },
  matchCopy: { flex: 1 },
  matchName: { color: '#171412', fontSize: 16, fontWeight: '900' },
  matchMeta: { color: '#0b4d31', fontSize: 12, lineHeight: 18, fontWeight: '800' },
  pin: { color: '#0b4d31', fontSize: 20, fontWeight: '900' },
  composer: { flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 24, backgroundColor: 'rgba(255,250,240,.08)', borderWidth: 1, borderColor: 'rgba(245,209,138,.18)', padding: 10 },
  input: { flex: 1, minHeight: 42, maxHeight: 90, color: '#fff7e8', fontSize: 15, lineHeight: 21, fontWeight: '700', paddingHorizontal: 10 },
  sendButton: { borderRadius: 18, backgroundColor: '#c87236', paddingVertical: 13, paddingHorizontal: 18 },
  sendText: { color: '#fff7e8', fontSize: 15, fontWeight: '900' },
  cardRow: { paddingRight: 20, paddingBottom: 14 },
  primaryButton: { borderRadius: 20, backgroundColor: '#f5d18a', paddingVertical: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  primaryButtonText: { color: '#071b13', fontSize: 16, fontWeight: '900' }
});
