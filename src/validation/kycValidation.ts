import { z } from "zod";

export const kycSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, "File is required.")
    .refine(
      (file) =>
        ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
      "File must be a PDF, JPEG, or PNG."
    ),
});

export type KycFormValues = z.infer<typeof kycSchema>;
