import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Illustration placeholder for demo items: a tinted tile with a large icon (no photos, nothing real). */
export function ArtTile({
  icon: Icon,
  tone,
  ink = "rgba(15,23,42,0.75)",
  className,
}: {
  icon: LucideIcon;
  tone: string;
  ink?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative grid place-items-center overflow-hidden", className)}
      style={{ background: `linear-gradient(135deg, ${tone}, #ffffff)` }}
    >
      <Icon className="absolute -right-3 -bottom-3 size-3/5 opacity-10" style={{ color: ink }} strokeWidth={1} />
      <span className="relative grid size-14 place-items-center rounded-full bg-white/80 shadow-sm sm:size-16">
        <Icon className="size-7 sm:size-8" style={{ color: ink }} strokeWidth={1.75} />
      </span>
    </div>
  );
}
