"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  Backpack,
  Coffee,
  CookingPot,
  Dumbbell,
  Footprints,
  GlassWater,
  Headphones,
  Heart,
  Lamp,
  Layers,
  Search,
  Shirt,
  ShoppingCart,
  Speaker,
  Store,
  Trash,
  Wallet,
  Watch,
  type LucideIcon,
} from "lucide-react";
import { ArtTile } from "@/components/demo/art-tile";
import { DemoDialog } from "@/components/demo/demo-dialog";
import { QtyStepper } from "@/components/demo/qty-stepper";
import { conceptLabel } from "@/data/portfolio";
import {
  FREE_DELIVERY_ABOVE,
  TAX_RATE,
  categories,
  priceBands,
  priceCart,
  products,
  type Category,
  type Product,
  type Totals,
} from "@/data/shopease";
import { inr } from "@/lib/money";
import { useStoredState } from "@/lib/use-stored-state";

const ICONS: Record<Product["icon"], LucideIcon> = {
  earbuds: Headphones,
  speaker: Speaker,
  headphones: Headphones,
  bottle: GlassWater,
  mug: Coffee,
  lamp: Lamp,
  fryer: CookingPot,
  backpack: Backpack,
  shirt: Shirt,
  shoe: Footprints,
  wallet: Wallet,
  mat: Layers,
  dumbbell: Dumbbell,
  band: Activity,
  watch: Watch,
};

type Cart = Record<string, number>;
const EMPTY_CART: Cart = {};
const EMPTY_WISHLIST: string[] = [];

type View = "shop" | "wishlist" | "cart" | "checkout" | "done";
type Payment = "cod" | "upi";
const PAYMENT_LABEL: Record<Payment, string> = { cod: "Pay on delivery (demo)", upi: "UPI (demo)" };

type PlacedOrder = {
  number: string;
  name: string;
  city: string;
  payment: Payment;
  lines: { product: Product; qty: number }[];
  totals: Totals;
};

const head = "font-[family-name:var(--font-se-body)]";
const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#F59E0B] px-5 py-2.5 font-bold text-[#111827] hover:bg-[#D97706] disabled:cursor-not-allowed disabled:opacity-50";
const ghostBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#111827] px-4 py-2 font-bold text-[#111827] hover:bg-[#111827]/5";
const field = "mt-1 w-full rounded-lg border border-[#9CA3AF] bg-white px-3 py-2 text-[#111827]";

export function ShopEaseApp() {
  const [cart, setCart] = useStoredState<Cart>("samarthops-demo-shopease-cart", EMPTY_CART);
  const [wishlist, setWishlist] = useStoredState<string[]>("samarthops-demo-shopease-wishlist", EMPTY_WISHLIST);
  const [view, setView] = useState<View>("shop");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [band, setBand] = useState("any");
  const [detail, setDetail] = useState<Product | null>(null);
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [payment, setPayment] = useState<Payment>("cod");

  const lines = useMemo(
    () => products.filter((p) => (cart[p.id] ?? 0) > 0).map((product) => ({ product, qty: cart[product.id] })),
    [cart],
  );
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const totals = priceCart(lines.reduce((sum, l) => sum + l.product.price * l.qty, 0));

  const selectedBand = priceBands.find((b) => b.id === band) ?? priceBands[0];
  const visible = products.filter((p) => {
    const q = query.trim().toLowerCase();
    return (
      (category === "All" || p.category === category) &&
      p.price >= selectedBand.min &&
      p.price <= selectedBand.max &&
      (q === "" || p.name.toLowerCase().includes(q) || p.blurb.toLowerCase().includes(q))
    );
  });
  const wished = products.filter((p) => wishlist.includes(p.id));
  const filtersActive = query !== "" || category !== "All" || band !== "any";

  function toggleWish(id: string) {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }
  function addToCart(id: string, by = 1) {
    setCart((prev) => ({ ...prev, [id]: Math.min((prev[id] ?? 0) + by, 20) }));
  }
  function setQty(id: string, qty: number) {
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = Math.min(qty, 20);
      return next;
    });
  }
  function go(next: View) {
    setView(next);
    document.getElementById("se-top")?.scrollIntoView();
  }
  function placeOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setOrder({
      number: `SE-${Date.now().toString().slice(-6)}`,
      name: String(data.get("name") ?? ""),
      city: String(data.get("city") ?? ""),
      payment,
      lines,
      totals,
    });
    setCart({});
    go("done");
  }

  const tab = (id: View, label: string, badge?: number) => (
    <button
      type="button"
      onClick={() => go(id)}
      aria-current={view === id ? "page" : undefined}
      className={`rounded-lg px-3 py-2 text-sm font-bold ${view === id ? "bg-[#F59E0B] text-[#111827]" : "text-white hover:bg-white/10"}`}
    >
      {label}
      {badge !== undefined && <span data-testid={`se-badge-${id}`}> ({badge})</span>}
    </button>
  );

  return (
    <div className="bg-[#F3F4F6] text-[#111827]" id="se-top">
      <header className="bg-[#111827] text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <p className={`${head} flex items-center gap-2 text-2xl font-extrabold`}>
            <Store className="size-6 text-[#F59E0B]" aria-hidden="true" /> ShopEase
          </p>
          <nav aria-label="ShopEase" className="flex flex-wrap items-center gap-1">
            {tab("shop", "Shop")}
            {tab("wishlist", "Wishlist", wished.length)}
            {tab("cart", "Cart", count)}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {view === "shop" && (
          <section aria-labelledby="se-shop-title">
            <h1 id="se-shop-title" className={`${head} text-3xl font-extrabold sm:text-4xl`}>
              Everyday essentials, easy to find
            </h1>
            <p className="mt-2 max-w-xl text-[#374151]">Search, filter, save favourites and check out in a few steps.</p>

            <div className="mt-6 grid gap-4 rounded-xl bg-white p-4 sm:grid-cols-[1fr_14rem]">
              <label className="block text-sm font-bold">
                Search products
                <span className="relative mt-1 block">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#6B7280]" aria-hidden="true" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Try “bottle” or “lamp”"
                    className="w-full rounded-lg border border-[#9CA3AF] py-2 pr-3 pl-9 font-normal"
                  />
                </span>
              </label>
              <label className="block text-sm font-bold">
                Price
                <select value={band} onChange={(e) => setBand(e.target.value)} className={field}>
                  {priceBands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </label>
              <div role="group" aria-label="Categories" className="flex flex-wrap gap-2 sm:col-span-2">
                {(["All", ...categories] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={category === c}
                    onClick={() => setCategory(c)}
                    className={`rounded-full border-2 px-4 py-1.5 text-sm font-bold ${
                      category === c
                        ? "border-[#111827] bg-[#111827] text-white"
                        : "border-[#111827] bg-white text-[#111827] hover:bg-[#111827]/5"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm text-[#374151]" role="status" data-testid="se-result-count">
              {visible.length} {visible.length === 1 ? "product" : "products"}
            </p>
            {visible.length === 0 ? (
              <div className="mt-4 rounded-xl bg-white p-8 text-center">
                <p className="font-bold">No products match your search.</p>
                {filtersActive && (
                  <button
                    type="button"
                    className={`${ghostBtn} mt-4`}
                    onClick={() => {
                      setQuery("");
                      setCategory("All");
                      setBand("any");
                    }}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="se-products">
                {visible.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    wished={wishlist.includes(p.id)}
                    onWish={() => toggleWish(p.id)}
                    onDetail={() => setDetail(p)}
                    onAdd={() => addToCart(p.id)}
                  />
                ))}
              </ul>
            )}
          </section>
        )}

        {view === "wishlist" && (
          <section aria-labelledby="se-wish-title">
            <h1 id="se-wish-title" className={`${head} text-3xl font-extrabold`}>
              Your wishlist
            </h1>
            {wished.length === 0 ? (
              <div className="mt-4 rounded-xl bg-white p-8 text-center">
                <p className="font-bold">Your wishlist is empty.</p>
                <button type="button" className={`${ghostBtn} mt-4`} onClick={() => go("shop")}>
                  Browse products
                </button>
              </div>
            ) : (
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="se-wishlist">
                {wished.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    wished
                    onWish={() => toggleWish(p.id)}
                    onDetail={() => setDetail(p)}
                    onAdd={() => addToCart(p.id)}
                  />
                ))}
              </ul>
            )}
          </section>
        )}

        {view === "cart" && (
          <section aria-labelledby="se-cart-title">
            <h1 id="se-cart-title" className={`${head} text-3xl font-extrabold`}>
              Your cart
            </h1>
            {lines.length === 0 ? (
              <div className="mt-4 rounded-xl bg-white p-8 text-center">
                <p className="font-bold">Your cart is empty.</p>
                <button type="button" className={`${ghostBtn} mt-4`} onClick={() => go("shop")}>
                  Continue shopping
                </button>
              </div>
            ) : (
              <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_22rem]">
                <ul className="divide-y divide-[#E5E7EB] rounded-xl bg-white" data-testid="se-cart-lines">
                  {lines.map((l) => (
                    <li key={l.product.id} className="flex flex-wrap items-center gap-4 p-4">
                      <ArtTile icon={ICONS[l.product.icon]} tone={l.product.tone} className="size-16 rounded-lg" />
                      <div className="min-w-40 flex-1">
                        <p className="font-bold">{l.product.name}</p>
                        <p className="text-sm text-[#374151]">{inr(l.product.price)} each</p>
                      </div>
                      <QtyStepper value={l.qty} label={l.product.name} onChange={(q) => setQty(l.product.id, q)} />
                      <p className="w-24 text-right font-bold">{inr(l.product.price * l.qty)}</p>
                      <button
                        type="button"
                        onClick={() => setQty(l.product.id, 0)}
                        className="inline-flex items-center gap-1 text-sm font-bold text-[#B91C1C] underline"
                      >
                        <Trash className="size-4" aria-hidden="true" />
                        Remove<span className="sr-only"> {l.product.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="self-start rounded-xl bg-white p-5">
                  <h2 className="text-xl font-extrabold">Order summary</h2>
                  <TotalsList totals={totals} />
                  <p className="mt-2 text-xs text-[#374151]">
                    Delivery is free on orders of {inr(FREE_DELIVERY_ABOVE)} and above.
                  </p>
                  <button type="button" className={`${primaryBtn} mt-4 w-full`} onClick={() => go("checkout")}>
                    Proceed to checkout
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {view === "checkout" && (
          <section aria-labelledby="se-checkout-title">
            <h1 id="se-checkout-title" className={`${head} text-3xl font-extrabold`}>
              Checkout
            </h1>
            {lines.length === 0 ? (
              <div className="mt-4 rounded-xl bg-white p-8 text-center">
                <p className="font-bold">Your cart is empty.</p>
                <button type="button" className={`${ghostBtn} mt-4`} onClick={() => go("shop")}>
                  Continue shopping
                </button>
              </div>
            ) : (
              <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_22rem]">
                <form onSubmit={placeOrder} aria-label="Checkout form" className="space-y-4 rounded-xl bg-white p-5">
                  <p className="rounded-lg bg-[#FEF3C7] p-3 text-sm">
                    Demonstration only. Enter made-up details: nothing is saved, sent or charged.
                  </p>
                  <label className="block text-sm font-bold">
                    Full name
                    <input name="name" required autoComplete="off" className={field} />
                  </label>
                  <label className="block text-sm font-bold">
                    Delivery address
                    <input name="address" required autoComplete="off" className={field} />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-bold">
                      City
                      <input name="city" required autoComplete="off" className={field} />
                    </label>
                    <label className="block text-sm font-bold">
                      PIN code
                      <input name="pin" required inputMode="numeric" pattern="[0-9]{6}" title="Six digits" autoComplete="off" className={field} />
                    </label>
                  </div>
                  <fieldset>
                    <legend className="text-sm font-bold">Payment method</legend>
                    <div className="mt-2 space-y-2">
                      {(Object.keys(PAYMENT_LABEL) as Payment[]).map((p) => (
                        <label key={p} className="flex items-center gap-2">
                          <input type="radio" name="payment" value={p} checked={payment === p} onChange={() => setPayment(p)} />
                          {PAYMENT_LABEL[p]}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <button type="submit" className={`${primaryBtn} w-full sm:w-auto`}>
                    Place demo order
                  </button>
                </form>
                <div className="self-start rounded-xl bg-white p-5">
                  <h2 className="text-xl font-extrabold">Order summary</h2>
                  <ul className="mt-2 divide-y divide-[#E5E7EB] text-sm">
                    {lines.map((l) => (
                      <li key={l.product.id} className="flex justify-between gap-3 py-2">
                        <span>
                          {l.qty} x {l.product.name}
                        </span>
                        <span>{inr(l.qty * l.product.price)}</span>
                      </li>
                    ))}
                  </ul>
                  <TotalsList totals={totals} />
                </div>
              </div>
            )}
          </section>
        )}

        {view === "done" && order && (
          <section aria-labelledby="se-done-title" data-testid="se-confirmation" className="rounded-xl bg-white p-6">
            <h1 id="se-done-title" className={`${head} text-3xl font-extrabold text-[#047857]`}>
              Demo order placed
            </h1>
            <p className="mt-2">
              Order number <strong data-testid="se-order-number">{order.number}</strong>
            </p>
            <p className="mt-1 text-sm text-[#374151]">
              For {order.name}, {order.city}. Payment: {PAYMENT_LABEL[order.payment]}.
            </p>
            <ul className="mt-4 max-w-md divide-y divide-[#E5E7EB] text-sm">
              {order.lines.map((l) => (
                <li key={l.product.id} className="flex justify-between gap-3 py-2">
                  <span>
                    {l.qty} x {l.product.name}
                  </span>
                  <span>{inr(l.qty * l.product.price)}</span>
                </li>
              ))}
            </ul>
            <div className="max-w-md">
              <TotalsList totals={order.totals} />
            </div>
            <p className="mt-4 text-sm text-[#374151]">
              This is a demonstration. No payment was taken and nothing was sent anywhere.
            </p>
            <button
              type="button"
              className={`${primaryBtn} mt-4`}
              onClick={() => {
                setOrder(null);
                go("shop");
              }}
            >
              Continue shopping
            </button>
          </section>
        )}
      </div>

      <footer className="bg-[#111827] text-white/90">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm sm:px-6">
          <p className={`${head} text-lg font-extrabold text-white`}>ShopEase</p>
          <p className="mt-1">{conceptLabel}</p>
          <p className="mt-1">All products, prices and details are fictional.</p>
        </div>
      </footer>

      <DemoDialog open={detail !== null} onClose={() => setDetail(null)} title={detail?.name ?? ""} className="text-[#111827]">
        {detail && (
          <ProductDetail
            product={detail}
            wished={wishlist.includes(detail.id)}
            onWish={() => toggleWish(detail.id)}
            onAdd={(q) => {
              addToCart(detail.id, q);
              setDetail(null);
            }}
          />
        )}
      </DemoDialog>
    </div>
  );
}

function ProductCard({
  product: p,
  wished,
  onWish,
  onDetail,
  onAdd,
}: {
  product: Product;
  wished: boolean;
  onWish: () => void;
  onDetail: () => void;
  onAdd: () => void;
}) {
  return (
    <li className="relative flex flex-col overflow-hidden rounded-xl bg-white" data-testid="se-product">
      <ArtTile icon={ICONS[p.icon]} tone={p.tone} className="h-36" />
      <button
        type="button"
        onClick={onWish}
        aria-pressed={wished}
        aria-label={`Wishlist ${p.name}`}
        className="absolute top-2 right-2 grid size-10 place-items-center rounded-full bg-white shadow"
      >
        <Heart className={`size-5 ${wished ? "fill-[#E11D48] text-[#E11D48]" : "text-[#111827]"}`} aria-hidden="true" />
      </button>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-bold tracking-wide text-[#4B5563] uppercase">{p.category}</p>
        <h3 className="mt-1 text-lg font-extrabold">{p.name}</h3>
        <p className="mt-1 flex-1 text-sm text-[#374151]">{p.blurb}</p>
        <p className="mt-3 text-xl font-extrabold">{inr(p.price)}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" className={ghostBtn} onClick={onDetail}>
            Details<span className="sr-only"> of {p.name}</span>
          </button>
          <button type="button" className={primaryBtn} onClick={onAdd}>
            <ShoppingCart className="size-4" aria-hidden="true" />
            Add<span className="sr-only"> {p.name} to cart</span>
          </button>
        </div>
      </div>
    </li>
  );
}

function ProductDetail({
  product: p,
  wished,
  onWish,
  onAdd,
}: {
  product: Product;
  wished: boolean;
  onWish: () => void;
  onAdd: (qty: number) => void;
}) {
  const [qty, setQty] = useState(1);
  return (
    <div>
      <ArtTile icon={ICONS[p.icon]} tone={p.tone} className="h-36 rounded-xl" />
      <p className="mt-4 text-2xl font-extrabold">{inr(p.price)}</p>
      <p className="mt-2">{p.detail}</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#374151]">
        {p.specs.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <QtyStepper value={qty} label={p.name} onChange={setQty} />
        <button type="button" onClick={onWish} aria-pressed={wished} className={ghostBtn}>
          <Heart className={`size-4 ${wished ? "fill-[#E11D48] text-[#E11D48]" : ""}`} aria-hidden="true" />
          {wished ? "In wishlist" : "Add to wishlist"}
        </button>
      </div>
      <button type="button" className={`${primaryBtn} mt-4 w-full`} onClick={() => onAdd(qty)}>
        Add to cart · {inr(p.price * qty)}
      </button>
    </div>
  );
}

function TotalsList({ totals }: { totals: Totals }) {
  return (
    <dl className="mt-4 space-y-1 text-sm" data-testid="se-totals">
      <div className="flex justify-between">
        <dt>Subtotal</dt>
        <dd data-testid="se-subtotal">{inr(totals.subtotal)}</dd>
      </div>
      <div className="flex justify-between">
        <dt>GST ({Math.round(TAX_RATE * 100)}%)</dt>
        <dd data-testid="se-tax">{inr(totals.tax)}</dd>
      </div>
      <div className="flex justify-between">
        <dt>Delivery</dt>
        <dd data-testid="se-delivery">{totals.delivery === 0 ? "Free" : inr(totals.delivery)}</dd>
      </div>
      <div className="flex justify-between border-t border-[#E5E7EB] pt-2 text-base font-extrabold">
        <dt>Total</dt>
        <dd data-testid="se-total">{inr(totals.total)}</dd>
      </div>
    </dl>
  );
}
