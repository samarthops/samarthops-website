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
      className={cn("grid place-items-center", className)}
      style={{ background: `linear-gradient(135deg, ${tone}, #ffffff)` }}
    >
      <Icon className="size-1/3 min-h-8 min-w-8" style={{ color: ink }} strokeWidth={1.5} />
    </div>
  );
}
