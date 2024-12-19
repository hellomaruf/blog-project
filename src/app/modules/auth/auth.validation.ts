import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(["admin", "user"]).optional(),
    isBlocked: z.boolean().optional(),
  }),
});

export const userValidation = {
  userValidationSchema,
};
