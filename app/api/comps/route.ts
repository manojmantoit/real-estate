import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const runtime = "edge";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const cookie = req.cookies.get("auth")?.value;
  if (!cookie) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const { address, type, size } = await req.json();

  const prompt = `Generate 3 realistic nearby comparable property sales or active listings for this property:

Address: ${address}
Type: ${type}
Size: ${size}

Return ONLY a valid JSON array with no markdown, no explanation, no code fences. Use this exact shape:
[
  {
    "address": "full street address near the subject property",
    "type": "property type",
    "salePrice": "$X,XXX,XXX",
    "pricePerSqft": "$XXX",
    "sqft": "X,XXX sqft",
    "soldDate": "Mon YYYY",
    "distance": "X.X miles",
    "similarity": "High"
  }
]

Rules:
- Use realistic North Texas / DFW market prices
- Keep addresses geographically close (under 5 miles)
- similarity must be one of: High, Medium, Low
- soldDate should be within the last 18 months
- Return exactly 3 comps`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "[]";
    const comps = JSON.parse(text);
    return NextResponse.json({ comps });
  } catch {
    return NextResponse.json({ error: "Failed to generate comps" }, { status: 500 });
  }
}
