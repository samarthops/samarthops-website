"use client";

import { useState } from "react";
import {
  Baby,
  Bone,
  CalendarCheck,
  Clock,
  Heart,
  HeartPulse,
  Sparkles,
  Stethoscope,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { ArtTile } from "@/components/demo/art-tile";
import { DemoDialog } from "@/components/demo/demo-dialog";
import { conceptLabel } from "@/data/portfolio";
import {
  days,
  deptName,
  departments,
  doctors,
  slotsFor,
  type Day,
  type DeptId,
  type Doctor,
  type Time,
} from "@/data/medicare";

const DEPT_ICONS: Record<(typeof departments)[number]["icon"], LucideIcon> = {
  heart: Heart,
  bone: Bone,
  baby: Baby,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
};

type Chosen = { doctor: Doctor; day: Day; time: Time };
type Submitted = { name: string; department: string; chosen: Chosen | null };

const body = "font-[family-name:var(--font-mc-body)]";
const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[#0F766E] px-5 py-2.5 font-bold text-white hover:bg-[#115E59] disabled:cursor-not-allowed disabled:opacity-50";
const ghostBtn =
  "inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#0F766E] px-4 py-2 font-bold text-[#0F766E] hover:bg-[#0F766E]/10";
const field = "mt-1 w-full rounded-lg border border-[#94A3B8] bg-white px-3 py-2 text-[#0F172A]";

/** MediCare Plus: fictional clinic. Nothing typed here is stored or sent; state lives in this page only. */
export function MediCareApp() {
  const [dept, setDept] = useState<DeptId | "all">("all");
  const [profile, setProfile] = useState<Doctor | null>(null);
  const [chosen, setChosen] = useState<Chosen | null>(null);
  const [submitted, setSubmitted] = useState<Submitted | null>(null);
  const [department, setDepartment] = useState<DeptId>("general");

  const visible = doctors.filter((d) => dept === "all" || d.dept === dept);

  function showDoctors(id: DeptId | "all") {
    setDept(id);
    document.getElementById("mc-doctors")?.scrollIntoView();
  }

  function choose(c: Chosen) {
    setChosen(c);
    setDepartment(c.doctor.dept);
    setSubmitted(null);
    setProfile(null);
    document.getElementById("mc-enquiry")?.scrollIntoView();
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSubmitted({ name: String(data.get("name") ?? ""), department: deptName(department), chosen });
    setChosen(null);
  }

  return (
    <div className="bg-[#F0FDFA] text-[#0F172A]" id="mc-top">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <p className={`${body} flex items-center gap-2 text-2xl font-extrabold text-[#0F766E]`}>
            <HeartPulse className="size-7" aria-hidden="true" /> MediCare Plus
          </p>
          <nav aria-label="MediCare Plus" className="flex flex-wrap gap-1 text-sm font-bold">
            {[
              ["#mc-departments", "Departments"],
              ["#mc-doctors", "Doctors"],
              ["#mc-enquiry", "Book a visit"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="rounded-full px-3 py-2 text-[#134E4A] hover:bg-[#CCFBF1]">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-10 sm:px-6">
        <section aria-labelledby="mc-title" className="grid items-center gap-6 rounded-3xl bg-[#0F766E] p-6 text-white sm:p-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h1 id="mc-title" className={`${body} text-3xl font-extrabold sm:text-5xl`}>
              Caring for the whole family, under one roof
            </h1>
            <p className="mt-3 max-w-xl text-white/90">
              Meet our doctors, see open appointment times and send an enquiry. This is a demonstration clinic.
            </p>
            <a href="#mc-doctors" className="mt-5 inline-flex rounded-full bg-white px-5 py-2.5 font-bold text-[#0F766E] hover:bg-[#CCFBF1]">
              Find a doctor
            </a>
          </div>
          <ul className="grid grid-cols-3 gap-3 text-center text-sm" aria-label="Clinic at a glance">
            {[
              [String(departments.length), "Departments"],
              [String(doctors.length), "Doctors"],
              ["Mon-Wed", "Demo slots"],
            ].map(([n, l]) => (
              <li key={l} className="rounded-2xl bg-[#0A4F4A] p-3">
                <p className="text-xl font-extrabold">{n}</p>
                <p>{l}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="mc-departments" aria-labelledby="mc-dept-title" className="scroll-mt-4">
          <h2 id="mc-dept-title" className={`${body} text-3xl font-extrabold`}>
            Our departments
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="mc-departments">
            {departments.map((d) => {
              const Icon = DEPT_ICONS[d.icon];
              const count = doctors.filter((x) => x.dept === d.id).length;
              return (
                <li key={d.id} className="flex flex-col rounded-2xl bg-white p-5">
                  <span className="grid size-12 place-items-center rounded-xl" style={{ background: d.tone }}>
                    <Icon className="size-6 text-[#0F766E]" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-lg font-extrabold">{d.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-[#334155]">{d.blurb}</p>
                  <button type="button" className={`${ghostBtn} mt-4 self-start`} onClick={() => showDoctors(d.id)}>
                    {count} {count === 1 ? "doctor" : "doctors"}
                    <span className="sr-only"> in {d.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section id="mc-doctors" aria-labelledby="mc-doc-title" className="scroll-mt-4">
          <h2 id="mc-doc-title" className={`${body} text-3xl font-extrabold`}>
            Our doctors
          </h2>
          <div role="group" aria-label="Filter doctors by department" className="mt-4 flex flex-wrap gap-2">
            {([{ id: "all", name: "All departments" }, ...departments] as { id: DeptId | "all"; name: string }[]).map((d) => (
              <button
                key={d.id}
                type="button"
                aria-pressed={dept === d.id}
                onClick={() => setDept(d.id)}
                className={`rounded-full border-2 px-4 py-1.5 text-sm font-bold ${
                  dept === d.id
                    ? "border-[#0F766E] bg-[#0F766E] text-white"
                    : "border-[#0F766E] bg-white text-[#0F766E] hover:bg-[#CCFBF1]"
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>
          <p role="status" className="mt-3 text-sm text-[#334155]" data-testid="mc-doctor-count">
            {visible.length} {visible.length === 1 ? "doctor" : "doctors"}
          </p>
          <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="mc-doctors">
            {visible.map((d) => (
              <li key={d.id} className="flex flex-col overflow-hidden rounded-2xl bg-white" data-testid="mc-doctor">
                <ArtTile icon={UserRound} tone={d.tone} ink="#0F766E" className="h-32" />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-bold tracking-wide text-[#0F766E] uppercase">{deptName(d.dept)}</p>
                  <h3 className="mt-1 text-lg font-extrabold">{d.name}</h3>
                  <p className="text-sm text-[#334155]">
                    {d.title}, {d.experience}
                  </p>
                  <button type="button" className={`${primaryBtn} mt-4 self-start`} onClick={() => setProfile(d)}>
                    <CalendarCheck className="size-4" aria-hidden="true" />
                    Profile and slots<span className="sr-only"> for {d.name}</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="mc-enquiry" aria-labelledby="mc-enq-title" className="scroll-mt-4 rounded-3xl bg-white p-6 sm:p-8">
          <h2 id="mc-enq-title" className={`${body} text-3xl font-extrabold`}>
            Request an appointment
          </h2>
          {submitted ? (
            <div data-testid="mc-confirmation" className="mt-4 rounded-2xl bg-[#CCFBF1] p-5">
              <p className="text-xl font-extrabold text-[#115E59]">Demo enquiry submitted</p>
              <p className="mt-2">
                Thank you, {submitted.name}. Department: {submitted.department}.
                {submitted.chosen && (
                  <>
                    {" "}
                    Requested slot: {submitted.chosen.doctor.name}, {submitted.chosen.day} at {submitted.chosen.time}.
                  </>
                )}
              </p>
              <p className="mt-2 text-sm text-[#334155]">
                This is a demonstration. Nothing was sent, saved or booked.
              </p>
              <button type="button" className={`${ghostBtn} mt-4`} onClick={() => setSubmitted(null)}>
                Make another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={submit} aria-label="Appointment enquiry" className="mt-4 grid gap-4 sm:grid-cols-2">
              <p className="rounded-lg bg-[#FEF3C7] p-3 text-sm sm:col-span-2">
                Demonstration only. Use made-up details and do not enter real health information: nothing is saved or sent.
              </p>
              {chosen ? (
                <p className="rounded-lg bg-[#CCFBF1] p-3 sm:col-span-2" data-testid="mc-chosen">
                  <Clock className="mr-1 inline size-4" aria-hidden="true" />
                  Selected slot: <strong>{chosen.doctor.name}</strong>, {chosen.day} at {chosen.time}{" "}
                  <button type="button" className="ml-2 font-bold text-[#0F766E] underline" onClick={() => setChosen(null)}>
                    Clear slot
                  </button>
                </p>
              ) : (
                <p className="text-sm text-[#334155] sm:col-span-2">
                  Tip: open a doctor&apos;s profile above to pick a time slot, or just send a general enquiry.
                </p>
              )}
              <label className="block text-sm font-bold">
                Your name
                <input name="name" required autoComplete="off" className={field} />
              </label>
              <label className="block text-sm font-bold">
                Phone number
                <input name="phone" required inputMode="numeric" pattern="[0-9]{10}" title="Ten digits" autoComplete="off" className={field} />
              </label>
              <label className="block text-sm font-bold sm:col-span-2">
                Department
                <select name="department" value={department} onChange={(e) => setDepartment(e.target.value as DeptId)} className={field}>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="sm:col-span-2">
                <button type="submit" className={primaryBtn}>
                  Send demo enquiry
                </button>
              </div>
            </form>
          )}
        </section>
      </div>

      <footer className="bg-[#134E4A] text-white/90">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm sm:px-6">
          <p className={`${body} flex items-center gap-2 text-lg font-extrabold text-white`}>
            <HeartPulse className="size-5" aria-hidden="true" /> MediCare Plus
          </p>
          <p className="mt-1">{conceptLabel}</p>
          <p className="mt-1">The clinic, doctors, times and details are fictional. This page gives no medical advice.</p>
        </div>
      </footer>

      <DemoDialog open={profile !== null} onClose={() => setProfile(null)} title={profile?.name ?? ""} className="text-[#0F172A]">
        {profile && <DoctorProfile key={profile.id} doctor={profile} onChoose={choose} />}
      </DemoDialog>
    </div>
  );
}

function DoctorProfile({ doctor, onChoose }: { doctor: Doctor; onChoose: (c: Chosen) => void }) {
  const [day, setDay] = useState<Day>(days[0]);
  const [time, setTime] = useState<Time | null>(null);
  const slots = slotsFor(doctor.id).filter((s) => s.day === day);

  return (
    <div>
      <ArtTile icon={UserRound} tone={doctor.tone} ink="#0F766E" className="h-28 rounded-xl" />
      <p className="mt-3 font-bold text-[#0F766E]">
        {doctor.title}, {deptName(doctor.dept)}
      </p>
      <p className="mt-2">{doctor.bio}</p>
      <dl className="mt-3 grid gap-1 text-sm text-[#334155]">
        <div>
          <dt className="inline font-bold">Experience: </dt>
          <dd className="inline">{doctor.experience}</dd>
        </div>
        <div>
          <dt className="inline font-bold">Qualifications: </dt>
          <dd className="inline">{doctor.qualifications}</dd>
        </div>
        <div>
          <dt className="inline font-bold">Languages: </dt>
          <dd className="inline">{doctor.languages}</dd>
        </div>
      </dl>

      <h3 className="mt-5 font-extrabold">Pick a slot</h3>
      <div role="group" aria-label="Day" className="mt-2 flex flex-wrap gap-2">
        {days.map((d) => (
          <button
            key={d}
            type="button"
            aria-pressed={day === d}
            onClick={() => {
              setDay(d);
              setTime(null);
            }}
            className={`rounded-full border-2 px-4 py-1.5 text-sm font-bold ${
              day === d ? "border-[#0F766E] bg-[#0F766E] text-white" : "border-[#0F766E] text-[#0F766E] hover:bg-[#CCFBF1]"
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      <ul aria-label={`Times on ${day}`} className="mt-3 flex flex-wrap gap-2" data-testid="mc-slots">
        {slots.map((s) => (
          <li key={s.time}>
            <button
              type="button"
              disabled={s.booked}
              aria-pressed={time === s.time}
              aria-label={`${s.time}${s.booked ? " (booked)" : ""}`}
              onClick={() => setTime(s.time)}
              className={`rounded-lg border-2 px-3 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:border-[#CBD5E1] disabled:bg-[#F1F5F9] disabled:text-[#64748B] disabled:line-through ${
                time === s.time ? "border-[#0F766E] bg-[#0F766E] text-white" : "border-[#0F766E] bg-white text-[#0F766E] hover:bg-[#CCFBF1]"
              }`}
            >
              {s.time}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        disabled={time === null}
        className={`${primaryBtn} mt-5 w-full`}
        onClick={() => time && onChoose({ doctor, day, time })}
      >
        {time ? `Request ${day} ${time}` : "Choose a time to continue"}
      </button>
    </div>
  );
}
