"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
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
      <div className="px-4 py-4 border-b flex items-center justify-center">
        <Image
          src="https://img1.wsimg.com/isteam/ip/abfd3a70-9ce0-4cd3-9e67-c2bbdfd07c8d/WhatsApp%20Image%202025-08-18%20at%2010.34.04%20PM.jpeg"
          alt="Aubrey Dallas Ventures"
          width={160}
          height={60}
          className="object-contain rounded"
          unoptimized
        />
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
