import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Destination } from '../data/destinations';

interface DestinationCardProps {
  destination: Destination;
  onPress: () => void;
}

export default function DestinationCard({ destination, onPress }: DestinationCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.hero}>
        <Text style={styles.heroInitial}>{destination.name.slice(0, 1)}</Text>
        <Text style={styles.match}>{destination.match} match</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{destination.name}</Text>
        <Text style={styles.subtitle}>{destination.region}</Text>
        <Text style={styles.chip}>{destination.category}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: 230, backgroundColor: '#fffaf0', borderRadius: 24, overflow: 'hidden', marginRight: 16, elevation: 4 },
  hero: { height: 132, backgroundColor: '#0d2b1f', padding: 16, justifyContent: 'space-between' },
  heroInitial: { color: '#f5d18a', fontSize: 46, fontWeight: '900' },
  match: { alignSelf: 'flex-start', overflow: 'hidden', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999, backgroundColor: '#c87236', color: '#fff7e8', fontSize: 12, fontWeight: '900' },
  body: { padding: 18 },
  title: { color: '#171412', fontSize: 18, fontWeight: '900', marginBottom: 6 },
  subtitle: { color: '#6b6258', fontSize: 14, marginBottom: 10, fontWeight: '700' },
  chip: { alignSelf: 'flex-start', overflow: 'hidden', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 16, backgroundColor: '#efe5d5', color: '#0b4d31', fontSize: 12, fontWeight: '900' }
});
