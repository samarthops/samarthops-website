"use client";

import { useState } from "react";
import {
  BookOpen,
  Calculator,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  GraduationCap,
  Laptop,
  Megaphone,
  Music,
  Palette,
  Sun,
  Trophy,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { ArtTile } from "@/components/demo/art-tile";
import { DemoDialog } from "@/components/demo/demo-dialog";
import { conceptLabel } from "@/data/portfolio";
import {
  admissionGrades,
  admissionSteps,
  announcements,
  courses,
  events,
  faculty,
  gallery,
  levels,
  type Course,
  type GalleryItem,
  type Level,
} from "@/data/brightfuture";

const COURSE_ICONS: Record<Course["icon"], LucideIcon> = {
  book: BookOpen,
  calc: Calculator,
  flask: FlaskConical,
  palette: Palette,
  music: Music,
  laptop: Laptop,
};
const GALLERY_ICONS: Record<GalleryItem["icon"], LucideIcon> = {
  sun: Sun,
  flask: FlaskConical,
  palette: Palette,
  music: Music,
  trophy: Trophy,
  book: BookOpen,
};

const head = "font-[family-name:var(--font-bf-head)]";
const yellowBtn =
  "inline-flex items-center justify-center gap-2 rounded-2xl bg-[#FACC15] px-5 py-2.5 font-extrabold text-[#3B0764] hover:bg-[#EAB308] disabled:cursor-not-allowed disabled:opacity-50";
const purpleBtn =
  "inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#5B21B6] px-4 py-2 font-extrabold text-[#5B21B6] hover:bg-[#5B21B6]/10";
const field = "mt-1 w-full rounded-xl border-2 border-[#A78BFA] bg-white px-3 py-2 text-[#2E1065]";

type Admission = { child: string; parent: string; grade: string };

/** BrightFuture Academy: fictional school. The admission enquiry stays on screen only; nothing is stored or sent. */
export function BrightFutureApp() {
  const [level, setLevel] = useState<Level | "All">("All");
  const [tab, setTab] = useState<"events" | "announcements">("events");
  const [photo, setPhoto] = useState<number | null>(null);
  const [admission, setAdmission] = useState<Admission | null>(null);

  const shownCourses = courses.filter((c) => level === "All" || c.level === level);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setAdmission({
      child: String(data.get("child") ?? ""),
      parent: String(data.get("parent") ?? ""),
      grade: String(data.get("grade") ?? ""),
    });
  }

  const last = gallery.length - 1;
  const current = photo !== null ? gallery[photo] : null;
  const CurrentIcon = current ? GALLERY_ICONS[current.icon] : null;

  return (
    <div className="bg-[#FFFBEB] text-[#2E1065]" id="bf-top">
      <header className="bg-[#5B21B6] text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <p className={`${head} flex items-center gap-2 text-2xl font-semibold`}>
            <GraduationCap className="size-8 text-[#FACC15]" aria-hidden="true" /> BrightFuture Academy
          </p>
          <nav aria-label="BrightFuture Academy" className="flex flex-wrap gap-1 text-sm font-extrabold">
            {[
              ["#bf-courses", "Courses"],
              ["#bf-faculty", "Faculty"],
              ["#bf-admissions", "Admissions"],
              ["#bf-news", "Events"],
              ["#bf-gallery", "Gallery"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="inline-flex min-h-11 items-center rounded-xl px-3 py-2 hover:bg-white/15">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-10 sm:px-6">
        <section aria-labelledby="bf-title" className="relative overflow-hidden rounded-[2rem] bg-[#FACC15] p-6 sm:p-10">
          <h1 id="bf-title" className={`${head} max-w-2xl text-4xl font-semibold text-[#3B0764] sm:text-6xl`}>
            Where every child learns to shine
          </h1>
          <p className="mt-3 max-w-xl text-lg font-semibold text-[#3B0764]">
            Playful classrooms, caring teachers and strong basics, from nursery to senior school.
          </p>
          <a href="#bf-admissions" className="mt-5 inline-flex rounded-2xl bg-[#5B21B6] px-6 py-3 font-extrabold text-white hover:bg-[#4C1D95]">
            Admissions are open
          </a>
          <GraduationCap aria-hidden="true" strokeWidth={1} className="pointer-events-none absolute top-1/2 -right-6 hidden size-80 -translate-y-1/2 text-black/10 lg:block" />
        </section>

        <section id="bf-courses" aria-labelledby="bf-courses-title" className="scroll-mt-4">
          <h2 id="bf-courses-title" className={`${head} text-4xl font-semibold`}>
            Courses
          </h2>
          <div role="group" aria-label="Filter courses by level" className="mt-4 flex flex-wrap gap-2">
            {(["All", ...levels] as const).map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={level === l}
                onClick={() => setLevel(l)}
                className={`rounded-full border-2 px-4 py-1.5 text-sm font-extrabold ${
                  level === l ? "border-[#5B21B6] bg-[#5B21B6] text-white" : "border-[#5B21B6] bg-white text-[#5B21B6] hover:bg-[#EDE9FE]"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <p role="status" className="mt-3 text-sm" data-testid="bf-course-count">
            {shownCourses.length} {shownCourses.length === 1 ? "course" : "courses"}
          </p>
          <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="bf-courses">
            {shownCourses.map((c) => (
              <li key={c.id} className="overflow-hidden rounded-3xl bg-white" data-testid="bf-course">
                <ArtTile icon={COURSE_ICONS[c.icon]} tone={c.tone} ink="#5B21B6" className="h-28" />
                <div className="p-5">
                  <p className="text-xs font-extrabold tracking-wide text-[#6D28D9] uppercase">
                    {c.level}, {c.grades}
                  </p>
                  <h3 className={`${head} mt-1 text-2xl font-semibold`}>{c.name}</h3>
                  <p className="mt-2 text-[#4C1D95]">{c.blurb}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="bf-faculty" aria-labelledby="bf-faculty-title" className="scroll-mt-4">
          <h2 id="bf-faculty-title" className={`${head} text-4xl font-semibold`}>
            Meet our faculty
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="bf-faculty">
            {faculty.map((f) => (
              <li key={f.id} className="flex gap-4 rounded-3xl bg-white p-5">
                <span className="grid size-16 shrink-0 place-items-center rounded-full" style={{ background: f.tone }} aria-hidden="true">
                  <UserRound className="size-8 text-[#5B21B6]" />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold">{f.name}</h3>
                  <p className="text-sm font-bold text-[#6D28D9]">{f.role}</p>
                  <p className="mt-1 text-sm text-[#4C1D95]">{f.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="bf-admissions" aria-labelledby="bf-adm-title" className="scroll-mt-4">
          <h2 id="bf-adm-title" className={`${head} text-4xl font-semibold`}>
            Admissions
          </h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-testid="bf-steps">
            {admissionSteps.map((s, i) => (
              <li key={s.title} className="rounded-3xl bg-white p-5">
                <span className={`${head} grid size-10 place-items-center rounded-full bg-[#5B21B6] text-xl text-white`} aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-extrabold">{s.title}</h3>
                <p className="mt-1 text-sm text-[#4C1D95]">{s.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-6 rounded-3xl bg-white p-6 sm:p-8">
            <h3 className={`${head} text-3xl font-semibold`}>Admission enquiry</h3>
            {admission ? (
              <div data-testid="bf-confirmation" className="mt-4 rounded-2xl bg-[#DCFCE7] p-5">
                <p className="text-xl font-extrabold text-[#14532D]">Demo enquiry submitted</p>
                <p className="mt-2">
                  Thank you, {admission.parent}. Enquiry for {admission.child}, {admission.grade}.
                </p>
                <p className="mt-2 text-sm text-[#4C1D95]">This is a demonstration. Nothing was sent or saved.</p>
                <button type="button" className={`${purpleBtn} mt-4`} onClick={() => setAdmission(null)}>
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={submit} aria-label="Admission enquiry" className="mt-4 grid gap-4 sm:grid-cols-2">
                <p className="rounded-xl bg-[#FEF3C7] p-3 text-sm sm:col-span-2">
                  Demonstration only. Use made-up names: nothing is saved or sent.
                </p>
                <label className="block text-sm font-extrabold">
                  Child&apos;s name
                  <input name="child" required autoComplete="off" className={field} />
                </label>
                <label className="block text-sm font-extrabold">
                  Seeking admission to
                  <select name="grade" className={field}>
                    {admissionGrades.map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-extrabold">
                  Parent or guardian name
                  <input name="parent" required autoComplete="off" className={field} />
                </label>
                <label className="block text-sm font-extrabold">
                  Phone number
                  <input name="phone" required inputMode="numeric" pattern="[0-9]{10}" title="Ten digits" autoComplete="off" className={field} />
                </label>
                <div className="sm:col-span-2">
                  <button type="submit" className={yellowBtn}>
                    Send demo enquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        <section id="bf-news" aria-labelledby="bf-news-title" className="scroll-mt-4">
          <h2 id="bf-news-title" className={`${head} text-4xl font-semibold`}>
            Events and announcements
          </h2>
          <div role="group" aria-label="Show" className="mt-4 flex gap-2">
            {(
              [
                ["events", "Events", CalendarDays],
                ["announcements", "Announcements", Megaphone],
              ] as const
            ).map(([id, label, Icon]) => (
              <button
                key={id}
                type="button"
                aria-pressed={tab === id}
                onClick={() => setTab(id)}
                className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-1.5 text-sm font-extrabold ${
                  tab === id ? "border-[#5B21B6] bg-[#5B21B6] text-white" : "border-[#5B21B6] bg-white text-[#5B21B6] hover:bg-[#EDE9FE]"
                }`}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
          {tab === "events" ? (
            <ul className="mt-4 grid gap-4 sm:grid-cols-2" data-testid="bf-events">
              {events.map((ev) => (
                <li key={ev.id} className="rounded-3xl bg-white p-5">
                  <h3 className="text-lg font-extrabold">{ev.title}</h3>
                  <p className="text-sm font-bold text-[#6D28D9]">
                    {ev.when}, {ev.place}
                  </p>
                  <p className="mt-2 text-[#4C1D95]">{ev.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mt-4 space-y-3" data-testid="bf-announcements">
              {announcements.map((a) => (
                <li key={a.id} className="rounded-3xl border-l-8 border-[#FACC15] bg-white p-5">
                  <h3 className="text-lg font-extrabold">{a.title}</h3>
                  <p className="text-sm font-bold text-[#6D28D9]">{a.date}</p>
                  <p className="mt-2 text-[#4C1D95]">{a.text}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section id="bf-gallery" aria-labelledby="bf-gallery-title" className="scroll-mt-4">
          <h2 id="bf-gallery-title" className={`${head} text-4xl font-semibold`}>
            Gallery
          </h2>
          <ul className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-3" data-testid="bf-gallery">
            {gallery.map((g, i) => {
              const Icon = GALLERY_ICONS[g.icon];
              return (
                <li key={g.id}>
                  <button
                    type="button"
                    onClick={() => setPhoto(i)}
                    className="block w-full overflow-hidden rounded-3xl bg-white text-left hover:shadow-lg"
                  >
                    <ArtTile icon={Icon} tone={g.tone} ink="#5B21B6" className="h-32" />
                    <span className="block p-3 text-sm font-bold">{g.caption}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <footer className="bg-[#2E1065] text-white/90">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm sm:px-6">
          <p className={`${head} flex items-center gap-2 text-2xl text-[#FACC15]`}>
            <GraduationCap className="size-6" aria-hidden="true" /> BrightFuture Academy
          </p>
          <p className="mt-2">{conceptLabel}</p>
          <p className="mt-1">The school, teachers, courses, events and photos are fictional.</p>
        </div>
      </footer>

      <DemoDialog open={photo !== null} onClose={() => setPhoto(null)} title="Gallery" className="rounded-3xl text-[#2E1065]">
        {current && CurrentIcon && photo !== null && (
          <div>
            <div className="relative">
              <ArtTile icon={CurrentIcon} tone={current.tone} ink="#5B21B6" className="h-56 rounded-2xl" />
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => setPhoto(photo === 0 ? last : photo - 1)}
                className="absolute top-1/2 left-2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white shadow"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => setPhoto(photo === last ? 0 : photo + 1)}
                className="absolute top-1/2 right-2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white shadow"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
            <p role="status" className="mt-3 font-bold" data-testid="bf-photo-caption">
              {current.caption} ({photo + 1} of {gallery.length})
            </p>
          </div>
        )}
      </DemoDialog>
    </div>
  );
}
