import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Aubrey Dallas Ventures",
  description: "Sports – Ranches – Investments | Real Estate Portfolio Manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-100 text-gray-900 antialiased">
        <AuthProvider>
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
