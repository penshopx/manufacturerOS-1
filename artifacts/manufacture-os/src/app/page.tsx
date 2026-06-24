"use client";

import { useState } from "react";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Dashboard Overview</h1>
          <p className="text-slate-400">Ringkasan operasional pabrik hari ini</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Last updated: 10:45 WIB</span>
        </div>
      </div>

      <AICommandCenter />
      
      <AIOrchestrator />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProductionSummary />
        <QualitySummary />
        <K3Summary />
      </div>

      <DailySummary />

      <KPITrends />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductionLines />
        <RecentDefects />
      </div>
    </div>
  );
}

function AICommandCenter() {
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState<{q: string; a: string; type: string}[]>([
    { q: "Status produksi hari ini?", a: "Line 1: 92% OEE (running), Line 2: delay 15 menit (material shortage), Line 3: 88% OEE (running), Line 4: maintenance", type: "production" },
    { q: "Ada alert quality?", a: "2 defect terdeteksi di Line 1 (surface scratch). Root cause: fixture wear. Grade SQAM tetap A (0.08% defect rate)", type: "quality" },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    const responses_ = [...responses];
    let response = "";
    let type = "general";
    
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes("produksi") || lowerQuery.includes("oee") || lowerQuery.includes("line")) {
      response = "Line 1: 92% OEE (running optimal), Line 2: delay 15 menit (material shortage), Line 3: 88% OEE (running), Line 4: maintenance scheduled. Target harian 1,200 unit, saat ini 936 unit (78%).";
      type = "production";
    } else if (lowerQuery.includes("quality") || lowerQuery.includes("defect") || lowerQuery.includes("sqam")) {
      response = "Defect rate: 0.08% (di bawah target 0.1%). 2 defect terbuka: surface scratch di Line 1. SQAM Grade: A. PPM: 800.";
      type = "quality";
    } else if (lowerQuery.includes("k3") || lowerQuery.includes("safety") || lowerQuery.includes("insiden")) {
      response = "Safety Score: 87/100. Zero accident 30 hari. 3 hazard reports terbuka. PPE compliance: 85% (target 95%).";
      type = "safety";
    } else if (lowerQuery.includes("audit") || lowerQuery.includes("compliance")) {
      response = "ISO 9001: 85% ready, IATF 16949: 72% ready, ISO 45001: 90% ready. Audit schedule: 15 April 2026.";
      type = "audit";
    } else {
      response = "Aku akan menganalisis data dan memberikan rekomendasi. Untuk informasi lebih spesifik, pilih kategori: Produksi, Quality, K3, atau Audit.";
    }
    
    responses_.unshift({ q: query, a: response, type });
    setResponses(responses_);
    setQuery("");
  };

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 border border-teal-500/30">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center animate-glow">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-50">AI Command Center</h2>
          <p className="text-sm text-slate-400">Tanyakan dengan bahasa natural - Aku akan menganalisis & mengeksekusi</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Contoh: 'Berapa OEE hari ini?' atau 'Ada defect baru?' atau 'Buat NCR untuk Line 1'"
            className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 pl-12 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
          <svg className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <button
            type="submit"
            className="absolute right-2 top-2 px-3 py-1.5 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors"
          >
            Ask
          </button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => setQuery("Status produksi hari ini?")} className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-xs text-slate-300 transition-colors">
          📊 Produksi
        </button>
        <button onClick={() => setQuery("Ada alert quality?")} className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-xs text-slate-300 transition-colors">
          ✓ Quality
        </button>
        <button onClick={() => setQuery("Status K3 hari ini?")} className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-xs text-slate-300 transition-colors">
          🛡️ K3
        </button>
        <button onClick={() => setQuery("Kesiapan audit?")} className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-xs text-slate-300 transition-colors">
          📋 Audit
        </button>
        <button onClick={() => setQuery("Buat NCR untuk defect di Line 1")} className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 rounded-lg text-xs text-amber-400 transition-colors">
          ⚡ Buat NCR
        </button>
        <button onClick={() => setQuery("Buat work order untuk maintenance")} className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-xs text-blue-400 transition-colors">
          ⚡ Buat WO
        </button>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {responses.map((resp, idx) => (
          <div key={idx} className="p-3 bg-slate-700/30 rounded-lg">
            <p className="text-xs text-slate-400 mb-1">Q: {resp.q}</p>
            <p className={`text-sm ${
              resp.type === "production" ? "text-teal-400" :
              resp.type === "quality" ? "text-emerald-400" :
              resp.type === "safety" ? "text-amber-400" :
              resp.type === "audit" ? "text-purple-400" : "text-slate-300"
            }`}>
              A: {resp.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIOrchestrator() {
  const agents = [
    { name: "Production Agent", status: "active", tasks: 12, description: "Monitor OEE, bottleneck, delay prediction", icon: "⚙️", color: "from-blue-500 to-cyan-500" },
    { name: "Quality Agent", status: "active", tasks: 8, description: "Track defect, NCR, batch traceability", icon: "✓", color: "from-emerald-500 to-teal-500" },
    { name: "K3 Agent", status: "warning", tasks: 3, description: "Safety monitoring, PPE compliance", icon: "🛡️", color: "from-amber-500 to-orange-500" },
    { name: "Audit Agent", status: "idle", tasks: 0, description: "Checklist IATF, evidence tracking", icon: "📋", color: "from-purple-500 to-indigo-500" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-50">AI Orchestrator</h2>
            <p className="text-sm text-slate-400">Koordinasi Specialist Agents - Human-in-the-Loop</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="text-sm text-emerald-400 font-medium">Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((agent, idx) => (
          <div
            key={idx}
            className={`relative p-4 rounded-xl bg-gradient-to-br ${agent.color} bg-opacity-10 border border-slate-600 hover:border-slate-500 transition-all cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{agent.icon}</span>
              <span className={`w-2 h-2 rounded-full ${
                agent.status === "active" ? "bg-emerald-500" :
                agent.status === "warning" ? "bg-amber-500" : "bg-slate-500"
              }`}></span>
            </div>
            <h3 className="font-semibold text-slate-50 mb-1">{agent.name}</h3>
            <p className="text-xs text-slate-400 mb-2">{agent.description}</p>
            <p className="text-xs text-teal-400">{agent.tasks} tasks aktif</p>
            <div className="mt-3 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${
                    i < (agent.status === "active" ? 5 : agent.status === "warning" ? 3 : 1)
                      ? agent.status === "active" ? "bg-emerald-500" : agent.status === "warning" ? "bg-amber-500" : "bg-slate-500"
                      : "bg-slate-700"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-sm font-medium text-teal-400">Recent Agent Actions</span>
        </div>
        <div className="space-y-2 text-sm text-slate-400">
          <p>• <span className="text-blue-400">Production Agent</span>: Prediksi delay di Line 2 - Material shortage terdeteksi</p>
          <p>• <span className="text-emerald-400">Quality Agent</span>: Defect rate meningkat 0.02% - Alert ke QC Supervisor + Draft NCR dibuat</p>
          <p>• <span className="text-amber-400">K3 Agent</span>: PPE compliance check diperlukan di Area Welding (85%)</p>
        </div>
      </div>
    </div>
  );
}

function ProductionSummary() {
  const progress = 78;
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Produksi Harian</h3>
        <span className="text-xs text-slate-400">Target: 1,200 unit</span>
      </div>
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle cx="64" cy="64" r="56" stroke="#334155" strokeWidth="12" fill="none" />
          <circle
            cx="64" cy="64" r="56"
            stroke="#0D9488" strokeWidth="12" fill="none"
            strokeDasharray={`${progress * 3.52} 352`}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-slate-50">{progress}%</span>
        </div>
      </div>
      <div className="flex justify-between text-sm">
        <div>
          <p className="text-slate-400">Actual</p>
          <p className="font-semibold text-slate-50">936 unit</p>
        </div>
        <div className="text-right">
          <p className="text-slate-400">Remaining</p>
          <p className="font-semibold text-amber-400">264 unit</p>
        </div>
      </div>
    </div>
  );
}

function QualitySummary() {
  const sqamGrade = "A";
  const defectRate = 0.08;
  
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Kualitas (SQAM)</h3>
        <span className={`px-2 py-1 rounded text-xs font-bold ${
          sqamGrade === "A" ? "bg-emerald-500/20 text-emerald-400" :
          sqamGrade === "B" ? "bg-teal-500/20 text-teal-400" :
          sqamGrade === "C" ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"
        }`}>
          Grade {sqamGrade}
        </span>
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">Defect Rate</span>
          <span className="font-semibold text-slate-50">{defectRate}%</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: "8%" }}></div>
        </div>
        <p className="text-xs text-slate-400 mt-1">Target: &lt; 0.1%</p>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-slate-400">Total Inspect</p>
          <p className="font-semibold text-slate-50">2,450</p>
        </div>
        <div>
          <p className="text-slate-400">Defects Found</p>
          <p className="font-semibold text-amber-400">2</p>
        </div>
      </div>
    </div>
  );
}

function K3Summary() {
  const safetyScore = 87;
  
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">K3 Score</h3>
        <span className="text-xs text-slate-400">Bulan ini</span>
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">Safety Score</span>
          <span className="font-semibold text-emerald-400">{safetyScore}/100</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{ width: "87%" }}></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-slate-400">Incident (30d)</p>
          <p className="font-semibold text-slate-50">0</p>
        </div>
        <div>
          <p className="text-slate-400">Hazard Reports</p>
          <p className="font-semibold text-amber-400">3</p>
        </div>
      </div>
    </div>
  );
}

function DailySummary() {
  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-slate-50">Ringkasan Harian AI</h3>
            <p className="text-xs text-slate-400">Generated 10:45 WIB • Auto-execute enabled</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
          Regenerate
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-slate-700/30 rounded-lg p-4">
          <h4 className="text-sm font-medium text-teal-400 mb-2">📊 Produksi</h4>
          <p className="text-sm text-slate-300">Line 1 & 3 berjalan optimal. Line 2 mengalami slowdown karena menunggu material. Prediksi selesai shift: 1,150 unit.</p>
        </div>
        <div className="bg-slate-700/30 rounded-lg p-4">
          <h4 className="text-sm font-medium text-amber-400 mb-2">⚠️ Quality Alert</h4>
          <p className="text-sm text-slate-300">2 defect terdeteksi di Line 1 (surface scratch). Root cause: fixture wear. Auto-generated NCR-2026-003.</p>
        </div>
        <div className="bg-slate-700/30 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-400 mb-2">🛡️ K3 Action</h4>
          <p className="text-sm text-slate-300">PPE compliance di Area Welding 85%. Perlu refresher training. 3 hazard reports menunggu review.</p>
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-sm font-medium text-amber-400">Action Items Hari Ini (AI Recommended)</span>
        </div>
        <ul className="text-sm text-slate-300 space-y-1 ml-6 list-disc">
          <li>Review fixture Line 1 - scheduled 14:00 <span className="text-teal-400">[Auto-schedule]</span></li>
          <li>Approve NCR-2026-003 - surface scratch <span className="text-teal-400">[Pending Approval]</span></li>
          <li>Refresher PPE training welding team - scheduled 15:30 <span className="text-teal-400">[Auto-schedule]</span></li>
          <li>Audit preparation meeting - scheduled 16:00</li>
        </ul>
      </div>
    </div>
  );
}

function ProductionLines() {
  const lines = [
    { name: "Line 1 - Stamping", status: "running", oee: 92, target: 400, actual: 378, bottleneck: false },
    { name: "Line 2 - Assembly", status: "idle", oee: 0, target: 350, actual: 312, bottleneck: true },
    { name: "Line 3 - Welding", status: "running", oee: 88, target: 300, actual: 246, bottleneck: false },
    { name: "Line 4 - Finishing", status: "maintenance", oee: 0, target: 150, actual: 0, bottleneck: false },
  ];

  const statusColors: Record<string, string> = {
    running: "bg-emerald-500",
    idle: "bg-amber-500",
    maintenance: "bg-slate-500",
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Status Produksi Line</h3>
        <button className="text-sm text-teal-400 hover:text-teal-300">Lihat Detail →</button>
      </div>
      <div className="space-y-4">
        {lines.map((line, idx) => (
          <div key={idx} className={`p-4 bg-slate-700/30 rounded-lg ${line.bottleneck ? 'border border-amber-500/50' : ''}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${statusColors[line.status]}`}></span>
                <span className="font-medium text-slate-50">{line.name}</span>
                {line.bottleneck && <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded text-xs">BOTTLENECK</span>}
              </div>
              <span className="text-xs text-slate-400 uppercase">{line.status}</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-slate-400">OEE</p>
                <p className="font-semibold text-slate-50">{line.oee}%</p>
              </div>
              <div>
                <p className="text-slate-400">Target</p>
                <p className="font-semibold text-slate-50">{line.target}</p>
              </div>
              <div>
                <p className="text-slate-400">Actual</p>
                <p className={`font-semibold ${line.actual < line.target * 0.9 ? "text-amber-400" : "text-slate-50"}`}>
                  {line.actual}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentDefects() {
  const defects = [
    { id: "DEF-001", line: "Line 1", type: "Surface Scratch", severity: "Minor", status: "Open", ncr: false },
    { id: "DEF-002", line: "Line 1", type: "Surface Scratch", severity: "Minor", status: "Open", ncr: true },
    { id: "DEF-003", line: "Line 3", type: "Dimensional", severity: "Major", status: "In Progress", ncr: true },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Recent Defects</h3>
        <button className="text-sm text-teal-400 hover:text-teal-300">Lihat Semua →</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">ID</th>
              <th className="pb-2 font-medium">Line</th>
              <th className="pb-2 font-medium">Type</th>
              <th className="pb-2 font-medium">Severity</th>
              <th className="pb-2 font-medium">NCR</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {defects.map((defect) => (
              <tr key={defect.id} className="border-b border-slate-700/50">
                <td className="py-3 font-mono text-xs">{defect.id}</td>
                <td className="py-3">{defect.line}</td>
                <td className="py-3">{defect.type}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    defect.severity === "Major" ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {defect.severity}
                  </span>
                </td>
                <td className="py-3">
                  {defect.ncr ? (
                    <span className="px-2 py-0.5 rounded text-xs bg-amber-500/20 text-amber-400">NCR-003</span>
                  ) : (
                    <span className="text-slate-500">-</span>
                  )}
                </td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    defect.status === "Open" ? "bg-amber-500/20 text-amber-400" : "bg-blue-500/20 text-blue-400"
                  }`}>
                    {defect.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function KPITrends() {
  const kpiData = [
    { name: "OEE", current: 87.5, target: 85, trend: "+2.3%", positive: true, history: [82, 84, 85, 83, 87, 86, 87.5] },
    { name: "Defect Rate", current: 0.08, target: 0.1, trend: "-0.02%", positive: true, history: [0.12, 0.11, 0.10, 0.09, 0.09, 0.08, 0.08] },
    { name: "SQAM Grade", current: "A", target: "A", trend: "Stable", positive: true, history: ["A", "A", "A", "B", "A", "A", "A"] },
    { name: "Safety Score", current: 87, target: 90, trend: "+3", positive: true, history: [82, 83, 84, 85, 85, 86, 87] },
    { name: "On-Time Delivery", current: 96, target: 95, trend: "+1%", positive: true, history: [92, 93, 94, 95, 95, 96, 96] },
    { name: "Downtime", current: 2.1, target: 3.0, trend: "-15%", positive: true, history: [3.5, 3.2, 2.9, 2.8, 2.5, 2.3, 2.1] },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-slate-50">KPI Trends (7 Days)</h3>
          <p className="text-sm text-slate-400">Performance metrics overview</p>
        </div>
        <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-slate-200">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Month</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpiData.map((kpi, idx) => (
          <div key={idx} className="p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">{kpi.name}</span>
              <span className={`text-xs ${kpi.positive ? "text-emerald-400" : "text-red-400"}`}>
                {kpi.trend}
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-50 mb-2">
              {typeof kpi.current === "number" && kpi.current < 1 ? kpi.current.toFixed(2) : kpi.current}
              {kpi.name === "Defect Rate" && "%"}
              {kpi.name === "OEE" && "%"}
              {kpi.name === "Safety Score" && ""}
              {kpi.name === "On-Time Delivery" && "%"}
              {kpi.name === "Downtime" && "h"}
            </div>
            <div className="flex items-center gap-1">
              {kpi.history.slice(-7).map((val, i) => {
                const numVal = typeof val === "number" ? val : (val === "A" ? 100 : val === "B" ? 75 : 50);
                const maxVal = Math.max(...kpi.history.map(v => typeof v === "number" ? v : (v === "A" ? 100 : v === "B" ? 75 : 50)));
                const height = (numVal / maxVal) * 100;
                return (
                  <div
                    key={i}
                    className="flex-1 bg-teal-500/60 rounded-sm"
                    style={{ height: `${height}%`, minHeight: "4px" }}
                  ></div>
                );
              })}
            </div>
            <div className="flex justify-between mt-1 text-[10px] text-slate-500">
              <span>Target: {kpi.target}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
