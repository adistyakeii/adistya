import * as z from "zod";

export const loginValueSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginValues = z.infer<typeof loginValueSchema>;
