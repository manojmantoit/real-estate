import { NextRequest, NextResponse } from "next/server";
import { properties } from "@/lib/data";

// In-memory store: propertyId → current stage
const workflowState = new Map<number, string>(
  properties.map((p) => [p.id, p.workflowStage])
);

export async function GET(req: NextRequest) {
  const id = Number(req.nextUrl.searchParams.get("id"));
  const stage = workflowState.get(id);
  if (!stage) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ id, stage });
}

export async function PATCH(req: NextRequest) {
  const cookie = req.cookies.get("auth")?.value;
  if (!cookie) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const { username, role } = JSON.parse(cookie);
  if (role !== "owner" && role !== "agent") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { propertyId, stage } = await req.json();
  workflowState.set(propertyId, stage);
  return NextResponse.json({ propertyId, stage, updatedBy: username });
}
