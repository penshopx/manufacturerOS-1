
export type LineStatus = 'running' | 'attention' | 'maintenance';

export interface ProductionLine {
  id: string;
  name: string;
  area: string;
  status: LineStatus;
  oee: number;
  target: number;
  actual: number;
  note: string;
}

export interface Defect {
  id: string;
  line: string;
  type: string;
  severity: 'Minor' | 'Major';
  status: 'Open' | 'In Progress';
  ncr?: string;
}

export interface HazardReport {
  id: string;
  area: string;
  title: string;
  priority: 'High' | 'Medium';
  age: string;
}

export const productionLines: ProductionLine[] = [
  { id: 'L1', name: 'Line 1', area: 'Stamping', status: 'running', oee: 92, target: 400, actual: 378, note: 'Berjalan optimal' },
  { id: 'L2', name: 'Line 2', area: 'Assembly', status: 'attention', oee: 78, target: 350, actual: 312, note: 'Menunggu material 15 menit' },
  { id: 'L3', name: 'Line 3', area: 'Welding', status: 'running', oee: 88, target: 300, actual: 246, note: 'Output sesuai rencana' },
  { id: 'L4', name: 'Line 4', area: 'Finishing', status: 'maintenance', oee: 0, target: 150, actual: 0, note: 'Maintenance terjadwal' },
];

export const defects: Defect[] = [
  { id: 'DEF-001', line: 'Line 1', type: 'Surface scratch', severity: 'Minor', status: 'Open' },
  { id: 'DEF-002', line: 'Line 1', type: 'Surface scratch', severity: 'Minor', status: 'Open', ncr: 'NCR-003' },
  { id: 'DEF-003', line: 'Line 3', type: 'Dimensional', severity: 'Major', status: 'In Progress', ncr: 'NCR-004' },
];

export const hazardReports: HazardReport[] = [
  { id: 'HZ-021', area: 'Area Welding', title: 'PPE compliance di bawah target', priority: 'High', age: '18 mnt' },
  { id: 'HZ-020', area: 'Gudang bahan baku', title: 'Jalur forklift perlu ditandai ulang', priority: 'Medium', age: '1 jam' },
  { id: 'HZ-019', area: 'Line 2 Assembly', title: 'Kabel sensor melintang di jalur kerja', priority: 'Medium', age: '2 jam' },
];

export const agents = [
  { name: 'Production Agent', short: 'PROD', state: 'active' as const, tasks: 12, detail: 'Monitor OEE dan prediksi bottleneck' },
  { name: 'Quality Agent', short: 'QUAL', state: 'active' as const, tasks: 8, detail: 'Traceability defect dan draft NCR' },
  { name: 'K3 Agent', short: 'K3', state: 'watch' as const, tasks: 3, detail: 'PPE compliance dan hazard review' },
  { name: 'Audit Agent', short: 'AUD', state: 'idle' as const, tasks: 0, detail: 'Checklist IATF dan evidence' },
];

export const agentActions = [
  { agent: 'Production Agent', action: 'Mendeteksi potensi delay di Line 2', time: '8 mnt lalu', tone: 'blue' as const },
  { agent: 'Quality Agent', action: 'Membuat draft NCR untuk surface scratch', time: '21 mnt lalu', tone: 'green' as const },
  { agent: 'K3 Agent', action: 'Meminta review PPE Area Welding', time: '34 mnt lalu', tone: 'amber' as const },
];

export const kpis = [
  { label: 'OEE rata-rata', value: '87.5%', trend: '+2.3%', tone: 'teal' as const },
  { label: 'Defect rate', value: '0.08%', trend: '-0.02%', tone: 'green' as const },
  { label: 'Safety score', value: '87', trend: '+3 pts', tone: 'amber' as const },
  { label: 'On-time delivery', value: '96%', trend: '+1%', tone: 'blue' as const },
];

export const quickAnswers: Record<string, { answer: string; tone: 'teal' | 'green' | 'amber' | 'blue' }> = {
  production: { answer: 'OEE rata-rata 87.5%. Line 2 mengalami delay material 15 menit; prediksi output shift 1,150 unit.', tone: 'teal' },
  quality: { answer: 'Defect rate 0.08%, di bawah target 0.1%. Ada 2 defect terbuka dan Grade SQAM tetap A.', tone: 'green' },
  safety: { answer: 'Safety Score 87/100, zero accident 30 hari. 3 hazard report terbuka dan PPE compliance 85%.', tone: 'amber' },
  audit: { answer: 'ISO 9001 siap 85%, IATF 16949 siap 72%, ISO 45001 siap 90%.', tone: 'blue' },
};
