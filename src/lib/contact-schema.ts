import { z } from "zod";
import { SERVICES, type ServiceValue } from "./services";

/**
 * Enquiry form schema. Imported by the browser form AND by the Pages Function
 * (relative import there), so both sides validate identically.
 */
export { SERVICES, serviceLabel, type ServiceValue } from "./services";

const serviceValues = SERVICES.map((s) => s.value) as [ServiceValue, ...ServiceValue[]];

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "Name is too long"),
  business: z.string().trim().max(120, "Business name is too long"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9][0-9\s-]{6,17}$/, "Please enter a valid mobile number"),
  email: z.union([z.literal(""), z.string().trim().email("Please enter a valid e-mail").max(120)]),
  service: z.enum(serviceValues, { message: "Please choose a service" }),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters)")
    .max(2000, "Message is too long (2000 characters at most)"),
  consent: z.literal(true, { message: "Please confirm to continue" }),
  /** Honeypot: real visitors never see or fill this field. */
  website: z.string().max(0),
  turnstileToken: z.string().min(1, "Please complete the verification"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const MAX_BODY_BYTES = 10 * 1024;
