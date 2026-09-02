
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { ReactNode } from 'react';
import { type DimensionValue, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

export const font = {
  regular: 'IBMPlexSans_400Regular',
  medium: 'IBMPlexSans_500Medium',
  semi: 'IBMPlexSans_600SemiBold',
  bold: 'IBMPlexSans_700Bold',
  mono: 'IBMPlexMono_500Medium',
};

export function Screen({ children, scroll = true, contentStyle }: { children: ReactNode; scroll?: boolean; contentStyle?: object }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const top = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;
  const bottom = Platform.OS === 'web' ? 34 : Math.max(insets.bottom, 24);
  if (!scroll) {
    return <View style={[styles.screen, { backgroundColor: colors.background, paddingTop: top, paddingBottom: bottom }, contentStyle]}>{children}</View>;
  }
  return <ScrollView style={[styles.screen, { backgroundColor: colors.background }]} contentContainerStyle={[styles.scrollContent, { paddingTop: top, paddingBottom: bottom }, contentStyle]} showsVerticalScrollIndicator={false}>{children}</ScrollView>;
}

export function BrandHeader({ eyebrow = 'OPERATIONS MOBILE', title, subtitle, icon = 'factory' }: { eyebrow?: string; title: string; subtitle?: string; icon?: string }) {
  const colors = useColors();
  return <View style={styles.header}>
    <View style={styles.headerIdentity}>
      <View style={[styles.brandMark, { backgroundColor: colors.primary }]}>
        <MaterialCommunityIcons name={icon as never} size={22} color={colors.primaryForeground} />
      </View>
      <View style={styles.headerCopy}>
        <Text style={[styles.eyebrow, { color: colors.primary }]}>{eyebrow}</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
        {subtitle ? <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>{subtitle}</Text> : null}
      </View>
    </View>
    <View style={[styles.liveBadge, { backgroundColor: colors.successMuted }]}>
      <View style={[styles.liveDot, { backgroundColor: colors.success }]} />
      <Text style={[styles.liveText, { color: colors.success }]}>LIVE</Text>
    </View>
  </View>;
}

export function SectionHeader({ title, caption, action, onAction }: { title: string; caption?: string; action?: string; onAction?: () => void }) {
  const colors = useColors();
  return <View style={styles.sectionHeader}>
    <View style={styles.sectionCopy}>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{title}</Text>
      {caption ? <Text style={[styles.sectionCaption, { color: colors.mutedForeground }]}>{caption}</Text> : null}
    </View>
    {action && onAction ? <Pressable testID={'action-' + title} onPress={onAction} hitSlop={8}><Text style={[styles.actionText, { color: colors.primary }]}>{action}</Text></Pressable> : null}
  </View>;
}

export function MetricCard({ label, value, helper, tone = 'teal', icon }: { label: string; value: string; helper?: string; tone?: 'teal' | 'green' | 'amber' | 'blue'; icon?: string }) {
  const colors = useColors();
  const toneColor = tone === 'green' ? colors.success : tone === 'amber' ? colors.warning : tone === 'blue' ? colors.info : colors.primary;
  return <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
    <View style={styles.metricTop}>
      <Text style={[styles.metricLabel, { color: colors.mutedForeground }]}>{label}</Text>
      {icon ? <MaterialCommunityIcons name={icon as never} size={18} color={toneColor} /> : null}
    </View>
    <Text style={[styles.metricValue, { color: colors.foreground }]}>{value}</Text>
    {helper ? <Text style={[styles.metricHelper, { color: toneColor }]}>{helper}</Text> : null}
  </View>;
}

export function Pill({ label, tone = 'neutral', active = false, onPress }: { label: string; tone?: 'neutral' | 'teal' | 'green' | 'amber' | 'red' | 'blue'; active?: boolean; onPress?: () => void }) {
  const colors = useColors();
  const toneColor = tone === 'green' ? colors.success : tone === 'amber' ? colors.warning : tone === 'red' ? colors.destructive : tone === 'blue' ? colors.info : colors.primary;
  const node = <View style={[styles.pill, { backgroundColor: active ? colors.primary : tone === 'neutral' ? colors.muted : toneColor + '22', borderColor: active ? colors.primary : toneColor + '55' }]}><Text style={[styles.pillText, { color: active ? colors.primaryForeground : tone === 'neutral' ? colors.secondaryForeground : toneColor }]}>{label}</Text></View>;
  return onPress ? <Pressable testID={'filter-' + label} onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>{node}</Pressable> : node;
}

export function ProgressBar({ value, color }: { value: number; color?: string }) {
  const colors = useColors();
  const width = (Math.min(value, 100) + '%') as DimensionValue;
  return <View style={[styles.progressTrack, { backgroundColor: colors.secondary }]}><View style={[styles.progressFill, { width, backgroundColor: color || colors.primary }]} /></View>;
}

export function EmptyHint({ icon, title, body }: { icon: string; title: string; body: string }) {
  const colors = useColors();
  return <View style={[styles.emptyHint, { backgroundColor: colors.card, borderColor: colors.border }]}><MaterialCommunityIcons name={icon as never} size={24} color={colors.mutedForeground} /><Text style={[styles.emptyTitle, { color: colors.foreground }]}>{title}</Text><Text style={[styles.emptyBody, { color: colors.mutedForeground }]}>{body}</Text></View>;
}

export function Chevron() {
  const colors = useColors();
  return <Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />;
}

export function AgentStatusDot({ state }: { state: 'active' | 'watch' | 'idle' }) {
  const colors = useColors();
  const color = state === 'active' ? colors.success : state === 'watch' ? colors.warning : colors.mutedForeground;
  return <View style={[styles.agentDot, { backgroundColor: color }]} />;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scrollContent: { paddingHorizontal: 18, gap: 22 },
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 },
  headerIdentity: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 12 },
  brandMark: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  headerCopy: { flex: 1 },
  eyebrow: { fontFamily: font.semi, fontSize: 10, letterSpacing: 1.25, marginBottom: 2 },
  title: { fontFamily: font.bold, fontSize: 25, letterSpacing: -0.4 },
  subtitle: { fontFamily: font.regular, fontSize: 13, lineHeight: 18, marginTop: 2 },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 7 },
  liveDot: { width: 6, height: 6, borderRadius: 6 },
  liveText: { fontFamily: font.bold, fontSize: 10, letterSpacing: 0.8 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  sectionCopy: { flex: 1 },
  sectionTitle: { fontFamily: font.semi, fontSize: 17 },
  sectionCaption: { fontFamily: font.regular, fontSize: 12, marginTop: 3 },
  actionText: { fontFamily: font.semi, fontSize: 12 },
  metricCard: { minWidth: 145, borderRadius: 14, borderWidth: 1, padding: 14, gap: 6 },
  metricTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 4 },
  metricLabel: { fontFamily: font.medium, fontSize: 11, flex: 1 },
  metricValue: { fontFamily: font.bold, fontSize: 23, letterSpacing: -0.4 },
  metricHelper: { fontFamily: font.medium, fontSize: 11 },
  pill: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1 },
  pillText: { fontFamily: font.semi, fontSize: 11 },
  progressTrack: { height: 7, borderRadius: 7, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 7 },
  emptyHint: { alignItems: 'center', borderRadius: 16, borderWidth: 1, padding: 24, gap: 8 },
  emptyTitle: { fontFamily: font.semi, fontSize: 16 },
  emptyBody: { fontFamily: font.regular, fontSize: 13, textAlign: 'center', lineHeight: 19 },
  agentDot: { width: 8, height: 8, borderRadius: 8 },
});
