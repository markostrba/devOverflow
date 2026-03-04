import { drizzle } from "drizzle-orm/neon-http";

const DB_URL = process.env.DATABASE_URL;
console.log("DB_URL", DB_URL, process.env.NODE_ENV);

if (!DB_URL) {
  throw new Error("DATABASE_URL env is missing");
}
export const db = drizzle(DB_URL);
