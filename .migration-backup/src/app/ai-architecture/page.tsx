"use client";

import { useState } from "react";

export default function AIArchitecturePage() {
  const [activeTab, setActiveTab] = useState("orchestrator");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">AI Architecture</h1>
          <p className="text-slate-400">Orchestrator, Specialist Agents & Open CLAW</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-2"></span>
            All Systems Online
          </span>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {["orchestrator", "agents", "claw", "tasks"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-teal-600 text-white"
                : "bg-slate-700 text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab === "orchestrator" && "AI Orchestrator"}
            {tab === "agents" && "Specialist Agents"}
            {tab === "claw" && "Open CLAW"}
            {tab === "tasks" && "Task Queue"}
          </button>
        ))}
      </div>

      {activeTab === "orchestrator" && <OrchestratorTab />}
      {activeTab === "agents" && <AgentsTab />}
      {activeTab === "claw" && <CLAWTab />}
      {activeTab === "tasks" && <TasksTab />}
    </div>
  );
}

function OrchestratorTab() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-900/50 to-cyan-900/50 rounded-xl p-8 border border-teal-500/30">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center animate-pulse">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-50">AI Orchestrator</h2>
          <p className="text-slate-400 mt-2">Central Hub for Agent Coordination</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <h3 className="font-semibold text-teal-400 mb-3">Orchestrator Capabilities</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                  Task Decomposition
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                  Agent Coordination
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                  Context Management
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                  Human-in-the-Loop
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                  Guardrails & Safety
                </li>
              </ul>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-3">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <h3 className="font-semibold text-teal-400 mb-3">Agent Network</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                <AgentBadge name="Production" status="active" tasks={12} />
                <AgentBadge name="Quality" status="active" tasks={8} />
                <AgentBadge name="K3" status="warning" tasks={3} />
                <AgentBadge name="Audit" status="idle" tasks={0} />
                <AgentBadge name="Maintenance" status="active" tasks={5} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-slate-50 mb-4">Execution Flow</h3>
          <div className="space-y-4">
            <FlowStep step={1} title="User Command" description="Natural language or API request" icon="💬" />
            <FlowConnector />
            <FlowStep step={2} title="Task Decomposition" description="Break down into executable subtasks" icon="🔧" />
            <FlowConnector />
            <FlowStep step={3} title="Agent Routing" description="Assign to specialist agents" icon="📤" />
            <FlowConnector />
            <FlowStep step={4} title="Execution (CLAW)" description="Open CLAW executes actions" icon="⚡" />
            <FlowConnector />
            <FlowStep step={5} title="Human Approval" description="Critical decisions require approval" icon="👤" />
            <FlowConnector />
            <FlowStep step={6} title="Result & Feedback" description="Return results, update context" icon="✅" />
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-slate-50 mb-4">System Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-700/30 rounded-lg text-center">
              <p className="text-3xl font-bold text-teal-400">1,247</p>
              <p className="text-sm text-slate-400">Tasks Today</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg text-center">
              <p className="text-3xl font-bold text-emerald-400">94.2%</p>
              <p className="text-sm text-slate-400">Success Rate</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg text-center">
              <p className="text-3xl font-bold text-amber-400">23</p>
              <p className="text-sm text-slate-400">Pending Approval</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg text-center">
              <p className="text-3xl font-bold text-slate-50">0.8s</p>
              <p className="text-sm text-slate-400">Avg Response</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentBadge({ name, status, tasks }: { name: string; status: string; tasks: number }) {
  return (
    <div className={`px-4 py-2 rounded-lg border ${
      status === "active" ? "bg-emerald-500/20 border-emerald-500/30" :
      status === "warning" ? "bg-amber-500/20 border-amber-500/30" :
      "bg-slate-700/30 border-slate-600"
    }`}>
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${
          status === "active" ? "bg-emerald-500" :
          status === "warning" ? "bg-amber-500" : "bg-slate-500"
        }`}></span>
        <span className="text-sm font-medium text-slate-50">{name}</span>
      </div>
      <p className="text-xs text-slate-400 mt-1">{tasks} active tasks</p>
    </div>
  );
}

function FlowStep({ step, title, description, icon }: { step: number; title: string; description: string; icon: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
        {step}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="font-medium text-slate-50">{title}</span>
        </div>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
    </div>
  );
}

function FlowConnector() {
  return (
    <div className="flex justify-center">
      <div className="h-4 w-0.5 bg-slate-700"></div>
    </div>
  );
}

function AgentsTab() {
  const agents = [
    {
      id: "pp-001",
      name: "Production Planning Agent",
      description: "Merencanakan produksi, MRP, kapasitas, dan jadwal produksi",
      status: "active",
      color: "teal",
      capabilities: ["Demand Review", "MPS", "MRP", "CRP", "Finite Scheduling", "Bottleneck Analysis"],
      tasks: 15,
      successRate: 96,
      lastAction: "Menyusun rencana produksi minggu ke-12"
    },
    {
      id: "inv-001",
      name: "Material & Inventory Agent",
      description: "Mengelola stok material, lokasi, lot, dan reorder",
      status: "active",
      color: "amber",
      capabilities: ["Stock Monitoring", "Lot Tracking", "Reorder Alert", "Location Management", "Traceability"],
      tasks: 23,
      successRate: 98,
      lastAction: "Mendeteksi stok material di bawah safety stock"
    },
    {
      id: "exec-001",
      name: "Production Execution Agent",
      description: "Monitoring real-time: output, downtime, OEE, cycle time",
      status: "active",
      color: "blue",
      capabilities: ["Order Progress", "Shift Output", "Downtime Tracking", "OEE Monitoring", "Deviation Alert"],
      tasks: 42,
      successRate: 95,
      lastAction: "Mendeteksi deviation pada Line 2 output"
    },
    {
      id: "qual-001",
      name: "Quality Management Agent",
      description: "Kontrol kualitas, NCR, CAPA, defect tracking, SQAM compliance",
      status: "active",
      color: "emerald",
      capabilities: ["Incoming Inspection", "In-Process QC", "Final Inspection", "NCR Management", "CAPA", "SPC"],
      tasks: 18,
      successRate: 98,
      lastAction: "Menghasilkan NCR untuk defect surface scratch"
    },
    {
      id: "maint-001",
      name: "Maintenance & Reliability Agent",
      description: "Preventive, predictive, corrective maintenance, MTBF/MTTR",
      status: "active",
      color: "orange",
      capabilities: ["PM Scheduling", "Predictive Maintenance", "Breakdown Response", "Spare Part", "Reliability Analysis"],
      tasks: 12,
      successRate: 94,
      lastAction: "Menjadwalkan PM untuk mesin CNC Press 1"
    },
    {
      id: "sc-001",
      name: "Supply Chain & Procurement Agent",
      description: "Purchase order, supplier performance, inbound visibility",
      status: "active",
      color: "purple",
      capabilities: ["PR Monitoring", "PO Tracking", "Supplier Performance", "Inbound Visibility", "Shortage Risk"],
      tasks: 9,
      successRate: 97,
      lastAction: "Mendeteksi lead time supplier melebihi承诺"
    },
    {
      id: "di-001",
      name: "Data Intelligence Agent",
      description: "Cross-domain integration, anomaly detection, AI orchestration",
      status: "active",
      color: "rose",
      capabilities: ["Data Fusion", "Signal Detection", "Anomaly Detection", "Recommendation Engine", "Root Cause Hint"],
      tasks: 31,
      successRate: 92,
      lastAction: "Mendeteksi anomali lintas fungsi: output turun + downtime naik"
    },
    {
      id: "er-001",
      name: "Executive Reporting Agent",
      description: "KPI dashboard, variance analysis, management insight",
      status: "active",
      color: "cyan",
      capabilities: ["KPI Dashboard", "Variance Analysis", "Trend Reporting", "Executive Summary", "Escalation Summary"],
      tasks: 7,
      successRate: 99,
      lastAction: "Menyusun laporan harian untuk Plant Manager"
    },
    {
      id: "k3-001",
      name: "K3 Agent",
      description: "Safety monitoring, PPE compliance, incident tracking",
      status: "warning",
      color: "red",
      capabilities: ["Safety Score", "PPE Monitoring", "Hazard Reports", "Incident Tracking", "Drill Scheduling"],
      tasks: 3,
      successRate: 92,
      lastAction: "Alert: PPE compliance di bawah 95% di Welding Area"
    },
    {
      id: "audit-001",
      name: "Audit & Compliance Agent",
      description: "IATF 16949, ISO 9001, ISO 45001 checklist & evidence",
      status: "idle",
      color: "slate",
      capabilities: ["Checklist Tracking", "Evidence Collection", "Audit Scheduling", "Gap Analysis", "NC Tracking"],
      tasks: 0,
      successRate: 100,
      lastAction: "Menyusun laporan kesiapan ISO 9001"
    },
    {
      id: "wf-001",
      name: "Workforce Agent",
      description: "Operator allocation, attendance, skill, competency, productivity",
      status: "active",
      color: "pink",
      capabilities: ["Operator Allocation", "Attendance Monitoring", "Skill Mapping", "Competency", "Productivity", "Training"],
      tasks: 6,
      successRate: 95,
      lastAction: "Mendeteksi skill gap pada operator Line 3"
    },
  ];

  const getColorClasses = (color: string, status: string) => {
    const colorMap: Record<string, { bg: string; text: string }> = {
      teal: { bg: "bg-teal-500/20", text: "text-teal-400" },
      amber: { bg: "bg-amber-500/20", text: "text-amber-400" },
      blue: { bg: "bg-blue-500/20", text: "text-blue-400" },
      emerald: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
      orange: { bg: "bg-orange-500/20", text: "text-orange-400" },
      purple: { bg: "bg-purple-500/20", text: "text-purple-400" },
      rose: { bg: "bg-rose-500/20", text: "text-rose-400" },
      cyan: { bg: "bg-cyan-500/20", text: "text-cyan-400" },
      red: { bg: "bg-red-500/20", text: "text-red-400" },
      slate: { bg: "bg-slate-500/20", text: "text-slate-400" },
      pink: { bg: "bg-pink-500/20", text: "text-pink-400" },
    };
    if (status === "idle") return { bg: "bg-slate-700", text: "text-slate-400" };
    return colorMap[color] || colorMap.slate;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 rounded-xl p-4 border border-teal-500/20">
          <p className="text-3xl font-bold text-teal-400">11</p>
          <p className="text-sm text-slate-400">Total Agents</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 rounded-xl p-4 border border-emerald-500/20">
          <p className="text-3xl font-bold text-emerald-400">8</p>
          <p className="text-sm text-slate-400">Active</p>
        </div>
        <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 rounded-xl p-4 border border-amber-500/20">
          <p className="text-3xl font-bold text-amber-400">1</p>
          <p className="text-sm text-slate-400">Warning</p>
        </div>
      </div>

      {agents.map((agent) => {
        const colors = getColorClasses(agent.color, agent.status);
        return (
        <div key={agent.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.bg}`}>
                <svg className={`w-6 h-6 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-50">{agent.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    agent.status === "active" ? "bg-emerald-500/20 text-emerald-400" :
                    agent.status === "warning" ? "bg-amber-500/20 text-amber-400" : "bg-slate-600 text-slate-400"
                  }`}>
                    {agent.status}
                  </span>
                </div>
                <p className="text-sm text-slate-400">{agent.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-teal-400">{agent.tasks}</p>
              <p className="text-xs text-slate-400">Active Tasks</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-400 mb-2">Capabilities</p>
              <div className="flex flex-wrap gap-2">
                {agent.capabilities.map((cap) => (
                  <span key={cap} className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-2">Last Action</p>
              <p className="text-sm text-slate-300">{agent.lastAction}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-slate-400">Success Rate:</span>
                <span className="text-sm font-medium text-emerald-400">{agent.successRate}%</span>
              </div>
            </div>
          </div>
        </div>
        );
      })}
    </div>
  );
}

function CLAWTab() {
  const [command, setCommand] = useState("");
  const [logs, setLogs] = useState([
    { time: "10:45:23", action: "Create NCR", status: "completed", agent: "Quality Agent" },
    { time: "10:44:15", action: "Schedule PM", status: "completed", agent: "Maintenance Agent" },
    { time: "10:43:02", action: "Update Checklist", status: "pending_approval", agent: "Audit Agent" },
    { time: "10:42:18", action: "Alert K3", status: "completed", agent: "K3 Agent" },
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-50">Open CLAW</h2>
            <p className="text-sm text-slate-400">Command Language for Autonomous Workflows</p>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <p className="text-xs text-slate-400 mb-2">Execute Command</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Contoh: 'Buat NCR untuk defect di Line 1' atau 'Jadwalkan PM untuk mesin CNC'"
              className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-medium transition-colors">
              Execute
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h3 className="font-semibold text-slate-50 mb-3">Quick Commands</h3>
          <div className="space-y-2">
            <QuickCommand label="Buat NCR" cmd="create ncr line 1" />
            <QuickCommand label="Schedule PM" cmd="schedule pm cnc-1" />
            <QuickCommand label="Update Checklist" cmd="update checklist iso9001" />
            <QuickCommand label="Alert K3" cmd="alert ppe compliance" />
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 col-span-2">
          <h3 className="font-semibold text-slate-50 mb-3">Execution Logs</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {logs.map((log, idx) => (
              <div key={idx} className="p-3 bg-slate-700/30 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-500">{log.time}</span>
                  <span className="text-sm text-slate-300">{log.action}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">{log.agent}</span>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    log.status === "completed" ? "bg-emerald-500/20 text-emerald-400" :
                    log.status === "pending_approval" ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"
                  }`}>
                    {log.status === "completed" ? "Completed" : "Pending Approval"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="font-semibold text-slate-50 mb-4">CLAW Configuration</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
              <span className="text-sm text-slate-300">Auto-Execute Threshold</span>
              <span className="text-sm font-medium text-teal-400">Medium Risk</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
              <span className="text-sm text-slate-300">Human Approval Required</span>
              <span className="text-sm font-medium text-amber-400">High Risk Actions</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
              <span className="text-sm text-slate-300">Max Concurrent Tasks</span>
              <span className="text-sm font-medium text-slate-50">10</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
              <span className="text-sm text-slate-300">Retry on Failure</span>
              <span className="text-sm font-medium text-emerald-400">3 attempts</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
              <span className="text-sm text-slate-300">Timeout</span>
              <span className="text-sm font-medium text-slate-50">30 seconds</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
              <span className="text-sm text-slate-300">Logging Level</span>
              <span className="text-sm font-medium text-slate-50">Detailed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickCommand({ label, cmd }: { label: string; cmd: string }) {
  return (
    <button className="w-full p-2 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
      <span className="text-sm text-teal-400">{label}</span>
      <p className="text-xs text-slate-500 font-mono">{cmd}</p>
    </button>
  );
}

function TasksTab() {
  const tasks = [
    { id: "TASK-001", command: "Create NCR for Line 1 defect", agent: "Quality Agent", status: "completed", time: "10:45", result: "NCR-003 created" },
    { id: "TASK-002", command: "Schedule preventive maintenance", agent: "Maintenance Agent", status: "completed", time: "10:44", result: "PM scheduled for Mar 18" },
    { id: "TASK-003", command: "Update ISO 9001 checklist", agent: "Audit Agent", status: "pending", time: "10:43", result: "Waiting approval" },
    { id: "TASK-004", command: "Alert PPE non-compliance", agent: "K3 Agent", status: "completed", time: "10:42", result: "Alert sent to supervisor" },
    { id: "TASK-005", command: "Predict production delay", agent: "Production Agent", status: "running", time: "10:41", result: "Analyzing..." },
    { id: "TASK-006", command: "Generate daily summary", agent: "Orchestrator", status: "pending", time: "10:40", result: "Queued" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 text-center">
          <p className="text-2xl font-bold text-slate-50">156</p>
          <p className="text-sm text-slate-400">Total Tasks</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 text-center">
          <p className="text-2xl font-bold text-emerald-400">142</p>
          <p className="text-sm text-slate-400">Completed</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 text-center">
          <p className="text-2xl font-bold text-amber-400">8</p>
          <p className="text-sm text-slate-400">In Progress</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 text-center">
          <p className="text-2xl font-bold text-blue-400">6</p>
          <p className="text-sm text-slate-400">Queued</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="font-semibold text-slate-50 mb-4">Task Queue</h3>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="p-4 bg-slate-700/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-teal-400">{task.id}</span>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    task.status === "completed" ? "bg-emerald-500/20 text-emerald-400" :
                    task.status === "running" ? "bg-blue-500/20 text-blue-400" :
                    task.status === "pending" ? "bg-amber-500/20 text-amber-400" : "bg-slate-600 text-slate-400"
                  }`}>
                    {task.status}
                  </span>
                </div>
                <span className="text-xs text-slate-500">{task.time}</span>
              </div>
              <p className="text-sm text-slate-300 mb-2">{task.command}</p>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Agent: {task.agent}</span>
                <span className="text-slate-500">{task.result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
