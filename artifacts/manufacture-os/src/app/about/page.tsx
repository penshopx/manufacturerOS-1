"use client";

import { useState } from "react";

const aboutData = {
  story: {
    headline: "Cerita Kami",
    content: "ManufactureOS lahir dari pengalaman langsung menghadapi tantangan industri manufaktur Indonesia. Kami melihat bahwa pabrik-pabrik di Indonesia - terutama IKM Otomotif - memiliki potensi besar namun sering terhambat oleh sistem yang terfragmentasi, keputusan yang terlambat, dan kurangnya visibility lintas fungsi.\n\nDidirikan pada 2025 oleh tim dengan pengalaman 15+ tahun di industri manufaktur dan teknologi, kami bertekad membuat AI accessible dan useful untuk setiap pabrik, bukan hanya untuk perusahaan besar dengan budget IT besar.\n\nVisi kami: Setiap pabrik di Indonesia harus bisa merasakan manfaat AI untuk meningkatkan efisiensi, kualitas, dan daya saing - tanpa kompleksitas yang mengintimidasi."
  },
  mission: "Membawa kecerdasan buatan ke setiap lantai produksi manufaktur Indonesia, sehingga keputusan dibuat berdasarkan data, bukan intuisi semata.",
  vision: "Menjadi platform AI manufaktur nomor 1 di Indonesia dan Asia Tenggara.",
  values: [
    { name: "Simplicity", description: "Teknologi harus membuat hidup lebih mudah, tidak lebih sulit" },
    { name: "Impact", description: "Kami hanya membangun fitur yang benar-benar memberi dampak nyata" },
    { name: "Trust", description: "Kejujuran dan transparansi adalah fondasi hubungan kami" },
    { name: "Innovation", description: "Terus belajar dan berkembang untuk melayani lebih baik" },
    { name: "Customer Success", description: "Kesuksesan customer adalah ukuran kesuksesan kami" }
  ],
  team: [
    {
      name: "Ahmad Wijaya",
      role: "CEO & Co-founder",
      background: "Ex-Toyota Production Engineering, 15 tahun di industri otomotif"
    },
    {
      name: "Budi Santoso",
      role: "CTO & Co-founder",
      background: "Ex-Gojek AI Team Lead, PhD AI dari UI"
    },
    {
      name: "Dewi Lestari",
      role: "COO",
      background: "Ex-Astra Operations Director, pengalaman 20 tahun di manufaktur"
    },
    {
      name: "Hendra wijaya",
      role: "VP Engineering",
      background: "Ex-Tokopedia Senior Engineer, 10 tahun pengalaman tech startup"
    }
  ],
  timeline: [
    { year: "2025", event: "ManufactureOS didirikan", detail: "Tim inti terbentuk dengan visi membawa AI ke manufaktur Indonesia" },
    { year: "2025", event: "MVP Launch", detail: "Produk pertama dengan 3 AI agents untuk production dan quality" },
    { year: "2025", event: "First Customer", detail: "PT Indo Parts Manufacturing menjadi customer pertama" },
    { year: "2026", event: "Series Seed", detail: "Mendapat pendanaan seed round dari investor ternama" },
    { year: "2026", event: "10 AI Agents", detail: "Memperluas ke 10 specialized agents untuk semua domain manufaktur" },
    { year: "2026", event: "50+ Customers", detail: "Meraih 50+ customer dari berbagai sektor manufaktur" }
  ],
  achievements: [
    { title: "Best Manufacturing AI Startup", year: "2025", event: "Indonesia Digital Innovation Awards" },
    { title: "Top 10 B2B SaaS Southeast Asia", year: "2025", event: "E27 Echelon" },
    { title: "ISO 27001 Certified", year: "2026", event: "Information Security Management" }
  ],
  partners: [
    { name: "AWS", type: "Cloud Partner" },
    { name: "Google Cloud", type: "AI/ML Partner" },
    { name: "Microsoft", type: "Azure Partner" },
    { name: "Toyota Indonesia", type: "Pilot Customer" },
    { name: "Astra Otoparts", type: "Strategic Partner" },
    { name: "Kemenperin", type: "Government Partner" }
  ]
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 to-slate-950"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tentang ManufactureOS</h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Membangun masa depan manufaktur Indonesia dengan kecerdasan buatan
            </p>
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
          <h2 className="text-2xl font-bold mb-6">{aboutData.story.headline}</h2>
          <div className="space-y-4 text-slate-300 leading-relaxed">
            {aboutData.story.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-slate-900/30 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-xl p-8 border border-teal-500/30">
              <div className="w-12 h-12 rounded-lg bg-teal-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Misi</h3>
              <p className="text-slate-400">{aboutData.mission}</p>
            </div>
            <div className="bg-slate-900 rounded-xl p-8 border border-purple-500/30">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Visi</h3>
              <p className="text-slate-400">{aboutData.vision}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Nilai-Nilai Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {aboutData.values.map((value, idx) => (
            <div key={idx} className="bg-slate-900 rounded-xl p-5 border border-slate-800 text-center">
              <h4 className="font-bold text-teal-400 mb-2">{value.name}</h4>
              <p className="text-sm text-slate-400">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-slate-900/30 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-8">Perjalanan Kami</h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-teal-500 to-purple-500 rounded-full"></div>
            <div className="space-y-8">
              {aboutData.timeline.map((item, idx) => (
                <div key={idx} className="relative flex items-center">
                  <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ${
                    idx % 2 === 0 ? "bg-teal-500" : "bg-purple-500"
                  }`}></div>
                  <div className={`w-1/2 ${idx % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                    <div className="text-teal-400 font-bold">{item.year}</div>
                    <div className="font-semibold text-slate-200">{item.event}</div>
                    <div className="text-sm text-slate-400">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Tim Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutData.team.map((member, idx) => (
            <div key={idx} className="bg-slate-900 rounded-xl p-6 border border-slate-800 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">{member.name.charAt(0)}</span>
              </div>
              <h4 className="font-bold text-slate-200">{member.name}</h4>
              <p className="text-teal-400 text-sm mb-2">{member.role}</p>
              <p className="text-xs text-slate-500">{member.background}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-slate-900/30 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-8">Pencapaian</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aboutData.achievements.map((achievement, idx) => (
              <div key={idx} className="bg-slate-900 rounded-xl p-5 border border-slate-800 text-center">
                <div className="text-teal-400 font-bold mb-1">{achievement.year}</div>
                <h4 className="font-semibold text-slate-200 mb-1">{achievement.title}</h4>
                <p className="text-sm text-slate-500">{achievement.event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Partner & Customer</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {aboutData.partners.map((partner, idx) => (
            <div key={idx} className="px-6 py-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-slate-300">{partner.name}</span>
              <span className="text-slate-600 mx-2">|</span>
              <span className="text-teal-400 text-sm">{partner.type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Bergabung dengan Kami</h2>
          <p className="text-slate-400 mb-6">Mari一起membangun masa depan manufaktur Indonesia</p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all">
              Hubungi Kami
            </button>
            <button className="px-8 py-4 bg-slate-800 border border-slate-700 text-slate-300 font-semibold rounded-xl hover:bg-slate-700 transition-all">
              Lihat Careers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
