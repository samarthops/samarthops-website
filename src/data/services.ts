/**
 * Service content. Business copy lives here, not in components.
 * No pricing, timelines, technology names, client names or numbers beyond the approved claims.
 */
import type { ServiceValue } from "@/lib/services";

export type ServicePage = {
  slug: string;
  /** Short name used on cards and in navigation. */
  title: string;
  /** One-line summary for the overview and home cards. */
  summary: string;
  /** Page headline (h1). */
  headline: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  /** Value of the contact form service field. */
  formService: ServiceValue;
  problems: string[];
  features: { title: string; text: string }[];
  useCases: string[];
  faqs: { q: string; a: string }[];
  /** Optional proof link, shown as a callout. */
  proof?: { text: string; href: string; label: string };
};

export const servicePages: ServicePage[] = [
  {
    slug: "android-app-development",
    title: "Android apps",
    summary: "Customised Android applications built around how your business works.",
    headline: "Android App Development for Your Business",
    intro:
      "We design and build customised Android apps that fit your processes: from employee and attendance tracking to customer-facing apps and internal tools.",
    seoTitle: "Android App Development in Pune",
    seoDescription:
      "Customised Android app development by Samarth Ops: business apps, employee management, attendance and tracking apps, integrations and maintenance.",
    formService: "android",
    problems: [
      "Staff work out in the field and you cannot see where they are or when they started.",
      "Attendance, leave and approvals live in paper registers and chat messages.",
      "Off-the-shelf apps force you to change your process instead of fitting it.",
      "Your existing systems do not talk to each other, so data is typed in twice.",
    ],
    features: [
      { title: "Business apps", text: "Apps for your own operations, built around your workflow and your users." },
      { title: "Employee management", text: "Attendance, shifts, leave and documents in one app for your workforce." },
      { title: "Attendance and tracking", text: "Check-in with selfie and location so you know who is where." },
      { title: "Custom apps", text: "Apps designed from your requirements, not a fixed template." },
      { title: "Integrations", text: "Connect the app with your other systems so data flows once." },
      { title: "Maintenance", text: "Updates and fixes after launch so the app keeps working as your business grows." },
    ],
    useCases: [
      "A service company tracking field staff attendance across sites",
      "A business managing shifts, leave and overtime from a phone",
      "A company giving customers a simple app to place requests",
      "A team replacing paper forms with an internal app",
    ],
    faqs: [
      {
        q: "Can the app be built around my own process?",
        a: "Yes. We start by understanding how your business works and design the app around it.",
      },
      {
        q: "Will the app connect with the systems I already use?",
        a: "Integrations are part of the service. Tell us what you use today and we will discuss what can be connected.",
      },
      {
        q: "Do you support the app after launch?",
        a: "Yes. We offer maintenance and technical support after launch.",
      },
      { q: "What do you need from me to get started?", a: "Tell us what the app should do and who will use it. Rough notes, or examples of apps you like, are enough to start." },
    ],
    proof: {
      text: "Our own product, SamarthOps HRMS, is an employee and attendance app for Android, built by us.",
      href: "/products/hrms",
      label: "See SamarthOps HRMS",
    },
  },
  {
    slug: "website-development",
    title: "Websites",
    summary: "Professional, fast websites that present your business well.",
    headline: "Website Development for Your Business",
    intro:
      "We build professional business websites that load quickly, look right on every phone and make it easy for customers to contact you.",
    seoTitle: "Website Development in Pune",
    seoDescription:
      "Business website development by Samarth Ops: corporate, portfolio, educational and service-business websites and landing pages that work well on mobile.",
    formService: "website",
    problems: [
      "You have no website, or the current one looks dated and is hard to use on a phone.",
      "Customers cannot easily find what you offer or how to reach you.",
      "A template site does not reflect your business.",
      "You need a page for one campaign or offer, quickly.",
    ],
    features: [
      { title: "Business and corporate websites", text: "A clear presentation of your company, services and contact details." },
      { title: "Portfolio websites", text: "Show your work in a clean, easy-to-browse layout." },
      { title: "Landing pages", text: "Focused pages for one offer, with a clear call to action." },
      { title: "Educational websites", text: "Courses, faculty, events and admission enquiries for schools and institutes." },
      { title: "Service-business websites", text: "Services, enquiry forms and WhatsApp contact for clinics, agencies and local businesses." },
      { title: "Mobile first", text: "Designed for phones first, so visitors get a good experience on any screen." },
    ],
    useCases: [
      "A company website to present services and win enquiries",
      "A school or institute site with courses and admissions information",
      "A local service business with an enquiry form and WhatsApp button",
      "A single landing page for a new product or offer",
    ],
    faqs: [
      {
        q: "Will the website work well on mobile phones?",
        a: "Yes. We design for mobile first and test on small screens.",
      },
      {
        q: "Can visitors contact me from the website?",
        a: "Yes. We add enquiry forms and a WhatsApp button so visitors can reach you easily.",
      },
      {
        q: "Can you redesign my existing website?",
        a: "Yes. Share your current site and what you want to improve.",
      },
      { q: "What do you need from me to get started?", a: "Your business name, what you offer, and any content or logo you already have. Send what you have and we will ask for the rest as we go." },
    ],
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce",
    summary: "Online stores that make it easy for customers to buy.",
    headline: "E-commerce Website Development",
    intro:
      "We build online stores with a clear catalogue, a simple cart and checkout, and the tools you need to manage products and orders.",
    seoTitle: "E-commerce Website Development in Pune",
    seoDescription:
      "E-commerce website development by Samarth Ops: product catalogue, cart, order management, payment gateway integration and product administration.",
    formService: "ecommerce",
    problems: [
      "You sell through chat messages and phone calls and lose track of orders.",
      "Customers cannot browse your products or see what is available.",
      "Taking payments online is complicated or unreliable.",
      "Updating products and prices is slow.",
    ],
    features: [
      { title: "Product catalogue", text: "Categories, search and filters so customers find products fast." },
      { title: "Cart and checkout", text: "A simple path from product to order." },
      { title: "Order management", text: "See and handle orders in one place." },
      { title: "Payment gateway integration", text: "Accept online payments through a payment gateway." },
      { title: "Product administration", text: "Add and update products, prices and availability yourself." },
      { title: "Storefronts", text: "A storefront that presents your brand and works well on mobile." },
    ],
    useCases: [
      "A retailer taking its catalogue online",
      "A food business accepting online orders",
      "A small brand selling directly to customers",
      "A shop replacing chat-based ordering with a proper store",
    ],
    faqs: [
      {
        q: "Can customers pay online?",
        a: "Yes. Payment gateway integration is part of the service.",
      },
      {
        q: "Can I manage my own products?",
        a: "Yes. The store includes product administration so you can update products and availability.",
      },
      {
        q: "Will the store work on phones?",
        a: "Yes. We design stores mobile first.",
      },
      { q: "What do you need from me to get started?", a: "A list of the products you want to sell and how you want customers to pay. Rough details are fine to start." },
    ],
  },
  {
    slug: "custom-software-development",
    title: "Custom software",
    summary: "Software tailored to your processes, built to scale, including business automation.",
    headline: "Custom Software Development",
    intro:
      "We build software around your business: management systems, workflow automation, reporting dashboards and database-driven applications that replace repetitive manual work.",
    seoTitle: "Custom Software Development in Pune",
    seoDescription:
      "Custom software development by Samarth Ops: business management systems, workflow automation, reporting dashboards and database-driven applications.",
    formService: "custom-software",
    problems: [
      "Teams repeat the same manual work in spreadsheets every day.",
      "Information is scattered, so reports take a long time to prepare.",
      "Approvals and hand-offs depend on messages and memory.",
      "Ready-made software does not match how you operate.",
    ],
    features: [
      { title: "Business management systems", text: "One system for the records and tasks your business runs on." },
      { title: "Workflow automation", text: "Automate repetitive steps and approvals so work moves without chasing." },
      { title: "Reporting dashboards", text: "See the numbers you need without building reports by hand." },
      { title: "Database-driven applications", text: "Applications built on well-organised data that can grow with you." },
      { title: "Scalable foundations", text: "Built so you can add users and features later." },
      { title: "Support", text: "Fixes and updates after launch." },
    ],
    useCases: [
      "Replacing spreadsheets with a management system",
      "Automating an approval workflow",
      "A dashboard that brings daily figures together",
      "An internal tool for a process specific to your business",
    ],
    faqs: [
      {
        q: "Can you automate our manual processes?",
        a: "Yes. Describe the process and we will discuss how to simplify and automate it.",
      },
      {
        q: "Can the software grow as my business grows?",
        a: "We build on scalable foundations so you can add users and features later.",
      },
      {
        q: "Do you offer support after delivery?",
        a: "Yes. We stay available for fixes and questions after launch.",
      },
      { q: "What do you need from me to get started?", a: "Describe the work you want to speed up and how it is done today (for example spreadsheets, paper or an old tool)." },
    ],
  },
];

export const approach = [
  { title: "Discover", text: "We learn how your business works and what you need." },
  { title: "Design", text: "We plan the screens and flows before building." },
  { title: "Build", text: "We develop the solution and share progress." },
  { title: "Test", text: "We test it thoroughly before release." },
  { title: "Launch", text: "We release it and help you get started." },
  { title: "Support", text: "We stay available for fixes, updates and questions." },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((s) => s.slug === slug);
}

/** Home page cards, derived from the service pages. */
export const services = servicePages.map((s) => ({
  title: s.title,
  text: s.summary,
  href: `/services/${s.slug}`,
}));

export const whySamarth = [
  { title: "Customised solutions", text: "Built for your business, not a one-size-fits-all template." },
  { title: "Practical business understanding", text: "We start from how you operate and what you need to fix." },
  { title: "Modern development", text: "Current tools and clean engineering." },
  { title: "Affordable pricing", text: "Sensible costs for growing businesses." },
  { title: "Scalable architecture", text: "Foundations that grow with you." },
  { title: "Technical support", text: "Help is available after launch." },
];
