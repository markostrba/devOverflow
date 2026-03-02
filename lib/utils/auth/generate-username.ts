import { APIError, type User } from "better-auth";
import { db } from "@/db/client";

export async function generateUniqueUsername(
  baseUser: User & Record<string, unknown>,
) {
  if (baseUser.username) return null;

  let attempts = 0;
  const maxAttempts = 5;

  while (attempts < maxAttempts) {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const candidate = `user${randomSuffix}`;

    const existingUser = await db.query.user.findFirst({
      where: (users, { eq }) => eq(users.username, candidate),
    });

    if (!existingUser) {
      return candidate;
    }
    attempts++;
  }

  throw new APIError("INTERNAL_SERVER_ERROR", {
    message: "Could not generate a unique username.",
  });
}
