"use client";

import { useState } from "react";

export default function DeliveryPage() {
  const [activeTab, setActiveTab] = useState("deliveries");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Sales & Delivery</h1>
          <p className="text-slate-400">Pengelolaan pesanan dan pengiriman</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
            + New Order
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {["deliveries", "orders", "customers", "invoices"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-teal-600 text-white"
                : "bg-slate-700 text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab === "deliveries" && "Deliveries"}
            {tab === "orders" && "Sales Orders"}
            {tab === "customers" && "Customers"}
            {tab === "invoices" && "Invoices"}
          </button>
        ))}
      </div>

      {activeTab === "deliveries" && <DeliveriesTab />}
      {activeTab === "orders" && <OrdersTab />}
      {activeTab === "customers" && <CustomersTab />}
      {activeTab === "invoices" && <InvoicesTab />}
    </div>
  );
}

function DeliveriesTab() {
  const deliveries = [
    { id: "DO-2026-0156", order: "SO-2026-0324", customer: "PT Toyota Astra Motor", date: "17 Mar 2026", items: 500, vehicle: "B 1234 ABC", driver: "Pak Budi", status: "On Delivery" },
    { id: "DO-2026-0155", order: "SO-2026-0315", customer: "PT Astra Daihatsu Motor", date: "17 Mar 2026", items: 300, vehicle: "B 5678 DEF", driver: "Pak Toni", status: "Delivered" },
    { id: "DO-2026-0154", order: "SO-2026-0308", customer: "PT Hyundai Motor Indonesia", date: "16 Mar 2026", items: 200, vehicle: "B 9012 GHI", driver: "Pak Jono", status: "Delivered" },
    { id: "DO-2026-0153", order: "SO-2026-0295", customer: "PT Mitsubishi Motors", date: "15 Mar 2026", items: 150, vehicle: "B 3456 JKL", driver: "Pak Budi", status: "Delivered" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-sm text-slate-400">Total Deliveries</p>
          <p className="text-2xl font-bold text-slate-50">156</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-sm text-slate-400">On Delivery</p>
          <p className="text-2xl font-bold text-blue-400">3</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-sm text-slate-400">Delivered Today</p>
          <p className="text-2xl font-bold text-emerald-400">12</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-sm text-slate-400">On-Time Rate</p>
          <p className="text-2xl font-bold text-teal-400">98%</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-50">Delivery Orders</h3>
          <input
            type="text"
            placeholder="Search..."
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-slate-200"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-700">
                <th className="pb-2 font-medium">DO Number</th>
                <th className="pb-2 font-medium">Order</th>
                <th className="pb-2 font-medium">Customer</th>
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Items</th>
                <th className="pb-2 font-medium">Driver</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {deliveries.map((d) => (
                <tr key={d.id} className="border-b border-slate-700/50">
                  <td className="py-3 font-mono text-teal-400">{d.id}</td>
                  <td className="py-3">{d.order}</td>
                  <td className="py-3">{d.customer.split(" ")[1]}</td>
                  <td className="py-3">{d.date}</td>
                  <td className="py-3">{d.items} unit</td>
                  <td className="py-3">{d.driver}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      d.status === "Delivered" ? "bg-emerald-500/20 text-emerald-400" :
                      d.status === "On Delivery" ? "bg-blue-500/20 text-blue-400" : "bg-amber-500/20 text-amber-400"
                    }`}>
                      {d.status}
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

function OrdersTab() {
  const orders = [
    { id: "SO-2026-0324", customer: "PT Toyota Astra Motor", part: "NSG-001", qty: 500, value: "Rp 125,000,000", date: "17 Mar 2026", status: "Processing", priority: "High" },
    { id: "SO-2026-0323", customer: "PT Astra Daihatsu Motor", part: "BRG-002", qty: 300, value: "Rp 75,000,000", date: "17 Mar 2026", status: "Confirmed", priority: "Medium" },
    { id: "SO-2026-0322", customer: "PT Hyundai Motor Indonesia", part: "FRM-003", qty: 200, value: "Rp 60,000,000", date: "16 Mar 2026", status: "Shipped", priority: "High" },
    { id: "SO-2026-0321", customer: "PT Mitsubishi Motors", part: "PNL-004", qty: 150, value: "Rp 45,000,000", date: "16 Mar 2026", status: "Delivered", priority: "Low" },
    { id: "SO-2026-0320", customer: "PT Nissan Motor Indonesia", part: "ENG-005", qty: 100, value: "Rp 30,000,000", date: "15 Mar 2026", status: "Delivered", priority: "Medium" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Sales Orders</h3>
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white">
          + New Order
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">SO Number</th>
              <th className="pb-2 font-medium">Customer</th>
              <th className="pb-2 font-medium">Part</th>
              <th className="pb-2 font-medium">Qty</th>
              <th className="pb-2 font-medium">Value</th>
              <th className="pb-2 font-medium">Date</th>
              <th className="pb-2 font-medium">Priority</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-slate-700/50">
                <td className="py-3 font-mono text-teal-400">{order.id}</td>
                <td className="py-3">{order.customer.split(" ")[1]}</td>
                <td className="py-3">{order.part}</td>
                <td className="py-3">{order.qty}</td>
                <td className="py-3">{order.value}</td>
                <td className="py-3">{order.date}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    order.priority === "High" ? "bg-red-500/20 text-red-400" :
                    order.priority === "Medium" ? "bg-amber-500/20 text-amber-400" : "bg-slate-600 text-slate-300"
                  }`}>
                    {order.priority}
                  </span>
                </td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    order.status === "Delivered" ? "bg-emerald-500/20 text-emerald-400" :
                    order.status === "Shipped" ? "bg-blue-500/20 text-blue-400" :
                    order.status === "Confirmed" ? "bg-teal-500/20 text-teal-400" : "bg-amber-500/20 text-amber-400"
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

function CustomersTab() {
  const customers = [
    { code: "CUST-001", name: "PT Toyota Astra Motor", tier: "OEM", contact: "Budi Hartono", phone: "021-65301000", orders: 324, revenue: "Rp 45B", status: "Active" },
    { code: "CUST-002", name: "PT Astra Daihatsu Motor", tier: "Tier 1", contact: "Siti Rahayu", phone: "021-2345678", orders: 156, revenue: "Rp 22B", status: "Active" },
    { code: "CUST-003", name: "PT Hyundai Motor Indonesia", tier: "OEM", contact: "Joko Pranoto", phone: "021-3456789", orders: 98, revenue: "Rp 15B", status: "Active" },
    { code: "CUST-004", name: "PT Mitsubishi Motors Krama Yudha", tier: "Tier 1", contact: "Ahmad Faisal", phone: "021-4567890", orders: 72, revenue: "Rp 10B", status: "Active" },
    { code: "CUST-005", name: "PT Nissan Motor Indonesia", tier: "OEM", contact: "Dewi Lestari", phone: "021-5678901", orders: 45, revenue: "Rp 8B", status: "Inactive" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Customer Directory</h3>
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white">
          + Add Customer
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">Code</th>
              <th className="pb-2 font-medium">Customer</th>
              <th className="pb-2 font-medium">Tier</th>
              <th className="pb-2 font-medium">Contact</th>
              <th className="pb-2 font-medium">Orders</th>
              <th className="pb-2 font-medium">Revenue</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {customers.map((c) => (
              <tr key={c.code} className="border-b border-slate-700/50">
                <td className="py-3 font-mono text-teal-400">{c.code}</td>
                <td className="py-3">{c.name.split(" ")[1]}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    c.tier === "OEM" ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"
                  }`}>
                    {c.tier}
                  </span>
                </td>
                <td className="py-3">{c.contact}</td>
                <td className="py-3">{c.orders}</td>
                <td className="py-3">{c.revenue}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    c.status === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-600 text-slate-400"
                  }`}>
                    {c.status}
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

function InvoicesTab() {
  const invoices = [
    { id: "INV-2026-0156", customer: "PT Toyota Astra Motor", order: "SO-2026-0324", amount: "Rp 125,000,000", date: "17 Mar 2026", due: "17 Apr 2026", status: "Pending" },
    { id: "INV-2026-0145", customer: "PT Astra Daihatsu Motor", order: "SO-2026-0295", amount: "Rp 75,000,000", date: "10 Mar 2026", due: "10 Apr 2026", status: "Paid" },
    { id: "INV-2026-0134", customer: "PT Hyundai Motor Indonesia", order: "SO-2026-0280", amount: "Rp 60,000,000", date: "03 Mar 2026", due: "03 Apr 2026", status: "Paid" },
    { id: "INV-2026-0123", customer: "PT Mitsubishi Motors", order: "SO-2026-0275", amount: "Rp 45,000,000", date: "25 Feb 2026", due: "25 Mar 2026", status: "Overdue" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Invoices</h3>
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white">
          + Create Invoice
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">Invoice</th>
              <th className="pb-2 font-medium">Customer</th>
              <th className="pb-2 font-medium">Order</th>
              <th className="pb-2 font-medium">Amount</th>
              <th className="pb-2 font-medium">Date</th>
              <th className="pb-2 font-medium">Due</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-slate-700/50">
                <td className="py-3 font-mono text-teal-400">{inv.id}</td>
                <td className="py-3">{inv.customer.split(" ")[1]}</td>
                <td className="py-3">{inv.order}</td>
                <td className="py-3">{inv.amount}</td>
                <td className="py-3">{inv.date}</td>
                <td className="py-3">{inv.due}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    inv.status === "Paid" ? "bg-emerald-500/20 text-emerald-400" :
                    inv.status === "Pending" ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"
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
