import { StyleSheet, Text, View } from 'react-native';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 18 },
  title: { color: '#fff7e8', fontSize: 20, fontWeight: '900', marginBottom: 6 },
  subtitle: { color: 'rgba(237,228,207,.72)', fontSize: 14, lineHeight: 20, fontWeight: '600' }
});
