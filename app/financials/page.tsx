const transactions = [
  { id: 1, property: "12 Oak Street", type: "Rent", amount: 1500, date: "2025-02-01", status: "Paid" },
  { id: 2, property: "7 Pine Road", type: "Rent", amount: 2000, date: "2025-02-01", status: "Paid" },
  { id: 3, property: "45 Maple Avenue", type: "Rent", amount: 4500, date: "2025-02-01", status: "Overdue" },
  { id: 4, property: "12 Oak Street", type: "Maintenance", amount: -350, date: "2025-01-28", status: "Paid" },
  { id: 5, property: "99 Elm Blvd", type: "Repair", amount: -1200, date: "2025-01-20", status: "Paid" },
];

const statusColor: Record<string, string> = {
  Paid: "bg-green-100 text-green-700",
  Overdue: "bg-red-100 text-red-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

export default function FinancialsPage() {
  const totalRent = transactions.filter(t => t.type === "Rent" && t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalCosts = transactions.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Financials</h2>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Rent (Feb)</p>
          <p className="text-2xl font-bold text-green-600 mt-1">${totalRent.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Costs (Jan-Feb)</p>
          <p className="text-2xl font-bold text-red-500 mt-1">${totalCosts.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Net Income</p>
          <p className="text-2xl font-bold text-blue-700 mt-1">${(totalRent - totalCosts).toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-5 py-3 text-left">Property</th>
              <th className="px-5 py-3 text-left">Type</th>
              <th className="px-5 py-3 text-left">Amount</th>
              <th className="px-5 py-3 text-left">Date</th>
              <th className="px-5 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-5 py-4 font-medium">{t.property}</td>
                <td className="px-5 py-4 text-gray-600">{t.type}</td>
                <td className={`px-5 py-4 font-semibold ${t.amount < 0 ? "text-red-500" : "text-green-600"}`}>
                  {t.amount < 0 ? `-$${Math.abs(t.amount)}` : `+$${t.amount}`}
                </td>
                <td className="px-5 py-4 text-gray-600">{t.date}</td>
                <td className="px-5 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[t.status]}`}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
