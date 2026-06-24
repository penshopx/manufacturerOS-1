"use client";

import { useState } from "react";

const landingData = {
  hero: {
    headline: "Pabrik Bergerak Makin Cepat. Dashboard Anda Juga Harus Begitu.",
    subheadline: "Ubah KPI produksi, kualitas, pengiriman, downtime, dan keselamatan menjadi keputusan eksekutif yang jelas, cepat, dan bisa ditindaklanjuti. Dirancang untuk manufaktur otomotif yang harus menjaga output, kualitas, delivery, dan stabilitas operasi dalam pasar yang makin ketat.",
    ctaPrimary: "Jadwalkan Demo",
    ctaSecondary: "Hitung ROI Anda",
    stats: [
      { value: "803,687", label: "Unit Penjualan Mobil Indonesia 2025", source: "Gaikindo" },
      { value: "US$43.6B", label: "Industrial AI Market 2024", source: "IoT Analytics" },
      { value: "54%", label: "Pabrik Masih Pakai Spreadsheet", source: "IoT Analytics" }
    ],
    trends: [
      "Penjualan mobil 2025 turun 7.2% - target 2026 hanya 850.000 unit",
      "Industrial AI tumbuh ke US$153.9B pada 2030 - CAGR 23%",
      "54% pabrik masih gunakan kertas & spreadsheet"
    ]
  },

  industryContext: {
    headline: "Industri Otomotif Indonesia: Di Persimpangan Krisis",
    description: "Industri otomotif Indonesia masih punya potensi jangka panjang, tetapi realitas operasionalnya kini jauh lebih berat. Permintaan belum kembali ke level pra-pandemi, tekanan daya beli masih terasa, dan kompetisi dari elektrifikasi membuat pabrik harus bergerak lebih lincah.",
    challenges: [
      "Pasar domestik masih rapuh - penjualan belum kembali ke level kuat",
      "Target pertumbuhan tetap menuntut efisiensi tinggi",
      "Kompleksitas naik dari elektrifikasi dan regulasi emissions",
      "Skills gap meningkat - sulit temukan operator terlatih"
    ],
    market: {
      tam: "US$43.6B",
      tamLabel: "Industrial AI Market 2024",
      growth: "CAGR 23%",
      projection: "US$153.9B by 2030"
    }
  },

  problems: {
    headline: "Mengapa Plant Manager dan Eksekutif Masih Terlambat Melihat Masalah?",
    items: [
      {
        title: "KPI Tersebar di Banyak Tempat",
        description: "Produksi ada di satu sistem. Quality di file lain. Downtime di log terpisah. Delivery dan safety berjalan dengan definisi yang tidak selalu sinkron.",
        impact: "23 jam/minggu terbuang untuk konsolidasi data"
      },
      {
        title: "Dashboard Hanya Tunjukkan 'Apa yang Terjadi', Bukan 'Apa Artinya'",
        description: "Angka merah terlihat, tetapi akar masalah, dampak bisnis, dan prioritas tindakannya tidak otomatis jelas.",
        impact: "72% masalah terdeteksi setelah menjadi krisis"
      },
      {
        title: "Spreadsheet dan Pelaporan Manual",
        description: "Ketika lebih dari separuh pabrik global masih berjalan dengan spreadsheet dan kertas, keterlambatan konsolidasi menjadi masalah nyata.",
        impact: "12 jam delay mendapatkan informasi valid"
      },
      {
        title: "Eksekutif Tidak Butuh 20 Dashboard Berbeda",
        description: "Mereka butuh satu jawaban: KPI mana off-track? Apa deviasi terbesar? Apa 3 aksi yang harus diputuskan hari ini?",
        impact: "Keputusan tertunda - opportunity loss"
      },
      {
        title: "AI Sering Gagal Karena Tidak Terhubung ke Ritme Keputusan Bisnis",
        description: "Tanpa orkestrasi yang tepat, AI hanya menambah layer tool baru. Bukan mempercepat keputusan.",
        impact: "Investment waste - tool baru yang tidak dipakai"
      }
    ],
    bridge: "Masalahnya bukan kekurangan data. Masalahnya adalah terlalu banyak data, terlalu sedikit konteks, dan terlalu lambat menjadi keputusan."
  },

  solution: {
    headline: "Satu Sistem Multi-Agent untuk Membaca Pabrik Seperti Tim Analis Terbaik yang Bekerja 24/7",
    subheadline: "Dari KPI yang tersebar menjadi satu narasi eksekutif yang utuh.",
    description: "Aplikasi ini menggabungkan Agent Orchestrator dan agen spesialis untuk Produksi, Kualitas, Pengiriman, Downtime, dan Keselamatan agar setiap angka berubah menjadi status yang jelas, deviasi terhadap target, risiko terhadap customer dan operasi, dan prioritas aksi.",
    agents: [
      {
        name: "Agent Orchestrator",
        role: "Menggabungkan seluruh sinyal lintas fungsi dan menyusun ringkasan manajemen"
      },
      {
        name: "Production Agent",
        role: "Membaca output, kapasitas, utilisasi, bottleneck, dan tren performa line"
      },
      {
        name: "Quality Agent",
        role: "Mendeteksi defect, rework, scrap, complaint, dan risiko quality escape"
      },
      {
        name: "Delivery Agent",
        role: "Menilai OTIF, backlog, order risk, dan ancaman ke customer commitment"
      },
      {
        name: "Downtime Agent",
        role: "Mengidentifikasi recurring failure, critical asset, MTBF, MTTR, dan kehilangan kapasitas"
      },
      {
        name: "Safety Agent",
        role: "Membaca near miss, unsafe condition, incident, dan risiko operasional sebelum membesar"
      }
    ],
    output: [
      "Executive Summary",
      "Status KPI Utama",
      "Analisis Penyimpangan Target",
      "Top Risks",
      "3 Priority Actions",
      "Fokus Monitoring Berikutnya"
    ]
  },

  desire: {
    headline: "Bukan Sekadar Dashboard. Ini Mesin Keputusan Operasional.",
    tagline: "Untuk plant yang tidak bisa menunggu rapat berikutnya untuk tahu bahwa margin sedang bocor.",
    valuePillars: [
      {
        title: "Keputusan Lebih Cepat",
        description: "Eksekutif tidak perlu menunggu konsolidasi manual lintas fungsi. Sistem menyatukan konteks operasional secara otomatis."
      },
      {
        title: "Prioritas Lebih Tepat",
        description: "Sistem menandai apa yang berdampak paling besar pada output, kualitas, delivery, biaya, dan keselamatan."
      },
      {
        title: "Narasi Manajemen, Bukan Banjir Data",
        description: "Sistem menjawab: mengapa ini terjadi, apa dampaknya, dan apa yang harus dilakukan sekarang."
      },
      {
        title: "Cocok untuk Realitas Manufaktur Otomotif",
        description: "Saat pasar domestik masih rapuh, keunggulan operasional menjadi pembeda utama."
      },
      {
        title: "Selaras dengan Arah Industri",
        description: "Produk ini ditempatkan tepat di perpotongan quality, copilots, data architecture, dan agentic AI."
      }
    ],
    marketSignals: [
      { title: "EV Adoption", value: "103,931 unit", year: "2025", note: "Lebih dari 2x tahun sebelumnya" },
      { title: "Industrial AI Spending", value: "0.1%", note: "Masih sangat awal dari revenue" },
      { title: "Market Growth", value: "CAGR 23%", note: "Sampai 2030" }
    ]
  },

  features: {
    headline: "Apa yang Didapat Pelanggan",
    sections: [
      {
        title: "Executive Cockpit",
        items: [
          "Overall plant health",
          "KPI status merah, kuning, hijau",
          "Top 3 alerts",
          "Daily, weekly, monthly summary"
        ]
      },
      {
        title: "Variance Intelligence",
        items: [
          "Target vs actual",
          "Deviasi terbesar",
          "Cross-functional impact",
          "Risiko customer dan operasi"
        ]
      },
      {
        title: "Agentic Analysis",
        items: [
          "Multi-agent reasoning",
          "Root-cause hypothesis",
          "Exception prioritization",
          "Action recommendation"
        ]
      },
      {
        title: "Operational Drill-down",
        items: [
          "Per plant, line, shift",
          "Per machine",
          "Per customer",
          "Per product family"
        ]
      }
    ]
  },

  businessModel: {
    headline: "Model Bisnis yang Scalable",
    subtitle: "B2B SaaS + Implementation + Enterprise Services",
    tiers: [
      {
        name: "Starter",
        price: "Custom",
        period: "",
        description: "Untuk manufaktur kecil",
        features: [
          "1 plant",
          "5 KPI domains",
          "Daily dashboard",
          "Basic executive summary",
          "User terbatas"
        ],
        popular: false
      },
      {
        name: "Professional",
        price: "Custom",
        period: "",
        description: "Untuk growh dengan kebutuhan lengkap",
        features: [
          "Multi-line & multi-shift",
          "Weekly & monthly review",
          "Variance analysis lebih dalam",
          "Alert & escalation workflow",
          "Priority support"
        ],
        popular: true
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "Untuk Tier-1 & grup perusahaan",
        features: [
          "Multi-plant",
          "Custom data integration",
          "Role-based access",
          "Advanced analytics",
          "Executive benchmarking",
          "Dedicated success support"
        ],
        popular: false
      }
    ],
    revenueStreams: [
      { name: "SaaS Subscription", percentage: "65%", description: "Recurring revenue utama" },
      { name: "Implementation Fee", percentage: "20%", description: "One-time setup & integration" },
      { name: "Professional Services", percentage: "10%", description: "Custom development & consulting" },
      { name: "Premium Add-ons", percentage: "5%", description: "Predictive modules, white-label" }
    ],
    marketSize: {
      tam: "US$43.6B",
      tamLabel: "Industrial AI Global 2024",
      sam: "US$4.2B",
      samLabel: "ASEAN Manufacturing Software 2025",
      som: "US$850M",
      somLabel: "Indonesian Manufacturing ERP/MES",
      cagr: "23%",
      cagrLabel: "Sampai 2030"
    }
  },

  cta: {
    headline: "Ketika Pasar Melambat, Keunggulan Tidak Datang dari Volume Saja.",
    subheadline: "Keunggulan datang dari seberapa cepat Anda melihat masalah, memahami dampaknya, dan bertindak sebelum customer merasakannya.",
    button: "Jadwalkan Demo",
    secondary: "Minta Pilot untuk 1 Plant",
    guarantee: "Gratis konsultasi ROI analysis"
  },

  positioning: {
    statement: "Untuk manufaktur otomotif yang sudah punya banyak data tetapi masih lambat mengambil keputusan, aplikasi ini mengubah KPI lintas fungsi menjadi satu sistem executive intelligence yang cepat, jelas, dan dapat ditindaklanjuti.",
    tagline: "Dari plant data ke executive action"
  }
};

export default function LandingPage() {
  const [activeFeatureTab, setActiveFeatureTab] = useState(0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-purple-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.15),transparent_50%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-28">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-400 text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
              Multi-Agent Executive Intelligence Platform
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {landingData.hero.headline}
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto">
              {landingData.hero.subheadline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all shadow-lg shadow-teal-500/25">
                {landingData.hero.ctaPrimary}
              </button>
              <button className="px-8 py-4 bg-slate-800 border border-slate-700 text-slate-300 font-semibold rounded-xl hover:bg-slate-700 transition-all">
                {landingData.hero.ctaSecondary}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {landingData.hero.stats.map((stat, idx) => (
                <div key={idx} className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                  <div className="text-2xl font-bold text-teal-400">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                  <div className="text-xs text-slate-600 mt-1">{stat.source}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Industry Context */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{landingData.industryContext.headline}</h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">{landingData.industryContext.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {landingData.industryContext.challenges.map((challenge, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-4 border border-slate-800">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
              <p className="text-slate-300">{challenge}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <div className="text-xs text-slate-500 mb-1">TAM</div>
            <div className="text-3xl font-bold text-purple-400 mb-1">{landingData.industryContext.market.tam}</div>
            <div className="text-sm text-slate-400">{landingData.industryContext.market.tamLabel}</div>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <div className="text-xs text-slate-500 mb-1">Growth</div>
            <div className="text-3xl font-bold text-cyan-400 mb-1">{landingData.industryContext.market.growth}</div>
            <div className="text-sm text-slate-400">{landingData.industryContext.market.projection}</div>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <div className="text-xs text-slate-500 mb-1">Industry Reality</div>
            <div className="text-3xl font-bold text-amber-400 mb-1">54%</div>
            <div className="text-sm text-slate-400">Pabrik masih gunakan spreadsheet</div>
          </div>
        </div>
      </div>

      {/* Problems */}
      <div className="bg-slate-900/30 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{landingData.problems.headline}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {landingData.problems.items.map((problem, idx) => (
              <div key={idx} className="bg-slate-900/50 rounded-xl p-6 border border-slate-800 hover:border-amber-500/30 transition-colors">
                <h3 className="text-lg font-semibold text-slate-200 mb-3">{problem.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{problem.description}</p>
                <div className="bg-amber-500/10 rounded-lg p-3 border border-amber-500/20">
                  <div className="text-amber-400 font-semibold">{problem.impact}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-amber-900/30 to-teal-900/30 rounded-xl p-6 border border-amber-500/30 text-center">
            <p className="text-xl font-semibold text-amber-400">{landingData.problems.bridge}</p>
          </div>
        </div>
      </div>

      {/* Solution */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{landingData.solution.headline}</h2>
          <p className="text-slate-400 text-lg mb-4">{landingData.solution.subheadline}</p>
          <p className="text-slate-300 max-w-2xl mx-auto">{landingData.solution.description}</p>
        </div>
        
        {/* Agents */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {landingData.solution.agents.map((agent, idx) => (
            <div key={idx} className="bg-slate-900/50 rounded-xl p-5 border border-teal-500/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center">
                  <span className="text-teal-400 font-bold text-sm">{idx + 1}</span>
                </div>
                <h4 className="font-semibold text-teal-400">{agent.name}</h4>
              </div>
              <p className="text-sm text-slate-400">{agent.role}</p>
            </div>
          ))}
        </div>

        {/* Output */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
          <h3 className="text-xl font-semibold text-center mb-6">Output yang Dihasilkan</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {landingData.solution.output.map((item, idx) => (
              <div key={idx} className="bg-slate-950/50 rounded-lg p-4 text-center border border-slate-700">
                <span className="text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desire */}
      <div className="bg-slate-900/30 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{landingData.desire.headline}</h2>
            <p className="text-xl text-teal-400">{landingData.desire.tagline}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {landingData.desire.valuePillars.map((pillar, idx) => (
              <div key={idx} className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                <h4 className="font-semibold text-teal-400 mb-2">{pillar.title}</h4>
                <p className="text-sm text-slate-400">{pillar.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {landingData.desire.marketSignals.map((signal, idx) => (
              <div key={idx} className="bg-slate-900/50 rounded-xl p-5 border border-slate-800 text-center">
                <div className="text-xs text-slate-500 mb-1">{signal.title}</div>
                <div className="text-2xl font-bold text-purple-400">{signal.value}</div>
                <div className="text-xs text-slate-400 mt-1">{signal.year || signal.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{landingData.features.headline}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {landingData.features.sections.map((section, idx) => (
            <div key={idx} className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold text-teal-400 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, iidx) => (
                  <li key={iidx} className="flex items-center gap-2 text-slate-300 text-sm">
                    <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Business Model */}
      <div className="bg-slate-900/30 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{landingData.businessModel.headline}</h2>
            <p className="text-xl text-teal-400">{landingData.businessModel.subtitle}</p>
          </div>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {landingData.businessModel.tiers.map((tier, idx) => (
              <div key={idx} className={`relative bg-slate-900/50 rounded-2xl p-6 border ${
                tier.popular ? 'border-teal-500 shadow-lg shadow-teal-500/20' : 'border-slate-800'
              }`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-teal-500 text-white text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-slate-200 mb-2">{tier.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{tier.description}</p>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2 text-sm text-slate-300">
                      <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  tier.popular 
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}>
                  Hubungi Sales
                </button>
              </div>
            ))}
          </div>

          {/* Revenue Streams & Market */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-6">Revenue Streams</h3>
              <div className="space-y-4">
                {landingData.businessModel.revenueStreams.map((stream, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <div className="text-slate-200 font-medium">{stream.name}</div>
                      <div className="text-xs text-slate-500">{stream.description}</div>
                    </div>
                    <div className="text-teal-400 font-bold">{stream.percentage}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-6">Market Opportunity</h3>
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-xs text-slate-500 mb-1">TAM - Industrial AI Global</div>
                  <div className="text-2xl font-bold text-purple-400">{landingData.businessModel.marketSize.tam}</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-xs text-slate-500 mb-1">SAM - ASEAN Manufacturing</div>
                  <div className="text-2xl font-bold text-cyan-400">{landingData.businessModel.marketSize.sam}</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-teal-500/30">
                  <div className="text-xs text-slate-500 mb-1">SOM - Indonesia</div>
                  <div className="text-2xl font-bold text-teal-400">{landingData.businessModel.marketSize.som}</div>
                  <div className="text-xs text-teal-400 mt-1">{landingData.businessModel.marketSize.cagr} {landingData.businessModel.marketSize.cagrLabel}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-teal-900/30 to-slate-900"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{landingData.cta.headline}</h2>
          <p className="text-xl text-slate-400 mb-8">{landingData.cta.subheadline}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <button className="px-10 py-5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold text-lg rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all shadow-lg shadow-teal-500/25">
              {landingData.cta.button}
            </button>
            <button className="px-10 py-5 bg-slate-800 border border-slate-700 text-slate-300 font-semibold rounded-xl hover:bg-slate-700 transition-all">
              {landingData.cta.secondary}
            </button>
          </div>
          <div className="text-slate-500 text-sm">{landingData.cta.guarantee}</div>
        </div>
      </div>

      {/* Positioning */}
      <div className="border-t border-slate-800 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-lg text-teal-400 font-medium mb-4">{landingData.positioning.statement}</p>
          <p className="text-slate-500">{landingData.positioning.tagline}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-slate-200">ManufactureOS</span>
          </div>
          <div className="text-slate-500 text-sm">
            © 2026 ManufactureOS - Multi-Agent Executive Intelligence Platform
          </div>
        </div>
      </div>
    </div>
  );
}
