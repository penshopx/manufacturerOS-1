"use client";

import { useState } from "react";

export default function MasterPage() {
  const [activeTab, setActiveTab] = useState("customers");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Master Data</h1>
          <p className="text-slate-400">Pengelolaan data master ManufactureOS</p>
        </div>
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New
        </button>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {[
          { id: "customers", label: "Customers", icon: "🏢", count: 8 },
          { id: "parts", label: "Parts/Products", icon: "🔩", count: 156 },
          { id: "lines", label: "Production Lines", icon: "⚙️", count: 4 },
          { id: "users", label: "Users", icon: "👥", count: 45 },
          { id: "suppliers", label: "Suppliers", icon: "📦", count: 23 },
          { id: "machines", label: "Machines", icon: "🏭", count: 18 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-teal-600 text-white"
                : "bg-slate-700 text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab.icon} {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {activeTab === "customers" && <CustomersTab />}
      {activeTab === "parts" && <PartsTab />}
      {activeTab === "lines" && <LinesTab />}
      {activeTab === "users" && <UsersTab />}
      {activeTab === "suppliers" && <SuppliersTab />}
      {activeTab === "machines" && <MachinesTab />}
    </div>
  );
}

function CustomersTab() {
  const customers = [
    { id: "CUST-001", name: "PT Toyota Astra Motor", tier: "OEM", code: "TAM", contact: "Budi Hartono", phone: "021-1234567", status: "Active" },
    { id: "CUST-002", name: "PT Astra Daihatsu Motor", tier: "Tier 1", code: "ADM", contact: "Siti Rahayu", phone: "021-2345678", status: "Active" },
    { id: "CUST-003", name: "PT Hyundai Motor Indonesia", tier: "OEM", code: "HMID", contact: "Joko Pranoto", phone: "021-3456789", status: "Active" },
    { id: "CUST-004", name: "PT Mitsubishi Motors Krama Yudha", tier: "Tier 1", code: "MMKI", contact: "Ahmad Faisal", phone: "021-4567890", status: "Active" },
    { id: "CUST-005", name: "PT Nissan Motor Indonesia", tier: "OEM", code: "NMID", contact: "Dewi Lestari", phone: "021-5678901", status: "Inactive" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Customer Directory</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search customers..."
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">ID</th>
              <th className="pb-2 font-medium">Customer Name</th>
              <th className="pb-2 font-medium">Tier</th>
              <th className="pb-2 font-medium">Code</th>
              <th className="pb-2 font-medium">Contact</th>
              <th className="pb-2 font-medium">Phone</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                <td className="py-3 font-mono text-xs">{customer.id}</td>
                <td className="py-3 font-medium text-slate-50">{customer.name}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    customer.tier === "OEM" ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"
                  }`}>
                    {customer.tier}
                  </span>
                </td>
                <td className="py-3">{customer.code}</td>
                <td className="py-3">{customer.contact}</td>
                <td className="py-3">{customer.phone}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    customer.status === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-600 text-slate-400"
                  }`}>
                    {customer.status}
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
    { id: "PART-001", code: "NSG-001", name: "Nose Sub Assembly", customer: "PT Toyota Astra Motor", category: "Body Parts", uom: "pc", status: "Active" },
    { id: "PART-002", code: "BRG-002", name: "Bracket Rear Left", customer: "PT Astra Daihatsu Motor", category: "Chassis", uom: "pc", status: "Active" },
    { id: "PART-003", code: "FRM-003", name: "Frame Main", customer: "PT Hyundai Motor Indonesia", category: "Body Parts", uom: "pc", status: "Active" },
    { id: "PART-004", code: "PNL-004", name: "Panel Door Outer", customer: "PT Toyota Astra Motor", category: "Body Parts", uom: "pc", status: "Active" },
    { id: "PART-005", code: "ENG-005", name: "Engine Mount Bracket", customer: "PT Mitsubishi Motors", category: "Engine", uom: "set", status: "Inactive" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Parts/Products Directory</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search parts..."
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">ID</th>
              <th className="pb-2 font-medium">Part Code</th>
              <th className="pb-2 font-medium">Part Name</th>
              <th className="pb-2 font-medium">Customer</th>
              <th className="pb-2 font-medium">Category</th>
              <th className="pb-2 font-medium">UOM</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {parts.map((part) => (
              <tr key={part.id} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                <td className="py-3 font-mono text-xs">{part.id}</td>
                <td className="py-3 font-medium text-teal-400">{part.code}</td>
                <td className="py-3 text-slate-50">{part.name}</td>
                <td className="py-3">{part.customer.split(" ")[1]}</td>
                <td className="py-3">{part.category}</td>
                <td className="py-3">{part.uom}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    part.status === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-600 text-slate-400"
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

function LinesTab() {
  const lines = [
    { id: "LINE-001", name: "Line 1 - Stamping", type: "Stamping", capacity: 400, status: "Running", oee: 92, location: "Building A" },
    { id: "LINE-002", name: "Line 2 - Assembly", type: "Assembly", capacity: 350, status: "Running", oee: 89, location: "Building A" },
    { id: "LINE-003", name: "Line 3 - Welding", type: "Welding", capacity: 300, status: "Running", oee: 88, location: "Building B" },
    { id: "LINE-004", name: "Line 4 - Finishing", type: "Finishing", capacity: 150, status: "Maintenance", oee: 0, location: "Building B" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Production Lines</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {lines.map((line) => (
          <div key={line.id} className="p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-slate-50">{line.name}</span>
              <span className={`w-2 h-2 rounded-full ${
                line.status === "Running" ? "bg-emerald-500" : "bg-amber-500"
              }`}></span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Type</span>
                <span className="text-slate-50">{line.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Capacity</span>
                <span className="text-slate-50">{line.capacity}/shift</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">OEE</span>
                <span className={`${line.oee >= 85 ? "text-emerald-400" : "text-amber-400"}`}>{line.oee}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Location</span>
                <span className="text-slate-50">{line.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UsersTab() {
  const users = [
    { id: "USR-001", name: "Ahmad Susanto", role: "Production Manager", dept: "Production", email: "ahmad.s@nusantara.co.id", status: "Active" },
    { id: "USR-002", name: "Siti Nurhaliza", role: "QC Supervisor", dept: "Quality", email: "siti.n@nusantara.co.id", status: "Active" },
    { id: "USR-003", name: "Budi Santoso", role: "K3 Officer", dept: "HSE", email: "budi.s@nusantara.co.id", status: "Active" },
    { id: "USR-004", name: "Dewi Lestari", role: "Admin", dept: "General", email: "dewi.l@nusantara.co.id", status: "Active" },
    { id: "USR-005", name: "Joko Pramono", role: "Operator", dept: "Production", email: "joko.p@nusantara.co.id", status: "Active" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">User Management</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">ID</th>
              <th className="pb-2 font-medium">Name</th>
              <th className="pb-2 font-medium">Role</th>
              <th className="pb-2 font-medium">Department</th>
              <th className="pb-2 font-medium">Email</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                <td className="py-3 font-mono text-xs">{user.id}</td>
                <td className="py-3 font-medium text-slate-50">{user.name}</td>
                <td className="py-3">{user.role}</td>
                <td className="py-3">{user.dept}</td>
                <td className="py-3">{user.email}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    user.status === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-600 text-slate-400"
                  }`}>
                    {user.status}
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

function SuppliersTab() {
  const suppliers = [
    { id: "SUP-001", name: "PT Steelindo Perkasa", material: "Steel Sheet", rating: "A", contact: "Hendra Wijaya", status: "Approved" },
    { id: "SUP-002", name: "PT Alumindo Industry", material: "Aluminum", rating: "A", contact: "Rina Susilowati", status: "Approved" },
    { id: "SUP-003", name: "PT Fastener Indonesia", material: "Bolts & Nuts", rating: "B", contact: "Toni Suhartono", status: "Approved" },
    { id: "SUP-004", name: "PT Chemco Indonesia", material: "Chemicals", rating: "A", contact: "Maya Sari", status: "Approved" },
    { id: "SUP-005", name: "CV Jaya Plastic", material: "Packaging", rating: "C", contact: "Dedi Kurniawan", status: "Probation" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Supplier Directory</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">ID</th>
              <th className="pb-2 font-medium">Supplier Name</th>
              <th className="pb-2 font-medium">Material</th>
              <th className="pb-2 font-medium">Rating</th>
              <th className="pb-2 font-medium">Contact</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                <td className="py-3 font-mono text-xs">{supplier.id}</td>
                <td className="py-3 font-medium text-slate-50">{supplier.name}</td>
                <td className="py-3">{supplier.material}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    supplier.rating === "A" ? "bg-emerald-500/20 text-emerald-400" :
                    supplier.rating === "B" ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"
                  }`}>
                    {supplier.rating}
                  </span>
                </td>
                <td className="py-3">{supplier.contact}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    supplier.status === "Approved" ? "bg-emerald-500/20 text-emerald-400" :
                    supplier.status === "Probation" ? "bg-amber-500/20 text-amber-400" : "bg-slate-600 text-slate-400"
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

function MachinesTab() {
  const machines = [
    { id: "MCH-001", name: "CNC Press 1", type: "CNC Press", brand: "Amada", model: "HDS 1303", location: "Line 1", status: "Running" },
    { id: "MCH-002", name: "CNC Press 2", type: "CNC Press", brand: "Amada", model: "HDS 1303", location: "Line 1", status: "Running" },
    { id: "MCH-003", name: "Robotic Welder 1", type: "Robot", brand: "FANUC", model: "M-20iA", location: "Line 3", status: "Running" },
    { id: "MCH-004", name: "Assembly Robot 1", type: "Robot", brand: "ABB", model: "IRB 6700", location: "Line 2", status: "Running" },
    { id: "MCH-005", name: "Paint Booth 1", type: "Finishing", brand: "Gema", model: "OptiFlex", location: "Line 4", status: "Maintenance" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Machine Registry</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">ID</th>
              <th className="pb-2 font-medium">Machine Name</th>
              <th className="pb-2 font-medium">Type</th>
              <th className="pb-2 font-medium">Brand</th>
              <th className="pb-2 font-medium">Model</th>
              <th className="pb-2 font-medium">Location</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {machines.map((machine) => (
              <tr key={machine.id} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                <td className="py-3 font-mono text-xs">{machine.id}</td>
                <td className="py-3 font-medium text-slate-50">{machine.name}</td>
                <td className="py-3">{machine.type}</td>
                <td className="py-3">{machine.brand}</td>
                <td className="py-3">{machine.model}</td>
                <td className="py-3">{machine.location}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    machine.status === "Running" ? "bg-emerald-500/20 text-emerald-400" :
                    machine.status === "Maintenance" ? "bg-amber-500/20 text-amber-400" : "bg-slate-600 text-slate-400"
                  }`}>
                    {machine.status}
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
