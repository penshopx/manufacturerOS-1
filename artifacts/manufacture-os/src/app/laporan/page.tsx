export default function LaporanPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Laporan</h1>
          <p className="text-slate-400">Generate dan lihat laporan operasional</p>
        </div>
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Generate Laporan
        </button>
      </div>

      <ReportTypes />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentReports />
        <AuditPreparation />
      </div>

      <AISummaryReports />
    </div>
  );
}

function ReportTypes() {
  const reports = [
    { name: "Laporan Produksi Harian", type: "Produksi", frequency: "Harian", icon: "📊" },
    { name: "Laporan Kualitas Mingguan", type: "Kualitas", frequency: "Mingguan", icon: "✓" },
    { name: "Laporan K3 Bulanan", type: "K3", frequency: "Bulanan", icon: "🛡️" },
    { name: "SQAM Compliance Report", type: "Kualitas", frequency: "Bulanan", icon: "📋" },
    { name: "OEE Analysis Report", type: "Produksi", frequency: "Mingguan", icon: "⚙️" },
    { name: "Audit Preparation Report", type: "Audit", frequency: "Periodik", icon: "📁" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-slate-50 mb-4">Jenis Laporan Tersedia</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report, idx) => (
          <button key={idx} className="p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">{report.icon}</span>
              <span className="font-medium text-slate-50">{report.name}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>{report.type}</span>
              <span>{report.frequency}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function RecentReports() {
  const reports = [
    { name: "Laporan Produksi - 16 Mar 2026", date: "16 Mar 2026", type: "Produksi", size: "245 KB" },
    { name: "Laporan Kualitas Mingguan W11", date: "15 Mar 2026", type: "Kualitas", size: "512 KB" },
    { name: "Laporan K3 - Feb 2026", date: "28 Feb 2026", type: "K3", size: "890 KB" },
    { name: "SQAM Compliance - Feb 2026", date: "28 Feb 2026", type: "Kualitas", size: "1.2 MB" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Laporan Terbaru</h3>
        <button className="text-sm text-teal-400 hover:text-teal-300">Lihat Semua →</button>
      </div>
      <div className="space-y-3">
        {reports.map((report, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-50">{report.name}</p>
                <p className="text-xs text-slate-400">{report.date} • {report.size}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-slate-600 rounded transition-colors">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AuditPreparation() {
  const checklists = [
    { name: "ISO 9001:2015", status: "85%", items: 42, completed: 36 },
    { name: "IATF 16949", status: "72%", items: 58, completed: 42 },
    { name: "ISO 45001 (K3)", status: "90%", items: 35, completed: 32 },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-50">Persiapan Audit</h3>
          <p className="text-sm text-slate-400">Checklist kepatuhan</p>
        </div>
        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">AI Assisted</span>
      </div>
      <div className="space-y-4">
        {checklists.map((checklist, idx) => (
          <div key={idx} className="p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-slate-50">{checklist.name}</span>
              <span className="text-sm text-slate-400">{checklist.completed}/{checklist.items} items</span>
            </div>
            <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  parseInt(checklist.status) >= 80 ? "bg-emerald-500" : "bg-amber-500"
                }`}
                style={{ width: checklist.status }}
              ></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-slate-400">{checklist.status} complete</span>
              <button className="text-xs text-teal-400 hover:text-teal-300">Lihat Detail →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AISummaryReports() {
  return (
    <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-6 border border-purple-500/30">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-slate-50">AI Summary Reports</h3>
          <p className="text-sm text-slate-400">Generated by Audit Agent</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-purple-400 mb-2">📊 Executive Summary - March 2026</h4>
          <p className="text-sm text-slate-300 mb-3">
            Ringkasan eksekutif produksi, kualitas, dan K3 bulan ini. Incluye analisis tren dan rekomendasi perbaikan.
          </p>
          <button className="text-xs text-teal-400 hover:text-teal-300">Download PDF →</button>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-purple-400 mb-2">📋 Audit Readiness Report</h4>
          <p className="text-sm text-slate-300 mb-3">
            Status kesiapan audit ISO 9001 dan IATF 16949. Includes gap analysis dan action plan.
          </p>
          <button className="text-xs text-teal-400 hover:text-teal-300">Download PDF →</button>
        </div>
      </div>
    </div>
  );
}
