import { ScrollView, SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { destinations } from '../data/destinations';

type DestinationNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Destination'>;

export default function DestinationScreen() {
  const route = useRoute();
  const navigation = useNavigation<DestinationNavigationProp>();
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
  safeArea: { flex: 1, backgroundColor: '#050505' },
  screen: { padding: 24, paddingBottom: 32, backgroundColor: '#050505' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  backButton: { paddingVertical: 8, paddingHorizontal: 14, backgroundColor: '#1f1f1f', borderRadius: 16 },
  backText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  badge: { color: '#ffb86c', fontWeight: '700', fontSize: 12, textTransform: 'uppercase' },
  hero: { marginBottom: 24 },
  title: { color: '#fff', fontSize: 30, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: '#a8a8a8', fontSize: 16, lineHeight: 24 },
  section: { marginBottom: 24 },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 10 },
  sectionText: { color: '#d3d3d3', fontSize: 15, lineHeight: 22 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tag: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 16, backgroundColor: '#1f1f1f', marginRight: 10, marginBottom: 10 },
  tagText: { color: '#fff', fontSize: 13 },
  miniCard: { backgroundColor: '#121212', borderRadius: 22, padding: 18, flex: 1, marginBottom: 14 },
  sideBySide: { flexDirection: 'column', gap: 14, marginBottom: 10 },
  miniTitle: { color: '#fff', fontSize: 15, fontWeight: '700', marginBottom: 10 },
  miniText: { color: '#d3d3d3', fontSize: 14, lineHeight: 22, marginBottom: 8 },
  bulletText: { color: '#d3d3d3', fontSize: 15, lineHeight: 24, marginBottom: 10 },
  button: { marginTop: 6, paddingVertical: 18, borderRadius: 20, backgroundColor: '#ff8f3f', alignItems: 'center' },
  buttonText: { color: '#050505', fontSize: 16, fontWeight: '700' }
});
