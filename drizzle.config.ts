import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./db/schema.mjs",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config;
