"use client";

import { useState } from "react";

const contactData = {
  info: [
    {
      title: "Email",
      value: "hello@manufactureos.id",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    },
    {
      title: "Phone",
      value: "+62 21 1234 5678",
      icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    },
    {
      title: "Office",
      value: "Jl. TB Simatupang No.17, Jakarta Selatan 12430",
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    },
    {
      title: "Working Hours",
      value: "Mon-Fri: 9:00 - 18:00 WIB",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    }
  ],
  form: {
    fields: [
      { name: "name", label: "Nama", type: "text", placeholder: "Nama lengkap Anda" },
      { name: "email", label: "Email", type: "email", placeholder: "email@perusahaan.com" },
      { name: "company", label: "Perusahaan", type: "text", placeholder: "Nama perusahaan" },
      { name: "phone", label: "No. Telepon", type: "tel", placeholder: "+62 xxx" }
    ],
    subject: [
      "Demo Request",
      "Pricing Inquiry",
      "Technical Support",
      "Partnership",
      "Careers",
      "Other"
    ],
    message: "Pesan"
  },
  offices: [
    { city: "Jakarta", address: "Jl. TB Simatupang No.17, Jakarta Selatan", phone: "+62 21 1234 5678" },
    { city: "Surabaya", address: "Jl. Basuki Rahmat No.85, Surabaya", phone: "+62 31 123 4567" },
    { city: "Medan", address: "Jl. Diponegoro No.22, Medan", phone: "+62 61 123 456" }
  ]
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Terima kasih! Pesan Anda telah terkirim. Tim kami akan menghubungi Anda dalam 24 jam.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/20 to-slate-950"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Hubungi Kami</h1>
            <p className="text-xl text-slate-400">Kami siap membantu Anda</p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactData.info.map((info, idx) => (
            <div key={idx} className="bg-slate-900 rounded-xl p-6 border border-slate-800 text-center">
              <div className="w-12 h-12 mx-auto rounded-lg bg-teal-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={info.icon} />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-200 mb-1">{info.title}</h3>
              <p className="text-teal-400">{info.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Form & Offices */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <h2 className="text-xl font-bold mb-6">Kirim Pesan</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactData.form.fields.map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-slate-400 mb-1">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
                      value={formData[field.name as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Subjek</label>
                <select
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-teal-500"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="">Pilih subjek</option>
                  {contactData.form.subject.map((subj, idx) => (
                    <option key={idx} value={subj}>{subj}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">{contactData.form.message}</label>
                <textarea
                  rows={4}
                  placeholder="Ceritakan kebutuhan Anda..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all"
              >
                Kirim Pesan
              </button>
            </form>
          </div>

          {/* Offices */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
              <h2 className="text-xl font-bold mb-6">Kantor Perwakilan</h2>
              <div className="space-y-4">
                {contactData.offices.map((office, idx) => (
                  <div key={idx} className="border-b border-slate-800 pb-4 last:border-0">
                    <h3 className="font-semibold text-teal-400 mb-1">{office.city}</h3>
                    <p className="text-slate-400 text-sm">{office.address}</p>
                    <p className="text-slate-500 text-sm">{office.phone}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-900/30 to-cyan-900/30 rounded-2xl p-8 border border-teal-500/30">
              <h3 className="font-bold text-lg mb-2">Butuh bantuan segera?</h3>
              <p className="text-slate-400 text-sm mb-4">Hubungi kami langsung untuk konsultasi gratis</p>
              <div className="flex gap-4">
                <button className="flex-1 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors">
                  Call Now
                </button>
                <button className="flex-1 py-3 bg-slate-800 text-slate-300 rounded-lg font-medium hover:bg-slate-700 transition-colors">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-slate-900/30 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900 rounded-2xl h-64 flex items-center justify-center border border-slate-800">
            <div className="text-center">
              <svg className="w-12 h-12 text-slate-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-slate-500">Peta akan ditampilkan di sini</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
