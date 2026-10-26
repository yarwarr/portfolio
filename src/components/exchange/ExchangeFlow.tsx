"use client";

import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  getBezierPath,
  getSmoothStepPath,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { twMerge } from "tailwind-merge";
import { NODE_W, edgeDefs, services, steps, tall, wide, type Kind, type Layout, type Side } from "./flowData";

type Look = "idle" | "active" | "dim";
type ServiceNodeData = { id: string; look: Look; selected: boolean };
type PhoneNodeData = { look: Look; width: number; height: number };
type FlowEdgeData = { look: Look; step?: boolean; offset?: number; dashed?: boolean; motion: boolean; showLabel: boolean };

const sidePosition: Record<Side, Position> = {
  t: Position.Top,
  r: Position.Right,
  b: Position.Bottom,
  l: Position.Left,
};

const kindStyle: Record<Kind, { ring: string; icon: string; tag: string }> = {
  client: { ring: "border-sky-300/40", icon: "fill-sky-300", tag: "Client" },
  edge: { ring: "border-orange-300/40", icon: "fill-orange-300", tag: "Edge" },
  service: { ring: "border-white/15", icon: "fill-white/80", tag: "Service" },
  core: { ring: "border-emerald-300/60", icon: "fill-emerald-300", tag: "Core" },
  queue: { ring: "border-rose-300/35", icon: "fill-rose-300", tag: "Redis" },
  store: { ring: "border-violet-300/40", icon: "fill-violet-300", tag: "Storage" },
  bot: { ring: "border-amber-300/40", icon: "fill-amber-300", tag: "Bots" },
};

const ServiceNode = ({ data }: NodeProps<Node<ServiceNodeData>>) => {
  const info = services[data.id];
  const style = kindStyle[info.kind];
  return (
    <div
      style={{ width: NODE_W }}
      className={twMerge(
        "rounded-2xl border bg-gray-900/95 px-3.5 py-3 text-left transition-all duration-500 cursor-pointer",
        style.ring,
        info.kind === "core" && "bg-emerald-950/80",
        data.look === "active" && "border-emerald-300 shadow-[0_0_36px_-6px] shadow-emerald-300/60 scale-[1.04]",
        data.look === "dim" && "opacity-30",
        data.selected && "ring-2 ring-sky-300/80"
      )}
    >
      {(["t", "r", "b", "l"] as Side[]).map((side) => (
        <span key={side}>
          <Handle type="source" id={side} position={sidePosition[side]} isConnectable={false} className="!opacity-0 !border-0 !min-w-0 !min-h-0 !w-px !h-px" />
          <Handle type="target" id={side} position={sidePosition[side]} isConnectable={false} className="!opacity-0 !border-0 !min-w-0 !min-h-0 !w-px !h-px" />
        </span>
      ))}
      <div className="flex items-center gap-2.5">
        <svg viewBox="0 0 24 24" className={twMerge("size-5 flex-none", style.icon)} aria-hidden>
          <path d={info.icon.path} />
        </svg>
        <div className="min-w-0">
          <div className="text-[13px] font-semibold text-white leading-tight">{info.title}</div>
          <div className="text-[11px] text-white/50 font-mono truncate mt-0.5">{info.subtitle}</div>
        </div>
      </div>
    </div>
  );
};

const PhoneNode = ({ data }: NodeProps<Node<PhoneNodeData>>) => (
  <div
    style={{ width: data.width, height: data.height }}
    className={twMerge(
      "rounded-[2.5rem] border-2 border-dashed border-emerald-300/25 bg-emerald-300/[0.03] transition-opacity duration-500",
      data.look === "dim" && "opacity-60"
    )}
  >
    <div className="flex items-center gap-2 px-7 pt-5 text-xs font-semibold uppercase tracking-widest text-emerald-300/80">
      <span className="relative size-2 rounded-full bg-emerald-400">
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping"></span>
      </span>
      iPhone 12 Pro Max · on my desk
    </div>
  </div>
);

const FlowEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  label,
  data,
}: EdgeProps<Edge<FlowEdgeData>>) => {
  const args = { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition };
  const [path, labelX, labelY] = data?.step ? getSmoothStepPath({ ...args, borderRadius: 18, offset: data.offset ?? 18 }) : getBezierPath(args);
  const look = data?.look ?? "idle";
  const stroke = look === "active" ? "#6ee7b7" : "rgba(255,255,255,0.28)";
  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd={`url(#arrow-${look === "active" ? "active" : "idle"})`}
        style={{
          stroke,
          strokeWidth: look === "active" ? 2.25 : 1.4,
          strokeDasharray: data?.dashed ? "5 5" : undefined,
          opacity: look === "dim" ? 0.18 : 1,
          transition: "opacity 0.5s, stroke 0.5s",
        }}
      />
      {data?.motion && look !== "dim" && (
        <circle r={look === "active" ? 4.5 : 2.5} fill={look === "active" ? "#6ee7b7" : "rgba(125,211,252,0.85)"}>
          <animateMotion dur={look === "active" ? "1.4s" : "3.2s"} repeatCount="indefinite" path={path} />
        </circle>
      )}
      {label && data?.showLabel && (
        <EdgeLabelRenderer>
          <div
            style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}
            className={twMerge(
              "absolute pointer-events-none rounded-full px-2 py-0.5 text-[10px] font-semibold font-mono whitespace-nowrap transition-all duration-500",
              look === "active" ? "bg-emerald-300 text-gray-950" : "bg-gray-900 text-white/45 border border-white/10",
              look === "dim" && "opacity-0"
            )}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

const nodeTypes = { service: ServiceNode, phone: PhoneNode };
const edgeTypes = { flow: FlowEdge };

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
};

const STEP_MS = 7000;

// Phones get the tall layout; everything wider gets the wide one.
const useLayout = (): Layout => {
  const [layout, setLayout] = useState<Layout>(wide);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setLayout(query.matches ? tall : wide);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return layout;
};

export const ExchangeFlow = () => {
  // -1 is the overview: everything flowing, nothing singled out.
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const layout = useLayout();
  const { phone: frame, positions } = layout;
  const scroller = useRef<HTMLDivElement>(null);

  const current = step >= 0 ? steps[step] : null;

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      if (step >= steps.length - 1) {
        setPlaying(false);
      } else {
        setStep(step + 1);
      }
    }, STEP_MS);
    return () => clearTimeout(timer);
  }, [playing, step]);

  // On a narrow screen the diagram scrolls sideways; keep the lit part in view.
  useEffect(() => {
    const el = scroller.current;
    if (!el || !current || el.scrollWidth <= el.clientWidth) return;
    const xs = current.nodes.map((id) => {
      const p = positions[id];
      return (p.inPhone ? frame.x : 0) + p.x + NODE_W / 2;
    });
    const center = (Math.min(...xs) + Math.max(...xs)) / 2;
    const ratio = el.scrollWidth / (frame.x + frame.width + 40);
    el.scrollTo({ left: center * ratio - el.clientWidth / 2, behavior: "smooth" });
  }, [current, frame, positions]);

  // The tall layout scrolls with the page instead; bring the lit boxes up above the docked panel.
  const flowBox = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = flowBox.current;
    if (!el || !current || layout !== tall) return;
    const rects = current.nodes
      .map((id) => el.querySelector(`.react-flow__node[data-id="${id}"]`)?.getBoundingClientRect())
      .filter((r): r is DOMRect => !!r);
    if (!rects.length) return;
    const top = Math.min(...rects.map((r) => r.top));
    const bottom = Math.max(...rects.map((r) => r.bottom));
    window.scrollBy({ top: (top + bottom) / 2 - window.innerHeight * 0.3, behavior: "smooth" });
  }, [current, layout]);

  const nodes = useMemo<Node[]>(() => {
    const lookFor = (id: string): Look => (!current ? "idle" : current.nodes.includes(id) ? "active" : "dim");
    const phone: Node<PhoneNodeData> = {
      id: "phone",
      type: "phone",
      position: { x: frame.x, y: frame.y },
      data: { look: current ? "dim" : "idle", width: frame.width, height: frame.height },
      selectable: false,
      style: { width: frame.width, height: frame.height },
      zIndex: -1,
    };
    const rest = Object.entries(positions).map<Node<ServiceNodeData>>(([id, p]) => ({
      id,
      type: "service",
      position: { x: p.x, y: p.y },
      parentId: p.inPhone ? "phone" : undefined,
      data: { id, look: lookFor(id), selected: selected === id },
    }));
    return [phone, ...rest];
  }, [current, selected, frame, positions]);

  const edges = useMemo<Edge<FlowEdgeData>[]>(
    () =>
      edgeDefs.map((e) => {
        const route = layout.routes[e.id];
        const look: Look = !current ? "idle" : current.edges.includes(e.id) ? "active" : "dim";
        return {
          id: e.id,
          type: "flow",
          source: e.source,
          target: e.target,
          sourceHandle: route.sh,
          targetHandle: route.th,
          label: e.label,
          data: {
            look,
            step: route.step,
            offset: route.offset,
            dashed: e.dashed,
            motion: !reducedMotion,
            showLabel: layout.labels === "all" || look === "active",
          },
        };
      }),
    [current, reducedMotion, layout]
  );

  const goTo = useCallback((i: number) => {
    setSelected(null);
    setStep(i);
  }, []);

  const info = selected ? services[selected] : null;

  return (
    <div>
      <svg className="absolute size-0" aria-hidden>
        <defs>
          <marker id="arrow-idle" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.4)" />
          </marker>
          <marker id="arrow-active" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#6ee7b7" />
          </marker>
        </defs>
      </svg>

      <div ref={scroller} className="overflow-x-auto [scrollbar-width:none] -mx-4 px-4 md:mx-0 md:px-0">
        <div ref={flowBox} className={twMerge("exchange-flow", layout === wide ? "min-w-[1040px] aspect-[1492/640]" : "aspect-[470/1040]")}>
          <ReactFlow
            key={layout === wide ? "wide" : "tall"}
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            fitViewOptions={{ padding: 0.04 }}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            panOnDrag={false}
            panOnScroll={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            preventScrolling={false}
            proOptions={{ hideAttribution: true }}
            onNodeClick={(_, node) => {
              if (node.id === "phone") return;
              setPlaying(false);
              setSelected((s) => (s === node.id ? null : node.id));
            }}
          />
        </div>
      </div>

      {/* On a phone the diagram is taller than the screen, so the explanation docks to the bottom. */}
      <div className="mt-6 grid gap-3 md:gap-4 md:grid-cols-[1fr_auto] md:items-start max-md:sticky max-md:bottom-3 max-md:z-20 max-md:rounded-2xl max-md:border max-md:border-white/10 max-md:bg-gray-900/90 max-md:backdrop-blur max-md:p-4 max-md:shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="md:rounded-2xl md:border md:border-white/10 md:bg-gray-900/60 md:p-6 md:min-h-[168px]">
          {info ? (
            <>
              <div className="text-xs font-semibold uppercase tracking-widest text-sky-300">{kindStyle[info.kind].tag}</div>
              <div className="font-serif text-xl md:text-2xl mt-1">{info.title}</div>
              <p className="mt-2 text-sm md:text-base text-white/70">{info.about}</p>
              <p className="mt-3 text-xs font-mono text-white/40">{info.tech}</p>
            </>
          ) : current ? (
            <>
              <div className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
                Step {step + 1} of {steps.length}
              </div>
              <div className="font-serif text-xl md:text-2xl mt-1">{current.title}</div>
              <p className="mt-2 text-sm md:text-base text-white/70">{current.body}</p>
            </>
          ) : (
            <>
              <div className="text-xs font-semibold uppercase tracking-widest text-emerald-300">The whole picture</div>
              <div className="font-serif text-xl md:text-2xl mt-1">Small programs, one job each</div>
              <p className="mt-2 text-sm md:text-base text-white/70">
                Each box is its own program with one job, and they talk to each other through Redis. The dots are messages
                moving right now. Press <span className="text-white">Follow an order</span> to see what happens when you
                tap Buy, or tap any box to learn what it does.
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col gap-3 md:w-64">
          <div className="grid grid-cols-[1fr_1.6fr_1fr] md:grid-cols-2 gap-2">
            <button
              onClick={() => {
                setSelected(null);
                if (playing) {
                  setPlaying(false);
                } else {
                  if (step < 0 || step >= steps.length - 1) setStep(0);
                  setPlaying(true);
                }
              }}
              className="order-2 md:order-first md:col-span-2 h-11 md:h-12 rounded-xl bg-white text-gray-950 font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {playing ? (
                <>
                  <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
                  Pause
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden><path d="M7 4.5v15l12-7.5z" /></svg>
                  {step >= 0 ? <><span className="md:hidden">Play</span><span className="max-md:hidden">Play from here</span></> : <><span className="md:hidden">Follow</span><span className="max-md:hidden">Follow an order</span></>}
                </>
              )}
            </button>
            <button
              onClick={() => { setPlaying(false); goTo(Math.max(step - 1, -1)); }}
              disabled={step < 0}
              className="order-1 md:order-none h-11 rounded-xl border border-white/15 font-semibold hover:bg-white/5 transition disabled:opacity-30"
            >
              Back
            </button>
            <button
              onClick={() => { setPlaying(false); goTo(Math.min(step + 1, steps.length - 1)); }}
              disabled={step >= steps.length - 1}
              className="order-3 md:order-none h-11 rounded-xl border border-white/15 font-semibold hover:bg-white/5 transition disabled:opacity-30"
            >
              Next
            </button>
          </div>
          <div className="flex items-center justify-center gap-1.5 md:pt-1" role="tablist" aria-label="Walkthrough steps">
            {steps.map((s, i) => (
              <button
                key={s.title}
                role="tab"
                aria-selected={i === step}
                aria-label={`Step ${i + 1}: ${s.title}`}
                onClick={() => { setPlaying(false); goTo(i); }}
                className={twMerge(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === step ? "w-6 bg-emerald-300" : i < step ? "w-1.5 bg-emerald-300/50" : "w-1.5 bg-white/20"
                )}
              />
            ))}
          </div>
          {step >= 0 && (
            <button onClick={() => { setPlaying(false); goTo(-1); }} className="max-md:hidden text-xs text-white/40 hover:text-white/70 transition">
              Show everything
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
