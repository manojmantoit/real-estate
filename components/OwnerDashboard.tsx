"use client";
import { alerts, stats } from "@/lib/data";

export default function OwnerDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-3">Alerts</h3>
      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 p-4 rounded-lg border ${
              alert.type === "danger"
                ? "bg-red-50 border-red-200"
                : alert.type === "warning"
                ? "bg-yellow-50 border-yellow-200"
                : "bg-blue-50 border-blue-200"
            }`}
          >
            <span className="text-xl">{alert.icon}</span>
            <p className="text-sm">{alert.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
