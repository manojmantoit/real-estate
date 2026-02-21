import { NextRequest, NextResponse } from "next/server";
import type { Lead } from "@/lib/types";

export const runtime = "edge";

const leadStore: Lead[] = [
  { id: 1,  name: "Brandon Ellis",    email: "brandon.ellis@gmail.com",    phone: "469-555-0101", interestedProperty: "9943 FM 1385, Pilot Point, TX",          leadType: "buyer",  status: "Qualified",      notes: "Pre-approved for $1.8M",             createdAt: "2026-01-05", createdBy: "sarah_jones"  },
  { id: 2,  name: "Tanya Moore",      email: "tanya.moore@outlook.com",    phone: "214-555-0182", interestedProperty: "McKinney Retail Building, McKinney, TX",   leadType: "tenant", status: "Proposal Sent",  notes: "Looking for 3,000+ sqft retail",     createdAt: "2026-01-08", createdBy: "mike_carter"  },
  { id: 3,  name: "Kevin Shah",       email: "kevin.shah@kmail.com",       phone: "972-555-0243", interestedProperty: "FM 1385 Sports Academy, Pilot Point, TX",  leadType: "buyer",  status: "Contacted",      notes: "Investor group, cash offer possible", createdAt: "2026-01-12", createdBy: "lisa_patel"   },
  { id: 4,  name: "Gloria Tran",      email: "gtran@business.net",         phone: "817-555-0374", interestedProperty: "Pizza & Boba – DFW Area, TX",             leadType: "tenant", status: "New",            notes: "F&B operator expanding in DFW",      createdAt: "2026-01-15", createdBy: "sarah_jones"  },
  { id: 5,  name: "Derek Owens",      email: "derek.owens@propmail.com",   phone: "469-555-0415", interestedProperty: "9943 FM 1385, Pilot Point, TX",          leadType: "seller", status: "Closed",         notes: "Referred by existing client",        createdAt: "2026-01-18", createdBy: "tom_nguyen"   },
  { id: 6,  name: "Priya Kapoor",     email: "priya.kapoor@inbox.com",     phone: "214-555-0526", interestedProperty: "McKinney Retail Building, McKinney, TX",   leadType: "buyer",  status: "Qualified",      notes: "Relocating from Austin, cash buyer", createdAt: "2026-01-22", createdBy: "emily_ross"   },
  { id: 7,  name: "Marcus Webb",      email: "m.webb@realestate.io",       phone: "972-555-0637", interestedProperty: "FM 1385 Sports Academy, Pilot Point, TX",  leadType: "buyer",  status: "Contacted",      notes: "Looking for sports facility investment", createdAt: "2026-01-25", createdBy: "james_kim"    },
  { id: 8,  name: "Sandra Liu",       email: "sandra.liu@techco.com",      phone: "817-555-0748", interestedProperty: "Pizza & Boba – DFW Area, TX",             leadType: "tenant", status: "New",            notes: "Opening second location",            createdAt: "2026-01-28", createdBy: "amanda_white" },
  { id: 9,  name: "Frank Castillo",   email: "fcastillo@ventures.com",     phone: "469-555-0859", interestedProperty: "9943 FM 1385, Pilot Point, TX",          leadType: "buyer",  status: "Proposal Sent",  notes: "Wants BTR community development",    createdAt: "2026-02-01", createdBy: "david_flores" },
  { id: 10, name: "Nicole Harris",    email: "nharris@luxhomes.net",        phone: "214-555-0960", interestedProperty: "McKinney Retail Building, McKinney, TX",   leadType: "seller", status: "Contacted",      notes: "Evaluating offers Q1 2026",          createdAt: "2026-02-04", createdBy: "rachel_brown" },
  { id: 11, name: "Anthony Park",     email: "anthony.park@dfw.com",       phone: "972-555-0171", interestedProperty: "FM 1385 Sports Academy, Pilot Point, TX",  leadType: "tenant", status: "Qualified",      notes: "Youth sports academy operator",      createdAt: "2026-02-07", createdBy: "carlos_mendez"},
  { id: 12, name: "Heather Mills",    email: "heather.mills@homenet.org",  phone: "817-555-0282", interestedProperty: "9943 FM 1385, Pilot Point, TX",          leadType: "buyer",  status: "New",            notes: "First-time commercial buyer",        createdAt: "2026-02-10", createdBy: "mike_carter"  },
  { id: 13, name: "Jason Nguyen",     email: "j.nguyen@capitalgroup.io",   phone: "469-555-0393", interestedProperty: "Pizza & Boba – DFW Area, TX",             leadType: "buyer",  status: "Contacted",      notes: "PE firm looking for F&B assets",     createdAt: "2026-02-13", createdBy: "lisa_patel"   },
  { id: 14, name: "Courtney Bell",    email: "cbell@northtexas.com",       phone: "214-555-0404", interestedProperty: "McKinney Retail Building, McKinney, TX",   leadType: "tenant", status: "Proposal Sent",  notes: "Boutique fitness studio concept",    createdAt: "2026-02-16", createdBy: "emily_ross"   },
  { id: 15, name: "Robert Vasquez",   email: "rvasquez@texasinvest.com",   phone: "972-555-0515", interestedProperty: "FM 1385 Sports Academy, Pilot Point, TX",  leadType: "buyer",  status: "Closed",         notes: "Closed deal, referred 2 contacts",   createdAt: "2026-02-19", createdBy: "tom_nguyen"   },
];
let nextId = 16;

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
