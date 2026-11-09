import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { LiveBadge, StackChips } from "@/components/StackChips";

// How the 2006 game ends up in a browser tab.
const pipeline = [
  { step: "2006", title: "Windows .exe", detail: "x86 · Direct3D 8 · DirectSound" },
  { step: "→ C", title: "31,500 functions", detail: "each machine-code function translated to C" },
  { step: "→ Wasm", title: "30 MB WebAssembly", detail: "compiled with Emscripten" },
  { step: "2026", title: "Browser tab or Mac app", detail: "WebGPU · Web Audio · gamepads" },
];

// The game still thinks it's on Windows; these stand in for the APIs it calls.
const swaps = [
  ["Direct3D 8", "WebGPU"],
  ["DirectSound", "Web Audio"],
  ["DirectInput", "Keyboard, mouse, gamepad"],
  ["Windows files & threads", "Browser storage & Web Workers"],
];

const features = [
  "Today's squads: every 2026 international side with real names, ratings and bowling speeds, plus a 2006 Legends XI",
  "Online matches with friends: both games run in lockstep, connected browser to browser over WebRTC",
  "Self-hosted on a Mac mini at home behind a Cloudflare Tunnel, with sign-in through Cloudflare Access",
  "Matches recorded automatically to PostgreSQL: innings totals, batting and bowling figures, fifties and five-fors",
  "A Mac desktop app (Electron) with graphics options from FXAA to upscaling and a live TV-style scorebar",
  "Tools that read the game's own files: textures, audio, shot physics, rosters, and animations recorded from the live game",
];

const Scorebar = () => (
  <div className="rounded-2xl overflow-hidden border border-white/15 bg-gray-950/80 shadow-2xl font-sans">
    <div className="flex items-stretch text-sm">
      <div className="bg-emerald-600 text-white px-3 md:px-4 py-3 font-bold tracking-wide flex items-center">PAK</div>
      <div className="px-3 md:px-4 py-3 flex items-center gap-2 md:gap-3 border-r border-white/10">
        <span className="text-xl md:text-2xl font-bold tabular-nums">187/4</span>
        <span className="text-white/50 tabular-nums whitespace-nowrap">18.2 ov</span>
      </div>
      <div className="hidden md:flex flex-col justify-center px-4 py-2 text-xs border-r border-white/10 gap-0.5">
        <span><span className="text-white">Babar Azam*</span> <span className="tabular-nums text-white/60">74 (51)</span></span>
        <span><span className="text-white/70">Fakhar Zaman</span> <span className="tabular-nums text-white/50">22 (14)</span></span>
      </div>
      <div className="hidden lg:flex flex-col justify-center px-4 py-2 text-xs border-r border-white/10 gap-0.5">
        <span className="text-white/70">J.Bumrah</span>
        <span className="tabular-nums text-white/50">3.2–0–21–2</span>
      </div>
      <div className="ml-auto px-3 md:px-4 py-3 flex items-center text-xs text-amber-300 font-semibold whitespace-nowrap">
        Need 24 off 10
      </div>
    </div>
  </div>
);

export const CricketSection = () => {
  return (
    <div className="py-16 lg:py-24 relative overflow-x-clip">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 size-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.18),transparent)] -z-10"></div>
      <div className="container">
        <SectionHeader
          eyebrow="Featured Game"
          title="Cricket 07, back on the field"
          description="The cricket game a generation grew up on, released for Windows in 2006. It now runs in a browser tab and as a Mac app, with today's squads and online matches between friends."
        />

        {/* The picture: a floodlit pitch with the game's scorebar over it */}
        <Card className="mt-12 md:mt-16 p-0">
          <div className="relative h-72 md:h-80 bg-[radial-gradient(ellipse_at_center,#1f6b3a_0%,#14532d_45%,#0b2e1a_100%)]">
            {/* mowing stripes */}
            <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_48px,rgba(255,255,255,0.08)_48px,rgba(255,255,255,0.08)_96px)]"></div>
            {/* boundary rope */}
            <div className="absolute inset-6 md:inset-10 rounded-[50%] border-2 border-white/25"></div>
            {/* 30-yard circle */}
            <div className="absolute inset-x-[22%] inset-y-[18%] rounded-[50%] border border-dashed border-white/20"></div>
            {/* pitch strip with creases and stumps */}
            <div className="absolute left-1/2 top-[42%] md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] md:w-[46%] max-w-[360px] h-8 md:h-12 bg-[#c8b07a] rounded-sm shadow-inner">
              <div className="absolute left-[8%] inset-y-0 w-px bg-white/80"></div>
              <div className="absolute right-[8%] inset-y-0 w-px bg-white/80"></div>
              <div className="absolute left-[4%] top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                {[0, 1, 2].map((i) => <span key={i} className="block size-1 rounded-full bg-amber-950" />)}
              </div>
              <div className="absolute right-[4%] top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                {[0, 1, 2].map((i) => <span key={i} className="block size-1 rounded-full bg-amber-950" />)}
              </div>
              {/* the ball, on its way */}
              <span className="absolute top-1/2 left-[30%] -translate-y-1/2 size-2 rounded-full bg-red-500 shadow-[0_0_10px_2px_rgba(239,68,68,0.7)] animate-pulse" />
            </div>
            {/* floodlight glows */}
            <div className="absolute -top-10 -left-10 size-40 rounded-full bg-white/20 blur-3xl"></div>
            <div className="absolute -top-10 -right-10 size-40 rounded-full bg-white/20 blur-3xl"></div>
            <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-wrap gap-2">
              <LiveBadge label="Online" />
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-950/60 border border-white/15 text-white/80">
                T20 · PAK v IND
              </span>
            </div>
            <div className="absolute inset-x-4 bottom-4 md:inset-x-8 md:bottom-6">
              <Scorebar />
            </div>
          </div>
        </Card>
        <p className="mt-3 text-center text-xs text-white/40">
          Illustration of the in-game scorebar I added: batters, bowler and balls left, read live from the game&apos;s memory.
        </p>

        {/* How it works */}
        <div className="mt-12 md:mt-16">
          <h3 className="font-serif text-2xl md:text-3xl text-center">No rewrite. The original game, recompiled.</h3>
          <p className="mt-3 text-center text-white/60 max-w-2xl mx-auto">
            Nobody rewrote the game. The original executable is translated, function by function, into code a
            browser can run. The game still thinks it&apos;s on a Windows PC.
          </p>
          <ol className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pipeline.map((stage, i) => (
              <li key={stage.title} className="relative">
                <Card className="p-5 h-full">
                  <p className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text">
                    {stage.step}
                  </p>
                  <p className="mt-2 font-semibold text-lg">{stage.title}</p>
                  <p className="mt-1 text-sm text-white/60">{stage.detail}</p>
                </Card>
                {i < pipeline.length - 1 && (
                  <span className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 size-6 items-center justify-center rounded-full bg-gray-900 border border-white/20 text-white/60 text-xs">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-3xl mx-auto">
            {swaps.map(([from, to]) => (
              <li key={from} className="flex items-center gap-3 text-sm rounded-xl bg-white/5 border border-white/10 px-4 py-2.5">
                <span className="text-white/50 line-through decoration-white/30">{from}</span>
                <span className="text-white/40">→</span>
                <span className="text-emerald-300 font-semibold">{to}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What I built */}
        <Card className="mt-12 md:mt-16 p-8 md:p-10 lg:p-12">
          <div className="lg:grid lg:grid-cols-5 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-600 text-white">
                  Invite-only
                </span>
                <LiveBadge label="cricket07.mubashar.cc" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl mt-5">
                A 20-year-old game, playable with friends again
              </h3>
              <p className="mt-4 text-white/60">
                I started from the open-source{" "}
                <a
                  href="https://github.com/Dhaiwat10/cricket07-browser"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/30 hover:text-white"
                >
                  Cricket 07 browser port
                </a>
                , brought every piece onto my own machines, and built the rest around it: updated squads,
                gameplay tuning, a Mac app, online play from my own server and a record of every match.
              </p>
              <StackChips
                className="mt-6"
                items={["WebAssembly", "WebGPU", "Emscripten", "Electron", "Node.js", "WebRTC", "PostgreSQL", "Cloudflare", "Python"]}
              />
            </div>
            <div className="lg:col-span-3 mt-8 lg:mt-0">
              <ul className="flex flex-col gap-4">
                {features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm md:text-base text-white/70">
                    <CheckCircleIcon className="size-5 md:size-6 flex-none text-emerald-300" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col md:flex-row gap-3">
                <a
                  href="https://cricket07.mubashar.cc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-950 h-12 px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2"
                >
                  <span>Open the game</span>
                  <ArrowUpRightIcon className="size-4" />
                </a>
                <a
                  href="#contact"
                  className="border border-white/15 h-12 px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 hover:bg-white/5 transition"
                >
                  <span>Ask for an invite</span>
                  <ArrowUpRightIcon className="size-4" />
                </a>
              </div>
              <p className="mt-3 text-xs text-white/40">
                Sign-in is limited to approved emails. Needs Chrome or another browser with WebGPU.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
