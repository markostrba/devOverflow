import z from "zod";

export const PASSWORD_RULES = [
  {
    regex: /.{8,}/,
    label: "At least 8 characters",
    errorMessage: "Password must be at least 8 characters long.",
  },
  {
    regex: /[a-z]/,
    label: "At least 1 lowercase letter (a–z)",
    errorMessage: "Add at least one lowercase letter (a–z).",
  },
  {
    regex: /[A-Z]/,
    label: "At least 1 uppercase letter (A–Z)",
    errorMessage: "Add at least one uppercase letter (A–Z).",
  },
  {
    regex: /[0-9]/,
    label: "At least 1 number (0–9)",
    errorMessage: "Include at least one number (0–9).",
  },
  {
    regex: /[^a-zA-Z0-9]/,
    label: "At least 1 special character (e.g. ! @ # $)",
    errorMessage: "Include at least one special character (e.g. ! @ # $ %).",
  },
] as const;

// Derive UI requirements from the config
export const passwordRequirements = PASSWORD_RULES.map(({ regex, label }) => ({
  regex,
  label,
}));

// Programmatically build the Zod schema
let passwordSchema = z.string().max(64, "Password is too long.");

PASSWORD_RULES.forEach((rule) => {
  passwordSchema = passwordSchema.regex(rule.regex, rule.errorMessage);
});

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

  password: passwordSchema,
});

export const signInSchema = z.object({
  email: z.email("Please enter a valid email address."),

  password: passwordSchema,
});
