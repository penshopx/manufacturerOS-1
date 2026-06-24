# Active Context: ManufactureOS - Agentic AI Platform

## Current State

**Project Status**: ✅ ManufactureOS Web Application Built with 12 Domain Agents

ManufactureOS is now a comprehensive Agentic AI platform for Indonesian IKM Otomotif (Tier 2 automotive suppliers) with integrated learning ecosystem and problem-solving tools. The application features AI Command Center, AI Orchestrator (10 specialist agents), production monitoring with OEE and work orders, quality control with NCR automation and batch traceability, K3 (safety) features, compliance & audit with IATF/ISO checklists, and comprehensive master data management. NEW: Added competency ecosystem for learning (chatbot, e-courses, ebooks) and problem-solving (mini apps, document generators). Now has all 10 domain agents per consolidated specification.

## Recently Completed

- [x] ManufactureOS SPEC.md specification document (updated)
- [x] Dashboard with AI Command Center (natural language queries)
- [x] AI Orchestrator visualization (5 agents: Production, Quality, K3, Audit, Maintenance)
- [x] Production monitoring with OEE breakdown, downtime log, work orders
- [x] Quality control with Toyota SQAM compliance (Grade A, <0.1% defect rate)
- [x] NCR Management with AI auto-generation
- [x] Batch Traceability
- [x] Compliance & Audit with IATF 16949, ISO 9001, ISO 45001 checklists
- [x] Master Data management (Customers, Parts, Lines, Users, Suppliers, Machines)
- [x] K3 (Keselamatan Kerja) page with full features
- [x] Reports page with AI-generated summaries
- [x] Settings page with factory configuration
- [x] Responsive dark theme UI with IBM Plex fonts
- [x] **NEW**: Learning Hub (/belajar) - AI Chatbot, E-Courses, E-Books
- [x] **NEW**: Tools & Utilities (/tools) - 24 Document Generators, 64+ Mini Apps
- [x] **NEW**: AI Demo (/ai-demo) - Live AI Command Center Demo
- [x] **NEW**: Strategi GTM (/stategi) - Complete Go-to-Market Strategy
- [x] **NEW**: Quality Agent (/quality-agent) - Full system prompt, persona, knowledge base, 7 sub-agents
- [x] **NEW**: Maintenance Agent (/maintenance-agent) - Full system prompt, persona, knowledge base, 7 sub-agents
- [x] **NEW**: Supply Chain Agent (/supply-chain-agent) - Full system prompt, persona, knowledge base, 7 sub-agents
- [x] **NEW**: Production Execution Agent (/production-execution-agent) - Full system prompt, persona, knowledge base, 8 sub-agents
- [x] **NEW**: Data Intelligence Agent (/data-intelligence-agent) - Full system prompt, persona, knowledge base, 7 sub-agents
- [x] **NEW**: Executive Reporting Agent (/executive-reporting-agent) - Enhanced with 7 sub-agents (Orchestrator, Production/Quality/Delivery/Downtime/Safety KPI Specialists, Executive Summary Analyst), dashboard template, automotive manufacturing context
- [x] **NEW**: Workforce Agent (/workforce-agent) - Full system prompt, persona, knowledge base, 9 sub-agents
- [x] **NEW**: HSE/K3 Agent (/hse-agent) - Full system prompt, persona, knowledge base, 8 sub-agents
- [x] **NEW**: Material & Inventory Agent (/inventory-agent) - Full system prompt, persona, knowledge base, 8 sub-agents

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Dashboard with AI Command Center | ✅ Complete |
| `src/app/ai-demo/page.tsx` | AI Demo - Live Command Center | ✅ Complete |
| `src/app/belajar/page.tsx` | Learning Hub (Chatbot, E-Courses, E-Books) | ✅ Complete |
| `src/app/tools/page.tsx` | Tools & Utilities (Generators, Mini Apps) | ✅ Complete |
| `src/app/stategi/page.tsx` | Strategi GTM | ✅ Complete |
| `src/app/pp-agent/page.tsx` | Production Planning Agent Detail | ✅ Complete |
| `src/app/quality-agent/page.tsx` | Quality Management Agent Detail | ✅ Complete |
| `src/app/maintenance-agent/page.tsx` | Maintenance & Reliability Agent Detail | ✅ Complete |
| `src/app/supply-chain-agent/page.tsx` | Supply Chain & Procurement Agent Detail | ✅ Complete |
| `src/app/production-execution-agent/page.tsx` | Production Execution Agent Detail | ✅ Complete |
| `src/app/data-intelligence-agent/page.tsx` | Data Intelligence Agent Detail | ✅ Complete |
| `src/app/executive-reporting-agent/page.tsx` | Executive Reporting Agent Detail | ✅ Complete |
| `src/app/workforce-agent/page.tsx` | Workforce Management Agent Detail | ✅ Complete |
| `src/app/hse-agent/page.tsx` | HSE & Compliance Agent Detail | ✅ Complete |
| `src/app/inventory-agent/page.tsx` | Material & Inventory Agent Detail | ✅ Complete |
| `src/app/produksi/page.tsx` | Production monitoring (OEE, Lines, Downtime, WO) | ✅ Complete |
| `src/app/kualitas/page.tsx` | Quality control (SQAM, Defects, NCR, Traceability) | ✅ Complete |
| `src/app/k3/page.tsx` | K3 Safety features | ✅ Complete |
| `src/app/audit/page.tsx` | Compliance & Audit (IATF/ISO checklists) | ✅ Complete |
| `src/app/master/page.tsx` | Master Data management | ✅ Complete |
| `src/app/laporan/page.tsx` | Reports & audit prep | ✅ Complete |
| `src/app/pengaturan/page.tsx` | Settings & config | ✅ Complete |
| `src/app/components/Sidebar.tsx` | Navigation sidebar (14 items) | ✅ Complete |
| `src/app/components/Header.tsx` | Top header | ✅ Complete |
| `SPEC.md` | Full specification | ✅ Complete |

## Key Features Implemented

### AI Command Center
- Natural language query interface
- Quick action buttons (Buat NCR, Buat WO)
- Category filters (Produksi, Quality, K3, Audit)
- Real-time AI responses

### AI Orchestrator (5 Agents)
- Production Agent - monitoring & delay prediction
- Quality Agent - defect tracking, NCR auto-generation
- K3 Agent - safety monitoring & compliance
- Audit Agent - checklist tracking, evidence management
- Maintenance Agent - work orders, preventive maintenance

### Production
- Daily production targets vs actual
- OEE breakdown (Availability, Performance, Quality)
- 4 production lines status (Running/Idle/Maintenance)
- Downtime logging (Planned/Unplanned)
- Work Order management
- Shift scheduling (A/B/C)

### Quality (Toyota SQAM)
- SQAM Grade display (A/B/C/D)
- Defect rate tracking (< 0.1% target)
- PPM (Parts Per Million)
- Pareto analysis
- NCR Management with AI auto-generation
- Batch Traceability

### Compliance & Audit
- IATF 16949 checklist
- ISO 9001:2015 checklist
- ISO 45001 (K3) checklist
- Evidence tracker
- AI-triggered action items
- Audit schedule management

### Master Data
- Customers Directory (with Tier classification)
- Parts/Products Catalog
- Production Lines Configuration
- User Management
- Suppliers Registry
- Machines Registry

### K3 (MVP Features)
- Safety Score (0-100)
- Incident logging (30 days)
- Hazard reports
- PPE compliance check
- Emergency drill scheduling
- Safety meeting calendar

### Learning Hub (/belajar)
- AI Chatbot - Tanya jawab tentang prosedur, kualitas, K3, dll
- E-Courses - Kursus online (TPS, SQAM, K3, IATF 16949, OEE, 5S)
- E-Books - Panduan digital (PDF) untuk semua modul
- Progress tracking untuk setiap user

- [x] **NEW**: Tools & Utilities (/tools) - 24 Document Generators, 64+ Mini Apps across 7 categories
- [x] **NEW**: AI Demo (/ai-demo) - Live AI Command Center Demo with Chat, Monitoring, Actions

### Tools & Utilities (/tools)
- **Document Generator (24 templates)**: NCR, WO, PR, DO, K3 Incident, Audit Checklist, Sales Quotation, Purchase Agreement, SOP, CAPA, PM Checklist, APAR, OJT Record, Skills Matrix, Andon Log, Kanban Card, Visual Work Instruction, 5S Audit, Supplier Evaluation, Customer Complaint, Monthly Report, Production Plan, Quality Report, Cost Analysis
- **Produksi (8 apps)**: OEE Calculator, Cycle Time, Capacity Planning, Production Cost, MRP Calculator, Gantt Chart, Takt Time, Kanban Simulation
- **Kualitas (8 apps)**: PPM Converter, CPK Calculator, FMEA RPN, 6 Sigma, SPC Control Chart, Pareto Analysis, Gauge R&R, Defect Rate
- **Penjualan (8 apps)**: Sales Forecast, Profit Margin, Commission, Customer Scoring, ABC Analysis, Sales Pipeline, Pricing Strategy, Market Share
- **Administrasi (8 apps)**: ROI Calculator, Break-even, Budget Planner, KPI Dashboard, SWOT Analysis, Cash Flow, Depreciation, Payback Period
- **HR (6 apps)**: Leave Tracker, Skills Matrix, OJT Planner, Performance Score, Turnover Rate, Training ROI
- **K3 (6 apps)**: Safety Score, Risk Matrix, Incident Rate, PPE Compliance, JSA Form, Emergency Calc
- **Ekonomi Sirkular (6 apps)**: Waste Calculator, Energy Monitor, Carbon Footprint, Lean Score, Recycle Value, Eco KPI

## Quick Start

```bash
bun run dev    # Development server
bun run build  # Production build
bun run lint   # Code quality
bun typecheck  # Type checking
```

## Session History

| Date | Changes |
|------|---------|
| 17 Mar 2026 | ManufactureOS web application built with AI Command Center, 5 AI Agents, NCR automation, Compliance & Audit, Master Data |
| 17 Mar 2026 | Added Competency Ecosystem: Learning Hub (/belajar) with AI Chatbot, E-Courses, E-Books; Tools (/tools) with Document Generators and Mini Apps (OEE, PPM calculators) |
| 18 Mar 2026 | Added 3 new Agent Detail pages: Quality Agent, Maintenance Agent, Supply Chain Agent with full system prompts, personas, knowledge bases, and sub-agents |
| 18 Mar 2026 | Added Production Execution & Monitoring Agent with full system prompt, persona, knowledge base, and 8 sub-agents for real-time production visibility |
| 18 Mar 2026 | Added 4 more Agent Detail pages: Data Intelligence Agent, Executive Reporting Agent, Workforce Agent, HSE/K3 Agent |
| 18 Mar 2026 | Completed all 10 domain agents per consolidated specification: Added Material & Inventory Agent, HSE/K3 Agent to complete the full set (PP, Quality, Maintenance, Supply Chain, Production Execution, Data Intelligence, Executive Reporting, Workforce, HSE, Inventory)
