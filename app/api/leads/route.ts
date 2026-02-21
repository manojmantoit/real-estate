import { NextRequest, NextResponse } from "next/server";
import type { Lead } from "@/lib/types";

export const runtime = "edge";

const leadStore: Lead[] = [];
let nextId = 1;

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("auth")?.value;
  if (!cookie) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  return NextResponse.json(leadStore);
}

export async function POST(req: NextRequest) {
  const cookie = req.cookies.get("auth")?.value;
  if (!cookie) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const { username, role } = JSON.parse(cookie);
  if (role !== "owner" && role !== "agent") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await req.json();

  for (const field of ["name", "email", "phone", "leadType", "interestedProperty"]) {
    if (!body[field]?.trim()) {
      return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
    }
  }

  const newLead: Lead = {
    id: nextId++,
    name: body.name.trim(),
    email: body.email.trim(),
    phone: body.phone.trim(),
    interestedProperty: body.interestedProperty.trim(),
    leadType: body.leadType,
    status: "New",
    notes: body.notes?.trim() || "",
    createdAt: new Date().toISOString().slice(0, 10),
    createdBy: username,
  };

  leadStore.push(newLead);
  return NextResponse.json(newLead, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const cookie = req.cookies.get("auth")?.value;
  if (!cookie) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const { id, status } = await req.json();
  const lead = leadStore.find((l) => l.id === id);
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });

  lead.status = status;
  return NextResponse.json(lead);
}
