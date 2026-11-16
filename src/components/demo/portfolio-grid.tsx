"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Building2, ChefHat, Cog, GraduationCap, HeartPulse, Store, Zap, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { demoProjects, similarHref, type DemoProject } from "@/data/portfolio";

const ICONS: Record<DemoProject["slug"], LucideIcon> = {
  foodnest: ChefHat,
  shopease: Store,
  "medicare-plus": HeartPulse,
  primeestate: Building2,
  brightfuture: GraduationCap,
  voltcare: Zap,
  torquetech: Cog,
};

export function PortfolioGrid() {
  const industries = ["All", ...Array.from(new Set(demoProjects.map((d) => d.industry)))];
  const [industry, setIndustry] = useState("All");
  const shown = demoProjects.filter((d) => industry === "All" || d.industry === industry);

  return (
    <div>
      <div role="group" aria-label="Filter by industry" className="flex flex-wrap gap-2">
        {industries.map((i) => (
          <button
            key={i}
            type="button"
            aria-pressed={industry === i}
            onClick={() => setIndustry(i)}
            className={`rounded-full border-2 px-4 py-1.5 text-sm font-semibold ${
              industry === i
                ? "border-navy bg-navy text-white"
                : "border-navy bg-white text-navy hover:bg-soft"
            }`}
          >
            {i}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-ink" role="status" data-testid="portfolio-count">
        {shown.length} {shown.length === 1 ? "demo" : "demos"}
      </p>

      <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-testid="portfolio-cards">
        {shown.map((d) => {
          const Icon = ICONS[d.slug];
          return (
            <li key={d.slug} className="flex flex-col overflow-hidden rounded-xl border border-line bg-white">
              <div
                aria-hidden="true"
                className="grid h-40 place-items-center"
                style={{ background: `linear-gradient(135deg, ${d.preview.from}, ${d.preview.to})`, color: d.preview.ink }}
              >
                <Icon className="size-14" strokeWidth={1.5} />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold tracking-wide text-brand-dark uppercase">{d.industry}</p>
                <h2 className="mt-1 text-xl font-semibold text-navy">{d.name}</h2>
                <p className="mt-2 flex-1 text-ink">{d.summary}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href={`/portfolio/${d.slug}`} aria-label={`View demo: ${d.name}`}>
                      View demo <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={similarHref(d)} aria-label={`Build something similar to ${d.name}`}>
                      Build something similar
                    </Link>
                  </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
