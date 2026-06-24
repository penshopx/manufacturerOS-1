"use client";

import { useState } from "react";

const features = {
  corePlatform: {
    title: "Core Platform",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    features: [
      {
        name: "Multi-Agent AI Orchestration",
        description: "10+ specialized AI agents working in harmony - not just one AI, but a team of specialists coordinating to manage your entire manufacturing operations",
        advantage: "Unlike competitors with single AI chatbots, we have dedicated agents for Production, Quality, Maintenance, Supply Chain, Workforce, HSE, Inventory, and Executive Reporting - each with deep domain expertise",
        technical: "Built on Open CLAW (Command Language for Autonomous Workflows) - enabling autonomous task execution across all manufacturing domains"
      },
      {
        name: "Natural Language Command Interface",
        description: "Ask questions in plain Indonesian or English - get actionable insights, not just data dumps",
        advantage: "No need for technical skills or remembering specific commands. Simply ask 'Kenapa OEE Line 2 turun?' and get immediate analysis with root cause and recommendations",
        technical: "NLP-powered intent detection with context-aware responses across 50+ manufacturing scenarios"
      },
      {
        name: "Real-Time Operational Visibility",
        description: "Live dashboard with millisecond-level updates from shopfloor to executive boardroom",
        advantage: "See what's happening NOW, not what happened yesterday. Get alerts before problems become crises",
        technical: "WebSocket-powered real-time data streaming with predictive alerting engine"
      }
    ]
  },

  aiIntelligence: {
    title: "AI Intelligence Layer",
    icon: "M13 7h8m0 0v8m0-8l-8 8-8 8M21 12a9 9 0 11-18 9 9 0 0118-9z",
    features: [
      {
        name: "Predictive Analytics Engine",
        description: "AI that doesn't just report what happened - it predicts what WILL happen",
        advantage: "Anticipate bottlenecks, shortages, and downtime BEFORE they occur. Our AI analyzes patterns to warn you 24-72 hours in advance",
        technical: "Machine learning models trained on historical data with 87% prediction accuracy for downtime, 82% for shortage forecasting"
      },
      {
        name: "Cross-Domain Correlation",
        description: "See the hidden connections between Production, Quality, Maintenance, and Delivery that single systems miss",
        advantage: "Discover why Line 3's defect rate spiked - it's not just about quality, it's linked to a maintenance issue 3 days ago that you forgot about",
        technical: "Graph-based correlation engine analyzing 50+ cross-domain relationships in real-time"
      },
      {
        name: "Intelligent Root Cause Analysis",
        description: "AI that digs deeper than surface-level symptoms to find true root causes",
        advantage: "Stop playing whack-a-mole with recurring problems. Our AI traces issues back to systemic causes using 5-Why, Fishbone, and FMEA methodologies",
        technical: "Causal inference engine with Bayesian networks for probabilistic root cause identification"
      },
      {
        name: "Autonomous Decision Recommendations",
        description: "Get AI-generated action plans with pros, cons, and expected outcomes",
        advantage: "Not just alerts - get actionable recommendations with projected impact. AI suggests, human decides",
        technical: "Decision tree analysis with Monte Carlo simulation for outcome prediction"
      }
    ]
  },

  domainExpertise: {
    title: "Manufacturing Domain Expertise",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.77a4 4 0 00-3.742.31l-.298.528a4 4 0 01-.823 1.172l-.77 2.384c-.547 1.98 1.045 3.99 2.932 2.932l2.384-.77a4 4 0 00.31-3.742l.528-.298a4 4 0 011.172-.823l2.384.77a4 4 0 002.932-2.932l-.77-2.384a4 4 0 00-.547-1.022zM15 12a3 3 0 11-6 0 3 3 0 016 0z",
    features: [
      {
        name: "Toyota SQAM Compliance Built-In",
        description: "Grade A quality management system pre-configured with Toyota's SQAM standards",
        advantage: "Target <0.1% defect rate, PPM tracking, and Grade A/B/C/D classification - all automatic. Be audit-ready for Toyota customers from day one",
        technical: "SQAM-compliant defect classification, 4M analysis, and daily grading algorithms"
      },
      {
        name: "IATF 16949 & ISO 9001 Ready",
        description: "Pre-built compliance checklists and evidence tracking for major automotive quality standards",
        advantage: "Don't build your audit documentation from scratch. We have IATF 16949, ISO 9001:2015, ISO 45001, and more - all with automated evidence collection",
        technical: "Automated checklist generation with digital evidence capture and gap analysis"
      },
      {
        name: "Indonesian Automotive Context",
        description: "Built specifically for Indonesian IKM Otomotif - understands local context, regulations, and business practices",
        advantage: "Not a generic foreign system ported to Indonesia. We understand the unique challenges of Tier 2 suppliers serving Astra, Toyota, Honda, and other major OEMs",
        technical: "Localization for Indonesian language, regulations (Permenaker), and business practices"
      },
      {
        name: "Multi-Shift Operations",
        description: "Complete support for A/B/C shift operations with hand-over intelligence",
        advantage: "Shift transitions no longer lose critical information. AI summarizes previous shift's issues and highlights what the next shift needs to know",
        technical: "Shift handoff reports with intelligent summary generation"
      }
    ]
  },

  operationalModules: {
    title: "Operational Modules",
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
    features: [
      {
        name: "Production Planning & Scheduling",
        description: "AI-powered production planning with MPS, MRP, CRP, and bottleneck-aware scheduling",
        advantage: "Automatically balance production across lines, factor in maintenance windows, material availability, and demand fluctuations",
        technical: "Constraint-based scheduling engine with genetic algorithms for optimization"
      },
      {
        name: "OEE Monitoring & Optimization",
        description: "Track and improve Overall Equipment Effectiveness with loss analysis and improvement recommendations",
        advantage: "Know exactly where you're losing capacity - Availability, Performance, or Quality - and get specific recommendations to improve each",
        technical: "OEE calculation with 6 big losses tracking and Pareto analysis"
      },
      {
        name: "Quality Management System",
        description: "End-to-end quality control from incoming inspection to final release",
        advantage: "Complete NCR management with AI-generated root cause analysis, CAPA tracking, and containment actions",
        technical: "Defect tracking with Pareto, CPK calculation, and SPC control charts"
      },
      {
        name: "Maintenance & Reliability",
        description: "Preventive, predictive, and autonomous maintenance management",
        advantage: "Move from reactive to predictive maintenance. AI predicts when equipment will fail based on vibration, temperature, and usage patterns",
        technical: "CMMS integration with sensor data analysis for predictive maintenance"
      },
      {
        name: "Warehouse & Inventory",
        description: "Real-time inventory management with smart reorder recommendations",
        advantage: "Never face stockouts or excess inventory. AI calculates optimal reorder points based on demand patterns, lead times, and safety stock",
        technical: "ABC/XYZ analysis with dynamic reorder point calculation"
      },
      {
        name: "Supply Chain Coordination",
        description: "End-to-end visibility from supplier to customer delivery",
        advantage: "Track inbound materials, manage supplier performance, and anticipate delays before they impact production",
        technical: "Supplier scorecards with on-time delivery and quality metrics"
      },
      {
        name: "Workforce Management",
        description: "Skill-based operator allocation and competency tracking",
        advantage: "Ensure right operator for right task. AI matches skills to job requirements and identifies training gaps",
        technical: "Skills matrix with certification tracking and competency scoring"
      },
      {
        name: "HSE & Safety Compliance",
        description: "Comprehensive health, safety, and environment management",
        advantage: "Track incidents, near misses, and unsafe conditions. AI identifies safety patterns and predicts high-risk periods",
        technical: "JSA templates, PTW management, and incident tracking with trend analysis"
      }
    ]
  },

  enterpriseFeatures: {
    title: "Enterprise Features",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6h2m10 6h2M5 15H3m14 0h2m-2 6h2m-4-6h2M13 3h2m0 18h2M13 9h2m0 6h2",
    features: [
      {
        name: "Master Data Architecture",
        description: "Centralized, normalized master data with full traceability",
        advantage: "Single source of truth for customers, suppliers, parts, machines, and operations. No more spreadsheets scattered across departments",
        technical: "Normalized SQL database with API-first architecture"
      },
      {
        name: "Role-Based Access Control",
        description: "Granular permission system for operators, supervisors, managers, and executives",
        advantage: "Different views for different roles. Operators see tasks, Managers see KPIs, Executives see dashboards",
        technical: "JWT-based authentication with role-permission matrix"
      },
      {
        name: "Audit Trail & Compliance Logging",
        description: "Complete activity logging for regulatory compliance",
        advantage: "Every action is logged with timestamp and user. Perfect for ISO and customer audits",
        technical: "Immutable audit log with digital signatures"
      },
      {
        name: "Document Generation Engine",
        description: "Automated generation of 24+ manufacturing documents",
        advantage: "Generate NCR, WO, PR, DO, SOP, CAPA, and more with one click. No more manual document creation",
        technical: "Template-based document engine with auto-population from system data"
      }
    ]
  },

  competencyEcosystem: {
    title: "Competency Ecosystem",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.985 5S5.168 5.477 4.168 6.253v13C4.168 18.477 5.754 19 7.985 19s3.832-.523 5.168-1.747m0-13C10.832 18.523 9.246 19 7.985 19S5.168 18.477 4.168 13.75v-13",
    features: [
      {
        name: "AI-Powered Learning Hub",
        description: "Interactive chatbot, e-courses, and e-books for continuous competency development",
        advantage: "Train your workforce on TPS, SQAM, K3, IATF, OEE, 5S, and more - all within the same system they use for operations",
        technical: "RAG-powered chatbot with domain-specific knowledge base"
      },
      {
        name: "Mini Apps & Calculators",
        description: "64+ specialized calculators and tools for daily operations",
        advantage: "OEE calculator, CPK calculator, FMEA RPN, PPM converter, and more - always available, always accurate",
        technical: "Web-based calculators with formula validation"
      },
      {
        name: "Problem-Solving Methodology",
        description: "Guided 8D, 5-Why, Fishbone, and PDCA problem-solving workflows",
        advantage: "Don't just fix symptoms. Use structured problem-solving methods embedded in the workflow",
        technical: "Step-by-step workflow engine with evidence collection"
      }
    ]
  },

  unfairAdvantages: {
    title: "Unfair Advantages",
    icon: "M5 3v4M3 5v4m4-4 0h8m-8 0h8m-8 0v8m0-8v4m-4 0h8m-8 0h8m-8 0v8",
    advantages: [
      {
        title: "First-Mover in Indonesian IKM Otomotif AI",
        description: "We're the first AI-powered manufacturing platform specifically designed for Indonesian automotive suppliers",
        impact: "Establish market leadership before competitors realize this segment exists"
      },
      {
        title: "Open CLAW Architecture",
        description: "Our multi-agent system runs on Open CLAW - enabling autonomous workflows that competitors can't replicate",
        impact: "Continuous improvement through agent learning and coordination"
      },
      {
        title: "Toyota SQAM Native",
        description: "Built-in Toyota quality standards - be audit-ready for Toyota, Honda, and other Japanese OEMs instantly",
        impact: "Instant credibility with major OEM customers"
      },
      {
        title: "All-in-One Platform",
        description: "From planning to reporting - everything in ONE system. No more stitching together separate ERP, MES, QMS",
        impact: "Lower total cost of ownership, higher data integrity"
      },
      {
        title: "AI That Explains Itself",
        description: "Every AI recommendation comes with explainability - not black box predictions",
        impact: "Build trust with users, enable human oversight of AI decisions"
      },
      {
        title: "Human-in-the-Loop Guardrails",
        description: "AI recommends, humans decide - especially for critical quality and safety decisions",
        impact: "Compliance with industry regulations, build operator trust in AI"
      },
      {
        title: "Continuous Learning System",
        description: "The more you use it, the smarter it gets. AI improves from your operational data",
        impact: "Increasing value over time, competitor lock-in through data积累"
      },
      {
        title: "Niche Focus = Deep Expertise",
        description: "We serve ONE industry deeply, not many industries shallowly",
        impact: "Better domain knowledge than generic ERP vendors"
      }
    ]
  },

  valueProposition: {
    title: "Value Proposition",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    propositions: [
      {
        for: "Plant Managers",
        pain: "Spreadsheet hell, siloed data, reactive firefighting, blind decision-making",
        solution: "Single pane of glass for all operations, predictive alerts, data-driven decisions",
        outcome: "30% reduction in firefighting time, 15% improvement in OEE"
      },
      {
        for: "Quality Managers",
        pain: "Manual NCR creation, audit panic,无法 traceability, compliance gaps",
        solution: "AI-generated NCR/CAPA, automated audit prep, full traceability",
        outcome: "50% faster audit preparation, 90% reduction in documentation time"
      },
      {
        for: "Production Supervisors",
        pain: "Information overload, unclear priorities, shift handover confusion",
        solution: "AI-summarized insights, prioritized action list, intelligent shift handoff",
        outcome: "20% faster response to issues, zero information loss between shifts"
      },
      {
        for: "Maintenance Teams",
        pain: "Reactive maintenance, unexpected breakdowns, unclear priorities",
        solution: "Predictive maintenance alerts, work order optimization, parts availability",
        outcome: "25% reduction in unplanned downtime, 40% improvement in PM compliance"
      },
      {
        for: "C-Suite / Directors",
        pain: "No real-time visibility, quarterly reports are too late, competitive pressure",
        solution: "Real-time dashboards, AI-generated executive summaries, strategic insights",
        outcome: "Instant operational visibility, faster strategic decisions"
      }
    ]
  }
};

export default function FeaturesPage() {
  const [activeSection, setActiveSection] = useState("corePlatform");

  const sections = [
    { id: "corePlatform", label: "Core Platform" },
    { id: "aiIntelligence", label: "AI Intelligence" },
    { id: "domainExpertise", label: "Domain Expertise" },
    { id: "operationalModules", label: "Operations" },
    { id: "enterpriseFeatures", label: "Enterprise" },
    { id: "competencyEcosystem", label: "Competency" },
    { id: "unfairAdvantages", label: "Unfair Advantages" },
    { id: "valueProposition", label: "Value Proposition" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold">ManufactureOS Features & Value</h1>
              <p className="text-slate-400">Advanced capabilities and competitive advantages</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeSection === section.id
                  ? "bg-teal-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {activeSection === "corePlatform" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {features.corePlatform.features.map((feature, idx) => (
                <div key={idx} className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={features.corePlatform.icon} />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-teal-400 mb-2">{feature.name}</h3>
                      <p className="text-slate-300 mb-4">{feature.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-teal-500/10 rounded-lg p-4 border border-teal-500/20">
                          <h4 className="text-teal-400 font-medium mb-2">Unfair Advantage</h4>
                          <p className="text-sm text-slate-300">{feature.advantage}</p>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-4">
                          <h4 className="text-slate-400 font-medium mb-2">Technical Implementation</h4>
                          <p className="text-sm text-slate-400">{feature.technical}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "aiIntelligence" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {features.aiIntelligence.features.map((feature, idx) => (
                <div key={idx} className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={features.aiIntelligence.icon} />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-purple-400 mb-2">{feature.name}</h3>
                      <p className="text-slate-300 mb-4">{feature.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                          <h4 className="text-purple-400 font-medium mb-2">Unfair Advantage</h4>
                          <p className="text-sm text-slate-300">{feature.advantage}</p>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-4">
                          <h4 className="text-slate-400 font-medium mb-2">Technical Implementation</h4>
                          <p className="text-sm text-slate-400">{feature.technical}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "domainExpertise" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {features.domainExpertise.features.map((feature, idx) => (
                <div key={idx} className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={features.domainExpertise.icon} />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-amber-400 mb-2">{feature.name}</h3>
                      <p className="text-slate-300 mb-4">{feature.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
                          <h4 className="text-amber-400 font-medium mb-2">Unfair Advantage</h4>
                          <p className="text-sm text-slate-300">{feature.advantage}</p>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-4">
                          <h4 className="text-slate-400 font-medium mb-2">Technical Implementation</h4>
                          <p className="text-sm text-slate-400">{feature.technical}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "operationalModules" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.operationalModules.features.map((feature, idx) => (
                <div key={idx} className="bg-slate-900/50 rounded-xl p-5 border border-slate-800">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">{feature.name}</h3>
                  <p className="text-sm text-slate-400 mb-3">{feature.description}</p>
                  <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                    <p className="text-sm text-slate-300">{feature.advantage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "enterpriseFeatures" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.enterpriseFeatures.features.map((feature, idx) => (
                <div key={idx} className="bg-slate-900/50 rounded-xl p-5 border border-slate-800">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-2">{feature.name}</h3>
                  <p className="text-sm text-slate-400 mb-3">{feature.description}</p>
                  <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20">
                    <p className="text-sm text-slate-300">{feature.advantage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "competencyEcosystem" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {features.competencyEcosystem.features.map((feature, idx) => (
                <div key={idx} className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={features.competencyEcosystem.icon} />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-rose-400 mb-2">{feature.name}</h3>
                      <p className="text-slate-300 mb-4">{feature.description}</p>
                      <div className="bg-rose-500/10 rounded-lg p-4 border border-rose-500/20">
                        <p className="text-sm text-slate-300">{feature.advantage}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "unfairAdvantages" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl p-6 border border-red-500/30 mb-6">
              <h3 className="text-xl font-semibold text-red-400 mb-2">Why ManufactureOS is Different</h3>
              <p className="text-slate-300">These aren't just features - they're competitive moats that take years to replicate</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.unfairAdvantages.advantages.map((advantage, idx) => (
                <div key={idx} className="bg-slate-900/50 rounded-xl p-5 border border-slate-800 hover:border-red-500/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-400 font-bold text-sm">{idx + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200 mb-1">{advantage.title}</h4>
                      <p className="text-sm text-slate-400 mb-2">{advantage.description}</p>
                      <div className="bg-red-500/10 rounded-lg p-2">
                        <p className="text-xs text-red-400 font-medium">Impact: {advantage.impact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "valueProposition" && (
          <div className="space-y-6">
            {features.valueProposition.propositions.map((prop, idx) => (
              <div key={idx} className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm font-medium">
                    For {prop.for}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                    <h4 className="text-red-400 font-medium mb-2 text-sm">Pain Points</h4>
                    <p className="text-sm text-slate-300">{prop.pain}</p>
                  </div>
                  <div className="bg-teal-500/10 rounded-lg p-4 border border-teal-500/20">
                    <h4 className="text-teal-400 font-medium mb-2 text-sm">Our Solution</h4>
                    <p className="text-sm text-slate-300">{prop.solution}</p>
                  </div>
                  <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                    <h4 className="text-purple-400 font-medium mb-2 text-sm">Expected Outcome</h4>
                    <p className="text-sm text-slate-300">{prop.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
