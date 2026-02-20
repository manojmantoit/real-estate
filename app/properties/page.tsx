"use client";
import Image from "next/image";
import { properties } from "@/lib/data";
import WorkflowStepper from "@/components/WorkflowStepper";

const statusColor: Record<string, string> = {
  Available: "bg-blue-100 text-blue-700",
  Active: "bg-green-100 text-green-700",
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {properties.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="relative h-44 w-full bg-gray-100">
              <Image
                src={p.image}
                alt={p.address}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="p-5 flex flex-col gap-2 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-sm">{p.address}</p>
                <span className={`shrink-0 px-2 py-1 rounded-full text-xs font-medium ${statusColor[p.status]}`}>
                  {p.status}
                </span>
              </div>
              <p className="text-xs text-gray-500">{p.type}</p>
              {p.size !== "N/A" && <p className="text-xs text-gray-500">Size: {p.size}</p>}
              <div className="flex items-center gap-4 pt-3 border-t">
                <a href={`tel:${p.contact}`} className="text-xs text-gray-500 hover:text-blue-600">
                  📞 {p.contact}
                </a>
                {p.listing && (
                  <a
                    href={p.listing}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline ml-auto"
                  >
                    View Listing →
                  </a>
                )}
              </div>
              <WorkflowStepper propertyId={p.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
