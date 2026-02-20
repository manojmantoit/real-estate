import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { properties, leases, transactions, documents } from "@/lib/data";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const systemPrompt = `You are a helpful real estate management assistant. You have access to the following data:

PROPERTIES:
${JSON.stringify(properties, null, 2)}

LEASES:
${JSON.stringify(leases, null, 2)}

FINANCIAL TRANSACTIONS:
${JSON.stringify(transactions, null, 2)}

DOCUMENTS:
${JSON.stringify(documents, null, 2)}

Answer questions about this data concisely and helpfully. When listing items, use bullet points. If asked to calculate something, show the calculation clearly.`;

export async function POST(req: NextRequest) {
  const { message, history = [] } = await req.json();

  const messages = [
    ...history,
    { role: "user" as const, content: message },
  ];

  const stream = await client.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: systemPrompt,
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
