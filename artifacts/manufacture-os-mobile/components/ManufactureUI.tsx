import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  RefreshControlProps,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

type Colors = ReturnType<typeof useColors>;

export function AppHeader({
  eyebrow = 'MANUFACTUREOS',
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topInset = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;

  return (
    <View style={[styles.header, { paddingTop: topInset + 12 }]}>
      <View style={styles.headerBrand}>
        <Image source={require('@/assets/images/icon.png')} style={styles.brandIcon} />
        <View style={styles.headerCopy}>
          <Text style={[styles.eyebrow, { color: colors.primary }]}>{eyebrow}</Text>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>{title}</Text>
          {subtitle ? (
            <Text style={[styles.headerSubtitle, { color: colors.mutedForeground }]}>{subtitle}</Text>
          ) : null}
        </View>
      </View>
      <Pressable
        accessibilityLabel="Buka notifikasi"
        testID="notification-button"
        style={({ pressed }) => [
          styles.iconButton,
          { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.72 : 1 },
        ]}
        onPress={() => router.push('/agents')}
      >
        <Ionicons name="notifications-outline" size={20} color={colors.foreground} />
        <View style={[styles.notificationDot, { backgroundColor: colors.warning }]} />
      </Pressable>
    </View>
  );
}

export function ScreenScroll({
  children,
  contentStyle,
  refreshControl,
}: {
  children: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  refreshControl?: React.ReactElement<RefreshControlProps>;
}) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingBottom: insets.bottom + 96 },
        contentStyle,
      ]}
      showsVerticalScrollIndicator={false}
      refreshControl={refreshControl}
    >
      {children}
    </ScrollView>
  );
}

export function SectionTitle({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  const colors = useColors();
  return (
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{title}</Text>
      {action && onAction ? (
        <Pressable
          accessibilityRole="button"
          onPress={onAction}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <Text style={[styles.sectionAction, { color: colors.primary }]}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function MetricTile({
  icon,
  label,
  value,
  trend,
  tone = 'default',
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  value: string;
  trend: string;
  tone?: 'default' | 'success' | 'warning' | 'info';
  onPress?: () => void;
}) {
  const colors = useColors();
  const toneColor =
    tone === 'success'
      ? colors.success
      : tone === 'warning'
        ? colors.warning
        : tone === 'info'
          ? colors.info
          : colors.primary;
  const Wrapper = onPress ? Pressable : View;
  return (
    <Wrapper
      {...(onPress
        ? {
            accessibilityRole: 'button' as const,
            onPress,
            testID: `metric-${label.toLowerCase().replaceAll(' ', '-')}`,
          }
        : {})}
      style={({ pressed }: { pressed?: boolean }) => [
        styles.metricTile,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.76 : 1 },
      ]}
    >
      <View style={[styles.metricIcon, { backgroundColor: `${toneColor}22` }]}>
        <Ionicons name={icon} size={17} color={toneColor} />
      </View>
      <Text style={[styles.metricLabel, { color: colors.mutedForeground }]}>{label}</Text>
      <Text style={[styles.metricValue, { color: colors.foreground }]}>{value}</Text>
      <Text style={[styles.metricTrend, { color: toneColor }]}>{trend}</Text>
    </Wrapper>
  );
}

export function StatusDot({ color }: { color: string }) {
  return <View style={[styles.statusDot, { backgroundColor: color }]} />;
}

export function AgentRow({
  name,
  specialty,
  status,
  icon,
  accent,
  onPress,
}: {
  name: string;
  specialty: string;
  status: string;
  icon: React.ComponentProps<typeof Feather>['name'];
  accent: string;
  onPress?: () => void;
}) {
  const colors = useColors();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      testID={`agent-${name}`}
      style={({ pressed }) => [
        styles.agentRow,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.78 : 1 },
      ]}
    >
      <View style={[styles.agentIcon, { backgroundColor: `${accent}22` }]}>
        <Feather name={icon} size={18} color={accent} />
      </View>
      <View style={styles.agentCopy}>
        <Text style={[styles.agentName, { color: colors.foreground }]}>{name}</Text>
        <Text style={[styles.agentSpecialty, { color: colors.mutedForeground }]}>{specialty}</Text>
      </View>
      <View style={styles.agentStatus}>
        <StatusDot color={status === 'Aktif' ? colors.success : colors.warning} />
        <Text style={[styles.agentStatusText, { color: colors.mutedForeground }]}>{status}</Text>
      </View>
      <Feather name="chevron-right" size={17} color={colors.mutedForeground} />
    </Pressable>
  );
}

export function Tag({
  children,
  color,
  background,
}: {
  children: React.ReactNode;
  color: string;
  background: string;
}) {
  return (
    <View style={[styles.tag, { backgroundColor: background }]}>
      <Text style={[styles.tagText, { color }]}>{children}</Text>
    </View>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  const colors = useColors();
  return (
    <View style={[styles.emptyState, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Ionicons name="checkmark-circle-outline" size={26} color={colors.success} />
      <Text style={[styles.emptyTitle, { color: colors.foreground }]}>{title}</Text>
      <Text style={[styles.emptyBody, { color: colors.mutedForeground }]}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 86,
    paddingHorizontal: 20,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBrand: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  brandIcon: { width: 40, height: 40, borderRadius: 12, marginRight: 12 },
  headerCopy: { flex: 1 },
  eyebrow: { fontSize: 10, fontFamily: 'IBMPlexSans_700Bold', letterSpacing: 1.3 },
  headerTitle: { fontSize: 24, fontFamily: 'IBMPlexSans_700Bold', marginTop: 2 },
  headerSubtitle: { fontSize: 11, fontFamily: 'IBMPlexSans_400Regular', marginTop: 3 },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: { width: 7, height: 7, borderRadius: 4, position: 'absolute', top: 9, right: 10 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 4 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontFamily: 'IBMPlexSans_700Bold' },
  sectionAction: { fontSize: 12, fontFamily: 'IBMPlexSans_600SemiBold' },
  metricTile: {
    width: '48.2%',
    minHeight: 126,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  metricIcon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  metricLabel: { fontSize: 11, fontFamily: 'IBMPlexSans_500Medium' },
  metricValue: { fontSize: 22, fontFamily: 'IBMPlexSans_700Bold', marginTop: 3 },
  metricTrend: { fontSize: 11, fontFamily: 'IBMPlexSans_600SemiBold', marginTop: 5 },
  statusDot: { width: 7, height: 7, borderRadius: 4 },
  agentRow: {
    minHeight: 68,
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  agentIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 11 },
  agentCopy: { flex: 1 },
  agentName: { fontSize: 13, fontFamily: 'IBMPlexSans_700Bold' },
  agentSpecialty: { fontSize: 11, fontFamily: 'IBMPlexSans_400Regular', marginTop: 3 },
  agentStatus: { flexDirection: 'row', alignItems: 'center', marginRight: 12, gap: 5 },
  agentStatusText: { fontSize: 10, fontFamily: 'IBMPlexSans_400Regular' },
  tag: { borderRadius: 7, paddingHorizontal: 8, paddingVertical: 5 },
  tagText: { fontSize: 10, fontFamily: 'IBMPlexSans_700Bold', letterSpacing: 0.3 },
  emptyState: { borderRadius: 16, borderWidth: 1, padding: 20, alignItems: 'center', marginTop: 4 },
  emptyTitle: { fontSize: 15, fontFamily: 'IBMPlexSans_700Bold', marginTop: 9 },
  emptyBody: { fontSize: 12, fontFamily: 'IBMPlexSans_400Regular', textAlign: 'center', lineHeight: 18, marginTop: 5 },
});