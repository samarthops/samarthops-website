import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <h1 className="text-3xl font-bold text-navy">Page not found</h1>
      <p className="mt-3 text-subtle">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-6 inline-block font-medium text-brand underline">
        Back to home
      </Link>
    </section>
  );
}
