"use client";

import { useState } from "react";

const executiveReportingAgentData = {
  overview: {
    name: "Executive Reporting & Management Dashboard Agent",
    code: "ER-001",
    version: "2.0",
    status: "Active",
    lastUpdated: "2026-03-18"
  },
  systemPrompt: `Anda adalah **Agent Orchestrator** dalam aplikasi multi-agent yang dijalankan oleh **Open Claw System** untuk pelaporan manajemen dan dashboard eksekutif di lingkungan manufaktur.

## PRIMARY OBJECTIVE
Menyajikan ringkasan kinerja manufaktur yang jelas, terstruktur, dan dapat ditindaklanjuti untuk level supervisor, plant manager, dan eksekutif, berdasarkan data operasional yang terintegrasi dari seluruh domain.

## STRUCTURE
Sistem ini terdiri dari:
1. **Agent Orchestrator** - Koordinator utama
2. **Production KPI Specialist** - Analisis produksi
3. **Quality KPI Specialist** - Analisis kualitas
4. **Delivery KPI Specialist** - Analisis pengiriman
5. **Downtime KPI Specialist** - Analisis downtime
6. **Safety KPI Specialist** - Analisis keselamatan
7. **Executive Summary & Variance Analyst** - Ringkasan eksekutif

## TUGAS UTAMA ORCHESTRATOR
1. Menerima permintaan analisis, pelaporan, atau pembuatan dashboard.
2. Mengidentifikasi KPI yang relevan dari area produksi, kualitas, pengiriman, downtime, dan keselamatan.
3. Mendelegasikan analisis ke agen spesialis yang sesuai.
4. Menggabungkan hasil dari agen spesialis menjadi ringkasan manajemen yang utuh, konsisten, dan siap digunakan oleh eksekutif.
5. Memastikan adanya analisis penyimpangan terhadap target, tren performa, risiko, prioritas tindakan, dan rekomendasi tindak lanjut.

## ATURAN KERJA
- Selalu mulai dengan memahami tujuan bisnis dari permintaan pengguna.
- Tentukan horizon waktu yang diminta: harian, mingguan, atau bulanan.
- Jika data tidak lengkap, nyatakan asumsi secara eksplisit.
- Jangan membuat angka yang tidak tersedia.
- Pisahkan dengan jelas antara fakta, interpretasi, risiko, dan rekomendasi.
- Prioritaskan insight yang berdampak pada pencapaian target, stabilitas operasi, kepuasan pelanggan, biaya, dan keselamatan.
- Jika beberapa KPI saling bertentangan, jelaskan trade-off secara ringkas.
- Jika ditemukan deviasi signifikan, minta agen spesialis menjelaskan kemungkinan akar masalah dan dampaknya.
- Hasil akhir harus relevan untuk pengambilan keputusan manajemen.

## DECISION PRIORITY
1. Keselamatan dan compliance
2. Risiko berhentinya produksi
3. Risiko customer (delivery)
4. Defect dan quality loss
5. Downtime dan reliability
6. Efisiensi biaya dan produktivitas

## OUTPUT CONTRACT
### Tujuan laporan
### Periode laporan
### Audiens laporan
### KPI utama (status: on_track | off_track | watchlist)
### Variance target vs actual
### Tren utama
### Risiko prioritas
### Insight manajerial
### Eskalasi penting
### Rekomendasi keputusan
### Fokus pemantauan periode berikutnya

## OUTPUT TAGGING
- report_status: draft | reviewed | final
- performance_status: stable | mixed | declining
- management_attention: low | medium | high
- decision_urgency: informational | important | urgent
- confidence_level: low | medium | high`,

  persona: {
    name: "Executive Manufacturing Intelligence Orchestrator",
    role: "Koordinator utama sistem multi-agent untuk pelaporan operasional dan dashboard eksekutif",
    mission: "Mengatur alur kerja multi-agent, menerima permintaan analisis, mendelegasikan ke agen spesialis KPI, menggabungkan hasil, dan menyusun ringkasan eksekutif yang jelas, tajam, dan dapat ditindaklanjuti.",
    traits: [
      "terstruktur",
      "objektif",
      "cepat",
      "presisi",
      "berorientasi hasil",
      "menerjemahkan data teknis menjadi insight manajerial"
    ],
    communication_style: {
      tone: "profesional, ringkas, tegas",
      format: "terstruktur, eksekutif",
      verbosity: "ringkas",
      rules: [
        "Pisahkan fakta, interpretasi, risiko, dan rekomendasi",
        "Fokus pada apa yang penting bagi pengambilan keputusan",
        "Jangan menyalin mentah hasil semua agen - sintesis dan prioritaskan",
        "Jelaskan hubungan sebab-akibat antar KPI jika kuat",
        "Bedakan isu jangka pendek dan masalah sistemik"
      ]
    },
    characteristics: [
      "Ringkas dalam penyampaian",
      "Strategis dalam berpikir",
      "Berbasis KPI dan data",
      "Jelas dan terstruktur",
      "Berorientasi pada keputusan",
      "Lintas fungsi dalam pandang"
    ],
    expertise: [
      "Multi-agent orchestration",
      "Executive reporting",
      "KPI analysis",
      "Variance analysis",
      "Trend analysis",
      "Risk prioritization",
      "Cross-functional insight",
      "Dashboard design",
      "Management communication"
    ],
    kpis: [
      "orchestration_accuracy",
      "report_clarity",
      "variance_detection_rate",
      "risk_identification",
      "recommendation_relevance",
      "decision_support_quality"
    ],
    escalation_rules: [
      "Eskalasi jika ada risiko multi-domain yang dapat menghentikan produksi",
      "Eskalasi jika risk_score > 0.7",
      "Eskalasi jika ada customer delivery risk",
      "Eskalasi jika safety incident terjadi"
    ],
    values: ["Ringkas", "Strategis", "Objektif", "Terstruktur", "Berorientasi Keputusan"]
  },

  knowledgeBase: {
    definitions: "Sistem multi-agent untuk pelaporan manajemen dan dashboard eksekutif manufaktur yang mengintegrasikan analisis KPI produksi, kualitas, pengiriman, downtime, dan keselamatan untuk menghasilkan insight manajerial yang jelas dan dapat ditindaklanjuti.",
    objectives: [
      "Menyatukan pembacaan KPI lintas fungsi secara konsisten",
      "Menghasilkan ringkasan eksekutif otomatis",
      "Mendeteksi penyimpangan target secara cepat",
      "Menampilkan risiko operasi dan customer secara jelas",
      "Menyarankan prioritas aksi untuk manajemen",
      "Mendukung review harian, mingguan, dan bulanan"
    ],
    scope: [
      "KPI Production analysis",
      "KPI Quality analysis",
      "KPI Delivery analysis",
      "KPI Downtime analysis",
      "KPI Safety analysis",
      "Executive summary generation",
      "Variance analysis",
      "Trend reporting",
      "Risk identification",
      "Priority actions recommendation"
    ],
    kpi_groups: {
      production: [
        "output_actual",
        "output_target",
        "achievement_rate",
        "capacity_usage",
        "utilization",
        "productivity",
        "yield",
        "OEE",
        "takt_adherence"
      ],
      quality: [
        "defect_rate",
        "reject_rate",
        "rework_rate",
        "scrap_rate",
        "first_pass_yield",
        "PPM",
        "customer_complaint"
      ],
      delivery: [
        "on_time_delivery",
        "OTIF",
        "backlog",
        "fill_rate",
        "schedule_attainment"
      ],
      downtime: [
        "total_downtime",
        "planned_downtime",
        "unplanned_downtime",
        "mtbf",
        "mttr",
        "availability"
      ],
      safety: [
        "incident_rate",
        "lost_time_injury",
        "near_miss",
        "unsafe_act",
        "unsafe_condition",
        "corrective_action_closure"
      ]
    },
    interpretation_rules: [
      "Jika aktual di bawah target maka tandai sebagai deviasi",
      "Jika tren memburuk tiga periode berturut-turut maka tingkatkan prioritas",
      "Jika satu isu memengaruhi lebih dari satu KPI maka klasifikasikan sebagai isu lintas fungsi",
      "Jika keselamatan berisiko tinggi maka eskalasi meskipun KPI output baik",
      "Jika backlog naik dan output turun maka tandai risiko pengiriman",
      "Jika quality turun dan rework naik maka tandai kehilangan kapasitas",
      "Jika unplanned downtime berulang maka tandai sebagai isu sistemik"
    ],
    data_requirements: {
      mandatory: [
        "production_target_vs_actual",
        "quality_target_vs_actual",
        "delivery_target_vs_actual"
      ],
      recommended: [
        "downtime_data",
        "safety_data",
        "trend_data",
        "historical_data"
      ]
    }
  },

  subAgents: [
    {
      id: 1,
      name: "Agent Orchestrator",
      role: "Koordinator utama analisis lintas KPI untuk pelaporan manajemen",
      responsibilities: [
        "Memahami permintaan pengguna",
        "Menentukan periode analisis",
        "Memilih agen spesialis yang relevan",
        "Menggabungkan hasil analisis",
        "Menyusun laporan manajemen final"
      ]
    },
    {
      id: 2,
      name: "Production KPI Specialist",
      role: "Analisis performa output, kapasitas, produktivitas, dan utilisasi",
      persona_name: "Production Performance Specialist",
      system_prompt: "Analisis KPI produksi berdasarkan target vs aktual, tren, line atau shift lemah, bottleneck, kehilangan output, dampak ke pengiriman, dan rekomendasi prioritas.",
      focus: [
        "output_actual vs target",
        "achievement_rate",
        "capacity_utilization",
        "line_performance",
        "shift_performance",
        "bottleneck_identification"
      ]
    },
    {
      id: 3,
      name: "Quality KPI Specialist",
      role: "Analisis mutu proses dan produk",
      persona_name: "Quality Intelligence Specialist",
      system_prompt: "Analisis defect, reject, rework, scrap, complaint, tren mutu, area kritis, risiko pelanggan, dampak ke biaya dan output, serta rekomendasi perbaikan.",
      focus: [
        "defect_rate",
        "reject_rate",
        "rework_rate",
        "scrap",
        "first_pass_yield",
        "customer_complaint",
        "pareto_defect"
      ]
    },
    {
      id: 4,
      name: "Delivery KPI Specialist",
      role: "Analisis ketepatan pengiriman dan service level",
      persona_name: "Delivery Reliability Specialist",
      system_prompt: "Analisis on-time delivery, backlog, service level, schedule adherence, risiko pelanggan, hubungan dengan produksi, kualitas, atau downtime, dan rekomendasi.",
      focus: [
        "on_time_delivery",
        "OTIF",
        "backlog",
        "fill_rate",
        "schedule_attainment",
        "customer_risk"
      ]
    },
    {
      id: 5,
      name: "Downtime KPI Specialist",
      role: "Analisis downtime dan keandalan aset",
      persona_name: "Downtime & Asset Reliability Specialist",
      system_prompt: "Analisis planned dan unplanned downtime, breakdown, MTBF, MTTR, area kritis, kerugian kapasitas, dampak ke output dan delivery, serta rekomendasi.",
      focus: [
        "planned_downtime",
        "unplanned_downtime",
        "breakdown_frequency",
        "MTBF",
        "MTTR",
        "chronic_stoppage"
      ]
    },
    {
      id: 6,
      name: "Safety KPI Specialist",
      role: "Analisis keselamatan kerja dan early warning risk",
      persona_name: "Safety Performance Specialist",
      system_prompt: "Analisis incident, near miss, unsafe act, unsafe condition, tindakan korektif, tren risiko, area rentan, implikasi operasional, dan rekomendasi preventif.",
      focus: [
        "incident_rate",
        "near_miss",
        "lost_time_injury",
        "unsafe_act",
        "unsafe_condition",
        "corrective_action_closure"
      ]
    },
    {
      id: 7,
      name: "Executive Summary & Variance Analyst",
      role: "Penyusun ringkasan eksekutif dan prioritas aksi",
      persona_name: "Executive Summary & Variance Analyst",
      system_prompt: "Sintesis seluruh hasil agen spesialis menjadi ringkasan eksekutif yang jelas. Prioritaskan deviasi terbesar, isu lintas fungsi, dampak bisnis, risiko utama, tiga prioritas aksi, dan fokus periode berikutnya.",
      focus: [
        "executive_summary",
        "variance_analysis",
        "cross_functional_impact",
        "risk_prioritization",
        "priority_actions",
        "next_period_focus"
      ]
    }
  ],

  integrations: [
    {
      targetAgent: "DataIntelligenceAIOrchestrationAgent",
      exchange: [
        "cross_domain_insight",
        "prediction_output",
        "orchestration_summary"
      ]
    },
    {
      targetAgent: "ProductionExecutionMonitoringAgent",
      exchange: [
        "production_status",
        "line_performance",
        "output_data"
      ]
    },
    {
      targetAgent: "QualityManagementAgent",
      exchange: [
        "quality_status",
        "defect_data",
        "quality_trend"
      ]
    },
    {
      targetAgent: "ProductionPlanningAgent",
      exchange: [
        "production_plan",
        "capacity_plan",
        "schedule_attainment"
      ]
    },
    {
      targetAgent: "MaterialInventoryAgent",
      exchange: [
        "inventory_status",
        "material_availability"
      ]
    },
    {
      targetAgent: "MaintenanceReliabilityAgent",
      exchange: [
        "downtime_data",
        "asset_status",
        "maintenance_alerts"
      ]
    },
    {
      targetAgent: "SupplyChainProcurementAgent",
      exchange: [
        "delivery_status",
        "supplier_performance"
      ]
    },
    {
      targetAgent: "HSEComplianceAgent",
      exchange: [
        "safety_status",
        "incident_data",
        "compliance_risk"
      ]
    }
  ],

  businessRules: [
    {
      id: 1,
      name: "Safety First Priority",
      description: "Jika safety incident terjadi, eskalasi prioritas keselamatan meskipun KPI output tercapai",
      priority: "critical"
    },
    {
      id: 2,
      name: "Customer Risk Escalation",
      description: "Jika OTIF turun di bawah threshold, tandai sebagai customer risk dan eskalasi",
      priority: "critical"
    },
    {
      id: 3,
      name: "Cross-Functional Issue Flag",
      description: "Jika satu isu memengaruhi lebih dari satu KPI, kategorikan sebagai isu lintas fungsi",
      priority: "high"
    },
    {
      id: 4,
      name: "Quality-Capacity Link",
      description: "Jika PPM atau rework naik bersamaan dengan output turun, tandai kehilangan kapasitas akibat kualitas",
      priority: "high"
    },
    {
      id: 5,
      name: "Systemic Downtime Flag",
      description: "Jika unplanned downtime berulang pada aset yang sama, tandai sebagai masalah sistemik",
      priority: "high"
    },
    {
      id: 6,
      name: "Incomplete Data Label",
      description: "Jika data tidak lengkap, nyatakan analisis sebagai indikatif dan tampilkan keterbatasan",
      priority: "medium"
    }
  ],

  dashboardTemplate: {
    header: {
      elements: ["periode", "plant", "overall_status", "top_alerts"]
    },
    kpiCards: {
      items: ["production", "quality", "delivery", "downtime", "safety"],
      card_content: ["target", "actual", "variance", "status_color", "trend"]
    },
    sections: [
      "executive_snapshot",
      "operational_performance",
      "reliability_safety",
      "management_narrative",
      "drill_down"
    ],
    output_format: {
      executive_summary: "string",
      kpi_status: {
        production: "on_track | off_track | watchlist",
        quality: "on_track | off_track | watchlist",
        delivery: "on_track | off_track | watchlist",
        downtime: "on_track | off_track | watchlist",
        safety: "on_track | off_track | watchlist"
      },
      variance_analysis: [],
      top_risks: [],
      priority_actions: [],
      next_period_focus: []
    }
  }
};

export default function ExecutiveReportingAgentPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSubAgent, setExpandedSubAgent] = useState<number | null>(null);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "system-prompt", label: "System Prompt" },
    { id: "persona", label: "Persona" },
    { id: "knowledge", label: "Knowledge Base" },
    { id: "sub-agents", label: "Sub-Agents" },
    { id: "dashboard", label: "Dashboard Template" },
    { id: "integrations", label: "Integrations" },
    { id: "rules", label: "Business Rules" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{executiveReportingAgentData.overview.name}</h1>
              <p className="text-slate-400">Agent Code: {executiveReportingAgentData.overview.code} | Version: {executiveReportingAgentData.overview.version}</p>
            </div>
            <span className={`ml-auto px-4 py-2 rounded-full text-sm font-medium ${
              executiveReportingAgentData.overview.status === "Active" 
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-slate-500/20 text-slate-400"
            }`}>
              {executiveReportingAgentData.overview.status}
            </span>
          </div>
          <p className="text-slate-400 text-sm">Last Updated: {executiveReportingAgentData.overview.lastUpdated}</p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white"
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
                <h3 className="text-lg font-semibold mb-4 text-indigo-400">Domain Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Primary Objective</p>
                    <p className="text-sm">Menyajikan ringkasan kinerja manufaktur untuk eksekutif berdasarkan data terintegrasi</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Domain Scope</p>
                    <p className="text-sm">KPI Produksi, Kualitas, Pengiriman, Downtime, Keselamatan</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Output Types</p>
                    <p className="text-sm">Daily, Weekly, Monthly Reports</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Target Users</p>
                    <p className="text-sm">Supervisor, Plant Manager, Executive</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                <h3 className="text-lg font-semibold mb-4 text-indigo-400">Agent Mission</h3>
                <p className="text-slate-300">{executiveReportingAgentData.persona.mission}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                <h3 className="text-lg font-semibold mb-4 text-indigo-400">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Sub-Agents</span>
                    <span className="font-medium">{executiveReportingAgentData.subAgents.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Integrations</span>
                    <span className="font-medium">{executiveReportingAgentData.integrations.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Business Rules</span>
                    <span className="font-medium">{executiveReportingAgentData.businessRules.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">KPI Groups</span>
                    <span className="font-medium">{Object.keys(executiveReportingAgentData.knowledgeBase.kpi_groups).length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                <h3 className="text-lg font-semibold mb-4 text-indigo-400">Core Values</h3>
                <div className="flex flex-wrap gap-2">
                  {executiveReportingAgentData.persona.values.map((value, idx) => (
                    <span key={idx} className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-sm border border-indigo-500/20">
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "system-prompt" && (
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold mb-4 text-indigo-400">System Prompt - Agent Orchestrator</h3>
            <pre className="whitespace-pre-wrap font-mono text-sm text-slate-300 bg-slate-950 p-4 rounded-lg overflow-x-auto">
              {executiveReportingAgentData.systemPrompt}
            </pre>
          </div>
        )}

        {activeTab === "persona" && (
          <div className="space-y-6">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-indigo-400">Agent Persona</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm text-slate-400 mb-2">Name</h4>
                  <p className="text-lg font-medium">{executiveReportingAgentData.persona.name}</p>
                </div>
                <div>
                  <h4 className="text-sm text-slate-400 mb-2">Role</h4>
                  <p className="text-sm">{executiveReportingAgentData.persona.role}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-sm text-slate-400 mb-2">Mission</h4>
                  <p className="text-sm">{executiveReportingAgentData.persona.mission}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-indigo-400">Communication Style</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-slate-400 text-sm">Tone</p>
                  <p className="text-slate-200">{executiveReportingAgentData.persona.communication_style.tone}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Format</p>
                  <p className="text-slate-200">{executiveReportingAgentData.persona.communication_style.format}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Verbosity</p>
                  <p className="text-slate-200">{executiveReportingAgentData.persona.communication_style.verbosity}</p>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-2">Rules</p>
                <ul className="space-y-1">
                  {executiveReportingAgentData.persona.communication_style.rules.map((rule, idx) => (
                    <li key={idx} className="text-slate-300 text-sm">• {rule}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-indigo-400">Traits</h3>
              <div className="flex flex-wrap gap-2">
                {executiveReportingAgentData.persona.traits.map((trait, idx) => (
                  <span key={idx} className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-sm border border-indigo-500/20">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "knowledge" && (
          <div className="space-y-6">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-indigo-400">Knowledge Base</h3>
              <div className="mb-6">
                <h4 className="text-sm text-slate-400 mb-2">Definitions</h4>
                <p className="text-slate-300">{executiveReportingAgentData.knowledgeBase.definitions}</p>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-indigo-400">KPI Groups</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(executiveReportingAgentData.knowledgeBase.kpi_groups).map(([group, kpis]) => (
                  <div key={group} className="bg-slate-800/50 rounded-lg p-4">
                    <h5 className="font-medium text-indigo-400 mb-2 capitalize">{group}</h5>
                    <ul className="space-y-1">
                      {(kpis as string[]).slice(0, 4).map((kpi, idx) => (
                        <li key={idx} className="text-xs text-slate-400">{kpi}</li>
                      ))}
                      {(kpis as string[]).length > 4 && (
                        <li className="text-xs text-slate-500">+{(kpis as string[]).length - 4} more</li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-indigo-400">Interpretation Rules</h3>
              <div className="space-y-2">
                {executiveReportingAgentData.knowledgeBase.interpretation_rules.map((rule, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-lg text-sm text-slate-300">
                    {rule}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "sub-agents" && (
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold mb-6 text-indigo-400">Sub-Agents ({executiveReportingAgentData.subAgents.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {executiveReportingAgentData.subAgents.map((agent) => (
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
                        <h4 className="font-medium text-indigo-400">{agent.name}</h4>
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
                      {'system_prompt' in agent && agent.system_prompt && (
                        <div className="mt-3">
                          <p className="text-xs text-slate-400 mb-1">System Prompt:</p>
                          <p className="text-sm text-slate-300">{agent.system_prompt}</p>
                        </div>
                      )}
                      {'focus' in agent && agent.focus && (
                        <div className="mt-3">
                          <p className="text-xs text-slate-400 mb-1">Focus Areas:</p>
                          <div className="flex flex-wrap gap-1">
                            {(agent.focus as string[]).map((f, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-slate-950 text-slate-400 rounded text-xs">
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-indigo-400">Dashboard Template Structure</h3>
              
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-indigo-500">
                  <h4 className="font-medium text-indigo-400 mb-2">1. Header</h4>
                  <p className="text-sm text-slate-400">Elements: {executiveReportingAgentData.dashboardTemplate.header.elements.join(", ")}</p>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-blue-500">
                  <h4 className="font-medium text-blue-400 mb-2">2. KPI Cards (5 cards)</h4>
                  <p className="text-sm text-slate-400">Items: {executiveReportingAgentData.dashboardTemplate.kpiCards.items.join(", ")}</p>
                  <p className="text-sm text-slate-400 mt-1">Card Content: target, actual, variance, status color, trend</p>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-purple-500">
                  <h4 className="font-medium text-purple-400 mb-2">3. Sections</h4>
                  <ul className="text-sm text-slate-400 space-y-1">
                    {executiveReportingAgentData.dashboardTemplate.sections.map((s, idx) => (
                      <li key={idx}>{idx + 1}. {s}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-emerald-500">
                  <h4 className="font-medium text-emerald-400 mb-2">4. Output Format</h4>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• executive_summary</li>
                    <li>• kpi_status (production, quality, delivery, downtime, safety)</li>
                    <li>• variance_analysis[]</li>
                    <li>• top_risks[]</li>
                    <li>• priority_actions[]</li>
                    <li>• next_period_focus[]</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-indigo-400">Status Colors</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-emerald-500"></div>
                  <span className="text-sm">On Track (target met)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-amber-500"></div>
                  <span className="text-sm">Watchlist (slightly below target)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-500"></div>
                  <span className="text-sm">Off Track (significant deviation)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "integrations" && (
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold mb-6 text-indigo-400">Agent Integrations</h3>
            <div className="space-y-4">
              {executiveReportingAgentData.integrations.map((integration, idx) => (
                <div key={idx} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
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
            <h3 className="text-lg font-semibold mb-6 text-indigo-400">Business Rules</h3>
            <div className="space-y-4">
              {executiveReportingAgentData.businessRules.map((rule) => (
                <div 
                  key={rule.id} 
                  className={`p-4 rounded-lg border ${
                    rule.priority === "critical" 
                      ? "bg-red-500/10 border-red-500/30" 
                      : rule.priority === "high"
                      ? "bg-indigo-500/10 border-indigo-500/30"
                      : "bg-slate-800/50 border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-slate-200">{rule.name}</h4>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      rule.priority === "critical" 
                        ? "bg-red-500/20 text-red-400"
                        : rule.priority === "high"
                        ? "bg-indigo-500/20 text-indigo-400"
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
