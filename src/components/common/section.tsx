import { cn } from "@/lib/utils";

export function Section({
  id,
  title,
  intro,
  tone = "white",
  children,
  className,
}: {
  id?: string;
  title?: string;
  intro?: string;
  tone?: "white" | "soft";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-14 sm:py-20", tone === "soft" && "bg-soft")}>
      <div className={cn("mx-auto max-w-6xl px-4 sm:px-6", className)}>
        {title && (
          <div className="mb-8 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">{title}</h2>
            {intro && <p className="mt-3 text-base text-ink">{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
