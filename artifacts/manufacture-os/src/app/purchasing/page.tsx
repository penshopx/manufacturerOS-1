"use client";

import { useState } from "react";

export default function PurchasingPage() {
  const [activeTab, setActiveTab] = useState("purchaseorders");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Purchasing</h1>
          <p className="text-slate-400">Pengelolaan procurement dan supplier</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
            + New PO
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {["purchaseorders", "suppliers", "requests"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-teal-600 text-white"
                : "bg-slate-700 text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab === "purchaseorders" && "Purchase Orders"}
            {tab === "suppliers" && "Suppliers"}
            {tab === "requests" && "Purchase Requests"}
          </button>
        ))}
      </div>

      {activeTab === "purchaseorders" && <PurchaseOrdersTab />}
      {activeTab === "suppliers" && <SuppliersTab />}
      {activeTab === "requests" && <RequestsTab />}
    </div>
  );
}

function PurchaseOrdersTab() {
  const orders = [
    { id: "PO-2026-0156", date: "17 Mar 2026", supplier: "PT Steelindo Perkasa", items: 3, total: "Rp 125,000,000", status: "Approved" },
    { id: "PO-2026-0155", date: "16 Mar 2026", supplier: "PT Alumindo Industry", items: 2, total: "Rp 85,000,000", status: "Received" },
    { id: "PO-2026-0154", date: "15 Mar 2026", supplier: "PT Chemco Indonesia", items: 5, total: "Rp 45,000,000", status: "In Transit" },
    { id: "PO-2026-0153", date: "14 Mar 2026", supplier: "PT Fastener Indonesia", items: 4, total: "Rp 22,500,000", status: "Draft" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-sm text-slate-400">Total PO</p>
          <p className="text-2xl font-bold text-slate-50">24</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-sm text-slate-400">Pending</p>
          <p className="text-2xl font-bold text-amber-400">3</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-sm text-slate-400">This Month</p>
          <p className="text-2xl font-bold text-teal-400">Rp 450M</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-sm text-slate-400">Suppliers</p>
          <p className="text-2xl font-bold text-slate-50">12</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-50">Purchase Orders</h3>
          <input
            type="text"
            placeholder="Search PO..."
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-slate-200"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-700">
                <th className="pb-2 font-medium">PO Number</th>
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Supplier</th>
                <th className="pb-2 font-medium">Items</th>
                <th className="pb-2 font-medium">Total</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-slate-700/50">
                  <td className="py-3 font-mono text-teal-400">{order.id}</td>
                  <td className="py-3">{order.date}</td>
                  <td className="py-3">{order.supplier}</td>
                  <td className="py-3">{order.items}</td>
                  <td className="py-3">{order.total}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      order.status === "Approved" ? "bg-blue-500/20 text-blue-400" :
                      order.status === "Received" ? "bg-emerald-500/20 text-emerald-400" :
                      order.status === "In Transit" ? "bg-amber-500/20 text-amber-400" : "bg-slate-600 text-slate-400"
                    }`}>
                      {order.status}
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

function SuppliersTab() {
  const suppliers = [
    { code: "SUP-001", name: "PT Steelindo Perkasa", category: "Steel", rating: "A", poCount: 45, status: "Approved" },
    { code: "SUP-002", name: "PT Alumindo Industry", category: "Aluminum", rating: "A", poCount: 32, status: "Approved" },
    { code: "SUP-003", name: "PT Fastener Indonesia", category: "Fasteners", rating: "B", poCount: 28, status: "Approved" },
    { code: "SUP-004", name: "PT Chemco Indonesia", category: "Chemicals", rating: "A", poCount: 15, status: "Approved" },
    { code: "SUP-005", name: "CV Jaya Plastic", category: "Packaging", rating: "C", poCount: 8, status: "Probation" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Approved Suppliers</h3>
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
          + Add Supplier
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">Code</th>
              <th className="pb-2 font-medium">Supplier Name</th>
              <th className="pb-2 font-medium">Category</th>
              <th className="pb-2 font-medium">Rating</th>
              <th className="pb-2 font-medium">PO Count</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {suppliers.map((supplier) => (
              <tr key={supplier.code} className="border-b border-slate-700/50">
                <td className="py-3 font-mono text-teal-400">{supplier.code}</td>
                <td className="py-3">{supplier.name}</td>
                <td className="py-3">{supplier.category}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    supplier.rating === "A" ? "bg-emerald-500/20 text-emerald-400" :
                    supplier.rating === "B" ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"
                  }`}>
                    {supplier.rating}
                  </span>
                </td>
                <td className="py-3">{supplier.poCount}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    supplier.status === "Approved" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {supplier.status}
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

function RequestsTab() {
  const requests = [
    { id: "PR-2026-0089", date: "17 Mar 2026", department: "Production", item: "Steel Sheet SPCC 1.0mm", qty: "5,000 kg", urgency: "High", status: "Pending" },
    { id: "PR-2026-0088", date: "16 Mar 2026", department: "Maintenance", item: "Lubricant Oil", qty: "100 L", urgency: "Medium", status: "Approved" },
    { id: "PR-2026-0087", date: "15 Mar 2026", department: "Quality", item: "Testing Equipment", qty: "2 units", urgency: "Low", status: "Rejected" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Purchase Requests</h3>
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
          + New Request
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">PR Number</th>
              <th className="pb-2 font-medium">Date</th>
              <th className="pb-2 font-medium">Department</th>
              <th className="pb-2 font-medium">Item</th>
              <th className="pb-2 font-medium">Qty</th>
              <th className="pb-2 font-medium">Urgency</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {requests.map((req) => (
              <tr key={req.id} className="border-b border-slate-700/50">
                <td className="py-3 font-mono text-teal-400">{req.id}</td>
                <td className="py-3">{req.date}</td>
                <td className="py-3">{req.department}</td>
                <td className="py-3">{req.item}</td>
                <td className="py-3">{req.qty}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    req.urgency === "High" ? "bg-red-500/20 text-red-400" :
                    req.urgency === "Medium" ? "bg-amber-500/20 text-amber-400" : "bg-slate-600 text-slate-300"
                  }`}>
                    {req.urgency}
                  </span>
                </td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    req.status === "Pending" ? "bg-amber-500/20 text-amber-400" :
                    req.status === "Approved" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                  }`}>
                    {req.status}
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
