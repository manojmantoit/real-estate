import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("auth")?.value;
  if (!cookie) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  try {
    const user = JSON.parse(cookie);
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }
}
