"use client";

import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const WS_URL = "wss://trade-ws.mubashar.cc";
const MARKETS = ["BTC_USDC", "ETH_USDC", "SOL_USDC", "BNB_USDC", "XRP_USDC", "DOGE_USDC", "ADA_USDC", "LINK_USDC"];
const KEEP = 9;

type Print = { key: string; market: string; side: string; price: string; qty: string; time: number };
type Status = "idle" | "connecting" | "live" | "offline";

export const LiveTape = () => {
  const [prints, setPrints] = useState<Print[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const box = useRef<HTMLDivElement>(null);

  // Connect only once the tape is on screen, so a visitor who never scrolls here
  // doesn't hold a socket open to the phone.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let socket: WebSocket | null = null;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || socket) return;
      observer.disconnect();
      setStatus("connecting");
      socket = new WebSocket(WS_URL);
      socket.onopen = () => {
        setStatus("live");
        socket?.send(JSON.stringify({ method: "SUBSCRIBE", params: MARKETS.map((m) => `trade@${m}`) }));
      };
      socket.onmessage = (event) => {
        try {
          const { data } = JSON.parse(event.data);
          if (data?.e !== "trade") return;
          const print: Print = {
            key: `${data.s}-${data.t}-${data.timestamp}`,
            market: data.s,
            side: data.side,
            price: String(data.p),
            qty: String(data.q),
            time: data.timestamp ?? Date.now(),
          };
          setPrints((current) => [print, ...current].slice(0, KEEP));
        } catch {}
      };
      socket.onerror = () => setStatus("offline");
      socket.onclose = () => setStatus((s) => (s === "live" || s === "connecting" ? "offline" : s));
    }, { rootMargin: "200px" });
    observer.observe(el);
    return () => {
      observer.disconnect();
      socket?.close();
    };
  }, []);

  return (
    <div ref={box} className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
        <span className="text-xs font-mono text-white/50 truncate">wss://trade-ws.mubashar.cc · trade@*</span>
        <span
          className={twMerge(
            "inline-flex items-center gap-1.5 text-xs font-semibold",
            status === "live" ? "text-emerald-300" : status === "offline" ? "text-rose-300" : "text-white/40"
          )}
        >
          <span className={twMerge("size-1.5 rounded-full", status === "live" ? "bg-emerald-400 animate-pulse" : status === "offline" ? "bg-rose-400" : "bg-white/30")}></span>
          {status === "live" ? "Live" : status === "offline" ? "Offline" : "Connecting"}
        </span>
      </div>
      <ul className="font-mono text-[12px] min-h-[288px]">
        {prints.length === 0 && (
          <li className="px-4 py-10 text-center text-sm font-sans text-white/45">
            {status === "offline"
              ? "The phone isn't answering right now. It may be restarting."
              : "Waiting for the next trade. The bots trade every few seconds…"}
          </li>
        )}
        {prints.map((p) => (
          <li key={p.key} className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-2 border-b border-white/5 animate-[tape-in_0.5s_ease-out]">
            <span className="text-white/70">
              {p.market.replace("_", " / ")}
              <span className={twMerge("ml-2 uppercase text-[10px] font-bold", p.side === "buy" ? "text-emerald-300" : "text-rose-300")}>
                {p.side}
              </span>
            </span>
            <span className={p.side === "buy" ? "text-emerald-300" : "text-rose-300"}>{Number(p.price).toLocaleString("en-US", { maximumFractionDigits: 5 })}</span>
            <span className="text-white/40 w-20 text-right">{Number(p.qty).toLocaleString("en-US", { maximumFractionDigits: 4 })}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
