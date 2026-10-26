import type { SimpleIcon } from "simple-icons";
import { siApple, siCloudflare, siExpress, siGooglechrome, siNextdotjs, siNodedotjs, siPostgresql, siRedis } from "simple-icons";

export type Side = "t" | "r" | "b" | "l";
export type Kind = "client" | "edge" | "service" | "core" | "queue" | "store" | "bot";

export type ServiceInfo = {
  title: string;
  subtitle: string;
  kind: Kind;
  icon: SimpleIcon;
  // Plain-words explanation shown when the node is clicked.
  about: string;
  // The technical detail underneath it.
  tech: string;
};

export const services: Record<string, ServiceInfo> = {
  web: {
    title: "Web app",
    subtitle: "trade.mubashar.cc",
    kind: "client",
    icon: siGooglechrome,
    about: "The website. Markets, live charts, the order book and your portfolio, with Google sign-in. It works on a phone browser too.",
    tech: "Next.js 14 · lightweight-charts · NextAuth · Prisma",
  },
  ios: {
    title: "iPhone app",
    subtitle: "SwiftUI",
    kind: "client",
    icon: siApple,
    about: "A native app with the same features. It does no maths of its own: every number on screen comes from the API or the live feed.",
    tech: "SwiftUI · iOS 14 baseline · also packaged as a .deb for jailbroken phones",
  },
  cf: {
    title: "Cloudflare",
    subtitle: "edge + tunnel",
    kind: "edge",
    icon: siCloudflare,
    about: "The front door. Visitors talk to Cloudflare, and Cloudflare reaches the phone through a tunnel the phone opened itself. My home network has no open ports.",
    tech: "Cloudflare Tunnel `trade` · 3 hostnames · cloudflared running on iOS",
  },
  next: {
    title: "Website server",
    subtitle: "Next.js",
    kind: "service",
    icon: siNextdotjs,
    about: "Sends the web app to your browser and handles Google sign-in. It reads accounts and trade history from Postgres.",
    tech: "Next.js standalone build · Prisma 6 client engine + pg adapter",
  },
  api: {
    title: "REST API",
    subtitle: "Express",
    kind: "service",
    icon: siExpress,
    about: "The receptionist. It takes every question and order, passes it to the right place, and waits for the answer. It never decides anything itself.",
    tech: "Express · stateless · port 3603 behind a metrics proxy",
  },
  ws: {
    title: "Live feed",
    subtitle: "WebSocket",
    kind: "service",
    icon: siNodedotjs,
    about: "Keeps a connection open to every screen. When the book or a price changes, it pushes the update instantly, so nothing has to refresh.",
    tech: "ws · one Redis subscription per channel, fanned out to every viewer",
  },
  mm: {
    title: "Market maker",
    subtitle: "8 trading bots",
    kind: "bot",
    icon: siNodedotjs,
    about: "Robot traders that keep every market moving. They quote prices around a drifting midpoint and trade every few seconds, through the same API as you.",
    tech: "One runner per market · start and stop from the Agents screen",
  },
  orderQ: {
    title: "Order queue",
    subtitle: "Redis list",
    kind: "queue",
    icon: siRedis,
    about: "A single line that every request waits in. It is what lets one engine serve everyone in a strict, fair order.",
    tech: "LPUSH by the API · blocking pop by the engine",
  },
  engine: {
    title: "Matching engine",
    subtitle: "the heart",
    kind: "core",
    icon: siNodedotjs,
    about: "Holds every order book and every balance in memory, and matches buyers with sellers one order at a time. It is the only part allowed to change money.",
    tech: "Single-threaded · price-time priority · snapshot to disk every 3 s",
  },
  pubsub: {
    title: "Broadcast",
    subtitle: "Redis pub/sub",
    kind: "queue",
    icon: siRedis,
    about: "A loudspeaker. The engine announces answers and market updates here, and whoever is listening on that channel hears them.",
    tech: "Per-request reply channels · depth@, trade@, ticker@ per market",
  },
  saveQ: {
    title: "Save queue",
    subtitle: "Redis list",
    kind: "queue",
    icon: siRedis,
    about: "Trades waiting to be written down. Saving happens later, so a slow disk can never slow trading.",
    tech: "Filled by the engine · drained by the db worker",
  },
  dbw: {
    title: "Database worker",
    subtitle: "writes trades",
    kind: "service",
    icon: siNodedotjs,
    about: "Takes each finished trade from the save queue and records it: your trade history, and the price point the charts are built from.",
    tech: "Writes both sides of every fill · price ticks for candles",
  },
  pg: {
    title: "Postgres",
    subtitle: "PGlite · WASM",
    kind: "store",
    icon: siPostgresql,
    about: "The permanent record: accounts, deposits, trades, and the 1m / 1h / 1d / 1w candles. It is real Postgres compiled to WebAssembly, so it runs on iOS.",
    tech: "PGlite (Postgres in WASM) behind a small wire-protocol server I wrote",
  },
};

export const NODE_W = 176;

type Placement = { x: number; y: number; inPhone?: boolean };
type Route = { sh: Side; th: Side; step?: boolean; offset?: number };

export type Layout = {
  // Children of the phone are placed relative to it.
  phone: { x: number; y: number; width: number; height: number };
  positions: Record<string, Placement>;
  routes: Record<string, Route>;
  // Edge labels on every edge, or only on the lit ones.
  labels: "all" | "active";
};

const COL = [24, 280, 536, 792];

// Wide screens: requests flow left to right into the phone.
export const wide: Layout = {
  phone: { x: 500, y: 0, width: COL[3] + NODE_W + 24, height: 610 },
  labels: "all",
  positions: {
    web: { x: 0, y: 150 },
    ios: { x: 0, y: 330 },
    cf: { x: 250, y: 240 },
    next: { x: COL[0], y: 70, inPhone: true },
    api: { x: COL[0], y: 240, inPhone: true },
    ws: { x: COL[0], y: 410, inPhone: true },
    mm: { x: COL[0], y: 530, inPhone: true },
    pg: { x: COL[1], y: 70, inPhone: true },
    orderQ: { x: COL[1], y: 240, inPhone: true },
    pubsub: { x: COL[1], y: 410, inPhone: true },
    dbw: { x: COL[2], y: 70, inPhone: true },
    engine: { x: COL[2], y: 325, inPhone: true },
    saveQ: { x: COL[3], y: 325, inPhone: true },
  },
  routes: {
    "web-cf": { sh: "r", th: "l" },
    "ios-cf": { sh: "r", th: "l" },
    "cf-next": { sh: "r", th: "l" },
    "cf-api": { sh: "r", th: "l" },
    "cf-ws": { sh: "r", th: "l" },
    "mm-api": { sh: "l", th: "l", step: true },
    "api-orderQ": { sh: "r", th: "l" },
    "orderQ-engine": { sh: "r", th: "t", step: true },
    "engine-pubsub": { sh: "l", th: "r" },
    "pubsub-api": { sh: "t", th: "b" },
    "pubsub-ws": { sh: "l", th: "r" },
    "engine-saveQ": { sh: "r", th: "l" },
    "saveQ-dbw": { sh: "t", th: "r", step: true },
    "dbw-pg": { sh: "l", th: "r" },
    "pg-api": { sh: "b", th: "t" },
    "next-pg": { sh: "r", th: "l" },
  },
};

const A = 36;
const B = A + NODE_W + 40;
const MID = (A + B) / 2;
const ROW = (n: number) => 60 + n * 130;

// Phones: the same system, top to bottom in two columns.
export const tall: Layout = {
  phone: { x: 0, y: 220, width: B + NODE_W + 30, height: ROW(5) + 100 },
  labels: "active",
  positions: {
    web: { x: A, y: 0 },
    ios: { x: B, y: 0 },
    cf: { x: MID, y: 110 },
    api: { x: A, y: ROW(0), inPhone: true },
    ws: { x: B, y: ROW(0), inPhone: true },
    orderQ: { x: A, y: ROW(1), inPhone: true },
    pubsub: { x: B, y: ROW(1), inPhone: true },
    engine: { x: MID, y: ROW(2), inPhone: true },
    mm: { x: A, y: ROW(3), inPhone: true },
    saveQ: { x: B, y: ROW(3), inPhone: true },
    pg: { x: A, y: ROW(4), inPhone: true },
    dbw: { x: B, y: ROW(4), inPhone: true },
    next: { x: B, y: ROW(5), inPhone: true },
  },
  routes: {
    "web-cf": { sh: "b", th: "t" },
    "ios-cf": { sh: "b", th: "t" },
    "cf-next": { sh: "r", th: "r", step: true, offset: 14 },
    "cf-api": { sh: "b", th: "t" },
    "cf-ws": { sh: "b", th: "t" },
    "mm-api": { sh: "l", th: "l", step: true, offset: 12 },
    "api-orderQ": { sh: "b", th: "t" },
    "orderQ-engine": { sh: "b", th: "t" },
    "engine-pubsub": { sh: "r", th: "b" },
    "pubsub-api": { sh: "l", th: "r" },
    "pubsub-ws": { sh: "t", th: "b" },
    "engine-saveQ": { sh: "b", th: "t" },
    "saveQ-dbw": { sh: "b", th: "t" },
    "dbw-pg": { sh: "l", th: "r" },
    "pg-api": { sh: "l", th: "l", step: true, offset: 26 },
    "next-pg": { sh: "l", th: "b" },
  },
};

export type FlowEdgeDef = {
  id: string;
  source: string;
  target: string;
  label?: string;
  dashed?: boolean;
};

export const edgeDefs: FlowEdgeDef[] = [
  { id: "web-cf", source: "web", target: "cf", label: "HTTPS" },
  { id: "ios-cf", source: "ios", target: "cf", label: "HTTPS + WSS" },
  { id: "cf-next", source: "cf", target: "next", label: "trade." },
  { id: "cf-api", source: "cf", target: "api", label: "trade-api." },
  { id: "cf-ws", source: "cf", target: "ws", label: "trade-ws." },
  { id: "mm-api", source: "mm", target: "api" },
  { id: "api-orderQ", source: "api", target: "orderQ", label: "queue it" },
  { id: "orderQ-engine", source: "orderQ", target: "engine", label: "one at a time" },
  { id: "engine-pubsub", source: "engine", target: "pubsub", label: "announce" },
  { id: "pubsub-api", source: "pubsub", target: "api", label: "your answer" },
  { id: "pubsub-ws", source: "pubsub", target: "ws", label: "book + trades" },
  { id: "engine-saveQ", source: "engine", target: "saveQ", label: "to save" },
  { id: "saveQ-dbw", source: "saveQ", target: "dbw" },
  { id: "dbw-pg", source: "dbw", target: "pg", label: "write" },
  { id: "pg-api", source: "pg", target: "api", label: "candles", dashed: true },
  { id: "next-pg", source: "next", target: "pg", label: "accounts", dashed: true },
];

export type Step = {
  title: string;
  body: string;
  nodes: string[];
  edges: string[];
};

export const steps: Step[] = [
  {
    title: "You press Buy",
    body: "Your order leaves the website or the iPhone app as an ordinary web request. Cloudflare receives it and sends it down a private tunnel to the iPhone on my desk.",
    nodes: ["web", "ios", "cf", "api"],
    edges: ["web-cf", "ios-cf", "cf-api"],
  },
  {
    title: "The API puts it in line",
    body: "The API doesn't make decisions. It drops your order into a queue with a ticket number, then waits for an answer on that ticket.",
    nodes: ["api", "orderQ"],
    edges: ["api-orderQ"],
  },
  {
    title: "The engine matches it",
    body: "The matching engine takes orders strictly one at a time, so two people can never buy the same coins. It locks your funds, finds sellers at your price or better, and fills as much as it can, all in memory, in microseconds.",
    nodes: ["orderQ", "engine"],
    edges: ["orderQ-engine"],
  },
  {
    title: "You get your answer",
    body: "The engine announces the result on your ticket's channel. The API was listening, so it replies straight away: filled, partly filled, or resting on the book.",
    nodes: ["engine", "pubsub", "api", "cf", "web", "ios"],
    edges: ["engine-pubsub", "pubsub-api"],
  },
  {
    title: "Everyone else sees it live",
    body: "In the same moment the engine broadcasts the new order book and the trade. The live feed pushes them to every screen watching that market, so charts tick and books update without a refresh.",
    nodes: ["engine", "pubsub", "ws", "cf", "web", "ios"],
    edges: ["engine-pubsub", "pubsub-ws", "cf-ws"],
  },
  {
    title: "It gets written down",
    body: "Saving is never allowed to slow trading down. The engine drops the trade into a second queue, and the database worker records it in Postgres in its own time.",
    nodes: ["engine", "saveQ", "dbw", "pg"],
    edges: ["engine-saveQ", "saveQ-dbw", "dbw-pg"],
  },
  {
    title: "The chart is built from it",
    body: "Postgres rolls every trade into 1-minute, 1-hour, 1-day and 1-week candles. When you open a chart, the API reads them from there.",
    nodes: ["pg", "api", "cf", "web", "ios"],
    edges: ["pg-api", "cf-api"],
  },
  {
    title: "Robots keep it busy",
    body: "A market needs someone on the other side. The market-maker bots quote prices and trade every few seconds through the same API as you. That's the Agents screen in the app.",
    nodes: ["mm", "api", "orderQ", "engine"],
    edges: ["mm-api", "api-orderQ", "orderQ-engine"],
  },
];
