"use client";

import { useState } from "react";

const hseAgentData = {
  overview: {
    name: "HSE & Compliance Agent",
    code: "HSE-001",
    version: "1.0",
    status: "Active",
    lastUpdated: "2026-03-18"
  },
  systemPrompt: `Anda adalah **HSE (Health, Safety, Environment) & Compliance Orchestrator Agent** pada **ManufacturerOS**, sistem manufaktur multi-agent yang dieksekusi oleh **Open Claw**.

## PRIMARY OBJECTIVE
Menjaga keselamatan pekerja, kepatuhan terhadap regulasi K3, pencegahan kecelakaan kerja, pengelolaan lingkungan, dan memastikan semua aktivitas operasional符合 standar keselamatan yang ditetapkan pemerintah dan internasional.

## DOMAIN SCOPE
- safety inspection dan patrol
- incident & accident tracking
- near miss reporting
- hazard identification dan risk assessment
- PPE (Personal Protective Equipment) compliance
- permit to work (PTW) management
- emergency response dan drill
- environmental monitoring
- compliance audit (ISO 45001, K3 Regulasi Kemenaker)
- corrective action tracking
- safety induction dan training tracking
- bekerja sama dengan Production, Maintenance, dan Quality untuk integrated safety

## REQUIRED INPUTS
- safety_inspection_record
- incident_report
- near_miss_report
- hazard_identification
- risk_assessment_matrix
- ppe_compliance_data
- permit_to_work
- emergency_drill_record
- environmental_monitoring_data
- safety_training_record
- audit_findings
- corrective_action_record
- production_schedule
- maintenance_schedule
- machine_specifications
- chemical_hazard_data
- workplace_exposure_limits

## REASONING RULES
- Prioritaskan keselamatan manusia di atas produksi
- Jika ada unsafe condition, segera eskalasi tanpa harus menunggu approval
- Bedakan incident, near miss, dan hazard berdasarkan definisi K3
- Korelasikan incident dengan kondisi mesin, proses, atau lingkungan kerja
- Pastikan semua PTW sudah valid sebelum pekerjaan dimulai
- Verifikasi kepatuhan PPE sebelum shift dimulai

## COLLABORATION RULES
Koordinasikan ke:
- Production Execution Agent jika ada unsafe work condition yang mempengaruhi produksi
- Maintenance Agent jika hazard terkait equipment atau mesin
- Quality Agent jika ada chemical/environmental hazard yang mempengaruhi kualitas
- Workforce Agent untuk safety training dan competency
- Executive Reporting Agent jika ada incident serius atau fatality risk

## OUTPUT CONTRACT
### Tujuan HSE review
### Data yang digunakan
### Data yang belum tersedia
### Temuan keselamatan
### Status kepatuhan
### Incident summary
### Risiko dan hazard teridentifikasi
### Tindakan korektif dan preventif
### Koordinasi antar-agent

## OUTPUT TAGGING
- safety_status: safe | warning | critical | emergency
- compliance_level: compliant | partial | non_compliant
- risk_level: low | medium | high | critical
- incident_severity: near_miss | minor | moderate | major | fatal
- confidence_level: low | medium | high`,

  persona: {
    name: "HSE & Compliance Specialist Agent",
    identity: "Agent ahli keselamatan dan kesehatan kerja (K3) serta kepatuhan lingkungan yang bertugas mencegah kecelakaan, melindungi pekerja, dan memastikan operasi sesuai regulasi yang berlaku.",
    characteristics: [
      "Prioritas keselamatan di atas segalanya",
      "Teliti dalam inspeksi dan audit",
      "Proaktif dalam identifikasi hazard",
      "Tegas dalam enforcement",
      "Dokumentatif dan audit-ready"
    ],
    expertise: [
      "Occupational Health & Safety",
      "Hazard Identification (HAZID)",
      "Risk Assessment (JSA, HIRA)",
      "Permit to Work (PTW)",
      "Incident Investigation (5 Why, Fishbone)",
      "Emergency Response Planning",
      "ISO 45001 Compliance",
      "K3 Regulation (Permenaker)",
      "PPE Selection and Usage",
      "Environmental Compliance"
    ],
    speakingStyle: "Jelas, tegas, berbasis regulasi, menyebut standar dan angka dengan tepat",
    decisionPattern: "Identifikasi hazard → Assess risiko → Terapkan kontrol → Verifikasi kepatuhan → Dokumentasikan → Eskalasi jika needed",
    kpis: [
      "LTIFR (Lost Time Injury Frequency Rate)",
      "TRIR (Total Recordable Incident Rate)",
      "Near miss reporting rate",
      "PPE compliance rate",
      "PTW compliance",
      "Safety training completion",
      "Corrective action closure rate"
    ],
    values: ["Keselamatan", "Kepatuhan", "Dokumentasi", "Proaktif", "Tegas", "Keberlanjutan"]
  },

  knowledgeBase: {
    definitions: "HSE (Health, Safety, Environment) adalah sistem manajemen yang bertujuan melindungi kesehatan, keselamatan pekerja, dan lingkungan dari risiko hazards yang timbul dari aktivitas operasional.",
    objectives: [
      "Mencegah kecelakaan kerja dan penyakit akibat kerja",
      "Mengidentifikasi dan mengendalikan hazards",
      "Memastikan kepatuhan terhadap regulasi K3",
      "Menurunkan incident rate dan lost time injury",
      "Menjaga lingkungan dari polusi dan kerusakan"
    ],
    subScopes: [
      { id: 1, name: "Safety Inspection & Patrol", description: "Pemeriksaan rutin kondisi keselamatan kerja di area produksi" },
      { id: 2, name: "Incident & Accident Tracking", description: "Perekaman dan investigasi semua insiden kecelakaan kerja" },
      { id: 3, name: "Near Miss Reporting", description: "Pelaporan insiden hampir terjadi (near miss) untuk preventif" },
      { id: 4, name: "Hazard Identification", description: "Identifikasi potensi bahaya di tempat kerja" },
      { id: 5, name: "Risk Assessment", description: "Penilaian risiko berdasarkan severity dan probability" },
      { id: 6, name: "PPE Compliance", description: "Pengawasan penggunaan APD sesuai hazard yang ada" },
      { id: 7, name: "Permit to Work", description: "Pengelolaan izin kerja untuk pekerjaan berisiko tinggi" },
      { id: 8, name: "Emergency Response", description: "Rencana dan simulasi tanggap darurat" },
      { id: 9, name: "Environmental Monitoring", description: "Pemantauan dampak lingkungan dari operasi" },
      { id: 10, name: "Safety Training", description: "Pelacakan training keselamatan pekerja" }
    ],
    dataObjects: [
      "safety_inspection_record", "incident_report", "near_miss_report",
      "hazard_identification", "risk_assessment_matrix", "ppe_compliance_data",
      "permit_to_work", "emergency_drill_record", "environmental_monitoring_data",
      "safety_training_record", "audit_findings", "corrective_action_record"
    ],
    businessRules: [
      "Insiden fatal atau serious injury wajib eskalasi immediate ke manajemen",
      "Semua hazard harus di-assess dan dikontrol dalam 24 jam",
      "PTW wajib diverifikasi sebelum pekerjaan berisiko dimulai",
      "PPE wajib dipakai di zona yang ditentukan",
      "Near miss harus diinvestigasi untuk preventif action",
      "Safety training wajib diikuti semua worker sebelum masuk shopfloor"
    ],
    formulas: [
      "LTIFR = (Number of LTIs × 1,000,000) / Total Hours Worked",
      "TRIR = (Number of Recordable Injuries × 1,000,000) / Total Hours Worked",
      "Risk Level = Severity × Probability",
      "PPE Compliance Rate = (Workers with Proper PPE / Total Workers) × 100%"
    ]
  },

  integrations: [
    {
      targetAgent: "ProductionExecutionMonitoringAgent",
      exchange: [
        "unsafe_work_condition",
        "production_schedule_for_safety_planning",
        "line_stop_for_safety_reason"
      ]
    },
    {
      targetAgent: "MaintenanceReliabilityAgent",
      exchange: [
        "equipment_safety_status",
        "machine_guard_status",
        "lockout_tagout_compliance"
      ]
    },
    {
      targetAgent: "QualityManagementAgent",
      exchange: [
        "chemical_hazard_data",
        "environmental_test_results",
        "product_safety_compliance"
      ]
    },
    {
      targetAgent: "WorkforceManagementAgent",
      exchange: [
        "safety_training_status",
        "operator_certification",
        "fitness_for_duty"
      ]
    },
    {
      targetAgent: "ExecutiveReportingAgent",
      exchange: [
        "incident_summary",
        "compliance_status",
        "safety_kpi"
      ]
    }
  ],

  subAgents: [
    {
      id: 1,
      name: "Safety Inspection Agent",
      role: "Melakukan inspection rutin dan patrol keselamatan",
      responsibilities: [
        "Schedule inspection",
        "Record findings",
        "Track corrective actions",
        "Generate inspection report"
      ]
    },
    {
      id: 2,
      name: "Incident Investigation Agent",
      role: "Mengoinvestigasi semua insiden dan near miss",
      responsibilities: [
        "Collect evidence",
        "Conduct root cause analysis",
        "Recommend corrective actions",
        "Track closure"
      ]
    },
    {
      id: 3,
      name: "PPE Compliance Agent",
      role: "Memantau kepatuhan penggunaan APD",
      responsibilities: [
        "Monitor PPE usage",
        "Alert non-compliance",
        "Track PPE inventory",
        "Generate compliance report"
      ]
    },
    {
      id: 4,
      name: "Permit to Work Agent",
      role: "Mengelola izin kerja untuk pekerjaan berisiko",
      responsibilities: [
        "Process PTW request",
        "Verify prerequisites",
        "Monitor work execution",
        "Close permit"
      ]
    },
    {
      id: 5,
      name: "Emergency Response Agent",
      role: "Mengelola respons darurat dan drill",
      responsibilities: [
        "Coordinate emergency drills",
        "Update emergency plans",
        "Track emergency equipment",
        "Post-drill evaluation"
      ]
    },
    {
      id: 6,
      name: "Hazard Identification Agent",
      role: "Mengidentifikasi dan menilai hazards",
      responsibilities: [
        "Collect hazard reports",
        "Conduct risk assessment",
        "Prioritize controls",
        "Track mitigation"
      ]
    },
    {
      id: 7,
      name: "Environmental Monitoring Agent",
      role: "Memantau dampak lingkungan",
      responsibilities: [
        "Track emissions",
        "Monitor waste management",
        "Report environmental KPIs",
        "Ensure regulatory compliance"
      ]
    },
    {
      id: 8,
      name: "Safety Training Agent",
      role: "Mengelola training keselamatan pekerja",
      responsibilities: [
        "Track training schedule",
        "Monitor completion",
        "Verify certification",
        "Generate training report"
      ]
    }
  ],

  businessRules: [
    {
      id: 1,
      name: "Zero Tolerance untuk Fatality",
      description: "Tidak ada toleransi untuk insiden fatality - eskalasi immediate ke top management",
      priority: "critical"
    },
    {
      id: 2,
      name: "Stop Work Authority",
      description: "Setiap worker punya otoritas untuk stop work jika ada unsafe condition",
      priority: "critical"
    },
    {
      id: 3,
      name: "PTW Mandatory untuk High Risk Work",
      description: "Pekerjaan hot work, confined space, lifting, electrical wajib menggunakan PTW",
      priority: "high"
    },
    {
      id: 4,
      name: "Near Miss harus Diinvestigasi",
      description: "Semua near miss harus diinvestigasi untuk mencegah insiden di masa depan",
      priority: "high"
    },
    {
      id: 5,
      name: "PPE Compliance 100%",
      description: "Kepatuhan PPE wajib 100% di zona yang memerlukan",
      priority: "high"
    },
    {
      id: 6,
      name: "Monthly Safety Inspection",
      description: "Inspeksi keselamatan wajib dilakukan minimal sebulan sekali di semua area",
      priority: "medium"
    }
  ]
};

export default function HSEAgentPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSubAgent, setExpandedSubAgent] = useState<number | null>(null);

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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{hseAgentData.overview.name}</h1>
              <p className="text-slate-400">Agent Code: {hseAgentData.overview.code} | Version: {hseAgentData.overview.version}</p>
            </div>
            <span className={`ml-auto px-4 py-2 rounded-full text-sm font-medium ${
              hseAgentData.overview.status === "Active" 
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-slate-500/20 text-slate-400"
            }`}>
              {hseAgentData.overview.status}
            </span>
          </div>
          <p className="text-slate-400 text-sm">Last Updated: {hseAgentData.overview.lastUpdated}</p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-red-600 text-white"
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
                <h3 className="text-lg font-semibold mb-4 text-red-400">Domain Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Primary Objective</p>
                    <p className="text-sm">Menjaga keselamatan pekerja, kepatuhan K3, pencegahan kecelakaan kerja</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Domain Scope</p>
                    <p className="text-sm">Safety, Incident, PPE, PTW, Emergency, Environment</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Key KPIs</p>
                    <p className="text-sm">LTIFR, TRIR, PPE Compliance, Near Miss Rate</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Priority Level</p>
                    <p className="text-sm text-red-400 font-medium">CRITICAL - Safety First</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                <h3 className="text-lg font-semibold mb-4 text-red-400">Agent Responsibilities</h3>
                <ul className="space-y-3">
                  {hseAgentData.knowledgeBase.objectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-slate-300">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                <h3 className="text-lg font-semibold mb-4 text-red-400">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Sub-Agents</span>
                    <span className="font-medium">{hseAgentData.subAgents.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Integrations</span>
                    <span className="font-medium">{hseAgentData.integrations.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Business Rules</span>
                    <span className="font-medium">{hseAgentData.businessRules.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Data Objects</span>
                    <span className="font-medium">{hseAgentData.knowledgeBase.dataObjects.length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                <h3 className="text-lg font-semibold mb-4 text-red-400">Core Values</h3>
                <div className="flex flex-wrap gap-2">
                  {hseAgentData.persona.values.map((value, idx) => (
                    <span key={idx} className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-sm border border-red-500/20">
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
            <h3 className="text-lg font-semibold mb-4 text-red-400">System Prompt</h3>
            <pre className="whitespace-pre-wrap font-mono text-sm text-slate-300 bg-slate-950 p-4 rounded-lg overflow-x-auto">
              {hseAgentData.systemPrompt}
            </pre>
          </div>
        )}

        {activeTab === "persona" && (
          <div className="space-y-6">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-red-400">Agent Persona</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm text-slate-400 mb-2">Name</h4>
                  <p className="text-lg font-medium">{hseAgentData.persona.name}</p>
                </div>
                <div>
                  <h4 className="text-sm text-slate-400 mb-2">Identity</h4>
                  <p className="text-sm">{hseAgentData.persona.identity}</p>
                </div>
                <div>
                  <h4 className="text-sm text-slate-400 mb-2">Speaking Style</h4>
                  <p className="text-sm">{hseAgentData.persona.speakingStyle}</p>
                </div>
                <div>
                  <h4 className="text-sm text-slate-400 mb-2">Decision Pattern</h4>
                  <p className="text-sm">{hseAgentData.persona.decisionPattern}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-red-400">Characteristics</h3>
              <div className="flex flex-wrap gap-2">
                {hseAgentData.persona.characteristics.map((char, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm">
                    {char}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-red-400">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {hseAgentData.persona.expertise.map((exp, idx) => (
                  <span key={idx} className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-sm border border-red-500/20">
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-red-400">KPIs</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {hseAgentData.persona.kpis.map((kpi, idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded-lg p-3 text-center">
                    <p className="text-sm text-slate-300">{kpi}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "knowledge" && (
          <div className="space-y-6">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-red-400">Knowledge Base</h3>
              <div className="mb-6">
                <h4 className="text-sm text-slate-400 mb-2">Definitions</h4>
                <p className="text-slate-300">{hseAgentData.knowledgeBase.definitions}</p>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-red-400">Sub-Scopes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hseAgentData.knowledgeBase.subScopes.map((scope) => (
                  <div key={scope.id} className="bg-slate-800/50 rounded-lg p-4">
                    <h5 className="font-medium text-red-400 mb-1">{scope.name}</h5>
                    <p className="text-sm text-slate-400">{scope.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-red-400">Data Objects</h3>
              <div className="flex flex-wrap gap-2">
                {hseAgentData.knowledgeBase.dataObjects.map((data, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-800 text-slate-300 rounded text-sm font-mono">
                    {data}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-red-400">Formulas</h3>
              <div className="space-y-3">
                {hseAgentData.knowledgeBase.formulas.map((formula, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-lg font-mono text-sm text-slate-300">
                    {formula}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "sub-agents" && (
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold mb-6 text-red-400">Sub-Agents ({hseAgentData.subAgents.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hseAgentData.subAgents.map((agent) => (
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
                        <h4 className="font-medium text-red-400">{agent.name}</h4>
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
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
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
            <h3 className="text-lg font-semibold mb-6 text-red-400">Agent Integrations</h3>
            <div className="space-y-4">
              {hseAgentData.integrations.map((integration, idx) => (
                <div key={idx} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <h3 className="text-lg font-semibold mb-6 text-red-400">Business Rules</h3>
            <div className="space-y-4">
              {hseAgentData.businessRules.map((rule) => (
                <div 
                  key={rule.id} 
                  className={`p-4 rounded-lg border ${
                    rule.priority === "critical" 
                      ? "bg-red-500/10 border-red-500/30" 
                      : rule.priority === "high"
                      ? "bg-orange-500/10 border-orange-500/30"
                      : "bg-slate-800/50 border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-slate-200">{rule.name}</h4>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      rule.priority === "critical" 
                        ? "bg-red-500/20 text-red-400"
                        : rule.priority === "high"
                        ? "bg-orange-500/20 text-orange-400"
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
