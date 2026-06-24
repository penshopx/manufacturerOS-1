"use client";

import { useState } from "react";

export default function KualitasPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Kualitas</h1>
          <p className="text-slate-400">Kontrol kualitas sesuai standar Toyota SQAM</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm font-medium text-white transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create NCR
          </button>
          <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
            Inspection Baru
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {["overview", "defects", "ncr", "traceability", "spc"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-teal-600 text-white"
                : "bg-slate-700 text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab === "overview" && "Overview"}
            {tab === "defects" && "Defects"}
            {tab === "ncr" && "NCR Management"}
            {tab === "traceability" && "Traceability"}
            {tab === "spc" && "SPC Charts"}
          </button>
        ))}
      </div>

      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "defects" && <DefectsTab />}
      {activeTab === "ncr" && <NCRTab />}
      {activeTab === "traceability" && <TraceabilityTab />}
      {activeTab === "spc" && <SPCTab />}
    </div>
  );
}

function OverviewTab() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SQAMGradeCard />
        <DefectRateCard />
        <PPMCard />
        <InspectionCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ParetoChart />
        <QuickDefects />
      </div>

      <SQAMCompliance />
    </>
  );
}

function SQAMGradeCard() {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-400">SQAM Grade</p>
        <span className="text-xs text-slate-500">Toyota Standard</span>
      </div>
      <div className="flex items-center justify-center mb-4">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-4 border-emerald-500 flex items-center justify-center">
          <span className="text-3xl font-bold text-emerald-400">A</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-slate-300">Defect Rate &lt; 0.1%</p>
        <p className="text-xs text-emerald-400 mt-1">✓ Memenuhi standar</p>
      </div>
    </div>
  );
}

function DefectRateCard() {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <p className="text-sm text-slate-400 mb-2">Defect Rate</p>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-bold text-emerald-400">0.08</span>
        <span className="text-slate-400">%</span>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "8%" }}></div>
      </div>
      <p className="text-xs text-slate-400 mt-2">Target: &lt; 0.1% (SQAM)</p>
    </div>
  );
}

function PPMCard() {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <p className="text-sm text-slate-400 mb-2">PPM (Parts Per Million)</p>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-bold text-slate-50">800</span>
        <span className="text-slate-400">PPM</span>
      </div>
      <p className="text-xs text-slate-400 mt-4">Target: &lt; 1000 PPM</p>
    </div>
  );
}

function InspectionCard() {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <p className="text-sm text-slate-400 mb-2">Total Inspection</p>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-bold text-slate-50">2,450</span>
        <span className="text-slate-400">unit</span>
      </div>
      <div className="flex justify-between text-xs text-slate-400 mt-4">
        <span>Pass: 2,448</span>
        <span className="text-amber-400">Fail: 2</span>
      </div>
    </div>
  );
}

function ParetoChart() {
  const defects = [
    { category: "Surface Scratch", count: 8, percentage: 40 },
    { category: "Dimensional", count: 6, percentage: 30 },
    { category: "Assembly", count: 3, percentage: 15 },
    { category: "Material", count: 2, percentage: 10 },
    { category: "Others", count: 1, percentage: 5 },
  ];

  const colors = ["bg-amber-500", "bg-blue-500", "bg-purple-500", "bg-teal-500", "bg-slate-500"];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-slate-50 mb-4">Pareto Analysis - Defect Categories</h3>
      <div className="space-y-3">
        {defects.map((defect, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-300">{defect.category}</span>
              <span className="text-slate-400">{defect.count} ({defect.percentage}%)</span>
            </div>
            <div className="h-6 bg-slate-700 rounded overflow-hidden flex">
              <div
                className={`${colors[idx]} h-full`}
                style={{ width: `${defect.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-400 mt-4">
        * 80% defect berasal dari 3 kategori utama (Surface, Dimensional, Assembly)
      </p>
    </div>
  );
}

function QuickDefects() {
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
      <div className="space-y-3">
        {defects.map((defect) => (
          <div key={defect.id} className="p-3 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-slate-400">{defect.id}</span>
                <span className={`px-2 py-0.5 rounded text-xs ${
                  defect.severity === "Major" ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"
                }`}>
                  {defect.severity}
                </span>
              </div>
              <span className={`px-2 py-0.5 rounded text-xs ${
                defect.status === "Open" ? "bg-amber-500/20 text-amber-400" : "bg-blue-500/20 text-blue-400"
              }`}>
                {defect.status}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">{defect.type}</span>
              <span className="text-slate-400">{defect.line}</span>
            </div>
            {defect.ncr && (
              <div className="mt-2 pt-2 border-t border-slate-600">
                <span className="text-xs text-amber-400">NCR-003 auto-generated • Pending approval</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SQAMCompliance() {
  const criteria = [
    { name: "Incoming Inspection", status: "compliant", score: 95 },
    { name: "Process Inspection", status: "compliant", score: 92 },
    { name: "Final Inspection", status: "compliant", score: 98 },
    { name: "SPC Implementation", status: "partial", score: 75 },
    { name: "5S Workplace", status: "compliant", score: 88 },
    { name: "Documentation", status: "partial", score: 70 },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-50">Toyota SQAM Compliance Check</h3>
          <p className="text-sm text-slate-400">Kriteria kepatuhan standar Toyota</p>
        </div>
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
          Generate Report
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {criteria.map((item, idx) => (
          <div key={idx} className="p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">{item.name}</span>
              <span className={`px-2 py-0.5 rounded text-xs ${
                item.status === "compliant" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
              }`}>
                {item.status === "compliant" ? "Compliant" : "Partial"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-slate-600 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.score >= 90 ? "bg-emerald-500" : "bg-amber-500"}`}
                  style={{ width: `${item.score}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-slate-300">{item.score}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DefectsTab() {
  const defects = [
    { id: "DEF-2026-001", line: "Line 1", category: "Surface Scratch", cause: "Fixture wear", severity: "Minor", status: "Open", date: "17 Mar", qty: 1 },
    { id: "DEF-2026-002", line: "Line 1", category: "Surface Scratch", cause: "Tooling damage", severity: "Minor", status: "Open", date: "17 Mar", qty: 1 },
    { id: "DEF-2026-003", line: "Line 3", category: "Dimensional", cause: "Machine calibration", severity: "Major", status: "In Progress", date: "16 Mar", qty: 3 },
    { id: "DEF-2026-004", line: "Line 2", category: "Assembly", cause: "Operator error", severity: "Minor", status: "Closed", date: "15 Mar", qty: 2 },
    { id: "DEF-2026-005", line: "Line 1", category: "Material", cause: "Raw material defect", severity: "Major", status: "Closed", date: "14 Mar", qty: 5 },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Daftar Defect</h3>
        <div className="flex gap-2">
          <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-slate-200">
            <option>Semua Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>
          <button className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm text-white">
            Auto-Create NCR
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">ID</th>
              <th className="pb-2 font-medium">Line</th>
              <th className="pb-2 font-medium">Category</th>
              <th className="pb-2 font-medium">Cause</th>
              <th className="pb-2 font-medium">Qty</th>
              <th className="pb-2 font-medium">Severity</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {defects.map((defect) => (
              <tr key={defect.id} className="border-b border-slate-700/50">
                <td className="py-3 font-mono text-xs">{defect.id}</td>
                <td className="py-3">{defect.line}</td>
                <td className="py-3">{defect.category}</td>
                <td className="py-3 text-slate-400">{defect.cause}</td>
                <td className="py-3">{defect.qty}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    defect.severity === "Major" ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {defect.severity}
                  </span>
                </td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    defect.status === "Open" ? "bg-amber-500/20 text-amber-400" :
                    defect.status === "In Progress" ? "bg-blue-500/20 text-blue-400" :
                    "bg-emerald-500/20 text-emerald-400"
                  }`}>
                    {defect.status}
                  </span>
                </td>
                <td className="py-3">
                  <button className="text-teal-400 hover:text-teal-300 text-xs">Create NCR</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NCRTab() {
  const ncrs = [
    { id: "NCR-2026-003", defect: "DEF-002", line: "Line 1", category: "Surface Scratch", severity: "Minor", status: "Pending Approval", created: "17 Mar 2026", due: "20 Mar 2026", assignee: "QC Supervisor" },
    { id: "NCR-2026-002", defect: "DEF-003", line: "Line 3", category: "Dimensional", severity: "Major", status: "In Progress", created: "16 Mar 2026", due: "19 Mar 2026", assignee: "Maintenance" },
    { id: "NCR-2026-001", defect: "DEF-005", line: "Line 1", category: "Material", severity: "Major", status: "Closed", created: "14 Mar 2026", due: "17 Mar 2026", assignee: "Purchasing" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-xl p-6 border border-amber-500/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-slate-50">AI NCR Auto-Generation</h3>
            <p className="text-sm text-slate-400">Quality Agent mendeteksi defect dan membuat draft NCR otomatis</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-sm text-amber-400 mb-1">Pending Approval</p>
            <p className="text-2xl font-bold text-slate-50">1</p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-sm text-blue-400 mb-1">In Progress</p>
            <p className="text-2xl font-bold text-slate-50">1</p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-sm text-emerald-400 mb-1">Closed This Month</p>
            <p className="text-2xl font-bold text-slate-50">5</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-50">NCR List</h3>
          <button className="px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm font-medium text-white transition-colors">
            Create NCR
          </button>
        </div>
        <div className="space-y-4">
          {ncrs.map((ncr) => (
            <div key={ncr.id} className="p-4 bg-slate-700/30 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-lg font-bold text-amber-400">{ncr.id}</span>
                  <span className="px-2 py-0.5 rounded text-xs bg-slate-600 text-slate-300">Ref: {ncr.defect}</span>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  ncr.status === "Pending Approval" ? "bg-amber-500/20 text-amber-400" :
                  ncr.status === "In Progress" ? "bg-blue-500/20 text-blue-400" : "bg-emerald-500/20 text-emerald-400"
                }`}>
                  {ncr.status}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                <div>
                  <p className="text-slate-400">Line</p>
                  <p className="text-slate-50">{ncr.line}</p>
                </div>
                <div>
                  <p className="text-slate-400">Category</p>
                  <p className="text-slate-50">{ncr.category}</p>
                </div>
                <div>
                  <p className="text-slate-400">Assignee</p>
                  <p className="text-slate-50">{ncr.assignee}</p>
                </div>
                <div>
                  <p className="text-slate-400">Due Date</p>
                  <p className="text-amber-400">{ncr.due}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 rounded text-xs text-white">
                  View Details
                </button>
                {ncr.status === "Pending Approval" && (
                  <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded text-xs text-white">
                    Approve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TraceabilityTab() {
  const batches = [
    { id: "BATCH-2026-0317-A", part: "NSG-001", customer: "TAM", qty: 500, status: "Shipped", date: "17 Mar 2026", line: "Line 1" },
    { id: "BATCH-2026-0317-B", part: "BRG-002", customer: "ADM", qty: 300, status: "In Production", date: "17 Mar 2026", line: "Line 2" },
    { id: "BATCH-2026-0316-A", part: "FRM-003", customer: "HMID", qty: 200, status: "Shipped", date: "16 Mar 2026", line: "Line 3" },
    { id: "BATCH-2026-0315-B", part: "PNL-004", customer: "TAM", qty: 150, status: "Completed", date: "15 Mar 2026", line: "Line 4" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Batch Traceability</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search batch..."
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">Batch ID</th>
              <th className="pb-2 font-medium">Part Code</th>
              <th className="pb-2 font-medium">Customer</th>
              <th className="pb-2 font-medium">Line</th>
              <th className="pb-2 font-medium">Qty</th>
              <th className="pb-2 font-medium">Date</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium">Traceability</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {batches.map((batch) => (
              <tr key={batch.id} className="border-b border-slate-700/50">
                <td className="py-3 font-mono text-xs text-teal-400">{batch.id}</td>
                <td className="py-3">{batch.part}</td>
                <td className="py-3">{batch.customer}</td>
                <td className="py-3">{batch.line}</td>
                <td className="py-3">{batch.qty}</td>
                <td className="py-3">{batch.date}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    batch.status === "Shipped" ? "bg-emerald-500/20 text-emerald-400" :
                    batch.status === "In Production" ? "bg-blue-500/20 text-blue-400" : "bg-slate-600 text-slate-300"
                  }`}>
                    {batch.status}
                  </span>
                </td>
                <td className="py-3">
                  <button className="text-teal-400 hover:text-teal-300 text-xs">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SPCTab() {
  const spcData = [
    { time: "08:00", value: 10.2, ucl: 10.5, lcl: 9.5, cl: 10 },
    { time: "09:00", value: 10.1, ucl: 10.5, lcl: 9.5, cl: 10 },
    { time: "10:00", value: 10.3, ucl: 10.5, lcl: 9.5, cl: 10 },
    { time: "11:00", value: 9.8, ucl: 10.5, lcl: 9.5, cl: 10 },
    { time: "12:00", value: 10.0, ucl: 10.5, lcl: 9.5, cl: 10 },
    { time: "13:00", value: 10.4, ucl: 10.5, lcl: 9.5, cl: 10 },
    { time: "14:00", value: 10.2, ucl: 10.5, lcl: 9.5, cl: 10 },
  ];

  const processCapability = {
    cp: 1.33,
    cpk: 1.25,
    pp: 1.28,
    ppk: 1.15,
  };

  const measurements = [
    { id: 1, value: 10.2 }, { id: 2, value: 10.1 }, { id: 3, value: 10.3 },
    { id: 4, value: 9.8 }, { id: 5, value: 10.0 }, { id: 6, value: 10.4 },
    { id: 7, value: 10.2 }, { id: 8, value: 9.9 }, { id: 9, value: 10.1 },
    { id: 10, value: 10.3 }, { id: 11, value: 9.7 }, { id: 12, value: 10.0 },
    { id: 13, value: 10.2 }, { id: 14, value: 10.1 }, { id: 15, value: 9.9 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-50">X-Bar Control Chart (Dimension mm)</h3>
            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">In Control</span>
          </div>
          <div className="relative h-64">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 700 250">
                <line x1="50" y1="20" x2="650" y2="20" stroke="#374151" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="50" y1="125" x2="650" y2="125" stroke="#0D9488" strokeWidth="2" />
                <line x1="50" y1="230" x2="650" y2="230" stroke="#374151" strokeWidth="1" strokeDasharray="5,5" />
                <text x="20" y="25" fill="#EF4444" fontSize="10">UCL (10.5)</text>
                <text x="20" y="130" fill="#0D9488" fontSize="10">CL (10.0)</text>
                <text x="20" y="235" fill="#EF4444" fontSize="10">LCL (9.5)</text>
                {spcData.map((d, i) => {
                  const x = 80 + i * 90;
                  const y = 250 - (d.value / 11) * 230;
                  const isOutOfControl = d.value > 10.5 || d.value < 9.5;
                  return (
                    <circle key={i} cx={x} cy={y} r="5" fill={isOutOfControl ? "#EF4444" : "#0D9488"} />
                  );
                })}
                {spcData.map((d, i) => {
                  const x = 80 + i * 90;
                  const nextX = 80 + (i + 1) * 90;
                  const y = 250 - (d.value / 11) * 230;
                  const nextY = i < spcData.length - 1 ? 250 - (spcData[i + 1].value / 11) * 230 : y;
                  return (
                    <line key={i} x1={x} y1={y} x2={nextX} y2={nextY} stroke="#0D9488" strokeWidth="1" />
                  );
                })}
              </svg>
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-2">
            <span>08:00</span>
            <span>10:00</span>
            <span>12:00</span>
            <span>14:00</span>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-slate-50 mb-4">Process Capability</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <p className="text-sm text-slate-400 mb-1">Cp (Process Capability)</p>
              <p className="text-2xl font-bold text-teal-400">{processCapability.cp}</p>
              <p className="text-xs text-emerald-400 mt-1">Target: ≥ 1.33</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <p className="text-sm text-slate-400 mb-1">Cpk (Process Performance)</p>
              <p className="text-2xl font-bold text-teal-400">{processCapability.cpk}</p>
              <p className="text-xs text-emerald-400 mt-1">Target: ≥ 1.33</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <p className="text-sm text-slate-400 mb-1">Pp (Potential Capability)</p>
              <p className="text-2xl font-bold text-slate-50">{processCapability.pp}</p>
              <p className="text-xs text-slate-400 mt-1">Target: ≥ 1.33</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <p className="text-sm text-slate-400 mb-1">Ppk (Performance Index)</p>
              <p className="text-2xl font-bold text-slate-50">{processCapability.ppk}</p>
              <p className="text-xs text-slate-400 mt-1">Target: ≥ 1.33</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="font-semibold text-slate-50 mb-4">Measurement Data (Last 15 samples)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-700">
                <th className="pb-2 font-medium">Sample #</th>
                <th className="pb-2 font-medium">Value (mm)</th>
                <th className="pb-2 font-medium">X</th>
                <th className="pb-2 font-medium">R</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {measurements.map((m, i) => (
                <tr key={m.id} className="border-b border-slate-700/50">
                  <td className="py-2">{m.id}</td>
                  <td className="py-2 font-mono">{m.value.toFixed(2)}</td>
                  <td className="py-2">
                    <span className={`w-3 h-3 inline-block rounded-full ${m.value >= 9.5 && m.value <= 10.5 ? "bg-emerald-500" : "bg-red-500"}`}></span>
                  </td>
                  <td className="py-2">
                    {i % 2 === 1 ? (Math.abs(measurements[i].value - measurements[i-1].value)).toFixed(2) : "-"}
                  </td>
                  <td className="py-2">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      m.value >= 9.5 && m.value <= 10.5 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                    }`}>
                      {m.value >= 9.5 && m.value <= 10.5 ? "OK" : "OOC"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
