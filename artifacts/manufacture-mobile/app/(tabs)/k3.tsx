
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { hazardReports, HazardReport } from '@/data/demo';
import { BrandHeader, Chevron, font, MetricCard, Pill, ProgressBar, Screen, SectionHeader } from '@/components/ManufactureUI';

export default function SafetyScreen() {
  const colors = useColors();
  const [selected, setSelected] = useState<HazardReport | null>(null);
  const [reviewed, setReviewed] = useState<string[]>([]);
  const [ppeChecked, setPpeChecked] = useState(false);
  return <Screen>
    <BrandHeader title="Keselamatan" subtitle="K3, hazard, dan kepatuhan PPE" icon="shield-check-outline" />
    <View style={[styles.scoreCard, { backgroundColor: colors.card, borderColor: colors.warning + '66' }]}><View style={styles.scoreTop}><View><Text style={[styles.scoreEyebrow, { color: colors.warning }]}>SAFETY SCORE</Text><Text style={[styles.scoreValue, { color: colors.foreground }]}>87<Text style={[styles.scoreUnit, { color: colors.mutedForeground }]}> / 100</Text></Text><Text style={[styles.scoreSub, { color: colors.mutedForeground }]}>Naik 3 poin dari bulan lalu</Text></View><View style={[styles.scoreIcon, { backgroundColor: colors.warning + '22' }]}><MaterialCommunityIcons name="shield-check" size={32} color={colors.warning} /></View></View><View style={styles.scoreProgress}><ProgressBar value={87} color={colors.warning} /><View style={styles.scoreLegend}><Text style={[styles.scoreMeta, { color: colors.mutedForeground }]}>Target 90</Text><Text style={[styles.scoreMeta, { color: colors.warning }]}>Gap 3 poin</Text></View></View></View>
    <View style={styles.metricRow}><MetricCard label="Incident (30d)" value="0" helper="Zero accident" tone="green" icon="check-decagram-outline" /><MetricCard label="Hazard report" value="3" helper="Menunggu review" tone="amber" icon="alert-outline" /></View>
    <View style={[styles.ppeCard, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.ppeIcon, { backgroundColor: colors.warning + '22' }]}><MaterialCommunityIcons name="hard-hat" size={23} color={colors.warning} /></View><View style={styles.ppeCopy}><Text style={[styles.ppeTitle, { color: colors.foreground }]}>PPE compliance · Area Welding</Text><Text style={[styles.ppeSub, { color: colors.mutedForeground }]}>85% · target minimal 95%</Text></View><Pressable testID="ppe-check" onPress={() => { setPpeChecked(!ppeChecked); void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); }} style={({ pressed }) => [styles.checkButton, { borderColor: ppeChecked ? colors.success : colors.warning, backgroundColor: ppeChecked ? colors.successMuted : colors.warning + '22', opacity: pressed ? 0.75 : 1 }]}><MaterialCommunityIcons name={ppeChecked ? 'check' : 'eye-outline'} size={19} color={ppeChecked ? colors.success : colors.warning} /></Pressable></View>
    <View style={styles.section}><SectionHeader title="Hazard terbuka" caption="Review temuan keselamatan di lapangan" /><View style={styles.hazardList}>{hazardReports.map((report) => <HazardCard key={report.id} report={report} reviewed={reviewed.includes(report.id)} selected={selected?.id === report.id} onPress={() => { setSelected(report); void Haptics.selectionAsync(); }} />)}</View></View>
    {selected ? <View style={[styles.detailCard, { backgroundColor: colors.card, borderColor: colors.warning + '66' }]}><View style={styles.detailHead}><View style={{ flex: 1 }}><Text style={[styles.detailEyebrow, { color: colors.warning }]}>HAZARD DETAIL · {selected.id}</Text><Text style={[styles.detailTitle, { color: colors.foreground }]}>{selected.title}</Text></View><Pressable onPress={() => setSelected(null)}><MaterialCommunityIcons name="close" size={20} color={colors.mutedForeground} /></Pressable></View><Text style={[styles.detailText, { color: colors.mutedForeground }]}>{selected.area} · dilaporkan {selected.age} lalu. Prioritas {selected.priority}. Tandai setelah supervisor melakukan pengecekan lapangan.</Text><Pressable testID="review-hazard" onPress={() => { setReviewed((items) => items.includes(selected.id) ? items.filter((id) => id !== selected.id) : [...items, selected.id]); void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); }} style={({ pressed }) => [styles.reviewButton, { backgroundColor: colors.warning, opacity: pressed ? 0.75 : 1 }]}><MaterialCommunityIcons name={reviewed.includes(selected.id) ? 'check-circle-outline' : 'clipboard-check-outline'} size={17} color={colors.background} /><Text style={[styles.reviewButtonText, { color: colors.background }]}>{reviewed.includes(selected.id) ? 'Review tersimpan lokal' : 'Tandai sudah direview'}</Text></Pressable></View> : null}
    <View style={[styles.note, { backgroundColor: colors.secondary, borderColor: colors.border }]}><MaterialCommunityIcons name="information-outline" size={18} color={colors.mutedForeground} /><Text style={[styles.noteText, { color: colors.mutedForeground }]}>Temuan keselamatan pada mode demo tidak mengirim laporan ke sistem pusat.</Text></View>
  </Screen>;
}

function HazardCard({ report, reviewed, selected, onPress }: { report: HazardReport; reviewed: boolean; selected: boolean; onPress: () => void }) {
  const colors = useColors();
  return <Pressable testID={'hazard-' + report.id} onPress={onPress} style={({ pressed }) => [styles.hazardCard, { backgroundColor: colors.card, borderColor: selected ? colors.warning : colors.border, opacity: pressed ? 0.8 : 1 }]}><View style={[styles.hazardIcon, { backgroundColor: (report.priority === 'High' ? colors.destructive : colors.warning) + '22' }]}><MaterialCommunityIcons name="alert-outline" size={20} color={report.priority === 'High' ? colors.destructive : colors.warning} /></View><View style={styles.hazardCopy}><View style={styles.hazardTitleRow}><Text style={[styles.hazardTitle, { color: colors.foreground }]}>{report.title}</Text>{reviewed ? <MaterialCommunityIcons name="check-circle" size={16} color={colors.success} /> : null}</View><Text style={[styles.hazardMeta, { color: colors.mutedForeground }]}>{report.area} · {report.age}</Text></View><Chevron /></Pressable>;
}

const styles = StyleSheet.create({
  scoreCard: { borderWidth: 1, borderRadius: 18, padding: 16, gap: 16 },
  scoreTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  scoreEyebrow: { fontFamily: font.bold, fontSize: 9, letterSpacing: 1 },
  scoreValue: { fontFamily: font.bold, fontSize: 34, letterSpacing: -1, marginTop: 3 },
  scoreUnit: { fontFamily: font.regular, fontSize: 15, letterSpacing: 0 },
  scoreSub: { fontFamily: font.regular, fontSize: 12, marginTop: 1 },
  scoreIcon: { width: 62, height: 62, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  scoreProgress: { gap: 7 },
  scoreLegend: { flexDirection: 'row', justifyContent: 'space-between' },
  scoreMeta: { fontFamily: font.regular, fontSize: 11 },
  metricRow: { flexDirection: 'row', gap: 10 },
  ppeCard: { borderWidth: 1, borderRadius: 16, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 11 },
  ppeIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  ppeCopy: { flex: 1, gap: 3 },
  ppeTitle: { fontFamily: font.semi, fontSize: 13 },
  ppeSub: { fontFamily: font.regular, fontSize: 11 },
  checkButton: { width: 40, height: 40, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  section: { gap: 12 },
  hazardList: { gap: 10 },
  hazardCard: { borderWidth: 1, borderRadius: 16, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 10 },
  hazardIcon: { width: 39, height: 39, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  hazardCopy: { flex: 1, gap: 4 },
  hazardTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  hazardTitle: { fontFamily: font.semi, fontSize: 13, flex: 1 },
  hazardMeta: { fontFamily: font.regular, fontSize: 11 },
  detailCard: { borderWidth: 1, borderRadius: 16, padding: 15, gap: 12 },
  detailHead: { flexDirection: 'row', alignItems: 'flex-start' },
  detailEyebrow: { fontFamily: font.bold, fontSize: 9, letterSpacing: 1 },
  detailTitle: { fontFamily: font.semi, fontSize: 17, marginTop: 3 },
  detailText: { fontFamily: font.regular, fontSize: 13, lineHeight: 19 },
  reviewButton: { minHeight: 42, borderRadius: 11, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  reviewButtonText: { fontFamily: font.semi, fontSize: 13 },
  note: { borderWidth: 1, borderRadius: 12, padding: 12, flexDirection: 'row', gap: 8 },
  noteText: { fontFamily: font.regular, fontSize: 11, lineHeight: 16, flex: 1 },
});
