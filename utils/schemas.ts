import { z } from "zod";

export const composeEmailSchema = z.object({
  recipientEmail: z.string({ required_error: "Email is required" })
    .email("Please enter a valid email address"),
  subject: z.string({ required_error: "Subject is required" })
    .max(255, "Subject can't be longer than 255 characters"),
  body: z.string({ required_error: "Body is required" })
    .max(100000, "Message body can't exceed 100,000 characters"),
});
