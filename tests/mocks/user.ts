// tests/mocks/user.ts
import type { User } from "better-auth";

export const createMockUser = (
  overrides: Partial<User & { username?: string }> = {},
) => {
  return {
    id: "user_123",
    name: "Test User",
    email: "test@example.com",
    password: "Password123!",
    emailVerified: false,
    image: null,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
    username: "",
    ...overrides,
  };
};
