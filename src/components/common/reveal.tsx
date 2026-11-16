/**
 * Gentle fade-up for below-the-fold blocks only. Server-rendered: it only adds a
 * data attribute. `RevealObserver` (one client component in the layout) reveals
 * the blocks when they scroll into view. Without JS the blocks stay visible.
 */
export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div data-reveal className={className}>
      {children}
    </div>
  );
}
