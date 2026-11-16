/** BrightFuture Academy concept demo: a fictional school. All people, courses, dates and events are made up. */

export const levels = ["Primary", "Middle school", "Senior school"] as const;
export type Level = (typeof levels)[number];

export type Course = {
  id: string;
  name: string;
  level: Level;
  grades: string;
  blurb: string;
  icon: "book" | "calc" | "flask" | "palette" | "music" | "laptop";
  tone: string;
};

export const courses: Course[] = [
  { id: "foundation", name: "Foundation Literacy", level: "Primary", grades: "Grades 1 to 3", blurb: "Reading, writing and storytelling through play and group activities.", icon: "book", tone: "#FEF08A" },
  { id: "number-fun", name: "Number Fun", level: "Primary", grades: "Grades 1 to 5", blurb: "Maths made hands-on, with games, puzzles and everyday examples.", icon: "calc", tone: "#FBCFE8" },
  { id: "young-scientists", name: "Young Scientists", level: "Middle school", grades: "Grades 6 to 8", blurb: "Simple experiments every week that teach how and why things work.", icon: "flask", tone: "#BBF7D0" },
  { id: "art-studio", name: "Art Studio", level: "Middle school", grades: "Grades 6 to 8", blurb: "Drawing, colour and craft projects, ending in a school exhibition.", icon: "palette", tone: "#FED7AA" },
  { id: "coding-basics", name: "Coding Basics", level: "Senior school", grades: "Grades 9 to 10", blurb: "Learn to think in steps and build small programs and websites.", icon: "laptop", tone: "#BAE6FD" },
  { id: "music-circle", name: "Music Circle", level: "Senior school", grades: "Grades 9 to 12", blurb: "Choir, rhythm and instrument practice with a yearly concert.", icon: "music", tone: "#DDD6FE" },
];

export type Faculty = { id: string; name: string; role: string; subject: string; bio: string; tone: string };

export const faculty: Faculty[] = [
  { id: "sunita", name: "Mrs. Sunita Rane", role: "Principal", subject: "Leadership", bio: "Leads the academy with a focus on curiosity, kindness and strong basics.", tone: "#FEF08A" },
  { id: "arjun", name: "Mr. Arjun Pillai", role: "Head of Science", subject: "Science", bio: "Runs the weekly lab sessions and the annual science fair.", tone: "#BBF7D0" },
  { id: "farah", name: "Ms. Farah Qureshi", role: "Maths Teacher", subject: "Mathematics", bio: "Known for turning tricky chapters into puzzles students ask to repeat.", tone: "#FBCFE8" },
  { id: "dev", name: "Mr. Dev Malhotra", role: "Computer Teacher", subject: "Computing", bio: "Teaches coding from the first block-based program to real websites.", tone: "#BAE6FD" },
  { id: "lata", name: "Mrs. Lata Bhosale", role: "Art and Music Teacher", subject: "Creative arts", bio: "Leads the art studio and the school choir.", tone: "#DDD6FE" },
  { id: "imran", name: "Mr. Imran Sheikh", role: "Sports Coach", subject: "Physical education", bio: "Builds teamwork through cricket, football and yoga.", tone: "#FED7AA" },
];

export const admissionSteps = [
  { title: "Send an enquiry", text: "Fill in the short form below. A demo only, so nothing is sent." },
  { title: "Visit the campus", text: "Meet the teachers and see the classrooms." },
  { title: "Friendly interaction", text: "A relaxed chat with your child. No pressure, no heavy test." },
  { title: "Confirm admission", text: "Complete the formalities and welcome to the academy." },
];

export const admissionGrades = ["Nursery", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10"];

export type SchoolEvent = { id: string; title: string; when: string; place: string; text: string };

export const events: SchoolEvent[] = [
  { id: "science-fair", title: "Annual Science Fair", when: "First Saturday of next term", place: "Main hall", text: "Students show experiments and models. Parents are welcome." },
  { id: "sports-day", title: "Sports Day", when: "Mid-term, morning", place: "School ground", text: "Races, relays and a family tug-of-war." },
  { id: "art-exhibition", title: "Art Exhibition", when: "Last week of term", place: "Art studio", text: "Paintings, clay work and crafts made by students." },
  { id: "concert", title: "Winter Concert", when: "End of year, evening", place: "Auditorium", text: "Songs and instruments from the Music Circle." },
];

export type Announcement = { id: string; title: string; date: string; text: string };

export const announcements: Announcement[] = [
  { id: "admissions-open", title: "Admissions are open", date: "This term", text: "Limited seats in every grade. Send an enquiry to receive details." },
  { id: "new-lab", title: "New computer lab", date: "This term", text: "Twenty new workstations are ready for the Coding Basics course." },
  { id: "library-hours", title: "Library timings extended", date: "Last week", text: "The library now stays open for one hour after school." },
];

export type GalleryItem = { id: string; caption: string; icon: "sun" | "flask" | "palette" | "music" | "trophy" | "book"; tone: string };

export const gallery: GalleryItem[] = [
  { id: "g1", caption: "Morning assembly on the school ground", icon: "sun", tone: "#FEF08A" },
  { id: "g2", caption: "A chemistry experiment in the lab", icon: "flask", tone: "#BBF7D0" },
  { id: "g3", caption: "Students painting a class mural", icon: "palette", tone: "#FBCFE8" },
  { id: "g4", caption: "Choir practice for the winter concert", icon: "music", tone: "#DDD6FE" },
  { id: "g5", caption: "Inter-house relay on Sports Day", icon: "trophy", tone: "#FED7AA" },
  { id: "g6", caption: "Story hour in the library", icon: "book", tone: "#BAE6FD" },
];
