import { NextRequest, NextResponse } from "next/server";
import { properties as seedProperties } from "@/lib/data";
import { registerProperty } from "@/app/api/workflow/route";
import type { Property } from "@/lib/types";

export const runtime = "edge";

const propertyStore: Property[] = seedProperties.map((p) => ({
  ...p,
  status: p.status as Property["status"],
  addedBy: "owner",
}));

let nextId = Math.max(...propertyStore.map((p) => p.id)) + 1;

export async function GET() {
  return NextResponse.json(propertyStore);
}

export async function POST(req: NextRequest) {
  const cookie = req.cookies.get("auth")?.value;
  if (!cookie) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const { username, role } = JSON.parse(cookie);
  if (role !== "owner" && role !== "agent") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await req.json();

  for (const field of ["address", "type", "contact"]) {
    if (!body[field]?.trim()) {
      return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
    }
  }

  const newProperty: Property = {
    id: nextId++,
    address: body.address.trim(),
    type: body.type.trim(),
    status: body.status || "Available",
    size: body.size?.trim() || "N/A",
    image:
      body.image?.trim() ||
      "https://img1.wsimg.com/isteam/ip/abfd3a70-9ce0-4cd3-9e67-c2bbdfd07c8d/Similar-completed-project.jpg",
    listing: body.listing?.trim() || null,
    contact: body.contact.trim(),
    workflowStage: "Listing LOI Creation",
    addedBy: username,
  };

  propertyStore.push(newProperty);
  registerProperty(newProperty.id, newProperty.workflowStage);
  return NextResponse.json(newProperty, { status: 201 });
}
