"use client";
import { useEffect, useRef, useState } from "react";

type SearchResults = {
  properties: { id: number; address: string; type: string; status: string }[];
  leases: { id: number; property: string; tenant: string; rent: string }[];
  transactions: { id: number; property: string; type: string; amount: number; status: string }[];
  documents: { id: number; name: string; property: string; type: string }[];
};

type Message = { role: "user" | "assistant"; content: string };

export default function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-focus input on open
  useEffect(() => { inputRef.current?.focus(); }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Scroll chat to bottom
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  // Live full-text search
  useEffect(() => {
    if (!query.trim()) { setResults(null); return; }
    const timeout = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      setResults(await res.json());
    }, 200);
    return () => clearTimeout(timeout);
  }, [query]);

  const totalResults = results
    ? results.properties.length + results.leases.length + results.transactions.length + results.documents.length
    : 0;

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    const res = await fetch("/api/ai-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: userMsg,
        history: newMessages.slice(0, -1).map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    if (!res.body) { setLoading(false); return; }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let assistantText = "";
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      assistantText += decoder.decode(value);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: assistantText },
      ]);
    }
    setLoading(false);
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-16 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[80vh]">
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b">
          <span className="text-gray-400 text-lg">🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search properties, tenants, documents..."
            className="flex-1 text-base outline-none bg-transparent"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>
          )}
          <kbd className="hidden sm:inline text-xs text-gray-400 border rounded px-1.5 py-0.5">Esc</kbd>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Full-text results */}
          {results && (
            <div className="px-5 py-3 border-b">
              {totalResults === 0 ? (
                <p className="text-sm text-gray-400 py-2">No results for &quot;{query}&quot;</p>
              ) : (
                <div className="space-y-3">
                  {results.properties.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Properties</p>
                      {results.properties.map((p) => (
                        <div key={p.id} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-50 cursor-pointer">
                          <span>🏢</span>
                          <span className="text-sm font-medium">{p.address}</span>
                          <span className="ml-auto text-xs text-gray-400">{p.status}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {results.leases.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Leases</p>
                      {results.leases.map((l) => (
                        <div key={l.id} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-50 cursor-pointer">
                          <span>📄</span>
                          <span className="text-sm font-medium">{l.tenant}</span>
                          <span className="text-xs text-gray-500">— {l.property}</span>
                          <span className="ml-auto text-xs text-gray-400">{l.rent}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {results.transactions.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Financials</p>
                      {results.transactions.map((t) => (
                        <div key={t.id} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-50 cursor-pointer">
                          <span>💰</span>
                          <span className="text-sm font-medium">{t.property}</span>
                          <span className="text-xs text-gray-500">— {t.type}</span>
                          <span className={`ml-auto text-xs font-semibold ${t.amount < 0 ? "text-red-500" : "text-green-600"}`}>
                            {t.amount < 0 ? `-$${Math.abs(t.amount)}` : `+$${t.amount}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {results.documents.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Documents</p>
                      {results.documents.map((d) => (
                        <div key={d.id} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-50 cursor-pointer">
                          <span>📁</span>
                          <span className="text-sm font-medium">{d.name}</span>
                          <span className="ml-auto text-xs text-gray-400">{d.type}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* AI Chat */}
          <div className="px-5 py-3">
            {messages.length === 0 && !results && (
              <div className="py-6 text-center">
                <p className="text-gray-400 text-sm mb-3">Ask AI anything about your properties</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Which leases are expiring soon?", "What is the net income?", "Any vacant properties?"].map((q) => (
                    <button
                      key={q}
                      onClick={() => setInput(q)}
                      className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.length > 0 && (
              <div className="space-y-3 py-2">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap ${
                        m.role === "user"
                          ? "bg-blue-600 text-white rounded-br-sm"
                          : "bg-gray-100 text-gray-800 rounded-bl-sm"
                      }`}
                    >
                      {m.content}
                      {m.role === "assistant" && loading && i === messages.length - 1 && m.content === "" && (
                        <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse ml-1 rounded" />
                      )}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* AI chat input */}
        <div className="border-t px-4 py-3 flex items-center gap-2">
          <span className="text-xs text-gray-400 font-medium">AI</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Ask a question about your portfolio..."
            className="flex-1 text-sm outline-none bg-transparent"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium disabled:opacity-40 hover:bg-blue-700"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
