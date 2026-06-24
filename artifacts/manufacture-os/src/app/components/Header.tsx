"use client";

import { useState, useRef, useEffect } from "react";

export function Header() {
  const [factory] = useState("PT Nusantara Komponen - Plant 1");
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { id: 1, type: "alert", title: "Material Shortage", message: "Line 2 membutuhkan material - 15 min delay", time: "10 min ago", read: false },
    { id: 2, type: "warning", title: "PPE Compliance", message: "Area Welding: 85% compliance - di bawah target 95%", time: "25 min ago", read: false },
    { id: 3, type: "info", title: "NCR Created", message: "NCR-003 auto-generated untuk defect di Line 1", time: "1 hour ago", read: true },
    { id: 4, type: "success", title: "Audit Ready", message: "ISO 45001 checklist mencapai 90% completion", time: "2 hours ago", read: true },
    { id: 5, type: "info", title: "Shift Change", message: "Shift A akan berakhir dalam 30 menit", time: "3 hours ago", read: true },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="fixed top-0 left-[280px] right-0 h-16 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700 z-40 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-700/50 rounded-lg px-3 py-2">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <select className="bg-transparent text-sm text-slate-200 focus:outline-none">
            <option>{factory}</option>
            <option>PT Nusantara Komponen - Plant 2</option>
            <option>PT Sumber Rejeki Abadi</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div ref={dropdownRef} className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="p-4 border-b border-slate-700">
                <h3 className="font-semibold text-slate-50">Notifications</h3>
                <p className="text-xs text-slate-400">{unreadCount} unread</p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={`p-4 border-b border-slate-700/50 hover:bg-slate-700/30 cursor-pointer ${!notif.read ? 'bg-slate-700/20' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notif.type === "alert" ? "bg-red-500" :
                        notif.type === "warning" ? "bg-amber-500" :
                        notif.type === "success" ? "bg-emerald-500" : "bg-blue-500"
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-50">{notif.title}</p>
                        <p className="text-xs text-slate-400 mt-1">{notif.message}</p>
                        <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-slate-700">
                <button className="w-full text-center text-sm text-teal-400 hover:text-teal-300">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-200">Ahmad Susanto</p>
            <p className="text-xs text-slate-400">Production Manager</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white font-semibold">
            AS
          </div>
        </div>
      </div>
    </header>
  );
}
