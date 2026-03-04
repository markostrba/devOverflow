import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";

export async function getTestAuthUtils() {
  const ctx = await auth.$context;
  return ctx.test;
}

export const EXISTING_TEST_USER = {
  fullName: "John Doe",
  email: "johndoetestuser@test.com",
  username: "testuser123",
  password: "4m#ffkKBjdY2sWd",
};

export const TEST_USER = {
  fullName: "Test User",
  email: `test-${Date.now().toString().slice(-8)}@example.com`,
  username: `testuser_${Date.now().toString().slice(-8)}`,
  password: "Password123!",
};

export async function cleanupTestUser(email: string) {
  await db.delete(user).where(eq(user.email, email));
}
