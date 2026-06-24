"use client";

import { useState, useEffect } from "react";

const agentLogs = [
  { agent: "Production", time: "09:15:32", action: "Detected bottleneck at Line 4", status: "warning", detail: "Output 15% below target" },
  { agent: "Quality", time: "09:14:18", action: "NCR auto-generated", status: "info", detail: "Defect pattern detected: Surface Scratch" },
  { agent: "Compliance", time: "09:13:05", action: "Audit readiness score updated", status: "success", detail: "Score: 78% (+2% from yesterday)" },
  { agent: "Production", time: "09:12:45", action: "Shift handover completed", status: "success", detail: "Shift B took over Line 1-3" },
  { agent: "HSE", time: "09:11:22", action: "Near-miss logged", status: "warning", detail: "Area: Assembly - Forklift path" },
  { agent: "Quality", time: "09:10:00", action: "PPM updated", status: "success", detail: "Current: 850 PPM (Target: <1000)" },
  { agent: "Production", time: "09:08:33", action: "OEE Alert", status: "warning", detail: "Line 2 OEE dropped to 72%" },
  { agent: "Compliance", time: "09:05:17", action: "Document reminder", status: "info", detail: "IATF checklist due today" },
];

const metrics = [
  { label: "OEE", value: "82.3%", change: "+2.1%", trend: "up" },
  { label: "PPM", value: "850", change: "-50", trend: "down" },
  { label: "Output", value: "12,450", change: "+1,200", trend: "up" },
  { label: "NCR Open", value: "4", change: "-2", trend: "down" },
  { label: "Safety Score", value: "87", change: "+3", trend: "up" },
  { label: "Audit Ready", value: "78%", change: "+2%", trend: "up" },
];

const recommendations = [
  { priority: "high", title: "Line 4 Bottleneck", desc: "Consider 2 hours overtime to catch up target", agent: "Production" },
  { priority: "high", title: "Surface Scratch Pattern", desc: "Check die alignment on Press #3", agent: "Quality" },
  { priority: "medium", title: "IATF Document Due", desc: "Complete checklist before 5 PM audit", agent: "Compliance" },
  { priority: "low", title: "Training Reminder", desc: "3 operators need refresher course", agent: "HSE" },
];

const chatMessages = [
  { role: "assistant", content: "Halo! Saya ManufactureOS AI. Ada yang bisa saya bantu hari ini? Coba tanyakan tentang produksi, kualitas, atau audit." },
];

const sampleQueries = [
  "Apa masalah paling kritis hari ini?",
  "Mengapa Line 4 output turun?",
  "Siapkan draf laporan quality",
  "Berapa OEE saat ini?",
  "Apa NCR terbaru?",
  "Siapa operator shift malam?",
];

export default function AIDemoPage() {
  const [activeTab, setActiveTab] = useState<"monitoring" | "chat" | "actions">("monitoring");
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentMetric, setCurrentMetric] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages([...messages, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responses: Record<string, string> = {
        default: "Terima kasih pertanyaan Anda. Untuk informasi lebih detail, saya sarankan mengakses menu Produksi atau Kualitas.",
        masalah: "Berdasarkan analisis data, masalah paling kritis saat ini adalah bottleneck di Line 4 dengan output 15% di bawah target. Rekomendasi: pertimbangkan lembur 2 jam hari ini.",
        oee: "OEE saat ini: 82.3% (Availability: 85%, Performance: 90%, Quality: 98%). Ini naik 2.1% dari kemarin.",
        ncr: "Saat ini ada 4 NCR terbuka. Terbaru: NCR-2026-0317-004 dengan defect Surface Scratch di Line 2. Severity: Minor.",
        line: "Line 4 mengalami bottleneck akibat downtime 45 menit di mesin stamping #04. Penyebab: material jam. Rekomendasi:调度 ulang maintenance.",
        quality: "PPM saat ini: 850 (Target: <1000). SQAM Grade: A. Defect utama: Surface Scratch (45%), Dimension (28%).",
        audit: "Audit Readiness Score: 78%. Sudah naik 2% dari kemarin. Checklist IATF 16949: 85% complete.Reminder: Dokumen perlu dilengkapi hari ini.",
      };

      const lowerInput = input.toLowerCase();
      let response = responses.default;
      if (lowerInput.includes("masalah") || lowerInput.includes("kritis")) response = responses.masalah;
      else if (lowerInput.includes("oee")) response = responses.oee;
      else if (lowerInput.includes("ncr") || lowerInput.includes("defect")) response = responses.ncr;
      else if (lowerInput.includes("line") || lowerInput.includes("output") || lowerInput.includes("turun")) response = responses.line;
      else if (lowerInput.includes("quality") || lowerInput.includes("ppm") || lowerInput.includes("kualitas")) response = responses.quality;
      else if (lowerInput.includes("audit")) response = responses.audit;

      setMessages([...messages, userMsg, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-emerald-400";
      case "warning": return "text-amber-400";
      case "error": return "text-red-400";
      default: return "text-blue-400";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-50 mb-2">🤖 AI Command Center - Live Demo</h1>
          <p className="text-slate-400">Experience how ManufactureOS AI Agents work in real-time</p>
        </div>

        <div className="flex gap-4 mb-6">
          {[
            { id: "monitoring", label: "📊 Live Monitoring", icon: "📊" },
            { id: "chat", label: "💬 AI Chat", icon: "💬" },
            { id: "actions", label: "⚡ AI Actions", icon: "⚡" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                activeTab === tab.id ? "bg-teal-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "monitoring" && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <h3 className="font-semibold text-slate-50 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live Agent Activity Stream
                </h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {agentLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-3 bg-slate-700/50 rounded-lg">
                      <div className="text-xs text-slate-500 font-mono w-20">{log.time}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            log.agent === "Production" ? "bg-blue-500/20 text-blue-400" :
                            log.agent === "Quality" ? "bg-green-500/20 text-green-400" :
                            log.agent === "Compliance" ? "bg-purple-500/20 text-purple-400" :
                            "bg-red-500/20 text-red-400"
                          }`}>{log.agent}</span>
                          <span className={`text-sm ${getStatusColor(log.status)}`}>{log.action}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{log.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <h3 className="font-semibold text-slate-50 mb-4">📈 Real-time KPI Animation</h3>
                <div className="grid grid-cols-3 gap-4">
                  {metrics.map((metric, idx) => (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-xl border transition-all duration-500 ${
                        currentMetric === idx ? "bg-teal-600/20 border-teal-500 scale-105" : "bg-slate-700/50 border-slate-600"
                      }`}
                    >
                      <div className="text-xs text-slate-400 mb-1">{metric.label}</div>
                      <div className="text-2xl font-bold text-slate-50">{metric.value}</div>
                      <div className={`text-xs ${metric.trend === "up" ? "text-emerald-400" : "text-amber-400"}`}>
                        {metric.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-teal-600/20 to-emerald-600/20 rounded-xl p-5 border border-teal-500/30">
                <h3 className="font-semibold text-teal-400 mb-3">🎯 AI Recommendations</h3>
                <div className="space-y-3">
                  {recommendations.map((rec, idx) => (
                    <div key={idx} className={`p-3 rounded-lg border ${getPriorityColor(rec.priority)}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium uppercase">{rec.priority}</span>
                        <span className="text-xs text-slate-500">• {rec.agent}</span>
                      </div>
                      <div className="text-sm font-medium text-slate-200">{rec.title}</div>
                      <div className="text-xs text-slate-400 mt-1">{rec.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <h3 className="font-semibold text-slate-50 mb-3">🏭 Factory Status</h3>
                <div className="space-y-3">
                  {["Line 1", "Line 2", "Line 3", "Line 4"].map((line, idx) => (
                    <div key={line} className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">{line}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        idx === 3 ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"
                      }`}>
                        {idx === 3 ? "⚠️ Warning" : "✓ Running"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "chat" && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="p-4 border-b border-slate-700 bg-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                    <span className="text-xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-50">ManufactureOS AI</h3>
                    <p className="text-xs text-emerald-400">Online • Ready to assist</p>
                  </div>
                </div>
              </div>

              <div className="h-[500px] overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] p-4 rounded-xl ${
                      msg.role === "user" ? "bg-teal-600 text-white" : "bg-slate-700 text-slate-200"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-700 text-slate-200 p-4 rounded-xl">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-slate-700">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Ask about your factory..."
                    className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-400 focus:outline-none focus:border-teal-500"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <h3 className="font-semibold text-slate-50 mb-4">💡 Sample Queries</h3>
                <div className="space-y-2">
                  {sampleQueries.map((query, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setInput(query); sendMessage(); }}
                      className="w-full text-left px-4 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-5 border border-blue-500/30">
                <h3 className="font-semibold text-slate-50 mb-2">🔧 Supported Actions</h3>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Generate NCR reports</li>
                  <li>• Create Work Orders</li>
                  <li>• Analyze production trends</li>
                  <li>• Prepare audit documents</li>
                  <li>• Calculate OEE/PPM</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "actions" && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <h3 className="font-semibold text-slate-50 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-teal-500 animate-pulse"></span>
                Recent AI Actions
              </h3>
              <div className="space-y-3">
                {[
                  { action: "Auto-generated NCR-2026-0317-004", time: "2 min ago", type: "quality" },
                  { action: "Sent overtime alert to Line 4 supervisor", time: "5 min ago", type: "production" },
                  { action: "Updated Audit Readiness Score", time: "8 min ago", type: "compliance" },
                  { action: "Created draft Purchase Request for material", time: "15 min ago", type: "purchasing" },
                  { action: "Logged near-miss incident", time: "22 min ago", type: "hse" },
                  { action: "Calculated OEE for all lines", time: "25 min ago", type: "production" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div>
                      <div className="text-sm text-slate-200">{item.action}</div>
                      <div className="text-xs text-slate-500">{item.time}</div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.type === "quality" ? "bg-green-500/20 text-green-400" :
                      item.type === "production" ? "bg-blue-500/20 text-blue-400" :
                      item.type === "compliance" ? "bg-purple-500/20 text-purple-400" :
                      item.type === "hse" ? "bg-red-500/20 text-red-400" :
                      "bg-amber-500/20 text-amber-400"
                    }`}>{item.type}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <h3 className="font-semibold text-slate-50 mb-4">⚡ Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Buat NCR", icon: "📋", color: "bg-green-600" },
                  { label: "Buat Work Order", icon: "🔧", color: "bg-blue-600" },
                  { label: "Cek OEE", icon: "📊", color: "bg-purple-600" },
                  { label: "Laporan Audit", icon: "📝", color: "bg-amber-600" },
                  { label: "Cek PPM", icon: "🎯", color: "bg-red-600" },
                  { label: "Cek Safety", icon: "🛡️", color: "bg-teal-600" },
                ].map((action, idx) => (
                  <button
                    key={idx}
                    className={`${action.color} hover:opacity-90 text-white p-4 rounded-xl font-medium transition-all hover:scale-105 flex items-center gap-2`}
                  >
                    <span>{action.icon}</span>
                    {action.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
                <h4 className="text-sm font-medium text-slate-300 mb-2">🤖 Agent Performance Today</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Production Agent</span>
                    <span className="text-emerald-400">12 actions</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Quality Agent</span>
                    <span className="text-emerald-400">8 actions</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Compliance Agent</span>
                    <span className="text-emerald-400">5 actions</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">HSE Agent</span>
                    <span className="text-emerald-400">3 actions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
