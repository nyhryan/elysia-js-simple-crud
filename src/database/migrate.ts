import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import db from "./db";

migrate(db, { migrationsFolder: "./drizzle" })
console.log("Database migrated successfully! 🤗");