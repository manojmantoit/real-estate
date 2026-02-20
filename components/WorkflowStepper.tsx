"use client";
import { useEffect, useState } from "react";

const STAGES = [
  "Listing LOI Creation",
  "Offer Contract Accepted",
  "Due Diligence in Progress",
  "Title and Closing",
];

export default function WorkflowStepper({ propertyId }: { propertyId: number }) {
  const [stage, setStage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/workflow?id=${propertyId}`)
      .then((r) => r.json())
      .then((d) => setStage(d.stage));
  }, [propertyId]);

  async function changeStage(newStage: string) {
    setSaving(true);
    const res = await fetch("/api/workflow", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ propertyId, stage: newStage }),
    });
    if (res.ok) {
      const data = await res.json();
      setStage(data.stage);
    }
    setSaving(false);
  }

  const currentIndex = stage ? STAGES.indexOf(stage) : 0;

  return (
    <div className="pt-3 border-t mt-2">
      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Transaction Workflow</p>

      {/* Stepper */}
      <div className="flex items-center gap-0 mb-3">
        {STAGES.map((s, i) => {
          const completed = i < currentIndex;
          const active = i === currentIndex;
          return (
            <div key={s} className="flex items-center flex-1 min-w-0">
              <div className="flex flex-col items-center flex-1 min-w-0">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0 ${
                    completed
                      ? "bg-blue-600 border-blue-600 text-white"
                      : active
                      ? "border-blue-600 text-blue-600 bg-white"
                      : "border-gray-300 text-gray-300 bg-white"
                  }`}
                >
                  {completed ? "✓" : i + 1}
                </div>
                <p
                  className={`text-center mt-1 leading-tight hidden sm:block ${
                    active ? "text-blue-600 font-semibold" : completed ? "text-gray-500" : "text-gray-300"
                  }`}
                  style={{ fontSize: "9px" }}
                >
                  {s}
                </p>
              </div>
              {i < STAGES.length - 1 && (
                <div className={`h-0.5 flex-1 mx-0.5 mb-3 ${i < currentIndex ? "bg-blue-600" : "bg-gray-200"}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Current stage label (mobile) */}
      <p className="text-xs text-blue-600 font-medium sm:hidden mb-2">{stage}</p>

      {/* Dropdown */}
      <select
        value={stage ?? ""}
        onChange={(e) => changeStage(e.target.value)}
        disabled={saving}
        className="w-full border rounded-lg px-2 py-1.5 text-xs text-gray-700 outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
      >
        {STAGES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}
