import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Email address is invalid"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be no more than 20 characters"),
    confirmPassword: z.string(),
    role: z.enum(["User", "Admin"], { required_error: "Role is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
