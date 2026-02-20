import { properties } from "@/lib/data";

const statusColor: Record<string, string> = {
  Occupied: "bg-green-100 text-green-700",
  Vacant: "bg-gray-100 text-gray-600",
  Maintenance: "bg-yellow-100 text-yellow-700",
};

export default function PropertiesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Properties</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
          + Add Property
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-5 py-3 text-left">Address</th>
              <th className="px-5 py-3 text-left">Type</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-5 py-4 font-medium">{p.address}</td>
                <td className="px-5 py-4 text-gray-600">{p.type}</td>
                <td className="px-5 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[p.status]}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button className="text-blue-600 hover:underline text-xs">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
