import { Feather, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { AppHeader, AgentRow, ScreenScroll, SectionTitle, Tag } from '@/components/ManufactureUI';

const agents = [
  { name: 'Quality Agent', specialty: 'Inspeksi & defect prevention', status: 'Aktif', icon: 'check-circle' as const, accentKey: 'info' as const, insight: '3 inspeksi selesai · 1 sinyal perlu review' },
  { name: 'Production Agent', specialty: 'Output & OEE optimization', status: 'Aktif', icon: 'activity' as const, accentKey: 'success' as const, insight: 'Line 02 di atas target · OEE 92.8%' },
  { name: 'Safety Agent', specialty: 'HSE & risk monitoring', status: 'Review', icon: 'shield' as const, accentKey: 'warning' as const, insight: '4 tindakan terbuka · tidak ada insiden' },
  { name: 'Maintenance Agent', specialty: 'Predictive maintenance', status: 'Aktif', icon: 'tool' as const, accentKey: 'primary' as const, insight: 'Next service: Press 04 · 2 hari lagi' },
  { name: 'Supply Chain Agent', specialty: 'Material & supplier planning', status: 'Aktif', icon: 'truck' as const, accentKey: 'info' as const, insight: 'Material C-120 aman untuk 3.2 hari' },
];

export default function AgentsScreen() {
  const colors = useColors();
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [commandSent, setCommandSent] = useState(false);

  const accent = (key: (typeof agents)[number]['accentKey']) =>
    key === 'success' ? colors.success : key === 'warning' ? colors.warning : key === 'primary' ? colors.primary : colors.info;

  const openAgent = (name: string) => {
    Haptics.selectionAsync();
    setSelectedAgent((current) => (current === name ? null : name));
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <AppHeader title="Specialist agents" subtitle="AI COMMAND CENTER · 8 AGENT AKTIF" />
      <ScreenScroll>
        <View style={[styles.commandCard, { backgroundColor: colors.surfaceStrong, borderColor: colors.border }]}>
          <View style={styles.commandTop}>
            <View style={[styles.commandIcon, { backgroundColor: colors.primary + '22' }]}>
              <Ionicons name="sparkles" size={22} color={colors.primary} />
            </View>
            <View style={styles.commandCopy}>
              <Text style={[styles.commandTitle, { color: colors.foreground }]}>Command Center</Text>
              <Text style={[styles.commandBody, { color: colors.mutedForeground }]}>Semua agent sinkron dan siap membantu.</Text>
            </View>
            <View style={styles.livePill}><View style={[styles.liveDot, { backgroundColor: colors.success }]} /><Text style={[styles.liveText, { color: colors.success }]}>LIVE</Text></View>
          </View>
          <Pressable
            testID="run-agent-command"
            onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setCommandSent(true); }}
            style={({ pressed }) => [styles.commandButton, { backgroundColor: colors.primary, opacity: pressed ? 0.72 : 1 }]}
          >
            <Feather name="command" size={16} color={colors.primaryForeground} />
            <Text style={[styles.commandButtonText, { color: colors.primaryForeground }]}>Jalankan health check</Text>
          </Pressable>
        </View>

        {commandSent ? (
          <View style={[styles.commandResult, { backgroundColor: colors.successSoft, borderColor: colors.success + '55' }]}>
            <Feather name="check-circle" size={17} color={colors.success} />
            <Text style={[styles.commandResultText, { color: colors.success }]}>Health check selesai · 8 agent merespons normal</Text>
          </View>
        ) : null}

        <SectionTitle title="Agent aktif" action="Konfigurasi" onAction={() => setCommandSent(true)} />
        {agents.map((agent) => (
          <React.Fragment key={agent.name}>
            <AgentRow
              name={agent.name}
              specialty={agent.specialty}
              status={agent.status}
              icon={agent.icon}
              accent={accent(agent.accentKey)}
              onPress={() => openAgent(agent.name)}
            />
            {selectedAgent === agent.name ? (
              <View style={[styles.insight, { backgroundColor: colors.card, borderColor: accent(agent.accentKey) + '66' }]}>
                <Tag color={accent(agent.accentKey)} background={accent(agent.accentKey) + '22'}>INSIGHT TERBARU</Tag>
                <Text style={[styles.insightText, { color: colors.foreground }]}>{agent.insight}</Text>
                <Text style={[styles.insightMeta, { color: colors.mutedForeground }]}>Tap agent lain untuk berpindah</Text>
              </View>
            ) : null}
          </React.Fragment>
        ))}
      </ScreenScroll>
    </View>
  );
}

const styles = StyleSheet.create({
  commandCard: { borderRadius: 20, borderWidth: 1, padding: 16, marginBottom: 12 },
  commandTop: { flexDirection: 'row', alignItems: 'center' },
  commandIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 11 },
  commandCopy: { flex: 1 },
  commandTitle: { fontSize: 15, fontWeight: '700' },
  commandBody: { fontSize: 10, marginTop: 4 },
  livePill: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  liveDot: { width: 6, height: 6, borderRadius: 3 },
  liveText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.7 },
  commandButton: { height: 42, borderRadius: 11, marginTop: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  commandButtonText: { fontSize: 12, fontWeight: '700' },
  commandResult: { borderRadius: 13, borderWidth: 1, padding: 11, flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 22 },
  commandResultText: { fontSize: 11, fontWeight: '600', flex: 1 },
  insight: { marginTop: -3, marginBottom: 10, borderRadius: 13, borderWidth: 1, padding: 12 },
  insightText: { fontSize: 12, fontWeight: '600', marginTop: 9 },
  insightMeta: { fontSize: 10, marginTop: 7 },
});