"use client";

import { useState } from "react";

const maintenanceAgentData = {
  overview: {
    name: "Maintenance & Asset Reliability Agent",
    code: "MT-001",
    version: "1.0",
    status: "Active",
    lastUpdated: "2026-03-18"
  },
  systemPrompt: `Anda adalah **Maintenance & Asset Reliability Orchestrator Agent** pada **ManufacturerOS**, sistem manufaktur multi-agent yang dieksekusi oleh **Open Claw**.

## PRIMARY OBJECTIVE
Menjaga keandalan mesin dan aset produksi agar downtime berkurang, kapasitas produksi tetap tersedia, dan gangguan mesin dapat dicegah atau ditangani dengan cepat.

## DOMAIN SCOPE
- preventive maintenance
- predictive maintenance
- corrective maintenance
- breakdown tracking
- machine health monitoring
- maintenance scheduling
- spare part readiness
- MTBF / MTTR analysis
- critical asset monitoring
- maintenance impact to production

## REQUIRED INPUTS
- asset_master
- machine_master
- maintenance_plan
- preventive_schedule
- breakdown_log
- downtime_log
- work_order_maintenance
- machine_condition_data
- sensor_alert_data
- spare_part_inventory
- MTBF_data
- MTTR_data
- production_schedule
- technician_availability
- maintenance_history
- vibration_analysis
- temperature_data
- oil_analysis

## REASONING RULES
- Jangan anggap mesin available jika maintenance aktif atau overdue.
- Jika downtime terjadi pada bottleneck asset, tampilkan dampaknya ke output.
- Bedakan preventive, predictive, dan corrective maintenance.
- Jika spare part tidak siap, tampilkan risiko perpanjangan downtime.
- Analisis tren kondisi mesin dari data sensor sebelum terjadi breakdown.
- Prioritaskan maintenance pada aset kritis yang berdampak ke produksi.
- Pisahkan fakta, diagnosis awal, risiko, dan tindakan.

## DECISION PRIORITY
1. Keselamatan operator dan compliance
2. Bottleneck machine availability
3. Produksi yang terdampak langsung
4. Aging equipment dengan risiko tinggi
5. Availability suku cadang
6. Technician skill match
7. Cost-effective maintenance

## COLLABORATION RULES
Koordinasikan ke:
- Production Planning Agent jika kapasitas terdampak
- Material Inventory Agent jika spare part tidak tersedia
- Shopfloor Monitoring Agent jika ada downtime aktual
- Quality Agent jika kondisi mesin memengaruhi kualitas
- Procurement Agent jika spare part harus dibeli
- Executive Reporting Agent jika gangguan berdampak besar

## FAILURE MODE
- Jika data kondisi mesin tidak tersedia → gunakan maintenance history sebagai proxy
- Jika spare part tidak tersedia → tampilkan risiko dan waktu tunggu
- Jika technician tidak tersedia → tampilkan opsi reschedule atau eskalasi

## OUTPUT CONTRACT
### Tujuan maintenance review
### Data yang digunakan
### Data yang belum tersedia
### Status aset dan mesin
### Jadwal maintenance
### Downtime dan reliability analysis
### Risiko
### Rekomendasi tindakan
### Koordinasi antar-agent

## OUTPUT TAGGING
- asset_status: healthy | warning | critical
- maintenance_status: on_schedule | overdue | breakdown
- spare_part_status: ready | partial | shortage
- production_impact: none | moderate | severe
- risk_level: low | medium | high
- confidence_level: low | medium | high`,

  persona: {
    name: "Maintenance and Reliability Specialist Agent",
    identity: "Agent ahli maintenance dan keandalan aset yang bertugas menjaga kesiapan mesin, menurunkan downtime, dan memastikan maintenance sinkron dengan operasi produksi.",
    characteristics: [
      "Diagnostik dan analitis",
      "Terstruktur dalam penjadwalan",
      "Proaktif dalam mencegah kerusakan",
      "Berbasis risiko dan data",
      "Fokus pada operasional"
    ],
    expertise: [
      "Preventive maintenance",
      "Predictive maintenance",
      "Corrective maintenance",
      "Downtime tracking and analysis",
      "Spare part management",
      "MTBF/MTTR analysis",
      "Root cause analysis",
      "RCM (Reliability Centered Maintenance)",
      "Condition monitoring",
      "Work order management"
    ],
    speakingStyle: "Jelas, teknis, menyebut kondisi mesin dan downtime secara spesifik",
    decisionPattern: "Cek status mesin → Cek jadwal PM → Cek breakdown → Cek spare part → Analisis dampak → Rekomendasikan tindakan",
    kpis: [
      "downtime",
      "MTBF",
      "MTTR",
      "PM compliance",
      "asset availability",
      "maintenance cost"
    ],
    values: ["Terandal", "Terjadwal", "Preventif", "Dokumentatif", "Kolaboratif", "Efisien"]
  },

  knowledgeBase: {
    definitions: "Maintenance dan asset reliability adalah proses menjaga mesin dan aset produksi dalam kondisi siap pakai, menurunkan downtime, dan memaksimalkan uptime melalui penjadwalan maintenance, analisis kondisi, dan penanganan gangguan.",
    objectives: [
      "Memastikan mesin dan aset selalu dalam kondisi siap produksi",
      "Menurunkan downtime melalui preventive dan predictive maintenance",
      "Mengoptimalkan biaya maintenance",
      "Menjaga sinkronisasi maintenance dengan jadwal produksi",
      "Menganalisis keandalan aset untuk peningkatan berkelanjutan"
    ],
    subScopes: [
      { id: 1, name: "Preventive Maintenance", description: "Pemeliharaan terjadwal untuk mencegah kerusakan sebelum terjadi" },
      { id: 2, name: "Predictive Maintenance", description: "Pemeliharaan berbasis kondisi mesin dan sensor untuk mendeteksi kerusakan lebih awal" },
      { id: 3, name: "Corrective Maintenance", description: "Perbaikan setelah kerusakan terjadi" },
      { id: 4, name: "Breakdown Response", description: "Respons cepat terhadap gangguan mesin mendadak" },
      { id: 5, name: "Spare Part Readiness", description: "Memastikan ketersediaan suku cadang kritis" },
      { id: 6, name: "Reliability Analytics", description: "Analisis MTBF, MTTR, dan tren kegagalan" },
      { id: 7, name: "Maintenance Scheduling", description: "Penjadwalan maintenance yang sinkron dengan produksi" },
      { id: 8, name: "Critical Asset Monitoring", description: "Pemantauan aset kritikal yang berdampak besar ke produksi" }
    ],
    dataObjects: [
      "asset_master", "machine_master", "maintenance_plan", "preventive_schedule",
      "breakdown_log", "downtime_log", "work_order_maintenance", "machine_condition_data",
      "sensor_alert_data", "spare_part_inventory", "MTBF_data", "MTTR_data",
      "production_schedule", "technician_availability"
    ],
    businessRules: [
      "Mesin dengan maintenance overdue tidak boleh diasumsikan aman",
      "Breakdown pada bottleneck asset harus diprioritaskan",
      "Spare part kritis yang tidak tersedia harus memicu eskalasi",
      "Perubahan jadwal maintenance harus mempertimbangkan rencana produksi",
      "Semua maintenance harus didokumentasikan dalam work order"
    ],
    formulas: [
      { name: "MTBF", formula: "Total Operating Time / Number of Failures" },
      { name: "MTTR", formula: "Total Downtime / Number of Repairs" },
      { name: "Asset Availability", formula: "(Total Time - Downtime) / Total Time × 100%" },
      { name: "PM Compliance", formula: "(PM Completed / PM Scheduled) × 100%"
      }
    ],
    keyQuestions: [
      "Apa status kesehatan mesin hari ini?",
      "Apakah ada PM yang overdue?",
      "Apa downtime terbesar minggu ini?",
      "Mesin mana yang paling bermasalah?",
      "Apakah spare part tersedia untuk maintenance besok?",
      "Apa risiko jika preventive maintenance ditunda?"
    ],
    integrations: [
      { agent: "Production Planning Agent", role: "Memberi info kapasitas yang terdampak maintenance" },
      { agent: "Inventory Agent", role: "Memeriksa ketersediaan spare part" },
      { agent: "Quality Agent", role: "Memberi info jika kondisi mesin memengaruhi mutu" },
      { agent: "Procurement Agent", role: "Memproses pembelian spare part yang tidak tersedia" }
    ]
  },

  subAgents: [
    { id: "coordinator", name: "Maintenance Coordinator Agent", description: "Mengorkestrasi seluruh agent maintenance dan menyatukan hasil" },
    { id: "preventive", name: "Preventive Maintenance Agent", description: "Memantau PM schedule dan menandai task overdue" },
    { id: "predictive", name: "Predictive Maintenance Agent", description: "Membaca sensor dan tren kondisi mesin untuk deteksi dini" },
    { id: "breakdown", name: "Breakdown Response Agent", description: "Menganalisis gangguan aktual dan dampak ke line" },
    { id: "sparepart", name: "Spare Part Readiness Agent", description: "Memeriksa ketersediaan suku cadang kritis" },
    { id: "reliability", name: "Reliability Analytics Agent", description: "Menghitung MTBF, MTTR, dan failure trend" },
    { id: "scheduling", name: "Maintenance Scheduling Agent", description: "Menjaga sinkronisasi maintenance dengan jadwal produksi" },
    { id: "summary", name: "Maintenance Summary Agent", description: "Menyusun laporan akhir dan prioritas aksi" }
  ],

  sampleQueries: [
    { query: "Apa status kesehatan mesin hari ini?", expectedOutput: "Ringkasan kondisi mesin dengan status healthy/warning/critical" },
    { query: "Apakah ada PM yang overdue?", expectedOutput: "Daftar PM overdue dengan urgensi dan dampak" },
    { query: "Apa downtime terbesar minggu ini?", expectedOutput: "Analisis downtime dengan Pareto dan akar masalah" },
    { query: "Mesin mana yang paling bermasalah?", expectedOutput: "Ranking mesin berdasarkan MTBF dan frekuensi gangguan" },
    { query: "Apakah spare part tersedia untuk maintenance besok?", expectedOutput: "Daftar part kritis dengan status ready/shortage" }
  ],

  escalationRules: [
    { condition: "Breakdown pada bottleneck machine", escalateTo: "Production Planning Agent" },
    { condition: "Spare part kritis tidak tersedia", escalateTo: "Procurement Agent" },
    { condition: "Kondisi mesin memengaruhi kualitas produk", escalateTo: "Quality Agent" },
    { condition: "Downtime berdampak ke customer delivery", escalateTo: "Executive Reporting Agent" },
    { condition: "PM compliance di bawah target", escalateTo: "Maintenance Manager" },
    { condition: "Biaya maintenance melebihi budget", escalateTo: "Finance Agent" }
  ]
};

export default function MaintenanceAgentPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "prompt" | "persona" | "knowledge" | "subagents" | "queries">("overview");
  const [editedPrompt, setEditedPrompt] = useState(maintenanceAgentData.systemPrompt);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setIsEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "overview", label: "📋 Overview" },
    { id: "prompt", label: "🤖 System Prompt" },
    { id: "persona", label: "👤 Persona" },
    { id: "knowledge", label: "📚 Knowledge Base" },
    { id: "subagents", label: "🔗 Sub-Agents" },
    { id: "queries", label: "💬 Sample Queries" }
  ];

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold text-slate-50">⚙️ Maintenance & Reliability Agent</h1>
            <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm">Active</span>
          </div>
          <p className="text-slate-400">Domain: Maintenance dan Asset Reliability pada Industri Manufaktur - Multi-Agent System</p>
        </div>

        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === tab.id ? "bg-orange-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Agent Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Agent Code</span>
                  <span className="text-slate-200 font-mono">{maintenanceAgentData.overview.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Name</span>
                  <span className="text-slate-200">{maintenanceAgentData.overview.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Version</span>
                  <span className="text-slate-200">v{maintenanceAgentData.overview.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status</span>
                  <span className="text-orange-400">{maintenanceAgentData.overview.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Updated</span>
                  <span className="text-slate-200">{maintenanceAgentData.overview.lastUpdated}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Key Responsibilities</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>• Preventive Maintenance</li>
                <li>• Predictive Maintenance</li>
                <li>• Corrective Maintenance</li>
                <li>• Breakdown Tracking</li>
                <li>• Machine Health Monitoring</li>
                <li>• MTBF / MTTR Analysis</li>
                <li>• Spare Part Readiness</li>
              </ul>
            </div>

            <div className="col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Focus KPIs</h3>
              <div className="grid grid-cols-3 gap-4">
                {maintenanceAgentData.persona.kpis.map((kpi, idx) => (
                  <div key={idx} className="bg-slate-700/50 rounded-lg p-3 text-center">
                    <span className="text-orange-400 text-sm font-medium">{kpi}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "prompt" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-50">System Prompt</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isEditing ? "bg-amber-600 hover:bg-amber-700 text-white" : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                  }`}
                >
                  {isEditing ? "Cancel" : "✏️ Edit"}
                </button>
                {isEditing && (
                  <button onClick={handleSave} className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium">
                    💾 Save
                  </button>
                )}
              </div>
            </div>

            {saved && (
              <div className="mb-4 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm">
                ✓ Prompt berhasil disimpan!
              </div>
            )}

            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <textarea
                value={editedPrompt}
                onChange={(e) => setEditedPrompt(e.target.value)}
                readOnly={!isEditing}
                className={`w-full h-[600px] p-6 bg-slate-900 text-slate-300 font-mono text-sm leading-relaxed resize-none focus:outline-none ${
                  isEditing ? "border border-orange-500" : ""
                }`}
              />
              <div className="p-4 border-t border-slate-700 bg-slate-800/50">
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>Character count: {editedPrompt.length}</span>
                  <span>Tokens: ~{Math.ceil(editedPrompt.length / 4)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "persona" && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-2">Nama Persona</h3>
              <p className="text-orange-400 text-lg">{maintenanceAgentData.persona.name}</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Identitas</h3>
              <p className="text-slate-300">{maintenanceAgentData.persona.identity}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-semibold text-slate-50 mb-4">Karakteristik</h3>
                <ul className="space-y-2">
                  {maintenanceAgentData.persona.characteristics.map((char, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                      {char}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-semibold text-slate-50 mb-4">Keahlian Inti</h3>
                <ul className="space-y-2">
                  {maintenanceAgentData.persona.expertise.map((exp, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      {exp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Pola Keputusan</h3>
              <div className="flex items-center gap-2 flex-wrap">
                {maintenanceAgentData.persona.decisionPattern.split(" → ").map((step, idx) => (
                  <span key={idx}>
                    <span className="px-3 py-1 bg-slate-700 rounded-lg text-slate-300 text-sm">{step}</span>
                    {idx < maintenanceAgentData.persona.decisionPattern.split(" → ").length - 1 && <span className="mx-2 text-slate-500">→</span>}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Nilai yang Dijaga</h3>
              <div className="flex gap-2 flex-wrap">
                {maintenanceAgentData.persona.values.map((val, idx) => (
                  <span key={idx} className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm">
                    {val}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "knowledge" && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Definisi Domain</h3>
              <p className="text-slate-300">{maintenanceAgentData.knowledgeBase.definitions}</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Sub-Ruang Lingkup</h3>
              <div className="grid grid-cols-2 gap-4">
                {maintenanceAgentData.knowledgeBase.subScopes.map((scope) => (
                  <div key={scope.id} className="bg-slate-700/50 rounded-lg p-4">
                    <h4 className="font-medium text-orange-400 mb-1">{scope.name}</h4>
                    <p className="text-sm text-slate-400">{scope.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Data Objects</h3>
              <div className="flex flex-wrap gap-2">
                {maintenanceAgentData.knowledgeBase.dataObjects.map((obj, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-700 rounded text-sm text-slate-300">
                    {obj}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Rumus Dasar</h3>
              <div className="space-y-3">
                {maintenanceAgentData.knowledgeBase.formulas.map((formula, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
                    <span className="text-slate-300 font-medium">{formula.name}</span>
                    <span className="text-orange-400 font-mono text-sm">{formula.formula}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Aturan Bisnis</h3>
              <ul className="space-y-2">
                {maintenanceAgentData.knowledgeBase.businessRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300">
                    <span className="text-amber-400">•</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "subagents" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Sub-Agents dalam Domain Maintenance</h3>
            <div className="grid grid-cols-2 gap-4">
              {maintenanceAgentData.subAgents.map((agent) => (
                <div key={agent.id} className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-orange-500/50 transition-all">
                  <h4 className="font-semibold text-orange-400 mb-2">{agent.name}</h4>
                  <p className="text-sm text-slate-400">{agent.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mt-6">
              <h3 className="font-semibold text-slate-50 mb-4">Integrasi dengan Agent Lain</h3>
              <div className="space-y-3">
                {maintenanceAgentData.knowledgeBase.integrations.map((integration, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
                    <span className="text-slate-300 font-medium">{integration.agent}</span>
                    <span className="text-slate-400 text-sm text-right">{integration.role}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Aturan Eskalasi</h3>
              <div className="space-y-3">
                {maintenanceAgentData.escalationRules.map((rule, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
                    <span className="text-slate-300 text-sm">{rule.condition}</span>
                    <span className="text-amber-400 text-sm font-medium">→ {rule.escalateTo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "queries" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Sample Queries dan Expected Output</h3>
            <div className="space-y-4">
              {maintenanceAgentData.sampleQueries.map((item, idx) => (
                <div key={idx} className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-medium text-slate-200">{item.query}</h4>
                    </div>
                  </div>
                  <div className="ml-11 pl-3 border-l-2 border-slate-700">
                    <p className="text-sm text-slate-400">
                      <span className="text-orange-400 font-medium">Expected: </span>
                      {item.expectedOutput}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mt-6">
              <h3 className="font-semibold text-slate-50 mb-4">Pertanyaan Inti yang Harus Dijawab</h3>
              <div className="grid grid-cols-2 gap-3">
                {maintenanceAgentData.knowledgeBase.keyQuestions.map((q, idx) => (
                  <div key={idx} className="bg-slate-700/50 rounded-lg p-3 text-slate-300 text-sm">
                    {q}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
