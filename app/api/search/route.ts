import { NextRequest, NextResponse } from "next/server";
import { properties, leases, transactions, documents } from "@/lib/data";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.toLowerCase().trim() ?? "";

  if (!q) return NextResponse.json({ properties: [], leases: [], transactions: [], documents: [] });

  return NextResponse.json({
    properties: properties.filter(
      (p) => p.address.toLowerCase().includes(q) || p.type.toLowerCase().includes(q) || p.status.toLowerCase().includes(q)
    ),
    leases: leases.filter(
      (l) => l.property.toLowerCase().includes(q) || l.tenant.toLowerCase().includes(q) || l.rent.toLowerCase().includes(q)
    ),
    transactions: transactions.filter(
      (t) => t.property.toLowerCase().includes(q) || t.type.toLowerCase().includes(q) || t.status.toLowerCase().includes(q)
    ),
    documents: documents.filter(
      (d) => d.name.toLowerCase().includes(q) || d.property.toLowerCase().includes(q) || d.type.toLowerCase().includes(q)
    ),
  });
}
