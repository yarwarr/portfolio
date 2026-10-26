import { twMerge } from "tailwind-merge";

export const StackChips = ({ items, className }: { items: string[]; className?: string }) => {
  return (
    <ul className={twMerge("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="px-3 py-1 rounded-full text-xs font-semibold text-white/70 bg-white/5 border border-white/10"
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export const LiveBadge = ({ label = "Live" }: { label?: string }) => {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-300/20 text-emerald-300 text-xs font-semibold">
      <span className="relative size-2 rounded-full bg-emerald-400">
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping"></span>
      </span>
      {label}
    </span>
  );
};
