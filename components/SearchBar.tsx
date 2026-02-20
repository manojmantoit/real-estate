"use client";
import { useEffect, useState } from "react";
import SearchModal from "./SearchModal";

export default function SearchBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 w-full mx-3 my-2 px-3 py-2 text-sm text-gray-400 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-300 hover:text-gray-600 transition-colors"
      >
        <span>🔍</span>
        <span className="flex-1 text-left">Search...</span>
        <kbd className="hidden sm:inline text-xs border rounded px-1 py-0.5 bg-white">⌘K</kbd>
      </button>
      {open && <SearchModal onClose={() => setOpen(false)} />}
    </>
  );
}
