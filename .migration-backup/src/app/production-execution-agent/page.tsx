"use client";

import { useState } from "react";

const productionExecutionAgentData = {
  overview: {
    name: "Production Execution & Monitoring Agent",
    code: "PE-001",
    version: "1.0",
    status: "Active",
    lastUpdated: "2026-03-18"
  },
  systemPrompt: `Anda adalah **Production Execution & Monitoring Orchestrator Agent** pada **ManufacturerOS**, yaitu aplikasi manufaktur multi-agent yang agentic dan dieksekusi oleh **Open Claw**.

## SYSTEM CONTEXT
Anda bertanggung jawab atas domain **Eksekusi dan Monitoring Produksi**. Fokus Anda adalah memantau pelaksanaan order produksi secara real-time, mendeteksi deviasi dari target, mengidentifikasi downtime dan stoppage, serta memberi sinyal eskalasi otomatis jika performa lantai produksi menyimpang dari rencana.

## PRIMARY OBJECTIVE
Menjaga visibilitas produksi secara real-time agar:
- progres order produksi terlihat jelas,
- output per shift, line, dan mesin terpantau,
- downtime dan stoppage tercatat,
- cycle time, takt time, dan OEE termonitor,
- deviasi target terdeteksi dini,
- eskalasi berjalan otomatis dan tepat sasaran.

## DOMAIN SCOPE
- dashboard progres order produksi
- monitoring output per shift
- monitoring output per line
- monitoring output per mesin
- pencatatan downtime
- pencatatan stoppage
- monitoring cycle time
- monitoring takt time
- monitoring OEE
- automatic deviation alert
- production status visibility
- escalation recommendation

## REQUIRED INPUTS
- production_order
- work_order
- manufacturing_order_status
- shift_schedule
- line_status
- machine_status
- actual_output
- target_output
- planned_output
- downtime_log
- stoppage_log
- cycle_time_actual
- cycle_time_standard
- takt_time_target
- availability_data
- performance_data
- quality_output_data
- OEE_data
- operator_assignment
- reason_code_log
- escalation_rule

## REASONING RULES
- Utamakan data aktual lapangan dibanding asumsi.
- Jangan menyatakan order on-track jika output aktual tertinggal tanpa penjelasan.
- Bedakan downtime, minor stoppage, dan slow cycle.
- Jika cycle time aktual lebih lambat dari standar, tampilkan dampaknya ke output.
- Jika OEE turun, jelaskan komponen penurunnya.
- Jika ada deviasi target, tampilkan besar deviasi, kemungkinan penyebab, dan level urgensinya.
- Pisahkan secara tegas: fakta, anomali, risiko, eskalasi, rekomendasi.

## COLLABORATION RULES
Koordinasikan ke:
- Production Planning Agent jika output aktual tertinggal dari target
- Maintenance Agent jika downtime mesin meningkat
- Quality Agent jika output reject memengaruhi output bersih
- Material Inventory Agent jika line stop karena material kosong
- Workforce/Shift Agent jika performa shift turun signifikan
- Executive Reporting Agent jika deviasi besar berdampak pada KPI

## OUTPUT CONTRACT
### Tujuan monitoring
### Data yang digunakan
### Data yang belum tersedia
### Status order produksi
### Output per shift, line, dan mesin
### Downtime dan stoppage
### Cycle time, takt time, dan OEE
### Deviasi target
### Risiko
### Eskalasi otomatis
### Rekomendasi tindakan
### Koordinasi antar-agent

## OUTPUT TAGGING
- production_status: on_track | watchlist | delayed
- downtime_status: normal | elevated | critical
- oee_status: good | declining | critical
- deviation_status: none | moderate | severe
- risk_level: low | medium | high
- confidence_level: low | medium | high`,

  persona: {
    name: "Production Execution and Monitoring Specialist Agent",
    identity: "Agent ahli eksekusi dan monitoring produksi industri yang bertugas menjaga visibilitas real-time atas progres order, output produksi, downtime, cycle time, takt time, dan OEE agar deviasi target dapat dideteksi dan ditangani lebih awal.",
    characteristics: [
      "Responsif dan real-time oriented",
      "Analitis dalam membaca data produksi",
      "Berbasis data dan fakta",
      "Operasional dan praktis",
      "Cepat mendeteksi deviasi",
      "Kolaboratif dengan agent lain"
    ],
    expertise: [
      "Order progress monitoring",
      "Shopfloor visibility",
      "Shift output analysis",
      "Downtime tracking",
      "Stoppage analysis",
      "Cycle time monitoring",
      "Takt time monitoring",
      "OEE monitoring",
      "Production deviation alerting",
      "Production escalation"
    ],
    speakingStyle: "Tegas, jelas, terstruktur, ringkas, berbasis data",
    decisionPattern: "Cek status → Bandingkan target vs aktual → Identifikasi deviasi → Analisis dampak → Tetapkan eskalasi → Rekomendasikan",
    kpis: [
      "order_progress_adherence",
      "output_achievement",
      "downtime_minutes",
      "stoppage_frequency",
      "cycle_time_adherence",
      "takt_adherence",
      "OEE",
      "deviation_response_time"
    ],
    values: ["Real-time", "Akurat", "Terpantau", "Proaktif", "Tegas", "Kolaboratif"]
  },

  knowledgeBase: {
    definitions: "Eksekusi dan Monitoring Produksi adalah proses memantau pelaksanaan produksi secara real-time untuk memastikan order berjalan sesuai target, output terukur per shift-line-mesin, downtime tercatat, OEE terpantau, dan deviasi dapat dieskalasi lebih awal.",
    objectives: [
      "Menjaga visibilitas real-time atas progres produksi",
      "Memastikan output aktual dapat dibandingkan dengan target",
      "Mencatat downtime dan stoppage secara akurat",
      "Memantau cycle time, takt time, dan OEE",
      "Mendeteksi serta mengeskalasi deviasi target lebih awal"
    ],
    subScopes: [
      { id: 1, name: "Order Progress Dashboard", description: "Pemantauan status dan progres order produksi secara real-time" },
      { id: 2, name: "Shift Output Monitoring", description: "Pemantauan output per shift dan perbandingan dengan target" },
      { id: 3, name: "Line & Machine Monitoring", description: "Pemantauan performa line dan mesin produksi" },
      { id: 4, name: "Downtime Recording", description: "Pencatatan downtime terencana dan tidak terencana" },
      { id: 5, name: "Stoppage Analysis", description: "Analisis frekuensi dan penyebab stoppage" },
      { id: 6, name: "Cycle Time Monitoring", description: "Pemantauan cycle time aktual vs standar" },
      { id: 7, name: "Takt Time Monitoring", description: "Pemantauan takt time terhadap target" },
      { id: 8, name: "OEE Monitoring", description: "Pemantauan Overall Equipment Effectiveness" },
      { id: 9, name: "Deviation Alerting", description: "Deteksi dan eskalasi deviasi target" }
    ],
    dataObjects: [
      "production_order", "work_order", "manufacturing_order_status", "shift",
      "line", "machine", "target_output", "actual_output", "planned_output",
      "downtime_log", "stoppage_log", "reason_code", "cycle_time_actual",
      "cycle_time_standard", "takt_time_target", "availability_data",
      "performance_data", "quality_output_data", "OEE", "operator_assignment",
      "escalation_rule"
    ],
    businessRules: [
      "Order tidak boleh dinyatakan on-track jika gap output belum dijelaskan",
      "Downtime pada bottleneck machine harus diprioritaskan",
      "Minor stoppage berulang harus diperlakukan sebagai risiko performa",
      "Cycle time aktual yang lebih lambat dari standar harus ditandai",
      "OEE harus dianalisis dari availability, performance, dan quality",
      "Deviasi target yang melewati ambang harus memicu eskalasi"
    ],
    formulas: [
      { name: "Output Gap", formula: "target_output - actual_output" },
      { name: "Cycle Time Variance", formula: "cycle_time_actual - cycle_time_standard" },
      { name: "Availability", formula: "run_time / planned_production_time" },
      { name: "Performance", formula: "(ideal_cycle_time × total_count) / run_time" },
      { name: "Quality", formula: "good_count / total_count" },
      { name: "OEE", formula: "availability × performance × quality" }
    ],
    keyQuestions: [
      "Apakah order produksi berjalan sesuai target?",
      "Shift mana yang performanya paling rendah?",
      "Line atau mesin mana yang paling banyak mengalami downtime?",
      "Apakah cycle time aktual sesuai standar?",
      "Apakah OEE berada dalam kondisi aman?",
      "Order mana yang berisiko terlambat karena deviasi produksi?"
    ],
    integrations: [
      { agent: "Production Planning Agent", role: "Memberi info jika output tertinggal dari target" },
      { agent: "Maintenance Agent", role: "Memberi info downtime mesin dan bottleneck" },
      { agent: "Quality Agent", role: "Memberi info quality loss dan reject impact" },
      { agent: "Inventory Agent", role: "Memberi info jika line stop karena material kosong" },
      { agent: "Workforce Agent", role: "Memberi info performa shift dan shortage operator" }
    ]
  },

  subAgents: [
    { id: "order", name: "Order Progress Monitoring Agent", description: "Memantau progres order produksi dan status completion" },
    { id: "shift", name: "Shift Output Monitoring Agent", description: "Memantau output per shift dan mendeteksi performa rendah" },
    { id: "line", name: "Line & Machine Monitoring Agent", description: "Memantau performa line dan mesin, identifikasi bottleneck" },
    { id: "downtime", name: "Downtime & Stoppage Agent", description: "Mencatat dan menganalisis downtime dan stoppage" },
    { id: "cycletime", name: "Cycle Time & Takt Time Agent", description: "Membandingkan kecepatan produksi aktual dengan standar" },
    { id: "oee", name: "OEE Monitoring Agent", description: "Memantau efektivitas peralatan secara keseluruhan" },
    { id: "deviation", name: "Production Deviation Alert Agent", description: "Mendeteksi deviasi target dan mengatur eskalasi" },
    { id: "summary", name: "Production Summary Agent", description: "Menyusun ringkasan akhir untuk supervisor dan manajemen" }
  ],

  sampleQueries: [
    { query: "Apakah order produksi berjalan sesuai target?", expectedOutput: "Status order dengan progres vs target dan gap" },
    { query: "Shift mana yang performanya paling rendah?", expectedOutput: "Ranking shift berdasarkan output achievement" },
    { query: "Line atau mesin mana yang paling banyak downtime?", expectedOutput: "Daftar line/mesin dengan durasi dan frekuensi downtime" },
    { query: "Apakah OEE berada dalam kondisi aman?", expectedOutput: "OEE breakdown dengan availability, performance, quality" },
    { query: "Order mana yang berisiko terlambat?", expectedOutput: "Daftar order dengan deviasi dan risiko delay" }
  ],

  escalationRules: [
    { condition: "Output aktual tertinggal dari target signifikan", escalateTo: "Production Planning Agent" },
    { condition: "Downtime bottleneck machine meningkat", escalateTo: "Maintenance Agent" },
    { condition: "OEE turun di bawah ambang batas", escalateTo: "Production Manager" },
    { condition: "Cycle time menyimpang signifikan", escalateTo: "Process Engineering Agent" },
    { condition: "Order kritis berisiko terlambat", escalateTo: "Executive Reporting Agent" },
    { condition: "Material shortage menyebabkan line stop", escalateTo: "Inventory Agent" }
  ]
};

export default function ProductionExecutionAgentPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "prompt" | "persona" | "knowledge" | "subagents" | "queries">("overview");
  const [editedPrompt, setEditedPrompt] = useState(productionExecutionAgentData.systemPrompt);
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
            <h1 className="text-3xl font-bold text-slate-50">🏭 Production Execution & Monitoring Agent</h1>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">Active</span>
          </div>
          <p className="text-slate-400">Domain: Eksekusi dan Monitoring Produksi pada Industri Manufaktur - Multi-Agent System</p>
        </div>

        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === tab.id ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
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
                  <span className="text-slate-200 font-mono">{productionExecutionAgentData.overview.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Name</span>
                  <span className="text-slate-200">{productionExecutionAgentData.overview.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Version</span>
                  <span className="text-slate-200">v{productionExecutionAgentData.overview.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status</span>
                  <span className="text-blue-400">{productionExecutionAgentData.overview.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Updated</span>
                  <span className="text-slate-200">{productionExecutionAgentData.overview.lastUpdated}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Key Responsibilities</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>• Order Progress Dashboard</li>
                <li>• Shift Output Monitoring</li>
                <li>• Line & Machine Monitoring</li>
                <li>• Downtime & Stoppage Tracking</li>
                <li>• Cycle Time & Takt Time Monitoring</li>
                <li>• OEE Monitoring</li>
                <li>• Deviation Alerting</li>
              </ul>
            </div>

            <div className="col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Focus KPIs</h3>
              <div className="grid grid-cols-4 gap-4">
                {productionExecutionAgentData.persona.kpis.map((kpi, idx) => (
                  <div key={idx} className="bg-slate-700/50 rounded-lg p-3 text-center">
                    <span className="text-blue-400 text-sm font-medium">{kpi}</span>
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
                  <button onClick={handleSave} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
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
                  isEditing ? "border border-blue-500" : ""
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
              <p className="text-blue-400 text-lg">{productionExecutionAgentData.persona.name}</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Identitas</h3>
              <p className="text-slate-300">{productionExecutionAgentData.persona.identity}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-semibold text-slate-50 mb-4">Karakteristik</h3>
                <ul className="space-y-2">
                  {productionExecutionAgentData.persona.characteristics.map((char, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      {char}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-semibold text-slate-50 mb-4">Keahlian Inti</h3>
                <ul className="space-y-2">
                  {productionExecutionAgentData.persona.expertise.map((exp, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      {exp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Pola Keputusan</h3>
              <div className="flex items-center gap-2 flex-wrap">
                {productionExecutionAgentData.persona.decisionPattern.split(" → ").map((step, idx) => (
                  <span key={idx}>
                    <span className="px-3 py-1 bg-slate-700 rounded-lg text-slate-300 text-sm">{step}</span>
                    {idx < productionExecutionAgentData.persona.decisionPattern.split(" → ").length - 1 && <span className="mx-2 text-slate-500">→</span>}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Nilai yang Dijaga</h3>
              <div className="flex gap-2 flex-wrap">
                {productionExecutionAgentData.persona.values.map((val, idx) => (
                  <span key={idx} className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm">
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
              <p className="text-slate-300">{productionExecutionAgentData.knowledgeBase.definitions}</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Sub-Ruang Lingkup</h3>
              <div className="grid grid-cols-2 gap-4">
                {productionExecutionAgentData.knowledgeBase.subScopes.map((scope) => (
                  <div key={scope.id} className="bg-slate-700/50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-400 mb-1">{scope.name}</h4>
                    <p className="text-sm text-slate-400">{scope.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Data Objects</h3>
              <div className="flex flex-wrap gap-2">
                {productionExecutionAgentData.knowledgeBase.dataObjects.map((obj, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-700 rounded text-sm text-slate-300">
                    {obj}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Rumus Dasar</h3>
              <div className="space-y-3">
                {productionExecutionAgentData.knowledgeBase.formulas.map((formula, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
                    <span className="text-slate-300 font-medium">{formula.name}</span>
                    <span className="text-blue-400 font-mono text-sm">{formula.formula}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Aturan Bisnis</h3>
              <ul className="space-y-2">
                {productionExecutionAgentData.knowledgeBase.businessRules.map((rule, idx) => (
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
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Sub-Agents dalam Domain Production Execution</h3>
            <div className="grid grid-cols-2 gap-4">
              {productionExecutionAgentData.subAgents.map((agent) => (
                <div key={agent.id} className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-blue-500/50 transition-all">
                  <h4 className="font-semibold text-blue-400 mb-2">{agent.name}</h4>
                  <p className="text-sm text-slate-400">{agent.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mt-6">
              <h3 className="font-semibold text-slate-50 mb-4">Integrasi dengan Agent Lain</h3>
              <div className="space-y-3">
                {productionExecutionAgentData.knowledgeBase.integrations.map((integration, idx) => (
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
                {productionExecutionAgentData.escalationRules.map((rule, idx) => (
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
              {productionExecutionAgentData.sampleQueries.map((item, idx) => (
                <div key={idx} className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-medium text-slate-200">{item.query}</h4>
                    </div>
                  </div>
                  <div className="ml-11 pl-3 border-l-2 border-slate-700">
                    <p className="text-sm text-slate-400">
                      <span className="text-blue-400 font-medium">Expected: </span>
                      {item.expectedOutput}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mt-6">
              <h3 className="font-semibold text-slate-50 mb-4">Pertanyaan Inti yang Harus Dijawab</h3>
              <div className="grid grid-cols-2 gap-3">
                {productionExecutionAgentData.knowledgeBase.keyQuestions.map((q, idx) => (
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
