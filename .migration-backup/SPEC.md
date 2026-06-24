# ManufactureOS - Specification Document

## 1. Project Overview

**Project Name:** ManufactureOS  
**Type:** Web Application (Industrial Operations Dashboard)  
**Core Functionality:** Agentic AI platform for Indonesian IKM Otomotif (Tier 2 automotive suppliers) to manage production, quality control, and K3 (occupational safety) operations with AI-powered orchestration.  
**Target Users:** Factory managers, production supervisors, quality control staff, and K3 officers at Indonesian small-medium manufacturing enterprises.

---

## 2. UI/UX Specification

### Layout Structure

**Navigation:**
- Fixed left sidebar (280px width) with navigation items
- Collapsible on mobile (hamburger menu)

**Page Sections:**
- Header: Logo, factory selector, notifications, user profile
- Main Content: Dashboard grid with cards
- AI Orchestrator Panel: Visual representation of agent coordination

**Responsive Breakpoints:**
- Mobile: < 768px (stacked layout, hidden sidebar)
- Tablet: 768px - 1024px (condensed sidebar)
- Desktop: > 1024px (full layout)

### Visual Design

**Color Palette:**
- Primary: `#0D9488` (Teal-600 - industrial reliability)
- Secondary: `#1E293B` (Slate-800 - dark professional)
- Accent: `#F59E0B` (Amber-500 - alerts/warnings)
- Success: `#10B981` (Emerald-500)
- Danger: `#EF4444` (Red-500)
- Background: `#0F172A` (Slate-900)
- Card Background: `#1E293B` (Slate-800)
- Text Primary: `#F8FAFC` (Slate-50)
- Text Secondary: `#94A3B8` (Slate-400)

**Typography:**
- Font Family: "IBM Plex Sans" (headings), "IBM Plex Mono" (data/numbers)
- Headings: 24px (h1), 20px (h2), 16px (h3)
- Body: 14px
- Small: 12px

**Spacing System:**
- Base unit: 4px
- Card padding: 24px
- Grid gap: 24px
- Section margin: 32px

**Visual Effects:**
- Card shadows: `0 4px 6px -1px rgba(0, 0, 0, 0.3)`
- Border radius: 12px (cards), 8px (buttons), 6px (inputs)
- Subtle glow on active AI agents: `0 0 20px rgba(13, 148, 136, 0.4)`
- Gradient accents on key metrics

### Components

**1. Sidebar Navigation**
- Logo and app name
- Navigation items with icons:
  - Dashboard (home)
  - Produksi (Production)
  - Kualitas (Quality)
  - K3 (Safety)
  - Audit & Compliance
  - Master Data
  - Laporan (Reports)
  - Pengaturan (Settings)
- Active state: teal left border, teal text

**2. AI Command Center**
- Natural language query input
- Quick action buttons (Buat NCR, Buat WO)
- Real-time AI responses
- Category filters (Produksi, Quality, K3, Audit)

**3. AI Orchestrator Panel**
- Central hub visualization showing connected agents
- Agent cards: Production Agent, Quality Agent, K3 Agent, Audit Agent
- Agent task counts and status
- Human-in-the-loop integration indicator
- Recent agent actions log

**4. Production Dashboard Cards**
- Daily Production Target vs Actual (with progress ring)
- Current Shift Status
- Production Line Status (4 lines)
- AI Insights Alert Box
- Downtime Log
- Work Order Management

**5. Quality Control Cards**
- Defect Rate Gauge (Toyota SQAM aligned: < 0.1% target)
- Recent Defects Table
- Quality Trend Chart (7 days)
- NCR Management with AI auto-generation
- Batch Traceability

**6. K3 (Safety) Dashboard**
- Safety Score (0-100)
- Incident Log (last 30 days)
- PPE Compliance Check
- Emergency Drill Schedule
- Hazard Reports

**7. Compliance & Audit**
- IATF 16949 Checklist
- ISO 9001 Checklist
- ISO 45001 Checklist
- Evidence Tracker
- AI-triggered action items

**8. Master Data**
- Customers Directory
- Parts/Products Directory
- Production Lines
- Users Management
- Suppliers
- Machines Registry

**9. Daily Summary Panel**
- AI-generated morning briefing
- Key metrics summary
- Action items for today
- Auto-scheduled tasks

---

## 3. Functionality Specification

### Core Features

**1. AI Command Center**
- Natural language query interface
- Quick action buttons (Buat NCR, Buat WO)
- Category-based filtering
- Real-time AI responses with action recommendations

**2. AI Orchestrator Dashboard**
- Visual display of 5 specialist agents:
  - **Production Agent**: Monitors production lines, predicts delays
  - **Quality Agent**: Tracks defects, analyzes root causes (SQAM aligned)
  - **K3 Agent**: Safety monitoring, PPE compliance, incident tracking
  - **Audit Agent**: Prepares documentation, ensures compliance
  - **Maintenance Agent**: Work orders, preventive maintenance
- Real-time agent status updates
- Task queue visualization
- Human-in-the-loop for critical decisions

**3. Production Monitoring**
- Production target vs actual tracking
- OEE (Overall Equipment Effectiveness) display with A/P/Q breakdown
- Shift management (A/B/C)
- Line status (Running/Idle/Maintenance/Down)
- Downtime logging (Planned/Unplanned)
- Work Order management
- AI-generated production insights

**4. Quality Control (Toyota SQAM)**
- Defect tracking with categories:
  - Dimensional, Surface, Material, Assembly
- PPM (Parts Per Million) calculation
- SQAM grading display (A/B/C/D)
- Pareto chart for defect categories
- NCR (Non-Conformance Report) management with AI auto-generation
- Batch traceability
- Corrective action tracking

**5. K3 Features (MVP)**
- Safety score calculation
- Incident reporting form
- PPE compliance checklist
- Hazard identification logging
- Safety meeting scheduler
- Emergency contact directory

**6. Compliance & Audit**
- IATF 16949 checklist with clause breakdown
- ISO 9001:2015 checklist
- ISO 45001 (K3) checklist
- Evidence tracker
- AI-triggered action items
- Audit schedule management

**7. Master Data Management**
- Customers directory (Tier classification)
- Parts/Products catalog
- Production lines configuration
- User management
- Suppliers registry
- Machines registry

**8. AI-Powered Features**
- Daily automatic summary generation
- Production barrier detection with recommendations
- Smart audit preparation (document checklist)
- Anomaly detection alerts
- Auto-generated NCR drafts
- Auto-scheduled work orders

### User Interactions

- Click navigation items to switch views
- Hover on agent cards to see details
- Click "Generate Ringkasan" for AI summary
- Fill forms for incident/hazard reports
- View detailed breakdowns in expandable cards

### Data Handling

- Mock data for demonstration
- Local state management with React hooks
- Simulated real-time updates

---

## 4. Acceptance Criteria

1. ✅ Application loads without errors
2. ✅ Navigation between all 8 main sections works
3. ✅ AI Command Center responds to natural language queries
4. ✅ AI Orchestrator displays 5 agent cards with status
5. ✅ Production dashboard shows OEE, downtime, work orders
6. ✅ Quality section displays defect rate aligned to SQAM
7. ✅ NCR management with AI auto-generation
8. ✅ Batch traceability functionality
9. ✅ Compliance & Audit with IATF/ISO checklists
10. ✅ Master Data management for all entities
11. ✅ K3 section shows safety score and incident log
12. ✅ Daily summary panel displays AI-generated content
13. ✅ Human-in-the-loop integration for critical decisions
14. ✅ Responsive layout works on mobile/tablet/desktop
15. ✅ All colors match specification exactly
16. ✅ IBM Plex fonts load correctly
