import z from "zod";
import { signInSchema, signUpSchema } from "@/lib/validations/auth-validations";

describe("signUpSchema", () => {
  const validData = {
    email: "test@test.com",
    username: "valid_user",
    name: "Valid Name",
    password: "Password123!",
  };

  test("should pass with valid data", () => {
    const result = signUpSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe("Email validation", () => {
    test("should reject invalid email format", () => {
      const result = signUpSchema.safeParse({
        ...validData,
        email: "invalid-email",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        const error = z.treeifyError(result.error);

        expect(error?.properties?.email).toBeDefined();
      }
    });

    test("should reject empty email", () => {
      const result = signUpSchema.safeParse({
        ...validData,
        email: "",
      });

      expect(result.success).toBe(false);
    });
  });

  describe("Username validation", () => {
    test("should reject username shorter than 3 chars", () => {
      const result = signUpSchema.safeParse({
        ...validData,
        username: "ab",
      });
      expect(result.success).toBe(false);
    });

    test("should allow underscores and numbers", () => {
      const result = signUpSchema.safeParse({
        ...validData,
        username: "user_123",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("Name validation", () => {
    test("should reject names with special characters", () => {
      const result = signUpSchema.safeParse({
        ...validData,
        name: "John@Doe",
      });

      expect(result.success).toBe(false);
    });

    test("should reject too short name", () => {
      const result = signUpSchema.safeParse({
        ...validData,
        name: "Jo",
      });

      expect(result.success).toBe(false);
    });
  });

  describe("Password validation", () => {
    const cases = [
      ["no uppercase", "password123!"],
      ["no lowercase", "PASSWORD123!"],
      ["no number", "Password!"],
      ["no special char", "Password123"],
      ["too short", "Pas1!"],
      ["too long", `${"P".repeat(64)}a1!`],
    ];

    it.each(cases)("should fail when %s", (_, password) => {
      const result = signUpSchema.safeParse({
        ...validData,
        password,
      });

      expect(result.success).toBe(false);
    });
  });
});

describe("signInSchema", () => {
  const validData = {
    email: "test@test.com",
    password: "Password123!",
  };

  test("should pass with valid data", () => {
    const result = signInSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe("Email validation", () => {
    test("should reject invalid email format", () => {
      const result = signInSchema.safeParse({
        ...validData,
        email: "invalid-email",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        const error = z.treeifyError(result.error);

        expect(error?.properties?.email).toBeDefined();
      }
    });

    test("should reject empty email", () => {
      const result = signInSchema.safeParse({
        ...validData,
        email: "",
      });

      expect(result.success).toBe(false);
    });
  });
  describe("Password validation", () => {
    const cases = [
      ["no uppercase", "password123!"],
      ["no lowercase", "PASSWORD123!"],
      ["no number", "Password!"],
      ["no special char", "Password123"],
      ["too short", "Pas1!"],
      ["too long", `${"P".repeat(64)}a1!`],
    ];

    it.each(cases)("should fail when %s", (_, password) => {
      const result = signInSchema.safeParse({
        ...validData,
        password,
      });

      expect(result.success).toBe(false);
    });
  });
});
