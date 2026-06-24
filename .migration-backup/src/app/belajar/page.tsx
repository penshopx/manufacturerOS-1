"use client";

import { useState } from "react";

const courses = [
  { id: 1, title: "Toyota Production System (TPS) Fundamentals", category: "Produksi", progress: 75, duration: "4 jam", level: "Dasar" },
  { id: 2, title: "SQAM Quality Control Excellence", category: "Kualitas", progress: 100, duration: "6 jam", level: "Menengah" },
  { id: 3, title: "K3 Keselamatan Kerja certification", category: "K3", progress: 30, duration: "8 jam", level: "Wajib" },
  { id: 4, title: "IATF 16949:2016 Implementation", category: "Audit", progress: 0, duration: "10 jam", level: "Lanjutan" },
  { id: 5, title: "OEE & Productivity Optimization", category: "Produksi", progress: 45, duration: "3 jam", level: "Menengah" },
  { id: 6, title: "5S Workplace Organization", category: "Produksi", progress: 100, duration: "2 jam", level: "Dasar" },
];

const ebooks = [
  { id: 1, title: "Panduan Lengkap TPS untuk IKM Otomotif", pages: 124, format: "PDF", category: "Produksi" },
  { id: 2, title: "SQAM Compliance Handbook", pages: 89, format: "PDF", category: "Kualitas" },
  { id: 3, title: "IATF 16949 Checklist & Guidelines", pages: 156, format: "PDF", category: "Audit" },
  { id: 4, title: "K3 Manual & Emergency Procedures", pages: 67, format: "PDF", category: "K3" },
  { id: 5, title: "Predictive Maintenance Best Practices", pages: 98, format: "PDF", category: "Maintenance" },
  { id: 6, title: "Warehouse Management System Guide", pages: 78, format: "PDF", category: "Gudang" },
];

const chatTopics = [
  "Cara membuat NCR otomatis",
  "Cara menghitung OEE dengan benar",
  "Prosedur K3 untuk maintenance",
  "Langkah-langkah audit IATF 16949",
  "Penjelasan grading SQAM",
  "Cara mengoptimalkan produksi line",
];

export default function BelajarPage() {
  const [activeTab, setActiveTab] = useState<"chatbot" | "courses" | "ebooks">("chatbot");
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "Halo! Saya asisten AI ManufactureOS. Ada yang bisa saya bantu tentang proses produksi, quality, K3, atau compliance? Tanyakan apapun!" }
  ]);
  const [chatInput, setChatInput] = useState("");

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMessage = { role: "user", content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      const responses: Record<string, string> = {
        "default": "Terima kasih pertanyaan Anda. Untuk informasi lebih detail, saya sarankan untuk mengakses menu terkait di ManufactureOS atau mengikuti kursus yang tersedia.",
        "ncr": "Untuk membuat NCR (Non-Conformance Report), pergi ke menu Kualitas > NCR. Isi formulir dengan detail produk, jenis defect, dan penyebab. AI akan membantu generate laporan otomatis.",
        "oee": "OEE = Availability × Performance × Quality. Availability = Run Time / Planned Production Time. Performance = (Ideal Cycle Time × Total Count) / Run Time. Quality = Good Count / Total Count.",
        "k3": "Prosedur K3: 1) Identifikasi hazard, 2) Risk assessment, 3) Implementasi kontrol, 4) Pakai APD, 5) Emergency response plan. Semua worker wajib Safety Induction!",
        "sqam": "Toyota SQAM Grade: Grade A (<0.1% defect), Grade B (0.1-0.5%), Grade C (0.5-1.0%), Grade D (>1.0%). Target utama adalah Grade A dengan PPM <1000.",
      };
      
      const lowerInput = chatInput.toLowerCase();
      let response = responses.default;
      if (lowerInput.includes("ncr")) response = responses.ncr;
      else if (lowerInput.includes("oee")) response = responses.oee;
      else if (lowerInput.includes("k3") || lowerInput.includes("keselamatan")) response = responses.k3;
      else if (lowerInput.includes("sqam") || lowerInput.includes("quality") || lowerInput.includes("kualitas")) response = responses.sqam;
      
      setChatMessages(prev => [...prev, { role: "assistant", content: response }]);
    }, 500);
    
    setChatInput("");
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-50 mb-2">Pusat Pembelajaran</h1>
          <p className="text-slate-400">Ekosistem kompetensi: belajar, bertanya, dan tingkatkan kemampuan Anda</p>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("chatbot")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "chatbot" 
                ? "bg-teal-600 text-white" 
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            {"🤖"} AI Chatbot
          </button>
          <button
            onClick={() => setActiveTab("courses")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "courses" 
                ? "bg-teal-600 text-white" 
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            {"📚"} E-Courses
          </button>
          <button
            onClick={() => setActiveTab("ebooks")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "ebooks" 
                ? "bg-teal-600 text-white" 
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            {"📖"} E-Books
          </button>
        </div>

        {activeTab === "chatbot" && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="p-4 border-b border-slate-700 bg-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                    <span className="text-xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-50">ManufactureOS Assistant</h3>
                    <p className="text-xs text-emerald-400">Online • Siap membantu</p>
                  </div>
                </div>
              </div>
              
              <div className="h-[500px] overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] p-4 rounded-xl ${
                      msg.role === "user" 
                        ? "bg-teal-600 text-white" 
                        : "bg-slate-700 text-slate-200"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-slate-700">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Tulis pertanyaan Anda..."
                    className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-400 focus:outline-none focus:border-teal-500"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Kirim
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <h3 className="font-semibold text-slate-50 mb-4">Topik Populer</h3>
                <div className="space-y-2">
                  {chatTopics.map((topic, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setChatInput(topic); sendMessage(); }}
                      className="w-full text-left px-4 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-teal-600/20 to-emerald-600/20 rounded-xl p-5 border border-teal-500/30">
                <h3 className="font-semibold text-slate-50 mb-2">{"💡"} Tips</h3>
                <p className="text-sm text-slate-400">
                  Tanyakan tentang prosedur, rumus OEE, standar kualitas, atau panduan compliance. AI siap membantu 24/7!
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <div className="text-3xl font-bold text-teal-400">6</div>
                <div className="text-sm text-slate-400">Total Courses</div>
              </div>
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <div className="text-3xl font-bold text-emerald-400">4</div>
                <div className="text-sm text-slate-400">Selesai</div>
              </div>
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <div className="text-3xl font-bold text-amber-400">33j</div>
                <div className="text-sm text-slate-400">Total Durasi</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-teal-500/50 transition-colors">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          course.category === "Produksi" ? "bg-blue-500/20 text-blue-400" :
                          course.category === "Kualitas" ? "bg-green-500/20 text-green-400" :
                          course.category === "K3" ? "bg-red-500/20 text-red-400" :
                          "bg-purple-500/20 text-purple-400"
                        }`}>
                          {course.category}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-400 ml-2">
                          {course.level}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">{course.duration}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-slate-50 mb-4">{course.title}</h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-teal-400">{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <button className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition-colors">
                      {course.progress === 0 ? "Mulai Kursus" : course.progress === 100 ? "Ulangi Kursus" : "Lanjutkan"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "ebooks" && (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <div className="text-3xl font-bold text-teal-400">6</div>
                <div className="text-sm text-slate-400">Total Books</div>
              </div>
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <div className="text-3xl font-bold text-blue-400">612</div>
                <div className="text-sm text-slate-400">Total Halaman</div>
              </div>
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <div className="text-3xl font-bold text-emerald-400">6</div>
                <div className="text-sm text-slate-400">PDF Ready</div>
              </div>
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <div className="text-3xl font-bold text-amber-400">GRATIS</div>
                <div className="text-sm text-slate-400">Akses Penuh</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {ebooks.map((ebook) => (
                <div key={ebook.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-teal-500/50 transition-colors">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                        <span className="text-xl">📄</span>
                      </div>
                      <div>
                        <span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-400">
                          {ebook.format}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-slate-50 mb-2">{ebook.title}</h3>
                    
                    <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                      <span>{ebook.pages} halaman</span>
                      <span className={`px-2 py-1 rounded-full ${
                        ebook.category === "Produksi" ? "bg-blue-500/20 text-blue-400" :
                        ebook.category === "Kualitas" ? "bg-green-500/20 text-green-400" :
                        ebook.category === "K3" ? "bg-red-500/20 text-red-400" :
                        ebook.category === "Audit" ? "bg-purple-500/20 text-purple-400" :
                        "bg-amber-500/20 text-amber-400"
                      }`}>
                        {ebook.category}
                      </span>
                    </div>
                    
                    <button className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                      <span>📥</span> Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
