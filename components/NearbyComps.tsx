"use client";
import { useState } from "react";

type Comp = {
  address: string;
  type: string;
  salePrice: string;
  pricePerSqft: string;
  sqft: string;
  soldDate: string;
  distance: string;
  similarity: "High" | "Medium" | "Low";
};

const similarityStyle: Record<string, string> = {
  High: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-gray-100 text-gray-500",
};

export default function NearbyComps({
  address,
  type,
  size,
}: {
  address: string;
  type: string;
  size: string;
}) {
  const [open, setOpen] = useState(false);
  const [comps, setComps] = useState<Comp[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadComps() {
    if (comps) { setOpen((o) => !o); return; }
    setOpen(true);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/comps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, type, size }),
      });
      const data = await res.json();
      if (data.comps) setComps(data.comps);
      else setError("Could not load comps.");
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="pt-3 border-t mt-1">
      <button
        onClick={loadComps}
        className="flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
      >
        <span>📊</span>
        {open ? "Hide Nearby Comps" : "View Nearby Comps"}
        <span className="ml-auto text-gray-400">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="mt-3">
          {loading && (
            <div className="flex items-center gap-2 py-3 text-xs text-gray-400">
              <span className="inline-block w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              Generating comps with AI...
            </div>
          )}

          {error && <p className="text-xs text-red-500 py-2">{error}</p>}

          {comps && (
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-xs mt-1">
                <thead>
                  <tr className="text-gray-400 uppercase border-b">
                    <th className="text-left py-1.5 px-1 font-medium">Address</th>
                    <th className="text-right py-1.5 px-1 font-medium">Price</th>
                    <th className="text-right py-1.5 px-1 font-medium hidden sm:table-cell">$/sqft</th>
                    <th className="text-right py-1.5 px-1 font-medium hidden sm:table-cell">Sold</th>
                    <th className="text-right py-1.5 px-1 font-medium">Dist.</th>
                    <th className="text-right py-1.5 px-1 font-medium">Match</th>
                  </tr>
                </thead>
                <tbody>
                  {comps.map((c, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-2 px-1 max-w-[120px]">
                        <p className="truncate font-medium text-gray-700">{c.address}</p>
                        <p className="text-gray-400 truncate">{c.type}</p>
                      </td>
                      <td className="py-2 px-1 text-right font-semibold text-gray-800 whitespace-nowrap">{c.salePrice}</td>
                      <td className="py-2 px-1 text-right text-gray-500 hidden sm:table-cell whitespace-nowrap">{c.pricePerSqft}</td>
                      <td className="py-2 px-1 text-right text-gray-500 hidden sm:table-cell whitespace-nowrap">{c.soldDate}</td>
                      <td className="py-2 px-1 text-right text-gray-500 whitespace-nowrap">{c.distance}</td>
                      <td className="py-2 px-1 text-right">
                        <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${similarityStyle[c.similarity] ?? similarityStyle.Low}`}>
                          {c.similarity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-gray-300 mt-2 text-right">AI-generated estimates · Not MLS data</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
