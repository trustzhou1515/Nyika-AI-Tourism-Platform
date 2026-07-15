import { useMemo, useState } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { destinations } from '../data/destinations';

const budgetStyles = ['Budget', 'Standard', 'Premium'] as const;

type BudgetStyle = (typeof budgetStyles)[number];

function formatCurrency(value: number) {
  return `$${value.toFixed(0)}`;
}

function buildBudgetBreakdown(amount: number) {
  return [
    { label: 'Accommodation', amount: Math.round(amount * 0.35) },
    { label: 'Food', amount: Math.round(amount * 0.18) },
    { label: 'Activities', amount: Math.round(amount * 0.2) },
    { label: 'Transport', amount: Math.round(amount * 0.14) },
    { label: 'Entrance fees', amount: Math.round(amount * 0.09) },
    { label: 'Contingency', amount: Math.round(amount * 0.04) }
  ];
}

export default function PlannerScreen() {
  const navigation = useNavigation<any>();
  const [destinationId, setDestinationId] = useState(destinations[0].id);
  const [days, setDays] = useState('4');
  const [travelers, setTravelers] = useState('2');
  const [budget, setBudget] = useState('1800');
  const [style, setStyle] = useState<BudgetStyle>('Standard');
  const [submitted, setSubmitted] = useState(false);

  const selectedDestination = useMemo(
    () => destinations.find((item) => item.id === destinationId) ?? destinations[0],
    [destinationId]
  );
  const numericBudget = Math.max(Number(budget) || 0, 0);
  const totalBudget = numericBudget || 1800;
  const perPersonBudget = Math.round(totalBudget / Math.max(Number(travelers) || 1, 1));
  const breakdown = buildBudgetBreakdown(totalBudget);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.kicker}>Plan AI · Budget</Text>
          <Text style={styles.heading}>What trip should I calculate?</Text>
          <Text style={styles.subtitle}>Choose a destination, days and people. Nyika AI estimates the money first, then gives care and packing notes.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Destination</Text>
          <View style={styles.selectorRow}>
            {destinations.map((item) => (
              <Pressable
                key={item.id}
                style={[styles.selectorButton, destinationId === item.id && styles.selectorButtonActive]}
                onPress={() => setDestinationId(item.id)}
              >
                <Text style={[styles.selectorText, destinationId === item.id && styles.selectorTextActive]}>{item.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.inputGrid}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Days</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={days}
              onChangeText={setDays}
              placeholder="4"
              placeholderTextColor="#777"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Travelers</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={travelers}
              onChangeText={setTravelers}
              placeholder="2"
              placeholderTextColor="#777"
            />
          </View>
        </View>

        <View style={styles.inputGroup}> 
          <Text style={styles.inputLabel}>Budget (USD)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={budget}
            onChangeText={setBudget}
            placeholder="1800"
            placeholderTextColor="#777"
          />
        </View>

        <View style={styles.section}> 
          <Text style={styles.sectionLabel}>Style</Text>
          <View style={styles.selectorRow}>
            {budgetStyles.map((option) => (
              <Pressable
                key={option}
                style={[styles.styleButton, style === option && styles.styleButtonActive]}
                onPress={() => setStyle(option)}
              >
                <Text style={[styles.styleText, style === option && styles.styleTextActive]}>{option}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Calculate plan</Text>
        </Pressable>

        {submitted ? (
          <View style={styles.resultsCard}>
            <Text style={styles.resultsTitle}>{selectedDestination.name} · {days || '4'} days</Text>
            <Text style={styles.resultsLine}>Destination: {selectedDestination.name}</Text>
            <Text style={styles.resultsLine}>Days: {days || '4'}</Text>
            <Text style={styles.resultsLine}>Travelers: {travelers || '2'}</Text>
            <Text style={styles.resultsLine}>Style: {style}</Text>
            <Text style={styles.resultsLine}>Total budget: {formatCurrency(totalBudget)}</Text>
            <Text style={styles.resultsLine}>Per person: {formatCurrency(perPersonBudget)}</Text>

            <View style={styles.breakdownSection}>
              <Text style={styles.sectionTitle}>Budget breakdown</Text>
              {breakdown.map((item) => (
                <View key={item.label} style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>{item.label}</Text>
                  <Text style={styles.breakdownValue}>{formatCurrency(item.amount)}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}> 
              <Text style={styles.sectionTitle}>What to pack</Text>
              {selectedDestination.clothingTips.slice(0, 3).map((tip) => (
                <Text key={tip} style={styles.bulletText}>• {tip}</Text>
              ))}
            </View>
          </View>
        ) : null}

        <Pressable style={styles.backButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.backText}>Back to home</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#071b13' },
  screen: { padding: 24, paddingBottom: 32, backgroundColor: '#071b13' },
  hero: { marginBottom: 24 },
  kicker: { color: '#f5d18a', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.4, fontWeight: '900', marginBottom: 10 },
  heading: { color: '#fff7e8', fontSize: 28, fontWeight: '900', marginBottom: 10, maxWidth: 320 },
  subtitle: { color: 'rgba(237,228,207,.76)', fontSize: 15, lineHeight: 24, maxWidth: 360, fontWeight: '600' },
  section: { marginBottom: 20 },
  sectionLabel: { color: '#f5d18a', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 12, fontWeight: '900' },
  selectorRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  selectorButton: { paddingVertical: 12, paddingHorizontal: 14, borderRadius: 18, backgroundColor: '#0d2b1f', borderWidth: 1, borderColor: 'rgba(245,209,138,.12)', marginRight: 10, marginBottom: 10 },
  selectorButtonActive: { backgroundColor: '#f5d18a' },
  selectorText: { color: '#fff7e8', fontSize: 14, fontWeight: '700' },
  selectorTextActive: { color: '#071b13' },
  inputGrid: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  inputGroup: { flex: 1, marginBottom: 18 },
  inputLabel: { color: '#fff7e8', fontSize: 13, marginBottom: 8, fontWeight: '800' },
  input: { backgroundColor: '#0d2b1f', borderRadius: 18, color: '#fff7e8', paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, borderWidth: 1, borderColor: 'rgba(245,209,138,.12)' },
  styleButton: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 18, backgroundColor: '#0d2b1f', marginRight: 10, marginBottom: 10 },
  styleButtonActive: { backgroundColor: '#f5d18a' },
  styleText: { color: '#fff7e8', fontSize: 14, fontWeight: '700' },
  styleTextActive: { color: '#071b13' },
  submitButton: { backgroundColor: '#c87236', borderRadius: 18, paddingVertical: 16, alignItems: 'center', marginBottom: 24 },
  submitText: { color: '#fff7e8', fontSize: 16, fontWeight: '900' },
  resultsCard: { backgroundColor: '#fffaf0', borderRadius: 24, padding: 22, marginBottom: 24 },
  resultsTitle: { color: '#171412', fontSize: 18, fontWeight: '900', marginBottom: 14 },
  resultsLine: { color: '#40392f', fontSize: 15, lineHeight: 24, fontWeight: '600' },
  breakdownSection: { marginTop: 18, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#e3d8c7' },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  breakdownLabel: { color: '#6b6258', fontSize: 14, fontWeight: '700' },
  breakdownValue: { color: '#071b13', fontSize: 14, fontWeight: '900' },
  sectionTitle: { color: '#171412', fontSize: 16, fontWeight: '900', marginBottom: 12 },
  bulletText: { color: '#40392f', fontSize: 15, lineHeight: 24, marginBottom: 10, fontWeight: '600' },
  backButton: { paddingVertical: 16, borderRadius: 18, backgroundColor: '#0d2b1f', alignItems: 'center' },
  backText: { color: '#fff7e8', fontSize: 15, fontWeight: '900' }
});
