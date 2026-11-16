/** MediCare Plus concept demo: fictional clinic, doctors and appointment slots. Nothing here is real. */

export const departments = [
  { id: "cardiology", name: "Cardiology", blurb: "Heart check-ups, blood pressure and rhythm care.", icon: "heart", tone: "#CCFBF1" },
  { id: "orthopaedics", name: "Orthopaedics", blurb: "Bones, joints and sports injuries.", icon: "bone", tone: "#E0F2FE" },
  { id: "paediatrics", name: "Paediatrics", blurb: "Child health, growth and vaccination visits.", icon: "baby", tone: "#FEF3C7" },
  { id: "dermatology", name: "Dermatology", blurb: "Skin, hair and nail care.", icon: "sparkles", tone: "#FCE7F3" },
  { id: "general", name: "General Medicine", blurb: "First point of care for everyday health concerns.", icon: "stethoscope", tone: "#DCFCE7" },
] as const;

export type DeptId = (typeof departments)[number]["id"];

export type Doctor = {
  id: string;
  name: string;
  dept: DeptId;
  title: string;
  experience: string;
  languages: string;
  qualifications: string;
  bio: string;
  tone: string;
};

export const doctors: Doctor[] = [
  {
    id: "anaya-verma",
    name: "Dr. Anaya Verma",
    dept: "cardiology",
    title: "Consultant Cardiologist",
    experience: "14 years",
    languages: "English, Hindi, Marathi",
    qualifications: "MD Medicine, DM Cardiology (fictional)",
    bio: "Focuses on preventive heart care and long-term blood pressure management. Known in this demo for explaining every report in plain words.",
    tone: "#CCFBF1",
  },
  {
    id: "rohan-desai",
    name: "Dr. Rohan Desai",
    dept: "cardiology",
    title: "Interventional Cardiologist",
    experience: "10 years",
    languages: "English, Hindi",
    qualifications: "MD Medicine, DM Cardiology (fictional)",
    bio: "Works with patients who need follow-up after heart procedures and runs the clinic's fitness-for-sport checks.",
    tone: "#99F6E4",
  },
  {
    id: "kabir-nair",
    name: "Dr. Kabir Nair",
    dept: "orthopaedics",
    title: "Orthopaedic Surgeon",
    experience: "16 years",
    languages: "English, Hindi, Malayalam",
    qualifications: "MS Orthopaedics (fictional)",
    bio: "Treats joint pain, fractures and sports injuries, with a focus on getting people moving again without rushing to surgery.",
    tone: "#E0F2FE",
  },
  {
    id: "isha-menon",
    name: "Dr. Isha Menon",
    dept: "orthopaedics",
    title: "Physiotherapy and Rehab Lead",
    experience: "9 years",
    languages: "English, Hindi, Marathi",
    qualifications: "MPT Orthopaedics (fictional)",
    bio: "Designs recovery plans after injuries and surgeries, and teaches simple exercises people can continue at home.",
    tone: "#BAE6FD",
  },
  {
    id: "tara-kulshreshtha",
    name: "Dr. Tara Kulshreshtha",
    dept: "paediatrics",
    title: "Consultant Paediatrician",
    experience: "12 years",
    languages: "English, Hindi, Gujarati",
    qualifications: "MD Paediatrics (fictional)",
    bio: "Looks after newborns to teenagers, including growth tracking and the vaccination schedule, in a relaxed, child-friendly room.",
    tone: "#FEF3C7",
  },
  {
    id: "neel-joshi",
    name: "Dr. Neel Joshi",
    dept: "paediatrics",
    title: "Child Nutrition Specialist",
    experience: "8 years",
    languages: "English, Marathi",
    qualifications: "DCH, Fellowship in Child Nutrition (fictional)",
    bio: "Helps parents with feeding, allergies and healthy growth, with simple meal plans that fit a busy household.",
    tone: "#FDE68A",
  },
  {
    id: "meher-sethi",
    name: "Dr. Meher Sethi",
    dept: "dermatology",
    title: "Consultant Dermatologist",
    experience: "11 years",
    languages: "English, Hindi, Punjabi",
    qualifications: "MD Dermatology (fictional)",
    bio: "Treats acne, eczema, hair and nail concerns, and gives clear everyday skincare routines instead of long product lists.",
    tone: "#FCE7F3",
  },
  {
    id: "vihaan-bhatt",
    name: "Dr. Vihaan Bhatt",
    dept: "general",
    title: "Family Physician",
    experience: "15 years",
    languages: "English, Hindi, Marathi",
    qualifications: "MBBS, MD General Medicine (fictional)",
    bio: "The first stop for fever, infections, diabetes follow-ups and general check-ups, and refers to a specialist when needed.",
    tone: "#DCFCE7",
  },
];

export function deptName(id: DeptId): string {
  return departments.find((d) => d.id === id)?.name ?? "";
}

export const days = ["Monday", "Tuesday", "Wednesday"] as const;
export const times = ["09:30", "10:30", "11:30", "15:00", "16:30"] as const;
export type Day = (typeof days)[number];
export type Time = (typeof times)[number];

export type Slot = { day: Day; time: Time; booked: boolean };

/** Fixed, predictable availability so the demo always looks the same (a slot is booked when the sum is divisible by 4). */
export function slotsFor(doctorId: string): Slot[] {
  const index = Math.max(0, doctors.findIndex((d) => d.id === doctorId));
  return days.flatMap((day, di) =>
    times.map((time, ti) => ({ day, time, booked: (index + di * 2 + ti) % 4 === 0 })),
  );
}
