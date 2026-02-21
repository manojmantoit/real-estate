"use client";
import { useEffect, useState } from "react";
import type { Lead, LeadStatus } from "@/lib/types";
import AddLeadModal from "@/components/AddLeadModal";

const LEAD_STATUSES: LeadStatus[] = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];

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

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/leads").then((r) => r.json()).then(setLeads);
  }, []);

  async function updateStatus(id: number, status: LeadStatus) {
    setUpdatingId(id);
    const res = await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      const updated: Lead = await res.json();
      setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    }
    setUpdatingId(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Leads</h2>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          + Add Lead
        </button>
      </div>

      {leads.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-400 text-sm">
          No leads yet. Click &quot;+ Add Lead&quot; to create your first lead.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-left">Contact</th>
                <th className="px-5 py-3 text-left">Type</th>
                <th className="px-5 py-3 text-left">Property</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Added</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <p className="font-medium">{lead.name}</p>
                    {lead.notes && (
                      <p className="text-xs text-gray-400 mt-0.5 max-w-[200px] truncate">{lead.notes}</p>
                    )}
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    <p className="text-xs">{lead.email}</p>
                    <p className="text-xs">{lead.phone}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${leadTypeBadge[lead.leadType]}`}>
                      {lead.leadType}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600 max-w-[160px] truncate">{lead.interestedProperty}</td>
                  <td className="px-5 py-4">
                    <select
                      value={lead.status}
                      disabled={updatingId === lead.id}
                      onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                      className={`border rounded-lg px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 ${leadStatusBadge[lead.status]}`}
                    >
                      {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-500">
                    <p>{lead.createdAt}</p>
                    <p className="text-gray-400">{lead.createdBy}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAdd && (
        <AddLeadModal
          onClose={() => setShowAdd(false)}
          onAdded={(l) => setLeads((prev) => [...prev, l])}
        />
      )}
    </div>
  );
}
