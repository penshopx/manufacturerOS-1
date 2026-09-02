
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { defects, Defect } from '@/data/demo';
import { BrandHeader, Chevron, font, MetricCard, Pill, ProgressBar, Screen, SectionHeader } from '@/components/ManufactureUI';

export default function QualityScreen() {
  const colors = useColors();
  const [filter, setFilter] = useState<'all' | 'Open' | 'In Progress'>('all');
  const [selected, setSelected] = useState<Defect | null>(null);
  const [acknowledged, setAcknowledged] = useState<string[]>([]);
  const filtered = useMemo(() => filter === 'all' ? defects : defects.filter((defect) => defect.status === filter), [filter]);
  return <Screen>
    <BrandHeader title="Kualitas" subtitle="SQAM dan tindak lanjut defect" icon="clipboard-check-outline" />
    <View style={[styles.gradeCard, { backgroundColor: colors.card, borderColor: colors.success + '66' }]}><View style={styles.gradeTop}><View><Text style={[styles.gradeEyebrow, { color: colors.success }]}>QUALITY SCORE</Text><Text style={[styles.gradeTitle, { color: colors.foreground }]}>Grade A</Text><Text style={[styles.gradeSub, { color: colors.mutedForeground }]}>Kinerja inspeksi tetap stabil</Text></View><View style={[styles.gradeCircle, { borderColor: colors.success }]}><Text style={[styles.gradeCircleText, { color: colors.success }]}>A</Text></View></View><View style={styles.gradeMetric}><View style={styles.gradeMetricTop}><Text style={[styles.gradeMeta, { color: colors.mutedForeground }]}>Defect rate</Text><Text style={[styles.gradeMetricValue, { color: colors.foreground }]}>0.08%</Text></View><ProgressBar value={8} color={colors.success} /><Text style={[styles.gradeMeta, { color: colors.mutedForeground }]}>Target &lt; 0.1% · 2 defect terbuka</Text></View></View>
    <View style={styles.metricRow}><MetricCard label="Total inspeksi" value="2,450" helper="+8.4% minggu ini" tone="blue" icon="scan-helper" /><MetricCard label="PPM" value="800" helper="Di bawah 1,000 target" tone="green" icon="chart-line" /></View>
    <View style={styles.section}><SectionHeader title="Defect terbaru" caption="Tap item untuk meninjau detail" /><View style={styles.filterRow}><Pill label="Semua" active={filter === 'all'} onPress={() => setFilter('all')} /><Pill label="Open" tone="amber" active={filter === 'Open'} onPress={() => setFilter('Open')} /><Pill label="In Progress" tone="blue" active={filter === 'In Progress'} onPress={() => setFilter('In Progress')} /></View><View style={styles.defectList}>{filtered.map((defect) => <DefectCard key={defect.id} defect={defect} selected={selected?.id === defect.id} acknowledged={acknowledged.includes(defect.id)} onPress={() => { setSelected(defect); void Haptics.selectionAsync(); }} />)}</View></View>
    {selected ? <View style={[styles.detailCard, { backgroundColor: colors.card, borderColor: colors.primary + '66' }]}><View style={styles.detailHead}><View style={{ flex: 1 }}><Text style={[styles.detailEyebrow, { color: colors.primary }]}>DEFECT DETAIL · {selected.id}</Text><Text style={[styles.detailTitle, { color: colors.foreground }]}>{selected.type} · {selected.line}</Text></View><Pressable onPress={() => setSelected(null)}><MaterialCommunityIcons name="close" size={20} color={colors.mutedForeground} /></Pressable></View><Text style={[styles.detailText, { color: colors.mutedForeground }]}>Severity {selected.severity}. {selected.ncr ? 'Terkait ' + selected.ncr + '.' : 'Belum dibuatkan NCR.'} Pilih aksi untuk menyimpan review lokal.</Text><Pressable testID="acknowledge-defect" onPress={() => { setAcknowledged((items) => items.includes(selected.id) ? items.filter((id) => id !== selected.id) : [...items, selected.id]); void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); }} style={({ pressed }) => [styles.ackButton, { backgroundColor: acknowledged.includes(selected.id) ? colors.secondary : colors.primary, opacity: pressed ? 0.75 : 1 }]}><MaterialCommunityIcons name={acknowledged.includes(selected.id) ? 'check-circle-outline' : 'alert-circle-check-outline'} size={17} color={acknowledged.includes(selected.id) ? colors.primary : colors.primaryForeground} /><Text style={[styles.ackText, { color: acknowledged.includes(selected.id) ? colors.primary : colors.primaryForeground }]}>{acknowledged.includes(selected.id) ? 'Review tersimpan lokal' : 'Tandai sudah direview'}</Text></Pressable></View> : null}
  </Screen>;
}

function DefectCard({ defect, selected, acknowledged, onPress }: { defect: Defect; selected: boolean; acknowledged: boolean; onPress: () => void }) {
  const colors = useColors();
  const major = defect.severity === 'Major';
  return <Pressable testID={'defect-' + defect.id} onPress={onPress} style={({ pressed }) => [styles.defectCard, { backgroundColor: colors.card, borderColor: selected ? colors.primary : colors.border, opacity: pressed ? 0.8 : 1 }]}><View style={styles.defectTop}><View style={[styles.defectIcon, { backgroundColor: (major ? colors.destructive : colors.warning) + '22' }]}><MaterialCommunityIcons name={major ? 'alert-octagon-outline' : 'alert-outline'} size={19} color={major ? colors.destructive : colors.warning} /></View><View style={styles.defectMain}><Text style={[styles.defectId, { color: colors.mutedForeground }]}>{defect.id} · {defect.line}</Text><Text style={[styles.defectName, { color: colors.foreground }]}>{defect.type}</Text></View>{acknowledged ? <MaterialCommunityIcons name="check-circle" size={17} color={colors.success} /> : null}<Chevron /></View><View style={styles.defectBottom}><Pill label={defect.severity} tone={major ? 'red' : 'amber'} /><Pill label={defect.status} tone={defect.status === 'Open' ? 'amber' : 'blue'} />{defect.ncr ? <Text style={[styles.ncr, { color: colors.primary }]}>{defect.ncr}</Text> : null}</View></Pressable>;
}

const styles = StyleSheet.create({
  gradeCard: { borderWidth: 1, borderRadius: 18, padding: 16, gap: 16 },
  gradeTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  gradeEyebrow: { fontFamily: font.bold, fontSize: 9, letterSpacing: 1 },
  gradeTitle: { fontFamily: font.bold, fontSize: 32, marginTop: 3 },
  gradeSub: { fontFamily: font.regular, fontSize: 12, marginTop: 2 },
  gradeCircle: { width: 62, height: 62, borderRadius: 62, borderWidth: 4, alignItems: 'center', justifyContent: 'center' },
  gradeCircleText: { fontFamily: font.bold, fontSize: 27 },
  gradeMetric: { gap: 8 },
  gradeMetricTop: { flexDirection: 'row', justifyContent: 'space-between' },
  gradeMeta: { fontFamily: font.regular, fontSize: 11 },
  gradeMetricValue: { fontFamily: font.semi, fontSize: 13 },
  metricRow: { flexDirection: 'row', gap: 10 },
  section: { gap: 12 },
  filterRow: { flexDirection: 'row', gap: 7, flexWrap: 'wrap' },
  defectList: { gap: 10 },
  defectCard: { borderWidth: 1, borderRadius: 16, padding: 13, gap: 12 },
  defectTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  defectIcon: { width: 38, height: 38, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  defectMain: { flex: 1, gap: 3 },
  defectId: { fontFamily: font.mono, fontSize: 9 },
  defectName: { fontFamily: font.semi, fontSize: 14 },
  defectBottom: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  ncr: { fontFamily: font.semi, fontSize: 10, marginLeft: 'auto' },
  detailCard: { borderWidth: 1, borderRadius: 16, padding: 15, gap: 12 },
  detailHead: { flexDirection: 'row', alignItems: 'flex-start' },
  detailEyebrow: { fontFamily: font.bold, fontSize: 9, letterSpacing: 1 },
  detailTitle: { fontFamily: font.semi, fontSize: 17, marginTop: 3 },
  detailText: { fontFamily: font.regular, fontSize: 13, lineHeight: 19 },
  ackButton: { minHeight: 42, borderRadius: 11, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  ackText: { fontFamily: font.semi, fontSize: 13 },
});
