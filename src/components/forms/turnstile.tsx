"use client";

import { useEffect, useRef } from "react";

type TurnstileApi = {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.turnstile) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    const script = existing ?? Object.assign(document.createElement("script"), { src: SCRIPT_SRC, async: true });
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () => reject(new Error("turnstile script")));
    if (!existing) document.head.appendChild(script);
  });
}

/** Cloudflare Turnstile widget. Changing `resetKey` asks for a fresh token. */
export function Turnstile({
  siteKey,
  resetKey,
  onToken,
  onUnavailable,
}: {
  siteKey: string;
  resetKey: number;
  onToken: (token: string) => void;
  onUnavailable: () => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const handlers = useRef({ onToken, onUnavailable });
  useEffect(() => {
    handlers.current = { onToken, onUnavailable };
  });

  useEffect(() => {
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !box.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(box.current, {
          sitekey: siteKey,
          callback: (token) => handlers.current.onToken(token),
          "expired-callback": () => handlers.current.onToken(""),
          "error-callback": () => handlers.current.onToken(""),
        });
      })
      .catch(() => {
        if (!cancelled) handlers.current.onUnavailable();
      });
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = undefined;
    };
  }, [siteKey]);

  useEffect(() => {
    if (resetKey > 0 && widgetId.current && window.turnstile) {
      handlers.current.onToken("");
      window.turnstile.reset(widgetId.current);
    }
  }, [resetKey]);

  return <div ref={box} data-testid="turnstile" />;
}
