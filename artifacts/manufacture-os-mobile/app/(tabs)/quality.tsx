import { Feather, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { useAppPreferences } from '@/context/AppPreferences';
import { AppHeader, EmptyState, ScreenScroll, SectionTitle, Tag } from '@/components/ManufactureUI';

const inspections = [
  { line: 'Line 02 · C-120', issue: 'Variasi seal terdeteksi', time: '18 menit lalu', severity: 'Review' },
  { line: 'Line 01 · B-204', issue: 'Inspeksi visual selesai', time: '46 menit lalu', severity: 'Lulus' },
  { line: 'Line 04 · A-102', issue: 'Torque dalam batas target', time: '1 jam lalu', severity: 'Lulus' },
];

export default function QualityScreen() {
  const colors = useColors();
  const { qualityAlertReviewed, reviewQualityAlert } = useAppPreferences();

  const review = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    reviewQualityAlert();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <AppHeader title="Kualitas" subtitle="INSPEKSI · DEFECT · TRACEABILITY" />
      <ScreenScroll>
          <View style={[styles.scoreCard, { backgroundColor: colors.surfaceStrong, borderColor: colors.border }]}>
          <View>
            <Text style={[styles.kicker, { color: colors.mutedForeground }]}>QUALITY SCORE</Text>
            <Text style={[styles.score, { color: colors.foreground }]}>98.6<Text style={styles.scorePercent}>%</Text></Text>
            <View style={styles.scoreTrend}>
              <Feather name="trending-up" size={13} color={colors.success} />
              <Text style={[styles.trendText, { color: colors.success }]}>+1.2% dari minggu lalu</Text>
            </View>
          </View>
          <View style={[styles.scoreRing, { borderColor: colors.success }]}>
            <Ionicons name="shield-checkmark-outline" size={27} color={colors.success} />
            <Text style={[styles.ringLabel, { color: colors.success }]}>AMAN</Text>
          </View>
        </View>

        <View style={styles.quickStats}>
          <QuickStat label="First pass yield" value="97.4%" color={colors.info} />
          <QuickStat label="Defect rate" value="0.8%" color={colors.warning} />
          <QuickStat label="Open CAPA" value="2" color={colors.destructive} />
        </View>

        <SectionTitle title="Sinyal quality agent" />
        {!qualityAlertReviewed ? (
          <View style={[styles.alertCard, { backgroundColor: colors.warningSoft, borderColor: colors.warning + '55' }]}>
            <View style={[styles.alertIcon, { backgroundColor: colors.warning + '22' }]}>
              <Ionicons name="warning-outline" size={20} color={colors.warning} />
            </View>
            <View style={styles.alertCopy}>
              <Text style={[styles.alertTitle, { color: colors.foreground }]}>Variasi seal C-120</Text>
              <Text style={[styles.alertBody, { color: colors.mutedForeground }]}>3 unit di Line 02 membutuhkan inspeksi lanjutan.</Text>
              <Pressable
                accessibilityRole="button"
                testID="review-quality-alert"
                onPress={review}
                style={({ pressed }) => [styles.reviewButton, { backgroundColor: colors.warning, opacity: pressed ? 0.7 : 1 }]}
              >
                <Text style={[styles.reviewButtonText, { color: colors.background }]}>Tandai ditinjau</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <EmptyState title="Tidak ada sinyal terbuka" body="Quality Agent sudah mencatat review Anda di perangkat ini." />
        )}

        <SectionTitle title="Inspeksi terbaru" action="Export" onAction={() => undefined} />
        {inspections.map((item) => (
          <View key={item.line} style={[styles.inspectionRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.inspectionIcon, { backgroundColor: item.severity === 'Review' ? colors.warningSoft : colors.successSoft }]}>
              <Ionicons name={item.severity === 'Review' ? 'search-outline' : 'checkmark-outline'} size={17} color={item.severity === 'Review' ? colors.warning : colors.success} />
            </View>
            <View style={styles.inspectionCopy}>
              <Text style={[styles.inspectionLine, { color: colors.foreground }]}>{item.line}</Text>
              <Text style={[styles.inspectionIssue, { color: colors.mutedForeground }]}>{item.issue} · {item.time}</Text>
            </View>
            <Tag color={item.severity === 'Review' ? colors.warning : colors.success} background={item.severity === 'Review' ? colors.warningSoft : colors.successSoft}>{item.severity}</Tag>
          </View>
        ))}
      </ScreenScroll>
    </View>
  );
}

function QuickStat({ label, value, color }: { label: string; value: string; color: string }) {
  const colors = useColors();
  return (
    <View style={[styles.quickStat, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.quickDot, { backgroundColor: color }]} />
      <Text style={[styles.quickValue, { color: colors.foreground }]}>{value}</Text>
      <Text style={[styles.quickLabel, { color: colors.mutedForeground }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scoreCard: { borderRadius: 20, borderWidth: 1, padding: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  kicker: { fontSize: 10, fontFamily: 'IBMPlexSans_700Bold', letterSpacing: 1.1 },
  score: { fontSize: 40, fontFamily: 'IBMPlexSans_700Bold', marginTop: 3 },
  scorePercent: { fontSize: 18, fontFamily: 'IBMPlexSans_600SemiBold' },
  scoreTrend: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 },
  trendText: { fontSize: 11, fontWeight: '600' },
  scoreRing: { width: 78, height: 78, borderRadius: 39, borderWidth: 3, alignItems: 'center', justifyContent: 'center' },
  ringLabel: { fontSize: 10, fontWeight: '800', marginTop: 3, letterSpacing: 0.6 },
  quickStats: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  quickStat: { width: '31.5%', borderRadius: 13, borderWidth: 1, padding: 11 },
  quickDot: { width: 6, height: 6, borderRadius: 3, marginBottom: 8 },
  quickValue: { fontSize: 15, fontWeight: '700' },
  quickLabel: { fontSize: 10, marginTop: 3, lineHeight: 14 },
  alertCard: { borderRadius: 16, borderWidth: 1, padding: 12, flexDirection: 'row', marginBottom: 24 },
  alertIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 11 },
  alertCopy: { flex: 1 },
  alertTitle: { fontSize: 14, fontWeight: '700' },
  alertBody: { fontSize: 11, marginTop: 5, lineHeight: 16 },
  reviewButton: { alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, marginTop: 11 },
  reviewButtonText: { fontSize: 11, fontWeight: '800' },
  inspectionRow: { minHeight: 70, borderRadius: 15, borderWidth: 1, paddingHorizontal: 11, marginBottom: 8, flexDirection: 'row', alignItems: 'center' },
  inspectionIcon: { width: 35, height: 35, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  inspectionCopy: { flex: 1 },
  inspectionLine: { fontSize: 12, fontWeight: '700' },
  inspectionIssue: { fontSize: 10, marginTop: 4 },
});