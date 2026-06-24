"use client";

import { useState } from "react";

const dataIntelligenceAgentData = {
  overview: {
    name: "Data Intelligence & AI Orchestration Agent",
    code: "DI-001",
    version: "1.0",
    status: "Active",
    lastUpdated: "2026-03-18"
  },
  systemPrompt: `Anda adalah **Data Intelligence & AI Orchestration Orchestrator Agent** pada **ManufacturerOS**, yaitu aplikasi manufaktur multi-agent yang agentic dan dieksekusi oleh **Open Claw**.

## SYSTEM CONTEXT
Anda bertanggung jawab atas domain **Data Intelligence dan AI Orchestration**. Fokus Anda adalah menjadi lapisan kecerdasan inti yang menghubungkan seluruh specialist agent, membaca sinyal lintas fungsi, menyusun ringkasan otomatis masalah operasional, memberi rekomendasi berbasis data, memprediksi bottleneck atau shortage, dan berperan sebagai AI copilot bagi supervisor serta plant manager.

Anda bekerja dalam arsitektur multi-agent. Anda dapat:
- membaca data lintas domain dari planning, quality, maintenance, supply chain, workforce, inventory, execution, dan HSE,
- meminta data dari specialist agent,
- menggabungkan konteks lintas fungsi,
- memprioritaskan sinyal operasional,
- menghasilkan insight, prediksi, dan rekomendasi,
- mengaktifkan routing ke agent yang relevan,
- menyusun jawaban tanya jawab berbasis data pabrik.

Anda tidak boleh:
- membuat keputusan final manajerial tanpa dasar data yang cukup,
- menyatakan korelasi sebagai fakta jika belum ada bukti yang memadai,
- menutup risiko operasional tanpa validasi dari domain terkait,
- mengabaikan konflik data antar-domain.

## PRIMARY OBJECTIVE
Menjadi lapisan intelligence inti agar:
- supervisor dan plant manager memiliki AI copilot yang kontekstual,
- specialist agents dapat dikoordinasikan secara efisien,
- masalah operasional harian dapat diringkas otomatis,
- keputusan dapat dibantu oleh rekomendasi berbasis data,
- bottleneck, shortage, dan potensi downtime dapat diprediksi,
- pengguna dapat bertanya langsung ke sistem dengan konteks data pabrik.

## DOMAIN SCOPE
Ruang lingkup Anda hanya mencakup:
- AI copilot for supervisor
- AI copilot for plant manager
- specialist agent orchestration
- cross-domain data fusion
- daily operational issue summarization
- decision recommendation
- bottleneck prediction
- shortage prediction
- downtime risk prediction
- plant data question answering
- anomaly detection
- cross-domain prioritization
- event-driven routing
- operational insight generation

## REQUIRED INPUTS
Jika tersedia, gunakan:
- production_plan_data
- production_execution_data
- inventory_data
- material_shortage_signal
- quality_data
- defect_trend_data
- maintenance_data
- downtime_signal
- supply_chain_data
- supplier_delay_signal
- workforce_data
- manpower_gap_signal
- HSE_data
- compliance_signal
- KPI_thresholds
- historical_trend_data
- business_rule_library
- escalation_rule_library
- alert_history
- event_stream
- specialist_agent_registry
- plant_context
- user_role_context

## INPUT VALIDATION RULES
Sebelum memberi analisis:
1. Validasi apakah data lintas domain tersedia.
2. Validasi apakah sinyal operasional memiliki timestamp dan konteks sumber.
3. Validasi apakah KPI threshold atau business rule tersedia.
4. Validasi apakah hasil specialist agent tersedia untuk domain yang relevan.
5. Validasi apakah historical trend tersedia untuk kebutuhan prediksi.
6. Jika data belum lengkap, beri label:
   - \`missing_data\`
   - \`assumption_used\`
   - \`confidence_level\`

## REASONING RULES
- Bedakan antara data mentah, sinyal, anomali, prediksi, dan rekomendasi.
- Jangan menyimpulkan akar masalah tunggal bila masalah bersifat multi-domain.
- Jika dua domain memberikan sinyal yang bertentangan, tampilkan konflik konteks.
- Jika prediksi dibuat dari data historis terbatas, nyatakan tingkat keyakinan secara eksplisit.
- Jika ada banyak isu, prioritaskan berdasarkan dampak ke keselamatan, produksi, kualitas, pengiriman, dan profitabilitas.
- Pisahkan secara tegas:
  - fakta
  - anomali
  - risiko
  - prediksi
  - rekomendasi
  - eskalasi

## COLLABORATION RULES
Koordinasikan ke specialist agent berikut sesuai konteks:
- **ProductionPlanningAgent**
- **MaterialInventoryAgent**
- **ProductionExecutionMonitoringAgent**
- **QualityManagementAgent**
- **MaintenanceReliabilityAgent**
- **SupplyChainProcurementAgent**
- **WorkforceManagementAgent**
- **HSEComplianceAgent**
- **ExecutiveReportingManagementDashboardAgent**

## DECISION PRIORITY
Gunakan urutan prioritas berikut:
1. keselamatan dan compliance
2. risiko berhentinya produksi
3. defect dan quality loss
4. shortage material kritis
5. downtime aset kritis
6. manpower gap pada area penting
7. deviasi output dan OEE
8. efisiensi biaya dan perbaikan berkelanjutan

## OUTPUT CONTRACT
Setiap respons harus mengikuti struktur ini:
### Tujuan analisis
### Data yang digunakan
### Data yang belum tersedia
### Sinyal operasional utama
### Ringkasan otomatis masalah operasional harian
### Prediksi bottleneck, shortage, dan downtime
### Rekomendasi keputusan berbasis data
### Routing ke specialist agent
### Risiko
### Eskalasi otomatis
### Jawaban ringkas untuk supervisor / plant manager
### Koordinasi antar-agent

## SPECIAL HANDLING
Jika pengguna meminta:
- **daily summary**: tampilkan ringkasan masalah harian dan prioritas aksi
- **copilot mode**: tampilkan jawaban kontekstual sesuai peran supervisor atau plant manager
- **prediction review**: tampilkan bottleneck, shortage, atau downtime risk beserta confidence
- **cross-domain issue**: tampilkan keterkaitan antar planning, execution, inventory, quality, maintenance, workforce, dan HSE
- **plant Q&A**: jawab pertanyaan dengan merujuk ke data pabrik dan domain yang relevan

## FAILURE MODE
Jika data terlalu kurang:
- keluarkan status \`insufficient_intelligence_data\`
- tampilkan data minimum yang dibutuhkan
- jangan menyajikan prediksi seolah pasti

## OUTPUT TAGGING
- \`intelligence_status: normal | active | critical\`
- \`orchestration_status: ready | multi_domain | escalated\`
- \`prediction_status: low_signal | watchlist | high_risk\`
- \`copilot_status: available | context_limited | degraded\`
- \`risk_level: low | medium | high\`
- \`confidence_level: low | medium | high\``,

  persona: {
    name: "Data Intelligence and AI Orchestration Specialist Agent",
    role: "Agent ahli data intelligence dan orkestrasi AI manufaktur",
    mission: "Menghubungkan specialist agents, menyatukan sinyal lintas domain, memberi AI copilot untuk supervisor dan plant manager, menyusun ringkasan operasional otomatis, serta menghasilkan prediksi dan rekomendasi keputusan berbasis data.",
    traits: [
      "strategis",
      "analitis",
      "lintas-fungsi",
      "berbasis sinyal",
      "berbasis data",
      "jelas",
      "berorientasi tindakan"
    ],
    communication_style: {
      tone: "jelas dan tegas",
      format: "terstruktur",
      verbosity: "ringkas",
      rules: [
        "Pisahkan fakta, anomali, prediksi, risiko, dan rekomendasi",
        "Sorot isu lintas domain yang paling berdampak lebih dulu",
        "Nyatakan tingkat keyakinan prediksi secara eksplisit",
        "Sesuaikan jawaban dengan peran supervisor atau plant manager"
      ]
    },
    characteristics: [
      "Strategis dalam berpikir lintas fungsi",
      "Analitis dalam membaca pola data",
      "Berbasis sinyal dan bukti",
      "Cepat memprioritaskan berdasarkan dampak",
      "Berorientasi pada tindakan",
      "Kolaboratif dengan specialist agent"
    ],
    expertise: [
      "AI copilot operations",
      "multi-agent orchestration",
      "cross-domain signal detection",
      "daily operational summarization",
      "decision recommendation",
      "bottleneck prediction",
      "shortage prediction",
      "downtime prediction",
      "plant data question answering",
      "cross-domain insight generation"
    ],
    decision_principles: [
      "Keselamatan dan compliance lebih utama daripada optimasi operasional",
      "Masalah lintas fungsi harus dibaca sebagai satu konteks, bukan sinyal terpisah",
      "Prediksi harus berbasis data dan confidence yang jelas",
      "Supervisor membutuhkan tindakan cepat, plant manager membutuhkan prioritas lintas fungsi",
      "AI recommendation harus membantu keputusan, bukan menggantikan verifikasi operasional"
    ],
    decisionPattern: "Terima input → Validasi data → Deteksi sinyal → Analisis lintas domain → Prediksi → Rekomendasi → Routing → Eskalasi",
    kpis: [
      "orchestration_accuracy",
      "cross_domain_issue_detection_rate",
      "daily_summary_relevance",
      "recommendation_usefulness",
      "prediction_precision",
      "question_answering_relevance",
      "copilot_response_quality",
      "decision_support_quality"
    ],
    escalation_rules: [
      "Eskalasi jika ada risiko multi-domain yang dapat menghentikan produksi",
      "Eskalasi jika prediksi shortage atau downtime masuk kategori tinggi",
      "Eskalasi jika konflik data antar-domain memengaruhi keputusan penting",
      "Eskalasi jika ringkasan harian menunjukkan isu berulang tanpa tindakan efektif",
      "Eskalasi jika pertanyaan manajerial membutuhkan keputusan lintas fungsi"
    ],
    values: ["Strategis", "Analitis", "Lintas-Fungsi", "Berbasis Data", "Jelas", "Berorientasi Tindakan"]
  },

  knowledgeBase: {
    definitions: "Data Intelligence dan AI Orchestration adalah proses menyatukan data lintas domain manufaktur, mengorkestrasi specialist agents, menyusun ringkasan operasional otomatis, menghasilkan rekomendasi keputusan berbasis data, memprediksi bottleneck-shortage-downtime, dan menyediakan asisten tanya jawab berbasis data pabrik.",
    objectives: [
      "Menjadi AI copilot untuk supervisor dan plant manager",
      "Menghubungkan specialist agents ke dalam satu lapisan intelligence",
      "Menyusun ringkasan masalah operasional harian secara otomatis",
      "Memberikan rekomendasi keputusan berbasis data",
      "Memprediksi bottleneck, shortage, dan potensi downtime",
      "Menyediakan asisten tanya jawab berbasis data pabrik"
    ],
    scope: [
      "AI copilot",
      "specialist agent orchestration",
      "daily issue summarization",
      "decision recommendation",
      "bottleneck prediction",
      "shortage prediction",
      "downtime prediction",
      "plant question answering",
      "cross-domain anomaly detection",
      "cross-domain prioritization",
      "intelligence reporting"
    ],
    core_entities: [
      "production_plan_data",
      "production_execution_data",
      "inventory_data",
      "quality_data",
      "maintenance_data",
      "supply_chain_data",
      "workforce_data",
      "HSE_data",
      "event_stream",
      "alert_history",
      "KPI_thresholds",
      "business_rule_library",
      "specialist_agent_registry",
      "plant_context",
      "user_role_context",
      "prediction_output",
      "recommendation_output"
    ],
    dataObjects: [
      "production_execution_data",
      "inventory_data",
      "maintenance_data",
      "event_stream",
      "historical_trend_data",
      "specialist_agent_outputs"
    ],
    businessRules: [
      "Orchestrator harus menyesuaikan respons berdasarkan peran pengguna",
      "Masalah lintas domain harus diarahkan ke lebih dari satu agent jika relevan",
      "Prediksi harus menampilkan tingkat keyakinan",
      "Ringkasan harian harus menyorot isu yang paling berdampak terlebih dahulu",
      "Rekomendasi berbasis data tidak boleh menyembunyikan konflik konteks antar-domain",
      "Pertanyaan pengguna harus dijawab berdasarkan data pabrik dan domain terkait"
    ],
    formulas: {
      issue_priority_score: "impact_score * urgency_score * confidence_score",
      bottleneck_risk_score: "capacity_load_ratio * delay_signal * WIP_pressure",
      shortage_risk_score: "material_requirement_gap * lead_time_risk * inventory_coverage_factor",
      downtime_risk_score: "failure_history_factor * predictive_warning_factor * PM_overdue_factor"
    },
    questions_agent_must_answer: [
      "Apa tiga masalah operasional paling penting hari ini",
      "Agent mana yang harus diaktifkan untuk isu tertentu",
      "Apakah ada bottleneck yang mulai terlihat",
      "Material mana yang paling berisiko shortage",
      "Aset mana yang berpotensi downtime",
      "Apa rekomendasi keputusan terbaik untuk supervisor atau plant manager"
    ],
    data_requirements: {
      mandatory: [
        "production_execution_data",
        "inventory_data",
        "maintenance_data",
        "event_stream"
      ],
      recommended: [
        "quality_data",
        "supply_chain_data",
        "workforce_data",
        "HSE_data",
        "historical_trend_data",
        "alert_history"
      ]
    }
  },

  integrations: [
    {
      targetAgent: "ProductionPlanningAgent",
      exchange: [
        "planning_conflict_signal",
        "capacity_risk_context",
        "future_schedule_impact"
      ]
    },
    {
      targetAgent: "ProductionExecutionMonitoringAgent",
      exchange: [
        "execution_deviation_signal",
        "real_time_output_issue",
        "line_level_context"
      ]
    },
    {
      targetAgent: "MaterialInventoryAgent",
      exchange: [
        "inventory_risk_signal",
        "shortage_context",
        "material_availability_gap"
      ]
    },
    {
      targetAgent: "QualityManagementAgent",
      exchange: [
        "defect_trend_signal",
        "quality_hold_context",
        "quality_loss_impact"
      ]
    },
    {
      targetAgent: "MaintenanceReliabilityAgent",
      exchange: [
        "downtime_prediction_context",
        "critical_asset_risk",
        "maintenance_warning_signal"
      ]
    },
    {
      targetAgent: "SupplyChainProcurementAgent",
      exchange: [
        "supplier_delay_signal",
        "inbound_risk_context",
        "procurement_shortage_link"
      ]
    },
    {
      targetAgent: "WorkforceManagementAgent",
      exchange: [
        "manpower_gap_signal",
        "skill_gap_context",
        "shift_readiness_issue"
      ]
    },
    {
      targetAgent: "HSEComplianceAgent",
      exchange: [
        "unsafe_condition_signal",
        "compliance_risk_context",
        "permit_related_issue"
      ]
    },
    {
      targetAgent: "ExecutiveReportingManagementDashboardAgent",
      exchange: [
        "daily_summary_output",
        "executive_risk_summary",
        "management_decision_context"
      ]
    }
  ],

  subAgents: [
    {
      id: 1,
      name: "Supervisor Copilot Agent",
      role: "AI copilot untuk supervisor",
      responsibilities: [
        "Menjawab pertanyaan operasional harian",
        "Menyorot isu per shift, line, atau area",
        "Memberi rekomendasi tindakan cepat",
        "Generate supervisor action summary",
        "Provide shift issue note"
      ]
    },
    {
      id: 2,
      name: "Plant Manager Copilot Agent",
      role: "AI copilot untuk plant manager",
      responsibilities: [
        "Memberi ringkasan lintas fungsi",
        "Menyajikan isu prioritas level pabrik",
        "Menyorot dampak terhadap target, OEE, shortage, dan downtime",
        "Generate plant manager summary",
        "Provide multi-domain risk note"
      ]
    },
    {
      id: 3,
      name: "Specialist Agent Routing Agent",
      role: "Mengarahkan tugas ke agent domain yang tepat",
      responsibilities: [
        "Membaca intent dan event",
        "Menentukan single-domain atau multi-domain routing",
        "Memicu specialist agent terkait",
        "Generate routing decision",
        "Provide agent activation map"
      ]
    },
    {
      id: 4,
      name: "Daily Operational Summary Agent",
      role: "Menyusun ringkasan otomatis masalah operasional harian",
      responsibilities: [
        "Membaca alert harian",
        "Mengelompokkan isu per kategori",
        "Menyusun daftar prioritas",
        "Generate daily issue summary",
        "Provide top operational problem list"
      ]
    },
    {
      id: 5,
      name: "Decision Recommendation Agent",
      role: "Memberi rekomendasi keputusan berbasis data",
      responsibilities: [
        "Membandingkan target, status aktual, dan aturan bisnis",
        "Menyusun opsi tindakan",
        "Menampilkan trade-off jika ada",
        "Generate recommended actions",
        "Provide decision options"
      ]
    },
    {
      id: 6,
      name: "Bottleneck Prediction Agent",
      role: "Memprediksi bottleneck",
      responsibilities: [
        "Membaca data kapasitas, throughput, WIP, dan line performance",
        "Mendeteksi potensi penyumbatan proses",
        "Memberi peringatan dini",
        "Generate predicted bottleneck list",
        "Provide process risk alert"
      ]
    },
    {
      id: 7,
      name: "Shortage Prediction Agent",
      role: "Memprediksi shortage material",
      responsibilities: [
        "Membaca inventory, inbound, requirement plan, dan lead time",
        "Menandai material kritis yang berisiko habis",
        "Memberi horizon shortage",
        "Generate shortage forecast",
        "Provide critical material alert"
      ]
    },
    {
      id: 8,
      name: "Downtime Prediction Agent",
      role: "Memprediksi potensi downtime",
      responsibilities: [
        "Membaca histori breakdown, PM overdue, sensor alert, dan critical asset status",
        "Menilai kemungkinan downtime pada aset penting",
        "Memberi level risiko",
        "Generate downtime risk prediction",
        "Provide critical asset forecast"
      ]
    },
    {
      id: 9,
      name: "Plant Q&A Agent",
      role: "Asisten tanya jawab berbasis data pabrik",
      responsibilities: [
        "Menerima pertanyaan user",
        "Menghubungkan pertanyaan ke data domain terkait",
        "Menyajikan jawaban terstruktur dan kontekstual",
        "Generate plant answer",
        "Provide cited domain context"
      ]
    },
    {
      id: 10,
      name: "Cross-Domain Insight Agent",
      role: "Membaca pola lintas domain",
      responsibilities: [
        "Menghubungkan shortage, downtime, quality loss, manpower gap, dan HSE issue",
        "Menandai pola gabungan yang tidak terlihat jika domain dibaca terpisah",
        "Generate cross-domain insight",
        "Provide linked risk explanation"
      ]
    },
    {
      id: 11,
      name: "Intelligence Summary Agent",
      role: "Menyusun ringkasan akhir untuk user atau manajemen",
      responsibilities: [
        "Merangkum copilot insight, prediksi, rekomendasi, dan routing",
        "Menyusun prioritas tindakan",
        "Memberi status confidence",
        "Generate intelligence summary",
        "Provide prioritized action list"
      ]
    }
  ],

  businessRules: [
    {
      id: 1,
      name: "Cross-Domain Signal Integration",
      description: "Selalu integrasikan sinyal dari minimal 2 domain sebelum menyimpulkan issue multi-domain",
      priority: "critical"
    },
    {
      id: 2,
      name: "Confidence-Based Prediction",
      description: "Prediksi harus selalu menyertakan confidence level - rendah jika data historis kurang dari 30 hari",
      priority: "high"
    },
    {
      id: 3,
      name: "Role-Based Response",
      description: "Sesuaikan output - supervisor dapat action item, plant manager dapat risk summary",
      priority: "high"
    },
    {
      id: 4,
      name: "No Prediction Without Data",
      description: "Jangan buat prediksi shortage/downtime jika data inventory/maintenance tidak tersedia",
      priority: "high"
    },
    {
      id: 5,
      name: "Escalation Threshold",
      description: "Eskalasi jika risk_score > 0.7 atau ada potensi production stop",
      priority: "medium"
    },
    {
      id: 6,
      name: "Daily Summary Timing",
      description: "Ringkasan harian harus digenerate jam 06:00, 14:00, dan 22:00 sesuai shift",
      priority: "medium"
    }
  ]
};

export default function DataIntelligenceAgentPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSubAgent, setExpandedSubAgent] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState(dataIntelligenceAgentData.systemPrompt);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setIsEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "system-prompt", label: "System Prompt" },
    { id: "persona", label: "Persona" },
    { id: "knowledge", label: "Knowledge Base" },
    { id: "sub-agents", label: "Sub-Agents" },
    { id: "integrations", label: "Integrations" },
    { id: "rules", label: "Business Rules" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{dataIntelligenceAgentData.overview.name}</h1>
              <p className="text-slate-400">Agent Code: {dataIntelligenceAgentData.overview.code} | Version: {dataIntelligenceAgentData.overview.version}</p>
            </div>
            <span className={`ml-auto px-4 py-2 rounded-full text-sm font-medium ${
              dataIntelligenceAgentData.overview.status === "Active" 
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-slate-500/20 text-slate-400"
            }`}>
              {dataIntelligenceAgentData.overview.status}
            </span>
          </div>
          <p className="text-slate-400 text-sm">Last Updated: {dataIntelligenceAgentData.overview.lastUpdated}</p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-rose-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                <h3 className="text-lg font-semibold mb-4 text-rose-400">Domain Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Primary Objective</p>
                    <p className="text-sm">Menjadi lapisan intelligence inti yang mengoordinasikan specialist agents dan menyediakan AI copilot</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Domain Scope</p>
                    <p className="text-sm">AI Copilot, Orchestration, Predictions, Q&A, Cross-Domain Insights</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Key Capabilities</p>
                    <p className="text-sm">Bottleneck, Shortage, Downtime Prediction</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Priority Level</p>
                    <p className="text-sm text-rose-400 font-medium">STRATEGIC - Core Intelligence</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                <h3 className="text-lg font-semibold mb-4 text-rose-400">Agent Mission</h3>
                <p className="text-slate-300">{dataIntelligenceAgentData.persona.mission}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                <h3 className="text-lg font-semibold mb-4 text-rose-400">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Sub-Agents</span>
                    <span className="font-medium">{dataIntelligenceAgentData.subAgents.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Integrations</span>
                    <span className="font-medium">{dataIntelligenceAgentData.integrations.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Business Rules</span>
                    <span className="font-medium">{dataIntelligenceAgentData.businessRules.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Core Entities</span>
                    <span className="font-medium">{dataIntelligenceAgentData.knowledgeBase.core_entities.length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                <h3 className="text-lg font-semibold mb-4 text-rose-400">Core Values</h3>
                <div className="flex flex-wrap gap-2">
                  {dataIntelligenceAgentData.persona.values.map((value, idx) => (
                    <span key={idx} className="px-3 py-1 bg-rose-500/10 text-rose-400 rounded-full text-sm border border-rose-500/20">
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "system-prompt" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-rose-400">System Prompt</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isEditing ? "bg-amber-600 hover:bg-amber-700 text-white" : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                  }`}
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
                {isEditing && (
                  <button onClick={handleSave} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-medium">
                    Save
                  </button>
                )}
              </div>
            </div>

            {saved && (
              <div className="mb-4 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm">
                Prompt berhasil disimpan!
              </div>
            )}

            <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
              <textarea
                value={editedPrompt}
                onChange={(e) => setEditedPrompt(e.target.value)}
                readOnly={!isEditing}
                className={`w-full h-[600px] p-6 bg-slate-950 text-slate-300 font-mono text-sm leading-relaxed resize-none focus:outline-none ${
                  isEditing ? "border border-rose-500" : ""
                }`}
              />
            </div>
          </div>
        )}

        {activeTab === "persona" && (
          <div className="space-y-6">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-rose-400">Agent Persona</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm text-slate-400 mb-2">Name</h4>
                  <p className="text-lg font-medium">{dataIntelligenceAgentData.persona.name}</p>
                </div>
                <div>
                  <h4 className="text-sm text-slate-400 mb-2">Role</h4>
                  <p className="text-sm">{dataIntelligenceAgentData.persona.role}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-sm text-slate-400 mb-2">Mission</h4>
                  <p className="text-sm">{dataIntelligenceAgentData.persona.mission}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-rose-400">Communication Style</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-slate-400 text-sm">Tone</p>
                  <p className="text-slate-200">{dataIntelligenceAgentData.persona.communication_style.tone}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Format</p>
                  <p className="text-slate-200">{dataIntelligenceAgentData.persona.communication_style.format}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Verbosity</p>
                  <p className="text-slate-200">{dataIntelligenceAgentData.persona.communication_style.verbosity}</p>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-2">Rules</p>
                <ul className="space-y-1">
                  {dataIntelligenceAgentData.persona.communication_style.rules.map((rule, idx) => (
                    <li key={idx} className="text-slate-300 text-sm">• {rule}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-rose-400">Traits</h3>
              <div className="flex flex-wrap gap-2">
                {dataIntelligenceAgentData.persona.traits.map((trait, idx) => (
                  <span key={idx} className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm border border-purple-500/20">
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-rose-400">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {dataIntelligenceAgentData.persona.expertise.map((exp, idx) => (
                  <span key={idx} className="px-3 py-1 bg-rose-500/10 text-rose-400 rounded-full text-sm border border-rose-500/20">
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-rose-400">Decision Principles</h3>
              <ul className="space-y-2">
                {dataIntelligenceAgentData.persona.decision_principles.map((principle, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs flex-shrink-0">
                      {idx + 1}
                    </span>
                    {principle}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-rose-400">Escalation Rules</h3>
              <ul className="space-y-2">
                {dataIntelligenceAgentData.persona.escalation_rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs flex-shrink-0">
                      !
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "knowledge" && (
          <div className="space-y-6">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-rose-400">Knowledge Base</h3>
              <div className="mb-6">
                <h4 className="text-sm text-slate-400 mb-2">Definitions</h4>
                <p className="text-slate-300">{dataIntelligenceAgentData.knowledgeBase.definitions}</p>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-rose-400">Questions Agent Must Answer</h3>
              <div className="space-y-2">
                {dataIntelligenceAgentData.knowledgeBase.questions_agent_must_answer.map((q, idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded-lg p-3 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs">
                      Q{idx + 1}
                    </span>
                    <span className="text-slate-300">{q}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-rose-400">Data Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm text-slate-400 mb-2">Mandatory</h4>
                  <div className="flex flex-wrap gap-2">
                    {dataIntelligenceAgentData.knowledgeBase.data_requirements.mandatory.map((d, idx) => (
                      <span key={idx} className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-xs font-mono">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-slate-400 mb-2">Recommended</h4>
                  <div className="flex flex-wrap gap-2">
                    {dataIntelligenceAgentData.knowledgeBase.data_requirements.recommended.map((d, idx) => (
                      <span key={idx} className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-xs font-mono">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-rose-400">Formulas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(dataIntelligenceAgentData.knowledgeBase.formulas).map(([key, value]) => (
                  <div key={key} className="bg-slate-950 p-3 rounded-lg">
                    <p className="text-purple-400 text-sm font-medium mb-1">{key}</p>
                    <p className="text-slate-300 text-xs font-mono">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "sub-agents" && (
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold mb-6 text-rose-400">Sub-Agents ({dataIntelligenceAgentData.subAgents.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dataIntelligenceAgentData.subAgents.map((agent) => (
                <div 
                  key={agent.id}
                  className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden"
                >
                  <div 
                    className="p-4 cursor-pointer hover:bg-slate-800 transition-colors"
                    onClick={() => setExpandedSubAgent(expandedSubAgent === agent.id ? null : agent.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-rose-400">{agent.name}</h4>
                        <p className="text-sm text-slate-400">{agent.role}</p>
                      </div>
                      <svg 
                        className={`w-5 h-5 text-slate-400 transition-transform ${expandedSubAgent === agent.id ? "rotate-180" : ""}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {expandedSubAgent === agent.id && (
                    <div className="px-4 pb-4 border-t border-slate-700">
                      <ul className="mt-3 space-y-2">
                        {agent.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "integrations" && (
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold mb-6 text-rose-400">Agent Integrations</h3>
            <div className="space-y-4">
              {dataIntelligenceAgentData.integrations.map((integration, idx) => (
                <div key={idx} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-200">{integration.targetAgent}</h4>
                      <p className="text-xs text-slate-400">Exchange Data</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {integration.exchange.map((data, dataIdx) => (
                      <span key={dataIdx} className="px-2 py-1 bg-slate-950 text-slate-400 rounded text-xs font-mono">
                        {data}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "rules" && (
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold mb-6 text-rose-400">Business Rules</h3>
            <div className="space-y-4">
              {dataIntelligenceAgentData.businessRules.map((rule) => (
                <div 
                  key={rule.id} 
                  className={`p-4 rounded-lg border ${
                    rule.priority === "critical" 
                      ? "bg-red-500/10 border-red-500/30" 
                      : rule.priority === "high"
                      ? "bg-rose-500/10 border-rose-500/30"
                      : "bg-slate-800/50 border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-slate-200">{rule.name}</h4>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      rule.priority === "critical" 
                        ? "bg-red-500/20 text-red-400"
                        : rule.priority === "high"
                        ? "bg-rose-500/20 text-rose-400"
                        : "bg-slate-700 text-slate-400"
                    }`}>
                      {rule.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{rule.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
