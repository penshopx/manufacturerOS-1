
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { productionLines, LineStatus, ProductionLine } from '@/data/demo';
import { BrandHeader, Chevron, font, Pill, ProgressBar, Screen, SectionHeader } from '@/components/ManufactureUI';

const statusLabels: Record<LineStatus | 'all', string> = { all: 'Semua', running: 'Berjalan', attention: 'Perhatian', maintenance: 'Maintenance' };

export default function ProductionScreen() {
  const colors = useColors();
  const [filter, setFilter] = useState<LineStatus | 'all'>('all');
  const [selected, setSelected] = useState<ProductionLine | null>(null);
  const [reviewed, setReviewed] = useState<string[]>([]);
  const filtered = useMemo(() => filter === 'all' ? productionLines : productionLines.filter((line) => line.status === filter), [filter]);
  const reviewedCount = reviewed.length;
  return <Screen>
    <BrandHeader title="Produksi" subtitle="Output dan kesehatan setiap line" icon="factory" />
    <View style={[styles.overview, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={styles.overviewTop}><View><Text style={[styles.overviewLabel, { color: colors.mutedForeground }]}>PROGRES SHIFT PAGI</Text><Text style={[styles.overviewValue, { color: colors.foreground }]}>936 <Text style={[styles.overviewUnit, { color: colors.mutedForeground }]}>/ 1,200 unit</Text></Text></View><Text style={[styles.overviewPercent, { color: colors.primary }]}>78%</Text></View><ProgressBar value={78} /><View style={styles.overviewBottom}><Text style={[styles.overviewMeta, { color: colors.mutedForeground }]}>Target selesai 16:00</Text><Text style={[styles.overviewMeta, { color: colors.warning }]}>264 unit tersisa</Text></View></View>
    <View style={styles.filterRow}>{(Object.keys(statusLabels) as Array<LineStatus | 'all'>).map((key) => <Pill key={key} label={statusLabels[key]} active={filter === key} tone={key === 'attention' ? 'amber' : key === 'maintenance' ? 'neutral' : 'teal'} onPress={() => { setFilter(key); setSelected(null); void Haptics.selectionAsync(); }} />)}</View>
    <View style={styles.section}><SectionHeader title="Line produksi" caption={reviewedCount ? reviewedCount + ' line ditinjau di sesi ini' : 'Tap line untuk melihat detail'} /><View style={styles.lineList}>{filtered.map((line) => <LineCard key={line.id} line={line} selected={selected?.id === line.id} reviewed={reviewed.includes(line.id)} onPress={() => { setSelected(line); void Haptics.selectionAsync(); }} />)}</View></View>
    {selected ? <View style={[styles.detailCard, { backgroundColor: colors.primaryMuted, borderColor: colors.primary + '66' }]}><View style={styles.detailHead}><View style={{ flex: 1 }}><Text style={[styles.detailEyebrow, { color: colors.primary }]}>LINE DETAIL</Text><Text style={[styles.detailTitle, { color: colors.foreground }]}>{selected.name} · {selected.area}</Text></View><Pressable testID="close-line-detail" onPress={() => setSelected(null)}><MaterialCommunityIcons name="close" size={20} color={colors.mutedForeground} /></Pressable></View><Text style={[styles.detailNote, { color: colors.secondaryForeground }]}>{selected.note}. Actual {selected.actual} dari target {selected.target} unit.</Text><Pressable testID="review-line" onPress={() => { setReviewed((items) => items.includes(selected.id) ? items.filter((id) => id !== selected.id) : [...items, selected.id]); void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); }} style={({ pressed }) => [styles.reviewButton, { backgroundColor: colors.primary, opacity: pressed ? 0.75 : 1 }]}><MaterialCommunityIcons name={reviewed.includes(selected.id) ? 'check-circle-outline' : 'eye-check-outline'} size={17} color={colors.primaryForeground} /><Text style={[styles.reviewButtonText, { color: colors.primaryForeground }]}>{reviewed.includes(selected.id) ? 'Sudah ditinjau' : 'Tandai sudah ditinjau'}</Text></Pressable></View> : null}
  </Screen>;
}

function LineCard({ line, selected, reviewed, onPress }: { line: ProductionLine; selected: boolean; reviewed: boolean; onPress: () => void }) {
  const colors = useColors();
  const tone = line.status === 'running' ? colors.success : line.status === 'attention' ? colors.warning : colors.mutedForeground;
  return <Pressable testID={'line-' + line.id} onPress={onPress} style={({ pressed }) => [styles.lineCard, { backgroundColor: colors.card, borderColor: selected ? colors.primary : colors.border, opacity: pressed ? 0.8 : 1 }]}><View style={styles.lineTop}><View style={styles.lineTitleWrap}><View style={[styles.statusDot, { backgroundColor: tone }]} /><View><Text style={[styles.lineName, { color: colors.foreground }]}>{line.name} · {line.area}</Text><Text style={[styles.lineNote, { color: colors.mutedForeground }]}>{line.note}</Text></View></View><View style={styles.lineRight}>{reviewed ? <MaterialCommunityIcons name="check-circle" size={16} color={colors.success} /> : null}<Chevron /></View></View><View style={styles.lineStats}><View><Text style={[styles.statLabel, { color: colors.mutedForeground }]}>OEE</Text><Text style={[styles.statValue, { color: line.oee > 0 ? colors.foreground : colors.mutedForeground }]}>{line.oee}%</Text></View><View><Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Actual</Text><Text style={[styles.statValue, { color: colors.foreground }]}>{line.actual}</Text></View><View style={styles.lineProgress}><ProgressBar value={line.target ? (line.actual / line.target) * 100 : 0} color={tone} /></View><Text style={[styles.statusText, { color: tone }]}>{line.status === 'running' ? 'RUNNING' : line.status === 'attention' ? 'DELAY' : 'SERVICE'}</Text></View></Pressable>;
}

const styles = StyleSheet.create({
  overview: { borderWidth: 1, borderRadius: 18, padding: 16, gap: 12 },
  overviewTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  overviewLabel: { fontFamily: font.bold, letterSpacing: 1, fontSize: 9, marginBottom: 4 },
  overviewValue: { fontFamily: font.bold, fontSize: 32, letterSpacing: -1 },
  overviewUnit: { fontFamily: font.regular, fontSize: 13, letterSpacing: 0 },
  overviewPercent: { fontFamily: font.bold, fontSize: 27 },
  overviewBottom: { flexDirection: 'row', justifyContent: 'space-between' },
  overviewMeta: { fontFamily: font.regular, fontSize: 11 },
  filterRow: { flexDirection: 'row', gap: 7, flexWrap: 'wrap' },
  section: { gap: 12 },
  lineList: { gap: 10 },
  lineCard: { borderWidth: 1, borderRadius: 16, padding: 14, gap: 15 },
  lineTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  lineTitleWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  statusDot: { width: 9, height: 9, borderRadius: 9 },
  lineName: { fontFamily: font.semi, fontSize: 14 },
  lineNote: { fontFamily: font.regular, fontSize: 11, marginTop: 3 },
  lineRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  lineStats: { flexDirection: 'row', alignItems: 'flex-end', gap: 12 },
  statLabel: { fontFamily: font.regular, fontSize: 10 },
  statValue: { fontFamily: font.semi, fontSize: 15, marginTop: 2 },
  lineProgress: { flex: 1, paddingBottom: 4 },
  statusText: { fontFamily: font.bold, fontSize: 9, letterSpacing: 0.5 },
  detailCard: { borderWidth: 1, borderRadius: 16, padding: 15, gap: 12 },
  detailHead: { flexDirection: 'row', alignItems: 'flex-start' },
  detailEyebrow: { fontFamily: font.bold, fontSize: 9, letterSpacing: 1 },
  detailTitle: { fontFamily: font.semi, fontSize: 17, marginTop: 3 },
  detailNote: { fontFamily: font.regular, fontSize: 13, lineHeight: 19 },
  reviewButton: { minHeight: 42, borderRadius: 11, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  reviewButtonText: { fontFamily: font.semi, fontSize: 13 },
});
