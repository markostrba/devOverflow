import z from "zod";

export const passwordRequirements = [
  { regex: /.{8,}/, label: "At least 8 characters" },
  { regex: /[a-z]/, label: "At least 1 lowercase letter (a\u2013z)" },
  { regex: /[A-Z]/, label: "At least 1 uppercase letter (A\u2013Z)" },
  { regex: /[0-9]/, label: "At least 1 number (0\u20139)" },
  {
    regex: /[^a-zA-Z0-9]/,
    label: "At least 1 special character (e.g. ! @ # $)",
  },
] as const;

export const signUpSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters long.")
    .max(20, "Username cannot be longer than 20 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Use only letters, numbers, or underscores — no spaces.",
    ),

  name: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters long.")
    .max(50, "Full name is too long.")
    .regex(
      /^[\p{L}0-9' -]+$/u,
      "Full name can only contain letters, numbers, and spaces.",
    ),

  email: z.email("Please enter a valid email address."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(64, "Password is too long.")
    .regex(/[A-Z]/, "Add at least one uppercase letter (A–Z).")
    .regex(/[a-z]/, "Add at least one lowercase letter (a–z).")
    .regex(/[0-9]/, "Include at least one number (0–9).")
    .regex(
      /[^a-zA-Z0-9]/,
      "Include at least one special character (e.g. ! @ # $ %).",
    ),
});
