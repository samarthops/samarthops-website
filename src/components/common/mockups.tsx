import { Check } from "lucide-react";

/** CSS-drawn, clearly labelled illustration. Fictional "Demo Company"; no real data. */
export function PhoneMockup({ className = "" }: { className?: string }) {
  const rows = [
    ["Asha Demo", "09:02", "Site A"],
    ["Ravi Sample", "09:07", "Site B"],
    ["Meera Test", "09:15", "Site A"],
  ];
  return (
    <figure className={className}>
      <div className="mx-auto w-56 rounded-[2rem] border-4 border-navy bg-white p-3 shadow-xl" aria-hidden="true">
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-line" />
        <p className="text-xs font-semibold text-navy">Demo Company</p>
        <p className="mb-3 text-[11px] text-ink">Today&apos;s attendance</p>
        <div className="mb-3 flex h-24 items-center justify-center rounded-xl bg-soft text-xs text-ink">
          Selfie and location check-in
        </div>
        <ul className="space-y-2">
          {rows.map(([name, time, site]) => (
            <li key={name} className="flex items-center justify-between rounded-lg border border-line px-2 py-1.5 text-[11px] text-ink">
              <span className="flex items-center gap-1.5">
                <Check className="size-3 text-[#0b7a5b]" />
                {name}
              </span>
              <span>
                {time} · {site}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 rounded-lg bg-brand-dark py-2 text-center text-xs font-semibold text-white">Check in</div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-ink">Illustrative mockup, demo data</figcaption>
    </figure>
  );
}

export function BrowserMockup({ className = "" }: { className?: string }) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-xl border border-line bg-white shadow-lg" aria-hidden="true">
        <div className="flex items-center gap-1.5 border-b border-line bg-soft px-3 py-2">
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
        </div>
        <div className="space-y-3 p-4">
          <div className="h-3 w-1/3 rounded bg-navy" />
          <div className="h-2 w-2/3 rounded bg-line" />
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="h-16 rounded bg-soft" />
            <div className="h-16 rounded bg-soft" />
            <div className="h-16 rounded bg-soft" />
          </div>
          <div className="h-7 w-24 rounded bg-brand-dark" />
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-ink">Illustrative website layout</figcaption>
    </figure>
  );
}
