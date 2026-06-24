export default function K3Page() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">K3 (Keselamatan & Kesehatan Kerja)</h1>
          <p className="text-slate-400">Monitoring keselamatan dan kesehatan kerja</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm font-medium text-white transition-colors">
            Laporkan Insiden
          </button>
          <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium text-white transition-colors">
            Identifikasi Bahaya
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SafetyScoreCard />
        <IncidentCard />
        <HazardCard />
        <PPECard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IncidentLog />
        <HazardReports />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PPEComplianceCheck />
        <EmergencyDrills />
      </div>

      <SafetyMeetingSchedule />
    </div>
  );
}

function SafetyScoreCard() {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <p className="text-sm text-slate-400 mb-2">Safety Score</p>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-4xl font-bold text-emerald-400">87</span>
        <span className="text-slate-400">/ 100</span>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{ width: "87%" }}></div>
      </div>
      <p className="text-xs text-slate-400 mt-2">Bulan ini: +3 dari bulan lalu</p>
    </div>
  );
}

function IncidentCard() {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <p className="text-sm text-slate-400 mb-2">Insiden (30 hari)</p>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-4xl font-bold text-slate-50">0</span>
        <span className="text-slate-400">kasus</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        <span className="text-xs text-emerald-400">Zero Accident Achievement!</span>
      </div>
    </div>
  );
}

function HazardCard() {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <p className="text-sm text-slate-400 mb-2">Hazard Reports</p>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-4xl font-bold text-amber-400">3</span>
        <span className="text-slate-400">open</span>
      </div>
      <p className="text-xs text-slate-400 mt-2">2 sudah resolved bulan ini</p>
    </div>
  );
}

function PPECard() {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <p className="text-sm text-slate-400 mb-2">PPE Compliance</p>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-4xl font-bold text-amber-400">85</span>
        <span className="text-slate-400">%</span>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full bg-amber-500 rounded-full" style={{ width: "85%" }}></div>
      </div>
      <p className="text-xs text-amber-400 mt-2">Target: 95%</p>
    </div>
  );
}

function IncidentLog() {
  const incidents = [
    { id: "INC-001", date: "17 Mar 2026", type: "Near Miss", location: "Line 2 Assembly", status: "Investigation", severity: "Low" },
    { id: "INC-002", date: "15 Mar 2026", type: "First Aid", location: "Line 1 Stamping", status: "Closed", severity: "Low" },
    { id: "INC-003", date: "10 Mar 2026", type: "Near Miss", location: "Welding Area", status: "Closed", severity: "Medium" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Log Insiden</h3>
        <button className="text-sm text-teal-400 hover:text-teal-300">Lihat Semua →</button>
      </div>
      <div className="space-y-3">
        {incidents.map((incident) => (
          <div key={incident.id} className="p-3 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-slate-50">{incident.type}</span>
              <span className={`px-2 py-0.5 rounded text-xs ${
                incident.severity === "Low" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
              }`}>
                {incident.severity}
              </span>
            </div>
            <div className="flex justify-between text-sm text-slate-400">
              <span>{incident.location}</span>
              <span>{incident.date}</span>
            </div>
            <div className="mt-2">
              <span className={`px-2 py-0.5 rounded text-xs ${
                incident.status === "Closed" ? "bg-slate-600 text-slate-300" : "bg-blue-500/20 text-blue-400"
              }`}>
                {incident.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HazardReports() {
  const hazards = [
    { id: "HZ-001", description: "Kabel tidak teratur di area kerja", location: "Line 3 Welding", risk: "Tinggi", status: "Open", reported: "16 Mar" },
    { id: "HZ-002", description: "Pintu darurat terblokir", location: "Area Finishing", risk: "Sedang", status: "In Progress", reported: "15 Mar" },
    { id: "HZ-003", description: "Suhu kerja terlalu tinggi", location: "Line 4 Heat Treatment", risk: "Sedang", status: "Open", reported: "14 Mar" },
  ];

  const riskColors: Record<string, string> = {
    Tinggi: "bg-red-500/20 text-red-400",
    Sedang: "bg-amber-500/20 text-amber-400",
    Rendah: "bg-emerald-500/20 text-emerald-400",
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Hazard Reports</h3>
        <button className="text-sm text-teal-400 hover:text-teal-300">Lihat Semua →</button>
      </div>
      <div className="space-y-3">
        {hazards.map((hazard) => (
          <div key={hazard.id} className="p-3 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-slate-400">{hazard.id}</span>
              <span className={`px-2 py-0.5 rounded text-xs ${riskColors[hazard.risk]}`}>
                {hazard.risk}
              </span>
            </div>
            <p className="text-sm text-slate-300 mb-2">{hazard.description}</p>
            <div className="flex justify-between text-xs text-slate-400">
              <span>{hazard.location}</span>
              <span>{hazard.reported}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PPEComplianceCheck() {
  const checks = [
    { item: "Safety Helmet", area: "All Areas", compliance: 95, status: "OK" },
    { item: "Safety Glasses", area: "Welding, Grinding", compliance: 88, status: "Warning" },
    { item: "Ear Protection", area: "Noise Area >85dB", compliance: 92, status: "OK" },
    { item: "Safety Gloves", area: "All Areas", compliance: 85, status: "Warning" },
    { item: "Safety Shoes", area: "All Areas", compliance: 98, status: "OK" },
    { item: "Face Shield", area: "Welding Area", compliance: 78, status: "Alert" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">PPE Compliance Check</h3>
        <button className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-300 transition-colors">
          Start Check
        </button>
      </div>
      <div className="space-y-3">
        {checks.map((check, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div>
              <p className="text-sm font-medium text-slate-50">{check.item}</p>
              <p className="text-xs text-slate-400">{check.area}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 h-2 bg-slate-600 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    check.compliance >= 90 ? "bg-emerald-500" : check.compliance >= 80 ? "bg-amber-500" : "bg-red-500"
                  }`}
                  style={{ width: `${check.compliance}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-slate-300 w-8">{check.compliance}%</span>
              <span className={`px-2 py-0.5 rounded text-xs ${
                check.status === "OK" ? "bg-emerald-500/20 text-emerald-400" :
                check.status === "Warning" ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"
              }`}>
                {check.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmergencyDrills() {
  const drills = [
    { type: "Fire Evacuation", lastDone: "15 Feb 2026", nextDue: "15 May 2026", status: "On Schedule" },
    { type: "Earthquake", lastDone: "20 Jan 2026", nextDue: "20 Apr 2026", status: "On Schedule" },
    { type: "Chemical Spill", lastDone: "10 Mar 2026", nextDue: "10 Jun 2026", status: "Just Completed" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-50">Emergency Drills</h3>
        <button className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm text-white transition-colors">
          Jadwalkan Drill
        </button>
      </div>
      <div className="space-y-3">
        {drills.map((drill, idx) => (
          <div key={idx} className="p-3 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-slate-50">{drill.type}</span>
              <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/20 text-emerald-400">
                {drill.status}
              </span>
            </div>
            <div className="flex justify-between text-sm text-slate-400">
              <span>Last: {drill.lastDone}</span>
              <span>Next: {drill.nextDue}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SafetyMeetingSchedule() {
  const meetings = [
    { title: "Toolbox Meeting - Shift A", date: "17 Mar 2026", time: "06:00", area: "Production Floor", attendees: 25 },
    { title: "K3 Monthly Review", date: "20 Mar 2026", time: "10:00", area: "Meeting Room 1", attendees: 12 },
    { title: "PPE Refresher Training", date: "25 Mar 2026", time: "14:00", area: "Training Room", attendees: 30 },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-50">Jadwal Pertemuan K3</h3>
          <p className="text-sm text-slate-400">Meeting dan training terjadwal</p>
        </div>
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium text-white transition-colors">
          Tambah Jadwal
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-2 font-medium">Agenda</th>
              <th className="pb-2 font-medium">Tanggal</th>
              <th className="pb-2 font-medium">Waktu</th>
              <th className="pb-2 font-medium">Lokasi</th>
              <th className="pb-2 font-medium">Peserta</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {meetings.map((meeting, idx) => (
              <tr key={idx} className="border-b border-slate-700/50">
                <td className="py-3 font-medium text-slate-50">{meeting.title}</td>
                <td className="py-3">{meeting.date}</td>
                <td className="py-3">{meeting.time}</td>
                <td className="py-3">{meeting.area}</td>
                <td className="py-3">{meeting.attendees} orang</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
