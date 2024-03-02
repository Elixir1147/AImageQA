import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "db/schema.mjs";
import postgres from "postgres";
import "dotenv/config";

export const client = postgres(process.env.DATABASE_URL as string, {
  host: "localhost",
  port: 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

export const db = drizzle(client, { schema });
