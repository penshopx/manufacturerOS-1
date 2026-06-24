"use client";

import { useState } from "react";

const apiDocs = {
  intro: {
    title: "ManufactureOS API Documentation",
    description: "API ini memungkinkan integrasi sistem ManufactureOS dengan aplikasi eksternal Anda. Semua endpoint menggunakan RESTful conventions dan JSON format.",
    baseUrl: "https://api.manufactureos.id/v1",
    authentication: "API Key via Header: X-API-Key"
  },
  endpoints: [
    {
      category: "Authentication",
      items: [
        {
          method: "POST",
          path: "/auth/login",
          description: "Authenticate user and get access token",
          params: [
            { name: "email", type: "string", required: true, desc: "User email" },
            { name: "password", type: "string", required: true, desc: "User password" }
          ],
          response: {
            access_token: "string",
            refresh_token: "string",
            expires_in: 3600
          }
        },
        {
          method: "POST",
          path: "/auth/refresh",
          description: "Refresh access token",
          params: [
            { name: "refresh_token", type: "string", required: true, desc: "Valid refresh token" }
          ],
          response: {
            access_token: "string",
            expires_in: 3600
          }
        }
      ]
    },
    {
      category: "Production",
      items: [
        {
          method: "GET",
          path: "/production/lines",
          description: "Get all production lines status",
          params: [],
          response: {
            lines: [
              { id: "string", name: "string", status: "running|idle|maintenance", oee: "number" }
            ]
          }
        },
        {
          method: "GET",
          path: "/production/oee",
          description: "Get OEE metrics",
          params: [
            { name: "line_id", type: "string", required: false, desc: "Filter by line" },
            { name: "date_from", type: "date", required: false, desc: "Start date" },
            { name: "date_to", type: "date", required: false, desc: "End date" }
          ],
          response: {
            availability: "number",
            performance: "number",
            quality: "number",
            oee: "number"
          }
        },
        {
          method: "GET",
          path: "/production/output",
          description: "Get production output data",
          params: [
            { name: "line_id", type: "string", required: false },
            { name: "shift", type: "string", required: false },
            { name: "date", type: "date", required: false }
          ],
          response: {
            target: "number",
            actual: "number",
            achievement: "number"
          }
        }
      ]
    },
    {
      category: "Quality",
      items: [
        {
          method: "GET",
          path: "/quality/defects",
          description: "Get defect data",
          params: [
            { name: "line_id", type: "string", required: false },
            { name: "date_from", type: "date", required: false },
            { name: "date_to", type: "date", required: false }
          ],
          response: {
            total_defects: "number",
            defect_rate: "number",
            top_defects: [{ type: "string", count: "number" }]
          }
        },
        {
          method: "GET",
          path: "/quality/ncr",
          description: "Get NCR list",
          params: [
            { name: "status", type: "string", required: false, desc: "open|closed|all" }
          ],
          response: {
            ncrs: [
              { id: "string", status: "string", line: "string", created_at: "datetime" }
            ]
          }
        }
      ]
    },
    {
      category: "Maintenance",
      items: [
        {
          method: "GET",
          path: "/maintenance/work-orders",
          description: "Get work orders",
          params: [
            { name: "status", type: "string", required: false },
            { name: "priority", type: "string", required: false }
          ],
          response: {
            work_orders: [
              { id: "string", title: "string", status: "string", priority: "string" }
            ]
          }
        },
        {
          method: "POST",
          path: "/maintenance/work-orders",
          description: "Create new work order",
          params: [
            { name: "title", type: "string", required: true },
            { name: "description", type: "string", required: true },
            { name: "machine_id", type: "string", required: true },
            { name: "priority", type: "string", required: true, desc: "low|medium|high|critical" }
          ],
          response: {
            id: "string",
            status: "created"
          }
        }
      ]
    },
    {
      category: "Inventory",
      items: [
        {
          method: "GET",
          path: "/inventory/stock",
          description: "Get inventory stock levels",
          params: [
            { name: "warehouse_id", type: "string", required: false }
          ],
          response: {
            items: [
              { sku: "string", name: "string", quantity: "number", uom: "string" }
            ]
          }
        }
      ]
    },
    {
      category: "Dashboard",
      items: [
        {
          method: "GET",
          path: "/dashboard/kpi-summary",
          description: "Get KPI summary for dashboard",
          params: [],
          response: {
            production: { target: "number", actual: "number", achievement: "number" },
            quality: { defect_rate: "number", sqam_grade: "string" },
            delivery: { otif: "number", backlog: "number" },
            safety: { incident_count: "number", score: "number" }
          }
        },
        {
          method: "GET",
          path: "/dashboard/alerts",
          description: "Get active alerts",
          params: [],
          response: {
            alerts: [
              { id: "string", type: "string", message: "string", severity: "string", created_at: "datetime" }
            ]
          }
        }
      ]
    },
    {
      category: "AI Agents",
      items: [
        {
          method: "POST",
          path: "/ai/query",
          description: "Query AI Agent",
          params: [
            { name: "query", type: "string", required: true, desc: "Natural language query" },
            { name: "agent", type: "string", required: false, desc: "Specific agent or 'orchestrator'" }
          ],
          response: {
            answer: "string",
            sources: ["string"],
            confidence: "number"
          }
        }
      ]
    }
  ],
  errors: [
    { code: 400, message: "Bad Request - Invalid parameters" },
    { code: 401, message: "Unauthorized - Invalid or missing API key" },
    { code: 403, message: "Forbidden - Insufficient permissions" },
    { code: 404, message: "Not Found - Resource not found" },
    { code: 429, message: "Too Many Requests - Rate limit exceeded" },
    { code: 500, message: "Internal Server Error" }
  ],
  rateLimit: {
    requests: 1000,
    period: "per hour",
    note: "Contact sales for higher limits"
  }
};

export default function APIDocsPage() {
  const [activeCategory, setActiveCategory] = useState("Authentication");
  const [expandedEndpoint, setExpandedEndpoint] = useState<number | null>(null);

  const categories = apiDocs.endpoints.map(cat => cat.category);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold mb-2">{apiDocs.intro.title}</h1>
          <p className="text-slate-400">{apiDocs.intro.description}</p>
        </div>
      </div>

      {/* Sidebar */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 sticky top-8">
              <h3 className="font-semibold mb-4 text-slate-400 uppercase text-sm">Base URL</h3>
              <code className="block bg-slate-950 px-3 py-2 rounded text-teal-400 text-sm mb-4">
                {apiDocs.intro.baseUrl}
              </code>
              
              <h3 className="font-semibold mb-4 text-slate-400 uppercase text-sm">Authentication</h3>
              <code className="block bg-slate-950 px-3 py-2 rounded text-amber-400 text-sm mb-4">
                X-API-Key: your-api-key
              </code>
              
              <h3 className="font-semibold mb-4 text-slate-400 uppercase text-sm">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeCategory === cat
                        ? "bg-teal-600 text-white"
                        : "text-slate-400 hover:bg-slate-800"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6">
            {apiDocs.endpoints
              .filter(cat => cat.category === activeCategory)
              .map((category, idx) => (
                <div key={idx} className="space-y-4">
                  {category.items.map((endpoint, eidx) => (
                    <div key={eidx} className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                      <button
                        onClick={() => setExpandedEndpoint(expandedEndpoint === eidx ? null : eidx)}
                        className="w-full p-4 flex items-center gap-4 hover:bg-slate-800/50 transition-colors"
                      >
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          endpoint.method === "GET" ? "bg-green-500/20 text-green-400" :
                          endpoint.method === "POST" ? "bg-blue-500/20 text-blue-400" :
                          endpoint.method === "PUT" ? "bg-amber-500/20 text-amber-400" :
                          "bg-red-500/20 text-red-400"
                        }`}>
                          {endpoint.method}
                        </span>
                        <code className="text-slate-300 flex-1 text-left">{endpoint.path}</code>
                        <svg
                          className={`w-5 h-5 text-slate-400 transition-transform ${
                            expandedEndpoint === eidx ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {expandedEndpoint === eidx && (
                        <div className="px-4 pb-4 border-t border-slate-800">
                          <p className="text-slate-400 text-sm py-3">{endpoint.description}</p>
                          
                          {endpoint.params.length > 0 && (
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-slate-300 mb-2">Parameters</h4>
                              <div className="bg-slate-950 rounded-lg overflow-hidden">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b border-slate-800">
                                      <th className="text-left p-2 text-slate-400">Name</th>
                                      <th className="text-left p-2 text-slate-400">Type</th>
                                      <th className="text-left p-2 text-slate-400">Required</th>
                                      <th className="text-left p-2 text-slate-400">Description</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {endpoint.params.map((param, pidx) => (
                                      <tr key={pidx} className="border-b border-slate-800">
                                        <td className="p-2 text-teal-400 font-mono">{param.name}</td>
                                        <td className="p-2 text-slate-500">{param.type}</td>
                                        <td className="p-2">
                                          {param.required ? (
                                            <span className="text-red-400">Yes</span>
                                          ) : (
                                            <span className="text-slate-500">No</span>
                                          )}
                                        </td>
                                        <td className="p-2 text-slate-400">{"desc" in param ? param.desc : "-"}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                          
                          <div>
                            <h4 className="text-sm font-semibold text-slate-300 mb-2">Response</h4>
                            <pre className="bg-slate-950 p-3 rounded-lg text-xs text-slate-300 overflow-x-auto">
{JSON.stringify(endpoint.response, null, 2)}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}

            {/* Error Codes */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <h3 className="text-lg font-bold mb-4">Error Codes</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {apiDocs.errors.map((error, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-mono">{error.code}</span>
                    <span className="text-slate-400 text-sm">{error.message}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rate Limit */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <h3 className="text-lg font-bold mb-4">Rate Limits</h3>
              <p className="text-slate-400">
                {apiDocs.rateLimit.requests} requests {apiDocs.rateLimit.period}. 
                <span className="text-amber-400"> {apiDocs.rateLimit.note}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
