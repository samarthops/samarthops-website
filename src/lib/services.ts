/** Service options for the enquiry form. Kept free of zod so the browser bundle stays small. */
export const SERVICES = [
  { value: "android", label: "Android app" },
  { value: "website", label: "Website" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "custom-software", label: "Custom software" },
  { value: "hrms", label: "SamarthOps HRMS" },
  { value: "other", label: "Other" },
] as const;

export type ServiceValue = (typeof SERVICES)[number]["value"];

export function serviceLabel(value: ServiceValue): string {
  return SERVICES.find((s) => s.value === value)?.label ?? value;
}
