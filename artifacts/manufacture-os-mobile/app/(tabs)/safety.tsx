import { Feather, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { useAppPreferences } from '@/context/AppPreferences';
import { AppHeader, EmptyState, ScreenScroll, SectionTitle, Tag } from '@/components/ManufactureUI';

const safetyItems = [
  { id: 'ppe-line-02', title: 'Verifikasi PPE Line 02', detail: 'Safety Agent · prioritas tinggi' },
  { id: 'forklift-zone-b', title: 'Review jalur forklift Zone B', detail: 'Safety Agent · jatuh tempo hari ini' },
  { id: 'fire-exit-04', title: 'Cek akses emergency exit 04', detail: 'Checklist rutin · 2 jam lalu' },
];

export default function SafetyScreen() {
  const colors = useColors();
  const { completedSafetyIds, toggleSafetyItem } = useAppPreferences();
  const [auditStarted, setAuditStarted] = useState(false);
  const openCount = safetyItems.filter((item) => !completedSafetyIds.includes(item.id)).length + 1;

  const toggle = (id: string) => {
    Haptics.selectionAsync();
    toggleSafetyItem(id);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <AppHeader title="Keselamatan" subtitle="HSE · HAZARD · COMPLIANCE" />
      <ScreenScroll>
        <View style={[styles.hero, { backgroundColor: colors.dangerSoft, borderColor: colors.destructive + '55' }]}>
          <View style={[styles.heroIcon, { backgroundColor: colors.destructive + '22' }]}>
            <Ionicons name="shield-outline" size={25} color={colors.destructive} />
          </View>
          <View style={styles.heroCopy}>
            <Text style={[styles.heroKicker, { color: colors.mutedForeground }]}>TINDAKAN TERBUKA</Text>
            <Text style={[styles.heroValue, { color: colors.foreground }]}>{openCount}</Text>
            <Text style={[styles.heroBody, { color: colors.mutedForeground }]}>items membutuhkan follow-up</Text>
          </View>
          <Tag color={colors.warning} background={colors.warningSoft}>REVIEW</Tag>
        </View>

        <View style={styles.actionRow}>
          <Pressable
            testID="start-safety-audit"
            onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setAuditStarted(true); }}
            style={({ pressed }) => [styles.actionButton, { backgroundColor: colors.primary, opacity: pressed ? 0.72 : 1 }]}
          >
            <Feather name="clipboard" size={17} color={colors.primaryForeground} />
            <Text style={[styles.actionText, { color: colors.primaryForeground }]}>Mulai audit</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => setAuditStarted(true)}
            style={({ pressed }) => [styles.actionButton, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, opacity: pressed ? 0.72 : 1 }]}
          >
            <Feather name="alert-triangle" size={17} color={colors.warning} />
            <Text style={[styles.actionText, { color: colors.foreground }]}>Lapor hazard</Text>
          </Pressable>
        </View>

        <SectionTitle title="Checklist Safety Agent" action="Semua" onAction={() => undefined} />
        {safetyItems.map((item) => {
          const completed = completedSafetyIds.includes(item.id);
          return (
            <Pressable
              key={item.id}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: completed }}
              testID={`safety-${item.id}`}
              onPress={() => toggle(item.id)}
              style={({ pressed }) => [styles.checkRow, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.76 : 1 }]}
            >
              <View style={[styles.checkbox, { borderColor: completed ? colors.success : colors.input, backgroundColor: completed ? colors.success : 'transparent' }]}>
                {completed ? <Feather name="check" size={14} color={colors.background} /> : null}
              </View>
              <View style={styles.checkCopy}>
                <Text style={[styles.checkTitle, { color: completed ? colors.mutedForeground : colors.foreground, textDecorationLine: completed ? 'line-through' : 'none' }]}>{item.title}</Text>
                <Text style={[styles.checkDetail, { color: colors.mutedForeground }]}>{item.detail}</Text>
              </View>
              <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
            </Pressable>
          );
        })}

        {auditStarted ? <EmptyState title="Audit siap dimulai" body="Mode audit lokal aktif. Tandai checklist saat verifikasi di lantai produksi." /> : null}
      </ScreenScroll>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 20, borderWidth: 1, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  heroIcon: { width: 48, height: 48, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  heroCopy: { flex: 1 },
  heroKicker: { fontSize: 10, fontFamily: 'IBMPlexSans_700Bold', letterSpacing: 1 },
  heroValue: { fontSize: 30, fontFamily: 'IBMPlexSans_700Bold', marginTop: 1 },
  heroBody: { fontSize: 10, marginTop: 1 },
  actionRow: { flexDirection: 'row', gap: 9, marginBottom: 25 },
  actionButton: { flex: 1, minHeight: 46, borderRadius: 13, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  actionText: { fontSize: 12, fontWeight: '700' },
  checkRow: { minHeight: 68, borderRadius: 15, borderWidth: 1, marginBottom: 8, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center' },
  checkbox: { width: 23, height: 23, borderRadius: 7, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', marginRight: 11 },
  checkCopy: { flex: 1 },
  checkTitle: { fontSize: 12, fontWeight: '700' },
  checkDetail: { fontSize: 10, marginTop: 4 },
});