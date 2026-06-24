"use client";

import { useState } from "react";

const sections = [
  { id: "urgensi", title: "Urgensi Strategis", icon: "🔥" },
  { id: "target", title: "Profil Target Pasar", icon: "🎯" },
  { id: "burning", title: "Burning Platform", icon: "⚠️" },
  { id: "value", title: "Proposisi Nilai", icon: "💡" },
  { id: "arsitektur", title: "Arsitektur Produk", icon: "🏗️" },
  { id: "gtm", title: "Strategi GTM", icon: "🚀" },
  { id: "differ", title: "Diferensiasi", icon: "⚔️" },
  { id: "roadmap", title: "Roadmap", icon: "📅" },
];

const urgencyPoints = [
  { title: "China+1 Strategy", desc: "Relokasi basis produksi dari Tiongkok ke Asia Tenggara menuntut IKM lokal untuk memiliki standar operasional setara pemain global" },
  { title: "Hilirisasi & EV Ecosystem", desc: "Ledakan industri baterai dan kendaraan listrik (EV) menciptakan standar komponen baru yang lebih presisi" },
  { title: "Efisiensi Energi & Margin", desc: "Volatilitas harga energi global memaksa pabrik menekan pemborosan tanpa visibilitas data" },
];

const targetSegments = [
  { segment: "Existing Tier 2", omzet: "Rp 5-50 M", pain: "Tekanan digitalisasi dari Tier 1", opportunity: "Audit readiness & portal integration" },
  { segment: "Aspiring Tier 2", omzet: "Rp 2-5 M", pain: "Target naik kelas ke Tier 1", opportunity: "Siap bidding & compliance" },
  { segment: "Tier 3", omzet: "< Rp 2 M", pain: "Terbatasnya sistem", opportunity: "Modular start" },
];

const burningPoints = [
  { metric: "PPM Target", desc: "Part Per Million - Analisis defect harian yang harus mendekati angka nol" },
  { metric: "OEE Harian", desc: "Overall Equipment Effectiveness - Efektivitas mesin terukur per shift" },
  { metric: "Traceability", desc: "Kemampuan melacak riwayat komponen (batch/lot) jika recall" },
  { metric: "Audit Readiness", desc: "Dokumentasi selalu siap untuk inspeksi mendadak" },
];

const agents = [
  { name: "Production & QCD Agent", role: "Memantau output per shift, hitung OEE, deteksi bottleneck", output: "Audit Readiness Score" },
  { name: "Quality & Traceability Agent", role: "Kelola NCR, lot traceability, integrasi portal Tier 1", output: "Draf NCR Otomatis" },
  { name: "Compliance & HSE Agent", role: "Checklist IATF 16949, keselamatan kerja real-time", output: "Readiness Score" },
  { name: "Factory Orchestrator", role: "Pusat koordinasi - memecah instruksi bisnis ke tugas teknis", output: "Daily Brief" },
];

const gtmPhases = [
  { phase: "Phase 1", title: "Foundation", weeks: "Minggu 2-3", focus: "Master data, order management, pencatatan output dasar", goal: "Visibilitas real-time pertama" },
  { phase: "Phase 2", title: "Quality & Compliance", weeks: "Minggu 4-5", focus: "Defect log, NCR, lot traceability, SQAM checklist", goal: "Data siap ekspor ke portal Toyota/Astra" },
  { phase: "Phase 3", title: "Agentic Layer", weeks: "Minggu 6-7", focus: "Orchestrator Agent, antarmuka bahasa natural", goal: "Transformasi ke rekomendasi proaktif" },
  { phase: "Phase 4", title: "Deployment & Scaling", weeks: "Minggu 8-12", focus: "Onboarding pilot partners, fitur K3 penuh", goal: "Validasi kenaikan Audit Score" },
];

const differentiators = [
  { aspect: "Biaya", manufacture: "Terjangkau, <12 minggu", erp: "Sangat Mahal, >6 bulan", manual: "Murah tapi berisiko" },
  { aspect: "Kemudahan", manufacture: "AI Natural Language (B. Indonesia)", erp: "Butuh Training Khusus", manual: "Mudah tapi tidak terintegrasi" },
  { aspect: "Decision Support", manufacture: "System of Action (Proaktif)", erp: "System of Record (Statis)", manual: "Subjektif/Intuitif" },
  { aspect: "Intelligence", manufacture: "Rekomendasi Akar Masalah", erp: "Analisis Manual", manual: "Bergantung pada intuisi" },
  { aspect: "Lokalitas", manufacture: "Terintegrasi Portal Tier 1 Indonesia", erp: "Generik Global", manual: "Manual Entry ke Portal" },
];

export default function StrategyPage() {
  const [activeSection, setActiveSection] = useState("urgensi");

  const renderSection = () => {
    switch (activeSection) {
      case "urgensi":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">🔥 Urgensi Strategis: Kedaulatan Industri 2026</h2>
              <p className="text-slate-400 leading-relaxed">
                Memasuki tahun 2026, lanskap manufaktur Indonesia tidak lagi sekadar menghadapi kompetisi regional, melainkan berada di episentrum pergeseran rantai pasok global. 
                Bagi IKM, mempertahankan status quo operasional berbasis kertas dan Excel bukan lagi sekadar inefisiensi—itu adalah ancaman terhadap eksistensi bisnis.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {urgencyPoints.map((point, idx) => (
                <div key={idx} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-teal-500/50 transition-all">
                  <h3 className="font-semibold text-teal-400 mb-3">{point.title}</h3>
                  <p className="text-sm text-slate-400">{point.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-xl p-6 border border-amber-500/30">
              <h3 className="font-semibold text-amber-400 mb-2">🎯 Peluang Makro</h3>
              <p className="text-slate-300">
                Peluang makro ini hanya bisa ditangkap jika IKM mampu menjembatani kesenjangan antara tuntutan standar internasional 
                dengan realitas operasional di lantai produksi. Digitalisasi harus dipandang sebagai fondasi Kedaulatan Industri.
              </p>
            </div>
          </div>
        );

      case "target":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">🎯 Profil Target Pasar: Sweet Spot Tier 2</h2>
              <p className="text-slate-400 leading-relaxed">
                Penetrasi ManufactureOS difokuskan pada IKM komponen otomotif Tier 2 dengan omzet tahunan Rp 2–50 miliar. 
                Segmen ini adalah "jantung" industri otomotif yang paling terhimpit oleh tuntutan digitalisasi namun paling minim dukungan teknologi.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-400">Segmen</th>
                    <th className="text-center py-3 px-4 text-slate-400">Omzet</th>
                    <th className="text-center py-3 px-4 text-slate-400">Pain Point</th>
                    <th className="text-center py-3 px-4 text-slate-400">Peluang</th>
                  </tr>
                </thead>
                <tbody>
                  {targetSegments.map((seg, idx) => (
                    <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-800/50">
                      <td className="py-3 px-4 text-teal-400 font-medium">{seg.segment}</td>
                      <td className="py-3 px-4 text-center text-slate-300">{seg.omzet}</td>
                      <td className="py-3 px-4 text-center text-slate-400">{seg.pain}</td>
                      <td className="py-3 px-4 text-center text-emerald-400">{seg.opportunity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <h4 className="font-semibold text-slate-50 mb-3">Kondisi Saat Ini (Manual)</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• Fragmentasi spreadsheet & whiteboard</li>
                  <li>• Audit manual yang reaktif & melelahkan</li>
                  <li>• Decision support subjektif</li>
                  <li>• Sensitif biaya consultant ERP</li>
                </ul>
              </div>
              <div className="bg-slate-800 rounded-xl p-5 border border-teal-500/30">
                <h4 className="font-semibold text-teal-400 mb-3">Kebutuhan Masa Depan (System of Action)</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Terintegrasi dengan Agen AI aktif</li>
                  <li>• Kesiapan audit real-time (SQAM/IATF)</li>
                  <li>• Intelligence-driven recommendations</li>
                  <li>• Langganan berbasis nilai (Affordable)</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case "burning":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">⚠️ The Burning Platform: Standar QCD & Portal Tier 1</h2>
              <p className="text-slate-400 leading-relaxed">
                Di ekosistem otomotif Indonesia, digitalisasi adalah mekanisme push yang dipaksakan oleh Tier 1 (Astra Otoparts, Denso, TMMIN) 
                kepada sub-supplier. IKM tidak lagi hanya dituntut menghasilkan barang berkualitas, tetapi juga data yang akurat.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {burningPoints.map((point, idx) => (
                <div key={idx} className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 font-bold">{idx + 1}</span>
                    <h3 className="font-semibold text-slate-50">{point.metric}</h3>
                  </div>
                  <p className="text-sm text-slate-400">{point.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
              <h3 className="font-semibold text-red-400 mb-3">🚨 Konsekuensi Kegagalan</h3>
              <p className="text-slate-300">
                Kegagalan menyediakan data berikut secara instan dapat berakibat pada <span className="text-red-400 font-bold">pemutusan kontrak</span>. 
                ManufactureOS hadir sebagai jembatan untuk memenuhi standar Toyota SQAM dan IATF 16949 tanpa harus menambah beban administratif manual.
              </p>
            </div>
          </div>
        );

      case "value":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">💡 Proposisi Nilai: Mitra Strategis Naik Kelas</h2>
              <p className="text-slate-400 leading-relaxed">
                ManufactureOS bukan sekadar perangkat lunak manajemen pabrik; ini adalah "Kendaraan Naik Kelas". 
                Kami memosisikan diri sebagai mitra strategis yang menurunkan hambatan masuk bagi IKM untuk bersaing di level global.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-slate-800 rounded-xl p-5 border border-emerald-500/30">
                  <h3 className="font-semibold text-emerald-400 mb-2">💰 Terjangkau & Tanpa Konsultan</h3>
                  <p className="text-sm text-slate-400">Model SaaS yang menghilangkan kebutuhan konsultan IT mahal. Onboarding mandiri yang cerdas.</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-5 border border-blue-500/30">
                  <h3 className="font-semibold text-blue-400 mb-2">🗣️ Ask Your Factory</h3>
                  <p className="text-sm text-slate-400">Menggunakan bahasa Indonesia alami. Pemilik pabrik & operator bisa "berbicara" dengan data mereka.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-800 rounded-xl p-5 border border-purple-500/30">
                  <h3 className="font-semibold text-purple-400 mb-2">🛡️ Safety Intelligence</h3>
                  <p className="text-sm text-slate-400">Fitur K3 bukan sekadar modul tambahan, melainkan lapisan kecerdasan yang memantau risiko keselamatan di setiap lini.</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-5 border border-amber-500/30">
                  <h3 className="font-semibold text-amber-400 mb-2">🌏 Kepatuhan Lokal & Global</h3>
                  <p className="text-sm text-slate-400">Integrasi otomatis dengan regulasi lokal (SNI, K3, BPJS) dan standar global otomotif dalam satu platform.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "arsitektur":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">🏗️ Arsitektur Produk: Agentic Manufacturing OS</h2>
              <p className="text-slate-400 leading-relaxed">
                ManufactureOS bergeser dari System of Record yang statis menjadi System of Action yang proaktif melalui arsitektur agen AI.
              </p>
            </div>

            <div className="bg-gradient-to-b from-teal-900/30 to-slate-900/30 rounded-xl p-6 border border-teal-500/30">
              <div className="text-center mb-6">
                <div className="inline-block bg-teal-600 text-white px-4 py-2 rounded-full font-semibold mb-2">Factory Orchestrator Agent</div>
                <p className="text-sm text-slate-400">The Brain - Pusat koordinasi yang memecah instruksi bisnis menjadi tugas teknis</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {agents.slice(0, 3).map((agent, idx) => (
                  <div key={idx} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-teal-400 text-sm mb-2">{agent.name}</h4>
                    <p className="text-xs text-slate-400 mb-2">{agent.role}</p>
                    <div className="text-xs text-emerald-400">Output: {agent.output}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-3">Horizontal Safety Layer</h3>
              <p className="text-sm text-slate-400">
                K3 tertanam secara horizontal. Contoh: Production Agent akan memberi peringatan jika target produksi yang terlalu agresif 
                meningkatkan risiko kecelakaan kerja di lini tertentu.
              </p>
            </div>
          </div>
        );

      case "gtm":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">🚀 Strategi Go-To-Market: Roadmap 12 Minggu</h2>
              <p className="text-slate-400 leading-relaxed">
                Kami menggunakan strategi wedge dengan masuk melalui titik masalah paling kritis (QCD dan Kesiapan Audit) 
                untuk memenangkan kepercayaan pasar sebelum ekspansi vertikal.
              </p>
            </div>

            <div className="space-y-4">
              {gtmPhases.map((phase, idx) => (
                <div key={idx} className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-teal-600/20 flex items-center justify-center text-teal-400 font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-slate-50">{phase.phase}: {phase.title}</h3>
                        <span className="text-xs bg-slate-700 text-slate-400 px-2 py-1 rounded">{phase.weeks}</span>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">{phase.focus}</p>
                      <div className="inline-block bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full">
                        Goal: {phase.goal}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "differ":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">⚔️ Diferensiasi: System of Action vs ERP</h2>
              <p className="text-slate-400 leading-relaxed">
                ManufactureOS menempati posisi unik sebagai solusi yang "diajak bekerja", bukan sekadar "diisi data".
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-400">Aspek</th>
                    <th className="text-center py-3 px-4 text-teal-400">ManufactureOS</th>
                    <th className="text-center py-3 px-4 text-slate-400">Traditional ERP</th>
                    <th className="text-center py-3 px-4 text-slate-400">Manual</th>
                  </tr>
                </thead>
                <tbody>
                  {differentiators.map((diff, idx) => (
                    <tr key={idx} className="border-b border-slate-700/50">
                      <td className="py-3 px-4 text-slate-300 font-medium">{diff.aspect}</td>
                      <td className="py-3 px-4 text-center text-emerald-400">{diff.manufacture}</td>
                      <td className="py-3 px-4 text-center text-slate-400">{diff.erp}</td>
                      <td className="py-3 px-4 text-center text-amber-400">{diff.manual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gradient-to-r from-teal-600/20 to-emerald-600/20 rounded-xl p-6 border border-teal-500/30">
              <h3 className="font-semibold text-teal-400 mb-2">Kesimpulan</h3>
              <p className="text-slate-300">
                ManufactureOS adalah kunci bagi IKM komponen otomotif Indonesia untuk tidak hanya bertahan, tetapi mendominasi 
                dalam rantai pasok global 2026. Kami menyediakan jalur tercepat untuk "Naik Kelas".
              </p>
            </div>
          </div>
        );

      case "roadmap":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">📅 Roadmap Pengembangan</h2>
              <p className="text-slate-400 leading-relaxed">
                Strategi implementasi bertahap dengan fokus pada value creation yang terukur.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 via-blue-500 to-purple-500"></div>
              
              <div className="space-y-6">
                <div className="relative pl-16">
                  <div className="absolute left-4 w-5 h-5 rounded-full bg-teal-500 border-4 border-slate-900"></div>
                  <div className="bg-slate-800 rounded-xl p-5 border border-teal-500/30">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-teal-400 font-semibold">MVP - Saat Ini</span>
                      <span className="text-xs bg-slate-700 text-slate-400 px-2 py-1 rounded">Minggu 1-8</span>
                    </div>
                    <p className="text-sm text-slate-400">Core modules: Production, Quality, Compliance, AI Orchestrator, Tools & Learning</p>
                  </div>
                </div>

                <div className="relative pl-16">
                  <div className="absolute left-4 w-5 h-5 rounded-full bg-blue-500 border-4 border-slate-900"></div>
                  <div className="bg-slate-800 rounded-xl p-5 border border-blue-500/30">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-blue-400 font-semibold">Phase 2: Operational Depth</span>
                      <span className="text-xs bg-slate-700 text-slate-400 px-2 py-1 rounded">Minggu 9-16</span>
                    </div>
                    <p className="text-sm text-slate-400">HSE Agent, Maintenance (CMMS), Supply Chain, Workforce Management</p>
                  </div>
                </div>

                <div className="relative pl-16">
                  <div className="absolute left-4 w-5 h-5 rounded-full bg-purple-500 border-4 border-slate-900"></div>
                  <div className="bg-slate-800 rounded-xl p-5 border border-purple-500/30">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-purple-400 font-semibold">Phase 3: Strategic Intelligence</span>
                      <span className="text-xs bg-slate-700 text-slate-400 px-2 py-1 rounded">Minggu 17-24</span>
                    </div>
                    <p className="text-sm text-slate-400">Cost & Margin Analysis, Engineering Change (ECO), Advanced Analytics</p>
                  </div>
                </div>

                <div className="relative pl-16">
                  <div className="absolute left-4 w-5 h-5 rounded-full bg-emerald-500 border-4 border-slate-900"></div>
                  <div className="bg-slate-800 rounded-xl p-5 border border-emerald-500/30">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-emerald-400 font-semibold">Scale & Network Effects</span>
                      <span className="text-xs bg-slate-700 text-slate-400 px-2 py-1 rounded">2027+</span>
                    </div>
                    <p className="text-sm text-slate-400">Multi-plant rollout, Ecosystem integration, B2B Marketplace for IKM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-50 mb-2">📋 Strategi Go-to-Market ManufactureOS</h1>
          <p className="text-slate-400">Akselerasi "Kendaraan Naik Kelas" bagi IKM Komponen Otomotif Indonesia 2026</p>
        </div>

        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                activeSection === section.id
                  ? "bg-teal-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {section.icon} {section.title}
            </button>
          ))}
        </div>

        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          {renderSection()}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-teal-600/20 to-emerald-600/20 rounded-xl p-5 border border-teal-500/30">
            <h3 className="font-semibold text-teal-400 mb-2">Langkah Aksi 1</h3>
            <p className="text-sm text-slate-400">Penyelesaian Build MVP (8-12 Minggu) dengan arsitektur Orchestrator dan tiga agen inti</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-5 border border-blue-500/30">
            <h3 className="font-semibold text-blue-400 mb-2">Langkah Aksi 2</h3>
            <p className="text-sm text-slate-400">Validasi Portal Integration dengan modul ekspor data kompatibel portal supplier Astra & Toyota</p>
          </div>
          <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-xl p-5 border border-amber-500/30">
            <h3 className="font-semibold text-amber-400 mb-2">Langkah Aksi 3</h3>
            <p className="text-sm text-slate-400">Pilot Project "Aspiring Tier 2" dengan 3 IKM terpilih sebagai mitra desain</p>
          </div>
        </div>
      </div>
    </div>
  );
}
