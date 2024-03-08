import { string, z } from "zod";

export const SignUpValidation = z
  .object({
    username: string()
      .trim()
      .min(4, { message: "Username should be at least 4 chars" }),
    email: z.string().email().trim(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .trim(),
    confPassword: z.string().trim(),
  })
  .refine((value) => value.confPassword === value.password, {
    message: "Password does not match!",
    path: ["confPassword"],
  });

export const SignInValidation = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8, "Password must be at least 8 characters").trim(),
});
