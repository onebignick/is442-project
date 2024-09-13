import { pgTableCreator, varchar, uuid, date, integer } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `is442_${name}`);

export const user = createTable("user", {
	id: varchar("id", { length: 32 }).primaryKey(),
	lastSignInAt: varchar("last_sign_in_at", { length: 32 }),
	createdAt: varchar("created_at", { length: 32 }),
	updatedAt: varchar("updated_at", { length: 32 }),
	firstName: varchar("first_name", { length: 32 }),
	lastName: varchar("last_name", {length: 32 }),
	username: varchar("username", { length: 32 }),
});