import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Destination } from '../data/destinations';

interface DestinationCardProps {
  destination: Destination;
  onPress: () => void;
}

export default function DestinationCard({ destination, onPress }: DestinationCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.hero} />
      <View style={styles.body}>
        <Text style={styles.title}>{destination.name}</Text>
        <Text style={styles.subtitle}>{destination.region}</Text>
        <Text style={styles.chip}>{destination.category}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: 220, backgroundColor: '#121212', borderRadius: 24, overflow: 'hidden', marginRight: 16, elevation: 4 },
  hero: { height: 140, backgroundColor: '#1f1f1f' },
  body: { padding: 18 },
  title: { color: '#fff', fontSize: 18, fontWeight: '800', marginBottom: 6 },
  subtitle: { color: '#b0b0b0', fontSize: 14, marginBottom: 10 },
  chip: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 16, backgroundColor: '#232323', color: '#fff', fontSize: 12, fontWeight: '700' }
});
