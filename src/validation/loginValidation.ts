import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email address is invalid"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be no more than 20 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
