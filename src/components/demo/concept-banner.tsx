import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { conceptLabel, similarHref, type DemoProject } from "@/data/portfolio";

/** Samarth Ops strip above each demo: the required concept label and the way back / forward. */
export function ConceptBanner({ demo }: { demo: DemoProject }) {
  return (
    <div className="bg-navy text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 text-xs leading-snug sm:py-3 sm:text-sm sm:px-6">
        <p data-testid="concept-label" className="max-w-3xl">
          {conceptLabel}
        </p>
        <p className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <Link href="/portfolio" className="inline-flex items-center gap-1 underline">
            <ArrowLeft className="size-4" aria-hidden="true" /> All demos
          </Link>
          <Link href={similarHref(demo)} className="font-semibold underline">
            Build something similar
          </Link>
        </p>
      </div>
    </div>
  );
}
