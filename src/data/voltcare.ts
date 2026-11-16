/** VoltCare Services concept demo: a fictional electrical and electronics repair company. All services, prices, areas and tickets are made up. */

export const categories = ["Cooling", "Power backup", "Wiring", "Appliances", "Security"] as const;
export type ServiceCategory = (typeof categories)[number];

export type RepairService = {
  id: string;
  name: string;
  category: ServiceCategory;
  /** Starting price in rupees (fictional). */
  from: number;
  time: string;
  blurb: string;
  icon: "snow" | "battery" | "plug" | "tv" | "washing" | "fridge" | "camera" | "wrench";
};

export const services: RepairService[] = [
  { id: "ac-service", name: "AC service and gas refill", category: "Cooling", from: 599, time: "About 1 hour", blurb: "Filter cleaning, coil wash, gas pressure check and a cooling test.", icon: "snow" },
  { id: "ac-install", name: "AC installation", category: "Cooling", from: 1499, time: "2 to 3 hours", blurb: "Wall mounting, piping, wiring and a full trial run.", icon: "wrench" },
  { id: "inverter-check", name: "Inverter and battery check", category: "Power backup", from: 399, time: "About 45 minutes", blurb: "Load test, terminal cleaning and a written health report.", icon: "battery" },
  { id: "battery-replace", name: "Battery replacement", category: "Power backup", from: 799, time: "About 1 hour", blurb: "Old battery taken away, new one fitted and tested on load.", icon: "battery" },
  { id: "home-wiring", name: "Home rewiring", category: "Wiring", from: 1999, time: "1 to 3 days", blurb: "Safe re-wiring of rooms with concealed conduits and neat finishing.", icon: "plug" },
  { id: "switchboard", name: "Switchboard and MCB repair", category: "Wiring", from: 299, time: "30 to 60 minutes", blurb: "Sparking switches, tripping MCBs and loose sockets made safe.", icon: "plug" },
  { id: "tv-repair", name: "TV and display repair", category: "Appliances", from: 499, time: "Same day to 3 days", blurb: "Panel, backlight and power board faults on LED and LCD TVs.", icon: "tv" },
  { id: "washing-machine", name: "Washing machine repair", category: "Appliances", from: 449, time: "About 1 hour", blurb: "Drum, drain and control board problems on top and front loaders.", icon: "washing" },
  { id: "fridge", name: "Refrigerator repair", category: "Appliances", from: 499, time: "About 1 to 2 hours", blurb: "Cooling, compressor and door seal problems on single and double door models.", icon: "fridge" },
  { id: "cctv", name: "CCTV installation", category: "Security", from: 2499, time: "Half a day", blurb: "Cameras, recorder, cabling and a phone viewing setup.", icon: "camera" },
];

export const areas = ["Lakeview", "Greenfield Colony", "Station Road", "Riverside", "Hill Park"];
export const days = ["Tomorrow", "Day after tomorrow", "In three days"];
export const slots = ["Morning, 9 to 12", "Afternoon, 12 to 3", "Evening, 3 to 6"];

/** Steps every ticket moves through. */
export const ticketSteps = ["Booked", "Technician assigned", "On the way", "Work done", "Closed"] as const;

export type Ticket = { id: string; service: string; area: string; step: number; note: string };

export const tickets: Ticket[] = [
  { id: "VC-1001", service: "AC service and gas refill", area: "Lakeview", step: 0, note: "We have your booking and will assign a technician shortly." },
  { id: "VC-1002", service: "Washing machine repair", area: "Riverside", step: 1, note: "Technician Ravi is assigned and will call before arriving." },
  { id: "VC-1003", service: "Home rewiring", area: "Hill Park", step: 3, note: "Work is done. Please check the switches and confirm." },
  { id: "VC-1004", service: "Inverter and battery check", area: "Station Road", step: 4, note: "Closed. The health report was shared with you." },
];

export const reasons = [
  { title: "Upfront price", text: "You see the starting price before you book, and the technician confirms it before work begins." },
  { title: "Tidy work", text: "Technicians clean up after the job and take away old parts." },
  { title: "30-day repair cover", text: "If the same fault returns within 30 days, we fix it again at no labour charge." },
];
