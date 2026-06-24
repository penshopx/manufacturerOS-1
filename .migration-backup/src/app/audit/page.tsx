"use client";

import { useState } from "react";

export default function AuditPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Compliance & Audit</h1>
          <p className="text-slate-400">IATF 16949, ISO 9001, ISO 45001 - Checklist & Evidence</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-medium text-white transition-colors">
            AI Prepare Audit
          </button>
          <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {["overview", "iso9001", "iatf16949", "iso45001", "evidence"].map((tab) => (
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
            {tab === "iso9001" && "ISO 9001"}
            {tab === "iatf16949" && "IATF 16949"}
            {tab === "iso45001" && "ISO 45001"}
            {tab === "evidence" && "Evidence"}
          </button>
        ))}
      </div>

      {activeTab === "overview" && <AuditOverview />}
      {activeTab === "iso9001" && <ISO9001Checklist />}
      {activeTab === "iatf16949" && <IATF16949Checklist />}
      {activeTab === "iso45001" && <ISO45001Checklist />}
      {activeTab === "evidence" && <EvidenceTracker />}
    </div>
  );
}

function AuditOverview() {
  const audits = [
    { name: "ISO 9001:2015", nextAudit: "15 Apr 2026", readiness: 85, status: "On Track", daysLeft: 29 },
    { name: "IATF 16949", nextAudit: "20 May 2026", readiness: 72, status: "Needs Attention", daysLeft: 64 },
    { name: "ISO 45001", nextAudit: "10 Jun 2026", readiness: 90, status: "On Track", daysLeft: 85 },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {audits.map((audit, idx) => (
          <div key={idx} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-50">{audit.name}</h3>
              <span className={`px-2 py-1 rounded text-xs ${
                audit.status === "On Track" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
              }`}>
                {audit.status}
              </span>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Readiness</span>
                <span className={`font-semibold ${audit.readiness >= 80 ? "text-emerald-400" : "text-amber-400"}`}>
                  {audit.readiness}%
                </span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${audit.readiness >= 80 ? "bg-emerald-500" : "bg-amber-500"}`}
                  style={{ width: `${audit.readiness}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-slate-400">Next Audit</p>
                <p className="font-medium text-slate-50">{audit.nextAudit}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400">Days Left</p>
                <p className="font-medium text-amber-400">{audit.daysLeft} days</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AITriggeredActions />
        <UpcomingAudits />
      </div>
    </>
  );
}

function AITriggeredActions() {
  const actions = [
    { id: "ACT-001", title: "Update Procedure P-001", type: "ISO 9001", priority: "High", due: "20 Mar 2026", status: "Pending" },
    { id: "ACT-002", title: "Complete Training Records", type: "IATF 16949", priority: "Medium", due: "25 Mar 2026", status: "In Progress" },
    { id: "ACT-003", title: "Review NCR Close-out", type: "ISO 9001", priority: "High", due: "18 Mar 2026", status: "Pending" },
    { id: "ACT-004", title: "Update Risk Register", type: "ISO 45001", priority: "Medium", due: "30 Mar 2026", status: "Pending" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
          <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="font-semibold text-slate-50">AI-Triggered Actions</h3>
      </div>
      <div className="space-y-3">
        {actions.map((action) => (
          <div key={action.id} className="p-3 bg-slate-700/30 rounded-lg flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-50 text-sm">{action.title}</p>
              <p className="text-xs text-slate-400">{action.type} • Due: {action.due}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-xs ${
                action.priority === "High" ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"
              }`}>
                {action.priority}
              </span>
              <span className={`px-2 py-0.5 rounded text-xs ${
                action.status === "Pending" ? "bg-slate-600 text-slate-300" : "bg-blue-500/20 text-blue-400"
              }`}>
                {action.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UpcomingAudits() {
  const audits = [
    { type: "Internal Audit", scope: "ISO 9001", date: "25 Mar 2026", auditor: "Budi Santoso", status: "Scheduled" },
    { type: "Surveillance", scope: "IATF 16949", date: "20 May 2026", auditor: "TUV Rheinland", status: "Upcoming" },
    { type: "Certification", scope: "ISO 45001", date: "10 Jun 2026", auditor: "BSI", status: "Planning" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-slate-50 mb-4">Upcoming Audits</h3>
      <div className="space-y-3">
        {audits.map((audit, idx) => (
          <div key={idx} className="p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-slate-50">{audit.type}</span>
              <span className={`px-2 py-0.5 rounded text-xs ${
                audit.status === "Scheduled" ? "bg-emerald-500/20 text-emerald-400" :
                audit.status === "Upcoming" ? "bg-blue-500/20 text-blue-400" : "bg-slate-600 text-slate-300"
              }`}>
                {audit.status}
              </span>
            </div>
            <div className="flex justify-between text-sm text-slate-400">
              <span>{audit.scope}</span>
              <span>{audit.date}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Auditor: {audit.auditor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ISO9001Checklist() {
  const clauses = [
    { id: "4", name: "Context of Organization", items: 12, completed: 10, evidence: 8 },
    { id: "5", name: "Leadership", items: 8, completed: 8, evidence: 6 },
    { id: "6", name: "Planning", items: 10, completed: 8, evidence: 7 },
    { id: "7", name: "Support", items: 15, completed: 12, evidence: 10 },
    { id: "8", name: "Operation", items: 20, completed: 16, evidence: 14 },
    { id: "9", name: "Performance Evaluation", items: 12, completed: 9, evidence: 7 },
    { id: "10", name: "Improvement", items: 8, completed: 6, evidence: 5 },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-slate-50">ISO 9001:2015 Checklist</h3>
          <p className="text-sm text-slate-400">85% Complete • 42/50 items reviewed</p>
        </div>
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
          Add Evidence
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">Clause</th>
              <th className="pb-2 font-medium">Description</th>
              <th className="pb-2 font-medium">Items</th>
              <th className="pb-2 font-medium">Completed</th>
              <th className="pb-2 font-medium">Evidence</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {clauses.map((clause) => (
              <tr key={clause.id} className="border-b border-slate-700/50">
                <td className="py-3 font-mono">{clause.id}</td>
                <td className="py-3">{clause.name}</td>
                <td className="py-3">{clause.items}</td>
                <td className="py-3">{clause.completed}</td>
                <td className="py-3">{clause.evidence}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-slate-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-500 rounded-full"
                        style={{ width: `${(clause.completed / clause.items) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{Math.round((clause.completed / clause.items) * 100)}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function IATF16949Checklist() {
  const sections = [
    { id: "5.1", name: "Leadership & Commitment", items: 15, completed: 10 },
    { id: "6.1", name: "Risk & Opportunity", items: 12, completed: 8 },
    { id: "7.2", name: "Competence", items: 10, completed: 7 },
    { id: "8.1", name: "Operational Planning", items: 18, completed: 12 },
    { id: "8.3", name: "Design & Development", items: 14, completed: 9 },
    { id: "8.4", name: "External Provision", items: 12, completed: 8 },
    { id: "8.5", name: "Production", items: 20, completed: 14 },
    { id: "8.6", name: "Release of Products", items: 8, completed: 5 },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-slate-50">IATF 16949 Checklist</h3>
          <p className="text-sm text-slate-400">72% Complete • 42/58 items reviewed</p>
        </div>
        <button className="px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm font-medium text-white transition-colors">
          Needs Attention
        </button>
      </div>
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-mono text-sm text-teal-400">{section.id}</span>
                <span className="ml-2 font-medium text-slate-50">{section.name}</span>
              </div>
              <span className="text-sm text-slate-400">{section.completed}/{section.items}</span>
            </div>
            <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${(section.completed / section.items) >= 0.8 ? "bg-emerald-500" : "bg-amber-500"}`}
                style={{ width: `${(section.completed / section.items) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ISO45001Checklist() {
  const elements = [
    { id: "5", name: "Leadership", items: 8, completed: 7 },
    { id: "6", name: "Planning", items: 10, completed: 9 },
    { id: "7", name: "Support", items: 12, completed: 11 },
    { id: "8", name: "Operation", items: 14, completed: 13 },
    { id: "9", name: "Evaluation", items: 8, completed: 7 },
    { id: "10", name: "Improvement", items: 6, completed: 5 },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-slate-50">ISO 45001 Checklist</h3>
          <p className="text-sm text-slate-400">90% Complete • 32/35 items reviewed</p>
        </div>
        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
          On Track
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {elements.map((element) => (
          <div key={element.id} className="p-4 bg-slate-700/30 rounded-lg text-center">
            <p className="text-2xl font-bold text-emerald-400">{Math.round((element.completed / element.items) * 100)}%</p>
            <p className="text-sm text-slate-400 mt-1">{element.name}</p>
            <p className="text-xs text-slate-500">{element.completed}/{element.items}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EvidenceTracker() {
  const evidences = [
    { id: "EV-001", clause: "ISO 9001 - 7.2", title: "Training Records Q1 2026", type: "Document", status: "Uploaded", date: "15 Mar 2026" },
    { id: "EV-002", clause: "IATF 16949 - 8.5.1", title: "Production Control Procedure", type: "Procedure", status: "Pending Review", date: "10 Mar 2026" },
    { id: "EV-003", clause: "ISO 45001 - 8.1", title: "Risk Assessment Matrix", type: "Record", status: "Uploaded", date: "08 Mar 2026" },
    { id: "EV-004", clause: "ISO 9001 - 9.1", title: "Management Review Minutes", type: "Record", status: "Uploaded", date: "05 Mar 2026" },
    { id: "EV-005", clause: "IATF 16949 - 8.4", title: "Supplier Evaluation Form", type: "Form", status: "Pending Review", date: "01 Mar 2026" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-slate-50">Evidence Tracker</h3>
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
          Upload Evidence
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">ID</th>
              <th className="pb-2 font-medium">Clause</th>
              <th className="pb-2 font-medium">Title</th>
              <th className="pb-2 font-medium">Type</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {evidences.map((ev) => (
              <tr key={ev.id} className="border-b border-slate-700/50">
                <td className="py-3 font-mono text-xs">{ev.id}</td>
                <td className="py-3 text-teal-400">{ev.clause}</td>
                <td className="py-3">{ev.title}</td>
                <td className="py-3">{ev.type}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    ev.status === "Uploaded" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {ev.status}
                  </span>
                </td>
                <td className="py-3">{ev.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
