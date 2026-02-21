"use client";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import type { Property, Lead } from "@/lib/types";
import AddPropertyModal from "./AddPropertyModal";
import AddLeadModal from "./AddLeadModal";

const leadTypeBadge: Record<string, string> = {
  buyer: "bg-blue-100 text-blue-700",
  seller: "bg-purple-100 text-purple-700",
  tenant: "bg-green-100 text-green-700",
};

const leadStatusBadge: Record<string, string> = {
  New: "bg-gray-100 text-gray-600",
  Contacted: "bg-blue-100 text-blue-600",
  Qualified: "bg-yellow-100 text-yellow-700",
  "Proposal Sent": "bg-orange-100 text-orange-700",
  Closed: "bg-green-100 text-green-700",
};

export default function AgentDashboard() {
  const user = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [showAddLead, setShowAddLead] = useState(false);

  useEffect(() => {
    fetch("/api/properties").then((r) => r.json()).then(setProperties);
    fetch("/api/leads").then((r) => r.json()).then(setLeads);
  }, []);

  const agentProperties = properties.filter((p) => p.addedBy === user?.username);
  const activeLeads = leads.filter((l) => l.status !== "Closed");
  const closedLeads = leads.filter((l) => l.status === "Closed");
  const thisMonth = new Date().toISOString().slice(0, 7);
  const leadsThisMonth = leads.filter((l) => l.createdAt.startsWith(thisMonth));
  const recentLeads = [...leads].sort((a, b) => b.id - a.id).slice(0, 5);

  const agentStats = [
    { label: "Properties Added", value: String(agentProperties.length) },
    { label: "Active Leads", value: String(activeLeads.length) },
    { label: "Leads Closed", value: String(closedLeads.length) },
    { label: "Leads This Month", value: String(leadsThisMonth.length) },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Agent Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {agentStats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setShowAddProperty(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          + Add Property
        </button>
        <button
          onClick={() => setShowAddLead(true)}
          className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-50"
        >
          + Add Lead
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-3">Recent Leads</h3>
      {recentLeads.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400 text-sm">
          No leads yet. Click &quot;+ Add Lead&quot; to create your first lead.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-left">Type</th>
                <th className="px-5 py-3 text-left">Property</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Added</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium">{lead.name}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${leadTypeBadge[lead.leadType]}`}>
                      {lead.leadType}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600 max-w-[160px] truncate">{lead.interestedProperty}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${leadStatusBadge[lead.status]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-xs">{lead.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAddProperty && (
        <AddPropertyModal
          onClose={() => setShowAddProperty(false)}
          onAdded={(p) => setProperties((prev) => [...prev, p])}
        />
      )}
      {showAddLead && (
        <AddLeadModal
          onClose={() => setShowAddLead(false)}
          onAdded={(l) => setLeads((prev) => [...prev, l])}
        />
      )}
    </div>
  );
}
