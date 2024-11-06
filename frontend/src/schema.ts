import { integer, pgTableCreator, timestamp, varchar } from "drizzle-orm/pg-core";

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
	id: varchar("id", {length: 32}).primaryKey(),
	name: varchar("name", {length: 50}),
	email: varchar("email", {length: 50})
})

export const product = createTable("product", {
	id: varchar("id", {length: 32}).primaryKey(),
	productName: varchar("name", { length: 50})
})

export const order = createTable("order", {
	id: varchar("id", {length: 32}).primaryKey(),
	customerId: varchar("customer_id", {length: 32}).references(() => customer.id),
	orderDate: timestamp("order_date"),
	shippingMethod: varchar("shipping_method", {length: 50}),
	saleType: varchar("sale_type", {length: 50})
})


export const price = createTable("price", {
	id: varchar("price", {length: 32}).primaryKey(),
	productId: varchar("product_id", {length: 32}).references(() => product.id)
})

export const orderLineItem = createTable("order_line_item", {
	id: varchar("id", {length: 32}).primaryKey(),
	orderId: varchar("order_id", {length: 32}).references(() => order.id),
	priceId: varchar("price_id", {length: 32}).references(() => price.id),
	quantity: integer("quantity")
})