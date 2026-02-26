import { drizzle } from "drizzle-orm/neon-http";

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
  throw new Error("DATABASE_URL env is missing");
}

export const db = drizzle(DB_URL);
