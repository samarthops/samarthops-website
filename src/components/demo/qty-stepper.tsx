"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/** Quantity control. `label` names the item for screen readers. */
export function QtyStepper({
  value,
  onChange,
  label,
  min = 1,
  max = 20,
  className,
}: {
  value: number;
  onChange: (next: number) => void;
  label: string;
  /** Going below `min` is not allowed here; use a Remove button for 0. */
  min?: number;
  max?: number;
  className?: string;
}) {
  const btn = "grid size-9 place-items-center rounded-full border border-current/30 disabled:opacity-40";
  return (
    <div className={cn("inline-flex items-center gap-2", className)} role="group" aria-label={`Quantity of ${label}`}>
      <button
        type="button"
        className={btn}
        aria-label={`Decrease quantity of ${label}`}
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <span className="min-w-6 text-center font-semibold tabular-nums" aria-live="polite" data-testid="qty">
        {value}
      </span>
      <button
        type="button"
        className={btn}
        aria-label={`Increase quantity of ${label}`}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
