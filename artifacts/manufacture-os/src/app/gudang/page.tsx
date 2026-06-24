"use client";

import { useState } from "react";

export default function GudangPage() {
  const [activeTab, setActiveTab] = useState("inventory");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Gudang & Inventory</h1>
          <p className="text-slate-400">Pengelolaan material dan inventori</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium text-white transition-colors">
            Stock Opname
          </button>
          <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
            Material Request
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {["inventory", "incoming", "outgoing", "locations"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-teal-600 text-white"
                : "bg-slate-700 text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab === "inventory" && "Inventory"}
            {tab === "incoming" && "Incoming"}
            {tab === "outgoing" && "Outgoing"}
            {tab === "locations" && "Locations"}
          </button>
        ))}
      </div>

      {activeTab === "inventory" && <InventoryTab />}
      {activeTab === "incoming" && <IncomingTab />}
      {activeTab === "outgoing" && <OutgoingTab />}
      {activeTab === "locations" && <LocationsTab />}
    </div>
  );
}

function InventoryTab() {
  const inventory = [
    { code: "MAT-001", name: "Steel Sheet SPCC 1.0mm", category: "Raw Material", uom: "kg", stock: 12500, min: 5000, max: 20000, status: "OK" },
    { code: "MAT-002", name: "Steel Sheet SPCC 1.5mm", category: "Raw Material", uom: "kg", stock: 8200, min: 3000, max: 15000, status: "OK" },
    { code: "MAT-003", name: "Aluminum Sheet 2.0mm", category: "Raw Material", uom: "kg", stock: 2100, min: 2000, max: 10000, status: "Warning" },
    { code: "MAT-004", name: "Welding Wire", category: "Consumable", uom: "roll", stock: 45, min: 20, max: 100, status: "OK" },
    { code: "MAT-005", name: "Lubricant Oil", category: "Consumable", uom: "L", stock: 180, min: 100, max: 500, status: "OK" },
    { code: "MAT-006", name: "Paint Thinner", category: "Chemical", uom: "L", stock: 25, min: 50, max: 200, status: "Critical" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-sm text-slate-400">Total Items</p>
          <p className="text-2xl font-bold text-slate-50">156</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-sm text-slate-400">Total Value</p>
          <p className="text-2xl font-bold text-teal-400">Rp 2.5B</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-sm text-slate-400">Low Stock</p>
          <p className="text-2xl font-bold text-amber-400">3</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-sm text-slate-400">Critical</p>
          <p className="text-2xl font-bold text-red-400">1</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-50">Stock Inventory</h3>
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
                <th className="pb-2 font-medium">Code</th>
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Category</th>
                <th className="pb-2 font-medium">Stock</th>
                <th className="pb-2 font-medium">Min</th>
                <th className="pb-2 font-medium">Max</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {inventory.map((item) => (
                <tr key={item.code} className="border-b border-slate-700/50">
                  <td className="py-3 font-mono text-teal-400">{item.code}</td>
                  <td className="py-3">{item.name}</td>
                  <td className="py-3">{item.category}</td>
                  <td className="py-3">{item.stock.toLocaleString()} {item.uom}</td>
                  <td className="py-3">{item.min.toLocaleString()}</td>
                  <td className="py-3">{item.max.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      item.status === "OK" ? "bg-emerald-500/20 text-emerald-400" :
                      item.status === "Warning" ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"
                    }`}>
                      {item.status}
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

function IncomingTab() {
  const incoming = [
    { id: "GR-2026-0156", date: "17 Mar 2026", supplier: "PT Steelindo Perkasa", po: "PO-2026-0156", items: 3, status: "Received" },
    { id: "GR-2026-0155", date: "16 Mar 2026", supplier: "PT Alumindo Industry", po: "PO-2026-0155", items: 2, status: "Received" },
    { id: "GR-2026-0154", date: "15 Mar 2026", supplier: "PT Chemco Indonesia", po: "PO-2026-0154", items: 5, status: "In Transit" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Incoming Materials (Goods Receipt)</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">GR Number</th>
              <th className="pb-2 font-medium">Date</th>
              <th className="pb-2 font-medium">Supplier</th>
              <th className="pb-2 font-medium">PO Number</th>
              <th className="pb-2 font-medium">Items</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {incoming.map((item) => (
              <tr key={item.id} className="border-b border-slate-700/50">
                <td className="py-3 font-mono text-teal-400">{item.id}</td>
                <td className="py-3">{item.date}</td>
                <td className="py-3">{item.supplier}</td>
                <td className="py-3">{item.po}</td>
                <td className="py-3">{item.items}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    item.status === "Received" ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/20 text-blue-400"
                  }`}>
                    {item.status}
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

function OutgoingTab() {
  const outgoing = [
    { id: "RM-2026-0156", date: "17 Mar 2026", request: "WO-2026-015", line: "Line 1", items: 5, status: "Issued" },
    { id: "RM-2026-0155", date: "17 Mar 2026", request: "WO-2026-014", line: "Line 3", items: 3, status: "Issued" },
    { id: "RM-2026-0154", date: "16 Mar 2026", request: "WO-2026-013", line: "Line 2", items: 4, status: "Issued" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Outgoing Materials (Material Requisition)</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">RM Number</th>
              <th className="pb-2 font-medium">Date</th>
              <th className="pb-2 font-medium">Request (WO)</th>
              <th className="pb-2 font-medium">Line</th>
              <th className="pb-2 font-medium">Items</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {outgoing.map((item) => (
              <tr key={item.id} className="border-b border-slate-700/50">
                <td className="py-3 font-mono text-teal-400">{item.id}</td>
                <td className="py-3">{item.date}</td>
                <td className="py-3">{item.request}</td>
                <td className="py-3">{item.line}</td>
                <td className="py-3">{item.items}</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/20 text-emerald-400">
                    {item.status}
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

function LocationsTab() {
  const locations = [
    { code: "WH-01", name: "Raw Material Warehouse A", capacity: "80%", items: 45, type: "Indoor" },
    { code: "WH-02", name: "Raw Material Warehouse B", capacity: "65%", items: 32, type: "Indoor" },
    { code: "WH-03", name: "Finished Goods", capacity: "40%", items: 18, type: "Indoor" },
    { code: "WH-04", name: "Chemical Storage", capacity: "75%", items: 12, type: "Hazardous" },
    { code: "WH-05", name: "Consumables", capacity: "90%", items: 28, type: "Indoor" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Warehouse Locations</h3>
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
          + Add Location
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((loc) => (
          <div key={loc.code} className="p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-teal-400">{loc.code}</span>
              <span className={`px-2 py-0.5 rounded text-xs ${
                loc.type === "Hazardous" ? "bg-red-500/20 text-red-400" : "bg-slate-600 text-slate-300"
              }`}>
                {loc.type}
              </span>
            </div>
            <p className="font-medium text-slate-50 mb-2">{loc.name}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Capacity</span>
                <span className="text-slate-50">{loc.capacity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Items</span>
                <span className="text-slate-50">{loc.items}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
