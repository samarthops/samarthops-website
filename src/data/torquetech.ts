/** TorqueTech Components concept demo: a fictional mechanical parts manufacturer. All parts, sizes and quantities are made up. */

export const categories = ["Shafts", "Gears", "Fasteners", "Flanges and housings", "Bushings"] as const;
export type PartCategory = (typeof categories)[number];

export const materials = [
  "EN8 steel",
  "Stainless steel 304",
  "Mild steel",
  "Brass",
  "Phosphor bronze",
  "Aluminium 6061",
] as const;
export type Material = (typeof materials)[number];

export type Part = {
  id: string;
  code: string;
  name: string;
  category: PartCategory;
  material: Material;
  process: string;
  /** Minimum order quantity, in pieces. */
  moq: number;
  blurb: string;
  specs: [label: string, value: string][];
};

export const parts: Part[] = [
  { id: "drive-shaft", code: "TT-SH-101", name: "Stepped drive shaft", category: "Shafts", material: "EN8 steel", process: "CNC turning", moq: 50, blurb: "Stepped shaft with a keyway, ground on the bearing seats.", specs: [["Diameter", "25 mm"], ["Length", "180 mm"], ["Tolerance", "±0.02 mm"], ["Finish", "Ground"]] },
  { id: "hollow-spindle", code: "TT-SH-102", name: "Hollow spindle", category: "Shafts", material: "Stainless steel 304", process: "CNC turning", moq: 25, blurb: "Hollow spindle for pumps and small gearboxes.", specs: [["Outer diameter", "32 mm"], ["Bore", "18 mm"], ["Length", "120 mm"], ["Tolerance", "±0.02 mm"]] },
  { id: "spur-gear-24", code: "TT-GR-201", name: "Spur gear, 24 teeth", category: "Gears", material: "EN8 steel", process: "Gear hobbing", moq: 100, blurb: "General purpose spur gear with a keyed bore.", specs: [["Module", "2"], ["Teeth", "24"], ["Bore", "20 mm"], ["Face width", "20 mm"]] },
  { id: "brass-gear-18", code: "TT-GR-202", name: "Brass spur gear, 18 teeth", category: "Gears", material: "Brass", process: "Gear hobbing", moq: 100, blurb: "Quiet running brass gear for light loads and meters.", specs: [["Module", "1.5"], ["Teeth", "18"], ["Bore", "10 mm"], ["Face width", "12 mm"]] },
  { id: "hex-bolt", code: "TT-FS-301", name: "Hex bolt M10 x 50", category: "Fasteners", material: "Stainless steel 304", process: "CNC turning", moq: 500, blurb: "Full thread hex bolt, supplied with an inspection sheet.", specs: [["Thread", "M10"], ["Length", "50 mm"], ["Head", "Hexagon, 17 mm"], ["Pitch", "1.5 mm"]] },
  { id: "flange-nut", code: "TT-FS-302", name: "Flange nut M12", category: "Fasteners", material: "Mild steel", process: "CNC turning", moq: 1000, blurb: "Zinc plated flange nut with a serrated face.", specs: [["Thread", "M12"], ["Flange diameter", "26 mm"], ["Height", "11 mm"], ["Plating", "Zinc"]] },
  { id: "stud", code: "TT-FS-303", name: "Double-ended stud M16", category: "Fasteners", material: "EN8 steel", process: "CNC turning", moq: 300, blurb: "Double-ended stud for heavy flanged joints.", specs: [["Thread", "M16"], ["Length", "90 mm"], ["Pitch", "2 mm"], ["Class", "8.8"]] },
  { id: "pipe-flange", code: "TT-FL-401", name: "Pipe flange DN50", category: "Flanges and housings", material: "Mild steel", process: "CNC turning and drilling", moq: 20, blurb: "Flat face pipe flange with a drilled bolt circle.", specs: [["Nominal size", "DN50"], ["Outer diameter", "165 mm"], ["Bolt holes", "4"], ["Thickness", "18 mm"]] },
  { id: "blind-flange", code: "TT-FL-402", name: "Blind flange DN80", category: "Flanges and housings", material: "Stainless steel 304", process: "CNC turning and drilling", moq: 10, blurb: "Blind flange to close the end of a pipe line.", specs: [["Nominal size", "DN80"], ["Outer diameter", "200 mm"], ["Bolt holes", "8"], ["Thickness", "20 mm"]] },
  { id: "bearing-housing", code: "TT-FL-403", name: "Bearing housing", category: "Flanges and housings", material: "Aluminium 6061", process: "CNC milling", moq: 40, blurb: "Light housing with two mounting lugs for a 6205 bearing.", specs: [["Bore", "52 mm"], ["Mounting holes", "2 x 9 mm"], ["Height", "60 mm"], ["Finish", "Anodised"]] },
  { id: "bronze-bush", code: "TT-BU-501", name: "Bronze bush 30 x 40", category: "Bushings", material: "Phosphor bronze", process: "CNC turning", moq: 100, blurb: "Plain bush for slow moving shafts and hinges.", specs: [["Inner diameter", "30 mm"], ["Outer diameter", "40 mm"], ["Length", "35 mm"], ["Fit", "H7 bore"]] },
  { id: "alu-sleeve", code: "TT-BU-502", name: "Aluminium sleeve", category: "Bushings", material: "Aluminium 6061", process: "CNC turning", moq: 100, blurb: "Light spacer sleeve for fixtures and conveyors.", specs: [["Inner diameter", "16 mm"], ["Outer diameter", "22 mm"], ["Length", "30 mm"], ["Finish", "Natural"]] },
];

export const capabilities = [
  { title: "CNC turning", text: "Shafts, bushes, nuts and bolts up to 120 mm diameter." },
  { title: "CNC milling", text: "Housings, brackets and flat parts with pockets and slots." },
  { title: "Gear hobbing", text: "Spur and helical gears from module 1 to module 4." },
  { title: "Drilling and tapping", text: "Bolt circles, tapped holes and threads to your drawing." },
  { title: "Surface treatment", text: "Zinc plating, anodising, black oxide and grinding." },
  { title: "Inspection", text: "Dimension check and a report with every batch." },
];

export const processSteps = [
  { title: "Send your drawing", text: "Share a drawing or a sample and the quantity you need." },
  { title: "Get a quote", text: "We reply with the price, material and delivery time." },
  { title: "Approve a sample", text: "We make a few pieces so you can check the fit." },
  { title: "Batch delivery", text: "We produce the order, inspect it and ship it with a report." },
];

export const deliveryOptions = ["Within 2 weeks", "2 to 4 weeks", "More than 4 weeks"];
