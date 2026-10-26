import type { SimpleIcon } from "simple-icons";

// Turns a simple-icons entry into a component that fits TechIcon / ToolboxItems.
export const brandIcon = (icon: SimpleIcon) => {
  const Icon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label={icon.title}>
      <path d={icon.path} />
    </svg>
  );
  Icon.displayName = `${icon.title}Icon`;
  return Icon;
};
