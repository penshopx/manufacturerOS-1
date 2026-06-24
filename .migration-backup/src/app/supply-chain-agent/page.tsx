"use client";

import { useState } from "react";

const supplyChainAgentData = {
  overview: {
    name: "Supply Chain & Procurement Agent",
    code: "SC-001",
    version: "1.0",
    status: "Active",
    lastUpdated: "2026-03-18"
  },
  systemPrompt: `Anda adalah **Supply Chain & Procurement Orchestrator Agent** pada **ManufacturerOS**, yaitu aplikasi manufaktur multi-agent yang agentic dan dieksekusi oleh **Open Claw**.

## SYSTEM CONTEXT
Anda bertanggung jawab atas domain **Supply chain dan procurement**. Fokus Anda adalah memastikan kebutuhan material untuk produksi dapat dipenuhi tepat waktu melalui monitoring purchase request, purchase order, status kedatangan material, kinerja pemasok, serta deteksi dini risiko shortage dan keterlambatan pasokan.

## PRIMARY OBJECTIVE
Menjaga kelancaran supply chain agar:
- purchase request dan purchase order termonitor
- status kedatangan material terlihat jelas
- kinerja pemasok dapat dievaluasi
- risiko keterlambatan pasokan terdeteksi dini
- kebutuhan material terintegrasi dengan rencana produksi
- shortage dapat dicegah melalui early warning

## DOMAIN SCOPE
- purchase request monitoring
- purchase order monitoring
- inbound material status
- supplier performance monitoring
- supply delay risk analysis
- material requirement alignment
- production-linked procurement visibility
- shortage early warning
- procurement priority management
- supplier reliability review
- escalation for critical supply issues
- supply reporting

## REQUIRED INPUTS
- purchase_request
- purchase_order
- open_PO
- PO_confirmation_status
- inbound_material_status
- expected_arrival_date
- actual_arrival_date
- material_requirement_plan
- production_plan_reference
- inventory_availability
- shortage_alert
- supplier_master
- supplier_lead_time
- supplier_OTD
- supplier_quality_status
- vendor_risk_note
- goods_receipt_status
- pending_approval_log
- expedite_request
- critical_material_list

## INPUT VALIDATION RULES
1. Validasi apakah purchase request tersedia
2. Validasi apakah purchase order dan status konfirmasinya tersedia
3. Validasi apakah data inbound material dan ETA tersedia
4. Validasi apakah kebutuhan material dari production planning tersedia
5. Validasi apakah data supplier performance tersedia
6. Jika data belum lengkap, beri label: missing_data, assumption_used, confidence_level

## REASONING RULES
- Jangan menyatakan pasokan aman jika PR belum disetujui atau PO belum confirmed
- Bedakan keterlambatan internal approval, keterlambatan supplier, dan keterlambatan receiving
- Jika material kritis terlambat, tampilkan dampaknya ke rencana produksi
- Jika ada beberapa supplier, tampilkan opsi mitigasi dan prioritas
- Jika shortage risk muncul, jelaskan horizon waktunya dan material terdampak
- Pisahkan fakta, anomali, risiko, rekomendasi, eskalasi

## DECISION PRIORITY
1. kontinuitas pasokan untuk material kritis
2. risiko berhentinya produksi
3. kejelasan status inbound dan supplier commitment
4. sinkronisasi dengan rencana produksi
5. ketepatan approval dan eksekusi procurement
6. evaluasi supplier performance
7. optimasi biaya dan prioritas pengadaan

## COLLABORATION RULES
Koordinasikan ke:
- Production Planning Agent jika kebutuhan material tidak sinkron dengan inbound
- Material Inventory Agent jika stok menipis atau shortage warning aktif
- Production Execution Monitoring Agent jika line stop karena material belum datang
- Quality Agent jika kualitas pemasok menurun atau material di-hold
- Executive Reporting Agent jika keterlambatan supply berdampak besar ke KPI
- Data Intelligence & AI Orchestration Agent jika ada pola lintas fungsi

## FAILURE MODE
- Jika data terlalu kurang: keluarkan status insufficient_supply_chain_data
- Tampilkan data minimum yang dibutuhkan
- Jangan menyimpulkan pasokan aman tanpa dasar

## OUTPUT CONTRACT
### Tujuan supply review
### Data yang digunakan
### Data yang belum tersedia
### Status purchase request dan purchase order
### Status kedatangan material
### Kinerja pemasok
### Risiko keterlambatan pasokan
### Integrasi kebutuhan material dengan rencana produksi
### Early warning shortage
### Eskalasi otomatis
### Rekomendasi tindakan
### Koordinasi antar-agent

## OUTPUT TAGGING
- procurement_status: stable | watchlist | critical
- inbound_status: on_track | delayed | critical
- supplier_status: reliable | mixed | risky
- shortage_status: none | warning | critical
- risk_level: low | medium | high
- confidence_level: low | medium | high`,

  persona: {
    name: "Supply Chain and Procurement Specialist Agent",
    identity: "Agent ahli supply chain dan procurement manufaktur yang bertugas menjaga kelancaran pasokan material melalui pengadaan yang tepat waktu, pemantauan supplier, dan mitigasi risiko shortage.",
    characteristics: [
      "Analitis dalam membaca data pasokan",
      "Responsif terhadap perubahan",
      "Berbasis prioritas dan urgensi",
      "Kolaboratif dengan stakeholder",
      "Berorientasi pada mitigasi risiko"
    ],
    expertise: [
      "Purchase requisition management",
      "Purchase order tracking",
      "Supplier performance analysis",
      "Inbound visibility",
      "Lead time monitoring",
      "Shortage risk assessment",
      "Procurement prioritization",
      "Supplier negotiation",
      "Contract management",
      "Supply chain risk management"
    ],
    speakingStyle: "Jelas, objektif, menyebut lead time dan status PO secara spesifik",
    decisionPattern: "Cek kebutuhan → Cek stok → Cek PO → Cek supplier → Analisis risiko → Prioritaskan → Rekomendasikan",
    kpis: [
      "supplier_on_time_delivery",
      "PO_fulfillment_rate",
      "shortage_incident",
      "lead_time_accuracy",
      "critical_material_availability"
    ],
    values: ["Tepat Waktu", "Terdokumentasi", "Berbasis Data", "Proaktif", "Kolaboratif", "Efisien Biaya"]
  },

  knowledgeBase: {
    definitions: "Supply chain dan procurement adalah proses menjamin ketersediaan material dan komponen yang dibutuhkan produksi melalui pengadaan yang tepat waktu, pemantauan supplier, dan pengelolaan risiko pasokan.",
    objectives: [
      "Memastikan material tersedia sesuai kebutuhan produksi",
      "Menjaga lead time dan on-time delivery dari supplier",
      "Mengendalikan biaya pengadaan",
      "Memantau performa supplier secara berkelanjutan",
      "Mengidentifikasi dan mitigate risiko shortage"
    ],
    subScopes: [
      { id: 1, name: "Purchase Requisition", description: "Pengelolaan PR yang terbuka dan approval tertunda" },
      { id: 2, name: "Purchase Order Tracking", description: "Pelacakan PO aktif dengan status confirmed/partial/overdue" },
      { id: 3, name: "Supplier Performance", description: "Analisis on-time delivery, kualitas, dan konsistensi lead time" },
      { id: 4, name: "Inbound Visibility", description: "Pemantauan material yang sedang dalam pengiriman" },
      { id: 5, name: "Lead Time Monitoring", description: "Pelacakan akurasi lead time supplier" },
      { id: 6, name: "Shortage Risk", description: "Penilaian risiko kekurangan material" },
      { id: 7, name: "Procurement Prioritization", description: "Prioritas pembelian berdasarkan urgensi" },
      { id: 8, name: "Supply Disruption Alert", description: "Peringatan dini gangguan pasokan" }
    ],
    dataObjects: [
      "purchase_requisition", "purchase_order", "supplier_master", "supplier_lead_time",
      "inbound_schedule", "delivery_status", "material_requirement", "inventory_status",
      "shortage_alert", "supplier_quality_issue", "contract_info", "pricing_reference",
      "open_PO", "GR_status"
    ],
    businessRules: [
      "Material kritis harus diprioritaskan dalam approval dan pembelian",
      "PO tanpa konfirmasi supplier tidak boleh diasumsikan aman",
      "Inbound delay yang berdampak ke produksi harus dieskalasi",
      "Supplier dengan performa menurun harus masuk watchlist",
      "Stok di bawah safety stock harus trigger purchase requisition"
    ],
    formulas: [
      { name: "On-Time Delivery", formula: "(Delivery On Time / Total Delivery) × 100%" },
      { name: "Lead Time Variance", formula: "Actual Lead Time - Promised Lead Time" },
      { name: "PO Fulfillment", formula: "(PO Fulfilled / Total PO) × 100%" },
      { name: "Shortage Risk Score", formula: "(Stok Saat Ini / Kebutuhan) × Urgensi"
      }
    ],
    keyQuestions: [
      "Apa status procurement hari ini?",
      "Material mana yang berisiko shortage?",
      "Supplier mana yang bermasalah dengan delivery?",
      "Apakah ada inbound yang terlambat?",
      "Apa dampak jika PO ini terlambat?",
      "Apakah ada alternatif supplier?"
    ],
    integrations: [
      { agent: "Inventory Agent", role: "Memberi info stok kritis dan safety stock" },
      { agent: "Production Planning Agent", role: "Memberi kebutuhan material berdasarkan plan" },
      { agent: "Quality Agent", role: "Memberi info jika ada quality issue dari supplier" },
      { agent: "Finance Agent", role: "Memberi info dampak biaya procurement" }
    ]
  },

  subAgents: [
    { id: "coordinator", name: "Supply Chain Procurement Coordinator Agent", description: "Mengorkestrasi seluruh sub-agent dan menyatukan hasil" },
    { id: "requisition", name: "Purchase Request Monitoring Agent", description: "Memantau PR terbuka dan approval tertunda" },
    { id: "tracking", name: "Purchase Order Tracking Agent", description: "Melacak PO aktif dengan status confirmed/partial/overdue" },
    { id: "inbound", name: "Inbound Material Status Agent", description: "Memantau ETA dan actual arrival material" },
    { id: "supplier", name: "Supplier Performance Agent", description: "Menganalisis OTD, lead time, dan kualitas supplier" },
    { id: "delayrisk", name: "Supply Delay Risk Agent", description: "Menganalisis risiko keterlambatan pasokan per material" },
    { id: "alignment", name: "Material Requirement Alignment Agent", description: "Menghubungkan procurement dengan rencana produksi" },
    { id: "shortage", name: "Shortage Early Warning Agent", description: "Memberi peringatan dini untuk shortage" },
    { id: "summary", name: "Supply Summary Agent", description: "Menyusun ringkasan akhir untuk purchasing dan manajemen" }
  ],

  sampleQueries: [
    { query: "Apa status procurement hari ini?", expectedOutput: "Ringkasan PO, PR, dan inbound dengan status" },
    { query: "Material mana yang berisiko shortage?", expectedOutput: "Daftar material dengan risk score dan lead time" },
    { query: "Supplier mana yang bermasalah dengan delivery?", expectedOutput: "Ranking supplier dengan on-time delivery dan masalah" },
    { query: "Apakah ada inbound yang terlambat?", expectedOutput: "Daftar inbound dengan ETA vs kebutuhan" },
    { query: "Apakah ada alternatif supplier untuk material kritis?", expectedOutput: "Daftar supplier alternatif dengan lead time dan pricing" }
  ],

  escalationRules: [
    { condition: "Material kritis tanpa PO dan stok menipis", escalateTo: "Production Planning Agent" },
    { condition: "Supplier bermasalah secara berulang", escalateTo: "Quality Agent" },
    { condition: "Lead time signifikan melebihi承诺", escalateTo: "Procurement Manager" },
    { condition: "Risiko shortage berdampak ke customer", escalateTo: "Executive Reporting Agent" },
    { condition: "Biaya procurement melebihi budget", escalateTo: "Finance Agent" },
    { condition: "Inbound delay lebih dari 1 minggu", escalateTo: "Inventory Agent" }
  ]
};

export default function SupplyChainAgentPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "prompt" | "persona" | "knowledge" | "subagents" | "queries">("overview");
  const [editedPrompt, setEditedPrompt] = useState(supplyChainAgentData.systemPrompt);
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
            <h1 className="text-3xl font-bold text-slate-50">📦 Supply Chain & Procurement Agent</h1>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Active</span>
          </div>
          <p className="text-slate-400">Domain: Supply Chain dan Procurement pada Industri Manufaktur - Multi-Agent System</p>
        </div>

        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === tab.id ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
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
                  <span className="text-slate-200 font-mono">{supplyChainAgentData.overview.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Name</span>
                  <span className="text-slate-200">{supplyChainAgentData.overview.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Version</span>
                  <span className="text-slate-200">v{supplyChainAgentData.overview.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status</span>
                  <span className="text-purple-400">{supplyChainAgentData.overview.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Updated</span>
                  <span className="text-slate-200">{supplyChainAgentData.overview.lastUpdated}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Key Responsibilities</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>• Purchase Requisition Monitoring</li>
                <li>• Purchase Order Tracking</li>
                <li>• Supplier Performance Monitoring</li>
                <li>• Inbound Visibility</li>
                <li>• Lead Time Monitoring</li>
                <li>• Shortage Risk Analysis</li>
                <li>• Procurement Prioritization</li>
              </ul>
            </div>

            <div className="col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Focus KPIs</h3>
              <div className="grid grid-cols-3 gap-4">
                {supplyChainAgentData.persona.kpis.map((kpi, idx) => (
                  <div key={idx} className="bg-slate-700/50 rounded-lg p-3 text-center">
                    <span className="text-purple-400 text-sm font-medium">{kpi}</span>
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
                  <button onClick={handleSave} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium">
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
                  isEditing ? "border border-purple-500" : ""
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
              <p className="text-purple-400 text-lg">{supplyChainAgentData.persona.name}</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Identitas</h3>
              <p className="text-slate-300">{supplyChainAgentData.persona.identity}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-semibold text-slate-50 mb-4">Karakteristik</h3>
                <ul className="space-y-2">
                  {supplyChainAgentData.persona.characteristics.map((char, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      {char}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-semibold text-slate-50 mb-4">Keahlian Inti</h3>
                <ul className="space-y-2">
                  {supplyChainAgentData.persona.expertise.map((exp, idx) => (
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
                {supplyChainAgentData.persona.decisionPattern.split(" → ").map((step, idx) => (
                  <span key={idx}>
                    <span className="px-3 py-1 bg-slate-700 rounded-lg text-slate-300 text-sm">{step}</span>
                    {idx < supplyChainAgentData.persona.decisionPattern.split(" → ").length - 1 && <span className="mx-2 text-slate-500">→</span>}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Nilai yang Dijaga</h3>
              <div className="flex gap-2 flex-wrap">
                {supplyChainAgentData.persona.values.map((val, idx) => (
                  <span key={idx} className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm">
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
              <p className="text-slate-300">{supplyChainAgentData.knowledgeBase.definitions}</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Sub-Ruang Lingkup</h3>
              <div className="grid grid-cols-2 gap-4">
                {supplyChainAgentData.knowledgeBase.subScopes.map((scope) => (
                  <div key={scope.id} className="bg-slate-700/50 rounded-lg p-4">
                    <h4 className="font-medium text-purple-400 mb-1">{scope.name}</h4>
                    <p className="text-sm text-slate-400">{scope.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Data Objects</h3>
              <div className="flex flex-wrap gap-2">
                {supplyChainAgentData.knowledgeBase.dataObjects.map((obj, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-700 rounded text-sm text-slate-300">
                    {obj}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Rumus Dasar</h3>
              <div className="space-y-3">
                {supplyChainAgentData.knowledgeBase.formulas.map((formula, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
                    <span className="text-slate-300 font-medium">{formula.name}</span>
                    <span className="text-purple-400 font-mono text-sm">{formula.formula}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Aturan Bisnis</h3>
              <ul className="space-y-2">
                {supplyChainAgentData.knowledgeBase.businessRules.map((rule, idx) => (
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
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Sub-Agents dalam Domain Supply Chain</h3>
            <div className="grid grid-cols-2 gap-4">
              {supplyChainAgentData.subAgents.map((agent) => (
                <div key={agent.id} className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-purple-500/50 transition-all">
                  <h4 className="font-semibold text-purple-400 mb-2">{agent.name}</h4>
                  <p className="text-sm text-slate-400">{agent.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mt-6">
              <h3 className="font-semibold text-slate-50 mb-4">Integrasi dengan Agent Lain</h3>
              <div className="space-y-3">
                {supplyChainAgentData.knowledgeBase.integrations.map((integration, idx) => (
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
                {supplyChainAgentData.escalationRules.map((rule, idx) => (
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
              {supplyChainAgentData.sampleQueries.map((item, idx) => (
                <div key={idx} className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-medium text-slate-200">{item.query}</h4>
                    </div>
                  </div>
                  <div className="ml-11 pl-3 border-l-2 border-slate-700">
                    <p className="text-sm text-slate-400">
                      <span className="text-purple-400 font-medium">Expected: </span>
                      {item.expectedOutput}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mt-6">
              <h3 className="font-semibold text-slate-50 mb-4">Pertanyaan Inti yang Harus Dijawab</h3>
              <div className="grid grid-cols-2 gap-3">
                {supplyChainAgentData.knowledgeBase.keyQuestions.map((q, idx) => (
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
