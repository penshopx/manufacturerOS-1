"use client";

import { useState, useRef } from "react";

const documentTemplates = [
  { id: 1, name: "NCR Form", category: "Kualitas", icon: "📋" },
  { id: 2, name: "Work Order", category: "Produksi", icon: "🔧" },
  { id: 3, name: "Purchase Request", category: "Purchasing", icon: "🛒" },
  { id: 4, name: "Delivery Order", category: "Delivery", icon: "🚚" },
  { id: 5, name: "K3 Incident", category: "K3", icon: "⚠️" },
  { id: 6, name: "Audit Checklist", category: "Audit", icon: "✅" },
  { id: 7, name: "Sales Quotation", category: "Penjualan", icon: "💵" },
  { id: 8, name: "Purchase Agreement", category: "Purchasing", icon: "🤝" },
  { id: 9, name: "SOP Document", category: "Admin", icon: "📘" },
  { id: 10, name: "CAPA Form", category: "Kualitas", icon: "🔴" },
  { id: 11, name: "PM Checklist", category: "Maintenance", icon: "🛠️" },
  { id: 12, name: "APAR Report", category: "K3", icon: "🧯" },
  { id: 13, name: "OJT Record", category: "HR", icon: "🎓" },
  { id: 14, name: "Skills Matrix", category: "HR", icon: "📊" },
  { id: 15, name: "Andon Log", category: "Produksi", icon: "📺" },
  { id: 16, name: "Kanban Card", category: "Produksi", icon: "🃏" },
  { id: 17, name: "Visual Instruction", category: "Produksi", icon: "🖼️" },
  { id: 18, name: "5S Audit", category: "Admin", icon: "🏆" },
  { id: 19, name: "Supplier Eval", category: "Purchasing", icon: "📋" },
  { id: 20, name: "Customer Complaint", category: "Kualitas", icon: "😤" },
  { id: 21, name: "Monthly Report", category: "Admin", icon: "📈" },
  { id: 22, name: "Production Plan", category: "Produksi", icon: "📅" },
  { id: 23, name: "Quality Report", category: "Kualitas", icon: "📉" },
  { id: 24, name: "Cost Analysis", category: "Finance", icon: "💰" },
];

const miniAppsByCategory = {
  produksi: [
    { id: 1, name: "OEE Calculator", icon: "⚙️" },
    { id: 2, name: "Cycle Time", icon: "⏱️" },
    { id: 3, name: "Capacity Plan", icon: "📈" },
    { id: 4, name: "Production Cost", icon: "💲" },
    { id: 5, name: "MRP Calculator", icon: "📦" },
    { id: 6, name: "Gantt Chart", icon: "📊" },
    { id: 7, name: "Takt Time", icon: "⏲️" },
    { id: 8, name: "Kanban Sim", icon: "🃏" },
    { id: 9, name: "Shift Scheduler", icon: "🕐" },
    { id: 10, name: "Manpower Plan", icon: "👥" },
  ],
  kualitas: [
    { id: 11, name: "PPM Converter", icon: "📊" },
    { id: 12, name: "CPK Calculator", icon: "📉" },
    { id: 13, name: "FMEA RPN", icon: "⚠️" },
    { id: 14, name: "6 Sigma", icon: "🎯" },
    { id: 15, name: "SPC Chart", icon: "📈" },
    { id: 16, name: "Pareto", icon: "🥧" },
    { id: 17, name: "Gauge R&R", icon: "📏" },
    { id: 18, name: "Defect Rate", icon: "📉" },
    { id: 19, name: "Quality Score", icon: "⭐" },
    { id: 20, name: "Audit Score", icon: "🏆" },
  ],
  penjualan: [
    { id: 21, name: "Sales Forecast", icon: "🔮" },
    { id: 22, name: "Profit Margin", icon: "💰" },
    { id: 23, name: "Commission", icon: "🎁" },
    { id: 24, name: "Customer Score", icon: "⭐" },
    { id: 25, name: "ABC Analysis", icon: "🔤" },
    { id: 26, name: "Sales Pipeline", icon: "📊" },
    { id: 27, name: "Pricing", icon: "🏷️" },
    { id: 28, name: "Market Share", icon: "🥧" },
    { id: 29, name: "Quote Builder", icon: "📝" },
    { id: 30, name: "Sales Trend", icon: "📈" },
  ],
  administrasi: [
    { id: 31, name: "ROI Calc", icon: "📈" },
    { id: 32, name: "Break-even", icon: "⚖️" },
    { id: 33, name: "Budget Plan", icon: "📋" },
    { id: 34, name: "KPI Dashboard", icon: "📊" },
    { id: 35, name: "SWOT", icon: "🔲" },
    { id: 36, name: "Cash Flow", icon: "💵" },
    { id: 37, name: "Depreciation", icon: "📉" },
    { id: 38, name: "Payback", icon: "⏰" },
    { id: 39, name: "Cost Alloc", icon: "💳" },
    { id: 40, name: "Budget Track", icon: "📊" },
  ],
  hr: [
    { id: 41, name: "Leave Track", icon: "📅" },
    { id: 42, name: "Skills Matrix", icon: "🎯" },
    { id: 43, name: "OJT Planner", icon: "🎓" },
    { id: 44, name: "Performance", icon: "📊" },
    { id: 45, name: "Turnover", icon: "🔄" },
    { id: 46, name: "Training ROI", icon: "📈" },
    { id: 47, name: "Headcount", icon: "👥" },
    { id: 48, name: "Salary Scale", icon: "💵" },
  ],
  k3: [
    { id: 49, name: "Safety Score", icon: "🛡️" },
    { id: 50, name: "Risk Matrix", icon: "⚠️" },
    { id: 51, name: "Incident Rate", icon: "📊" },
    { id: 52, name: "PPE Compliance", icon: "🦺" },
    { id: 53, name: "JSA Form", icon: "📋" },
    { id: 54, name: "Emergency", icon: "🚨" },
    { id: 55, name: "Fire Risk", icon: "🔥" },
    { id: 56, name: "Ergonomics", icon: "🧘" },
  ],
  ekonomi_sirkular: [
    { id: 57, name: "Waste Calc", icon: "🗑️" },
    { id: 58, name: "Energy Monitor", icon: "⚡" },
    { id: 59, name: "Carbon", icon: "🌱" },
    { id: 60, name: "Lean Score", icon: "🎯" },
    { id: 61, name: "Recycle Value", icon: "♻️" },
    { id: 62, name: "Eco KPI", icon: "📊" },
    { id: 63, name: "Water Usage", icon: "💧" },
    { id: 64, name: "Packaging", icon: "📦" },
  ],
};

type GeneratorType = string;
type AppCategory = "produksi" | "kualitas" | "penjualan" | "administrasi" | "hr" | "k3" | "ekonomi_sirkular";

export default function ToolsPage() {
  const [activeSection, setActiveSection] = useState<"generators" | "apps">("apps");
  const [selectedCategory, setSelectedCategory] = useState<AppCategory>("produksi");
  const [selectedApp, setSelectedApp] = useState<number | null>(null);
  const [generatedDoc, setGeneratedDoc] = useState<{title: string; content: string} | null>(null);
  const [showExport, setShowExport] = useState(false);

  const [oee, setOee] = useState({ avail: 85, perf: 90, qual: 98 });
  const [cycle, setCycle] = useState({ actual: 45, target: 40, output: 100 });
  const [capacity, setCapacity] = useState({ days: 20, shift: 2, hours: 8, eff: 85, workers: 15 });
  const [cost, setCost] = useState({ material: 50000, labor: 15000, overhead: 10000, vol: 1000, scrap: 2 });
  const [takt, setTakt] = useState({ available: 480, demand: 100, losses: 10 });
  const [mrp, setMrp] = useState({ gross: 1000, scheduled: 300, safety: 100, lead: 7 });
  const [shift, setShift] = useState({ line1: 8, line2: 6, line3: 4, overtime: 2 });
  const [manpower, setManpower] = useState({ required: 50, available: 45, turnover: 5, hire: 3 });

  const [ppm, setPpm] = useState({ defect: 5, total: 10000, target: 1000 });
  const [cpk, setCpk] = useState({ usl: 10.5, lsl: 9.5, mean: 10, std: 0.3, cp: 0 });
  const [fmea, setFmea] = useState([{ item: "Dimension Out of Spec", sev: 8, occ: 5, det: 4, rpn: 160 }, { item: "Surface Scratch", sev: 5, occ: 6, det: 3, rpn: 90 }, { item: "Assembly Error", sev: 7, occ: 3, det: 5, rpn: 105 }]);
  const [qualityScore, setQualityScore] = useState({ inspection: 95, testing: 88, compliance: 92, customer: 90 });
  const [auditScore, setAuditScore] = useState({ iatf: 72, iso9001: 78, iso45001: 65, sqam: 85 });

  const [sales, setSales] = useState({ price: 100000, cost: 70000, vol: 500, growth: 10 });
  const [forecast, setForecast] = useState({ m1: 100, m2: 120, m3: 110, m4: 130, m5: 115, m6: 140 });
  const [commission, setCommission] = useState({ sales: 50000000, rate: 2.5, tier1: 10000000, tier2: 30000000, tier3: 50000000 });
  const [abc, setAbc] = useState([{ item: "A", name: "Part A", value: 500000, qty: 1000 }, { item: "B", name: "Part B", value: 300000, qty: 2000 }, { item: "C", name: "Part C", value: 100000, qty: 5000 }, { item: "D", name: "Part D", value: 50000, qty: 10000 }, { item: "E", name: "Part E", value: 20000, qty: 20000 }]);
  const [pricing, setPricing] = useState({ cost: 80000, margin: 25, competitor: 110000, suggested: 0 });

  const [roi, setRoi] = useState({ invest: 100000000, return: 150000000, years: 3 });
  const [breakeven, setBreakeven] = useState({ fixed: 50000000, price: 100000, variable: 60000, current: 800 });
  const [cashflow, setCashflow] = useState({ income: 200000000, expense: 150000000, receivables: 30000000, payables: 20000000 });
  const [depreciation, setDepreciation] = useState({ cost: 100000000, salvage: 10000000, life: 5, method: "straight" });
  const [budget, setBudget] = useState([{ dept: "Produksi", allocated: 50000000, spent: 42000000 }, { dept: "Quality", allocated: 20000000, spent: 18000000 }, { dept: "Maintenance", allocated: 30000000, spent: 28000000 }, { dept: "HR", allocated: 15000000, spent: 12000000 }]);

  const [safety, setSafety] = useState({ incidents: 0, lost: 0, nearMiss: 3, hours: 200000 });
  const [risk, setRisk] = useState([{ hazard: "Chemical Spill", severity: 8, probability: 3, control: "PPE", status: "Open" }, { hazard: "Machine Guard", severity: 7, probability: 5, control: "Engineering", status: "Progress" }, { hazard: "Ergonomic", severity: 4, probability: 6, control: "Admin", status: "Open" }]);
  const [ppe, setPpe] = useState({ helmet: 98, gloves: 95, goggles: 92, shoes: 90, vest: 96 });

  const [waste, setWaste] = useState({ total: 10000, scrap: 300, recycle: 200, reuse: 150, landfill: 50 });
  const [energy, setEnergy] = useState({ electricity: 50000, gas: 2000, diesel: 1000, cost: 85000000 });
  const [carbon, setCarbon] = useState({ elec: 50000, fuel: 1000, material: 20000, scope1: 5000, scope2: 25000 });

  const calcOEE = () => (oee.avail * oee.perf * oee.qual / 10000).toFixed(1);
  const calcCycleEff = () => ((cycle.target / cycle.actual) * 100).toFixed(1);
  const calcCap = () => (capacity.days * capacity.shift * capacity.hours * capacity.eff / 100).toFixed(0);
  const calcManpower = () => ((manpower.required - manpower.available + manpower.hire) / manpower.required * 100).toFixed(0);
  const calcTaktTime = () => ((takt.available * (100 - takt.losses) / 100) / takt.demand).toFixed(1);
  const calcNetReq = () => Math.max(0, mrp.gross - mrp.scheduled - mrp.safety);
  const calcLTIF = () => ((safety.incidents + safety.lost) * 1000000 / safety.hours).toFixed(2);
  const calcSafetyScore = () => Math.max(0, 100 - (safety.incidents * 20) - (safety.lost * 30) - (safety.nearMiss * 2));

  const calcPPM = () => ((ppm.defect / ppm.total) * 1000000).toFixed(0);
  const calcPPMTrend = () => ((ppm.defect / ppm.total * 1000000 - ppm.target) / ppm.target * 100).toFixed(1);
  const calcCPK = () => { const cpu = (cpk.usl - cpk.mean) / (3 * cpk.std); const cpl = (cpk.mean - cpk.lsl) / (3 * cpk.std); const val = Math.min(cpu, cpl); cpk.cp = val; return val.toFixed(2); };
  const calcFMEA = () => fmea.reduce((a, b) => a + b.rpn, 0);
  const calcQualityScore = () => ((qualityScore.inspection + qualityScore.testing + qualityScore.compliance + qualityScore.customer) / 4).toFixed(0);
  const calcAuditScore = () => ((auditScore.iatf * 0.4 + auditScore.iso9001 * 0.3 + auditScore.iso45001 * 0.15 + auditScore.sqam * 0.15)).toFixed(0);

  const calcProfit = () => ((sales.price - sales.cost) * sales.vol).toFixed(0);
  const calcMargin = () => (((sales.price - sales.cost) / sales.price) * 100).toFixed(1);
  const calcForecastAvg = () => ((forecast.m1 + forecast.m2 + forecast.m3 + forecast.m4 + forecast.m5 + forecast.m6) / 6).toFixed(0);
  const calcForecastTrend = () => (((forecast.m6 - forecast.m1) / forecast.m1) * 100).toFixed(1);
  const calcCommTier = () => { if (commission.sales >= commission.tier3) return 3; if (commission.sales >= commission.tier2) return 2; return 1; };
  const calcComm = () => ((commission.sales * commission.rate / 100)).toFixed(0);
  const calcAbcValue = () => abc.reduce((a, b) => a + b.value, 0);
  const calcPricingSuggest = () => { pricing.suggested = pricing.cost / (1 - pricing.margin / 100); return pricing.suggested.toFixed(0); };

  const calcRoi = () => (((roi.return - roi.invest) / roi.invest * 100 / roi.years)).toFixed(1);
  const calcROIYears = () => (roi.invest / (roi.return / roi.years)).toFixed(1);
  const calcBE = () => Math.ceil(breakeven.fixed / (breakeven.price - breakeven.variable));
  const calcMarginSafety = () => ((breakeven.current * (breakeven.price - breakeven.variable) - breakeven.fixed) / (breakeven.current * breakeven.price) * 100).toFixed(1);
  const calcNetCash = () => (cashflow.income - cashflow.expense);
  const calcWorkingCap = () => (cashflow.receivables - cashflow.payables);
  const calcDeprec = () => ((depreciation.cost - depreciation.salvage) / depreciation.life).toFixed(0);
  const calcBudgetVar = (spent: number, allocated: number) => ((spent - allocated) / allocated * 100).toFixed(1);

  const calcWasteRate = () => ((waste.scrap / waste.total) * 100).toFixed(1);
  const calcRecycleRate = () => (((waste.recycle + waste.reuse) / waste.total) * 100).toFixed(1);
  const calcEnergyCost = () => (energy.electricity * 1500 + energy.gas * 8000 + energy.diesel * 15000);
  const calcCarbonTotal = () => (carbon.elec * 0.5 + carbon.fuel * 2.3 + carbon.material * 0.8 + carbon.scope1 + carbon.scope2);

  const generateDocument = (type: GeneratorType) => {
    const now = new Date().toLocaleDateString("id-ID");
    const no = Date.now().toString().slice(-6);

    const docs: Record<string, { title: string; content: string }> = {
      ncr: { title: "NCR - Non-Conformance Report", content: `╔════════════════════════════════════════════════════════════╗
║           NON-CONFORMANCE REPORT (NCR)                       ║
╠════════════════════════════════════════════════════════════╣
║ No NCR     : NCR-${no}                                     ║
║ Tanggal    : ${now}                                        ║
╠════════════════════════════════════════════════════════════╣
║ CUSTOMER/PRODUK                                            ║
╠════════════════════════════════════════════════════════════╣
║ Customer        : _______________________                   ║
║ Nama Produk     : _______________________                   ║
║ Part Number     : _______________________                   ║
║ Batch/Lot No    : _______________________                   ║
║ Qty Produced    : _______________________                   ║
║ Shift           : [ ] A  [ ] B  [ ] C                      ║
╠════════════════════════════════════════════════════════════╣
║ DEFECT INFORMATION                                         ║
╠════════════════════════════════════════════════════════════╣
║ Jenis Defect   : _______________________                   ║
║ Qty Defect     : _______________________                   ║
║ Severity       : [ ] Minor  [ ] Major  [ ] Critical        ║
║ Location       : _______________________                   ║
╠════════════════════════════════════════════════════════════╣
║ ROOT CAUSE ANALYSIS                                        ║
╠════════════════════════════════════════════════════════════╣
║ Kategori       : [ ] Man  [ ] Machine  [ ] Material        ║
║                : [ ] Method  [ ] Environment                ║
║ Analisa 5 Why  : _______________________                   ║
║                : _______________________                   ║
╠════════════════════════════════════════════════════════════╣
║ CORRECTIVE ACTION                                          ║
╠════════════════════════════════════════════════════════════╣
║ Immediate     : _______________________                   ║
║ Corrective    : _______________________                   ║
║ Preventive    : _______________________                   ║
║ Responsible   : _______________________                   ║
║ Target Date   : _______________________                   ║
╠════════════════════════════════════════════════════════════╣
║ VERIFICATION                                                ║
╠════════════════════════════════════════════════════════════╣
║ Effectiveness  : [ ] Effective  [ ] Ineffective            ║
║ Verified By   : _______________________                   ║
║ Date          : _______________________                   ║
╠════════════════════════════════════════════════════════════╣
║ STATUS: [ ] Open [ ] In Progress [ ] Closed                ║
╚════════════════════════════════════════════════════════════╝` },

      wo: { title: "Work Order", content: `╔════════════════════════════════════════════════════════════╗
║                  WORK ORDER (WO)                          ║
╠════════════════════════════════════════════════════════════╣
║ No WO         : WO-${no}                                  ║
║ Tanggal       : ${now}                                     ║
╠════════════════════════════════════════════════════════════╣
║ EQUIPMENT/MESIN                                            ║
╠════════════════════════════════════════════════════════════╣
║ Nama Mesin    : _______________________                    ║
║ Machine ID   : _______________________                    ║
║ Location     : _______________________                    ║
║ Model        : _______________________                    ║
╠════════════════════════════════════════════════════════════╣
║ WORK DESCRIPTION                                           ║
╠════════════════════════════════════════════════════════════╣
║ Type         : [ ] Preventive  [ ] Corrective              ║
║              : [ ] Emergency   [ ] Improvement            ║
║ Priority     : [ ] Low  [ ] Medium  [ ] High  [ ] Critical ║
║ Description : _______________________                    ║
║              : _______________________                    ║
╠════════════════════════════════════════════════════════════╣
║ SPARE PARTS                                                ║
╠════════════════════════════════════════════════════════════╣
║ Part Name     │ Qty │ Part No   │ Status                   ║
║_______________│____─┼___________│__________                ║
║               │     │           │                          ║
║               │     │           │                          ║
╠════════════════════════════════════════════════════════════╣
║ LABOR                                                       ║
╠════════════════════════════════════════════════════════════╣
║ Technician   : _______________________                    ║
║ Est. Hours   : _______________________                    ║
║ Start Date   : _______________________                    ║
║ End Date     : _______________________                    ║
╠════════════════════════════════════════════════════════════╣
║ STATUS: [ ] Assigned [ ] In Progress [ ] Completed         ║
╚════════════════════════════════════════════════════════════╝` },

      "production-plan": { title: "Production Plan", content: `╔════════════════════════════════════════════════════════════╗
║              MONTHLY PRODUCTION PLAN                      ║
╠════════════════════════════════════════════════════════════╣
║ Period      : ${now}                                      ║
║ Plan No     : PP-${no}                                    ║
╠════════════════════════════════════════════════════════════╣
║ PRODUCTION TARGETS                                         ║
╠════════════════════════════════════════════════════════════╣
║ Line        │ Target   │ Capacity  │ Utilization            ║
║_____________│__________│___________│__________              ║
║ Line 1      │   5,000  │   6,000   │   83%                  ║
║ Line 2      │   4,000  │   5,000   │   80%                  ║
║ Line 3      │   3,000  │   4,000   │   75%                  ║
║ Total       │  12,000  │  15,000   │   80%                  ║
╠════════════════════════════════════════════════════════════╣
║ SHIFT SCHEDULE                                              ║
╠════════════════════════════════════════════════════════════╣
║ Line        │ Shift A │ Shift B │ Shift C │ Overtime        ║
║_____________│_________│_________│_________│________         ║
║ Line 1      │   8     │   6     │   2     │   2             ║
║ Line 2      │   6     │   4     │   -     │   2             ║
║ Line 3      │   4     │   -     │   -     │   1             ║
╠════════════════════════════════════════════════════════════╣
║ RAW MATERIAL REQUIREMENT                                    ║
╠════════════════════════════════════════════════════════════╣
║ Material    │ Required │ Available │ Shortage │ Order        ║
║_____________│__________│___________│__________│________      ║
║ Steel       │  50,000 │  45,000  │   5,000  │    Yes        ║
║ Aluminum    │  20,000 │  22,000  │     -    │    No         ║
║ Plastic     │  15,000 │  12,000  │   3,000  │    Yes        ║
╠════════════════════════════════════════════════════════════╣
║ Approved By: ________________    Date: _____________       ║
╚════════════════════════════════════════════════════════════╝` },

      "monthly-report": { title: "Monthly Management Report", content: `╔════════════════════════════════════════════════════════════╗
║              MONTHLY MANAGEMENT REPORT                     ║
╠════════════════════════════════════════════════════════════╣
║ Period      : ${now}                                      ║
║ Dept        : Quality & Production                         ║
╠════════════════════════════════════════════════════════════╣
║ PRODUCTION SUMMARY                                          ║
╠════════════════════════════════════════════════════════════╣
║ Metric              │ Target  │ Actual  │ Achievement       ║
║_____________________|__________|__________|_________         ║
║ Total Output        │ 15,000  │ 14,500  │    96.7%          ║
║ OEE                 │  85%    │  82.3%  │    96.8%          ║
║ On-time Delivery    │  95%    │  93.2%  │    98.1%          ║
║ Cycle Time          │  45 sec │  47 sec │    95.7%          ║
╠════════════════════════════════════════════════════════════╣
║ QUALITY SUMMARY                                             ║
╠════════════════════════════════════════════════════════════╣
║ Metric              │ Target  │ Actual  │ Achievement       ║
║_____________________|__________|__________|_________         ║
║ PPM                 │  1,000  │    850  │    117.6%         ║
║ FPY                 │  98%    │  97.8%  │    99.8%          ║
║ NCR                 │     5   │      4  │    125.0%         ║
║ Customer Complaints│     2   │      1  │    200.0%         ║
╠════════════════════════════════════════════════════════════╣
║ MAINTENANCE SUMMARY                                         ║
╠════════════════════════════════════════════════════════════╣
║ MTBF              : 480 hours                               ║
║ MTTR              : 2.5 hours                               ║
║ Availability      : 95.2%                                   ║
║ Maintenance Cost  : Rp 25,000,000                           ║
╠════════════════════════════════════════════════════════════╣
║ ISSUES & ACTIONS                                            ║
╠════════════════════════════════════════════════════════════╣
║ 1. Line 2 downtime increased - scheduled PM review         ║
║ 2. Supplier A quality variance - audit scheduled            ║
║ 3. Training completion at 92% - follow up required         ║
╠════════════════════════════════════════════════════════════╣
║ Prepared By: ____________  Approved By: ____________        ║
╚════════════════════════════════════════════════════════════╝` },

      "quality-report": { title: "Quality Report", content: `╔════════════════════════════════════════════════════════════╗
║                 QUALITY REPORT                              ║
╠════════════════════════════════════════════════════════════╣
║ Period      : ${now}                                      ║
║ Report No   : QR-${no}                                    ║
╠════════════════════════════════════════════════════════════╣
║ QUALITY KPIS                                                ║
╠════════════════════════════════════════════════════════════╣
║                        │ Target  │ Actual │ vs Target        ║
║________________________|__________|--------|________         ║
║ First Pass Yield       │  98.0%  │ 97.8%  │    -0.2%         ║
║ PPM                   │ 1,000   │   850  │   +17.6%          ║
║ Customer Rejection    │   0.5%  │  0.3%  │   +66.7%          ║
║ NCR Count              │       5 │      4 │   +25.0%          ║
║ CAPA Effectiveness    │  100%   │  95%   │    -5.0%          ║
╠════════════════════════════════════════════════════════════╣
║ DEFECT Pareto (Top 5)                                      ║
╠════════════════════════════════════════════════════════════╣
║ No │ Defect Type        │ Qty │ %    │ Cumulative          ║
║____│____________________|_____|______│__________           ║
║  1 │ Dimension Out      │  45 │ 45%  │    45%              ║
║  2 │ Surface Scratch    │  28 │ 28%  │    73%              ║
║  3 │ Assembly Error     │  15 │ 15%  │    88%              ║
║  4 │ Material Defect    │   8 │  8%  │    96%              ║
║  5 │ Other              │   4 │  4%  │   100%              ║
╠════════════════════════════════════════════════════════════╣
║ CUSTOMER FEEDBACK                                           ║
╠════════════════════════════════════════════════════════════╣
║ Customer          │ Feedback            │ Status           ║
║___________________|_____________________|__________         ║
║ PT Toyota Astra   │ Delivery on time    │ Resolved         ║
║ PT Daihatsu      │ Packaging improve   │ In Progress      ║
╠════════════════════════════════════════════════════════════╣
║ SQAM GRADE: A ( <0.1% defect rate)                          ║
╚════════════════════════════════════════════════════════════╝` },

      "cost-analysis": { title: "Cost Analysis Report", content: `╔════════════════════════════════════════════════════════════╗
║              COST ANALYSIS REPORT                           ║
╠════════════════════════════════════════════════════════════╣
║ Period      : ${now}                                      ║
║ Report No   : CA-${no}                                    ║
╠════════════════════════════════════════════════════════════╣
║ PRODUCTION COST BREAKDOWN                                   ║
╠════════════════════════════════════════════════════════════╣
║                        │ Amount (Rp)  │ % of Total          ║
║________________________|_______________|________             ║
║ Direct Material        │  500,000,000 │   50.0%             ║
║ Direct Labor           │  200,000,000 │   20.0%             ║
║ Manufacturing Overhead │  150,000,000 │   15.0%             ║
║ Quality Cost           │   75,000,000 │    7.5%             ║
║ Maintenance Cost       │   50,000,000 │    5.0%             ║
║ Admin & Others         │   25,000,000 │    2.5%             ║
║_________________________|_______________|________             ║
║ TOTAL COST             │1,000,000,000 │  100.0%             ║
╠════════════════════════════════════════════════════════════╣
║ COST PER UNIT                                               ║
╠════════════════════════════════════════════════════════════╣
║ Units Produced      : 15,000                                ║
║ Cost/Unit          : Rp 66,667                              ║
║ Selling Price      : Rp 100,000                             ║
║ Gross Margin       : Rp 33,333 (33.3%)                     ║
╠════════════════════════════════════════════════════════════╣
║ QUALITY COST BREAKDOWN                                      ║
╠════════════════════════════════════════════════════════════╣
║ Prevention         │  20,000,000 │   26.7%                  ║
║ Appraisal          │  30,000,000 │   40.0%                  ║
║ Internal Failure   │  15,000,000 │   20.0%                  ║
║ External Failure   │  10,000,000 │   13.3%                  ║
╠════════════════════════════════════════════════════════════╣
║ COST SAVINGS OPPORTUNITY                                    ║
╠════════════════════════════════════════════════════════════╣
║ • Reduce scrap rate 2% → Save Rp 20,000,000                ║
║ • Improve FPY 1% → Save Rp 10,000,000                      ║
║ • Preventive maintenance → Save Rp 15,000,000               ║
╠════════════════════════════════════════════════════════════╣
║ TOTAL POTENTIAL SAVINGS: Rp 45,000,000/year                 ║
╚════════════════════════════════════════════════════════════╝` },
    };

    const doc = docs[type] || docs["ncr"];
    setGeneratedDoc(doc);
  };

  const exportToPDF = () => {
    if (!generatedDoc) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>${generatedDoc.title}</title></head>
          <body style="font-family: monospace; white-space: pre; padding: 20px;">
            ${generatedDoc.content}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const categoryLabels: Record<AppCategory, string> = {
    produksi: "Produksi", kualitas: "Kualitas", penjualan: "Penjualan",
    administrasi: "Administrasi", hr: "HR & SDM", k3: "K3 (Safety)", ekonomi_sirkular: "Ekonomi Sirkular",
  };

  const categoryColors: Record<AppCategory, string> = {
    produksi: "bg-blue-500", kualitas: "bg-green-500", penjualan: "bg-purple-500",
    administrasi: "bg-amber-500", hr: "bg-pink-500", k3: "bg-red-500", ekonomi_sirkular: "bg-emerald-500",
  };

  const renderApp = (cat: AppCategory, appId: number) => {
    const inputClass = "w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 text-sm";
    const labelClass = "text-xs text-slate-400 mb-1 block";
    const sectionClass = "bg-slate-800 rounded-xl border border-slate-700 p-6";

    switch (cat) {
      case "produksi":
        switch (appId) {
          case 1: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"⚙️"} OEE Calculator</h3>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="space-y-3"><label className={labelClass}>Availability</label><input type="range" min="0" max="100" value={oee.avail} onChange={(e) => setOee({...oee, avail: +e.target.value})} className="w-full accent-teal-500"/><div className="text-right text-teal-400 font-bold text-lg">{oee.avail}%</div></div>
                <div className="space-y-3"><label className={labelClass}>Performance</label><input type="range" min="0" max="100" value={oee.perf} onChange={(e) => setOee({...oee, perf: +e.target.value})} className="w-full accent-teal-500"/><div className="text-right text-teal-400 font-bold text-lg">{oee.perf}%</div></div>
                <div className="space-y-3"><label className={labelClass}>Quality</label><input type="range" min="0" max="100" value={oee.qual} onChange={(e) => setOee({...oee, qual: +e.target.value})} className="w-full accent-teal-500"/><div className="text-right text-teal-400 font-bold text-lg">{oee.qual}%</div></div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3 bg-gradient-to-r from-teal-900/50 to-emerald-900/50 rounded-xl p-6 border border-teal-500/30">
                  <div className="text-slate-400 text-sm mb-2">OEE Result</div>
                  <div className="text-6xl font-bold text-teal-400">{calcOEE()}%</div>
                  <div className={`mt-3 text-lg ${+calcOEE() >= 85 ? "text-emerald-400" : +calcOEE() >= 65 ? "text-amber-400" : "text-red-400"}`}>{"⭐".repeat(+calcOEE() >= 85 ? 3 : +calcOEE() >= 65 ? 2 : 1)} {+calcOEE() >= 85 ? "World Class" : +calcOEE() >= 65 ? "Good" : "Needs Improvement"}</div>
                </div>
                <div className="space-y-3">
                  <div className="bg-slate-700/50 rounded-lg p-3 text-center"><div className="text-xs text-slate-400">Availability Loss</div><div className="text-amber-400 font-bold">{100 - oee.avail}%</div></div>
                  <div className="bg-slate-700/50 rounded-lg p-3 text-center"><div className="text-xs text-slate-400">Performance Loss</div><div className="text-amber-400 font-bold">{100 - oee.perf}%</div></div>
                  <div className="bg-slate-700/50 rounded-lg p-3 text-center"><div className="text-xs text-slate-400">Quality Loss</div><div className="text-amber-400 font-bold">{100 - oee.qual}%</div></div>
                </div>
              </div>
            </div>
          );
          case 2: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"⏱️"} Cycle Time Analyzer</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div><label className={labelClass}>Actual Cycle Time (detik)</label><input type="number" value={cycle.actual} onChange={(e) => setCycle({...cycle, actual: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Target Cycle Time (detik)</label><input type="number" value={cycle.target} onChange={(e) => setCycle({...cycle, target: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Output/Hari (unit)</label><input type="number" value={cycle.output} onChange={(e) => setCycle({...cycle, output: +e.target.value})} className={inputClass}/></div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-slate-700/50 rounded-xl p-5 text-center"><div className="text-slate-400 text-sm mb-2">Cycle Efficiency</div><div className={`text-5xl font-bold ${+calcCycleEff() >= 100 ? "text-emerald-400" : "text-amber-400"}`}>{calcCycleEff()}%</div></div>
                <div className="bg-slate-700/50 rounded-xl p-5 text-center"><div className="text-slate-400 text-sm mb-2">Time Loss/Hari</div><div className="text-5xl font-bold text-red-400">{Math.max(0, (cycle.actual - cycle.target) * cycle.output / 60).toFixed(0)} min</div></div>
                <div className="bg-slate-700/50 rounded-xl p-5 text-center"><div className="text-slate-400 text-sm mb-2">Daily Output</div><div className="text-5xl font-bold text-blue-400">{cycle.output}</div></div>
              </div>
            </div>
          );
          case 3: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"📈"} Capacity Planning</h3>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div><label className={labelClass}>Working Days</label><input type="number" value={capacity.days} onChange={(e) => setCapacity({...capacity, days: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Shifts/Day</label><input type="number" value={capacity.shift} onChange={(e) => setCapacity({...capacity, shift: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Hours/Shift</label><input type="number" value={capacity.hours} onChange={(e) => setCapacity({...capacity, hours: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Efficiency %</label><input type="range" min="50" max="100" value={capacity.eff} onChange={(e) => setCapacity({...capacity, eff: +e.target.value})} className="w-full mt-4 accent-teal-500"/><div className="text-right text-teal-400">{capacity.eff}%</div></div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-purple-900/30 rounded-xl p-5 text-center border border-purple-500/30"><div className="text-slate-400 text-sm mb-2">Monthly Capacity</div><div className="text-5xl font-bold text-purple-400">{calcCap()} jam</div></div>
                <div className="bg-blue-900/30 rounded-xl p-5 text-center border border-blue-500/30"><div className="text-slate-400 text-sm mb-2">Effective Hours</div><div className="text-5xl font-bold text-blue-400">{(+calcCap() * capacity.eff / 100).toFixed(0)} jam</div></div>
                <div className="bg-emerald-900/30 rounded-xl p-5 text-center border border-emerald-500/30"><div className="text-slate-400 text-sm mb-2">Workers</div><div className="text-5xl font-bold text-emerald-400">{capacity.workers}</div></div>
              </div>
            </div>
          );
          case 9: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"🕐"} Shift Scheduler</h3>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div><label className={labelClass}>Line 1 Workers</label><input type="number" value={shift.line1} onChange={(e) => setShift({...shift, line1: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Line 2 Workers</label><input type="number" value={shift.line2} onChange={(e) => setShift({...shift, line2: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Line 3 Workers</label><input type="number" value={shift.line3} onChange={(e) => setShift({...shift, line3: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Overtime Hours</label><input type="number" value={shift.overtime} onChange={(e) => setShift({...shift, overtime: +e.target.value})} className={inputClass}/></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl p-5 border border-blue-500/30"><div className="text-slate-400 text-sm mb-2">Total Workers</div><div className="text-4xl font-bold text-blue-400">{shift.line1 + shift.line2 + shift.line3 + shift.overtime}</div></div>
                <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-xl p-5 border border-purple-500/30"><div className="text-slate-400 text-sm mb-2">Regular Hours/Minggu</div><div className="text-4xl font-bold text-purple-400">{(shift.line1 + shift.line2 + shift.line3) * 40}</div></div>
                <div className="bg-gradient-to-br from-amber-600/20 to-amber-800/20 rounded-xl p-5 border border-amber-500/30"><div className="text-slate-400 text-sm mb-2">Overtime Cost/Minggu</div><div className="text-4xl font-bold text-amber-400">Rp {((shift.line1 + shift.line2 + shift.line3) * shift.overtime * 50000).toLocaleString("id-ID")}</div></div>
              </div>
            </div>
          );
          case 10: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"👥"} Manpower Planning</h3>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div><label className={labelClass}>Required</label><input type="number" value={manpower.required} onChange={(e) => setManpower({...manpower, required: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Available</label><input type="number" value={manpower.available} onChange={(e) => setManpower({...manpower, available: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Monthly Turnover</label><input type="number" value={manpower.turnover} onChange={(e) => setManpower({...manpower, turnover: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>New Hire Plan</label><input type="number" value={manpower.hire} onChange={(e) => setManpower({...manpower, hire: +e.target.value})} className={inputClass}/></div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-slate-700/50 rounded-xl p-5 text-center"><div className="text-slate-400 text-sm mb-2">Gap</div><div className={`text-5xl font-bold ${manpower.required - manpower.available > 0 ? "text-red-400" : "text-emerald-400"}`}>{manpower.required - manpower.available}</div></div>
                <div className="bg-slate-700/50 rounded-xl p-5 text-center"><div className="text-slate-400 text-sm mb-2">Monthly Attrition</div><div className="text-5xl font-bold text-amber-400">{manpower.turnover}%</div></div>
                <div className="bg-slate-700/50 rounded-xl p-5 text-center"><div className="text-slate-400 text-sm mb-2">Staffing Level</div><div className={`text-5xl font-bold ${+calcManpower() < 100 ? "text-red-400" : "text-emerald-400"}`}>{calcManpower()}%</div></div>
              </div>
            </div>
          );
        }
        break;
      case "kualitas":
        switch (appId) {
          case 11: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"📊"} PPM Converter</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div><label className={labelClass}>Total Units</label><input type="number" value={ppm.total} onChange={(e) => setPpm({...ppm, total: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Defective Units</label><input type="number" value={ppm.defect} onChange={(e) => setPpm({...ppm, defect: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Target PPM</label><input type="number" value={ppm.target} onChange={(e) => setPpm({...ppm, target: +e.target.value})} className={inputClass}/></div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-emerald-900/30 rounded-xl p-6 text-center border border-emerald-500/30"><div className="text-slate-400 text-sm mb-2">Current PPM</div><div className={`text-6xl font-bold ${+calcPPM() <= ppm.target ? "text-emerald-400" : "text-red-400"}`}>{calcPPM()}</div></div>
                <div className="bg-slate-700/50 rounded-xl p-6 text-center"><div className="text-slate-400 text-sm mb-2">vs Target</div><div className={`text-5xl font-bold ${+calcPPMTrend() <= 0 ? "text-emerald-400" : "text-red-400"}`}>{calcPPMTrend()}%</div></div>
                <div className="bg-blue-900/30 rounded-xl p-6 text-center border border-blue-500/30"><div className="text-slate-400 text-sm mb-2">SQAM Grade</div><div className={`text-6xl font-bold ${+calcPPM() < 1000 ? "text-emerald-400" : +calcPPM() < 5000 ? "text-amber-400" : "text-red-400"}`}>{+calcPPM() < 1000 ? "A" : +calcPPM() < 5000 ? "B" : "C"}</div></div>
              </div>
            </div>
          );
          case 12: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"📉"} CPK Calculator</h3>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div><label className={labelClass}>USL</label><input type="number" step="0.1" value={cpk.usl} onChange={(e) => setCpk({...cpk, usl: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>LSL</label><input type="number" step="0.1" value={cpk.lsl} onChange={(e) => setCpk({...cpk, lsl: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Mean</label><input type="number" step="0.1" value={cpk.mean} onChange={(e) => setCpk({...cpk, mean: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Std Dev</label><input type="number" step="0.01" value={cpk.std} onChange={(e) => setCpk({...cpk, std: +e.target.value})} className={inputClass}/></div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-xl p-6 text-center border border-green-500/30"><div className="text-slate-400 text-sm mb-2">CPK</div><div className={`text-6xl font-bold ${+calcCPK() >= 1.33 ? "text-emerald-400" : +calcCPK() >= 1.0 ? "text-amber-400" : "text-red-400"}`}>{calcCPK()}</div></div>
                <div className="bg-slate-700/50 rounded-xl p-6 text-center"><div className="text-slate-400 text-sm mb-2">CPU</div><div className="text-4xl font-bold text-blue-400">{((cpk.usl - cpk.mean) / (3 * cpk.std)).toFixed(2)}</div></div>
                <div className="bg-slate-700/50 rounded-xl p-6 text-center"><div className="text-slate-400 text-sm mb-2">CPL</div><div className="text-4xl font-bold text-purple-400">{((cpk.mean - cpk.lsl) / (3 * cpk.std)).toFixed(2)}</div></div>
              </div>
            </div>
          );
          case 13: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"⚠️"} FMEA Analysis</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead><tr className="text-slate-400 border-b border-slate-700"><th className="text-left py-2">Failure Mode</th><th className="text-center py-2">S</th><th className="text-center py-2">O</th><th className="text-center py-2">D</th><th className="text-center py-2">RPN</th><th className="text-center py-2">Action</th></tr></thead>
                  <tbody>
                    {fmea.map((f, i) => <tr key={i} className="border-b border-slate-700/50"><td className="py-2 text-slate-300">{f.item}</td><td className="text-center"><input type="number" min="1" max="10" value={f.sev} onChange={(e) => { const n = [...fmea]; n[i].sev = +e.target.value; n[i].rpn = n[i].sev * n[i].occ * n[i].det; setFmea(n); }} className="w-12 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-center"/></td><td className="text-center"><input type="number" min="1" max="10" value={f.occ} onChange={(e) => { const n = [...fmea]; n[i].occ = +e.target.value; n[i].rpn = n[i].sev * n[i].occ * n[i].det; setFmea(n); }} className="w-12 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-center"/></td><td className="text-center"><input type="number" min="1" max="10" value={f.det} onChange={(e) => { const n = [...fmea]; n[i].det = +e.target.value; n[i].rpn = n[i].sev * n[i].occ * n[i].det; setFmea(n); }} className="w-12 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-center"/></td><td className="text-center font-bold text-amber-400">{f.rpn}</td><td className="text-center"><button className="text-teal-400 text-xs">Edit</button></td></tr>)}
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-slate-700/50 rounded-xl p-5 text-center"><div className="text-slate-400 text-sm mb-2">Total RPN</div><div className="text-5xl font-bold text-amber-400">{calcFMEA()}</div></div>
                <div className="bg-red-900/30 rounded-xl p-5 text-center border border-red-500/30"><div className="text-slate-400 text-sm mb-2">High Risk Items</div><div className="text-5xl font-bold text-red-400">{fmea.filter(f => f.rpn >= 100).length}</div></div>
                <div className="bg-amber-900/30 rounded-xl p-5 text-center border border-amber-500/30"><div className="text-slate-400 text-sm mb-2">RPN Reduction Target</div><div className="text-5xl font-bold text-amber-400">25%</div></div>
              </div>
            </div>
          );
          case 19: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"⭐"} Quality Score Dashboard</h3>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div><label className={labelClass}>Inspection %</label><input type="range" min="0" max="100" value={qualityScore.inspection} onChange={(e) => setQualityScore({...qualityScore, inspection: +e.target.value})} className="w-full accent-green-500"/><div className="text-right text-teal-400">{qualityScore.inspection}%</div></div>
                <div><label className={labelClass}>Testing %</label><input type="range" min="0" max="100" value={qualityScore.testing} onChange={(e) => setQualityScore({...qualityScore, testing: +e.target.value})} className="w-full accent-green-500"/><div className="text-right text-teal-400">{qualityScore.testing}%</div></div>
                <div><label className={labelClass}>Compliance %</label><input type="range" min="0" max="100" value={qualityScore.compliance} onChange={(e) => setQualityScore({...qualityScore, compliance: +e.target.value})} className="w-full accent-green-500"/><div className="text-right text-teal-400">{qualityScore.compliance}%</div></div>
                <div><label className={labelClass}>Customer SAT %</label><input type="range" min="0" max="100" value={qualityScore.customer} onChange={(e) => setQualityScore({...qualityScore, customer: +e.target.value})} className="w-full accent-green-500"/><div className="text-right text-teal-400">{qualityScore.customer}%</div></div>
              </div>
              <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 rounded-xl p-6 border border-emerald-500/30 text-center"><div className="text-slate-400 text-sm mb-2">Overall Quality Score</div><div className="text-7xl font-bold text-emerald-400">{calcQualityScore()}%</div><div className={`mt-3 text-lg ${+calcQualityScore() >= 90 ? "text-emerald-400" : "text-amber-400"}`}>{+calcQualityScore() >= 90 ? "✓ Excellent" : "⚠ Needs Improvement"}</div></div>
            </div>
          );
          case 20: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"🏆"} Audit Readiness Score</h3>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div><label className={labelClass}>IATF 16949</label><input type="range" min="0" max="100" value={auditScore.iatf} onChange={(e) => setAuditScore({...auditScore, iatf: +e.target.value})} className="w-full accent-blue-500"/><div className="text-right text-teal-400">{auditScore.iatf}%</div></div>
                <div><label className={labelClass}>ISO 9001</label><input type="range" min="0" max="100" value={auditScore.iso9001} onChange={(e) => setAuditScore({...auditScore, iso9001: +e.target.value})} className="w-full accent-blue-500"/><div className="text-right text-teal-400">{auditScore.iso9001}%</div></div>
                <div><label className={labelClass}>ISO 45001</label><input type="range" min="0" max="100" value={auditScore.iso45001} onChange={(e) => setAuditScore({...auditScore, iso45001: +e.target.value})} className="w-full accent-blue-500"/><div className="text-right text-teal-400">{auditScore.iso45001}%</div></div>
                <div><label className={labelClass}>SQAM</label><input type="range" min="0" max="100" value={auditScore.sqam} onChange={(e) => setAuditScore({...auditScore, sqam: +e.target.value})} className="w-full accent-blue-500"/><div className="text-right text-teal-400">{auditScore.sqam}%</div></div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-6 border border-blue-500/30 text-center"><div className="text-slate-400 text-sm mb-2">Weighted Score</div><div className="text-6xl font-bold text-blue-400">{calcAuditScore()}%</div></div>
                <div className="bg-slate-700/50 rounded-xl p-6 text-center"><div className="text-slate-400 text-sm mb-2">Audit Status</div><div className={`text-5xl font-bold ${+calcAuditScore() >= 75 ? "text-emerald-400" : "text-amber-400"}`}>{+calcAuditScore() >= 75 ? "Ready" : "In Progress"}</div></div>
              </div>
            </div>
          );
        }
        break;
      case "penjualan":
        switch (appId) {
          case 21: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"🔮"} Sales Forecast</h3>
              <div className="grid grid-cols-6 gap-3 mb-6">
                {(["m1","m2","m3","m4","m5","m6"] as const).map((m, i) => <div key={m}><label className={labelClass}>Bulan {i+1}</label><input type="number" value={forecast[m]} onChange={(e) => setForecast({...forecast, [m]: +e.target.value})} className={inputClass}/></div>)}
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-blue-900/30 rounded-xl p-5 text-center border border-blue-500/30"><div className="text-slate-400 text-sm mb-2">Average</div><div className="text-4xl font-bold text-blue-400">{calcForecastAvg()}</div></div>
                <div className="bg-slate-700/50 rounded-xl p-5 text-center"><div className="text-slate-400 text-sm mb-2">Trend</div><div className={`text-4xl font-bold ${+calcForecastTrend() > 0 ? "text-emerald-400" : "text-red-400"}`}>{calcForecastTrend()}%</div></div>
                <div className="bg-purple-900/30 rounded-xl p-5 text-center border border-purple-500/30"><div className="text-slate-400 text-sm mb-2">Total 6 Bulan</div><div className="text-4xl font-bold text-purple-400">{Object.values(forecast).reduce((a,b) => a+b, 0)}</div></div>
              </div>
            </div>
          );
          case 22: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"💰"} Profit Margin Calculator</h3>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div><label className={labelClass}>Selling Price (Rp)</label><input type="number" value={sales.price} onChange={(e) => setSales({...sales, price: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Cost (Rp)</label><input type="number" value={sales.cost} onChange={(e) => setSales({...sales, cost: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Volume</label><input type="number" value={sales.vol} onChange={(e) => setSales({...sales, vol: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Growth Target %</label><input type="number" value={sales.growth} onChange={(e) => setSales({...sales, growth: +e.target.value})} className={inputClass}/></div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-emerald-900/30 rounded-xl p-6 text-center border border-emerald-500/30"><div className="text-slate-400 text-sm mb-2">Total Profit</div><div className="text-4xl font-bold text-emerald-400">Rp {parseInt(calcProfit()).toLocaleString("id-ID")}</div></div>
                <div className="bg-teal-900/30 rounded-xl p-6 text-center border border-teal-500/30"><div className="text-slate-400 text-sm mb-2">Margin</div><div className="text-4xl font-bold text-teal-400">{calcMargin()}%</div></div>
                <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/30"><div className="text-slate-400 text-sm mb-2">Next Month Target</div><div className="text-4xl font-bold text-purple-400">{(sales.vol * (1 + sales.growth/100)).toFixed(0)}</div></div>
              </div>
            </div>
          );
          case 25: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"🔤"} ABC Analysis</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead><tr className="text-slate-400 border-b border-slate-700"><th className="text-left py-2">Class</th><th className="text-left py-2">Item Name</th><th className="text-right py-2">Value (Rp)</th><th className="text-right py-2">% Value</th><th className="text-right py-2">% Items</th></tr></thead>
                  <tbody>
                    {abc.map((a, i) => <tr key={i} className="border-b border-slate-700/50"><td className={`py-2 font-bold ${a.item === "A" ? "text-red-400" : a.item === "B" ? "text-amber-400" : "text-slate-400"}`}>{a.item}</td><td className="py-2 text-slate-300">{a.name}</td><td className="py-2 text-right text-slate-300">{a.value.toLocaleString("id-ID")}</td><td className="py-2 text-right text-slate-300">{((a.value / calcAbcValue()) * 100).toFixed(1)}%</td><td className="py-2 text-right text-slate-400">{((i+1) / abc.length * 100).toFixed(0)}%</td></tr>)}
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-red-900/30 rounded-xl p-5 text-center border border-red-500/30"><div className="text-slate-400 text-sm mb-2">Class A (60-80%)</div><div className="text-3xl font-bold text-red-400">Rp {(abc[0].value / calcAbcValue() * 100).toFixed(0)}%</div></div>
                <div className="bg-amber-900/30 rounded-xl p-5 text-center border border-amber-500/30"><div className="text-slate-400 text-sm mb-2">Class B (15-25%)</div><div className="text-3xl font-bold text-amber-400">Rp {(abc[1].value / calcAbcValue() * 100).toFixed(0)}%</div></div>
                <div className="bg-slate-700/50 rounded-xl p-5 text-center"><div className="text-slate-400 text-sm mb-2">Class C (5-15%)</div><div className="text-3xl font-bold text-slate-400">Rp {(abc.slice(2).reduce((a,b) => a + b.value, 0) / calcAbcValue() * 100).toFixed(0)}%</div></div>
              </div>
            </div>
          );
          case 27: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"🏷️"} Pricing Strategy</h3>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div><label className={labelClass}>Unit Cost (Rp)</label><input type="number" value={pricing.cost} onChange={(e) => setPricing({...pricing, cost: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Target Margin %</label><input type="number" value={pricing.margin} onChange={(e) => setPricing({...pricing, margin: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Competitor Price</label><input type="number" value={pricing.competitor} onChange={(e) => setPricing({...pricing, competitor: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Suggested</label><div className="text-2xl font-bold text-teal-400 mt-6">Rp {parseInt(calcPricingSuggest()).toLocaleString("id-ID")}</div></div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-slate-700/50 rounded-xl p-5 text-center"><div className="text-slate-400 text-sm mb-2">Min Price (Cost + 10%)</div><div className="text-3xl font-bold text-blue-400">Rp {(pricing.cost * 1.1).toLocaleString("id-ID", {maximumFractionDigits: 0})}</div></div>
                <div className="bg-emerald-900/30 rounded-xl p-5 text-center border border-emerald-500/30"><div className="text-slate-400 text-sm mb-2">Recommended</div><div className="text-4xl font-bold text-emerald-400">Rp {parseInt(calcPricingSuggest()).toLocaleString("id-ID", {maximumFractionDigits: 0})}</div></div>
                <div className={`rounded-xl p-5 text-center border ${pricing.competitor > +calcPricingSuggest() ? "bg-emerald-900/30 border-emerald-500/30" : "bg-red-900/30 border-red-500/30"}`}><div className="text-slate-400 text-sm mb-2">vs Competitor</div><div className={`text-3xl font-bold ${pricing.competitor > +calcPricingSuggest() ? "text-emerald-400" : "text-red-400"}`}>{pricing.competitor > +calcPricingSuggest() ? "+" : ""}{((pricing.competitor / +calcPricingSuggest() - 1) * 100).toFixed(1)}%</div></div>
              </div>
            </div>
          );
        }
        break;
      case "administrasi":
        switch (appId) {
          case 31: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"📈"} ROI Calculator</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div><label className={labelClass}>Investment (Rp)</label><input type="number" value={roi.invest} onChange={(e) => setRoi({...roi, invest: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Annual Return (Rp)</label><input type="number" value={roi.return} onChange={(e) => setRoi({...roi, return: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Years</label><input type="number" value={roi.years} onChange={(e) => setRoi({...roi, years: +e.target.value})} className={inputClass}/></div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-slate-700/50 rounded-xl p-5 text-center"><div className="text-slate-400 text-sm mb-2">Annual ROI</div><div className={`text-4xl font-bold ${+calcRoi() > 0 ? "text-emerald-400" : "text-red-400"}`}>{calcRoi()}%</div></div>
                <div className="bg-emerald-900/30 rounded-xl p-5 text-center border border-emerald-500/30"><div className="text-slate-400 text-sm mb-2">Total Return ({roi.years} th)</div><div className="text-4xl font-bold text-emerald-400">Rp {(roi.return * roi.years).toLocaleString("id-ID")}</div></div>
                <div className="bg-blue-900/30 rounded-xl p-5 text-center border border-blue-500/30"><div className="text-slate-400 text-sm mb-2">Payback Period</div><div className="text-4xl font-bold text-blue-400">{calcROIYears()} th</div></div>
              </div>
            </div>
          );
          case 32: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"⚖️"} Break-even Analysis</h3>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div><label className={labelClass}>Fixed Cost (Rp)</label><input type="number" value={breakeven.fixed} onChange={(e) => setBreakeven({...breakeven, fixed: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Price/Unit (Rp)</label><input type="number" value={breakeven.price} onChange={(e) => setBreakeven({...breakeven, price: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Variable/Unit (Rp)</label><input type="number" value={breakeven.variable} onChange={(e) => setBreakeven({...breakeven, variable: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Current Sales</label><input type="number" value={breakeven.current} onChange={(e) => setBreakeven({...breakeven, current: +e.target.value})} className={inputClass}/></div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/30"><div className="text-slate-400 text-sm mb-2">Break-even Point</div><div className="text-5xl font-bold text-purple-400">{calcBE()} unit</div></div>
                <div className="bg-emerald-900/30 rounded-xl p-6 text-center border border-emerald-500/30"><div className="text-slate-400 text-sm mb-2">BE Value</div><div className="text-4xl font-bold text-emerald-400">Rp {(calcBE() * breakeven.price).toLocaleString("id-ID")}</div></div>
                <div className={`rounded-xl p-6 text-center border ${+calcMarginSafety() > 0 ? "bg-emerald-900/30 border-emerald-500/30" : "bg-red-900/30 border-red-500/30"}`}><div className="text-slate-400 text-sm mb-2">Margin of Safety</div><div className={`text-4xl font-bold ${+calcMarginSafety() > 0 ? "text-emerald-400" : "text-red-400"}`}>{calcMarginSafety()}%</div></div>
              </div>
            </div>
          );
          case 34: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"📊"} KPI Dashboard</h3>
              <div className="grid grid-cols-4 gap-4 mb-6">
                {budget.map((b, i) => <div key={i}><div className="text-xs text-slate-400 mb-2">{b.dept}</div><div className="space-y-1"><div><input type="range" min="0" max={b.allocated * 1.2} value={b.spent} onChange={(e) => { const n = [...budget]; n[i].spent = +e.target.value; setBudget(n); }} className="w-full accent-teal-500"/></div><div className="flex justify-between text-xs"><span className="text-slate-400">Rp {(b.spent/1000000).toFixed(0)}M</span><span className="text-slate-500">/Rp {(b.allocated/1000000).toFixed(0)}M</span></div></div></div>)}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {budget.map((b, i) => <div key={i} className={`rounded-xl p-4 text-center border ${+calcBudgetVar(b.spent, b.allocated) <= 0 ? "bg-emerald-900/30 border-emerald-500/30" : "bg-red-900/30 border-red-500/30"}`}><div className="text-slate-400 text-xs mb-1">{b.dept}</div><div className={`text-2xl font-bold ${+calcBudgetVar(b.spent, b.allocated) <= 0 ? "text-emerald-400" : "text-red-400"}`}>{calcBudgetVar(b.spent, b.allocated)}%</div><div className="text-xs text-slate-500">variance</div></div>)}
              </div>
            </div>
          );
          case 36: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"💵"} Cash Flow Projection</h3>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div><label className={labelClass}>Monthly Income (Rp)</label><input type="number" value={cashflow.income} onChange={(e) => setCashflow({...cashflow, income: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Monthly Expense (Rp)</label><input type="number" value={cashflow.expense} onChange={(e) => setCashflow({...cashflow, expense: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Receivables (Rp)</label><input type="number" value={cashflow.receivables} onChange={(e) => setCashflow({...cashflow, receivables: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Payables (Rp)</label><input type="number" value={cashflow.payables} onChange={(e) => setCashflow({...cashflow, payables: +e.target.value})} className={inputClass}/></div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className={`rounded-xl p-6 text-center border ${calcNetCash() > 0 ? "bg-emerald-900/30 border-emerald-500/30" : "bg-red-900/30 border-red-500/30"}`}><div className="text-slate-400 text-sm mb-2">Net Cashflow</div><div className={`text-4xl font-bold ${calcNetCash() > 0 ? "text-emerald-400" : "text-red-400"}`}>Rp {calcNetCash().toLocaleString("id-ID")}</div></div>
                <div className="bg-blue-900/30 rounded-xl p-6 text-center border border-blue-500/30"><div className="text-slate-400 text-sm mb-2">Working Capital</div><div className="text-4xl font-bold text-blue-400">Rp {calcWorkingCap().toLocaleString("id-ID")}</div></div>
                <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/30"><div className="text-slate-400 text-sm mb-2">Annual Surplus</div><div className="text-4xl font-bold text-purple-400">Rp {(calcNetCash() * 12).toLocaleString("id-ID")}</div></div>
              </div>
            </div>
          );
        }
        break;
      case "k3":
        switch (appId) {
          case 49: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"🛡️"} Safety Score Calculator</h3>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div><label className={labelClass}>Lost Time Incidents</label><input type="number" value={safety.incidents} onChange={(e) => setSafety({...safety, incidents: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Lost Days</label><input type="number" value={safety.lost} onChange={(e) => setSafety({...safety, lost: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Near Miss</label><input type="number" value={safety.nearMiss} onChange={(e) => setSafety({...safety, nearMiss: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Work Hours</label><input type="number" value={safety.hours} onChange={(e) => setSafety({...safety, hours: +e.target.value})} className={inputClass}/></div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className={`rounded-xl p-6 text-center border ${+calcSafetyScore() >= 80 ? "bg-emerald-900/30 border-emerald-500/30" : "bg-red-900/30 border-red-500/30"}`}><div className="text-slate-400 text-sm mb-2">Safety Score</div><div className={`text-6xl font-bold ${+calcSafetyScore() >= 80 ? "text-emerald-400" : "text-red-400"}`}>{calcSafetyScore()}</div></div>
                <div className="bg-slate-700/50 rounded-xl p-6 text-center"><div className="text-slate-400 text-sm mb-2">LTIF</div><div className="text-4xl font-bold text-amber-400">{calcLTIF()}</div></div>
                <div className="bg-blue-900/30 rounded-xl p-6 text-center border border-blue-500/30"><div className="text-slate-400 text-sm mb-2">Days Without Incident</div><div className="text-4xl font-bold text-blue-400">365</div></div>
              </div>
            </div>
          );
          case 50: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"⚠️"} Risk Matrix</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead><tr className="text-slate-400 border-b border-slate-700"><th className="text-left py-2">Hazard</th><th className="text-center py-2">Severity</th><th className="text-center py-2">Probability</th><th className="text-center py-2">Score</th><th className="text-center py-2">Control</th><th className="text-center py-2">Status</th></tr></thead>
                  <tbody>
                    {risk.map((r, i) => <tr key={i} className="border-b border-slate-700/50"><td className="py-2 text-slate-300">{r.hazard}</td><td className="text-center"><input type="number" min="1" max="10" value={r.severity} onChange={(e) => { const n = [...risk]; n[i].severity = +e.target.value; setRisk(n); }} className="w-12 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-center"/></td><td className="text-center"><input type="number" min="1" max="10" value={r.probability} onChange={(e) => { const n = [...risk]; n[i].probability = +e.target.value; setRisk(n); }} className="w-12 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-center"/></td><td className={`text-center font-bold ${r.severity * r.probability < 20 ? "text-emerald-400" : r.severity * r.probability < 40 ? "text-amber-400" : "text-red-400"}`}>{r.severity * r.probability}</td><td className="text-center text-slate-400">{r.control}</td><td className="text-center"><span className={`px-2 py-1 rounded text-xs ${r.status === "Open" ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"}`}>{r.status}</span></td></tr>)}
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-slate-700/50 rounded-xl p-5 text-center"><div className="text-slate-400 text-sm mb-2">{"Low Risk (<20)"}</div><div className="text-3xl font-bold text-emerald-400">{risk.filter(r => r.severity * r.probability < 20).length}</div></div>
                <div className="bg-slate-700/50 rounded-xl p-5 text-center"><div className="text-slate-400 text-sm mb-2">{"Medium (20-39)"}</div><div className="text-3xl font-bold text-amber-400">{risk.filter(r => r.severity * r.probability >= 20 && r.severity * r.probability < 40).length}</div></div>
                <div className="bg-slate-700/50 rounded-xl p-5 text-center"><div className="text-slate-400 text-sm mb-2">{"High Risk (40+)"}</div><div className="text-3xl font-bold text-red-400">{risk.filter(r => r.severity * r.probability >= 40).length}</div></div>
              </div>
            </div>
          );
          case 52: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"🦺"} PPE Compliance</h3>
              <div className="grid grid-cols-5 gap-4 mb-6">
                {[{name: "Helmet", val: ppe.helmet, set: (v: number) => setPpe({...ppe, helmet: v})}, {name: "Gloves", val: ppe.gloves, set: (v: number) => setPpe({...ppe, gloves: v})}, {name: "Goggles", val: ppe.goggles, set: (v: number) => setPpe({...ppe, goggles: v})}, {name: "Safety Shoes", val: ppe.shoes, set: (v: number) => setPpe({...ppe, shoes: v})}, {name: "Safety Vest", val: ppe.vest, set: (v: number) => setPpe({...ppe, vest: v})}].map((p, i) => <div key={i}><label className={labelClass}>{p.name}</label><input type="range" min="0" max="100" value={p.val} onChange={(e) => p.set(+e.target.value)} className="w-full accent-teal-500"/><div className={`text-right font-bold ${p.val >= 95 ? "text-emerald-400" : p.val >= 90 ? "text-amber-400" : "text-red-400"}`}>{p.val}%</div></div>)}
              </div>
              <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 rounded-xl p-6 border border-emerald-500/30 text-center"><div className="text-slate-400 text-sm mb-2">Overall PPE Compliance</div><div className="text-6xl font-bold text-emerald-400">{((ppe.helmet + ppe.gloves + ppe.goggles + ppe.shoes + ppe.vest) / 5).toFixed(0)}%</div><div className="mt-2 text-emerald-400">✓ Compliant</div></div>
            </div>
          );
        }
        break;
      case "ekonomi_sirkular":
        switch (appId) {
          case 57: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"🗑️"} Waste Calculator</h3>
              <div className="grid grid-cols-5 gap-4 mb-6">
                <div><label className={labelClass}>Total Production</label><input type="number" value={waste.total} onChange={(e) => setWaste({...waste, total: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Scrap</label><input type="number" value={waste.scrap} onChange={(e) => setWaste({...waste, scrap: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Recycle</label><input type="number" value={waste.recycle} onChange={(e) => setWaste({...waste, recycle: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Reuse</label><input type="number" value={waste.reuse} onChange={(e) => setWaste({...waste, reuse: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Landfill</label><input type="number" value={waste.landfill} onChange={(e) => setWaste({...waste, landfill: +e.target.value})} className={inputClass}/></div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-red-900/30 rounded-xl p-5 text-center border border-red-500/30"><div className="text-slate-400 text-sm mb-2">Waste Rate</div><div className="text-4xl font-bold text-red-400">{calcWasteRate()}%</div></div>
                <div className="bg-emerald-900/30 rounded-xl p-5 text-center border border-emerald-500/30"><div className="text-slate-400 text-sm mb-2">Recycle Rate</div><div className="text-4xl font-bold text-emerald-400">{calcRecycleRate()}%</div></div>
                <div className="bg-blue-900/30 rounded-xl p-5 text-center border border-blue-500/30"><div className="text-slate-400 text-sm mb-2">Value Recovered</div><div className="text-4xl font-bold text-blue-400">Rp {(waste.recycle * 5000 + waste.reuse * 8000).toLocaleString("id-ID")}</div></div>
                <div className="bg-amber-900/30 rounded-xl p-5 text-center border border-amber-500/30"><div className="text-slate-400 text-sm mb-2">Landfill Cost</div><div className="text-4xl font-bold text-amber-400">Rp {(waste.landfill * 2000).toLocaleString("id-ID")}</div></div>
              </div>
            </div>
          );
          case 58: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"⚡"} Energy Monitor</h3>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div><label className={labelClass}>Electricity (kWh)</label><input type="number" value={energy.electricity} onChange={(e) => setEnergy({...energy, electricity: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Gas (m³)</label><input type="number" value={energy.gas} onChange={(e) => setEnergy({...energy, gas: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Diesel (L)</label><input type="number" value={energy.diesel} onChange={(e) => setEnergy({...energy, diesel: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Total Cost</label><div className="text-2xl font-bold text-amber-400 mt-6">Rp {parseInt(calcEnergyCost().toString()).toLocaleString("id-ID")}</div></div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-blue-900/30 rounded-xl p-5 text-center border border-blue-500/30"><div className="text-slate-400 text-sm mb-2">Electricity Cost</div><div className="text-3xl font-bold text-blue-400">Rp {(energy.electricity * 1500).toLocaleString("id-ID")}</div></div>
                <div className="bg-orange-900/30 rounded-xl p-5 text-center border border-orange-500/30"><div className="text-slate-400 text-sm mb-2">Gas Cost</div><div className="text-3xl font-bold text-orange-400">Rp {(energy.gas * 8000).toLocaleString("id-ID")}</div></div>
                <div className="bg-amber-900/30 rounded-xl p-5 text-center border border-amber-500/30"><div className="text-slate-400 text-sm mb-2">Diesel Cost</div><div className="text-3xl font-bold text-amber-400">Rp {(energy.diesel * 15000).toLocaleString("id-ID")}</div></div>
              </div>
            </div>
          );
          case 59: return (
            <div className={sectionClass}>
              <h3 className="text-xl font-semibold text-slate-50 mb-6">{"🌱"} Carbon Footprint</h3>
              <div className="grid grid-cols-5 gap-4 mb-6">
                <div><label className={labelClass}>Electricity (kWh)</label><input type="number" value={carbon.elec} onChange={(e) => setCarbon({...carbon, elec: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Fuel (L)</label><input type="number" value={carbon.fuel} onChange={(e) => setCarbon({...carbon, fuel: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Material (kg)</label><input type="number" value={carbon.material} onChange={(e) => setCarbon({...carbon, material: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Scope 1</label><input type="number" value={carbon.scope1} onChange={(e) => setCarbon({...carbon, scope1: +e.target.value})} className={inputClass}/></div>
                <div><label className={labelClass}>Scope 2</label><input type="number" value={carbon.scope2} onChange={(e) => setCarbon({...carbon, scope2: +e.target.value})} className={inputClass}/></div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-600/20 to-emerald-800/20 rounded-xl p-6 border border-green-500/30 text-center"><div className="text-slate-400 text-sm mb-2">Total CO2 Emissions (kg)</div><div className="text-6xl font-bold text-green-400">{calcCarbonTotal()}</div></div>
                <div className="bg-slate-700/50 rounded-xl p-6 text-center"><div className="text-slate-400 text-sm mb-2">Emissions by Scope</div><div className="space-y-2 mt-4"><div className="flex justify-between"><span className="text-slate-400">Scope 1 (Direct)</span><span className="text-red-400 font-bold">{carbon.scope1} kg</span></div><div className="flex justify-between"><span className="text-slate-400">Scope 2 (Indirect)</span><span className="text-amber-400 font-bold">{carbon.scope2} kg</span></div><div className="flex justify-between"><span className="text-slate-400">Scope 3 (Value Chain)</span><span className="text-blue-400 font-bold">{(carbon.elec * 0.5 + carbon.fuel * 2.3 + carbon.material * 0.8).toFixed(0)} kg</span></div></div></div>
              </div>
            </div>
          );
        }
        break;
    }
    return null;
  };

  const getAppsForCategory = (cat: AppCategory) => miniAppsByCategory[cat] || [];

  const categoryDocMap: Record<string, string> = {
    "1": "ncr", "2": "wo", "3": "pr", "4": "do", "5": "k3", "6": "audit", "7": "quotation", "8": "pa",
    "9": "sop", "10": "capa", "11": "pm", "12": "apar", "13": "ojt", "14": "skills", "15": "andon",
    "16": "kanban", "17": "vwi", "18": "5s", "19": "supplier", "20": "complaint", "21": "monthly-report",
    "22": "production-plan", "23": "quality-report", "24": "cost-analysis",
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-50 mb-2">⚡ Power Tools & Document Generators</h1>
          <p className="text-slate-400">24 Document Templates & 64+ Mini Apps - Manufacturing Excellence Platform</p>
        </div>

        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          <button onClick={() => setActiveSection("generators")} className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeSection === "generators" ? "bg-teal-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}>📄 Docs (24)</button>
          {(["produksi", "kualitas", "penjualan", "administrasi", "hr", "k3", "ekonomi_sirkular"] as AppCategory[]).map(cat => (
            <button key={cat} onClick={() => { setActiveSection("apps"); setSelectedCategory(cat); setSelectedApp(null); }} className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${activeSection === "apps" && selectedCategory === cat ? "bg-teal-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}>{miniAppsByCategory[cat][0]?.icon} {categoryLabels[cat]} ({getAppsForCategory(cat).length})</button>
          ))}
        </div>

        {activeSection === "generators" && (
          <div className="space-y-6">
            <div className="grid grid-cols-6 gap-3">
              {documentTemplates.map(doc => (
                <button key={doc.id} onClick={() => generateDocument(categoryDocMap[doc.id.toString()] || "ncr")} className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-teal-500/50 transition-all text-center">
                  <span className="text-2xl mb-2 block">{doc.icon}</span>
                  <h3 className="font-semibold text-slate-50 text-xs">{doc.name}</h3>
                  <span className="text-[10px] text-slate-400">{doc.category}</span>
                </button>
              ))}
            </div>
            {generatedDoc && (
              <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                  <h3 className="font-semibold text-slate-50">📋 {generatedDoc.title}</h3>
                  <div className="flex gap-2">
                    <button onClick={exportToPDF} className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm">🖨️ Print/PDF</button>
                    <button onClick={() => navigator.clipboard.writeText(generatedDoc.content)} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm">📋 Copy</button>
                  </div>
                </div>
                <pre className="p-6 text-xs text-slate-300 whitespace-pre font-mono max-h-[500px] overflow-auto leading-relaxed">{generatedDoc.content}</pre>
              </div>
            )}
          </div>
        )}

        {activeSection === "apps" && (
          <div>
            {!selectedApp ? (
              <div>
                <div className="flex items-center gap-2 mb-4"><span className={`w-3 h-3 rounded-full ${categoryColors[selectedCategory]}`}></span><h2 className="text-xl font-semibold text-slate-50">{categoryLabels[selectedCategory]} Mini Apps ({getAppsForCategory(selectedCategory).length})</h2></div>
                <div className="grid grid-cols-5 gap-4">
                  {getAppsForCategory(selectedCategory).map(app => (
                    <button key={app.id} onClick={() => setSelectedApp(app.id)} className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-teal-500/50 transition-all text-center">
                      <span className="text-3xl mb-2 block">{app.icon}</span>
                      <h3 className="font-semibold text-slate-50 text-sm">{app.name}</h3>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <button onClick={() => setSelectedApp(null)} className="mb-4 text-teal-400 hover:text-teal-300 text-sm">← Back to {categoryLabels[selectedCategory]}</button>
                {renderApp(selectedCategory, selectedApp)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
