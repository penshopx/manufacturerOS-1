"use client";

import { useState } from "react";

export default function MaintenancePage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Maintenance</h1>
          <p className="text-slate-400"> preventive and corrective maintenance</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium text-white transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Work Order
          </button>
          <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
            Schedule PM
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {["overview", "workorders", "schedule", "history"].map((tab) => (
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
            {tab === "workorders" && "Work Orders"}
            {tab === "schedule" && "Schedule"}
            {tab === "history" && "History"}
          </button>
        ))}
      </div>

      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "workorders" && <WorkOrdersTab />}
      {activeTab === "schedule" && <ScheduleTab />}
      {activeTab === "history" && <HistoryTab />}
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-sm text-slate-400 mb-1">Open WO</p>
          <span className="text-3xl font-bold text-amber-400">8</span>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-sm text-slate-400 mb-1">Scheduled PM</p>
          <span className="text-3xl font-bold text-blue-400">5</span>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-sm text-slate-400 mb-1">MTBF</p>
          <span className="text-3xl font-bold text-slate-50">48h</span>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-sm text-slate-400 mb-1">MTTR</p>
          <span className="text-3xl font-bold text-slate-50">2.5h</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-slate-50 mb-4">Equipment Status</h3>
          <div className="space-y-3">
            {[
              { name: "CNC Press 1", status: "Running", health: 95 },
              { name: "CNC Press 2", status: "Running", health: 92 },
              { name: "Robotic Welder 1", status: "Running", health: 88 },
              { name: "Assembly Robot 1", status: "Warning", health: 72 },
              { name: "Paint Booth 1", status: "Maintenance", health: 65 },
            ].map((eq, idx) => (
              <div key={idx} className="p-3 bg-slate-700/30 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${
                    eq.status === "Running" ? "bg-emerald-500" :
                    eq.status === "Warning" ? "bg-amber-500" : "bg-slate-500"
                  }`}></span>
                  <span className="text-slate-50">{eq.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        eq.health >= 90 ? "bg-emerald-500" :
                        eq.health >= 70 ? "bg-amber-500" : "bg-red-500"
                      }`}
                      style={{ width: `${eq.health}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-slate-400 w-8">{eq.health}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-slate-50 mb-4">Upcoming PM Schedule</h3>
          <div className="space-y-3">
            {[
              { machine: "CNC Press 1", task: "Lubrication", due: "18 Mar 2026" },
              { machine: "Robotic Welder 1", task: "Electrode Replacement", due: "20 Mar 2026" },
              { machine: "Paint Booth 1", task: "Filter Cleaning", due: "22 Mar 2026" },
              { machine: "Assembly Robot 1", task: "Belt Replacement", due: "25 Mar 2026" },
            ].map((pm, idx) => (
              <div key={idx} className="p-3 bg-slate-700/30 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-slate-50 font-medium">{pm.task}</p>
                  <p className="text-xs text-slate-400">{pm.machine}</p>
                </div>
                <span className="text-sm text-amber-400">{pm.due}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkOrdersTab() {
  const workOrders = [
    { id: "WO-2026-015", title: "Fixture Inspection Line 1", type: "Preventive", priority: "High", machine: "CNC Press 1", status: "Open", assignee: "Maintenance Team", due: "17 Mar 2026" },
    { id: "WO-2026-014", title: "Replace Welding Tip", type: "Corrective", priority: "Medium", machine: "Robotic Welder 1", status: "In Progress", assignee: "Technician A", due: "17 Mar 2026" },
    { id: "WO-2026-013", title: "Lubrication Schedule", type: "Preventive", priority: "Low", machine: "CNC Press 2", status: "Completed", assignee: "Operator", due: "16 Mar 2026" },
    { id: "WO-2026-012", title: "Calibration Check", type: "Preventive", priority: "High", machine: "Assembly Robot 1", status: "Open", assignee: "QC Team", due: "20 Mar 2026" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Work Orders</h3>
        <div className="flex gap-2">
          <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-slate-200">
            <option>All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">WO #</th>
              <th className="pb-2 font-medium">Title</th>
              <th className="pb-2 font-medium">Machine</th>
              <th className="pb-2 font-medium">Type</th>
              <th className="pb-2 font-medium">Priority</th>
              <th className="pb-2 font-medium">Assignee</th>
              <th className="pb-2 font-medium">Due</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {workOrders.map((wo) => (
              <tr key={wo.id} className="border-b border-slate-700/50">
                <td className="py-3 font-mono text-teal-400">{wo.id}</td>
                <td className="py-3">{wo.title}</td>
                <td className="py-3">{wo.machine}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    wo.type === "Preventive" ? "bg-blue-500/20 text-blue-400" : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {wo.type}
                  </span>
                </td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    wo.priority === "High" ? "bg-red-500/20 text-red-400" :
                    wo.priority === "Medium" ? "bg-amber-500/20 text-amber-400" : "bg-slate-600 text-slate-300"
                  }`}>
                    {wo.priority}
                  </span>
                </td>
                <td className="py-3">{wo.assignee}</td>
                <td className="py-3">{wo.due}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    wo.status === "Open" ? "bg-amber-500/20 text-amber-400" :
                    wo.status === "In Progress" ? "bg-blue-500/20 text-blue-400" : "bg-emerald-500/20 text-emerald-400"
                  }`}>
                    {wo.status}
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

function ScheduleTab() {
  const schedule = [
    { machine: "CNC Press 1", task: "Daily Lubrication", frequency: "Daily", nextDue: "18 Mar 2026", assignee: "Operator" },
    { machine: "CNC Press 1", task: "Weekly Inspection", frequency: "Weekly", nextDue: "23 Mar 2026", assignee: "Maintenance" },
    { machine: "CNC Press 2", task: "Monthly PM", frequency: "Monthly", nextDue: "01 Apr 2026", assignee: "Maintenance Team" },
    { machine: "Robotic Welder 1", task: "Electrode Check", frequency: "Weekly", nextDue: "20 Mar 2026", assignee: "Technician" },
    { machine: "Assembly Robot 1", task: "Belt Inspection", frequency: "Monthly", nextDue: "25 Mar 2026", assignee: "Maintenance" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Preventive Maintenance Schedule</h3>
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
          Add Schedule
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">Machine</th>
              <th className="pb-2 font-medium">Task</th>
              <th className="pb-2 font-medium">Frequency</th>
              <th className="pb-2 font-medium">Next Due</th>
              <th className="pb-2 font-medium">Assignee</th>
              <th className="pb-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {schedule.map((item, idx) => (
              <tr key={idx} className="border-b border-slate-700/50">
                <td className="py-3">{item.machine}</td>
                <td className="py-3">{item.task}</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-blue-500/20 text-blue-400">
                    {item.frequency}
                  </span>
                </td>
                <td className="py-3 text-amber-400">{item.nextDue}</td>
                <td className="py-3">{item.assignee}</td>
                <td className="py-3">
                  <button className="text-teal-400 hover:text-teal-300 text-xs">Execute</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HistoryTab() {
  const history = [
    { date: "17 Mar 2026", wo: "WO-2026-013", task: "Lubrication Schedule", type: "Preventive", duration: "1.5h", technician: "Joko Pramono" },
    { date: "16 Mar 2026", wo: "WO-2026-011", task: "Belt Replacement", type: "Corrective", duration: "2.0h", technician: "Budi Santoso" },
    { date: "15 Mar 2026", wo: "WO-2026-010", task: "Filter Cleaning", type: "Preventive", duration: "3.0h", technician: "Joko Pramono" },
    { date: "14 Mar 2026", wo: "WO-2026-009", task: "Welding Tip Replacement", type: "Corrective", duration: "1.0h", technician: "Ahmad" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-slate-50 mb-4">Maintenance History</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">Date</th>
              <th className="pb-2 font-medium">WO #</th>
              <th className="pb-2 font-medium">Task</th>
              <th className="pb-2 font-medium">Type</th>
              <th className="pb-2 font-medium">Duration</th>
              <th className="pb-2 font-medium">Technician</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {history.map((item, idx) => (
              <tr key={idx} className="border-b border-slate-700/50">
                <td className="py-3">{item.date}</td>
                <td className="py-3 font-mono text-teal-400">{item.wo}</td>
                <td className="py-3">{item.task}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    item.type === "Preventive" ? "bg-blue-500/20 text-blue-400" : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {item.type}
                  </span>
                </td>
                <td className="py-3">{item.duration}</td>
                <td className="py-3">{item.technician}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
