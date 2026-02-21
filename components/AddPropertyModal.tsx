"use client";
import { useEffect, useRef, useState } from "react";
import type { Property, PropertyStatus } from "@/lib/types";

const STATUS_OPTIONS: PropertyStatus[] = ["Available", "Active", "Occupied", "Vacant", "Maintenance"];

interface Props {
  onClose: () => void;
  onAdded: (p: Property) => void;
}

export default function AddPropertyModal({ onClose, onAdded }: Props) {
  const [form, setForm] = useState({
    address: "",
    type: "",
    status: "Available" as PropertyStatus,
    size: "",
    contact: "",
    listing: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { firstInputRef.current?.focus(); }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.address.trim()) { setError("Address is required."); return; }
    if (!form.type.trim()) { setError("Property type is required."); return; }
    if (!form.contact.trim()) { setError("Contact phone is required."); return; }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Failed to add property.");
        return;
      }
      const newProperty: Property = await res.json();
      onAdded(newProperty);
      onClose();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Add Property</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Address *</label>
            <input
              ref={firstInputRef}
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="123 Main St, City, TX"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Property Type *</label>
            <input
              value={form.type}
              onChange={(e) => set("type", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Retail – Commercial"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Status *</label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              >
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Size</label>
              <input
                value={form.size}
                onChange={(e) => set("size", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="5,000 sqft"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Contact Phone *</label>
            <input
              value={form.contact}
              onChange={(e) => set("contact", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="469-400-4190"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Listing URL</label>
            <input
              value={form.listing}
              onChange={(e) => set("listing", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="https://loopnet.com/..."
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Image URL</label>
            <input
              value={form.image}
              onChange={(e) => set("image", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Leave blank for default image"
            />
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
