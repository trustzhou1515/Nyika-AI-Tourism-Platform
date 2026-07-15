import { ScrollView, SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { destinations } from '../data/destinations';

export default function DestinationScreen() {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { destinationId } = route.params as { destinationId: string };
  const destination = destinations.find((item) => item.id === destinationId);

  if (!destination) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.screen}>
          <Text style={styles.title}>Destination not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.screen}> 
        <View style={styles.topBar}> 
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
          <Text style={styles.badge}>{destination.category}</Text>
        </View>

        <View style={styles.hero}>
          <Text style={styles.title}>{destination.name}</Text>
          <Text style={styles.subtitle}>{destination.region}</Text>
        </View>

        <View style={styles.section}> 
          <Text style={styles.sectionTitle}>Why visit</Text>
          <Text style={styles.sectionText}>{destination.description}</Text>
        </View>

        <View style={styles.section}> 
          <Text style={styles.sectionTitle}>Top highlights</Text>
          {destination.highlights.map((item) => (
            <Text key={item} style={styles.bulletText}>• {item}</Text>
          ))}
        </View>

        <View style={styles.section}> 
          <Text style={styles.sectionTitle}>Best for</Text>
          <View style={styles.tagRow}>
            {destination.bestFor.map((item) => (
              <View key={item} style={styles.tag}>
                <Text style={styles.tagText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sideBySide}> 
          <View style={styles.miniCard}>
            <Text style={styles.miniTitle}>What to pack</Text>
            {destination.clothingTips.map((tip) => (
              <Text key={tip} style={styles.miniText}>• {tip}</Text>
            ))}
          </View>
          <View style={styles.miniCard}>
            <Text style={styles.miniTitle}>Care tips</Text>
            {destination.careTips.map((tip) => (
              <Text key={tip} style={styles.miniText}>• {tip}</Text>
            ))}
          </View>
        </View>

        <Pressable style={styles.button} onPress={() => navigation.navigate('Planner')}>
          <Text style={styles.buttonText}>Plan a trip here</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#071b13' },
  screen: { padding: 24, paddingBottom: 32, backgroundColor: '#071b13' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  backButton: { paddingVertical: 8, paddingHorizontal: 14, backgroundColor: '#0d2b1f', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(245,209,138,.16)' },
  backText: { color: '#fff7e8', fontSize: 14, fontWeight: '800' },
  badge: { color: '#f5d18a', fontWeight: '900', fontSize: 12, textTransform: 'uppercase' },
  hero: { marginBottom: 24, padding: 22, borderRadius: 26, backgroundColor: '#0d2b1f', borderWidth: 1, borderColor: 'rgba(245,209,138,.14)' },
  title: { color: '#fff7e8', fontSize: 30, fontWeight: '900', marginBottom: 8 },
  subtitle: { color: 'rgba(237,228,207,.76)', fontSize: 16, lineHeight: 24, fontWeight: '700' },
  section: { marginBottom: 24 },
  sectionTitle: { color: '#f5d18a', fontSize: 16, fontWeight: '900', marginBottom: 10 },
  sectionText: { color: '#fff7e8', fontSize: 15, lineHeight: 22, fontWeight: '600' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tag: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 16, backgroundColor: '#fffaf0', marginRight: 10, marginBottom: 10 },
  tagText: { color: '#0b4d31', fontSize: 13, fontWeight: '900' },
  miniCard: { backgroundColor: '#fffaf0', borderRadius: 22, padding: 18, flex: 1, marginBottom: 14 },
  sideBySide: { flexDirection: 'column', gap: 14, marginBottom: 10 },
  miniTitle: { color: '#171412', fontSize: 15, fontWeight: '900', marginBottom: 10 },
  miniText: { color: '#40392f', fontSize: 14, lineHeight: 22, marginBottom: 8, fontWeight: '600' },
  bulletText: { color: '#fff7e8', fontSize: 15, lineHeight: 24, marginBottom: 10, fontWeight: '600' },
  button: { marginTop: 6, paddingVertical: 18, borderRadius: 20, backgroundColor: '#f5d18a', alignItems: 'center' },
  buttonText: { color: '#071b13', fontSize: 16, fontWeight: '900' }
});
