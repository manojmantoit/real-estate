import { leases } from "@/lib/data";

function daysUntil(dateStr: string) {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function LeasesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Leases</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
          + Add Lease
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-5 py-3 text-left">Property</th>
              <th className="px-5 py-3 text-left">Tenant</th>
              <th className="px-5 py-3 text-left">Start</th>
              <th className="px-5 py-3 text-left">End</th>
              <th className="px-5 py-3 text-left">Rent</th>
              <th className="px-5 py-3 text-left">Expires In</th>
            </tr>
          </thead>
          <tbody>
            {leases.map((l) => {
              const days = daysUntil(l.end);
              return (
                <tr key={l.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium">{l.property}</td>
                  <td className="px-5 py-4 text-gray-600">{l.tenant}</td>
                  <td className="px-5 py-4 text-gray-600">{l.start}</td>
                  <td className="px-5 py-4 text-gray-600">{l.end}</td>
                  <td className="px-5 py-4">{l.rent}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold ${days < 30 ? "text-red-600" : "text-green-600"}`}>
                      {days > 0 ? `${days} days` : "Expired"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
