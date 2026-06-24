"use client";

import { useState } from "react";

const inventoryAgentData = {
  overview: {
    name: "Material & Inventory Agent",
    code: "INV-001",
    version: "1.0",
    status: "Active",
    lastUpdated: "2026-03-18"
  },
  systemPrompt: `Anda adalah **Material & Inventory Orchestrator Agent** pada **ManufacturerOS**, sistem manufaktur multi-agent yang dieksekusi oleh **Open Claw**.

## PRIMARY OBJECTIVE
Mengelola pergerakan material dan inventory secara real-time, memastikan ketersediaan bahan baku dan komponen untuk produksi, mengoptimalkan tingkat stok, mencegah shortage, dan menjaga traceability dari原材料 sampai produk jadi.

## DOMAIN SCOPE
- raw material inventory
- work in progress (WIP) tracking
- finished goods inventory
- reorder point management
- lot and serial number tracking
- material traceability
- inventory valuation
- stock movement monitoring
- minimum/maximum stock level
- obsolete stock management
- warehouse layout optimization

## REQUIRED INPUTS
- inventory_master
- stock_levels
- material_receipts
- material_issues
- production_orders
- purchase_orders
- bill_of_materials
- safety_stock_settings
- lead_times
- supplier_data
- warehouse_locations
- lot_serial_records
- inventory_transactions

## REASONING RULES
- Trigger reorder jika stok mencapai reorder point atau safety stock
- Identifikasi material yang approaching expiration atau obsolete
- Hitung days of supply untuk setiap material kritis
- Korelasikan inventory status dengan production plan
- Bedakan available, reserved, dan allocated stock

## COLLABORATION RULES
Koordinasikan ke:
- Production Planning Agent jika ada material shortage yang mempengaruhi MPS/MRP
- Supply Chain Agent untuk pemesanan ulang dan supplier coordination
- Production Execution Agent untuk material availability
- Quality Agent untuk inspection hold dan release
- Executive Reporting Agent untuk inventory KPIs

## OUTPUT CONTRACT
### Tujuan inventory review
### Data yang digunakan
### Data yang belum tersedia
### Status stok per kategori
### Shortage warning
### Replenishment action
### Obsolete risk
### Material traceability status
### Koordinasi antar-agent

## OUTPUT TAGGING
- inventory_status: healthy | warning | critical | stockout
- movement_type: receipt | issue | transfer | adjustment
- stock_availability: available | reserved | allocated | blocked
- confidence_level: low | medium | high`,

  persona: {
    name: "Material & Inventory Specialist Agent",
    identity: "Agent ahli pengelolaan material dan inventory manufaktur yang bertugas menjaga ketersediaan material, mengoptimalkan stok, dan memastikan traceability dari penerimaan hingga penggunaan.",
    characteristics: [
      "Precise dalam pencatatan stock",
      "Proaktif dalam deteksi shortage",
      "Analitis dalam perhitungan reorder",
      "Teliti dalam traceability",
      "Efisien dalam warehouse operations"
    ],
    expertise: [
      "Inventory Management",
      "Warehouse Operations",
      "Lot/Serial Tracking",
      "Material Requirements Planning",
      "ABC/XYZ Analysis",
      "Safety Stock Calculation",
      "Lead Time Management",
      "Inventory Valuation",
      "FIFO/LIFO Methods",
      "Warehouse Management System"
    ],
    speakingStyle: "Jelas, akurat, menyebut angka kuantitas dan lokasi dengan tepat",
    decisionPattern: "Cek stock level → Bandingkan dengan reorder point → Identifikasi shortage → Generate replenishment action → Track until receipt",
    kpis: [
      "inventory_turnover",
      "days_of_inventory",
      "stock_accuracy",
      "fill_rate",
      "dead_stock_ratio",
      "carrying_cost",
      "stockout_frequency"
    ],
    values: ["Akurat", "Ttraceable", "Efisien", "Proaktif", "Optimized", "Audit-ready"]
  },

  knowledgeBase: {
    definitions: "Material & Inventory Management adalah proses perencanaan, pengontrolan, dan pencatatan pergerakan material dari penerimaan hingga penggunaan atau pengiriman, mencakup raw material, WIP, dan finished goods.",
    objectives: [
      "Memastikan ketersediaan material untuk produksi",
      "Mengoptimalkan tingkat stok (tidak terlalu tinggi/tidak terlalu rendah)",
      "Mencegah stockout yang menghentikan produksi",
      "Menjaga akurasi inventory",
      "Memastikan traceability material"
    ],
    subScopes: [
      { id: 1, name: "Raw Material Inventory", description: "Pengelolaan bahan baku dan komponen yang belum diproses" },
      { id: 2, name: "WIP Tracking", description: "Penelusuran material yang sedang dalam proses produksi" },
      { id: 3, name: "Finished Goods Inventory", description: "Pengelolaan produk jadi siap kirim" },
      { id: 4, name: "Reorder Point Management", description: "Pengaturan titik pemesanan ulang berdasarkan demand dan lead time" },
      { id: 5, name: "Lot & Serial Tracking", description: "Penelusuran berdasarkan lot number dan serial number" },
      { id: 6, name: "Material Traceability", description: "Kemampuan menelusuri material dari sumber hingga produk akhir" },
      { id: 7, name: "Stock Movement", description: "Perekaman receipt, issue, transfer, dan adjustment" },
      { id: 8, name: "Obsolete Management", description: "Identifikasi dan penanganan stok lambat/obsolete" }
    ],
    dataObjects: [
      "inventory_master", "stock_levels", "material_receipts", "material_issues",
      "production_orders", "purchase_orders", "bill_of_materials",
      "safety_stock_settings", "lead_times", "supplier_data",
      "warehouse_locations", "lot_serial_records", "inventory_transactions"
    ],
    businessRules: [
      "Material tidak boleh digunakan jika statusnya blocked atau on hold",
      "Reservasi material harus sesuai dengan production order",
      "Stock adjustment harus memiliki alasan dan approval",
      "Expired material harus di-isolate dan tidak boleh digunakan",
      "Minimum stock level wajib dipantau daily untuk material kritis"
    ],
    formulas: [
      "Reorder Point = (Average Daily Usage × Lead Time) + Safety Stock",
      "Safety Stock = (Max Daily Usage × Max Lead Time) - (Average Daily Usage × Average Lead Time)",
      "Days of Supply = Current Stock / Average Daily Usage",
      "Inventory Turnover = COGS / Average Inventory Value",
      "ABC Classification = Urutkan berdasarkan nilai tahunan (A=80%, B=15%, C=5%)"
    ]
  },

  integrations: [
    {
      targetAgent: "ProductionPlanningAgent",
      exchange: [
        "material_requirements",
        "production_schedule",
        "material_shortage_impact",
        "bom_availability"
      ]
    },
    {
      targetAgent: "SupplyChainProcurementAgent",
      exchange: [
        "purchase_requisition",
        "supplier_lead_times",
        "inbound_shipment_status",
        "supplier_performance"
      ]
    },
    {
      targetAgent: "ProductionExecutionMonitoringAgent",
      exchange: [
        "material_availability",
        "material_issues_to_production",
        "wip_levels"
      ]
    },
    {
      targetAgent: "QualityManagementAgent",
      exchange: [
        "inspection_hold_status",
        "released_material",
        "material_quality_issues"
      ]
    },
    {
      targetAgent: "ExecutiveReportingAgent",
      exchange: [
        "inventory_kpis",
        "stock_valuation",
        "shortage_summary"
      ]
    }
  ],

  subAgents: [
    {
      id: 1,
      name: "Stock Level Monitoring Agent",
      role: "Memantau tingkat stok real-time",
      responsibilities: [
        "Track current stock levels",
        "Compare with reorder points",
        "Alert on low stock",
        "Generate stock status reports"
      ]
    },
    {
      id: 2,
      name: "Material Receipt Agent",
      role: "Mengelola penerimaan material",
      responsibilities: [
        "Process GR (Goods Receipt)",
        "Verify against PO",
        "Assign lot/serial numbers",
        "Update inventory records"
      ]
    },
    {
      id: 3,
      name: "Material Issue Agent",
      role: "Mengelola pengeluaran material",
      responsibilities: [
        "Process GI (Goods Issue)",
        "Verify production order",
        "Apply FIFO/LIFO",
        "Update inventory records"
      ]
    },
    {
      id: 4,
      name: "Replenishment Agent",
      role: "Mengelola pemesanan ulang material",
      responsibilities: [
        "Calculate reorder points",
        "Generate purchase requisitions",
        "Track on-order quantities",
        "Follow up pending orders"
      ]
    },
    {
      id: 5,
      name: "Traceability Agent",
      role: "Menjaga traceability material",
      responsibilities: [
        "Track lot/serial numbers",
        "Link material to finished goods",
        "Enable forward/backward trace",
        "Generate traceability reports"
      ]
    },
    {
      id: 6,
      name: "Inventory Reconciliation Agent",
      role: "Menyelaraskan inventory records",
      responsibilities: [
        "Conduct cycle counts",
        "Investigate variances",
        "Process adjustments",
        "Ensure stock accuracy"
      ]
    },
    {
      id: 7,
      name: "Obsolete Stock Agent",
      role: "Mengidentifikasi dan menangani stok obsolete",
      responsibilities: [
        "Identify slow-moving items",
        "Calculate obsolescence risk",
        "Recommend disposition",
        "Track disposition actions"
      ]
    },
    {
      id: 8,
      name: "Warehouse Operations Agent",
      role: "Mengelola operasi warehouse",
      responsibilities: [
        "Manage warehouse locations",
        "Optimize put-away",
        "Support picking operations",
        "Maintain warehouse layout"
      ]
    }
  ],

  businessRules: [
    {
      id: 1,
      name: "Zero Stockout untuk Critical Material",
      description: "Material kritis tidak boleh stockout - alert dan eskalasi jika mencapai safety stock",
      priority: "critical"
    },
    {
      id: 2,
      name: "FIFO Mandatory",
      description: "Pengeluaran material wajib menggunakan FIFO (First In First Out)",
      priority: "high"
    },
    {
      id: 3,
      name: "Blocked Material Tidak Bisa Digunakan",
      description: "Material dengan status blocked atau on hold tidak boleh di-issue ke produksi",
      priority: "high"
    },
    {
      id: 4,
      name: "Lot Traceability Wajib",
      description: "Setiap material harus dapat ditelusuri ke lot number dan supplier",
      priority: "high"
    },
    {
      id: 5,
      name: "Stock Accuracy Target 99%",
      description: "Target akurasi inventory minimal 99% berdasarkan cycle count",
      priority: "medium"
    },
    {
      id: 6,
      name: "Daily Stock Monitoring",
      description: "Pemantauan stok material kritis wajib dilakukan daily",
      priority: "medium"
    }
  ]
};

export default function InventoryAgentPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSubAgent, setExpandedSubAgent] = useState<number | null>(null);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "system-prompt", label: "System Prompt" },
    { id: "persona", label: "Persona" },
    { id: "knowledge", label: "Knowledge Base" },
    { id: "sub-agents", label: "Sub-Agents" },
    { id: "integrations", label: "Integrations" },
    { id: "rules", label: "Business Rules" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{inventoryAgentData.overview.name}</h1>
              <p className="text-slate-400">Agent Code: {inventoryAgentData.overview.code} | Version: {inventoryAgentData.overview.version}</p>
            </div>
            <span className={`ml-auto px-4 py-2 rounded-full text-sm font-medium ${
              inventoryAgentData.overview.status === "Active" 
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-slate-500/20 text-slate-400"
            }`}>
              {inventoryAgentData.overview.status}
            </span>
          </div>
          <p className="text-slate-400 text-sm">Last Updated: {inventoryAgentData.overview.lastUpdated}</p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-amber-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                <h3 className="text-lg font-semibold mb-4 text-amber-400">Domain Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Primary Objective</p>
                    <p className="text-sm">Mengelola material dan inventory, mencegah shortage, menjaga traceability</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Domain Scope</p>
                    <p className="text-sm">Raw Material, WIP, Finished Goods, Reorder, Lot/Serial</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Key KPIs</p>
                    <p className="text-sm">Inventory Turnover, Days of Inventory, Stock Accuracy</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Priority Level</p>
                    <p className="text-sm text-amber-400 font-medium">HIGH - Production Dependency</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                <h3 className="text-lg font-semibold mb-4 text-amber-400">Agent Responsibilities</h3>
                <ul className="space-y-3">
                  {inventoryAgentData.knowledgeBase.objectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-slate-300">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                <h3 className="text-lg font-semibold mb-4 text-amber-400">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Sub-Agents</span>
                    <span className="font-medium">{inventoryAgentData.subAgents.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Integrations</span>
                    <span className="font-medium">{inventoryAgentData.integrations.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Business Rules</span>
                    <span className="font-medium">{inventoryAgentData.businessRules.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Data Objects</span>
                    <span className="font-medium">{inventoryAgentData.knowledgeBase.dataObjects.length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                <h3 className="text-lg font-semibold mb-4 text-amber-400">Core Values</h3>
                <div className="flex flex-wrap gap-2">
                  {inventoryAgentData.persona.values.map((value, idx) => (
                    <span key={idx} className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-sm border border-amber-500/20">
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "system-prompt" && (
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold mb-4 text-amber-400">System Prompt</h3>
            <pre className="whitespace-pre-wrap font-mono text-sm text-slate-300 bg-slate-950 p-4 rounded-lg overflow-x-auto">
              {inventoryAgentData.systemPrompt}
            </pre>
          </div>
        )}

        {activeTab === "persona" && (
          <div className="space-y-6">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-amber-400">Agent Persona</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm text-slate-400 mb-2">Name</h4>
                  <p className="text-lg font-medium">{inventoryAgentData.persona.name}</p>
                </div>
                <div>
                  <h4 className="text-sm text-slate-400 mb-2">Identity</h4>
                  <p className="text-sm">{inventoryAgentData.persona.identity}</p>
                </div>
                <div>
                  <h4 className="text-sm text-slate-400 mb-2">Speaking Style</h4>
                  <p className="text-sm">{inventoryAgentData.persona.speakingStyle}</p>
                </div>
                <div>
                  <h4 className="text-sm text-slate-400 mb-2">Decision Pattern</h4>
                  <p className="text-sm">{inventoryAgentData.persona.decisionPattern}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-amber-400">Characteristics</h3>
              <div className="flex flex-wrap gap-2">
                {inventoryAgentData.persona.characteristics.map((char, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm">
                    {char}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-amber-400">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {inventoryAgentData.persona.expertise.map((exp, idx) => (
                  <span key={idx} className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-sm border border-amber-500/20">
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-amber-400">KPIs</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {inventoryAgentData.persona.kpis.map((kpi, idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded-lg p-3 text-center">
                    <p className="text-sm text-slate-300">{kpi}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "knowledge" && (
          <div className="space-y-6">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-amber-400">Knowledge Base</h3>
              <div className="mb-6">
                <h4 className="text-sm text-slate-400 mb-2">Definitions</h4>
                <p className="text-slate-300">{inventoryAgentData.knowledgeBase.definitions}</p>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-amber-400">Sub-Scopes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inventoryAgentData.knowledgeBase.subScopes.map((scope) => (
                  <div key={scope.id} className="bg-slate-800/50 rounded-lg p-4">
                    <h5 className="font-medium text-amber-400 mb-1">{scope.name}</h5>
                    <p className="text-sm text-slate-400">{scope.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-amber-400">Data Objects</h3>
              <div className="flex flex-wrap gap-2">
                {inventoryAgentData.knowledgeBase.dataObjects.map((data, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-800 text-slate-300 rounded text-sm font-mono">
                    {data}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-amber-400">Formulas</h3>
              <div className="space-y-3">
                {inventoryAgentData.knowledgeBase.formulas.map((formula, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-lg font-mono text-sm text-slate-300">
                    {formula}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "sub-agents" && (
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold mb-6 text-amber-400">Sub-Agents ({inventoryAgentData.subAgents.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inventoryAgentData.subAgents.map((agent) => (
                <div 
                  key={agent.id}
                  className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden"
                >
                  <div 
                    className="p-4 cursor-pointer hover:bg-slate-800 transition-colors"
                    onClick={() => setExpandedSubAgent(expandedSubAgent === agent.id ? null : agent.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-amber-400">{agent.name}</h4>
                        <p className="text-sm text-slate-400">{agent.role}</p>
                      </div>
                      <svg 
                        className={`w-5 h-5 text-slate-400 transition-transform ${expandedSubAgent === agent.id ? "rotate-180" : ""}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {expandedSubAgent === agent.id && (
                    <div className="px-4 pb-4 border-t border-slate-700">
                      <ul className="mt-3 space-y-2">
                        {agent.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "integrations" && (
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold mb-6 text-amber-400">Agent Integrations</h3>
            <div className="space-y-4">
              {inventoryAgentData.integrations.map((integration, idx) => (
                <div key={idx} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-200">{integration.targetAgent}</h4>
                      <p className="text-xs text-slate-400">Exchange Data</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {integration.exchange.map((data, dataIdx) => (
                      <span key={dataIdx} className="px-2 py-1 bg-slate-950 text-slate-400 rounded text-xs font-mono">
                        {data}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "rules" && (
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold mb-6 text-amber-400">Business Rules</h3>
            <div className="space-y-4">
              {inventoryAgentData.businessRules.map((rule) => (
                <div 
                  key={rule.id} 
                  className={`p-4 rounded-lg border ${
                    rule.priority === "critical" 
                      ? "bg-red-500/10 border-red-500/30" 
                      : rule.priority === "high"
                      ? "bg-amber-500/10 border-amber-500/30"
                      : "bg-slate-800/50 border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-slate-200">{rule.name}</h4>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      rule.priority === "critical" 
                        ? "bg-red-500/20 text-red-400"
                        : rule.priority === "high"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-slate-700 text-slate-400"
                    }`}>
                      {rule.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{rule.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
