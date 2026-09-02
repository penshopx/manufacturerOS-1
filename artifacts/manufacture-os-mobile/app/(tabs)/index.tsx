import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import {
  AppHeader,
  AgentRow,
  MetricTile,
  ScreenScroll,
  SectionTitle,
  StatusDot,
  Tag,
} from '@/components/ManufactureUI';

export default function OverviewScreen() {
  const colors = useColors();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <AppHeader title="Ringkasan operasi" subtitle="SITE 01 · KARAWANG" />
      <ScreenScroll>
        <View style={styles.greetingRow}>
          <View>
            <Text style={[styles.greeting, { color: colors.foreground }]}>Selamat pagi, Dimas</Text>
            <Text style={[styles.greetingSub, { color: colors.mutedForeground }]}>Kamis, 03 September 2026 · Shift 1</Text>
          </View>
          <Tag color={colors.success} background={colors.successSoft}>LIVE</Tag>
        </View>

        <View style={[styles.healthCard, { backgroundColor: colors.surfaceStrong, borderColor: colors.border }]}>
          <View style={styles.healthTop}>
            <View>
              <Text style={[styles.cardEyebrow, { color: colors.mutedForeground }]}>OPERATIONAL HEALTH</Text>
              <Text style={[styles.healthValue, { color: colors.foreground }]}>94.2<Text style={[styles.percent, { color: colors.mutedForeground }]}>%</Text></Text>
            </View>
            <View style={styles.healthBadge}>
              <Ionicons name="trending-up" size={15} color={colors.success} />
              <Text style={[styles.healthBadgeText, { color: colors.success }]}>+2.8%</Text>
            </View>
          </View>
          <View style={styles.sparkline}>
            {[35, 48, 42, 68, 57, 76, 69, 86, 78, 92, 84, 96].map((height, index) => (
              <View
                key={index}
                style={[
                  styles.sparkBar,
                  { height: `${height}%`, backgroundColor: index > 8 ? colors.primary : colors.surfaceElevated },
                ]}
              />
            ))}
          </View>
          <View style={styles.healthFooter}>
            <View style={styles.inlineStatus}>
              <StatusDot color={colors.success} />
              <Text style={[styles.inlineText, { color: colors.mutedForeground }]}>Semua sistem berjalan</Text>
            </View>
            <Text style={[styles.updatedText, { color: colors.mutedForeground }]}>Diperbarui 2 mnt lalu</Text>
          </View>
        </View>

        <SectionTitle title="Command center" action="Lihat semua" onAction={() => router.push('/agents')} />
        <View style={styles.metricGrid}>
          <MetricTile icon="speedometer-outline" label="Produksi" value="92.8%" trend="+4.6% vs kemarin" tone="success" onPress={() => router.push('/production')} />
          <MetricTile icon="shield-checkmark-outline" label="Kualitas" value="98.6%" trend="Dalam batas aman" tone="info" onPress={() => router.push('/quality')} />
          <MetricTile icon="alert-circle-outline" label="Keselamatan" value="4" trend="Tindakan terbuka" tone="warning" onPress={() => router.push('/safety')} />
          <MetricTile icon="sparkles-outline" label="AI Agents" value="8 / 8" trend="Semua aktif" tone="success" onPress={() => router.push('/agents')} />
        </View>

        <SectionTitle title="Perlu perhatian" action="2 sinyal" onAction={() => router.push('/quality')} />
        <Pressable
          testID="quality-alert"
          onPress={() => router.push('/quality')}
          style={({ pressed }) => [
            styles.alertCard,
            { backgroundColor: colors.warningSoft, borderColor: colors.warning + '55', opacity: pressed ? 0.78 : 1 },
          ]}
        >
          <View style={[styles.alertIcon, { backgroundColor: colors.warning + '22' }]}>
            <Ionicons name="warning-outline" size={20} color={colors.warning} />
          </View>
          <View style={styles.alertCopy}>
            <Text style={[styles.alertTitle, { color: colors.foreground }]}>Variasi seal C-120 terdeteksi</Text>
            <Text style={[styles.alertBody, { color: colors.mutedForeground }]}>Quality Agent · Line 02 · 18 menit lalu</Text>
          </View>
          <Feather name="chevron-right" size={18} color={colors.warning} />
        </Pressable>

        <SectionTitle title="Aktivitas agent" action="8 agent aktif" onAction={() => router.push('/agents')} />
        <AgentRow name="Quality Agent" specialty="Memantau inspeksi & defect" status="Aktif" icon="check-circle" accent={colors.info} onPress={() => router.push('/agents')} />
        <AgentRow name="Production Agent" specialty="Optimasi output line" status="Aktif" icon="activity" accent={colors.success} onPress={() => router.push('/agents')} />
        <AgentRow name="Safety Agent" specialty="Menganalisis risiko operasional" status="Review" icon="shield" accent={colors.warning} onPress={() => router.push('/agents')} />
      </ScreenScroll>
    </View>
  );
}

const styles = StyleSheet.create({
  greetingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  greeting: { fontSize: 18, fontFamily: 'IBMPlexSans_700Bold' },
  greetingSub: { fontSize: 11, fontFamily: 'IBMPlexSans_400Regular', marginTop: 4 },
  healthCard: { borderRadius: 20, borderWidth: 1, padding: 18, marginBottom: 24 },
  healthTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  cardEyebrow: { fontSize: 10, fontFamily: 'IBMPlexSans_700Bold', letterSpacing: 1.1 },
  healthValue: { fontSize: 42, fontFamily: 'IBMPlexSans_700Bold', letterSpacing: -1.5, marginTop: 4 },
  percent: { fontSize: 20, fontFamily: 'IBMPlexSans_600SemiBold', letterSpacing: 0 },
  healthBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 6 },
  healthBadgeText: { fontSize: 12, fontWeight: '700' },
  sparkline: { height: 58, flexDirection: 'row', alignItems: 'flex-end', gap: 5, marginTop: 10 },
  sparkBar: { flex: 1, minHeight: 6, borderRadius: 4 },
  healthFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 },
  inlineStatus: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  inlineText: { fontSize: 11 },
  updatedText: { fontSize: 10 },
  metricGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  alertCard: { minHeight: 74, borderRadius: 16, borderWidth: 1, padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  alertIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 11 },
  alertCopy: { flex: 1 },
  alertTitle: { fontSize: 13, fontWeight: '700' },
  alertBody: { fontSize: 11, marginTop: 4 },
});
