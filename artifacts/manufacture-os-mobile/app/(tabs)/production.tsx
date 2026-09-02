import { Feather, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { useAppPreferences } from '@/context/AppPreferences';
import { AppHeader, ScreenScroll, SectionTitle, Tag } from '@/components/ManufactureUI';

const windows = ['Hari ini', '7 hari', '30 hari'];
const shifts = [
  { name: 'Shift 1', time: '06:00 — 14:00', output: '1,248', target: '1,320', status: 'Berjalan' },
  { name: 'Shift 2', time: '14:00 — 22:00', output: 'Terjadwal', target: '1,280', status: 'Berikutnya' },
  { name: 'Shift 3', time: '22:00 — 06:00', output: 'Terjadwal', target: '1,100', status: 'Malam' },
];

export default function ProductionScreen() {
  const colors = useColors();
  const { productionWindow, setProductionWindow } = useAppPreferences();
  const [refreshing, setRefreshing] = useState(false);
  const [reviewStarted, setReviewStarted] = useState(false);

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 650);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <AppHeader title="Produksi" subtitle="OUTPUT & OEE · LINE 01–04" />
      <ScreenScroll refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={colors.primary} colors={[colors.primary]} />}>
        <View style={styles.titleRow}>
          <View>
            <Text style={[styles.pageKicker, { color: colors.primary }]}>OUTPUT HARI INI</Text>
            <Text style={[styles.pageValue, { color: colors.foreground }]}>3,842 <Text style={[styles.pageUnit, { color: colors.mutedForeground }]}>unit</Text></Text>
          </View>
          <View style={[styles.oeeBadge, { backgroundColor: colors.successSoft }]}>
            <Text style={[styles.oeeLabel, { color: colors.mutedForeground }]}>OEE</Text>
            <Text style={[styles.oeeValue, { color: colors.success }]}>92.8%</Text>
          </View>
        </View>

        <View style={[styles.segmented, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {windows.map((item) => (
            <TagButton key={item} label={item} active={productionWindow === item} onPress={() => { Haptics.selectionAsync(); setProductionWindow(item); }} />
          ))}
        </View>

        <View style={[styles.chartCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={[styles.cardTitle, { color: colors.foreground }]}>Output vs target</Text>
              <Text style={[styles.cardSub, { color: colors.mutedForeground }]}>Performa line produksi</Text>
            </View>
            <Tag color={colors.success} background={colors.successSoft}>+4.6%</Tag>
          </View>
          <View style={styles.chartArea}>
            <View style={styles.yAxis}>
              <Text style={[styles.axisLabel, { color: colors.mutedForeground }]}>1.4k</Text>
              <Text style={[styles.axisLabel, { color: colors.mutedForeground }]}>900</Text>
              <Text style={[styles.axisLabel, { color: colors.mutedForeground }]}>400</Text>
              <Text style={[styles.axisLabel, { color: colors.mutedForeground }]}>0</Text>
            </View>
            <View style={[styles.bars, { borderBottomColor: colors.border }]}>
              {[72, 58, 86, 65, 78, 92, 84].map((height, index) => (
                <View key={index} style={styles.barGroup}>
                  <View style={[styles.targetBar, { height: `${Math.min(height + 7, 100)}%`, backgroundColor: colors.surfaceElevated }]} />
                  <View style={[styles.outputBar, { height: `${height}%`, backgroundColor: index === 5 ? colors.primary : colors.info }]} />
                  <Text style={[styles.axisLabel, { color: colors.mutedForeground }]}>{['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][index]}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.legendRow}>
            <Legend color={colors.info} label="Output aktual" />
            <Legend color={colors.surfaceElevated} label="Target" />
          </View>
        </View>

        <SectionTitle title="Status shift" action="Lihat detail" onAction={() => setReviewStarted(true)} />
        {shifts.map((shift, index) => (
          <View key={shift.name} style={[styles.shiftRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.shiftIcon, { backgroundColor: index === 0 ? colors.successSoft : colors.surfaceStrong }]}>
              <Ionicons name={index === 0 ? 'play' : 'time-outline'} size={17} color={index === 0 ? colors.success : colors.mutedForeground} />
            </View>
            <View style={styles.shiftCopy}>
              <Text style={[styles.shiftName, { color: colors.foreground }]}>{shift.name}</Text>
              <Text style={[styles.shiftTime, { color: colors.mutedForeground }]}>{shift.time}</Text>
            </View>
            <View style={styles.shiftNumbers}>
              <Text style={[styles.shiftOutput, { color: colors.foreground }]}>{shift.output}</Text>
              <Text style={[styles.shiftTarget, { color: colors.mutedForeground }]}>/ {shift.target}</Text>
            </View>
            <Text style={[styles.shiftStatus, { color: index === 0 ? colors.success : colors.mutedForeground }]}>{shift.status}</Text>
          </View>
        ))}

        {reviewStarted ? (
          <View style={[styles.reviewBanner, { backgroundColor: colors.infoSoft, borderColor: colors.info + '55' }]}>
            <Feather name="check-circle" size={18} color={colors.info} />
            <Text style={[styles.reviewText, { color: colors.info }]}>Review output dibuka. Data terbaru siap dianalisis.</Text>
          </View>
        ) : null}
      </ScreenScroll>
    </View>
  );
}

function TagButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  const colors = useColors();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.windowButton,
        {
          backgroundColor: active ? colors.primary : colors.card,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Text style={[styles.windowText, { color: active ? colors.primaryForeground : colors.mutedForeground }]}>{label}</Text>
    </Pressable>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  const colors = useColors();
  return (
    <View style={styles.legend}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={[styles.legendText, { color: colors.mutedForeground }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 18 },
  pageKicker: { fontSize: 10, fontFamily: 'IBMPlexSans_700Bold', letterSpacing: 1.1 },
  pageValue: { fontSize: 32, fontFamily: 'IBMPlexSans_700Bold', marginTop: 5 },
  pageUnit: { fontSize: 13, fontFamily: 'IBMPlexSans_500Medium' },
  oeeBadge: { borderRadius: 12, paddingHorizontal: 13, paddingVertical: 9, alignItems: 'flex-end' },
  oeeLabel: { fontSize: 10, fontWeight: '600' },
  oeeValue: { fontSize: 15, fontWeight: '700', marginTop: 2 },
  segmented: { borderWidth: 1, borderRadius: 12, padding: 4, flexDirection: 'row', marginBottom: 16 },
  windowButton: { flex: 1, minHeight: 34, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  windowText: { fontSize: 11, fontFamily: 'IBMPlexSans_700Bold' },
  chartCard: { borderWidth: 1, borderRadius: 18, padding: 16, marginBottom: 24 },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardTitle: { fontSize: 14, fontWeight: '700' },
  cardSub: { fontSize: 11, marginTop: 4 },
  chartArea: { height: 166, flexDirection: 'row', marginTop: 22 },
  yAxis: { width: 32, height: 138, justifyContent: 'space-between' },
  axisLabel: { fontSize: 9 },
  bars: { flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', borderBottomWidth: 1, paddingHorizontal: 4 },
  barGroup: { height: 146, flexDirection: 'row', gap: 3, alignItems: 'flex-end', position: 'relative', paddingBottom: 21 },
  targetBar: { width: 8, borderRadius: 4 },
  outputBar: { width: 8, borderRadius: 4 },
  legendRow: { flexDirection: 'row', gap: 18, marginTop: 3 },
  legend: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 7, height: 7, borderRadius: 4 },
  legendText: { fontSize: 10 },
  shiftRow: { minHeight: 68, borderRadius: 15, borderWidth: 1, marginBottom: 8, paddingHorizontal: 11, flexDirection: 'row', alignItems: 'center' },
  shiftIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  shiftCopy: { flex: 1 },
  shiftName: { fontSize: 13, fontWeight: '700' },
  shiftTime: { fontSize: 10, marginTop: 3 },
  shiftNumbers: { alignItems: 'flex-end', marginRight: 10 },
  shiftOutput: { fontSize: 12, fontWeight: '700' },
  shiftTarget: { fontSize: 10, marginTop: 2 },
  shiftStatus: { fontSize: 10, fontWeight: '600', width: 53, textAlign: 'right' },
  reviewBanner: { flexDirection: 'row', alignItems: 'center', gap: 9, borderWidth: 1, borderRadius: 13, padding: 12, marginTop: 6 },
  reviewText: { fontSize: 11, fontWeight: '600', flex: 1, lineHeight: 16 },
});