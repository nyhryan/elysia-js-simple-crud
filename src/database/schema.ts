import { int, text, sqliteTable } from "drizzle-orm/sqlite-core";

export type UserType = typeof usersTable.$inferSelect;

export const usersTable = sqliteTable("users", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { mode: "text" }).notNull(),
  email: text("email", { mode: "text" }).notNull()
});