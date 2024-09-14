import { z } from "zod";

export const composeEmailSchema = z.object({
  recipientEmail: z.string({ required_error: "Email is required" }).email(),
  subject: z.string({ required_error: "Subject is required" }).max(255),
  body: z.string({ required_error: "Subject is required" }).max(100000),
});
