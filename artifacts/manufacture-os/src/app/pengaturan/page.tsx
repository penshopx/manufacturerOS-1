"use client";

import { useState } from "react";

export default function PengaturanPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Pengaturan</h1>
          <p className="text-slate-400">Konfigurasi sistem ManufactureOS</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {[
          { id: "general", label: "General" },
          { id: "users", label: "User Management" },
          { id: "roles", label: "Roles & Permissions" },
          { id: "notifications", label: "Notifications" },
          { id: "integrations", label: "Integrations" },
          { id: "system", label: "System" },
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
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "general" && <GeneralTab />}
      {activeTab === "users" && <UsersTab />}
      {activeTab === "roles" && <RolesTab />}
      {activeTab === "notifications" && <NotificationsTab />}
      {activeTab === "integrations" && <IntegrationsTab />}
      {activeTab === "system" && <SystemTab />}
    </div>
  );
}

function GeneralTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-slate-50 mb-4">Informasi Pabrik</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Nama Pabrik</label>
              <input
                type="text"
                defaultValue="PT Nusantara Komponen"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Plant ID</label>
                <input
                  type="text"
                  defaultValue="PLANT-001"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Industri</label>
                <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-teal-500">
                  <option>Automotive Tier 2</option>
                  <option>Automotive Tier 1</option>
                  <option>General Manufacturing</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Alamat</label>
              <textarea
                rows={2}
                defaultValue="Jl. Industri Raya No. 123, Kawasan Industri Nusantara, Bekasi 17530"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-teal-500"
              />
            </div>
            <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
              Simpan Perubahan
            </button>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-slate-50 mb-4">AI Agents Configuration</h3>
          <div className="space-y-4">
            {[
              { name: "Production Agent", status: true, description: "Monitoring produksi dan prediksi delay" },
              { name: "Quality Agent", status: true, description: "Tracking defect dan analisis root cause" },
              { name: "K3 Agent", status: true, description: "Monitoring keselamatan kerja" },
              { name: "Audit Agent", status: false, description: "Persiapan audit dan dokumentasi" },
              { name: "Maintenance Agent", status: true, description: "Work orders dan preventive maintenance" },
            ].map((agent, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="font-medium text-slate-50">{agent.name}</p>
                  <p className="text-xs text-slate-400">{agent.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={agent.status} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <UserProfileCard />
        <SystemStatusCard />
      </div>
    </div>
  );
}

function UsersTab() {
  const users = [
    { id: "USR-001", name: "Ahmad Susanto", email: "ahmad.s@nusantara.co.id", role: "Admin", dept: "Production", status: "Active" },
    { id: "USR-002", name: "Siti Nurhaliza", email: "siti.n@nusantara.co.id", role: "QC Supervisor", dept: "Quality", status: "Active" },
    { id: "USR-003", name: "Budi Santoso", email: "budi.s@nusantara.co.id", role: "K3 Officer", dept: "HSE", status: "Active" },
    { id: "USR-004", name: "Dewi Lestari", email: "dewi.l@nusantara.co.id", role: "Admin", dept: "General", status: "Active" },
    { id: "USR-005", name: "Joko Pramono", email: "joko.p@nusantara.co.id", role: "Operator", dept: "Production", status: "Active" },
    { id: "USR-006", name: "Rinawaty", email: "rina.w@nusantara.co.id", role: "Purchasing", dept: "Purchasing", status: "Inactive" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-50">User Management</h3>
          <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
            + Add User
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-700">
                <th className="pb-2 font-medium">User</th>
                <th className="pb-2 font-medium">Role</th>
                <th className="pb-2 font-medium">Department</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {users.map((user) => (
                <tr key={user.id} className="border-b border-slate-700/50">
                  <td className="py-3">
                    <div>
                      <p className="font-medium text-slate-50">{user.name}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-slate-700 rounded text-xs">{user.role}</span>
                  </td>
                  <td className="py-3">{user.dept}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      user.status === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-600 text-slate-400"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="text-teal-400 hover:text-teal-300 text-xs mr-2">Edit</button>
                    <button className="text-red-400 hover:text-red-300 text-xs">Delete</button>
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

function RolesTab() {
  const roles = [
    { name: "Admin", users: 2, permissions: ["all"] },
    { name: "Production Manager", users: 1, permissions: ["production", "reports"] },
    { name: "QC Supervisor", users: 1, permissions: ["quality", "defects", "ncr"] },
    { name: "K3 Officer", users: 1, permissions: ["k3", "safety"] },
    { name: "Operator", users: 15, permissions: ["production:view", "quality:input"] },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-50">Roles & Permissions</h3>
          <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
            + Add Role
          </button>
        </div>
        <div className="space-y-4">
          {roles.map((role, idx) => (
            <div key={idx} className="p-4 bg-slate-700/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-slate-50">{role.name}</p>
                  <p className="text-xs text-slate-400">{role.users} users</p>
                </div>
                <button className="text-teal-400 hover:text-teal-300 text-xs">Edit Permissions</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((perm) => (
                  <span key={perm} className="px-2 py-1 bg-slate-600 rounded text-xs text-slate-300">
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotificationsTab() {
  const notifications = [
    { name: "Email Alerts", description: "Terima notifikasi via email", enabled: true },
    { name: "Production Alerts", description: "Notifikasi delay dan masalah produksi", enabled: true },
    { name: "Quality Alerts", description: "Notifikasi defect dan quality issues", enabled: true },
    { name: "K3 Alerts", description: "Notifikasi insiden dan hazard reports", enabled: true },
    { name: "Daily Summary", description: "Ringkasan harian otomatis setiap pagi", enabled: true },
    { name: "Weekly Report", description: "Laporan mingguan", enabled: false },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="font-semibold text-slate-50 mb-4">Pengaturan Notifikasi</h3>
        <div className="space-y-3">
          {notifications.map((notif, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-700/50 last:border-0">
              <div>
                <p className="text-sm text-slate-50">{notif.name}</p>
                <p className="text-xs text-slate-400">{notif.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={notif.enabled} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function IntegrationsTab() {
  const integrations = [
    { name: "ERP System", status: "connected", type: "SAP Business One" },
    { name: "MES", status: "available", type: "Custom Integration" },
    { name: "QMS", status: "available", type: "ISO" },
    { name: "HRIS", status: "disconnected", type: "Gadjian" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-50">Integrations</h3>
          <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
            + Add Integration
          </button>
        </div>
        <div className="space-y-4">
          {integrations.map((int, idx) => (
            <div key={idx} className="p-4 bg-slate-700/30 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-slate-50">{int.name}</p>
                  <p className="text-xs text-slate-400">{int.type}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                int.status === "connected" ? "bg-emerald-500/20 text-emerald-400" :
                int.status === "available" ? "bg-blue-500/20 text-blue-400" : "bg-slate-600 text-slate-400"
              }`}>
                {int.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SystemTab() {
  const systems = [
    { name: "API Server", status: "online", uptime: "99.9%", latency: "45ms" },
    { name: "AI Orchestrator", status: "online", uptime: "99.5%", latency: "120ms" },
    { name: "Database", status: "online", uptime: "99.99%", latency: "23ms" },
    { name: "Backup System", status: "online", uptime: "100%", latency: "-" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-slate-50 mb-4">System Status</h3>
          <div className="space-y-3">
            {systems.map((system, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${system.status === "online" ? "bg-emerald-500" : "bg-red-500"}`}></span>
                  <span className="text-sm text-slate-300">{system.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">{system.uptime}</span>
                  <span className="text-xs text-slate-500 ml-2">{system.latency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-slate-50 mb-4">System Info</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Version</span>
              <span className="text-slate-200">v1.0.0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Last Updated</span>
              <span className="text-slate-200">17 Mar 2026</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Environment</span>
              <span className="text-slate-200">Production</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Timezone</span>
              <span className="text-slate-200">Asia/Jakarta (WIB)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserProfileCard() {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-slate-50 mb-4">Profil Pengguna</h3>
      <div className="text-center mb-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
          AS
        </div>
        <h4 className="font-semibold text-slate-50">Ahmad Susanto</h4>
        <p className="text-sm text-slate-400">Production Manager</p>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Email</span>
          <span className="text-slate-200">ahmad.s@nusantara.co.id</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Department</span>
          <span className="text-slate-200">Production</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Role</span>
          <span className="text-slate-200">Admin</span>
        </div>
      </div>
      <button className="w-full mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium text-slate-200 transition-colors">
        Edit Profil
      </button>
    </div>
  );
}

function SystemStatusCard() {
  const systems = [
    { name: "API Server", status: "online", latency: "45ms" },
    { name: "AI Orchestrator", status: "online", latency: "120ms" },
    { name: "Database", status: "online", latency: "23ms" },
    { name: "Backup System", status: "online", latency: "-" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="font-semibold text-slate-50 mb-4">Status Sistem</h3>
      <div className="space-y-3">
        {systems.map((system, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${system.status === "online" ? "bg-emerald-500" : "bg-red-500"}`}></span>
              <span className="text-sm text-slate-300">{system.name}</span>
            </div>
            <span className="text-xs text-slate-400">{system.latency}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Version</span>
          <span className="text-slate-200">v1.0.0</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-slate-400">Last Updated</span>
          <span className="text-slate-200">17 Mar 2026</span>
        </div>
      </div>
    </div>
  );
}
