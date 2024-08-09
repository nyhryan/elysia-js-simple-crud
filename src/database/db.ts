import * as schema from "./schema";
import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

const sqlite = new Database("db/sample.db");
export default drizzle(sqlite, { schema });