"use client";

import { useState } from "react";
import {
  Bath,
  BedDouble,
  Building2,
  ChevronLeft,
  ChevronRight,
  CookingPot,
  Heart,
  MapPin,
  Ruler,
  Search,
  Sofa,
  TreePine,
  type LucideIcon,
} from "lucide-react";
import { ArtTile } from "@/components/demo/art-tile";
import { DemoDialog } from "@/components/demo/demo-dialog";
import { conceptLabel } from "@/data/portfolio";
import {
  galleryViews,
  listings,
  locations,
  priceBands,
  priceLabel,
  visitDays,
  visitTimes,
  type Listing,
  type Location,
} from "@/data/primeestate";
import { useStoredState } from "@/lib/use-stored-state";

const VIEW_ICONS: Record<(typeof galleryViews)[number]["icon"], LucideIcon> = {
  sofa: Sofa,
  bed: BedDouble,
  kitchen: CookingPot,
  tree: TreePine,
};

const EMPTY_WISHLIST: string[] = [];
type View = "browse" | "saved";

const serif = "font-[family-name:var(--font-pe-head)]";
const goldBtn =
  "inline-flex items-center justify-center gap-2 rounded-sm bg-[#C9A227] px-5 py-2.5 font-semibold tracking-wide text-[#14213D] hover:bg-[#B08D1E] disabled:cursor-not-allowed disabled:opacity-50";
const outlineBtn =
  "inline-flex items-center justify-center gap-2 rounded-sm border border-[#14213D] px-4 py-2 font-semibold text-[#14213D] hover:bg-[#14213D]/5";
const field = "mt-1 w-full rounded-sm border border-[#8A8F9C] bg-white px-3 py-2 text-[#14213D]";

/** PrimeEstate: fictional property listings. Only the wishlist (listing ids) is kept, in this browser. */
export function PrimeEstateApp() {
  const [wishlist, setWishlist] = useStoredState<string[]>("samarthops-demo-primeestate-wishlist", EMPTY_WISHLIST);
  const [view, setView] = useState<View>("browse");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState<Location | "all">("all");
  const [band, setBand] = useState("any");
  const [detail, setDetail] = useState<Listing | null>(null);

  const selectedBand = priceBands.find((b) => b.id === band) ?? priceBands[0];
  const visible = listings.filter((l) => {
    const q = query.trim().toLowerCase();
    return (
      (location === "all" || l.location === location) &&
      l.priceLakh >= selectedBand.min &&
      l.priceLakh <= selectedBand.max &&
      (q === "" || `${l.title} ${l.locality} ${l.location} ${l.type}`.toLowerCase().includes(q))
    );
  });
  const saved = listings.filter((l) => wishlist.includes(l.id));
  const filtersActive = query !== "" || location !== "all" || band !== "any";

  function toggleWish(id: string) {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }
  function go(next: View) {
    setView(next);
    document.getElementById("pe-top")?.scrollIntoView();
  }

  const navBtn = (id: View, label: string, badge?: number) => (
    <button
      type="button"
      onClick={() => go(id)}
      aria-current={view === id ? "page" : undefined}
      className={`px-3 py-2 text-sm font-semibold tracking-wide uppercase ${
        view === id ? "border-b-2 border-[#C9A227] text-[#C9A227]" : "border-b-2 border-transparent text-white hover:text-[#C9A227]"
      }`}
    >
      {label}
      {badge !== undefined && <span data-testid="pe-saved-count"> ({badge})</span>}
    </button>
  );

  return (
    <div className="bg-[#FAF7F0] text-[#14213D]" id="pe-top">
      <header className="bg-[#14213D] text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <p className={`${serif} flex items-center gap-2 text-3xl font-semibold tracking-wide`}>
            <Building2 className="size-7 text-[#C9A227]" aria-hidden="true" /> PrimeEstate
          </p>
          <nav aria-label="PrimeEstate" className="flex items-center gap-2">
            {navBtn("browse", "Properties")}
            {navBtn("saved", "Wishlist", saved.length)}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {view === "browse" && (
          <section aria-labelledby="pe-title" className="relative">
            <Building2 aria-hidden="true" strokeWidth={1} className="pointer-events-none absolute top-0 right-0 hidden size-28 text-[#C9A227]/30 lg:block" />
            <h1 id="pe-title" className={`${serif} text-4xl font-semibold sm:text-5xl`}>
              Find a home worth coming back to
            </h1>
            <p className="mt-3 max-w-xl text-[#3B4560]">
              Browse homes in three fictional localities, save your favourites and book a visit.
            </p>

            <div className="mt-8 grid gap-4 border border-[#D9D2BF] bg-white p-4 sm:grid-cols-3">
              <label className="block text-sm font-semibold">
                Search listings
                <span className="relative mt-1 block">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#5B6478]" aria-hidden="true" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Try “villa” or “Pine”"
                    className="w-full rounded-sm border border-[#8A8F9C] py-2 pr-3 pl-9 font-normal"
                  />
                </span>
              </label>
              <label className="block text-sm font-semibold">
                Location
                <select value={location} onChange={(e) => setLocation(e.target.value as Location | "all")} className={field}>
                  <option value="all">All locations</option>
                  {locations.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-semibold">
                Price
                <select value={band} onChange={(e) => setBand(e.target.value)} className={field}>
                  {priceBands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <p role="status" className="mt-4 text-sm text-[#3B4560]" data-testid="pe-count">
              {visible.length} {visible.length === 1 ? "property" : "properties"}
            </p>
            {visible.length === 0 ? (
              <div className="mt-4 border border-[#D9D2BF] bg-white p-8 text-center">
                <p className="font-semibold">No properties match your search.</p>
                {filtersActive && (
                  <button
                    type="button"
                    className={`${outlineBtn} mt-4`}
                    onClick={() => {
                      setQuery("");
                      setLocation("all");
                      setBand("any");
                    }}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-testid="pe-listings">
                {visible.map((l) => (
                  <ListingCard key={l.id} listing={l} wished={wishlist.includes(l.id)} onWish={() => toggleWish(l.id)} onDetail={() => setDetail(l)} />
                ))}
              </ul>
            )}
          </section>
        )}

        {view === "saved" && (
          <section aria-labelledby="pe-saved-title">
            <h1 id="pe-saved-title" className={`${serif} text-4xl font-semibold`}>
              Your wishlist
            </h1>
            {saved.length === 0 ? (
              <div className="mt-6 border border-[#D9D2BF] bg-white p-8 text-center">
                <p className="font-semibold">You have not saved any properties yet.</p>
                <button type="button" className={`${outlineBtn} mt-4`} onClick={() => go("browse")}>
                  Browse properties
                </button>
              </div>
            ) : (
              <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-testid="pe-wishlist">
                {saved.map((l) => (
                  <ListingCard key={l.id} listing={l} wished onWish={() => toggleWish(l.id)} onDetail={() => setDetail(l)} />
                ))}
              </ul>
            )}
          </section>
        )}
      </div>

      <footer className="bg-[#14213D] text-white/90">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:py-8 text-xs sm:text-sm sm:px-6">
          <p className={`${serif} text-2xl font-semibold text-[#C9A227]`}>PrimeEstate</p>
          <p className="mt-2">{conceptLabel}</p>
          <p className="mt-1">All listings, localities, prices and details are fictional. Nothing on this page is an offer.</p>
        </div>
      </footer>

      <DemoDialog
        open={detail !== null}
        onClose={() => setDetail(null)}
        title={detail?.title ?? ""}
        className="w-[min(44rem,calc(100vw-2rem))] rounded-sm text-[#14213D]"
      >
        {detail && <ListingDetail key={detail.id} listing={detail} wished={wishlist.includes(detail.id)} onWish={() => toggleWish(detail.id)} />}
      </DemoDialog>
    </div>
  );
}

function ListingCard({
  listing: l,
  wished,
  onWish,
  onDetail,
}: {
  listing: Listing;
  wished: boolean;
  onWish: () => void;
  onDetail: () => void;
}) {
  return (
    <li className="relative flex flex-col overflow-hidden border border-[#D9D2BF] bg-white" data-testid="pe-listing">
      <ArtTile icon={Building2} tone={l.tone} ink="#14213D" className="h-40" />
      <button
        type="button"
        onClick={onWish}
        aria-pressed={wished}
        aria-label={`Save ${l.title} to wishlist`}
        className="absolute top-2 right-2 grid size-10 place-items-center rounded-full bg-white shadow"
      >
        <Heart className={`size-5 ${wished ? "fill-[#B91C1C] text-[#B91C1C]" : "text-[#14213D]"}`} aria-hidden="true" />
      </button>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold tracking-widest text-[#7A5F0B] uppercase">{l.type}</p>
        <h3 className={`${serif} mt-1 text-2xl font-semibold`}>{l.title}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-[#3B4560]">
          <MapPin className="size-4" aria-hidden="true" /> {l.locality}, {l.location}
        </p>
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <span className="inline-flex items-center gap-1">
            <BedDouble className="size-4" aria-hidden="true" /> {l.beds} bed
          </span>
          <span className="inline-flex items-center gap-1">
            <Bath className="size-4" aria-hidden="true" /> {l.baths} bath
          </span>
          <span className="inline-flex items-center gap-1">
            <Ruler className="size-4" aria-hidden="true" /> {l.areaSqft} sq ft
          </span>
        </p>
        <p className={`${serif} mt-3 flex-1 text-2xl font-semibold`}>{priceLabel(l.priceLakh)}</p>
        <button type="button" className={`${outlineBtn} mt-4 self-start`} onClick={onDetail}>
          View details<span className="sr-only"> of {l.title}</span>
        </button>
      </div>
    </li>
  );
}

function ListingDetail({ listing: l, wished, onWish }: { listing: Listing; wished: boolean; onWish: () => void }) {
  const [index, setIndex] = useState(0);
  const [visit, setVisit] = useState<{ name: string; day: string; time: string } | null>(null);
  const current = galleryViews[index];
  const Icon = VIEW_ICONS[current.icon];
  const last = galleryViews.length - 1;

  function book(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setVisit({ name: String(data.get("name") ?? ""), day: String(data.get("day") ?? ""), time: String(data.get("time") ?? "") });
  }

  return (
    <div>
      <div className="relative" data-testid="pe-gallery">
        <ArtTile icon={Icon} tone={l.tone} ink="#14213D" className="h-52 sm:h-64" />
        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => setIndex((i) => (i === 0 ? last : i - 1))}
          className="absolute top-1/2 left-2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white shadow"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => setIndex((i) => (i === last ? 0 : i + 1))}
          className="absolute top-1/2 right-2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white shadow"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
      <p role="status" className="mt-2 text-sm font-semibold" data-testid="pe-gallery-caption">
        {current.label} ({index + 1} of {galleryViews.length})
      </p>
      <ul aria-label="Gallery thumbnails" className="mt-2 flex gap-2">
        {galleryViews.map((v, i) => {
          const ThumbIcon = VIEW_ICONS[v.icon];
          return (
            <li key={v.id}>
              <button
                type="button"
                aria-label={`Show ${v.label}`}
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
                className={`grid size-12 place-items-center border-2 ${i === index ? "border-[#C9A227]" : "border-[#D9D2BF]"}`}
                style={{ background: l.tone }}
              >
                <ThumbIcon className="size-5" aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>

      <p className={`${serif} mt-4 text-3xl font-semibold`}>{priceLabel(l.priceLakh)}</p>
      <p className="text-sm text-[#3B4560]">
        {l.type} in {l.locality}, {l.location}: {l.beds} bed, {l.baths} bath, {l.areaSqft} sq ft
      </p>
      <p className="mt-3">{l.blurb}</p>
      <ul className="mt-3 grid list-disc gap-1 pl-5 text-sm sm:grid-cols-2">
        {l.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      <button type="button" onClick={onWish} aria-pressed={wished} className={`${outlineBtn} mt-4`}>
        <Heart className={`size-4 ${wished ? "fill-[#B91C1C] text-[#B91C1C]" : ""}`} aria-hidden="true" />
        {wished ? "Saved to wishlist" : "Save to wishlist"}
      </button>

      <div className="mt-6 border-t border-[#D9D2BF] pt-5">
        <h3 className={`${serif} text-2xl font-semibold`}>Schedule a visit</h3>
        {visit ? (
          <div data-testid="pe-visit-confirmation" className="mt-3 border border-[#C9A227] bg-[#FBF3D5] p-4">
            <p className="font-semibold">Demo visit scheduled</p>
            <p className="mt-1 text-sm">
              {visit.name}, {visit.day}, {visit.time}, {l.title}.
            </p>
            <p className="mt-1 text-sm text-[#3B4560]">This is a demonstration. Nothing was sent or booked.</p>
            <button type="button" className={`${outlineBtn} mt-3`} onClick={() => setVisit(null)}>
              Schedule another visit
            </button>
          </div>
        ) : (
          <form onSubmit={book} aria-label="Schedule a visit" className="mt-3 grid gap-3 sm:grid-cols-2">
            <p className="bg-[#FBF3D5] p-3 text-sm sm:col-span-2">Demonstration only. Use made-up details: nothing is saved or sent.</p>
            <label className="block text-sm font-semibold">
              Your name
              <input name="name" required autoComplete="off" className={field} />
            </label>
            <label className="block text-sm font-semibold">
              Phone number
              <input name="phone" required inputMode="numeric" pattern="[0-9]{10}" title="Ten digits" autoComplete="off" className={field} />
            </label>
            <label className="block text-sm font-semibold">
              Day
              <select name="day" className={field}>
                {visitDays.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-semibold">
              Time
              <select name="time" className={field}>
                {visitTimes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <div className="sm:col-span-2">
              <button type="submit" className={goldBtn}>
                Schedule demo visit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
