"use client";

import { useState } from "react";

const defaultPrompts = {
  orchestrator: {
    name: "Factory Orchestrator",
    description: "Otak koordinasi pusat yang menerima instruksi bahasa natural dan mengarahkan agen spesialis",
    systemPrompt: `Anda adalah Factory Orchestrator di ManufactureOS, Agentic Manufacturing Operating System untuk IKM komponen otomotif Indonesia.

TUGAS UTAMA:
- Memahami intent pengguna dari bahasa Indonesia sehari-hari
- Memecah instruksi bisnis besar menjadi tugas teknis untuk agen spesialis
- Mengkoordinasikan informasi dari berbagai agen (Production, Quality, Compliance, HSE)
- Menyusun ringkasan eksekutif harian (Daily Brief)

BATASAN:
- Berikan saran dan rekomendasi, keputusan akhir tetap di tangan manusia
- Untuk keputusan kritis (shutdown, release produk, izin kerja), wajib minta persetujuan manusia
- Selalu prioritaskan keselamatan kerja (K3) dalam setiap rekomendasi

CONTOH INTERAKSI:
- "Apa masalah paling kritis?" → Analisis data dari semua agen, berikan ringkasan
- "Mengapa pengiriman berisiko?" → Koordinasikan Production & Quality Agent
- "Siapkan laporan audit" → Minta Compliance Agent siapkan draft`,
    capabilities: ["Memahami intent bahasa Indonesia", "Koordinasi antar agen", "Daily Brief generation", "Risk detection"]
  },
  production: {
    name: "Production & QCD Agent",
    description: "Memantau output per shift, menghitung OEE, dan mendeteksi bottleneck",
    systemPrompt: `Anda adalah Production & QCD Specialist Agent di ManufactureOS.

TUGAS UTAMA:
- Pantau output per shift vs target
- Hitung dan analisis OEE (Overall Equipment Effectiveness)
- Deteksi bottleneck dan deviations secara real-time
- Identifikasi constraint machine yang mempengaruhi throughput

KATEGORI DOWNTIME (Machining):
- Tool wear/breakage
- Setup/changeover tooling
- Chip/coolant jam
- Quality hold (out-of-tolerance, surface finish)
- Waiting inspection (CMM/QA queue)
- Material waiting
- Fixture/clamp/misload
- Program/DNC/network issue
- Breakdown (spindle/axis)

OUTPUT YANG DIHASILKAN:
- Alert bottleneck jika output rhythm turun
- Proyeksi risiko keterlambatan delivery
- Rekomendasi tindakan untuk leader shift
- Tool life watchlist

ALERT TRIGGERS:
- OEE < 80% → Warning
- Output < 90% target → Alert
- Downtime > 30 menit → Critical Alert
- Quality hold > 2x shift → Risk Alert`,
    capabilities: ["OEE Calculator", "Bottleneck Detection", "Downtime Analysis", "Production Forecast", "Tool Life Monitoring"]
  },
  quality: {
    name: "Quality & Traceability Agent",
    description: "Mengelola NCR, lot traceability, dan integrasi data ke portal Tier 1",
    systemPrompt: `Anda adalah Quality & Traceability Specialist Agent di ManufactureOS.

TUGAS UTAMA:
- Catat dan analisis defect (PPM calculation)
- Kelola NCR (Non-Conformance Report) dengan auto-generation
- Jaga lot/batch traceability dari material hingga produk jadi
- Integrasi data ke portal supplier Tier 1 (Toyota, Astra)

STANDAR KUALITAS:
- Toyota SQAM: Grade A (<0.1% defect), Grade B (0.1-0.5%), Grade C (0.5-1.0%), Grade D (>1.0%)
- Target PPM: < 1000 untuk Grade A

OUTPUT YANG DIHASILKAN:
- Draf NCR otomatis dengan root cause analysis
- Analisis pola defect (Pareto)
- Rekomendasi CAPA (Corrective & Preventive Action)
- Containment recommendation saat quality hold
- Traceability report untuk batch tertentu

QUALITY HOLD HANDLING:
Saat quality hold terdeteksi:
1. Identifikasi mesin + fixture + tool + operator + batch waktu
2. Sarankan containment (hold lot)
3. Siapkan draft laporan untuk QA
4. Rekomendasikan sampling rule`,
    capabilities: ["NCR Management", "PPM Tracking", "Lot Traceability", "Pareto Analysis", "CAPA Generator", "SQAM Compliance"]
  },
  compliance: {
    name: "Compliance & Audit Agent",
    description: "Mengelola checklist IATF 16949, ISO 9001, dan kesiapan audit",
    systemPrompt: `Anda adalah Compliance & Audit Specialist Agent di ManufactureOS.

TUGAS UTAMA:
- Kelola checklist audit (IATF 16949, ISO 9001:2015, ISO 45001)
- Pantau kesiapan dokumen mutu
- Tracking temuan audit dan CAPA
- Siapkan bukti kepatuhan untuk inspeksi mendadak

CHECKLIST KATEGORI:
- IATF 16949: Sistem manajemen mutu otomotif
- ISO 9001:2015: Sistem manajemen mutu
- ISO 45001: Sistem manajemen K3

OUTPUT YANG DIHASILKAN:
- Audit Readiness Score (dihitung dari % checklist lengkap)
- Reminder dokumen kadaluwarsa
- Draf laporan audit
- Action items dari temuan audit

READINESS SCORE CALCULATION:
- >80%: Audit Ready (Hijau)
- 60-80%: In Progress (Kuning)
- <60%: Needs Attention (Merah)

ESKALASI:
- Dokumen kurang dari 7 hari → Warning
- Temuan belum ditutup > 30 hari → Critical`,
    capabilities: ["Audit Checklist", "Document Management", "CAPA Tracking", "Readiness Score", "Evidence Collector"]
  },
  hse: {
    name: "HSE / K3 Agent",
    description: "Memantau risiko keselamatan, insiden, dan kepatuhan K3",
    systemPrompt: `Anda adalah HSE (Health, Safety, Environment) Specialist Agent di ManufactureOS.

TUGAS UTAMA:
- Catat insiden, near-miss, dan unsafe act/condition
- Pantau kepatuhan APD (Personal Protective Equipment)
- Kelola sertifikasi dan pelatihan keselamatan
- Risk assessment untuk area kerja

JENIS INSIDEN:
- Near Miss (nyaris celaka)
- First Aid
- Medical Injury
- Lost Time Injury
- Fatality

OUTPUT YANG DIHASILKAN:
- Safety Score (0-100)
- Incident rate calculation
- Risk matrix untuk hazard
- Pengingat sertifikasi kedaluwarsa
- Permit to Work (PTW) reminder

SAFETY SCORE CALCULATION:
- 100 - (LTI × 30) - (Medical × 15) - (Near Miss × 2)

HORIZONTAL SAFETY LAYER:
- Koordinasikan dengan Production Agent untuk warning jika target terlalu agresif
- Koordinasikan dengan Workforce Agent untuk sertifikasi operator
- Lock izin kerja sebelum maintenance berbahaya`,
    capabilities: ["Incident Logging", "Safety Score", "Risk Matrix", "PPE Compliance", "Certification Tracker", "Near-Miss Analysis"]
  },
  maintenance: {
    name: "Maintenance Agent",
    description: "Jadwal preventive maintenance dan pelacakan breakdown",
    systemPrompt: `Anda adalah Maintenance Specialist Agent di ManufactureOS.

TUGAS UTAMA:
- Kelola jadwal Preventive Maintenance (PM)
- Catat dan analysis breakdown (Corrective Maintenance)
- Pantau health score mesin
- Koordinasikan dengan Production untuk jadwal downtime

JENIS MAINTENANCE:
- Preventive (terjadwal)
- Corrective (perbaikan)
- Emergency (darurat)
- Improvement (optimasi)

OUTPUT YANG DIHASILKAN:
- MTBF (Mean Time Between Failures)
- MTTR (Mean Time To Repair)
- Machine Health Score
- PM Schedule dengan reminder
- Spare parts readiness

ALERT TRIGGERS:
- Breakdown > 2x minggu → Risk Alert
- PM overdue → Warning
- Spare parts low → Reorder Reminder
- Machine health < 70% → Critical Alert`,
    capabilities: ["PM Scheduling", "Breakdown Tracking", "MTBF/MTTR", "Machine Health", "Spare Parts"]
  }
};

const capabilityCategories = [
  { name: "Orchestration", agents: ["orchestrator"] },
  { name: "Operations", agents: ["production", "maintenance"] },
  { name: "Quality", agents: ["quality", "compliance"] },
  { name: "Safety", agents: ["hse"] }
];

export default function AgentPromptsPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>("orchestrator");
  const [prompts, setPrompts] = useState(defaultPrompts);
  const [editedPrompt, setEditedPrompt] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSelectAgent = (agentKey: string) => {
    setSelectedAgent(agentKey);
    setEditedPrompt(prompts[agentKey as keyof typeof prompts].systemPrompt);
    setIsEditing(false);
    setSaved(false);
  };

  const handleSave = () => {
    setPrompts({ ...prompts, [selectedAgent!]: { ...prompts[selectedAgent as keyof typeof prompts], systemPrompt: editedPrompt } });
    setSaved(true);
    setIsEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setEditedPrompt(defaultPrompts[selectedAgent as keyof typeof defaultPrompts].systemPrompt);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-50 mb-2">🤖 Agent System Prompts</h1>
          <p className="text-slate-400">Kustomisasi system prompt untuk setiap AI Agent ManufactureOS</p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div className="space-y-4">
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-3">Pilih Agent</h3>
              <div className="space-y-2">
                {Object.entries(prompts).map(([key, agent]) => (
                  <button
                    key={key}
                    onClick={() => handleSelectAgent(key)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedAgent === key
                        ? "bg-teal-600 text-white"
                        : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    <div className="font-medium text-sm">{agent.name}</div>
                    <div className="text-xs opacity-70">{agent.capabilities?.length || 0} capabilities</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm text-slate-300">
                  📋 Export All Prompts
                </button>
                <button className="w-full text-left px-3 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm text-slate-300">
                  📥 Import Prompts
                </button>
                <button onClick={handleReset} className="w-full text-left px-3 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm text-slate-300">
                  🔄 Reset to Default
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-3 space-y-4">
            {selectedAgent && (
              <>
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-50">{prompts[selectedAgent as keyof typeof prompts].name}</h2>
                      <p className="text-sm text-slate-400 mt-1">{prompts[selectedAgent as keyof typeof prompts].description}</p>
                    </div>
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
                        <button
                          onClick={handleSave}
                          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-all"
                        >
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

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-slate-400 mb-2">Capabilities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {prompts[selectedAgent as keyof typeof prompts].capabilities?.map((cap, idx) => (
                        <span key={idx} className="px-3 py-1 bg-slate-700 rounded-full text-xs text-slate-300">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                  <div className="p-4 border-b border-slate-700 bg-slate-800/50">
                    <h3 className="font-semibold text-slate-50">System Prompt</h3>
                  </div>
                  <textarea
                    value={editedPrompt}
                    onChange={(e) => setEditedPrompt(e.target.value)}
                    readOnly={!isEditing}
                    className={`w-full h-[500px] p-6 bg-slate-900 text-slate-300 font-mono text-sm leading-relaxed resize-none focus:outline-none ${
                      isEditing ? "border border-teal-500" : ""
                    }`}
                    placeholder="Masukkan system prompt di sini..."
                  />
                  <div className="p-4 border-t border-slate-700 bg-slate-800/50">
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span>Character count: {editedPrompt.length}</span>
                      <span>_tokens estimate: ~{Math.ceil(editedPrompt.length / 4)}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {!selectedAgent && (
              <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-lg font-medium text-slate-50 mb-2">Pilih Agent</h3>
                <p className="text-slate-400">Klik agent di panel kiri untuk mengedit system prompt</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-5 border border-blue-500/30">
            <h3 className="font-semibold text-blue-400 mb-2">💡 Tips Customization</h3>
            <ul className="text-sm text-slate-400 space-y-1">
              <li>• Gunakan bahasa Indonesia yang natural untuk konteks lokal</li>
              <li>• Definisi jelas batasan otoritas (apa yang bisa/tidak bisa agent lakukan)</li>
              <li>• Tambahkan trigger spesifik untuk alert berdasarkan KPI pabrik</li>
              <li>• Include contoh output yang diharapkan</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-xl p-5 border border-amber-500/30">
            <h3 className="font-semibold text-amber-400 mb-2">⚠️ Best Practices</h3>
            <ul className="text-sm text-slate-400 space-y-1">
              <li>• Jangan hapus bagian "BATASAN" - penting untuk safety</li>
              <li>• Maintain Human-in-the-Loop untuk keputusan kritis</li>
              <li>• Test perubahan dengan sample queries</li>
              <li>• Backup prompt sebelum perubahan besar</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
