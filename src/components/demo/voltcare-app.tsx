"use client";

import { useState } from "react";
import {
  BatteryCharging,
  Camera,
  Check,
  Plug,
  Refrigerator,
  Search,
  Snowflake,
  Tv,
  WashingMachine,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { ArtTile } from "@/components/demo/art-tile";
import { conceptLabel } from "@/data/portfolio";
import {
  areas,
  categories,
  days,
  reasons,
  services,
  slots,
  ticketSteps,
  tickets,
  type RepairService,
  type ServiceCategory,
  type Ticket,
} from "@/data/voltcare";

const ICONS: Record<RepairService["icon"], LucideIcon> = {
  snow: Snowflake,
  battery: BatteryCharging,
  plug: Plug,
  tv: Tv,
  washing: WashingMachine,
  fridge: Refrigerator,
  camera: Camera,
  wrench: Wrench,
};

const head = "font-[family-name:var(--font-vc-head)]";
const limeBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#A3E635] px-5 py-2.5 font-bold text-[#0A0A0A] hover:bg-[#BEF264] disabled:cursor-not-allowed disabled:opacity-50";
const darkBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#0A0A0A] px-4 py-2 font-bold text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white";
const field = "mt-1 w-full rounded-lg border-2 border-[#D1D5DB] bg-white px-3 py-2 text-[#111827]";

type Booking = { name: string; service: string; area: string; day: string; slot: string };

/** VoltCare Services: fictional repair company. Bookings and ticket look-ups stay on screen only; nothing is stored or sent. */
export function VoltCareApp() {
  const [category, setCategory] = useState<ServiceCategory | "All">("All");
  const [query, setQuery] = useState("");
  const [serviceId, setServiceId] = useState(services[0].id);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [ticketInput, setTicketInput] = useState("");
  const [lookup, setLookup] = useState<{ asked: string; ticket: Ticket | null } | null>(null);

  const q = query.trim().toLowerCase();
  const shown = services.filter(
    (s) => (category === "All" || s.category === category) && (!q || `${s.name} ${s.blurb}`.toLowerCase().includes(q)),
  );

  function book(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const svc = services.find((s) => s.id === serviceId)!;
    setBooking({
      name: String(data.get("name") ?? ""),
      service: svc.name,
      area: String(data.get("area") ?? ""),
      day: String(data.get("day") ?? ""),
      slot: String(data.get("slot") ?? ""),
    });
  }

  function track(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const asked = ticketInput.trim().toUpperCase();
    setLookup({ asked, ticket: tickets.find((t) => t.id === asked) ?? null });
  }

  const ticket = lookup?.ticket ?? null;

  return (
    <div className="bg-[#F4F5F7] text-[#111827]">
      <header className="bg-[#0A0A0A] text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <p className={`${head} flex items-center gap-2 text-2xl font-bold`}>
            <Zap className="size-7 text-[#A3E635]" aria-hidden="true" /> VoltCare Services
          </p>
          <nav aria-label="VoltCare Services" className="flex flex-wrap gap-1 text-sm font-semibold">
            {[
              ["#vc-services", "Services"],
              ["#vc-book", "Book a visit"],
              ["#vc-track", "Track a ticket"],
              ["#vc-why", "Why VoltCare"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="rounded-lg px-3 py-2 hover:bg-white/15">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-10 sm:px-6">
        <section aria-labelledby="vc-title" className="rounded-2xl bg-[#0A0A0A] p-6 text-white sm:p-10">
          <h1 id="vc-title" className={`${head} max-w-3xl text-4xl font-bold sm:text-6xl`}>
            Electrical and electronics repair, <span className="text-[#A3E635]">at your door</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/90">
            AC, inverter, wiring, TV and home appliance repairs by trained technicians, with the price shown up front.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#vc-book" className={limeBtn}>
              Book a visit
            </a>
            <a href="#vc-track" className="inline-flex items-center rounded-lg border-2 border-white px-5 py-2.5 font-bold hover:bg-white/15">
              Track a ticket
            </a>
          </div>
        </section>

        <section id="vc-services" aria-labelledby="vc-services-title" className="scroll-mt-4">
          <h2 id="vc-services-title" className={`${head} text-3xl font-bold`}>
            Our services
          </h2>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div role="group" aria-label="Filter services by category" className="flex flex-wrap gap-2">
              {(["All", ...categories] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full border-2 px-4 py-1.5 text-sm font-bold ${
                    category === c
                      ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                      : "border-[#0A0A0A] bg-white text-[#0A0A0A] hover:bg-[#ECFCCB]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="relative block grow sm:max-w-xs">
              <span className="sr-only">Search services</span>
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#4B5563]" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services"
                className="w-full rounded-lg border-2 border-[#D1D5DB] bg-white py-2 pr-3 pl-9"
              />
            </label>
          </div>
          <p role="status" className="mt-3 text-sm text-[#4B5563]" data-testid="vc-count">
            {shown.length} {shown.length === 1 ? "service" : "services"}
          </p>
          <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="vc-services">
            {shown.map((s) => (
              <li key={s.id} className="flex flex-col overflow-hidden rounded-xl bg-white" data-testid="vc-service">
                <ArtTile icon={ICONS[s.icon]} tone="#D9F99D" ink="#365314" className="h-24" />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-bold tracking-wide text-[#365314] uppercase">{s.category}</p>
                  <h3 className={`${head} mt-1 text-xl font-bold`}>{s.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-[#374151]">{s.blurb}</p>
                  <p className="mt-3 text-sm text-[#4B5563]">{s.time}</p>
                  <p className="mt-1 text-lg font-bold">From ₹{s.from}</p>
                  <a
                    href="#vc-book"
                    onClick={() => {
                      setServiceId(s.id);
                      setBooking(null);
                    }}
                    aria-label={`Book this: ${s.name}`}
                    className={`${darkBtn} mt-3`}
                  >
                    Book this
                  </a>
                </div>
              </li>
            ))}
          </ul>
          {shown.length === 0 && (
            <p className="mt-3 rounded-lg bg-white p-4" data-testid="vc-empty">
              No service matches your search. Try another word or choose All.
            </p>
          )}
        </section>

        <section id="vc-book" aria-labelledby="vc-book-title" className="scroll-mt-4">
          <h2 id="vc-book-title" className={`${head} text-3xl font-bold`}>
            Book a visit
          </h2>
          <div className="mt-4 rounded-xl bg-white p-6 sm:p-8">
            {booking ? (
              <div data-testid="vc-confirmation" className="rounded-lg bg-[#ECFCCB] p-5">
                <p className="flex items-center gap-2 text-xl font-bold text-[#1A2E05]">
                  <Check className="size-6" aria-hidden="true" /> Demo visit booked
                </p>
                <p className="mt-2">
                  {booking.name}, {booking.service}, {booking.area}, {booking.day}, {booking.slot}.
                </p>
                <p className="mt-2 text-sm">Your demo ticket is VC-2001. Nothing was sent or booked: this is a demonstration.</p>
                <button type="button" className={`${darkBtn} mt-4`} onClick={() => setBooking(null)}>
                  Book another visit
                </button>
              </div>
            ) : (
              <form onSubmit={book} aria-label="Book a visit" className="grid gap-4 sm:grid-cols-2">
                <p className="rounded-lg bg-[#FEF9C3] p-3 text-sm sm:col-span-2">
                  Demonstration only. Use made-up names: nothing is saved or sent.
                </p>
                <label className="block text-sm font-bold sm:col-span-2">
                  Service
                  <select name="service" value={serviceId} onChange={(e) => setServiceId(e.target.value)} className={field}>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-bold">
                  Your name
                  <input name="name" required autoComplete="off" className={field} />
                </label>
                <label className="block text-sm font-bold">
                  Phone number
                  <input name="phone" required inputMode="numeric" pattern="[0-9]{10}" title="Ten digits" autoComplete="off" className={field} />
                </label>
                <label className="block text-sm font-bold">
                  Area
                  <select name="area" className={field}>
                    {areas.map((a) => (
                      <option key={a}>{a}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-bold">
                  Day
                  <select name="day" className={field}>
                    {days.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-bold sm:col-span-2">
                  Time slot
                  <select name="slot" className={field}>
                    {slots.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <div className="sm:col-span-2">
                  <button type="submit" className={limeBtn}>
                    Confirm demo booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        <section id="vc-track" aria-labelledby="vc-track-title" className="scroll-mt-4">
          <h2 id="vc-track-title" className={`${head} text-3xl font-bold`}>
            Track a ticket
          </h2>
          <div className="mt-4 rounded-xl bg-white p-6 sm:p-8">
            <form onSubmit={track} aria-label="Track a ticket" className="flex flex-wrap items-end gap-3">
              <label className="block grow text-sm font-bold sm:max-w-xs">
                Ticket number
                <input
                  value={ticketInput}
                  onChange={(e) => setTicketInput(e.target.value)}
                  required
                  autoComplete="off"
                  placeholder="VC-1002"
                  className={field}
                />
              </label>
              <button type="submit" className={limeBtn}>
                Track
              </button>
            </form>
            <p className="mt-3 text-sm text-[#4B5563]">Demo tickets you can try: VC-1001, VC-1002, VC-1003 and VC-1004.</p>

            {lookup && !ticket && (
              <p role="alert" data-testid="vc-not-found" className="mt-4 rounded-lg bg-[#FEE2E2] p-4 text-[#7F1D1D]">
                No ticket found for {lookup.asked}. Check the number and try again.
              </p>
            )}
            {ticket && (
              <div data-testid="vc-ticket" className="mt-4">
                <p className="font-bold">
                  {ticket.id}: {ticket.service}, {ticket.area}
                </p>
                <ol className="mt-3 grid gap-2 sm:grid-cols-5" data-testid="vc-steps">
                  {ticketSteps.map((label, i) => (
                    <li
                      key={label}
                      aria-current={i === ticket.step ? "step" : undefined}
                      className={`rounded-lg border-2 p-3 text-sm font-bold ${
                        i < ticket.step
                          ? "border-[#365314] bg-[#ECFCCB] text-[#1A2E05]"
                          : i === ticket.step
                            ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                            : "border-[#D1D5DB] bg-white text-[#4B5563]"
                      }`}
                    >
                      {i + 1}. {label}
                    </li>
                  ))}
                </ol>
                <p className="mt-3" data-testid="vc-ticket-note">
                  {ticket.note}
                </p>
              </div>
            )}
          </div>
        </section>

        <section id="vc-why" aria-labelledby="vc-why-title" className="scroll-mt-4">
          <h2 id="vc-why-title" className={`${head} text-3xl font-bold`}>
            Why VoltCare
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3" data-testid="vc-reasons">
            {reasons.map((r) => (
              <li key={r.title} className="rounded-xl border-l-8 border-[#A3E635] bg-white p-5">
                <h3 className={`${head} text-xl font-bold`}>{r.title}</h3>
                <p className="mt-2 text-[#374151]">{r.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="bg-[#0A0A0A] text-white/90">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm sm:px-6">
          <p className={`${head} flex items-center gap-2 text-2xl font-bold text-[#A3E635]`}>
            <Zap className="size-6" aria-hidden="true" /> VoltCare Services
          </p>
          <p className="mt-2">{conceptLabel}</p>
          <p className="mt-1">The company, services, prices, areas and tickets are fictional.</p>
        </div>
      </footer>
    </div>
  );
}
