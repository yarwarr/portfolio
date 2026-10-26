import Image from "next/image";
import yartvShot from "@/assets/images/apps/yartv-app.jpg";
import pulseShot from "@/assets/images/apps/pulse-app.jpg";
import hubShot from "@/assets/images/apps/iphone-hub.jpg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LiveBadge, StackChips } from "@/components/StackChips";

const pipeline = [
  { title: "Visitor", detail: "*.mubashar.cc" },
  { title: "Cloudflare", detail: "edge + tunnel" },
  { title: "iPhone 12 Pro Max", detail: "Node 22 · cloudflared · pulse" },
  { title: "Neon", detail: "Postgres" },
];

const highlights = [
  { value: "Node 22", label: "ported to iOS 14 to run Next.js and Hono on the phone" },
  { value: "git push", label: "deploys via a self-hosted GitHub Actions runner" },
  { value: "0", label: "open ports or cloud servers. Each app has its own tunnel" },
];

const LinkButton = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white text-gray-950 h-11 px-5 rounded-xl font-semibold inline-flex items-center justify-center gap-2 w-full md:w-auto"
  >
    <span>{label}</span>
    <ArrowUpRightIcon className="size-4" />
  </a>
);

const AppMeta = ({ eyebrow, title, url }: { eyebrow: string; title: string; url?: string }) => (
  <>
    <div className="flex flex-wrap items-center gap-3">
      <span className="bg-gradient-to-r from-emerald-300 to-sky-400 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
        {eyebrow}
      </span>
      {url && <LiveBadge />}
    </div>
    <h3 className="font-serif text-2xl md:text-4xl mt-3">{title}</h3>
    {url && <p className="mt-1 text-sm font-mono text-sky-300/80">{url}</p>}
  </>
);

export const IPhonesSection = () => {
  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Self-Hosted"
          title="Running on My iPhones"
          description="No cloud servers. These apps are served from a jailbroken iPhone on my desk, reachable worldwide through Cloudflare Tunnel."
        />

        {/* How a request reaches the phone */}
        <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-stretch md:items-center justify-center gap-2 md:gap-0">
          {pipeline.map((step, i) => (
            <div key={step.title} className="flex flex-col md:flex-row items-center">
              <div
                className={`px-5 py-3 rounded-2xl border text-center w-full md:w-auto ${
                  i === 2
                    ? "border-emerald-300/40 bg-emerald-300/10 shadow-[0_0_40px_-10px] shadow-emerald-300/40"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="font-semibold">{step.title}</div>
                <div className="text-xs text-white/50 mt-0.5">{step.detail}</div>
              </div>
              {i < pipeline.length - 1 && (
                <div className="text-emerald-300/60 px-3 py-1 rotate-90 md:rotate-0" aria-hidden>
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlights.map((item) => (
            <div key={item.value} className="rounded-2xl border border-white/10 p-5 bg-gray-800/40">
              <div className="font-serif text-2xl bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text">
                {item.value}
              </div>
              <div className="text-sm text-white/60 mt-1">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 flex flex-col gap-8">
          {/* YarTV */}
          <Card className="p-8 md:p-10 lg:px-14 lg:py-12">
            <div className="md:grid md:grid-cols-5 md:gap-10 items-center">
              <div className="md:col-span-3">
                <AppMeta eyebrow="Streaming platform" title="YarTV" url="movie.mubashar.cc" />
                <p className="mt-4 text-white/60">
                  Native SwiftUI apps for iPhone and Mac that play movies, shows and live TV
                  (VLCKit), backed by a Next.js admin dashboard and API. Accounts, My List and
                  watch progress stay in sync on every device.
                </p>
                <StackChips className="mt-5" items={["Swift", "SwiftUI", "VLCKit", "Next.js 16", "PostgreSQL"]} />
                <div className="mt-7">
                  <LinkButton href="https://movie.mubashar.cc" label="Open dashboard" />
                </div>
              </div>
              <div className="md:col-span-2 mt-10 md:mt-0 flex justify-center">
                <PhoneFrame src={yartvShot} alt="YarTV iPhone app sign-in screen" className="w-56 md:w-64" />
              </div>
            </div>
          </Card>

          {/* iPhone Hub */}
          <Card className="p-8 pb-0 md:p-10 md:pb-0 lg:px-14 lg:pt-12">
            <div className="md:grid md:grid-cols-5 md:gap-10">
              <div className="md:col-span-3">
                <AppMeta eyebrow="Device control center" title="iPhone Hub" url="iphone-hub.mubashar.cc" />
                <p className="mt-4 text-white/60">
                  One dashboard for my whole fleet of jailbroken iPhones: notifications, shell and a
                  live terminal, packages, system logs, screenshots and automations, for one phone
                  or all of them at once. Password protected.
                </p>
              </div>
              <div className="md:col-span-2 mt-6 md:mt-2 flex flex-col gap-6 md:items-end">
                <StackChips className="md:justify-end" items={["Next.js", "React 19", "SSH", "xterm.js", "Tailwind"]} />
                <LinkButton href="https://iphone-hub.mubashar.cc" label="Open hub" />
              </div>
            </div>
            <div className="mt-10 rounded-t-2xl overflow-hidden border border-b-0 border-white/10 shadow-[0_-20px_60px_-20px_rgba(110,231,183,0.25)]">
              <Image src={hubShot} alt="iPhone Hub dashboard showing device controls" className="block w-full h-auto" />
            </div>
          </Card>

          {/* Pulse + Uncommon API */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <Card className="p-8 md:p-10 lg:col-span-3">
              <div className="md:grid md:grid-cols-5 md:gap-8 items-center">
                <div className="md:col-span-3">
                  <AppMeta eyebrow="Native iOS app" title="Pulse" />
                  <p className="mt-4 text-white/60">
                    A Datadog-style monitor I wrote for the phones. Requests per second, p95
                    latency, error rates, process memory and live logs for every app they host.
                  </p>
                  <StackChips className="mt-5" items={["Swift", "SwiftUI", "Live metrics"]} />
                </div>
                <div className="md:col-span-2 mt-8 md:mt-0 flex justify-center">
                  <PhoneFrame src={pulseShot} alt="Pulse app showing the movie server's metrics" className="w-56 md:w-52" />
                </div>
              </div>
            </Card>
            <Card className="p-8 md:p-10 lg:col-span-2 flex flex-col">
              <AppMeta eyebrow="Backend" title="Uncommon API" url="uncommon-api.mubashar.cc" />
              <p className="mt-4 text-white/60 flex-1">
                The backend for the Uncommon Grounds app runs on the same iPhone, with its own
                tunnel and daemons, so each app deploys and fails on its own. Bundled with
                esbuild into one file: no node_modules on the phone.
              </p>
              <StackChips className="mt-5" items={["Hono", "Prisma 7", "Better Auth"]} />
              <div className="mt-7">
                <LinkButton href="https://uncommon-api.mubashar.cc/v1/healthz" label="Health check" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
