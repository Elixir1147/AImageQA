import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import "dotenv/config";
export const sql = postgres(process.env.DATABASE_URL, {
    host: "localhost",
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
});
const db = drizzle(sql);
await migrate(db, { migrationsFolder: "drizzle" });
await sql.end();