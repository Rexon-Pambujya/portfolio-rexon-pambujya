import { z } from "zod";

/** Shared by the client form and the API route, so they cannot drift. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please tell me your name.")
    .max(80, "That name is suspiciously long."),
  email: z.string().trim().email("That doesn't look like an email address."),
  subject: z
    .string()
    .trim()
    .min(3, "A few words about what this is regarding.")
    .max(140, "Try to keep the subject under 140 characters."),
  message: z
    .string()
    .trim()
    .min(20, "A little more detail would help — 20 characters minimum.")
    .max(4000, "That's longer than I can accept here. Email me directly?"),
  /** Honeypot. Must stay empty. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export default contactSchema;
