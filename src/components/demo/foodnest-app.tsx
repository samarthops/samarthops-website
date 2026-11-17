"use client";

import { useMemo, useState } from "react";
import {
  Cake,
  ChefHat,
  Citrus,
  Coffee,
  CookingPot,
  CupSoda,
  Drumstick,
  Flame,
  IceCreamCone,
  Cookie,
  Milk,
  Salad,
  ShoppingBag,
  Soup,
  Trash,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import { ArtTile } from "@/components/demo/art-tile";
import { DemoDialog } from "@/components/demo/demo-dialog";
import { QtyStepper } from "@/components/demo/qty-stepper";
import { conceptLabel } from "@/data/portfolio";
import { TAX_RATE, categories, menu, priceOrder, type MenuItem, type Totals } from "@/data/foodnest";
import { inr } from "@/lib/money";
import { useStoredState } from "@/lib/use-stored-state";

const ICONS: Record<MenuItem["icon"], LucideIcon> = {
  soup: Soup,
  salad: Salad,
  flame: Flame,
  drumstick: Drumstick,
  pot: CookingPot,
  wheat: Wheat,
  cake: Cake,
  cone: IceCreamCone,
  cookie: Cookie,
  milk: Milk,
  coffee: Coffee,
  citrus: Citrus,
  soda: CupSoda,
};

type Cart = Record<string, number>;
const EMPTY_CART: Cart = {};

type PlacedOrder = { number: string; lines: { item: MenuItem; qty: number }[]; totals: Totals };

const head = "font-[family-name:var(--font-fn-head)]";
const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[#B83B0B] px-5 py-2.5 font-bold text-white hover:bg-[#9A300A] disabled:cursor-not-allowed disabled:opacity-50";
const ghostBtn =
  "inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#B83B0B] px-4 py-2 font-bold text-[#B83B0B] hover:bg-[#B83B0B]/10";

function VegMark({ veg }: { veg: boolean }) {
  return (
    <span
      role="img"
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
      className={`inline-grid size-4 shrink-0 place-items-center rounded-sm border-2 ${veg ? "border-[#2F7D32]" : "border-[#B3261E]"}`}
    >
      <span className={`size-2 rounded-full ${veg ? "bg-[#2F7D32]" : "bg-[#B3261E]"}`} />
    </span>
  );
}

export function FoodNestApp() {
  const [cart, setCart] = useStoredState<Cart>("samarthops-demo-foodnest-cart", EMPTY_CART);
  const [category, setCategory] = useState(categories[0].id);
  const [detail, setDetail] = useState<MenuItem | null>(null);
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  const lines = useMemo(
    () =>
      menu
        .filter((m) => (cart[m.id] ?? 0) > 0)
        .map((item) => ({ item, qty: cart[item.id] })),
    [cart],
  );
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const totals = priceOrder(lines.reduce((sum, l) => sum + l.item.price * l.qty, 0));
  const items = menu.filter((m) => m.category === category);

  function setQty(id: string, qty: number) {
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = Math.min(qty, 20);
      return next;
    });
  }

  function addToCart(id: string, by = 1) {
    setCart((prev) => ({ ...prev, [id]: Math.min((prev[id] ?? 0) + by, 20) }));
  }

  function placeOrder() {
    if (lines.length === 0) return;
    setOrder({ number: `FN-${Date.now().toString().slice(-5)}`, lines, totals });
    setCart({});
    document.getElementById("fn-top")?.scrollIntoView();
  }

  return (
    <div className="bg-[#FFF8F0] pb-20 text-[#3B1F0F] lg:pb-0" id="fn-top">
      <header className="border-b border-[#EAD7C3] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <p className={`${head} flex items-center gap-2 text-2xl font-bold text-[#B83B0B]`}>
            <ChefHat className="size-7" aria-hidden="true" /> FoodNest
          </p>
          <nav aria-label="FoodNest" className="flex items-center gap-5 text-sm font-bold">
            <a href="#fn-menu" className="inline-flex min-h-11 items-center hover:underline">
              Menu
            </a>
            <a href="#fn-cart" className="inline-flex min-h-11 items-center gap-1.5 hover:underline">
              <ShoppingBag className="size-4" aria-hidden="true" />
              Your order <span data-testid="fn-count">({count})</span>
            </a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#FDE7D3]">
        <CookingPot aria-hidden="true" strokeWidth={1} className="pointer-events-none absolute top-1/2 right-8 hidden size-56 -translate-y-1/2 text-[#B83B0B]/15 lg:block" />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <h1 className={`${head} max-w-2xl text-4xl font-bold text-[#7A2E0E] sm:text-5xl`}>
            Home-style food, ordered in a few taps
          </h1>
          <p className="mt-3 max-w-xl text-lg">
            Pick your dishes, adjust quantities and see your total with tax and delivery before you order.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_22rem]">
        <section id="fn-menu" aria-labelledby="fn-menu-title" className="scroll-mt-4">
          <h2 id="fn-menu-title" className={`${head} text-3xl font-bold`}>
            Menu
          </h2>
          <div role="group" aria-label="Menu categories" className="mt-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={category === c.id}
                onClick={() => setCategory(c.id)}
                className={`rounded-full border-2 px-4 py-2 text-sm font-bold ${
                  category === c.id
                    ? "border-[#B83B0B] bg-[#B83B0B] text-white"
                    : "border-[#B83B0B] bg-white text-[#B83B0B] hover:bg-[#B83B0B]/10"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {items.map((m) => {
              const qty = cart[m.id] ?? 0;
              return (
                <li key={m.id} className="flex flex-col overflow-hidden rounded-2xl border border-[#EAD7C3] bg-white">
                  <ArtTile icon={ICONS[m.icon]} tone={m.tone} ink="#7A2E0E" className="h-28" />
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className={`${head} flex items-center gap-2 text-lg font-bold`}>
                        <VegMark veg={m.veg} /> {m.name}
                      </h3>
                      <p className="font-bold">{inr(m.price)}</p>
                    </div>
                    <p className="mt-1 flex-1 text-sm text-[#5C4030]">{m.blurb}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <button type="button" className={ghostBtn} onClick={() => setDetail(m)}>
                        Details<span className="sr-only"> of {m.name}</span>
                      </button>
                      {qty === 0 ? (
                        <button type="button" className={primaryBtn} onClick={() => addToCart(m.id)}>
                          Add<span className="sr-only"> {m.name} to order</span>
                        </button>
                      ) : (
                        <QtyStepper
                          value={qty}
                          label={m.name}
                          min={0}
                          onChange={(q) => setQty(m.id, q)}
                          className="text-[#B83B0B]"
                        />
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <aside id="fn-cart" aria-labelledby="fn-cart-title" className="scroll-mt-4 lg:sticky lg:top-4 lg:self-start">
          <div className="rounded-2xl border border-[#EAD7C3] bg-white p-5">
            {order ? (
              <div role="status" data-testid="fn-confirmation">
                <h2 id="fn-cart-title" className={`${head} text-2xl font-bold text-[#2F7D32]`}>
                  Demo order placed
                </h2>
                <p className="mt-1 text-sm">
                  Order number <strong data-testid="fn-order-number">{order.number}</strong>
                </p>
                <ul className="mt-4 divide-y divide-[#EAD7C3] text-sm">
                  {order.lines.map((l) => (
                    <li key={l.item.id} className="flex justify-between gap-3 py-2">
                      <span>
                        {l.qty} x {l.item.name}
                      </span>
                      <span>{inr(l.qty * l.item.price)}</span>
                    </li>
                  ))}
                </ul>
                <TotalsList totals={order.totals} />
                <p className="mt-4 text-sm text-[#5C4030]">
                  This is a demonstration. No payment was taken and nothing was sent anywhere.
                </p>
                <button type="button" className={`${primaryBtn} mt-4 w-full`} onClick={() => setOrder(null)}>
                  Start a new order
                </button>
              </div>
            ) : (
              <>
                <h2 id="fn-cart-title" className={`${head} text-2xl font-bold`}>
                  Your order
                </h2>
                {lines.length === 0 ? (
                  <p className="mt-3 text-[#5C4030]">Your order is empty. Add a dish from the menu.</p>
                ) : (
                  <ul className="mt-3 divide-y divide-[#EAD7C3]" data-testid="fn-lines">
                    {lines.map((l) => (
                      <li key={l.item.id} className="py-3">
                        <div className="flex justify-between gap-3">
                          <p className="font-bold">{l.item.name}</p>
                          <p className="font-bold">{inr(l.item.price * l.qty)}</p>
                        </div>
                        <p className="text-sm text-[#5C4030]">{inr(l.item.price)} each</p>
                        <div className="mt-2 flex items-center justify-between">
                          <QtyStepper
                            value={l.qty}
                            label={l.item.name}
                            onChange={(q) => setQty(l.item.id, q)}
                            className="text-[#B83B0B]"
                          />
                          <button
                            type="button"
                            onClick={() => setQty(l.item.id, 0)}
                            className="inline-flex items-center gap-1 text-sm font-bold text-[#B3261E] underline"
                          >
                            <Trash className="size-4" aria-hidden="true" />
                            Remove<span className="sr-only"> {l.item.name}</span>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {lines.length > 0 && <TotalsList totals={totals} />}
                <button type="button" className={`${primaryBtn} mt-5 w-full`} disabled={lines.length === 0} onClick={placeOrder}>
                  Place demo order
                </button>
                <p className="mt-3 text-xs text-[#5C4030]">
                  Demo only: no payment is taken and nothing is sent. Prices are fictional.
                </p>
              </>
            )}
          </div>
        </aside>
      </div>

      {count > 0 && !order && (
        <a
          href="#fn-cart"
          className="fixed inset-x-3 bottom-3 z-30 flex items-center justify-between rounded-full bg-[#B83B0B] px-5 py-3 font-bold text-white shadow-lg lg:hidden"
        >
          <span>View order ({count})</span>
          <span>{inr(totals.total)}</span>
        </a>
      )}

      <footer className="border-t border-[#EAD7C3] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:py-6 text-xs sm:text-sm text-[#5C4030] sm:px-6">
          <p className={`${head} text-lg font-bold text-[#B83B0B]`}>FoodNest</p>
          <p className="mt-1">{conceptLabel}</p>
          <p className="mt-1">All dishes, prices and details are fictional.</p>
        </div>
      </footer>

      <DemoDialog open={detail !== null} onClose={() => setDetail(null)} title={detail?.name ?? ""} className="text-[#3B1F0F]">
        {detail && <DishDetail item={detail} onAdd={(q) => { addToCart(detail.id, q); setDetail(null); }} />}
      </DemoDialog>
    </div>
  );
}

function TotalsList({ totals }: { totals: Totals }) {
  return (
    <dl className="mt-4 space-y-1 text-sm" data-testid="fn-totals">
      <div className="flex justify-between">
        <dt>Subtotal</dt>
        <dd data-testid="fn-subtotal">{inr(totals.subtotal)}</dd>
      </div>
      <div className="flex justify-between">
        <dt>GST ({Math.round(TAX_RATE * 100)}%)</dt>
        <dd data-testid="fn-tax">{inr(totals.tax)}</dd>
      </div>
      <div className="flex justify-between">
        <dt>Delivery</dt>
        <dd data-testid="fn-delivery">{inr(totals.delivery)}</dd>
      </div>
      <div className="flex justify-between border-t border-[#EAD7C3] pt-2 text-base font-bold">
        <dt>Total</dt>
        <dd data-testid="fn-total">{inr(totals.total)}</dd>
      </div>
    </dl>
  );
}

function DishDetail({ item, onAdd }: { item: MenuItem; onAdd: (qty: number) => void }) {
  const [qty, setQty] = useState(1);
  return (
    <div>
      <ArtTile icon={ICONS[item.icon]} tone={item.tone} ink="#7A2E0E" className="h-36 rounded-xl" />
      <p className="mt-4 flex items-center gap-2 font-bold">
        <VegMark veg={item.veg} /> {item.veg ? "Vegetarian" : "Non-vegetarian"} · {inr(item.price)}
      </p>
      <p className="mt-2">{item.detail}</p>
      <p className="mt-2 text-sm text-[#5C4030]">
        <strong>Contains:</strong> {item.contains}
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <QtyStepper value={qty} label={item.name} onChange={setQty} className="text-[#B83B0B]" />
        <button type="button" className={primaryBtn} onClick={() => onAdd(qty)}>
          Add to order · {inr(item.price * qty)}
        </button>
      </div>
    </div>
  );
}
