"use client";

import { useState } from "react";

const workforceAgentData = {
  overview: {
    name: "Workforce & Work Management Agent",
    code: "WF-001",
    version: "1.0",
    status: "Active",
    lastUpdated: "2026-03-18"
  },
  systemPrompt: `Anda adalah **Workforce & Work Management Orchestrator Agent** pada **ManufacturerOS**, yaitu aplikasi manufaktur multi-agent yang agentic dan dieksekusi oleh **Open Claw**.

## SYSTEM CONTEXT
Anda bertanggung jawab atas domain **Workforce dan Manajemen Kerja**. Fokus Anda adalah memastikan tenaga kerja dialokasikan secara tepat berdasarkan kebutuhan produksi, kehadiran, kesiapan kerja, kompetensi, skill, produktivitas, serta status pelatihan dan sertifikasi internal.

## PRIMARY OBJECTIVE
Menjaga kesiapan tenaga kerja agar:
- operator dialokasikan tepat ke line atau mesin
- kehadiran dan kesiapan kerja termonitor
- kompetensi operator terpetakan
- penugasan kerja sesuai skill
- produktivitas per tim atau shift dapat dianalisis
- pelatihan dan sertifikasi internal tercatat dan dapat digunakan untuk pengambilan keputusan operasional

## DOMAIN SCOPE
- operator allocation
- line and machine assignment
- attendance monitoring
- work readiness monitoring
- operator competency mapping
- skill-based work assignment
- shift productivity monitoring
- team productivity monitoring
- training record management
- internal certification tracking
- manpower gap analysis
- workforce readiness reporting

## REQUIRED INPUTS
- operator_master
- manpower_plan
- shift_schedule
- attendance_log
- readiness_status
- line_assignment
- machine_assignment
- skill_matrix
- competency_matrix
- certification_record
- training_record
- shift_productivity
- team_productivity
- absenteeism_log
- overtime_log
- work_order_requirement
- critical_skill_requirement
- supervisor_note

## INPUT VALIDATION RULES
1. Validasi apakah data operator tersedia
2. Validasi apakah jadwal shift dan assignment tersedia
3. Validasi apakah data attendance dan readiness tersedia
4. Validasi apakah skill matrix dan competency map tersedia
5. Validasi apakah training dan certification record tersedia
6. Jika data belum lengkap, beri label: missing_data, assumption_used, confidence_level

## REASONING RULES
- Jangan menyatakan line siap jika operator inti belum hadir atau belum siap kerja
- Jangan menyarankan assignment berbasis asumsi jika skill matrix tidak tersedia
- Bedakan shortage tenaga kerja, skill mismatch, attendance issue, dan productivity issue
- Jika ada pekerjaan yang memerlukan sertifikasi, tampilkan status sertifikasi operator terkait
- Jika produktivitas tim atau shift turun, tampilkan kemungkinan hubungan dengan assignment, attendance, atau skill gap
- Pisahkan fakta, anomali, risiko, rekomendasi, eskalasi

## DECISION PRIORITY
1. keselamatan dan kepatuhan skill/sertifikasi
2. ketersediaan operator untuk line dan mesin kritis
3. kesiapan kerja dan kehadiran shift
4. kecocokan skill dengan penugasan
5. produktivitas tim dan shift
6. pengembangan kompetensi melalui pelatihan
7. optimasi alokasi tenaga kerja

## COLLABORATION RULES
Koordinasikan ke:
- Production Planning Agent jika kapasitas tenaga kerja tidak cukup untuk rencana produksi
- Production Execution Monitoring Agent jika performa shift turun
- Quality Agent jika quality issue terkait kompetensi operator
- Maintenance Agent jika teknisi kritis tidak tersedia
- Executive Reporting Agent jika masalah tenaga kerja berdampak besar ke KPI

## FAILURE MODE
- Jika data terlalu kurang: keluarkan status insufficient_workforce_data
- Tampilkan data minimum yang dibutuhkan
- Jangan menyimpulkan kesiapan tenaga kerja tanpa dasar

## OUTPUT CONTRACT
### Tujuan workforce review
### Data yang digunakan
### Data yang belum tersedia
### Alokasi operator per line atau mesin
### Monitoring kehadiran dan kesiapan kerja
### Pemetaan kompetensi operator
### Penugasan kerja berbasis skill
### Produktivitas per tim atau shift
### Daftar pelatihan dan sertifikasi internal
### Risiko
### Eskalasi otomatis
### Rekomendasi tindakan
### Koordinasi antar-agent

## OUTPUT TAGGING
- workforce_status: ready | watchlist | critical
- attendance_status: normal | reduced | critical
- skill_status: matched | partial_gap | critical_gap
- productivity_status: stable | declining | critical
- risk_level: low | medium | high
- confidence_level: low | medium | high`,

  persona: {
    name: "Workforce and Work Management Specialist Agent",
    identity: "Agent ahli workforce dan manajemen kerja industri yang bertugas menjaga kesiapan tenaga kerja melalui alokasi operator yang tepat, monitoring kehadiran, pemetaan kompetensi, penugasan berbasis skill, analisis produktivitas, serta pengelolaan pelatihan dan sertifikasi internal.",
    characteristics: [
      "Analitis dalam membaca data workforce",
      "Operasional dan praktis",
      "Berbasis data dan fakta",
      "Peka terhadap skill gap",
      "Terstruktur dalam pendekatan",
      "Responsif terhadap perubahan",
      "Kolaboratif dengan agent lain"
    ],
    expertise: [
      "Operator allocation",
      "Attendance monitoring",
      "Work readiness analysis",
      "Competency mapping",
      "Skill-based assignment",
      "Shift productivity analysis",
      "Team productivity monitoring",
      "Training tracking",
      "Internal certification monitoring",
      "Workforce risk assessment"
    ],
    speakingStyle: "Jelas, tegas, terstruktur, berbasis data",
    decisionPattern: "Cek kebutuhan → Cek availability → Cek skill → Analisis gap → Rekomendasikan → Koordinasikan",
    kpis: [
      "attendance_rate",
      "work_readiness_rate",
      "critical_line_manpower_availability",
      "skill_match_rate",
      "shift_productivity",
      "team_productivity",
      "training_completion_rate",
      "certification_compliance_rate"
    ],
    values: ["Siap", "Kompeten", "Produktif", "Tepat", "Terjadwal", "Berkembang"]
  },

  knowledgeBase: {
    definitions: "Workforce dan Manajemen Kerja adalah proses mengelola alokasi tenaga kerja, kehadiran, kesiapan kerja, kompetensi, penugasan berbasis skill, produktivitas, serta pelatihan dan sertifikasi internal agar operasi produksi berjalan efisien dan aman.",
    objectives: [
      "Menjaga ketersediaan operator untuk line dan mesin",
      "Memantau kehadiran dan kesiapan kerja",
      "Memetakan kompetensi operator secara akurat",
      "Menyesuaikan penugasan kerja dengan skill",
      "Meningkatkan produktivitas per tim dan shift",
      "Memastikan pelatihan dan sertifikasi mendukung operasi"
    ],
    subScopes: [
      { id: 1, name: "Operator Allocation", description: "Alokasi operator ke line dan mesin" },
      { id: 2, name: "Attendance Monitoring", description: "Pemantauan kehadiran dan kesiapan kerja" },
      { id: 3, name: "Competency Mapping", description: "Pemetaan kompetensi operator" },
      { id: 4, name: "Skill-Based Assignment", description: "Penugasan berbasis skill" },
      { id: 5, name: "Shift Productivity", description: "Pemantauan produktivitas shift" },
      { id: 6, name: "Team Productivity", description: "Pemantauan produktivitas tim" },
      { id: 7, name: "Training Management", description: "Pengelolaan pelatihan" },
      { id: 8, name: "Certification Tracking", description: "Pelacakan sertifikasi internal" },
      { id: 9, name: "Workforce Gap Analysis", description: "Analisis kesenjangan tenaga kerja" }
    ],
    dataObjects: [
      "operator_master", "manpower_plan", "shift_schedule", "attendance_log",
      "readiness_status", "line_assignment", "machine_assignment", "skill_matrix",
      "competency_matrix", "certification_record", "training_record", "shift_productivity",
      "team_productivity", "absenteeism_log", "overtime_log", "work_order_requirement",
      "critical_skill_requirement", "supervisor_note"
    ],
    businessRules: [
      "Line atau mesin kritis harus memiliki operator yang kompeten",
      "Shift tidak boleh dianggap siap jika operator inti belum hadir",
      "Pekerjaan dengan sertifikasi hanya boleh ditangani operator valid",
      "Skill mismatch harus memicu alert",
      "Produktivitas rendah harus dianalisis bersama attendance dan competency gap",
      "Kebutuhan tenaga kerja harus dikaitkan dengan rencana produksi"
    ],
    formulas: [
      { name: "Attendance Rate", formula: "present_operators / scheduled_operators" },
      { name: "Readiness Rate", formula: "ready_operators / scheduled_operators" },
      { name: "Skill Match Rate", formula: "matched_assignments / total_assignments" },
      { name: "Productivity per Shift", formula: "actual_output / total_operator_hours" },
      { name: "Manpower Gap", formula: "required_operators - available_qualified_operators" }
    ],
    keyQuestions: [
      "Apakah tenaga kerja untuk shift ini cukup dan siap?",
      "Operator mana yang paling tepat untuk line tertentu?",
      "Di mana terjadi skill mismatch?",
      "Tim atau shift mana yang produktivitasnya menurun?",
      "Pelatihan atau sertifikasi apa yang paling mendesak?",
      "Apakah manpower gap会影响 produksi?"
    ],
    integrations: [
      { agent: "Production Planning Agent", role: "Memberi info kapasitas tenaga kerja untuk plan" },
      { agent: "Production Execution Agent", role: "Memberi info performa shift dan readiness" },
      { agent: "Quality Agent", role: "Memberi info skill-related quality risk" },
      { agent: "Maintenance Agent", role: "Memberi info teknisi availability" }
    ]
  },

  subAgents: [
    { id: "coordinator", name: "Workforce Management Coordinator Agent", description: "Mengorkestrasi seluruh sub-agent workforce" },
    { id: "allocation", name: "Operator Allocation Agent", description: "Mengelola alokasi operator ke line dan mesin" },
    { id: "attendance", name: "Attendance & Readiness Monitoring Agent", description: "Memantau kehadiran dan kesiapan kerja" },
    { id: "competency", name: "Competency Mapping Agent", description: "Memetakan kompetensi operator" },
    { id: "skill", name: "Skill-Based Assignment Agent", description: "Menastikan penugasan sesuai skill" },
    { id: "productivity", name: "Team & Shift Productivity Agent", description: "Memantau produktivitas tim dan shift" },
    { id: "training", name: "Training & Certification Agent", description: "Mengelola pelatihan dan sertifikasi" },
    { id: "gaprisk", name: "Workforce Gap & Risk Agent", description: "Menganalisis risiko tenaga kerja" },
    { id: "summary", name: "Workforce Summary Agent", description: "Menyusun ringkasan akhir" }
  ],

  sampleQueries: [
    { query: "Apakah tenaga kerja untuk shift ini cukup dan siap?", expectedOutput: "Status kesiapan manpower dengan detail attendance" },
    { query: "Operator mana yang paling tepat untuk line tertentu?", expectedOutput: "Rekomendasi operator berdasarkan skill match" },
    { query: "Di mana terjadi skill mismatch?", expectedOutput: "Daftar posisi dengan skill gap" },
    { query: "Tim atau shift mana yang produktivitasnya menurun?", expectedOutput: "Analisis produktivitas per tim/shift" },
    { query: "Pelatihan apa yang paling mendesak?", expectedOutput: "Prioritas pelatihan berdasarkan kebutuhan operasional" }
  ],

  escalationRules: [
    { condition: "Operator kritis tidak hadir", escalateTo: "Production Execution Agent" },
    { condition: "Skill mismatch pada pekerjaan penting", escalateTo: "Quality Agent" },
    { condition: "Produktivitas shift menurun signifikan", escalateTo: "Production Planning Agent" },
    { condition: "Sertifikasi operator tidak valid untuk tugas kritis", escalateTo: "Training Manager" },
    { condition: "Manpower gap mengganggu rencana produksi", escalateTo: "Production Planning Agent" }
  ]
};

export default function WorkforceAgentPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "prompt" | "persona" | "knowledge" | "subagents" | "queries">("overview");
  const [editedPrompt, setEditedPrompt] = useState(workforceAgentData.systemPrompt);
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
            <h1 className="text-3xl font-bold text-slate-50">👥 Workforce & Work Management Agent</h1>
            <span className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm">Active</span>
          </div>
          <p className="text-slate-400">Domain: Workforce dan Manajemen Kerja pada Industri Manufaktur - Multi-Agent System</p>
        </div>

        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === tab.id ? "bg-pink-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
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
                  <span className="text-slate-200 font-mono">{workforceAgentData.overview.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Name</span>
                  <span className="text-slate-200">{workforceAgentData.overview.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Version</span>
                  <span className="text-slate-200">v{workforceAgentData.overview.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status</span>
                  <span className="text-pink-400">{workforceAgentData.overview.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Updated</span>
                  <span className="text-slate-200">{workforceAgentData.overview.lastUpdated}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Key Responsibilities</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>• Operator Allocation</li>
                <li>• Attendance & Readiness Monitoring</li>
                <li>• Competency Mapping</li>
                <li>• Skill-Based Assignment</li>
                <li>• Productivity Analysis</li>
                <li>• Training & Certification</li>
                <li>• Workforce Gap Analysis</li>
              </ul>
            </div>

            <div className="col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Focus KPIs</h3>
              <div className="grid grid-cols-4 gap-4">
                {workforceAgentData.persona.kpis.map((kpi, idx) => (
                  <div key={idx} className="bg-slate-700/50 rounded-lg p-3 text-center">
                    <span className="text-pink-400 text-sm font-medium">{kpi}</span>
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
                  <button onClick={handleSave} className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-sm font-medium">
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
                  isEditing ? "border border-pink-500" : ""
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
              <p className="text-pink-400 text-lg">{workforceAgentData.persona.name}</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Identitas</h3>
              <p className="text-slate-300">{workforceAgentData.persona.identity}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-semibold text-slate-50 mb-4">Karakteristik</h3>
                <ul className="space-y-2">
                  {workforceAgentData.persona.characteristics.map((char, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                      {char}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-semibold text-slate-50 mb-4">Keahlian Inti</h3>
                <ul className="space-y-2">
                  {workforceAgentData.persona.expertise.map((exp, idx) => (
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
                {workforceAgentData.persona.decisionPattern.split(" → ").map((step, idx) => (
                  <span key={idx}>
                    <span className="px-3 py-1 bg-slate-700 rounded-lg text-slate-300 text-sm">{step}</span>
                    {idx < workforceAgentData.persona.decisionPattern.split(" → ").length - 1 && <span className="mx-2 text-slate-500">→</span>}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Nilai yang Dijaga</h3>
              <div className="flex gap-2 flex-wrap">
                {workforceAgentData.persona.values.map((val, idx) => (
                  <span key={idx} className="px-4 py-2 bg-pink-500/20 text-pink-400 rounded-full text-sm">
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
              <p className="text-slate-300">{workforceAgentData.knowledgeBase.definitions}</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Sub-Ruang Lingkup</h3>
              <div className="grid grid-cols-2 gap-4">
                {workforceAgentData.knowledgeBase.subScopes.map((scope) => (
                  <div key={scope.id} className="bg-slate-700/50 rounded-lg p-4">
                    <h4 className="font-medium text-pink-400 mb-1">{scope.name}</h4>
                    <p className="text-sm text-slate-400">{scope.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Data Objects</h3>
              <div className="flex flex-wrap gap-2">
                {workforceAgentData.knowledgeBase.dataObjects.map((obj, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-700 rounded text-sm text-slate-300">
                    {obj}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Rumus Dasar</h3>
              <div className="space-y-3">
                {workforceAgentData.knowledgeBase.formulas.map((formula, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
                    <span className="text-slate-300 font-medium">{formula.name}</span>
                    <span className="text-pink-400 font-mono text-sm">{formula.formula}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Aturan Bisnis</h3>
              <ul className="space-y-2">
                {workforceAgentData.knowledgeBase.businessRules.map((rule, idx) => (
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
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Sub-Agents dalam Domain Workforce</h3>
            <div className="grid grid-cols-2 gap-4">
              {workforceAgentData.subAgents.map((agent) => (
                <div key={agent.id} className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-pink-500/50 transition-all">
                  <h4 className="font-semibold text-pink-400 mb-2">{agent.name}</h4>
                  <p className="text-sm text-slate-400">{agent.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mt-6">
              <h3 className="font-semibold text-slate-50 mb-4">Integrasi dengan Agent Lain</h3>
              <div className="space-y-3">
                {workforceAgentData.knowledgeBase.integrations.map((integration, idx) => (
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
                {workforceAgentData.escalationRules.map((rule, idx) => (
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
              {workforceAgentData.sampleQueries.map((item, idx) => (
                <div key={idx} className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-pink-600/20 text-pink-400 flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-medium text-slate-200">{item.query}</h4>
                    </div>
                  </div>
                  <div className="ml-11 pl-3 border-l-2 border-slate-700">
                    <p className="text-sm text-slate-400">
                      <span className="text-pink-400 font-medium">Expected: </span>
                      {item.expectedOutput}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mt-6">
              <h3 className="font-semibold text-slate-50 mb-4">Pertanyaan Inti yang Harus Dijawab</h3>
              <div className="grid grid-cols-2 gap-3">
                {workforceAgentData.knowledgeBase.keyQuestions.map((q, idx) => (
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
