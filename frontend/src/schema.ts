import { pgTableCreator, varchar, uuid } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `is442_${name}`);

export const user = createTable("user", {
	id: uuid("id").defaultRandom().primaryKey(),
	clerkUserId: varchar("clerk_user_id", { length: 32 }).unique(),
});