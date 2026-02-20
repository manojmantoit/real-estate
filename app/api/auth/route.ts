import { NextRequest, NextResponse } from "next/server";

const USERS: Record<string, { password: string; role: string }> = {
  owner: { password: "owner123", role: "owner" },
  agent: { password: "agent123", role: "agent" },
};

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const user = USERS[username];

  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const res = NextResponse.json({ username, role: user.role });
  res.cookies.set("auth", JSON.stringify({ username, role: user.role }), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });
  return res;
}
