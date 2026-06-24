"use client";

import { useState } from "react";

const pricingData = {
  plans: [
    {
      name: "Starter",
      tagline: "Untuk memulai perjalanan digitalisasi",
      price: "Rp 5.000.000",
      period: "/bulan",
      description: "Ideal untuk IKM dengan 1-2 line produksi yang ingin mulai menggunakan AI untuk operasional",
      features: [
        { name: "3 AI Agents", included: true },
        { name: "5 Users", included: true },
        { name: "Basic Production & Quality", included: true },
        { name: "Daily Dashboard", included: true },
        { name: "Email Support", included: true },
        { name: "Standard Reports", included: true },
        { name: "Predictive Analytics", included: false },
        { name: "Multi-plant", included: false },
        { name: "API Access", included: false },
        { name: "Custom Integration", included: false },
      ],
      cta: "Mulai Gratis 14 Hari",
      popular: false
    },
    {
      name: "Professional",
      tagline: "Untuk pertumbuhan bisnis yang signifikan",
      price: "Rp 15.000.000",
      period: "/bulan",
      description: "Paket lengkap dengan semua kemampuan AI untuk manufaktur yang serius meningkatkan efisiensi",
      features: [
        { name: "10 AI Agents (Full Suite)", included: true },
        { name: "20 Users", included: true },
        { name: "All Modules", included: true },
        { name: "Predictive AI", included: true },
        { name: "Priority Support", included: true },
        { name: "API Access", included: true },
        { name: "Custom Integrations", included: true },
        { name: "Advanced Analytics", included: true },
        { name: "Multi-line & Multi-shift", included: true },
        { name: "White-label Options", included: false },
      ],
      cta: "Mulai Gratis 14 Hari",
      popular: true
    },
    {
      name: "Enterprise",
      tagline: "Untuk organisasi dengan skala besar",
      price: "Custom",
      period: "",
      description: "Solusi tailor-made untuk Tier-1 suppliers dan grup perusahaan dengan kebutuhan kompleks",
      features: [
        { name: "Unlimited AI Agents", included: true },
        { name: "Unlimited Users", included: true },
        { name: "All Features", included: true },
        { name: "On-premise Option", included: true },
        { name: "Dedicated Success Manager", included: true },
        { name: "Custom AI Training", included: true },
        { name: "SLA Guarantee", included: true },
        { name: "24/7 Priority Support", included: true },
        { name: "Executive Benchmarking", included: true },
        { name: "White-label Rights", included: true },
      ],
      cta: "Hubungi Sales",
      popular: false
    }
  ],
  comparison: {
    title: "Perbandingan Fitur",
    categories: [
      {
        name: "AI & Intelligence",
        features: [
          { name: "Jumlah AI Agents", starter: "3", professional: "10", enterprise: "Unlimited" },
          { name: "Predictive Analytics", starter: false, professional: true, enterprise: true },
          { name: "Cross-domain Correlation", starter: false, professional: true, enterprise: true },
          { name: "Root Cause Analysis AI", starter: false, professional: true, enterprise: true },
          { name: "Anomaly Detection", starter: false, professional: true, enterprise: true },
        ]
      },
      {
        name: "Modules",
        features: [
          { name: "Production Planning", starter: "Basic", professional: "Full", enterprise: "Full" },
          { name: "Quality Management", starter: true, professional: true, enterprise: true },
          { name: "Maintenance", starter: false, professional: true, enterprise: true },
          { name: "Supply Chain", starter: false, professional: true, enterprise: true },
          { name: "Workforce", starter: false, professional: true, enterprise: true },
          { name: "HSE/Safety", starter: false, professional: true, enterprise: true },
        ]
      },
      {
        name: "Reporting",
        features: [
          { name: "Daily Dashboard", starter: true, professional: true, enterprise: true },
          { name: "Weekly Review", starter: false, professional: true, enterprise: true },
          { name: "Monthly Business Review", starter: false, professional: true, enterprise: true },
          { name: "Custom Reports", starter: false, professional: true, enterprise: true },
          { name: "API Access", starter: false, professional: true, enterprise: true },
        ]
      },
      {
        name: "Support & Service",
        features: [
          { name: "Email Support", starter: true, professional: true, enterprise: true },
          { name: "Priority Response", starter: false, professional: true, enterprise: true },
          { name: "24/7 Phone Support", starter: false, professional: false, enterprise: true },
          { name: "Dedicated Success Manager", starter: false, professional: false, enterprise: true },
          { name: "On-site Training", starter: false, professional: true, enterprise: true },
          { name: "Implementation Included", starter: false, professional: true, enterprise: true },
        ]
      }
    ]
  },
  addons: [
    {
      name: "Predictive Downtime Module",
      description: "AI predictions untuk equipment failure dengan sensor integration",
      price: "+Rp 3jt/bulan"
    },
    {
      name: "Customer Risk Module",
      description: "Advanced delivery risk analysis per customer",
      price: "+Rp 2jt/bulan"
    },
    {
      name: "Supplier Risk Module",
      description: "Supplier performance monitoring dan disruption预警",
      price: "+Rp 2jt/bulan"
    },
    {
      name: "Executive Presentation Pack",
      description: "Board-ready reports dengan automated visualization",
      price: "+Rp 1jt/bulan"
    },
    {
      name: "Audit & Compliance Pack",
      description: "Enhanced documentation untuk ISO/IATF audit",
      price: "+Rp 2jt/bulan"
    }
  ],
  faq: [
    {
      question: "Apakah harga sudah termasuk implementasi?",
      answer: "Paket Professional ke atas sudah termasuk basic implementation. Untuk Enterprise, implementation scope disesuaikan dengan kebutuhan spesifik."
    },
    {
      question: "Bisakah saya try before buy?",
      answer: "Ya! Semua paket comes dengan 14-day free trial. Tidak perlu credit card. Anda bisa akses semua fitur untuk evaluasi."
    },
    {
      question: "Apa itu annual discount?",
      answer: "Bayar tahunan dapat diskon 20%. Jadi Starter Rp 48jt/tahun (equiv Rp 4jt/bulan), Professional Rp 144jt/tahun (equiv Rp 12jt/bulan)."
    },
    {
      question: "Bagaimana jika tim saya butuh training tambahan?",
      answer: "Paket Professional include 2 sesi on-site training. Tambahan training tersedia dengan rate Rp 5jt/sesi."
    }
  ]
};

export default function PricingPage() {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/20 to-slate-950"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing</h1>
            <p className="text-xl text-slate-400 mb-8">Pilih paket yang sesuai dengan kebutuhan Anda</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowComparison(false)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  !showComparison ? "bg-teal-600 text-white" : "bg-slate-800 text-slate-400"
                }`}
              >
                Paket Utama
              </button>
              <button
                onClick={() => setShowComparison(true)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  showComparison ? "bg-teal-600 text-white" : "bg-slate-800 text-slate-400"
                }`}
              >
                Perbandingan Lengkap
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      {!showComparison && (
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingData.plans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative bg-slate-900 rounded-2xl border ${
                  plan.popular
                    ? "border-teal-500 shadow-lg shadow-teal-500/20"
                    : "border-slate-800"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-teal-500 text-white text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-teal-400 mb-4">{plan.tagline}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-slate-400">{plan.period}</span>
                  </div>
                  
                  <p className="text-slate-400 text-sm mb-6">{plan.description}</p>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 text-sm">
                        {feature.included ? (
                          <svg className="w-5 h-5 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-slate-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        <span className={feature.included ? "text-slate-300" : "text-slate-600"}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      plan.popular
                        ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comparison Table */}
      {showComparison && (
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left p-4 text-slate-400 font-medium">Fitur</th>
                    <th className="text-center p-4 text-teal-400 font-bold">Starter</th>
                    <th className="text-center p-4 text-teal-400 font-bold">Professional</th>
                    <th className="text-center p-4 text-teal-400 font-bold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingData.comparison.categories.map((category, idx) => (
                    <>
                      <tr key={`cat-${idx}`} className="bg-slate-800/50">
                        <td colSpan={4} className="p-4 font-semibold text-slate-200">
                          {category.name}
                        </td>
                      </tr>
                      {category.features.map((feature, fidx) => (
                        <tr key={`${idx}-${fidx}`} className="border-b border-slate-800">
                          <td className="p-4 text-slate-300">{feature.name}</td>
                          <td className="p-4 text-center">
                            {typeof feature.starter === "boolean" ? (
                              feature.starter ? (
                                <svg className="w-5 h-5 text-teal-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5 text-slate-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              )
                            ) : (
                              <span className="text-slate-300">{feature.starter}</span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {typeof feature.professional === "boolean" ? (
                              feature.professional ? (
                                <svg className="w-5 h-5 text-teal-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5 text-slate-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              )
                            ) : (
                              <span className="text-slate-300">{feature.professional}</span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {typeof feature.enterprise === "boolean" ? (
                              feature.enterprise ? (
                                <svg className="w-5 h-5 text-teal-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5 text-slate-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              )
                            ) : (
                              <span className="text-slate-300">{feature.enterprise}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add-ons */}
      <div className="bg-slate-900/30 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-8">Premium Add-ons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pricingData.addons.map((addon, idx) => (
              <div key={idx} className="bg-slate-900 rounded-xl p-5 border border-slate-800">
                <h4 className="font-semibold text-slate-200 mb-2">{addon.name}</h4>
                <p className="text-sm text-slate-400 mb-3">{addon.description}</p>
                <div className="text-teal-400 font-bold">{addon.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-8">Pertanyaan Umum</h2>
        <div className="space-y-4">
          {pricingData.faq.map((item, idx) => (
            <div key={idx} className="bg-slate-900 rounded-xl p-5 border border-slate-800">
              <h4 className="font-medium text-slate-200 mb-2">{item.question}</h4>
              <p className="text-slate-400 text-sm">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Siap memulai?</h2>
          <p className="text-slate-400 mb-6">Mulai gratis 14 hari - tanpa credit card</p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all">
              Mulai Gratis
            </button>
            <button className="px-8 py-4 bg-slate-800 border border-slate-700 text-slate-300 font-semibold rounded-xl hover:bg-slate-700 transition-all">
              Hubungi Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
