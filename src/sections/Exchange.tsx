import portfolioShot from "@/assets/images/apps/exchange-portfolio.webp";
import marketsShot from "@/assets/images/apps/exchange-markets.webp";
import tradeShot from "@/assets/images/apps/exchange-trade.webp";
import agentsShot from "@/assets/images/apps/exchange-agents.webp";
import accountShot from "@/assets/images/apps/exchange-account.webp";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LiveBadge, StackChips } from "@/components/StackChips";
import { ExchangeFlow } from "@/components/exchange/ExchangeFlow";
import { ApiExplorer } from "@/components/exchange/ApiExplorer";
import { LiveTape } from "@/components/exchange/LiveTape";

const screens = [
  { src: portfolioShot, label: "Portfolio", alt: "Portfolio screen with value over time, deposits, cash and an ETH position" },
  { src: marketsShot, label: "Markets", alt: "Markets screen listing eight coins priced in USDC" },
  { src: tradeShot, label: "Trade", alt: "ETH/USDC trade screen with a live candlestick chart and buy and sell buttons" },
  { src: agentsShot, label: "Agents", alt: "Agents screen with market-making bots and their live activity feed" },
  { src: accountShot, label: "Account", alt: "Account screen with balances, a deposit button and the exchange connection" },
];

const facts = [
  { value: "8", label: "markets, all quoted in USDC" },
  { value: "10", label: "services running on the phone" },
  { value: "~370 MB", label: "of memory for the whole exchange" },
  { value: "0", label: "cloud servers or cloud databases" },
];

const hosts = [
  {
    host: "trade.mubashar.cc",
    name: "The website",
    body: "The full exchange in your browser: markets, charts, the order book, your portfolio. Sign in with Google.",
    href: "https://trade.mubashar.cc",
  },
  {
    host: "trade-api.mubashar.cc",
    name: "The REST API",
    body: "Ask a question, get one answer. Prices, the order book, candles, balances, and placing or cancelling orders.",
    href: "https://trade-api.mubashar.cc/api/v1/markets",
  },
  {
    host: "trade-ws.mubashar.cc",
    name: "The live feed",
    body: "Stay connected and the server pushes every change the moment it happens. No asking, no refreshing.",
  },
];

export const ExchangeSection = () => {
  return (
    <div className="py-16 lg:py-24 relative overflow-x-clip">
      <div className="absolute top-[18%] left-1/2 -translate-x-1/2 size-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.14),transparent)] -z-10"></div>
      <div className="container">
        <SectionHeader
          eyebrow="Built from scratch"
          title="Exchange"
          description="A working crypto exchange: matching engine, order books, live charts and trading bots, with a website and a native iPhone app. The whole thing runs on one iPhone on my desk."
        />

        <div className="mt-12 md:mt-16 -mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 md:grid md:grid-cols-5 md:overflow-visible md:mx-0 md:px-0 [scrollbar-width:none]">
          {screens.map((screen, i) => (
            <figure
              key={screen.label}
              className={`w-[58%] sm:w-[42%] md:w-auto flex-none snap-center ${i % 2 === 1 ? "md:translate-y-8" : ""}`}
            >
              <PhoneFrame src={screen.src} alt={screen.alt} />
              <figcaption className="mt-3 text-center text-sm font-semibold text-white/60">{screen.label}</figcaption>
            </figure>
          ))}
        </div>

        <Card className="mt-10 md:mt-16 p-8 md:p-10 lg:p-12">
          <div className="lg:grid lg:grid-cols-5 lg:gap-12">
            <div className="lg:col-span-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-400 text-gray-950">
                  Personal project
                </span>
                <LiveBadge label="Live at trade.mubashar.cc" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl mt-5">Built the way real exchanges are built</h3>
              <p className="mt-4 text-white/60">
                Instead of one big app, it is split into small programs that each do one job: one takes your request, one
                matches buyers with sellers, one saves the history, one streams live prices to every screen. They pass
                messages through Redis, so a slow part never holds up a fast one.
              </p>
              <p className="mt-3 text-white/60">
                Then I put all of it, database included, on a jailbroken iPhone 12 Pro Max, reachable from anywhere
                through a Cloudflare Tunnel.
              </p>
              <StackChips
                className="mt-6"
                items={["TypeScript", "Node.js", "Express", "WebSocket", "Redis", "PostgreSQL · PGlite", "Next.js", "SwiftUI", "Cloudflare Tunnel"]}
              />
            </div>
            <div className="lg:col-span-2 mt-8 lg:mt-0 flex flex-col">
              <div className="grid grid-cols-2 gap-3">
                {facts.map((fact) => (
                  <div key={fact.label} className="rounded-2xl border border-white/10 p-4 bg-gray-900/40">
                    <div className="font-serif text-2xl bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text">
                      {fact.value}
                    </div>
                    <div className="text-xs text-white/55 mt-1">{fact.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="https://trade.mubashar.cc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-950 h-12 px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2"
                >
                  <span>Open trade.mubashar.cc</span>
                  <ArrowUpRightIcon className="size-4" />
                </a>
                <a
                  href="#exchange-api"
                  className="border border-white/15 h-12 px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 hover:bg-white/5 transition"
                >
                  <span>Try the live API</span>
                </a>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* The diagram gets more room than the text column. */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 mt-20 md:mt-28">
        <div className="text-center">
          <h3 className="font-serif text-2xl md:text-4xl">What happens when you press Buy</h3>
          <p className="mt-3 text-white/60 max-w-2xl mx-auto">
            Every box below is a real program running on the phone right now. Follow one order through the system, step
            by step.
          </p>
        </div>
        <div className="mt-10">
          <ExchangeFlow />
        </div>
      </div>

      <div className="container mt-20 md:mt-28" id="exchange-api">
        <div className="text-center">
          <h3 className="font-serif text-2xl md:text-4xl">Three addresses, one phone</h3>
          <p className="mt-3 text-white/60 max-w-2xl mx-auto">
            The website and the iPhone app both talk to the same two services. You can too: these are live.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {hosts.map((h) => (
            <div key={h.host} className="rounded-2xl border border-white/10 bg-gray-800/40 p-5 flex flex-col">
              <div className="font-mono text-sm text-sky-300/90 break-all">{h.host}</div>
              <div className="font-semibold mt-2">{h.name}</div>
              <p className="text-sm text-white/55 mt-1 flex-1">{h.body}</p>
              {h.href && (
                <a
                  href={h.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-sm font-semibold text-white/80 hover:text-white inline-flex items-center gap-1.5"
                >
                  Open <ArrowUpRightIcon className="size-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h4 className="font-serif text-xl md:text-2xl">The REST API</h4>
          <p className="mt-2 text-white/60 max-w-3xl">
            Every address starts with <span className="font-mono text-white/80">trade-api.mubashar.cc/api/v1</span>. The
            tag under each one says who actually answers it: the engine&apos;s memory, Postgres, or the bots.
          </p>
          <div className="mt-6">
            <ApiExplorer />
          </div>
        </div>

        <div className="mt-14 lg:grid lg:grid-cols-[1fr_1.1fr] lg:gap-10 items-start">
          <div>
            <h4 className="font-serif text-xl md:text-2xl">The live feed</h4>
            <p className="mt-2 text-white/60">
              The REST API answers when you ask. The WebSocket is the opposite: you say once what you want to watch, and
              the server keeps telling you.
            </p>
            <pre className="mt-5 rounded-2xl border border-white/10 bg-black/40 p-4 text-[12px] font-mono text-white/75 overflow-x-auto">
{`// you send, once
{ "method": "SUBSCRIBE",
  "params": ["trade@ETH_USDC", "depth@ETH_USDC"] }

// it sends, every time something changes
{ "stream": "trade@ETH_USDC",
  "data": { "e": "trade", "p": "2547.5", "q": "0.42", "side": "buy" } }`}
            </pre>
            <ul className="mt-5 flex flex-col gap-2 text-sm text-white/60">
              <li><span className="font-mono text-white/85">depth@MARKET</span>: the order book changed</li>
              <li><span className="font-mono text-white/85">trade@MARKET</span>: a trade just happened</li>
            </ul>
          </div>
          <div className="mt-8 lg:mt-0">
            <p className="text-sm text-white/50 mb-3">Real trades on all 8 markets, streaming from the phone:</p>
            <LiveTape />
          </div>
        </div>
      </div>
    </div>
  );
};
