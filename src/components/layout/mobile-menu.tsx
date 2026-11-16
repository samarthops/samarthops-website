"use client";

import { useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { Button } from "@/components/ui/button";

/**
 * Mobile navigation drawer built on the native <dialog> element: focus trap, Escape to close
 * and the top layer come from the browser, so no UI library has to load or hydrate.
 */
export function MobileMenu() {
  const ref = useRef<HTMLDialogElement>(null);
  const close = () => ref.current?.close();

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Open menu"
        onClick={() => ref.current?.showModal()}
      >
        <Menu aria-hidden="true" />
      </Button>
      <dialog
        ref={ref}
        aria-label="Menu"
        onClick={(e) => {
          if (e.target === ref.current) close();
        }}
        className="fixed top-0 right-0 left-auto m-0 h-dvh max-h-none w-3/4 max-w-sm bg-white p-0 shadow-lg backdrop:bg-black/40"
      >
        <div className="flex items-center justify-between p-4">
          <p className="font-semibold text-navy">Menu</p>
          <button
            type="button"
            onClick={close}
            className="rounded-sm opacity-70 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:outline-none"
          >
            <X className="size-4" aria-hidden="true" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-soft"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </dialog>
    </div>
  );
}
