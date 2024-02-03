import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import postgres from "postgres";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import { user, session } from "db/schema";

const sql = postgres(process.env.DATABASE_URL as string, {
  host: "localhost",
  port: 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});
const db = drizzle(sql);

export const adapter = new DrizzlePostgreSQLAdapter(db, session, user);
