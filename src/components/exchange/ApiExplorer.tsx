"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

const API = "https://trade-api.mubashar.cc/api/v1";

type Source = "engine" | "postgres" | "bots";

type Endpoint = {
  method: "GET" | "POST" | "DELETE";
  path: string;
  what: string;
  source: Source;
  // A safe, public request the visitor can run against the live phone.
  tryUrl?: () => string;
  // The answer is oldest-first, so the preview shows its tail.
  latest?: boolean;
};

type Group = { title: string; blurb: string; endpoints: Endpoint[] };

const sourceStyle: Record<Source, { label: string; className: string }> = {
  engine: { label: "engine memory", className: "text-emerald-300 bg-emerald-300/10 border-emerald-300/20" },
  postgres: { label: "postgres", className: "text-violet-300 bg-violet-300/10 border-violet-300/20" },
  bots: { label: "market maker", className: "text-amber-300 bg-amber-300/10 border-amber-300/20" },
};

const methodStyle = {
  GET: "text-sky-300",
  POST: "text-emerald-300",
  DELETE: "text-rose-300",
};

const groups: Group[] = [
  {
    title: "Market data",
    blurb: "Public. Anyone can ask.",
    endpoints: [
      {
        method: "GET",
        path: "/markets",
        what: "Every market with its price, supply and market cap. The Markets screen.",
        source: "engine",
        tryUrl: () => `${API}/markets`,
      },
      {
        method: "GET",
        path: "/depth?symbol=ETH_USDC",
        what: "The order book: everyone waiting to buy or sell, and at what price.",
        source: "engine",
        tryUrl: () => `${API}/depth?symbol=ETH_USDC`,
      },
      {
        method: "GET",
        path: "/klines?market=…&interval=1m",
        what: "Candles for the chart: open, high, low and close per minute, hour, day or week.",
        source: "postgres",
        tryUrl: () => {
          const now = Math.floor(Date.now() / 1000);
          return `${API}/klines?market=ETH_USDC&interval=1m&startTime=${now - 15 * 60}&endTime=${now}`;
        },
        latest: true,
      },
    ],
  },
  {
    title: "Trading",
    blurb: "Acts for one account.",
    endpoints: [
      { method: "POST", path: "/order", what: "Place a buy or sell order with a price and a quantity.", source: "engine" },
      { method: "DELETE", path: "/order", what: "Cancel an order that is still waiting on the book.", source: "engine" },
      { method: "GET", path: "/order/open", what: "Your orders that haven't filled yet.", source: "engine" },
    ],
  },
  {
    title: "Accounts & money",
    blurb: "Balances live in the engine, history in Postgres.",
    endpoints: [
      { method: "POST", path: "/auth/register · /auth/login", what: "Create an account or sign in with a password. The iPhone app uses this; the website uses Google.", source: "postgres" },
      { method: "GET", path: "/balance", what: "What you hold, including money locked in open orders.", source: "engine" },
      { method: "POST", path: "/on-ramp", what: "A pretend deposit: the “Deposit 10,000 USDC” button.", source: "engine" },
      { method: "GET", path: "/portfolio · /portfolio/history", what: "Portfolio value, return on deposits, and the value-over-time chart.", source: "postgres" },
      { method: "GET", path: "/trades/user", what: "Your own fills, newest first.", source: "postgres" },
    ],
  },
  {
    title: "Trading bots",
    blurb: "The Agents screen.",
    endpoints: [
      {
        method: "GET",
        path: "/market-maker/runners",
        what: "Each bot: running or stopped, its mid price, trades so far.",
        source: "bots",
        tryUrl: () => `${API}/market-maker/runners`,
      },
      {
        method: "GET",
        path: "/market-maker/events",
        what: "The live activity feed: quotes, fills and rejections.",
        source: "bots",
        tryUrl: () => `${API}/market-maker/events`,
        latest: true,
      },
      { method: "POST", path: "/market-maker/runners/:market/start · stop", what: "Start or stop the bot on one market.", source: "bots" },
    ],
  },
];

type Result = { path: string; status: number | "error"; ms: number; body: string };

// Keeps the preview readable: long lists show their first few items.
const preview = (data: unknown, latest?: boolean) => {
  if (Array.isArray(data)) {
    const shown = JSON.stringify(latest ? data.slice(-3) : data.slice(0, 3), null, 2);
    return data.length > 3 ? `// ${data.length} items, showing the ${latest ? "latest" : "first"} 3\n${shown}` : shown;
  }
  if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    if (Array.isArray(o.bids) && Array.isArray(o.asks)) {
      return JSON.stringify({ bids: o.bids.slice(0, 4), asks: o.asks.slice(0, 4) }, null, 2);
    }
  }
  return JSON.stringify(data, null, 2);
};

export const ApiExplorer = () => {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const run = async (endpoint: Endpoint) => {
    if (!endpoint.tryUrl) return;
    setLoading(endpoint.path);
    const started = performance.now();
    try {
      const res = await fetch(endpoint.tryUrl(), { cache: "no-store" });
      const data = await res.json();
      setResult({ path: endpoint.path, status: res.status, ms: Math.round(performance.now() - started), body: preview(data, endpoint.latest) });
    } catch {
      setResult({
        path: endpoint.path,
        status: "error",
        ms: Math.round(performance.now() - started),
        body: "// The phone didn't answer. It may be restarting. Try again in a minute.",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
      <div className="flex flex-col gap-6">
        {groups.map((group) => (
          <div key={group.title}>
            <div className="flex items-baseline justify-between gap-3">
              <h4 className="font-semibold">{group.title}</h4>
              <span className="text-xs text-white/40">{group.blurb}</span>
            </div>
            <ul className="mt-2 rounded-2xl border border-white/10 divide-y divide-white/5 overflow-hidden">
              {group.endpoints.map((endpoint) => (
                <li key={`${endpoint.method} ${endpoint.path}`} className="p-4 bg-gray-900/40 flex gap-3 items-start">
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-[13px] break-words">
                      <span className={twMerge("font-bold mr-2", methodStyle[endpoint.method])}>{endpoint.method}</span>
                      <span className="text-white/90">{endpoint.path}</span>
                    </div>
                    <p className="text-sm text-white/55 mt-1">{endpoint.what}</p>
                    <span className={twMerge("inline-block mt-2 px-2 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-wider", sourceStyle[endpoint.source].className)}>
                      answered from {sourceStyle[endpoint.source].label}
                    </span>
                  </div>
                  {endpoint.tryUrl && (
                    <button
                      onClick={() => run(endpoint)}
                      disabled={loading !== null}
                      className={twMerge(
                        "flex-none h-9 px-3.5 rounded-lg text-sm font-semibold border transition",
                        result?.path === endpoint.path
                          ? "bg-emerald-300 text-gray-950 border-emerald-300"
                          : "border-white/15 hover:bg-white/10"
                      )}
                    >
                      {loading === endpoint.path ? "…" : "Try it"}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="lg:sticky lg:top-24 self-start">
        <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
            <span className="size-2.5 rounded-full bg-rose-400/70"></span>
            <span className="size-2.5 rounded-full bg-amber-300/70"></span>
            <span className="size-2.5 rounded-full bg-emerald-400/70"></span>
            <span className="ml-2 text-xs font-mono text-white/50 truncate">
              {result ? `trade-api.mubashar.cc/api/v1${result.path}` : "trade-api.mubashar.cc"}
            </span>
          </div>
          {result ? (
            <>
              <div className="px-4 pt-3 text-xs font-mono">
                {result.status === "error" ? (
                  <span className="text-rose-300">no answer</span>
                ) : (
                  <span className={result.status < 400 ? "text-emerald-300" : "text-rose-300"}>
                    {result.status} · answered by the iPhone in {result.ms} ms
                  </span>
                )}
              </div>
              <pre className="px-4 py-3 text-[12px] leading-relaxed font-mono text-white/75 overflow-auto max-h-[420px]">{result.body}</pre>
            </>
          ) : (
            <div className="px-4 py-10 text-center text-sm text-white/45">
              Press <span className="text-white/80 font-semibold">Try it</span> on any public endpoint. The request goes
              from your browser, through Cloudflare, to the phone, and back.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
