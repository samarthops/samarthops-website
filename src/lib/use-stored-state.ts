"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * State kept in the browser's localStorage (concept demos only: cart and wishlist).
 * `initial` must be a stable reference (a module constant).
 * Server render and first client render use `initial`, then the stored value is picked up.
 */
export function useStoredState<T>(key: string, initial: T) {
  const raw = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => null,
  );

  const value = useMemo<T>(() => {
    if (raw === null) return initial;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return initial;
    }
  }, [raw, initial]);

  const setValue = useCallback(
    (next: T | ((previous: T) => T)) => {
      let previous = initial;
      const current = read(key);
      if (current !== null) {
        try {
          previous = JSON.parse(current) as T;
        } catch {
          previous = initial;
        }
      }
      const resolved = typeof next === "function" ? (next as (p: T) => T)(previous) : next;
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // Storage unavailable (private mode or full): the demo simply does not persist.
      }
      listeners.forEach((l) => l());
    },
    [key, initial],
  );

  return [value, setValue] as const;
}
