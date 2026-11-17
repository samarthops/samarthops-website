"use client";

import { useState } from "react";
import { Check, Cog, Search, Trash2 } from "lucide-react";
import { DemoDialog } from "@/components/demo/demo-dialog";
import { conceptLabel } from "@/data/portfolio";
import {
  capabilities,
  categories,
  deliveryOptions,
  materials,
  parts,
  processSteps,
  type Material,
  type Part,
  type PartCategory,
} from "@/data/torquetech";
import { useStoredState } from "@/lib/use-stored-state";

type RfqItem = { id: string; qty: number };
const NO_ITEMS: RfqItem[] = [];

const head = "font-[family-name:var(--font-tt-head)]";
const orangeBtn =
  "inline-flex items-center justify-center gap-2 rounded-md bg-[#C2410C] px-5 py-2.5 font-semibold text-white hover:bg-[#9A3412] disabled:cursor-not-allowed disabled:opacity-50";
const steelBtn =
  "inline-flex items-center justify-center gap-2 rounded-md border-2 border-[#1F2933] px-4 py-2 font-semibold text-[#1F2933] hover:bg-[#1F2933] hover:text-white";
const field = "mt-1 w-full rounded-md border-2 border-[#9AA5B1] bg-white px-3 py-2 text-[#1F2933]";

const partById = (id: string) => parts.find((p) => p.id === id)!;

/** Quantity picker inside the part dialog. Remounted on every open, so it starts at the minimum order quantity. */
function PartDetail({ part, onAdd }: { part: Part; onAdd: (qty: number) => void }) {
  const [qty, setQty] = useState(String(part.moq));
  const [error, setError] = useState("");

  function add(e: React.FormEvent) {
    e.preventDefault();
    const n = Number(qty);
    if (!Number.isInteger(n) || n < part.moq) {
      setError(`The minimum order for this part is ${part.moq} pieces.`);
      return;
    }
    onAdd(n);
  }

  return (
    <div>
      <p className="text-sm text-[#52606D]">
        {part.code} · {part.category}
      </p>
      <p className="mt-2">{part.blurb}</p>
      <table className="mt-4 w-full text-left text-sm" data-testid="tt-specs">
        <caption className="sr-only">Specification of {part.name}</caption>
        <tbody>
          {[["Material", part.material], ["Process", part.process], ...part.specs, ["Minimum order", `${part.moq} pieces`]].map(([k, v]) => (
            <tr key={k} className="border-t border-[#CBD2D9]">
              <th scope="row" className="py-2 pr-4 font-semibold">
                {k}
              </th>
              <td className="py-2">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={add} noValidate aria-label="Add to quote request" className="mt-4">
        <label className="block text-sm font-semibold">
          Quantity (pieces)
          <input
            name="qty"
            type="number"
            inputMode="numeric"
            min={part.moq}
            step={1}
            value={qty}
            onChange={(e) => {
              setQty(e.target.value);
              setError("");
            }}
            className={field}
          />
        </label>
        {error && (
          <p role="alert" className="mt-2 text-sm font-semibold text-[#B91C1C]">
            {error}
          </p>
        )}
        <button type="submit" className={`${orangeBtn} mt-3`}>
          Add to quote request
        </button>
      </form>
    </div>
  );
}

/** TorqueTech Components: fictional parts maker. The quote list lives in this browser only; submitting sends nothing. */
export function TorqueTechApp() {
  const [category, setCategory] = useState<PartCategory | "All">("All");
  const [material, setMaterial] = useState<Material | "All">("All");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [items, setItems] = useStoredState<RfqItem[]>("torquetech-rfq", NO_ITEMS);
  const [sent, setSent] = useState<{ company: string; count: number } | null>(null);

  const q = query.trim().toLowerCase();
  const shown = parts.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      (material === "All" || p.material === material) &&
      (!q || `${p.name} ${p.code}`.toLowerCase().includes(q)),
  );
  const current = open ? partById(open) : null;

  function addToQuote(part: Part, qty: number) {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === part.id);
      return exists ? prev.map((i) => (i.id === part.id ? { ...i, qty } : i)) : [...prev, { id: part.id, qty }];
    });
    setSent(null);
    setOpen(null);
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSent({ company: String(data.get("company") ?? ""), count: items.length });
    setItems(NO_ITEMS);
  }

  return (
    <div className="bg-[#F5F7FA] text-[#1F2933]">
      <header className="bg-[#1F2933] text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <p className={`${head} flex items-center gap-2 text-2xl font-semibold tracking-wide uppercase`}>
            <Cog className="size-7 text-[#FB923C]" aria-hidden="true" /> TorqueTech Components
          </p>
          <nav aria-label="TorqueTech Components" className="flex flex-wrap gap-1 text-sm font-semibold">
            {[
              ["#tt-parts", "Parts"],
              ["#tt-capabilities", "Capabilities"],
              ["#tt-process", "How we work"],
              ["#tt-quote", `Quote request (${items.length})`],
            ].map(([href, label]) => (
              <a key={href} href={href} className="inline-flex min-h-11 items-center rounded-md px-3 py-2 hover:bg-white/15">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-10 sm:px-6">
        <section aria-labelledby="tt-title" className="relative overflow-hidden rounded-lg bg-[#1F2933] p-6 text-white sm:p-10">
          <h1 id="tt-title" className={`${head} max-w-3xl text-4xl font-semibold tracking-wide uppercase sm:text-6xl`}>
            Precision parts, made to your drawing
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/90">
            Shafts, gears, fasteners, flanges and bushings turned, milled and inspected in batches from fifty pieces.
          </p>
          <a href="#tt-parts" className={`${orangeBtn} mt-6`}>
            Browse parts
          </a>
          <Cog aria-hidden="true" strokeWidth={1} className="pointer-events-none absolute top-1/2 -right-8 hidden size-80 -translate-y-1/2 text-[#F97316]/20 lg:block" />
        </section>

        <section id="tt-parts" aria-labelledby="tt-parts-title" className="scroll-mt-4">
          <h2 id="tt-parts-title" className={`${head} text-3xl font-semibold tracking-wide uppercase`}>
            Parts catalogue
          </h2>
          <div className="mt-4 flex flex-wrap items-end gap-3">
            <div role="group" aria-label="Filter parts by category" className="flex flex-wrap gap-2">
              {(["All", ...categories] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                  className={`rounded-md border-2 px-3 py-1.5 text-sm font-semibold ${
                    category === c
                      ? "border-[#1F2933] bg-[#1F2933] text-white"
                      : "border-[#1F2933] bg-white text-[#1F2933] hover:bg-[#E4E7EB]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="block text-sm font-semibold">
              Material
              <select value={material} onChange={(e) => setMaterial(e.target.value as Material | "All")} className={`${field} mt-0 min-w-44`}>
                <option value="All">All materials</option>
                {materials.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </label>
            <label className="relative block grow sm:max-w-xs">
              <span className="sr-only">Search parts</span>
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#52606D]" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or code"
                className="w-full rounded-md border-2 border-[#9AA5B1] bg-white py-2 pr-3 pl-9"
              />
            </label>
          </div>
          <p role="status" className="mt-3 text-sm text-[#52606D]" data-testid="tt-count">
            {shown.length} {shown.length === 1 ? "part" : "parts"}
          </p>
          <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="tt-parts">
            {shown.map((p) => (
              <li key={p.id} className="flex flex-col rounded-lg border border-[#CBD2D9] bg-white p-5" data-testid="tt-part">
                <p className="text-xs font-semibold tracking-wide text-[#52606D] uppercase">
                  {p.code} · {p.category}
                </p>
                <h3 className={`${head} mt-1 text-xl font-semibold tracking-wide uppercase`}>{p.name}</h3>
                <p className="mt-2 text-sm">{p.material}</p>
                <p className="mt-1 flex-1 text-sm text-[#52606D]">Minimum order {p.moq} pieces</p>
                <button type="button" onClick={() => setOpen(p.id)} aria-label={`View specification: ${p.name}`} className={`${steelBtn} mt-4`}>
                  View specification
                </button>
              </li>
            ))}
          </ul>
          {shown.length === 0 && (
            <p className="mt-3 rounded-md bg-white p-4" data-testid="tt-empty">
              No part matches these filters. Clear a filter or change the search.
            </p>
          )}
        </section>

        <section id="tt-capabilities" aria-labelledby="tt-cap-title" className="scroll-mt-4">
          <h2 id="tt-cap-title" className={`${head} text-3xl font-semibold tracking-wide uppercase`}>
            Capabilities
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="tt-capabilities">
            {capabilities.map((c) => (
              <li key={c.title} className="rounded-lg border-l-8 border-[#C2410C] bg-white p-5">
                <h3 className="font-bold">{c.title}</h3>
                <p className="mt-1 text-sm text-[#323F4B]">{c.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="tt-process" aria-labelledby="tt-process-title" className="scroll-mt-4">
          <h2 id="tt-process-title" className={`${head} text-3xl font-semibold tracking-wide uppercase`}>
            How we work
          </h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-testid="tt-steps">
            {processSteps.map((s, i) => (
              <li key={s.title} className="rounded-lg bg-white p-5">
                <span className={`${head} grid size-10 place-items-center rounded-md bg-[#C2410C] text-xl text-white`} aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-[#323F4B]">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="tt-quote" aria-labelledby="tt-quote-title" className="scroll-mt-4">
          <h2 id="tt-quote-title" className={`${head} text-3xl font-semibold tracking-wide uppercase`}>
            Quote request
          </h2>
          <div className="mt-4 rounded-lg bg-white p-6 sm:p-8">
            {sent ? (
              <div data-testid="tt-confirmation" className="rounded-md bg-[#DCFCE7] p-5">
                <p className="flex items-center gap-2 text-xl font-bold text-[#14532D]">
                  <Check className="size-6" aria-hidden="true" /> Demo quote request submitted
                </p>
                <p className="mt-2">
                  Thank you, {sent.company}. Request QR-1001 covers {sent.count} {sent.count === 1 ? "part" : "parts"}.
                </p>
                <p className="mt-2 text-sm">This is a demonstration. Nothing was sent or saved.</p>
                <button type="button" className={`${steelBtn} mt-4`} onClick={() => setSent(null)}>
                  Start another request
                </button>
              </div>
            ) : (
              <>
                {items.length === 0 ? (
                  <p data-testid="tt-quote-empty">Your quote request is empty. Add parts from the catalogue above.</p>
                ) : (
                  <ul className="divide-y divide-[#CBD2D9]" data-testid="tt-quote-items">
                    {items.map((i) => {
                      const p = partById(i.id);
                      return (
                        <li key={i.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                          <span>
                            <span className="font-semibold">{p.name}</span>
                            <span className="block text-sm text-[#52606D]">
                              {p.code}, {p.material}
                            </span>
                          </span>
                          <span className="flex items-center gap-3">
                            <span className="font-semibold">{i.qty} pieces</span>
                            <button
                              type="button"
                              onClick={() => setItems((prev) => prev.filter((x) => x.id !== i.id))}
                              aria-label={`Remove ${p.name}`}
                              className="rounded-md p-2 text-[#B91C1C] hover:bg-[#FEE2E2]"
                            >
                              <Trash2 className="size-5" aria-hidden="true" />
                            </button>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
                <form onSubmit={submit} aria-label="Request a quote" className="mt-6 grid gap-4 sm:grid-cols-2">
                  <p className="rounded-md bg-[#FEF3C7] p-3 text-sm sm:col-span-2">
                    Demonstration only. Use made-up details: nothing is saved or sent.
                  </p>
                  <label className="block text-sm font-semibold">
                    Company name
                    <input name="company" required autoComplete="off" className={field} />
                  </label>
                  <label className="block text-sm font-semibold">
                    Contact person
                    <input name="contact" required autoComplete="off" className={field} />
                  </label>
                  <label className="block text-sm font-semibold">
                    Phone number
                    <input name="phone" required inputMode="numeric" pattern="[0-9]{10}" title="Ten digits" autoComplete="off" className={field} />
                  </label>
                  <label className="block text-sm font-semibold">
                    Delivery needed
                    <select name="delivery" className={field}>
                      {deliveryOptions.map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                  </label>
                  <div className="sm:col-span-2">
                    <button type="submit" disabled={items.length === 0} className={orangeBtn}>
                      Send demo quote request
                    </button>
                    {items.length === 0 && <p className="mt-2 text-sm text-[#52606D]">Add at least one part to send a request.</p>}
                  </div>
                </form>
              </>
            )}
          </div>
        </section>
      </div>

      <footer className="bg-[#1F2933] text-white/90">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:py-8 text-xs sm:text-sm sm:px-6">
          <p className={`${head} flex items-center gap-2 text-2xl font-semibold tracking-wide text-[#FB923C] uppercase`}>
            <Cog className="size-6" aria-hidden="true" /> TorqueTech Components
          </p>
          <p className="mt-2">{conceptLabel}</p>
          <p className="mt-1">The company, parts, sizes and quantities are fictional.</p>
        </div>
      </footer>

      <DemoDialog open={current !== null} onClose={() => setOpen(null)} title={current?.name ?? "Part"} className="rounded-lg text-[#1F2933]">
        {current && <PartDetail key={current.id} part={current} onAdd={(qty) => addToQuote(current, qty)} />}
      </DemoDialog>
    </div>
  );
}
