"use client";

import { useState } from "react";

const faqData = {
  general: [
    {
      question: "Apa itu ManufactureOS?",
      answer: "ManufactureOS adalah platform AI multi-agent untuk manufaktur seringkamampuan mengoordinasikan 10+ agen AI yang bekerja secara terintegrasi untuk mengelola operasi pabrik - dari produksi, kualitas, pemeliharaan, hingga keselamatan kerja. Platform ini mengubah data operasional menjadi keputusan eksekutif yang cepat, jelas, dan dapat ditindaklanjuti."
    },
    {
      question: "Apa bedanya dengan ERP atau MES konvensional?",
      answer: "ERP dan MES konvensional adalah sistem pencatatan yang membutuhkan input manual dan hanya menampilkan data historis. ManufactureOS menggunakan AI untuk menganalisis data secara real-time, memprediksi masalah sebelum terjadi, dan memberikan rekomendasi tindakan. Ini bukan sekadar dashboard - ini adalah asisten eksekutif yang bekerja 24/7."
    },
    {
      question: "Siapa target pengguna utama?",
      answer: "Plant Manager, Production Manager, Quality Manager, Maintenance Manager, HSE Manager, Operations Director, dan C-Suite executives di industri manufaktur - khususnya sektor otomotif dan komponen."
    },
    {
      question: "Apakah bisa diintegrasikan dengan sistem yang sudah ada?",
      answer: "Ya, ManufactureOS dirancang dengan arsitektur API-first. Kami mendukung integrasi dengan SAP, Oracle, Microsoft Dynamics, MES custom, QMS, CMMS, dan sistem IoT/sensor. Tim implementation kami akan membantu proses integrasi."
    },
    {
      question: "Berapa lama waktu implementasi?",
      answer: "Untuk paket Starter: 2-4 minggu. Professional: 4-8 minggu. Enterprise: 8-16 minggu tergantung kompleksitas. Pilot bisa dimulai dalam 1 minggu."
    }
  ],
  technical: [
    {
      question: "Platform apa yang digunakan untuk AI?",
      answer: "ManufactureOS menggunakan Open CLAW (Command Language for Autonomous Workflows) sebagai basis arsitektur multi-agent. Setiap agen AI dilatih dengan domain knowledge manufaktur dan automotive industry standards."
    },
    {
      question: "Apakah data saya aman?",
      answer: "Kami menggunakan enkripsi AES-256 untuk data at-rest dan TLS 1.3 untuk data in-transit. Data disimpan di datacenter Indonesia (AWS Jakarta) dengan backup otomatis. SOC 2 Type II certification sedang dalam proses."
    },
    {
      question: "Apakah bisa on-premise?",
      answer: "Ya, untuk paket Enterprise kami menyediakan opsi deployment on-premise atau hybrid cloud. Ini penting untuk perusahaan dengan kebijakan data yang ketat."
    },
    {
      question: "Bagaimana dengan compliance terhadap standar industri?",
      answer: "ManufactureOS sudah dirancang dengan kepatuhan terhadap ISO 9001, IATF 16949, ISO 45001, dan Toyota SQAM. Sistem ini audit-ready dengan complete audit trail dan dokumentasi otomatis."
    },
    {
      question: "Berapa uptime guarantee?",
      answer: "SLA 99.9% uptime untuk paket Professional dan Enterprise. Ini translate ke maximum 8.76 jam downtime per tahun."
    }
  ],
  pricing: [
    {
      question: "Bagaimana struktur pricing?",
      answer: "Kami menggunakan model SaaS subscription per plant per bulan. Harga bervariasi berdasarkan jumlah agent AI yang digunakan, jumlah user, dan kompleksitas integrasi. Hubungi tim sales untuk mendapatk quotescustom."
    },
    {
      question: "Apakah ada free trial?",
      answer: "Ya, kami提供14天免费试用无需信用卡。Selama periode trial, Anda bisa mengakses semua fitur Profesional untuk evaluasi penuh."
    },
    {
      question: "Apa yang termasuk dalam implementasi?",
      answer: "Implementation fee mencakup: data mapping, KPI configuration, agent orchestration setup, dashboard customization, user training, dan go-live support. Tidak ada biaya tersembunyi."
    },
    {
      question: "Bisakah upgrade atau downgrade paket?",
      answer: "Ya, Anda bisa upgrade atau downgrade kapan saja. Perubahan akan efektif di billing cycle berikutnya. Proses upgrade biasanya selesai dalam 24 jam."
    },
    {
      question: "Apakah ada diskon untuk yearly payment?",
      answer: "Ya, annual payment mendapat diskon 20%. Banyak perusahaan memilih yearly untuk budget certainty dan mejor pricing."
    }
  ],
  support: [
    {
      question: "Bagaimana bentuk dukungan teknis?",
      answer: "Starter: Email support dengan response time 24 jam. Professional: Priority email + chat dengan response 4 jam. Enterprise: Dedicated success manager + 24/7 phone support + SLA response 1 jam."
    },
    {
      question: "Apakah ada training untuk tim?",
      answer: "Ya, semua paket termasuk online training modules. Paket Professional dan Enterprise termasuk on-site training dan quarterly business review dengan customer success team."
    },
    {
      question: "Apa itu Customer Success Program?",
      answer: "Program ini memastikan Anda mendapat value maksimal dari platform. Termasuk: regular check-ins, best practices sharing, new feature onboarding, dan proactive health checks."
    },
    {
      question: "Bagaimana jika ada bug atau masalah kritis?",
      answer: "Untuk bugs, kami menggunakan incident response process dengan target resolution: Critical (1 jam), High (4 jam), Medium (24 jam), Low (1 minggu). Untuk masalah kritis, escalation path langsung ke engineering leadership."
    }
  ]
};

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = [
    { id: "general", label: "General" },
    { id: "technical", label: "Technical" },
    { id: "pricing", label: "Pricing" },
    { id: "support", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-slate-400 text-lg">Jawaban untuk pertanyaan yang sering diajukan</p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-teal-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {faqData[activeCategory as keyof typeof faqData].map((faq, idx) => (
            <div
              key={idx}
              className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between hover:bg-slate-800/50 transition-colors"
              >
                <span className="font-medium text-slate-200 pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                    openFaq === idx ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5">
                  <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-teal-900/30 to-cyan-900/30 rounded-xl p-8 border border-teal-500/30 text-center">
          <h3 className="text-xl font-semibold mb-2">Masih ada pertanyaan?</h3>
          <p className="text-slate-400 mb-4">Tim kami siap membantu Anda</p>
          <button className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors">
            Hubungi Kami
          </button>
        </div>
      </div>
    </div>
  );
}
