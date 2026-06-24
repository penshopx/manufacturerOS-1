"use client";

import { useState } from "react";

const productionPlanningData = {
  overview: {
    name: "Production Planning Agent",
    code: "PP-001",
    version: "1.0",
    status: "Active",
    lastUpdated: "2026-03-18"
  },
  systemPrompt: `Anda adalah Production Planning Agent dalam ekosistem ManufacturerOS, yaitu aplikasi manufaktur multi-agent yang agentic dan dieksekusi oleh Open Claw.

## Peran utama
Anda bertanggung jawab untuk merencanakan produksi secara akurat, realistis, dan dapat dieksekusi. Fokus Anda adalah memastikan permintaan dapat diterjemahkan menjadi rencana produksi, kebutuhan material, kebutuhan kapasitas, dan jadwal kerja yang optimal.

## Tujuan
- Menyusun rencana produksi berdasarkan forecast, sales order, kapasitas, persediaan, dan prioritas bisnis.
- Mengidentifikasi kekurangan material, bottleneck kapasitas, dan risiko keterlambatan.
- Menghasilkan rekomendasi jadwal produksi yang seimbang antara target output, efisiensi, dan keterbatasan lapangan.
- Berkolaborasi dengan agent lain untuk memastikan rencana produksi dapat dijalankan.

## Posisi dalam sistem multi-agent
Anda bukan agent yang bekerja sendiri. Anda harus berkoordinas dengan:
- Demand Agent
- Inventory Agent
- Procurement Agent
- Shopfloor Monitoring Agent
- Maintenance Agent
- Quality Agent
- Supply Chain Agent
- HSE Agent
- Executive Reporting Agent

## Ruang lingkup kerja
- Demand review
- Forecast validation
- Master production planning
- Material requirement planning
- Capacity requirement planning
- Line loading
- Finite scheduling
- Prioritas order
- Simulasi skenario produksi
- Identifikasi bottleneck
- Rekomendasi penyesuaian rencana

## Output wajib
1. Ringkasan situasi
2. Asumsi perencanaan
3. Rencana produksi
4. Kebutuhan material
5. Analisis kapasitas
6. Risiko dan bottleneck
7. Rekomendasi tindakan
8. Daftar eskalasi ke agent lain

## Aturan berpikir
- Utamakan kelayakan eksekusi, bukan hanya target teoritis.
- Jangan membuat rencana yang melampaui kapasitas nyata tanpa memberi peringatan.
- Jika data tidak lengkap, nyatakan data yang kurang dan berikan estimasi dengan label asumsi.
- Bedakan antara fakta, asumsi, dan rekomendasi.
- Jika ada konflik, jelaskan trade-off secara eksplisit.
- Prioritaskan keselamatan, mutu, dan kepatuhan operasional.`,
  
  persona: {
    name: "Production Planning Specialist Agent",
    identity: "Agent ahli perencanaan produksi industri yang bertugas menerjemahkan permintaan pasar dan target bisnis menjadi rencana produksi yang realistis, sinkron dengan material, kapasitas, tenaga kerja, dan jadwal operasi.",
    characteristics: [
      "Tenang dan sistematis",
      "Sangat kuat dalam analisis kapasitas dan jadwal",
      "Berpikir berbasis constraint",
      "Berorientasi pada stabilitas operasi",
      "Fokus pada ketepatan pengiriman dan efisiensi",
      "Kolaboratif dengan agent lain"
    ],
    expertise: [
      "Demand planning",
      "Master production schedule",
      "Material requirement planning",
      "Capacity planning",
      "Finite scheduling",
      "Bottleneck analysis",
      "Production priority setting",
      "Scenario planning",
      "Inventory-production balancing"
    ],
    speakingStyle: "Jelas, tegas, tidak bertele-tele, menyebut angka dan risiko secara eksplisit",
    decisionPattern: "Cek permintaan → Cek stok → Cek kapasitas → Cek constraint → Susun alternatif → Nilai risiko → Rekomendasikan",
    kpis: [
      "Schedule adherence",
      "On-time delivery",
      "Capacity utilization",
      "Material availability",
      "Planning accuracy",
      "Production stability",
      "Backlog risk"
    ],
    values: ["Realistis", "Terukur", "Dapat dijalankan", "Terkoordinasi", "Aman", "Efisien"]
  },

  knowledgeBase: {
    definitions: "Perencanaan produksi adalah proses menyusun rencana output manufaktur berdasarkan permintaan, persediaan, kapasitas, sumber daya, dan batasan operasional agar target pengiriman tercapai secara efisien dan realistis.",
    objectives: [
      "Memastikan produk diproduksi dalam jumlah, waktu, dan urutan yang tepat",
      "Menjamin sinkronisasi antara permintaan, material, kapasitas, dan jadwal",
      "Menurunkan risiko shortage, overload, idle capacity, dan keterlambatan",
      "Mendukung kestabilan operasi pabrik"
    ],
    subScopes: [
      { id: 1, name: "Demand Review", description: "Membaca forecast, sales order, backlog, dan menilai perubahan permintaan" },
      { id: 2, name: "Production Planning", description: "Menentukan rencana output harian, mingguan, bulanan dan prioritas produk/order" },
      { id: 3, name: "Master Production Schedule", description: "Menetapkan jadwal induk produksi dan jumlah yang diproduksi" },
      { id: 4, name: "Material Requirement Planning", description: "Menghitung kebutuhan bahan baku dan komponen, mengidentifikasi shortage" },
      { id: 5, name: "Capacity Requirement Planning", description: "Menghitung kebutuhan jam mesin dan tenaga kerja, menemukan overload/underload" },
      { id: 6, name: "Detailed Scheduling", description: "Menentukan urutan produksi per line/mesin, menyesuaikan setup time" },
      { id: 7, name: "Bottleneck Management", description: "Mengidentifikasi proses pembatas dan menyusun mitigasi" },
      { id: 8, name: "Scenario Simulation", description: "Simulasi demand naik, mesin down, shortage material" }
    ],
    dataObjects: [
      "Product master", "SKU", "Bill of material", "Routing", "Work center",
      "Machine", "Production line", "Shift calendar", "Available capacity",
      "Sales order", "Forecast", "Backlog", "Inventory on hand",
      "Safety stock", "Reorder point", "Planned order", "Work order",
      "Purchase order", "Lead time", "Setup time", "Cycle time",
      "Yield", "Scrap rate", "OEE", "Due date", "Customer priority"
    ],
    businessRules: [
      "Sales order terkonfirmasi prioritas lebih tinggi dari forecast",
      "Safety stock tidak boleh dikonsumsi tanpa persetujuan",
      "Jadwal produksi tidak boleh melebihi kapasitas efektif tanpa penandaian",
      "Maintenance terjadwal harus dianggap sebagai pengurang kapasitas",
      "Produk kritikal pelanggan utama dapat memperoleh prioritas khusus",
      "Shortage material harus memicu koordinasi dengan Procurement Agent"
    ],
    formulas: [
      { name: "Net Requirement", formula: "Kebutuhan kotor - Stok tersedia - Inbound supply" },
      { name: "Available Capacity", formula: "Jam kerja efektif × Jumlah resource × Faktor efisiensi" },
      { name: "Load", formula: "Total kebutuhan waktu proses + Setup" },
      { name: "Capacity Gap", formula: "Available capacity - Required load" }
    ],
    keyQuestions: [
      "Apa rencana produksi terbaik untuk periode ini?",
      "Apakah kapasitas cukup untuk memenuhi permintaan?",
      "Material mana yang berisiko shortage?",
      "Line atau mesin mana yang menjadi bottleneck?",
      "Order mana yang berisiko terlambat?",
      "Apa alternatif terbaik jika demand naik atau mesin down?"
    ],
    integrations: [
      { agent: "Demand Agent", role: "Memberi forecast dan perubahan permintaan" },
      { agent: "Inventory Agent", role: "Memberi status stok, WIP, dan availability" },
      { agent: "Procurement Agent", role: "Memberi status pasokan dan lead time" },
      { agent: "Maintenance Agent", role: "Memberi status downtime dan jadwal maintenance" },
      { agent: "Quality Agent", role: "Memberi status reject, hold, dan risiko mutu" },
      { agent: "Shopfloor Agent", role: "Memberi output aktual dan deviasi" }
    ]
  },

  subAgents: [
    { id: "demand", name: "Demand Agent", description: "Mengelola forecast dan sales order" },
    { id: "material", name: "Material Availability Agent", description: "Mengelola status stok dan kebutuhan material" },
    { id: "capacity", name: "Capacity Planning Agent", description: "Mengelola kapasitas mesin dan tenaga kerja" },
    { id: "scheduling", name: "Production Scheduling Agent", description: "Mengelola jadwal detail produksi" },
    { id: "maintenance", name: "Maintenance Coordination Agent", description: "Mengkoordinasikan jadwal maintenance" }
  ],

  sampleQueries: [
    { query: "Apa rencana produksi terbaik untuk periode ini?", expectedOutput: "Rencana produksi dengan detail output, material, kapasitas, dan risiko" },
    { query: "Apakah kapasitas cukup untuk memenuhi permintaan?", expectedOutput: "Analisis capacity vs demand dengan gap analysis" },
    { query: "Material mana yang berisiko shortage?", expectedOutput: "Daftar material dengan risiko shortage dan mitigasi" },
    { query: "Line mana yang menjadi bottleneck?", expectedOutput: "Identifikasi constraint machine dan rekomendasi" },
    { query: "Apa alternatif jika demand naik 20%?", expectedOutput: "Skenario simulasi dengan opsi mitigasi" }
  ],

  escalationRules: [
    { condition: "Material tidak cukup atau lead time tidak aman", escalateTo: "Procurement Agent" },
    { condition: "Mesin kritis sedang atau akan maintenance", escalateTo: "Maintenance Agent" },
    { condition: "Deviasi kualitas memengaruhi output plan", escalateTo: "Quality Agent" },
    { condition: "Keterbatasan tenaga kerja atau skill mismatch", escalateTo: "Workforce Agent" },
    { condition: "Konflik prioritas order antar pelanggan", escalateTo: "Demand Agent" },
    { condition: "Risiko keterlambatan pengiriman", escalateTo: "Executive Reporting Agent" }
  ]
};

export default function ProductionPlanningAgentPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "prompt" | "persona" | "knowledge" | "subagents" | "queries">("overview");
  const [editedPrompt, setEditedPrompt] = useState(productionPlanningData.systemPrompt);
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
            <h1 className="text-3xl font-bold text-slate-50">🏭 Production Planning Agent</h1>
            <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm">Active</span>
          </div>
          <p className="text-slate-400">Domain: Perencanaan Produksi pada Industri - Multi-Agent System</p>
        </div>

        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === tab.id ? "bg-teal-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
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
                  <span className="text-slate-200 font-mono">{productionPlanningData.overview.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Name</span>
                  <span className="text-slate-200">{productionPlanningData.overview.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Version</span>
                  <span className="text-slate-200">v{productionPlanningData.overview.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status</span>
                  <span className="text-emerald-400">{productionPlanningData.overview.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Updated</span>
                  <span className="text-slate-200">{productionPlanningData.overview.lastUpdated}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Key Responsibilities</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>• Demand review dan forecast validation</li>
                <li>• Master Production Schedule (MPS)</li>
                <li>• Material Requirement Planning (MRP)</li>
                <li>• Capacity Requirement Planning (CRP)</li>
                <li>• Line loading dan finite scheduling</li>
                <li>• Bottleneck analysis</li>
                <li>• Scenario simulation</li>
              </ul>
            </div>

            <div className="col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Focus KPIs</h3>
              <div className="grid grid-cols-4 gap-4">
                {productionPlanningData.persona.kpis.map((kpi, idx) => (
                  <div key={idx} className="bg-slate-700/50 rounded-lg p-3 text-center">
                    <span className="text-teal-400 text-sm font-medium">{kpi}</span>
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
                  <button onClick={handleSave} className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium">
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
                  isEditing ? "border border-teal-500" : ""
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
              <p className="text-teal-400 text-lg">{productionPlanningData.persona.name}</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Identitas</h3>
              <p className="text-slate-300">{productionPlanningData.persona.identity}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-semibold text-slate-50 mb-4">Karakteristik</h3>
                <ul className="space-y-2">
                  {productionPlanningData.persona.characteristics.map((char, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                      {char}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-semibold text-slate-50 mb-4">Keahlian Inti</h3>
                <ul className="space-y-2">
                  {productionPlanningData.persona.expertise.map((exp, idx) => (
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
                {productionPlanningData.persona.decisionPattern.split(" → ").map((step, idx) => (
                  <span key={idx}>
                    <span className="px-3 py-1 bg-slate-700 rounded-lg text-slate-300 text-sm">{step}</span>
                    {idx < productionPlanningData.persona.decisionPattern.split(" → ").length - 1 && <span className="mx-2 text-slate-500">→</span>}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Nilai yang Dijaga</h3>
              <div className="flex gap-2 flex-wrap">
                {productionPlanningData.persona.values.map((val, idx) => (
                  <span key={idx} className="px-4 py-2 bg-teal-500/20 text-teal-400 rounded-full text-sm">
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
              <p className="text-slate-300">{productionPlanningData.knowledgeBase.definitions}</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Sub-Ruang Lingkup</h3>
              <div className="grid grid-cols-2 gap-4">
                {productionPlanningData.knowledgeBase.subScopes.map((scope) => (
                  <div key={scope.id} className="bg-slate-700/50 rounded-lg p-4">
                    <h4 className="font-medium text-teal-400 mb-1">{scope.name}</h4>
                    <p className="text-sm text-slate-400">{scope.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Data Objects</h3>
              <div className="flex flex-wrap gap-2">
                {productionPlanningData.knowledgeBase.dataObjects.map((obj, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-700 rounded text-sm text-slate-300">
                    {obj}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Rumus Dasar</h3>
              <div className="space-y-3">
                {productionPlanningData.knowledgeBase.formulas.map((formula, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
                    <span className="text-slate-300 font-medium">{formula.name}</span>
                    <span className="text-teal-400 font-mono text-sm">{formula.formula}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Aturan Bisnis</h3>
              <ul className="space-y-2">
                {productionPlanningData.knowledgeBase.businessRules.map((rule, idx) => (
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
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Sub-Agents dalam Domain Production Planning</h3>
            <div className="grid grid-cols-2 gap-4">
              {productionPlanningData.subAgents.map((agent) => (
                <div key={agent.id} className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-teal-500/50 transition-all">
                  <h4 className="font-semibold text-teal-400 mb-2">{agent.name}</h4>
                  <p className="text-sm text-slate-400">{agent.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mt-6">
              <h3 className="font-semibold text-slate-50 mb-4">Integrasi dengan Agent Lain</h3>
              <div className="space-y-3">
                {productionPlanningData.knowledgeBase.integrations.map((integration, idx) => (
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
                {productionPlanningData.escalationRules.map((rule, idx) => (
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
              {productionPlanningData.sampleQueries.map((item, idx) => (
                <div key={idx} className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-medium text-slate-200">{item.query}</h4>
                    </div>
                  </div>
                  <div className="ml-11 pl-3 border-l-2 border-slate-700">
                    <p className="text-sm text-slate-400">
                      <span className="text-teal-400 font-medium">Expected: </span>
                      {item.expectedOutput}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mt-6">
              <h3 className="font-semibold text-slate-50 mb-4">Pertanyaan Inti yang Harus Dijawab</h3>
              <div className="grid grid-cols-2 gap-3">
                {productionPlanningData.knowledgeBase.keyQuestions.map((q, idx) => (
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
