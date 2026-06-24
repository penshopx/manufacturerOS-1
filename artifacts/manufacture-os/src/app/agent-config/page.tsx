"use client";

import { useState } from "react";

const allAgents = [
  {
    id: "production-planning",
    name: "Production Planning Agent",
    code: "PP-001",
    domain: "Production",
    status: "Active",
    icon: "🏭",
    description: "Merencanakan produksi secara akurat, realistis, dan dapat dieksekusi",
    systemPrompt: `Anda adalah Production Planning Agent dalam ekosistem ManufacturerOS...`,
    persona: {
      name: "Production Planning Specialist Agent",
      characteristics: ["Tenang dan sistematis", "Kuat dalam analisis kapasitas", "Berpikir berbasis constraint"],
      expertise: ["Demand planning", "MPS", "MRP", "CRP", "Finite scheduling", "Bottleneck analysis"],
      kpis: ["Schedule adherence", "On-time delivery", "Capacity utilization", "Planning accuracy"]
    },
    subAgents: ["Demand Agent", "Material Availability Agent", "Capacity Planning Agent", "Scheduling Agent"],
    integrations: ["Demand Agent", "Inventory Agent", "Procurement Agent", "Maintenance Agent", "Quality Agent"]
  },
  {
    id: "demand",
    name: "Demand Agent",
    code: "DM-001",
    domain: "Commercial",
    status: "Active",
    icon: "📈",
    description: "Mengelola forecast penjualan dan sales order",
    systemPrompt: "Anda adalah Demand Agent yang bertanggung jawab untuk mengelola forecast penjualan...",
    persona: {
      name: "Demand Forecasting Specialist",
      characteristics: ["Analitis", "Market-aware", "Data-driven"],
      expertise: ["Sales forecasting", "Demand sensing", "Trend analysis", "S&OP"],
      kpis: ["Forecast accuracy", "Demand volatility", "Forecast bias"]
    },
    subAgents: ["Forecast Analyst", "Order Manager"],
    integrations: ["Production Planning Agent", "Inventory Agent", "Finance Agent"]
  },
  {
    id: "inventory",
    name: "Inventory Agent",
    code: "INV-001",
    domain: "Supply Chain",
    status: "Active",
    icon: "📦",
    description: "Mengelola persediaan barang jadi, WIP, dan bahan baku",
    systemPrompt: "Anda adalah Inventory Agent yang mengelola status stok...",
    persona: {
      name: "Inventory Management Specialist",
      characteristics: ["Precise", "Optimized", "Balance-focused"],
      expertise: ["Stock optimization", "Safety stock", "Reorder point", "ABC analysis"],
      kpis: ["Inventory turnover", "Stock-out rate", "Holding cost", "Accuracy"]
    },
    subAgents: ["Stock Controller", "Warehouse Agent"],
    integrations: ["Production Planning Agent", "Procurement Agent", "Quality Agent"]
  },
  {
    id: "procurement",
    name: "Procurement Agent",
    code: "PUR-001",
    domain: "Supply Chain",
    status: "Active",
    icon: "🛒",
    description: "Mengelola proses pembelian dan hubungan supplier",
    systemPrompt: "Anda adalah Procurement Agent yang mengelola pembelian material...",
    persona: {
      name: "Procurement Specialist",
      characteristics: ["Cost-conscious", "Negotiator", "Supplier-focused"],
      expertise: ["Supplier management", "Purchase planning", "Cost optimization", "Lead time management"],
      kpis: ["Purchase cost", "Supplier performance", "On-time delivery", "Supplier quality"]
    },
    subAgents: ["Supplier Manager", "Purchase Planner"],
    integrations: ["Inventory Agent", "Production Planning Agent", "Quality Agent", "Finance Agent"]
  },
  {
    id: "quality",
    name: "Quality Agent",
    code: "QA-001",
    domain: "Quality",
    status: "Active",
    icon: "✅",
    description: "Mengelola mutu produk dan proses produksi",
    systemPrompt: "Anda adalah Quality Agent yang mengelola mutu produk...",
    persona: {
      name: "Quality Assurance Specialist",
      characteristics: ["Detail-oriented", "Compliant", "Improvement-focused"],
      expertise: ["Quality control", "NCR management", "SPC", "CAPA", "SQAM compliance"],
      kpis: ["PPM", "FPY", "NCR rate", "Customer complaints", "Audit score"]
    },
    subAgents: ["QC Inspector", "NCR Manager", "CAPA Coordinator"],
    integrations: ["Production Planning Agent", "Inventory Agent", "Procurement Agent", "Compliance Agent"]
  },
  {
    id: "maintenance",
    name: "Maintenance Agent",
    code: "MNT-001",
    domain: "Maintenance",
    status: "Active",
    icon: "🔧",
    description: "Mengelola pemeliharaan mesin dan fasilitas",
    systemPrompt: "Anda adalah Maintenance Agent yang mengelola pemeliharaan mesin...",
    persona: {
      name: "Maintenance Planning Specialist",
      characteristics: ["Reliability-focused", "Preventive", "Technical"],
      expertise: ["Preventive maintenance", "Predictive maintenance", "CMMS", "MTBF/MTTR"],
      kpis: ["Equipment availability", "MTBF", "MTTR", "Maintenance cost", "PM compliance"]
    },
    subAgents: ["Technician Manager", "Equipment Specialist"],
    integrations: ["Production Planning Agent", "HSE Agent", "Inventory Agent"]
  },
  {
    id: "hse",
    name: "HSE / K3 Agent",
    code: "HSE-001",
    domain: "Safety",
    status: "Active",
    icon: "🛡️",
    description: "Mengelola kesehatan, keselamatan, dan lingkungan kerja",
    systemPrompt: "Anda adalah HSE Agent yang mengelola keselamatan kerja...",
    persona: {
      name: "HSE Specialist",
      characteristics: ["Safety-first", "Compliant", "Proactive"],
      expertise: ["Risk assessment", "Incident management", "PPE compliance", "ISO 45001"],
      kpis: ["Incident rate", "Lost time", "Near-miss", "Safety score", "Training compliance"]
    },
    subAgents: ["Safety Officer", "Environmental Specialist"],
    integrations: ["Production Agent", "Maintenance Agent", "HR Agent", "Compliance Agent"]
  },
  {
    id: "compliance",
    name: "Compliance & Audit Agent",
    code: "CMP-001",
    domain: "Compliance",
    status: "Active",
    icon: "📋",
    description: "Mengelola kepatuhan standar dan kesiapan audit",
    systemPrompt: "Anda adalah Compliance Agent yang mengelola kesiapan audit...",
    persona: {
      name: "Compliance Specialist",
      characteristics: ["Thorough", "Documentation-focused", "Audit-ready"],
      expertise: ["IATF 16949", "ISO 9001", "ISO 45001", "Document control"],
      kpis: ["Audit score", "Document compliance", "Finding closure", "Certification status"]
    },
    subAgents: ["Document Controller", "Audit Coordinator"],
    integrations: ["Quality Agent", "HSE Agent", "Production Agent"]
  }
];

export default function AgentConfigurationPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"list" | "detail">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDomain, setFilterDomain] = useState("all");

  const domains = ["all", "Production", "Commercial", "Supply Chain", "Quality", "Maintenance", "Safety", "Compliance"];

  const filteredAgents = allAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = filterDomain === "all" || agent.domain === filterDomain;
    return matchesSearch && matchesDomain;
  });

  const selectedAgentData = allAgents.find(a => a.id === selectedAgent);

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-50 mb-2">⚙️ Agent Configuration</h1>
          <p className="text-slate-400">Kelola semua AI Agent dalam ekosistem ManufactureOS</p>
        </div>

        {activeTab === "list" && (
          <>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Cari agent..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>
              <select
                value={filterDomain}
                onChange={(e) => setFilterDomain(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-teal-500"
              >
                {domains.map(domain => (
                  <option key={domain} value={domain}>
                    {domain === "all" ? "All Domains" : domain}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {filteredAgents.map(agent => (
                <button
                  key={agent.id}
                  onClick={() => { setSelectedAgent(agent.id); setActiveTab("detail"); }}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-teal-500/50 transition-all text-left"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{agent.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-50">{agent.name}</h3>
                        <span className={`w-2 h-2 rounded-full ${agent.status === "Active" ? "bg-emerald-500" : "bg-slate-500"}`}></span>
                      </div>
                      <p className="text-xs text-slate-400 mb-2">{agent.description}</p>
                      <span className="text-xs px-2 py-1 bg-slate-700 rounded text-slate-400">{agent.domain}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-50 mb-4">Domain Distribution</h3>
              <div className="grid grid-cols-7 gap-2">
                {domains.slice(1).map(domain => {
                  const count = allAgents.filter(a => a.domain === domain).length;
                  return (
                    <div key={domain} className="text-center">
                      <div className="text-2xl font-bold text-teal-400">{count}</div>
                      <div className="text-xs text-slate-400">{domain}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {activeTab === "detail" && selectedAgentData && (
          <div>
            <button
              onClick={() => setActiveTab("list")}
              className="mb-4 text-teal-400 hover:text-teal-300 text-sm"
            >
              ← Back to Agent List
            </button>

            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-slate-800 to-slate-700">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{selectedAgentData.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-50">{selectedAgentData.name}</h2>
                    <p className="text-slate-400">{selectedAgentData.description}</p>
                    <div className="flex gap-3 mt-2">
                      <span className="text-xs px-2 py-1 bg-slate-700 rounded text-slate-400">Code: {selectedAgentData.code}</span>
                      <span className="text-xs px-2 py-1 bg-slate-700 rounded text-slate-400">Domain: {selectedAgentData.domain}</span>
                      <span className="text-xs px-2 py-1 bg-emerald-500/20 rounded text-emerald-400">{selectedAgentData.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-50 mb-3">Persona</h3>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-teal-400 font-medium mb-2">{selectedAgentData.persona.name}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedAgentData.persona.characteristics.map((char, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-slate-600 rounded text-slate-300">{char}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedAgentData.persona.expertise.map((exp, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-blue-500/20 rounded text-blue-400">{exp}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-50 mb-3">Fokus KPI</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAgentData.persona.kpis.map((kpi, idx) => (
                      <span key={idx} className="text-xs px-3 py-1 bg-amber-500/20 rounded text-amber-400">{kpi}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-50 mb-3">Sub-Agents</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAgentData.subAgents.map((sub, idx) => (
                      <span key={idx} className="text-sm px-3 py-1 bg-purple-500/20 rounded text-purple-400">{sub}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-50 mb-3">Integrasi dengan Agent Lain</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAgentData.integrations.map((int, idx) => (
                      <span key={idx} className="text-sm px-3 py-1 bg-green-500/20 rounded text-green-400">{int}</span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-700">
                  <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium">
                    ✏️ Edit Prompt
                  </button>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium">
                    📋 View Full Config
                  </button>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium">
                    🔄 Test Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
