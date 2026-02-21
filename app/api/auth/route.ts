import { NextRequest, NextResponse } from "next/server";

const USERS: Record<string, { password: string; role: string }> = {
  owner: { password: "owner123", role: "owner" },
  agent: { password: "agent123", role: "agent" },
  sarah_jones: { password: "realtor123", role: "agent" },
  mike_carter: { password: "realtor123", role: "agent" },
  lisa_patel: { password: "realtor123", role: "agent" },
  tom_nguyen: { password: "realtor123", role: "agent" },
  emily_ross: { password: "realtor123", role: "agent" },
  james_kim: { password: "realtor123", role: "agent" },
  amanda_white: { password: "realtor123", role: "agent" },
  david_flores: { password: "realtor123", role: "agent" },
  rachel_brown: { password: "realtor123", role: "agent" },
  carlos_mendez: { password: "realtor123", role: "agent" },
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
