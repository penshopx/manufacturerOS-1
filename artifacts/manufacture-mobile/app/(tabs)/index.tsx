
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { agents, agentActions, kpis, quickAnswers } from '@/data/demo';
import { AgentStatusDot, BrandHeader, Chevron, font, MetricCard, ProgressBar, Screen, SectionHeader } from '@/components/ManufactureUI';

export default function DashboardScreen() {
  const colors = useColors();
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState(quickAnswers.production);
  const [asked, setAsked] = useState('Status produksi hari ini?');

  const ask = (value: string) => {
    if (!value.trim()) return;
    const lower = value.toLowerCase();
    const key = lower.includes('quality') || lower.includes('defect') || lower.includes('sqam') ? 'quality' : lower.includes('k3') || lower.includes('safety') || lower.includes('hazard') ? 'safety' : lower.includes('audit') ? 'audit' : 'production';
    setAsked(value);
    setAnswer(quickAnswers[key]);
    setQuery('');
    Keyboard.dismiss();
    void Haptics.selectionAsync();
  };

  return <Screen>
    <BrandHeader title="Dashboard" subtitle="Selasa, 15 April 2026 · Shift pagi" />

    <View style={[styles.hero, { backgroundColor: colors.card, borderColor: colors.primary + '66' }]}>
      <View style={styles.heroTop}>
        <View style={[styles.heroIcon, { backgroundColor: colors.primary }]}><MaterialCommunityIcons name="creation" size={21} color={colors.primaryForeground} /></View>
        <View style={styles.heroHeading}><Text style={[styles.heroEyebrow, { color: colors.primary }]}>AI COMMAND CENTER</Text><Text style={[styles.heroTitle, { color: colors.foreground }]}>Tanya kondisi pabrik</Text></View>
        <View style={[styles.onlineBadge, { backgroundColor: colors.successMuted }]}><Text style={[styles.onlineText, { color: colors.success }]}>Online</Text></View>
      </View>
      <View style={[styles.inputWrap, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
        <Ionicons name="search" size={18} color={colors.mutedForeground} />
        <TextInput testID="agent-query" value={query} onChangeText={setQuery} onSubmitEditing={() => ask(query)} returnKeyType="send" placeholder="Contoh: Berapa OEE hari ini?" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground }]} />
        <Pressable testID="agent-ask" onPress={() => ask(query)} style={({ pressed }) => [styles.askButton, { backgroundColor: colors.primary, opacity: pressed ? 0.75 : 1 }]}><Ionicons name="arrow-up" size={17} color={colors.primaryForeground} /></Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {['Status produksi hari ini?', 'Ada alert quality?', 'Status K3?', 'Kesiapan audit?'].map((item, index) => <Pressable key={item} testID={'quick-question-' + index} onPress={() => ask(item)} style={({ pressed }) => [styles.chip, { backgroundColor: colors.secondary, borderColor: colors.border, opacity: pressed ? 0.7 : 1 }]}><Text style={[styles.chipText, { color: colors.secondaryForeground }]}>{item}</Text></Pressable>)}
      </ScrollView>
      <View style={[styles.answer, { backgroundColor: colors.background }]}><Text style={[styles.question, { color: colors.mutedForeground }]}>Q · {asked}</Text><Text style={[styles.answerText, { color: answer.tone === 'green' ? colors.success : answer.tone === 'amber' ? colors.warning : answer.tone === 'blue' ? colors.info : colors.primary }]}>A · {answer.answer}</Text></View>
    </View>

    <View style={styles.sectionBlock}><SectionHeader title="Pulse operasional" caption="Snapshot KPI dari data demo lokal" /><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalCards}>{kpis.map((item) => <MetricCard key={item.label} label={item.label} value={item.value} helper={item.trend + ' vs kemarin'} tone={item.tone} />)}</ScrollView></View>

    <View style={styles.sectionBlock}><SectionHeader title="Akses cepat" caption="Buka area operasional" /><View style={styles.quickGrid}>
      <QuickLink icon="factory" label="Produksi" value="4 line" tone="teal" onPress={() => router.push('/produksi')} />
      <QuickLink icon="clipboard-check-outline" label="Kualitas" value="2 alert" tone="green" onPress={() => router.push('/kualitas')} />
      <QuickLink icon="shield-check-outline" label="Keselamatan" value="87 score" tone="amber" onPress={() => router.push('/k3')} />
      <QuickLink icon="creation" label="Agent" value="23 task" tone="blue" onPress={() => { void Haptics.selectionAsync(); }} />
    </View></View>

    <View style={styles.sectionBlock}><SectionHeader title="Agent aktif" caption="Human-in-the-loop · 3 agent memantau" action="Lihat semua" onAction={() => void Haptics.selectionAsync()} /><View style={[styles.agentCard, { backgroundColor: colors.card, borderColor: colors.border }]}>{agents.map((agent, index) => <View key={agent.name} style={[styles.agentRow, index < agents.length - 1 && { borderBottomColor: colors.border, borderBottomWidth: 1 }]}><View style={styles.agentName}><AgentStatusDot state={agent.state} /><View><Text style={[styles.agentTitle, { color: colors.foreground }]}>{agent.name}</Text><Text style={[styles.agentDetail, { color: colors.mutedForeground }]}>{agent.detail}</Text></View></View><Text style={[styles.agentTasks, { color: agent.state === 'watch' ? colors.warning : colors.primary }]}>{agent.tasks} task</Text></View>)}</View></View>

    <View style={[styles.actionsCard, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={styles.actionsHeader}><MaterialCommunityIcons name="lightning-bolt-outline" size={18} color={colors.primary} /><Text style={[styles.actionsTitle, { color: colors.foreground }]}>Aktivitas terbaru</Text></View>{agentActions.map((item) => <View key={item.action} style={styles.actionRow}><View style={[styles.actionLine, { backgroundColor: item.tone === 'green' ? colors.success : item.tone === 'amber' ? colors.warning : colors.info }]} /><View style={styles.actionCopy}><Text style={[styles.actionAgent, { color: colors.foreground }]}>{item.agent}</Text><Text style={[styles.actionText, { color: colors.mutedForeground }]}>{item.action}</Text></View><Text style={[styles.actionTime, { color: colors.mutedForeground }]}>{item.time}</Text></View>)}</View>

    <View style={[styles.demoNote, { backgroundColor: colors.secondary, borderColor: colors.border }]}><Ionicons name="information-circle-outline" size={18} color={colors.mutedForeground} /><Text style={[styles.demoText, { color: colors.mutedForeground }]}>Mode demo lokal · Perubahan di aplikasi ini tidak disinkronkan ke perangkat lain.</Text></View>
  </Screen>;
}

function QuickLink({ icon, label, value, tone, onPress }: { icon: string; label: string; value: string; tone: 'teal' | 'green' | 'amber' | 'blue'; onPress: () => void }) {
  const colors = useColors();
  const color = tone === 'green' ? colors.success : tone === 'amber' ? colors.warning : tone === 'blue' ? colors.info : colors.primary;
  return <Pressable testID={'quick-link-' + label} onPress={onPress} style={({ pressed }) => [styles.quickLink, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.78 : 1 }]}><View style={[styles.quickIcon, { backgroundColor: color + '22' }]}><MaterialCommunityIcons name={icon as never} size={21} color={color} /></View><View style={styles.quickCopy}><Text style={[styles.quickLabel, { color: colors.foreground }]}>{label}</Text><Text style={[styles.quickValue, { color }]}>{value}</Text></View><Chevron /></Pressable>;
}

const styles = StyleSheet.create({
  hero: { borderWidth: 1, borderRadius: 18, padding: 16, gap: 14 },
  heroTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  heroIcon: { width: 38, height: 38, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  heroHeading: { flex: 1 },
  heroEyebrow: { fontFamily: font.bold, letterSpacing: 1, fontSize: 9 },
  heroTitle: { fontFamily: font.semi, fontSize: 18, marginTop: 2 },
  onlineBadge: { borderRadius: 20, paddingHorizontal: 9, paddingVertical: 5 },
  onlineText: { fontFamily: font.semi, fontSize: 10 },
  inputWrap: { height: 49, borderRadius: 12, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 13, paddingRight: 5, gap: 8 },
  input: { flex: 1, fontFamily: font.regular, fontSize: 14, paddingVertical: 0 },
  askButton: { width: 37, height: 37, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  chips: { gap: 8 },
  chip: { borderRadius: 18, paddingHorizontal: 11, paddingVertical: 8, borderWidth: 1 },
  chipText: { fontFamily: font.medium, fontSize: 11 },
  answer: { borderRadius: 12, padding: 12, gap: 5 },
  question: { fontFamily: font.regular, fontSize: 11 },
  answerText: { fontFamily: font.medium, fontSize: 13, lineHeight: 19 },
  sectionBlock: { gap: 12 },
  horizontalCards: { gap: 10 },
  quickGrid: { gap: 10 },
  quickLink: { minHeight: 68, borderRadius: 15, borderWidth: 1, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 11 },
  quickIcon: { width: 38, height: 38, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  quickCopy: { flex: 1, gap: 3 },
  quickLabel: { fontFamily: font.semi, fontSize: 14 },
  quickValue: { fontFamily: font.medium, fontSize: 11 },
  agentCard: { borderRadius: 16, borderWidth: 1, paddingHorizontal: 14 },
  agentRow: { minHeight: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  agentName: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  agentTitle: { fontFamily: font.semi, fontSize: 13 },
  agentDetail: { fontFamily: font.regular, fontSize: 11, marginTop: 2 },
  agentTasks: { fontFamily: font.semi, fontSize: 11 },
  actionsCard: { borderRadius: 16, borderWidth: 1, padding: 14, gap: 14 },
  actionsHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  actionsTitle: { fontFamily: font.semi, fontSize: 15 },
  actionRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  actionLine: { width: 3, minHeight: 35, borderRadius: 3 },
  actionCopy: { flex: 1, gap: 2 },
  actionAgent: { fontFamily: font.semi, fontSize: 12 },
  actionText: { fontFamily: font.regular, fontSize: 12, lineHeight: 17 },
  actionTime: { fontFamily: font.mono, fontSize: 9, marginTop: 2 },
  demoNote: { borderWidth: 1, borderRadius: 12, padding: 12, flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  demoText: { fontFamily: font.regular, fontSize: 11, lineHeight: 16, flex: 1 },
});
