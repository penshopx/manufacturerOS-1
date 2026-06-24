"use client";

import { useState } from "react";

export default function ProduksiPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Produksi</h1>
          <p className="text-slate-400">Monitoring dan kontrol produksi</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium text-white transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Work Order
          </button>
          <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Log Downtime
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {["overview", "lines", "downtime", "workorders", "analytics"].map((tab) => (
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
            {tab === "lines" && "Production Lines"}
            {tab === "downtime" && "Downtime Log"}
            {tab === "workorders" && "Work Orders"}
            {tab === "analytics" && "Analytics"}
          </button>
        ))}
      </div>

      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "lines" && <LinesTab />}
      {activeTab === "downtime" && <DowntimeTab />}
      {activeTab === "workorders" && <WorkOrdersTab />}
      {activeTab === "analytics" && <AnalyticsTab />}
    </div>
  );
}

function OverviewTab() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Target Harian" value="1,200" unit="unit" change="+5%" positive />
        <MetricCard title="Produksi Actual" value="936" unit="unit" change="78%" positive={false} />
        <MetricCard title="OEE Rata-rata" value="87.5" unit="%" change="+2.3%" positive />
        <MetricCard title="Line Aktif" value="3" unit="/ 4" change="" positive />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductionLinesCard />
        <ShiftScheduleCard />
      </div>

      <AIProductionInsights />
    </>
  );
}

function MetricCard({ title, value, unit, change, positive }: { title: string; value: string; unit: string; change: string; positive?: boolean }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <p className="text-sm text-slate-400 mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-slate-50">{value}</span>
        <span className="text-slate-400">{unit}</span>
      </div>
      {change && (
        <p className={`text-sm mt-2 ${positive ? "text-emerald-400" : "text-amber-400"}`}>
          {change} dari target
        </p>
      )}
    </div>
  );
}

function ProductionLinesCard() {
  const lines = [
    { name: "Line 1 - Stamping", status: "running", oee: 92, output: 378, capacity: 400, shift: "A" },
    { name: "Line 2 - Assembly", status: "idle", oee: 0, output: 312, capacity: 350, shift: "A" },
    { name: "Line 3 - Welding", status: "running", oee: 88, output: 246, capacity: 300, shift: "A" },
    { name: "Line 4 - Finishing", status: "maintenance", oee: 0, output: 0, capacity: 150, shift: "-" },
  ];

  const statusMap: Record<string, { color: string; label: string }> = {
    running: { color: "bg-emerald-500", label: "Beroperasi" },
    idle: { color: "bg-amber-500", label: "Menganggur" },
    maintenance: { color: "bg-slate-500", label: "Maintenance" },
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Production Lines</h3>
        <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-slate-200">
          <option>Semua Line</option>
          <option>Line 1</option>
          <option>Line 2</option>
          <option>Line 3</option>
          <option>Line 4</option>
        </select>
      </div>
      <div className="space-y-4">
        {lines.map((line, idx) => (
          <div key={idx} className="p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${statusMap[line.status].color}`}></span>
                <div>
                  <p className="font-medium text-slate-50">{line.name}</p>
                  <p className="text-xs text-slate-400">Shift {line.shift}</p>
                </div>
              </div>
              <span className="text-xs px-2 py-1 bg-slate-600 rounded text-slate-300">
                {statusMap[line.status].label}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-slate-400">OEE</p>
                <p className="font-semibold text-slate-50">{line.oee}%</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Output</p>
                <p className="font-semibold text-slate-50">{line.output}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Capacity</p>
                <p className="font-semibold text-slate-50">{line.capacity}</p>
              </div>
            </div>
            <div className="mt-3 h-2 bg-slate-600 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${line.status === "maintenance" ? "bg-slate-500" : "bg-teal-500"}`}
                style={{ width: `${(line.output / line.capacity) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShiftScheduleCard() {
  const shifts = [
    { name: "Shift A", time: "06:00 - 14:00", workers: 25, status: "active", progress: 85 },
    { name: "Shift B", time: "14:00 - 22:00", workers: 22, status: "upcoming", progress: 0 },
    { name: "Shift C", time: "22:00 - 06:00", workers: 18, status: "upcoming", progress: 0 },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Jadwal Shift</h3>
        <span className="text-sm text-slate-400">Selasa, 17 Mar 2026</span>
      </div>
      <div className="space-y-4">
        {shifts.map((shift, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border ${
              shift.status === "active"
                ? "bg-teal-500/10 border-teal-500/30"
                : "bg-slate-700/30 border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${shift.status === "active" ? "bg-teal-500" : "bg-slate-500"}`}></span>
                <span className="font-medium text-slate-50">{shift.name}</span>
              </div>
              <span className="text-sm text-slate-400">{shift.time}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">{shift.workers} workers</span>
              {shift.status === "active" && (
                <span className="text-teal-400">{shift.progress}% complete</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIProductionInsights() {
  return (
    <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl p-6 border border-blue-500/30">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-slate-50">AI Production Insights</h3>
          <p className="text-xs text-slate-400">Analisis prediktif oleh Production Agent</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-amber-400">⚠️</span>
            <span className="text-sm font-medium text-amber-400">Potential Delay</span>
          </div>
          <p className="text-sm text-slate-300">
            Line 2 diprediksi mengalami delay 15 menit karena material shortage. 
            Rekomendasi: Prioritaskan delivery dari supplier pada jam 11:00. Auto-generated Work Order #WO-2026-015.
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-emerald-400">✓</span>
            <span className="text-sm font-medium text-emerald-400">Optimization</span>
          </div>
          <p className="text-sm text-slate-300">
            Line 1 OEE meningkat 3% setelah adjustment parameter yesterday. 
            Pertahankan setting serupa untuk shift berikutnya.
          </p>
        </div>
      </div>
    </div>
  );
}

function LinesTab() {
  const lines = [
    { id: "LINE-001", name: "Line 1 - Stamping", type: "Stamping", capacity: 400, availability: 95, performance: 97, quality: 100, oee: 92, status: "running" },
    { id: "LINE-002", name: "Line 2 - Assembly", type: "Assembly", capacity: 350, availability: 92, performance: 97, quality: 100, oee: 89, status: "running" },
    { id: "LINE-003", name: "Line 3 - Welding", type: "Welding", capacity: 300, availability: 94, performance: 94, quality: 100, oee: 88, status: "running" },
    { id: "LINE-004", name: "Line 4 - Finishing", type: "Finishing", capacity: 150, availability: 85, performance: 95, quality: 98, oee: 79, status: "maintenance" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-slate-50 mb-4">OEE Analysis per Line</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">Line</th>
              <th className="pb-2 font-medium">Type</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium">Availability</th>
              <th className="pb-2 font-medium">Performance</th>
              <th className="pb-2 font-medium">Quality</th>
              <th className="pb-2 font-medium">OEE</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {lines.map((line) => (
              <tr key={line.id} className="border-b border-slate-700/50">
                <td className="py-3 font-medium text-slate-50">{line.name}</td>
                <td className="py-3">{line.type}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    line.status === "running" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {line.status}
                  </span>
                </td>
                <td className="py-3">{line.availability}%</td>
                <td className="py-3">{line.performance}%</td>
                <td className="py-3">{line.quality}%</td>
                <td className="py-3 font-semibold text-teal-400">{line.oee}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DowntimeTab() {
  const downtimes = [
    { id: "DT-001", line: "Line 2", reason: "Material Shortage", duration: "25 min", type: "Unplanned", status: "Resolved", timestamp: "09:15" },
    { id: "DT-002", line: "Line 1", reason: "Tool Change", duration: "15 min", type: "Planned", status: "Resolved", timestamp: "08:30" },
    { id: "DT-003", line: "Line 4", reason: "Preventive Maintenance", duration: "120 min", type: "Planned", status: "In Progress", timestamp: "07:00" },
    { id: "DT-004", line: "Line 3", reason: "Minor Stop", duration: "5 min", type: "Unplanned", status: "Resolved", timestamp: "10:00" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Downtime Log</h3>
        <div className="flex gap-2">
          <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-slate-200">
            <option>Semua Tipe</option>
            <option>Planned</option>
            <option>Unplanned</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">ID</th>
              <th className="pb-2 font-medium">Line</th>
              <th className="pb-2 font-medium">Reason</th>
              <th className="pb-2 font-medium">Duration</th>
              <th className="pb-2 font-medium">Type</th>
              <th className="pb-2 font-medium">Time</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {downtimes.map((dt) => (
              <tr key={dt.id} className="border-b border-slate-700/50">
                <td className="py-3 font-mono text-xs">{dt.id}</td>
                <td className="py-3">{dt.line}</td>
                <td className="py-3">{dt.reason}</td>
                <td className="py-3">{dt.duration}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    dt.type === "Planned" ? "bg-blue-500/20 text-blue-400" : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {dt.type}
                  </span>
                </td>
                <td className="py-3">{dt.timestamp}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    dt.status === "Resolved" ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/20 text-blue-400"
                  }`}>
                    {dt.status}
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

function WorkOrdersTab() {
  const workOrders = [
    { id: "WO-2026-015", title: "Fixture Inspection Line 1", type: "Preventive", priority: "High", assigned: "Maintenance Team", status: "Open", due: "17 Mar 2026" },
    { id: "WO-2026-014", title: "Replace Welding Tip Line 3", type: "Corrective", priority: "Medium", assigned: "Technician A", status: "In Progress", due: "17 Mar 2026" },
    { id: "WO-2026-013", title: "Lubrication Schedule Line 2", type: "Preventive", priority: "Low", assigned: "Operator", status: "Completed", due: "16 Mar 2026" },
    { id: "WO-2026-012", title: "Calibration QC Equipment", type: "Preventive", priority: "High", assigned: "QC Team", status: "Open", due: "20 Mar 2026" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Work Orders</h3>
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
          Create WO
        </button>
      </div>
      <div className="space-y-4">
        {workOrders.map((wo) => (
          <div key={wo.id} className="p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-teal-400">{wo.id}</span>
                <span className={`px-2 py-0.5 rounded text-xs ${
                  wo.priority === "High" ? "bg-red-500/20 text-red-400" :
                  wo.priority === "Medium" ? "bg-amber-500/20 text-amber-400" : "bg-slate-600 text-slate-300"
                }`}>
                  {wo.priority}
                </span>
              </div>
              <span className={`px-2 py-0.5 rounded text-xs ${
                wo.status === "Open" ? "bg-amber-500/20 text-amber-400" :
                wo.status === "In Progress" ? "bg-blue-500/20 text-blue-400" : "bg-emerald-500/20 text-emerald-400"
              }`}>
                {wo.status}
              </span>
            </div>
            <p className="font-medium text-slate-50 mb-2">{wo.title}</p>
            <div className="flex justify-between text-sm text-slate-400">
              <span>{wo.type} • {wo.assigned}</span>
              <span>Due: {wo.due}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsTab() {
  const weeklyData = [
    { day: "Mon", target: 1200, actual: 1150 },
    { day: "Tue", target: 1200, actual: 1180 },
    { day: "Wed", target: 1200, actual: 1100 },
    { day: "Thu", target: 1200, actual: 1200 },
    { day: "Fri", target: 1200, actual: 1160 },
    { day: "Sat", target: 800, actual: 780 },
    { day: "Sun", target: 0, actual: 0 },
  ];

  const maxVal = Math.max(...weeklyData.map(d => Math.max(d.target, d.actual)));

  const oeeTrend = [
    { week: "W1", oee: 82 },
    { week: "W2", oee: 85 },
    { week: "W3", oee: 84 },
    { week: "W4", oee: 87 },
  ];

  const downtimeReasons = [
    { reason: "Material Shortage", hours: 12.5, percentage: 35 },
    { reason: "Break/Rest", hours: 8.0, percentage: 22 },
    { reason: "Maintenance", hours: 7.5, percentage: 21 },
    { reason: "Tool Change", hours: 4.5, percentage: 12 },
    { reason: "Others", hours: 3.5, percentage: 10 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-slate-50 mb-4">Weekly Production Trend</h3>
          <div className="space-y-3">
            {weeklyData.map((data, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">{data.day}</span>
                  <span className="text-slate-300">{data.actual} / {data.target}</span>
                </div>
                <div className="h-6 bg-slate-700 rounded overflow-hidden flex">
                  <div
                    className="h-full bg-teal-500"
                    style={{ width: `${(data.actual / maxVal) * 100}%` }}
                  ></div>
                  <div
                    className="h-full bg-slate-500 border-l border-slate-600"
                    style={{ width: `${(data.target / maxVal) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-teal-500 rounded"></div>
              <span className="text-slate-400">Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-slate-500 rounded"></div>
              <span className="text-slate-400">Target</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-slate-50 mb-4">OEE Trend (4 Weeks)</h3>
          <div className="flex items-end justify-between h-40 gap-2">
            {oeeTrend.map((data, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-teal-500/20 rounded-t-lg relative flex-1 flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-teal-600 to-teal-500 rounded-t-lg transition-all"
                    style={{ height: `${data.oee}%` }}
                  ></div>
                </div>
                <span className="text-xs text-slate-400 mt-2">{data.week}</span>
                <span className="text-sm font-semibold text-teal-400">{data.oee}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-slate-50 mb-4">Downtime Analysis (This Month)</h3>
          <div className="space-y-3">
            {downtimeReasons.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">{item.reason}</span>
                  <span className="text-slate-400">{item.hours}h ({item.percentage}%)</span>
                </div>
                <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      idx === 0 ? "bg-red-500" : idx === 1 ? "bg-amber-500" : idx === 2 ? "bg-blue-500" : "bg-slate-500"
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-slate-50 mb-4">Production KPI Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <p className="text-sm text-slate-400 mb-1">Avg. Daily Output</p>
              <p className="text-2xl font-bold text-slate-50">1,095</p>
              <p className="text-xs text-emerald-400">+3.2% vs last week</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <p className="text-sm text-slate-400 mb-1">Avg. OEE</p>
              <p className="text-2xl font-bold text-slate-50">87.5%</p>
              <p className="text-xs text-emerald-400">+2.1% vs last week</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <p className="text-sm text-slate-400 mb-1">Avg. Downtime</p>
              <p className="text-2xl font-bold text-slate-50">2.1h</p>
              <p className="text-xs text-amber-400">-5% vs last week</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <p className="text-sm text-slate-400 mb-1">MTBF</p>
              <p className="text-2xl font-bold text-slate-50">48h</p>
              <p className="text-xs text-emerald-400">+8% vs last week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
