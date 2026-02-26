import { APIError, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware } from "better-auth/api";
import { db } from "@/db/client";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-up")) {
        const { username } = ctx.body;

        const existing = await db.query.user.findFirst({
          where: (users, { eq }) => eq(users.username, username),
        });

        if (existing) {
          throw new APIError("BAD_REQUEST", {
            message: "Username already taken",
            code: "USERNAME_ALREADY_EXISTS",
          });
        }
      }
    }),
    after: createAuthMiddleware(async (ctx) => {
      const path = ctx.path;
      const response = ctx.context.returned as APIError;
      console.log("ress", response.body);

      if (
        path.startsWith("/sign-up") &&
        response.body?.code === "USER_ALREADY_EXISTS"
      ) {
        throw new APIError("BAD_REQUEST", {
          ...response.body,
        });
      }
    }),
  },

  user: {
    additionalFields: {
      username: {
        type: "string",
        unique: true,
        input: true, // allow users to set it on signup
      },
    },
  },
});
