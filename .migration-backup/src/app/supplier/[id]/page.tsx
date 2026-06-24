"use client";

import { useState } from "react";

export default function SupplierPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-50">PT Steelindo Perkasa</h1>
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs font-medium">Approved</span>
            </div>
            <p className="text-slate-400">SUP-001 • Steel Sheet Supplier</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium text-white transition-colors">
            Edit
          </button>
          <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
            Evaluation
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {["overview", "performance", "deliveries", "documents"].map((tab) => (
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
            {tab === "performance" && "Performance"}
            {tab === "deliveries" && "Deliveries"}
            {tab === "documents" && "Documents"}
          </button>
        ))}
      </div>

      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "performance" && <PerformanceTab />}
      {activeTab === "deliveries" && <DeliveriesTab />}
      {activeTab === "documents" && <DocumentsTab />}
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-sm text-slate-400 mb-1">Supplier Rating</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-emerald-400">A</span>
            <span className="text-slate-400">/ A</span>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-sm text-slate-400 mb-1">Total Orders</p>
          <span className="text-3xl font-bold text-slate-50">156</span>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-sm text-slate-400 mb-1">On-Time Delivery</p>
          <span className="text-3xl font-bold text-teal-400">98%</span>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-sm text-slate-400 mb-1">Quality Rate</p>
          <span className="text-3xl font-bold text-emerald-400">99.5%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-slate-50 mb-4">Company Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Company Name</span>
              <span className="text-slate-50">PT Steelindo Perkasa</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Supplier Code</span>
              <span className="text-slate-50 font-mono">SUP-001</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Category</span>
              <span className="text-slate-50">Raw Material</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Material Type</span>
              <span className="text-slate-50">Steel Sheet</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Address</span>
              <span className="text-slate-50">Jl. Industri Raya No. 45, Bekasi</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Phone</span>
              <span className="text-slate-50">021-8901234</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-slate-50 mb-4">Contact Person</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Name</span>
              <span className="text-slate-50">Hendra Wijaya</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Position</span>
              <span className="text-slate-50">Sales Manager</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Email</span>
              <span className="text-slate-50">hendra@steelindo.co.id</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Phone</span>
              <span className="text-slate-50">0812-1234-5678</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PerformanceTab() {
  const metrics = [
    { name: "On-Time Delivery", score: 98, trend: "+2%", history: [95, 96, 97, 96, 98, 97, 98] },
    { name: "Quality Rate", score: 99.5, trend: "+0.5%", history: [98.5, 99, 99.2, 99, 99.3, 99.4, 99.5] },
    { name: "Response Time", score: 95, trend: "+5%", history: [85, 88, 90, 92, 93, 94, 95] },
    { name: "Price Competitiveness", score: 88, trend: "+1%", history: [85, 86, 87, 86, 87, 88, 88] },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">{metric.name}</span>
              <span className="text-xs text-emerald-400">{metric.trend}</span>
            </div>
            <div className="text-2xl font-bold text-slate-50 mb-2">{metric.score}%</div>
            <div className="flex items-center gap-1">
              {metric.history.map((val, i) => (
                <div
                  key={i}
                  className="flex-1 bg-teal-500/60 rounded-sm"
                  style={{ height: `${(val / 100) * 100}%`, minHeight: "4px" }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="font-semibold text-slate-50 mb-4">Evaluation History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-700">
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Evaluator</th>
                <th className="pb-2 font-medium">Rating</th>
                <th className="pb-2 font-medium">Overall Score</th>
                <th className="pb-2 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {[
                { date: "15 Feb 2026", evaluator: "Purchasing", rating: "A", score: 92, notes: "Excellent performance" },
                { date: "15 Jan 2026", evaluator: "Purchasing", rating: "A", score: 90, notes: "Good delivery" },
                { date: "15 Dec 2025", evaluator: "Purchasing", rating: "B", score: 85, notes: "Minor delay in Dec" },
                { date: "15 Nov 2025", evaluator: "Purchasing", rating: "A", score: 88, notes: "Stable" },
              ].map((eval_, idx) => (
                <tr key={idx} className="border-b border-slate-700/50">
                  <td className="py-3">{eval_.date}</td>
                  <td className="py-3">{eval_.evaluator}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/20 text-emerald-400">
                      {eval_.rating}
                    </span>
                  </td>
                  <td className="py-3 font-semibold text-teal-400">{eval_.score}</td>
                  <td className="py-3 text-slate-400">{eval_.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DeliveriesTab() {
  const deliveries = [
    { id: "PO-2026-0156", date: "17 Mar 2026", material: "Steel Sheet SPCC 1.0mm", qty: "5,000 kg", status: "Delivered", ontime: true },
    { id: "PO-2026-0145", date: "10 Mar 2026", material: "Steel Sheet SPCC 1.5mm", qty: "3,000 kg", status: "Delivered", ontime: true },
    { id: "PO-2026-0134", date: "03 Mar 2026", material: "Steel Sheet SPCC 2.0mm", qty: "4,500 kg", status: "Delivered", ontime: false },
    { id: "PO-2026-0123", date: "25 Feb 2026", material: "Steel Sheet SPCC 1.0mm", qty: "2,000 kg", status: "Delivered", ontime: true },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Recent Deliveries</h3>
        <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-slate-200">
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>This Year</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">PO Number</th>
              <th className="pb-2 font-medium">Date</th>
              <th className="pb-2 font-medium">Material</th>
              <th className="pb-2 font-medium">Qty</th>
              <th className="pb-2 font-medium">On-Time</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {deliveries.map((delivery) => (
              <tr key={delivery.id} className="border-b border-slate-700/50">
                <td className="py-3 font-mono text-teal-400">{delivery.id}</td>
                <td className="py-3">{delivery.date}</td>
                <td className="py-3">{delivery.material}</td>
                <td className="py-3">{delivery.qty}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${delivery.ontime ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                    {delivery.ontime ? "Yes" : "No"}
                  </span>
                </td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/20 text-emerald-400">
                    {delivery.status}
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

function DocumentsTab() {
  const documents = [
    { name: "ISO 9001 Certificate", type: "Certificate", validUntil: "Dec 2026", status: "Valid" },
    { name: "Business License", type: "License", validUntil: "Dec 2027", status: "Valid" },
    { name: "Tax Certificate (NPWP)", type: "Tax", validUntil: "Dec 2026", status: "Valid" },
    { name: "Quality Manual", type: "Document", validUntil: "-", status: "Active" },
    { name: "Material Test Report", type: "Report", validUntil: "Mar 2026", status: "Valid" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Documents</h3>
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
          Upload Document
        </button>
      </div>
      <div className="space-y-3">
        {documents.map((doc, idx) => (
          <div key={idx} className="p-4 bg-slate-700/30 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-slate-50">{doc.name}</p>
                <p className="text-xs text-slate-400">{doc.type} • Exp: {doc.validUntil}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs ${
                doc.status === "Valid" ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/20 text-blue-400"
              }`}>
                {doc.status}
              </span>
              <button className="p-2 hover:bg-slate-600 rounded">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
