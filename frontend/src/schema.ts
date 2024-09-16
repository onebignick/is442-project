import { pgTableCreator, uuid, varchar } from "drizzle-orm/pg-core";

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

export const customer = createTable("customer", {
	id: varchar("id", {length: 32}).primaryKey()
})

export const saleType = createTable("sale_type", {
	id: uuid("id").defaultRandom().primaryKey(),
	saleType: varchar("sale_type", {length: 32}),
})

export const product = createTable("product", {
	id: varchar("id", {length: 32}).primaryKey(),
	productName: varchar("product_name", { length: 100 }),
})

export const price = createTable("price", {
	id: varchar("id", {length:32}).primaryKey(),
	price: varchar("price", {length:32}),
	productId: varchar("product_id", {length:32}).references(()=>product.id)
})

export const order = createTable("order", {
	id: uuid("id").defaultRandom().primaryKey(),
})

export const orderLineItem = createTable("order_line_item", {
	id: uuid("id").defaultRandom().primaryKey(),
	orderId: uuid("order_id").references(() => order.id),
	customerId: varchar("customer_id", {length:32}).references(() => customer.id),
	priceId: varchar("price_id", {length:32}).references(()=>price.id)
})