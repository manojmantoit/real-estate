"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/properties", label: "Properties", icon: "🏢" },
  { href: "/leases", label: "Leases", icon: "📄" },
  { href: "/financials", label: "Financials", icon: "💰" },
  { href: "/documents", label: "Documents", icon: "📁" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-56 bg-white shadow-md flex flex-col">
      <div className="px-6 py-5 border-b">
        <h1 className="text-lg font-bold text-blue-700">RE Manager</h1>
      </div>
      <SearchBar />
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === item.href
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
