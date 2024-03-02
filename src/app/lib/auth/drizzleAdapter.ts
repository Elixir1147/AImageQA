import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { user, session } from "db/schema.mjs";

const sql = postgres(process.env.DATABASE_URL as string, {
  host: "localhost",
  port: 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});
const db = drizzle(sql);

export const adapter: DrizzlePostgreSQLAdapter = new DrizzlePostgreSQLAdapter(
  db,
  session,
  user
);
