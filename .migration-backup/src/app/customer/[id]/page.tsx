"use client";

import { useState } from "react";

export default function CustomerPage() {
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
              <h1 className="text-2xl font-bold text-slate-50">PT Toyota Astra Motor</h1>
              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs font-medium">OEM</span>
            </div>
            <p className="text-slate-400">CUST-001 • Tier 1 Customer</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium text-white transition-colors">
            Edit
          </button>
          <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
            New Order
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {["overview", "orders", "parts", "quality", "invoices"].map((tab) => (
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
            {tab === "orders" && "Orders"}
            {tab === "parts" && "Parts"}
            {tab === "quality" && "Quality"}
            {tab === "invoices" && "Invoices"}
          </button>
        ))}
      </div>

      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "orders" && <OrdersTab />}
      {activeTab === "parts" && <PartsTab />}
      {activeTab === "quality" && <QualityTab />}
      {activeTab === "invoices" && <InvoicesTab />}
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-sm text-slate-400 mb-1">Total Orders</p>
          <span className="text-3xl font-bold text-slate-50">324</span>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-sm text-slate-400 mb-1">Active Parts</p>
          <span className="text-3xl font-bold text-slate-50">24</span>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-sm text-slate-400 mb-1">On-Time Delivery</p>
          <span className="text-3xl font-bold text-teal-400">99%</span>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-sm text-slate-400 mb-1">Quality Score</p>
          <span className="text-3xl font-bold text-emerald-400">A</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-slate-50 mb-4">Customer Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Customer Name</span>
              <span className="text-slate-50">PT Toyota Astra Motor</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Customer Code</span>
              <span className="text-slate-50 font-mono">CUST-001</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Tier</span>
              <span className="text-purple-400">OEM (Tier 1)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Industry</span>
              <span className="text-slate-50">Automotive</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Address</span>
              <span className="text-slate-50">Sunter, Jakarta Utara</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Phone</span>
              <span className="text-slate-50">021-65301000</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-slate-50 mb-4">Contact Person</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Name</span>
              <span className="text-slate-50">Budi Hartono</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Position</span>
              <span className="text-slate-50">Purchasing Manager</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Department</span>
              <span className="text-slate-50">Procurement</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Email</span>
              <span className="text-slate-50">budi.hartono@toyota.co.id</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-slate-400">Phone</span>
              <span className="text-slate-50">0812-9876-5432</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="font-semibold text-slate-50 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { date: "17 Mar 2026", activity: "Order #SO-2026-0324 delivered", type: "delivery" },
            { date: "15 Mar 2026", activity: "Quality audit passed - Grade A", type: "quality" },
            { date: "12 Mar 2026", activity: "New part NSG-005 added to BOM", type: "parts" },
            { date: "10 Mar 2026", activity: "Monthly meeting held", type: "meeting" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                item.type === "delivery" ? "bg-emerald-500" :
                item.type === "quality" ? "bg-teal-500" :
                item.type === "parts" ? "bg-blue-500" : "bg-purple-500"
              }`}></div>
              <div className="flex-1">
                <p className="text-sm text-slate-50">{item.activity}</p>
                <p className="text-xs text-slate-400">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OrdersTab() {
  const orders = [
    { id: "SO-2026-0324", date: "17 Mar 2026", part: "NSG-001", qty: 500, status: "Delivered", value: "Rp 125,000,000" },
    { id: "SO-2026-0315", date: "15 Mar 2026", part: "BRG-002", qty: 300, status: "In Production", value: "Rp 75,000,000" },
    { id: "SO-2026-0308", date: "12 Mar 2026", part: "PNL-004", qty: 200, status: "Shipped", value: "Rp 50,000,000" },
    { id: "SO-2026-0295", date: "08 Mar 2026", part: "NSG-001", qty: 450, status: "Delivered", value: "Rp 112,500,000" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Orders</h3>
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
          New Order
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">Order #</th>
              <th className="pb-2 font-medium">Date</th>
              <th className="pb-2 font-medium">Part</th>
              <th className="pb-2 font-medium">Qty</th>
              <th className="pb-2 font-medium">Value</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-slate-700/50">
                <td className="py-3 font-mono text-teal-400">{order.id}</td>
                <td className="py-3">{order.date}</td>
                <td className="py-3">{order.part}</td>
                <td className="py-3">{order.qty}</td>
                <td className="py-3">{order.value}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    order.status === "Delivered" ? "bg-emerald-500/20 text-emerald-400" :
                    order.status === "Shipped" ? "bg-blue-500/20 text-blue-400" :
                    "bg-amber-500/20 text-amber-400"
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
  );
}

function PartsTab() {
  const parts = [
    { code: "NSG-001", name: "Nose Sub Assembly", category: "Body Parts", status: "Active", unitPrice: "Rp 250,000" },
    { code: "BRG-002", name: "Bracket Rear Left", category: "Chassis", status: "Active", unitPrice: "Rp 150,000" },
    { code: "PNL-004", name: "Panel Door Outer", category: "Body Parts", status: "Active", unitPrice: "Rp 200,000" },
    { code: "ENG-005", name: "Engine Mount Bracket", category: "Engine", status: "Pending", unitPrice: "Rp 180,000" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Parts / Products</h3>
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
          Add Part
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">Part Code</th>
              <th className="pb-2 font-medium">Part Name</th>
              <th className="pb-2 font-medium">Category</th>
              <th className="pb-2 font-medium">Unit Price</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {parts.map((part) => (
              <tr key={part.code} className="border-b border-slate-700/50">
                <td className="py-3 font-mono text-teal-400">{part.code}</td>
                <td className="py-3">{part.name}</td>
                <td className="py-3">{part.category}</td>
                <td className="py-3">{part.unitPrice}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    part.status === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {part.status}
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

function QualityTab() {
  const metrics = [
    { name: "Defect Rate", score: 0.05, target: 0.1, unit: "%" },
    { name: "On-Time Delivery", score: 99, target: 95, unit: "%" },
    { name: "Customer Complaints", score: 1, target: 3, unit: "complaints" },
    { name: "SQAM Grade", score: "A", target: "A", unit: "" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-sm text-slate-400 mb-1">{metric.name}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-50">{metric.score}</span>
              <span className="text-slate-400">{metric.unit}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Target: {metric.target}{metric.unit}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="font-semibold text-slate-50 mb-4">Quality Performance History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-700">
                <th className="pb-2 font-medium">Month</th>
                <th className="pb-2 font-medium">Defect Rate</th>
                <th className="pb-2 font-medium">OTD</th>
                <th className="pb-2 font-medium">Complaints</th>
                <th className="pb-2 font-medium">SQAM</th>
                <th className="pb-2 font-medium">Rating</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {[
                { month: "Mar 2026", defect: "0.05%", otd: "99%", complaints: 1, sqam: "A", rating: "Excellent" },
                { month: "Feb 2026", defect: "0.06%", otd: "98%", complaints: 2, sqam: "A", rating: "Excellent" },
                { month: "Jan 2026", defect: "0.08%", otd: "97%", complaints: 2, sqam: "A", rating: "Good" },
                { month: "Dec 2025", defect: "0.07%", otd: "99%", complaints: 1, sqam: "A", rating: "Excellent" },
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-slate-700/50">
                  <td className="py-3">{row.month}</td>
                  <td className="py-3">{row.defect}</td>
                  <td className="py-3">{row.otd}</td>
                  <td className="py-3">{row.complaints}</td>
                  <td className="py-3">{row.sqam}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/20 text-emerald-400">
                      {row.rating}
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

function InvoicesTab() {
  const invoices = [
    { id: "INV-2026-0156", date: "17 Mar 2026", order: "SO-2026-0324", amount: "Rp 125,000,000", status: "Paid" },
    { id: "INV-2026-0145", date: "10 Mar 2026", order: "SO-2026-0295", amount: "Rp 112,500,000", status: "Paid" },
    { id: "INV-2026-0134", date: "03 Mar 2026", order: "SO-2026-0280", amount: "Rp 98,000,000", status: "Pending" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Invoices</h3>
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
          Create Invoice
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">Invoice #</th>
              <th className="pb-2 font-medium">Date</th>
              <th className="pb-2 font-medium">Order</th>
              <th className="pb-2 font-medium">Amount</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-slate-700/50">
                <td className="py-3 font-mono text-teal-400">{inv.id}</td>
                <td className="py-3">{inv.date}</td>
                <td className="py-3">{inv.order}</td>
                <td className="py-3">{inv.amount}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    inv.status === "Paid" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {inv.status}
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
