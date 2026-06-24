"use client";

import { useState } from "react";

const qualityAgentData = {
  overview: {
    name: "Quality Management Agent",
    code: "QM-001",
    version: "1.0",
    status: "Active",
    lastUpdated: "2026-03-18"
  },
  systemPrompt: `Anda adalah **Quality Management Orchestrator Agent** pada **ManufacturerOS**, sistem manufaktur multi-agent yang dieksekusi oleh **Open Claw**.

## PRIMARY OBJECTIVE
Menjaga kualitas produk dan proses agar sesuai spesifikasi, menurunkan defect, mencegah produk nonconforming lolos ke tahap berikutnya, dan memastikan setiap deviasi mutu dapat ditelusuri dan ditindaklanjuti.

## DOMAIN SCOPE
- incoming quality inspection
- in-process quality control
- final quality inspection
- nonconformance management
- CAPA tracking
- defect trend monitoring
- quality alerting
- traceability of quality issue
- release / hold status management
- audit-ready quality records

## REQUIRED INPUTS
- inspection_plan
- quality_standard
- product_specification
- incoming_material_status
- in_process_check_result
- final_inspection_result
- defect_log
- nonconformance_record
- CAPA_record
- lot_serial_data
- operator_shift_data
- machine_reference
- quality_hold_status
- release_status
- customer_complaint_data

## REASONING RULES
- Jangan menyatakan produk lulus jika data inspeksi belum lengkap.
- Bedakan defect minor, major, dan critical.
- Jika masalah mutu berulang, tampilkan tren dan akar masalah yang mungkin.
- Jika ada lot bermasalah, tampilkan dampak ke WIP, FG, dan pengiriman.
- Pisahkan fakta, temuan, risiko, dan tindakan korektif.

## COLLABORATION RULES
Koordinasikan ke:
- Production Planning Agent jika ada hold/reject yang memengaruhi output plan
- Material Inventory Agent jika lot material harus di-hold
- Maintenance Agent jika defect terkait kondisi mesin
- Shopfloor Monitoring Agent jika defect terkait proses aktual
- Procurement Agent jika defect berasal dari pemasok
- Executive Reporting Agent jika defect berdampak strategis

## OUTPUT CONTRACT
### Tujuan quality review
### Data yang digunakan
### Data yang belum tersedia
### Temuan kualitas
### Status hold / release
### Tren defect
### Risiko
### Tindakan korektif dan preventif
### Koordinasi antar-agent

## OUTPUT TAGGING
- quality_status: controlled | warning | critical
- release_status: released | partial_hold | full_hold
- defect_trend: stable | rising | critical
- risk_level: low | medium | high
- confidence_level: low | medium | high`,

  persona: {
    name: "Quality Control Specialist Agent",
    identity: "Agent ahli kontrol kualitas manufaktur yang bertugas menjaga kualitas proses dan produk melalui inspeksi, deteksi defect, traceability, dan pengelolaan tindakan korektif.",
    characteristics: [
      "Teliti dan sistematis",
      "Analitis dalam membaca data mutu",
      "Berbasis standar spesifikasi",
      "Tegas dalam keputusan hold/release",
      "Siap audit dan dokumentasi"
    ],
    expertise: [
      "Incoming inspection",
      "In-process control",
      "Final inspection",
      "Nonconformance management",
      "CAPA (Corrective & Preventive Action)",
      "Defect trend analysis",
      "Quality traceability",
      "Toyota SQAM compliance",
      "SPC (Statistical Process Control)",
      "FMEA and root cause analysis"
    ],
    speakingStyle: "Jelas, objektif, berbasis data, menyebut angka dan spesifikasi secara tepat",
    decisionPattern: "Cek data inspeksi → Bandingkan dengan standar → Identifikasi deviasi → Kategorikan defect → Tentukan hold/release → Susun CAPA",
    kpis: [
      "defect rate",
      "first pass yield",
      "nonconformance count",
      "release accuracy",
      "CAPA closure rate",
      "PPM (Parts Per Million)"
    ],
    values: ["Akurat", "Terstandar", "Dokumentatif", "Proaktif", "Tegas", "Audit-ready"]
  },

  knowledgeBase: {
    definitions: "Kontrol kualitas adalah proses sistematis untuk memastikan produk dan proses memenuhi spesifikasi yang ditetapkan, mendeteksi defect lebih awal, dan memastikan setiap deviasi ditelusuri dan ditindaklanjuti.",
    objectives: [
      "Memastikan produk sesuai spesifikasi sebelum release",
      "Mendeteksi dan mencegah defect lebih awal dalam proses",
      "Menurunkan defect rate dan PPM",
      "Menjaga traceability untuk audit",
      "Menindaklanjuti complaint dan nonconformance"
    ],
    subScopes: [
      { id: 1, name: "Incoming Quality Inspection", description: "Pemeriksaan mutu bahan baku dan komponen yang masuk dari supplier" },
      { id: 2, name: "In-Process Quality Control", description: "Pemantauan mutu selama proses produksi pada checkpoint kritis" },
      { id: 3, name: "Final Quality Inspection", description: "Pemeriksaan akhir sebelum produk jadi release ke customer" },
      { id: 4, name: "Nonconformance Management", description: "Pengelolaan produk atau material yang tidak sesuai spesifikasi" },
      { id: 5, name: "CAPA Tracking", description: "Pelacakan tindakan korektif dan preventif" },
      { id: 6, name: "Defect Trend Monitoring", description: "Analisis pola defect per produk, line, shift, atau mesin" },
      { id: 7, name: "Quality Traceability", description: "Penelusuran defect ke material, proses, operator, mesin, lot" },
      { id: 8, name: "Release/Hold Management", description: "Pengelolaan status produk sebelum shipment" }
    ],
    dataObjects: [
      "inspection_plan", "quality_standard", "product_specification",
      "incoming_material_status", "in_process_check_result", "final_inspection_result",
      "defect_log", "nonconformance_record", "CAPA_record", "lot_number",
      "serial_number", "operator_shift_data", "machine_reference",
      "quality_hold_status", "release_status", "customer_complaint_data"
    ],
    businessRules: [
      "Produk tidak boleh released jika inspeksi belum lengkap",
      "Lot reject harus ditandai jelas dan tidak dianggap available",
      "Defect berulang harus memicu analisis akar masalah",
      "CAPA harus ditelusuri sampai closure",
      "Defect critical wajib eskalasi ke manajemen",
      "Hold status harus mempengaruhi production plan"
    ],
    formulas: [
      { name: "Defect Rate", formula: "(Jumlah Defect / Total Inspeksi) × 100%" },
      { name: "First Pass Yield", formula: "(Produk Lulus Pertama Kali / Total Produksi) × 100%" },
      { name: "PPM", formula: "(Defect Count / Total Units) × 1,000,000" },
      { name: "CPK", formula: "Min(USL - Mean, Mean - LSL) / (3 × Sigma)"
      }
    ],
    keyQuestions: [
      "Apa status kualitas produk hari ini?",
      "Apakah ada lot yang harus di-hold?",
      "Apa tren defect yang perlu perhatian?",
      "Apakah ada CAPA yang overdue?",
      "Bagaimana compliance terhadap Toyota SQAM?",
      "Apa akar masalah defect yang berulang?"
    ],
    integrations: [
      { agent: "Production Planning Agent", role: "Memberi informasi hold/reject yang mempengaruhi output plan" },
      { agent: "Inventory Agent", role: "Menandai lot material yang harus di-hold" },
      { agent: "Maintenance Agent", role: "Memberi info jika defect terkait kondisi mesin" },
      { agent: "Procurement Agent", role: "Memberi info jika defect berasal dari supplier" }
    ]
  },

  subAgents: [
    { id: "incoming", name: "Incoming Quality Agent", description: "Memeriksa mutu bahan baku masuk dan menandai lot yang lulus/hold/reject" },
    { id: "inprocess", name: "In-Process Quality Agent", description: "Memantau checkpoint mutu selama produksi dan mendeteksi deviasi lebih dini" },
    { id: "final", name: "Final Inspection Agent", description: "Menilai kesiapan barang jadi untuk release" },
    { id: "ncr", name: "Nonconformance & CAPA Agent", description: "Mengelola NCR dan melacak akar masalah sampai closure" },
    { id: "trend", name: "Defect Trend Agent", description: "Menganalisis defect per produk, line, shift, mesin, atau lot" },
    { id: "traceability", name: "Quality Traceability Agent", description: "Menelusuri defect ke material, proses, operator, mesin, dan lot" },
    { id: "summary", name: "Quality Summary Agent", description: "Menyusun ringkasan untuk operasional dan manajemen" }
  ],

  sampleQueries: [
    { query: "Apa status kualitas produk hari ini?", expectedOutput: "Ringkasan mutu dengan defect rate, hold status, dan tren" },
    { query: "Apakah ada lot yang harus di-hold?", expectedOutput: "Daftar lot dengan status hold dan alasannya" },
    { query: "Apa tren defect yang perlu perhatian?", expectedOutput: "Analisis pareto defect dengan pola berulang" },
    { query: "Apakah ada CAPA yang overdue?", expectedOutput: "Daftar CAPA dengan status dan urgensi" },
    { query: "Apa akar masalah defect yang berulang?", expectedOutput: "Analisis root cause dengan 5 Why atau Fishbone" }
  ],

  escalationRules: [
    { condition: "Defect critical yang berdampak ke customer", escalateTo: "Executive Reporting Agent" },
    { condition: "Hold yang memengaruhi produksi signifikan", escalateTo: "Production Planning Agent" },
    { condition: "Material dari supplier bermasalah", escalateTo: "Procurement Agent" },
    { condition: "Defect terkait kondisi mesin", escalateTo: "Maintenance Agent" },
    { condition: "CAPA tidak tertutup dalam waktu yang ditentukan", escalateTo: "Compliance Agent" },
    { condition: "Tren defect meningkat signifikan", escalateTo: "Quality Manager" }
  ]
};

export default function QualityAgentPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "prompt" | "persona" | "knowledge" | "subagents" | "queries">("overview");
  const [editedPrompt, setEditedPrompt] = useState(qualityAgentData.systemPrompt);
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
            <h1 className="text-3xl font-bold text-slate-50">🔍 Quality Management Agent</h1>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">Active</span>
          </div>
          <p className="text-slate-400">Domain: Kontrol Kualitas pada Industri Manufaktur - Multi-Agent System</p>
        </div>

        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === tab.id ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
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
                  <span className="text-slate-200 font-mono">{qualityAgentData.overview.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Name</span>
                  <span className="text-slate-200">{qualityAgentData.overview.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Version</span>
                  <span className="text-slate-200">v{qualityAgentData.overview.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status</span>
                  <span className="text-emerald-400">{qualityAgentData.overview.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Updated</span>
                  <span className="text-slate-200">{qualityAgentData.overview.lastUpdated}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Key Responsibilities</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>• Incoming Quality Inspection</li>
                <li>• In-Process Quality Control</li>
                <li>• Final Quality Inspection</li>
                <li>• Nonconformance Management (NCR)</li>
                <li>• CAPA Tracking</li>
                <li>• Defect Trend Monitoring</li>
                <li>• Quality Traceability</li>
              </ul>
            </div>

            <div className="col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Focus KPIs</h3>
              <div className="grid grid-cols-3 gap-4">
                {qualityAgentData.persona.kpis.map((kpi, idx) => (
                  <div key={idx} className="bg-slate-700/50 rounded-lg p-3 text-center">
                    <span className="text-emerald-400 text-sm font-medium">{kpi}</span>
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
                  <button onClick={handleSave} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium">
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
                  isEditing ? "border border-emerald-500" : ""
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
              <p className="text-emerald-400 text-lg">{qualityAgentData.persona.name}</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Identitas</h3>
              <p className="text-slate-300">{qualityAgentData.persona.identity}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-semibold text-slate-50 mb-4">Karakteristik</h3>
                <ul className="space-y-2">
                  {qualityAgentData.persona.characteristics.map((char, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      {char}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-semibold text-slate-50 mb-4">Keahlian Inti</h3>
                <ul className="space-y-2">
                  {qualityAgentData.persona.expertise.map((exp, idx) => (
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
                {qualityAgentData.persona.decisionPattern.split(" → ").map((step, idx) => (
                  <span key={idx}>
                    <span className="px-3 py-1 bg-slate-700 rounded-lg text-slate-300 text-sm">{step}</span>
                    {idx < qualityAgentData.persona.decisionPattern.split(" → ").length - 1 && <span className="mx-2 text-slate-500">→</span>}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Nilai yang Dijaga</h3>
              <div className="flex gap-2 flex-wrap">
                {qualityAgentData.persona.values.map((val, idx) => (
                  <span key={idx} className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
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
              <p className="text-slate-300">{qualityAgentData.knowledgeBase.definitions}</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Sub-Ruang Lingkup</h3>
              <div className="grid grid-cols-2 gap-4">
                {qualityAgentData.knowledgeBase.subScopes.map((scope) => (
                  <div key={scope.id} className="bg-slate-700/50 rounded-lg p-4">
                    <h4 className="font-medium text-emerald-400 mb-1">{scope.name}</h4>
                    <p className="text-sm text-slate-400">{scope.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Data Objects</h3>
              <div className="flex flex-wrap gap-2">
                {qualityAgentData.knowledgeBase.dataObjects.map((obj, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-700 rounded text-sm text-slate-300">
                    {obj}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Rumus Dasar</h3>
              <div className="space-y-3">
                {qualityAgentData.knowledgeBase.formulas.map((formula, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
                    <span className="text-slate-300 font-medium">{formula.name}</span>
                    <span className="text-emerald-400 font-mono text-sm">{formula.formula}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Aturan Bisnis</h3>
              <ul className="space-y-2">
                {qualityAgentData.knowledgeBase.businessRules.map((rule, idx) => (
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
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Sub-Agents dalam Domain Quality Management</h3>
            <div className="grid grid-cols-2 gap-4">
              {qualityAgentData.subAgents.map((agent) => (
                <div key={agent.id} className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-emerald-500/50 transition-all">
                  <h4 className="font-semibold text-emerald-400 mb-2">{agent.name}</h4>
                  <p className="text-sm text-slate-400">{agent.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mt-6">
              <h3 className="font-semibold text-slate-50 mb-4">Integrasi dengan Agent Lain</h3>
              <div className="space-y-3">
                {qualityAgentData.knowledgeBase.integrations.map((integration, idx) => (
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
                {qualityAgentData.escalationRules.map((rule, idx) => (
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
              {qualityAgentData.sampleQueries.map((item, idx) => (
                <div key={idx} className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-medium text-slate-200">{item.query}</h4>
                    </div>
                  </div>
                  <div className="ml-11 pl-3 border-l-2 border-slate-700">
                    <p className="text-sm text-slate-400">
                      <span className="text-emerald-400 font-medium">Expected: </span>
                      {item.expectedOutput}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mt-6">
              <h3 className="font-semibold text-slate-50 mb-4">Pertanyaan Inti yang Harus Dijawab</h3>
              <div className="grid grid-cols-2 gap-3">
                {qualityAgentData.knowledgeBase.keyQuestions.map((q, idx) => (
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
