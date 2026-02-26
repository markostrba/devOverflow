import { APIError, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware } from "better-auth/api";
import { db } from "@/db/client";
import * as schema from "@/db/schema";

const gitHubClientId = process.env.GITHUB_CLIENT_ID;
const gitHubClientSecret = process.env.GITHUB_CLIENT_SECRET;

if (!gitHubClientId) {
  throw new Error("GITHUB_CLIENT_ID env is missing");
}

if (!gitHubClientSecret) {
  throw new Error("GITHUB_CLIENT_SECRET env is missing");
}

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId) {
  throw new Error("GOOGLE_CLIENT_ID env is missing");
}

if (!googleClientSecret) {
  throw new Error("GOOGLE_CLIENT_SECRET env is missing");
}

const betterAuthUrl = process.env.BETTER_AUTH_URL;

if (!betterAuthUrl) {
  throw new Error("BETTER_AUTH_URL env is missing");
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: betterAuthUrl,

  socialProviders: {
    github: {
      clientId: gitHubClientId,
      clientSecret: gitHubClientSecret,
    },
    google: {
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    },
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
      const response = ctx.context.returned;

      if (response instanceof APIError) {
        // 2. Handle specific sign-up conflicts
        if (path === "/sign-up") {
          const errorCode = response.body?.code;

          if (errorCode === "USER_ALREADY_EXISTS") {
            throw new APIError("BAD_REQUEST", {
              message: "Email already in use.",
              code: "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL",
            });
          }

          if (errorCode === "USERNAME_ALREADY_EXISTS") {
            // Keep consistency with your frontend logic
            throw new APIError("BAD_REQUEST", {
              message: "Username is taken.",
              code: "USERNAME_ALREADY_EXISTS",
            });
          }
        }
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
