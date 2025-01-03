import { integer, pgTableCreator, varchar } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `is442_${name}`);

export const user = createTable("user", {
	id: varchar("id", { length: 255 }).primaryKey(),
	clerkUserId: varchar("clerk_user_id", { length:32 }),
	username: varchar("username", { length: 32 }),
	password: varchar("password"),
	email: varchar("email", {length: 100}),
	role: varchar("role"),
});

export const customer = createTable("customer", {
	id: varchar("id", {length: 255}).primaryKey(),
	stripeCustomerId: varchar("stripe_customer_id", { length: 32 }),
	name: varchar("name", {length: 50}),
	email: varchar("email", {length: 50})
})

export const product = createTable("product", {
	id: varchar("id", {length: 255}).primaryKey(),
	stripeProductId: varchar("stripe_product_id", { length: 32}),
	productName: varchar("name", { length: 50})
})

export const order = createTable("order", {
	id: varchar("id", {length: 255}).primaryKey(),
	invoiceId: varchar("invoice_id", {length: 50}),
	customerId: varchar("customer_id", {length: 50}).references(() => customer.id),
	salesDate: varchar("sales_date", {length: 50}),
	salesType: varchar("sales_type", {length: 50}),
	shippingMethod: varchar("shipping_method", {length: 50}),
	address: varchar("address", {length: 50})
})

export const price = createTable("price", {
	id: varchar("id", {length: 255}).primaryKey(),
	stripePriceId: varchar("stripe_price_id", {length: 32}),
	price: varchar("price", {length: 32}),
	productId: varchar("product_id", {length: 255}).references(() => product.id)
})

export const orderLineItem = createTable("order_line_item", {
	id: varchar("id", {length: 255}).primaryKey(),
	orderId: varchar("order_id", {length: 255}).references(() => order.id),
	priceId: varchar("price_id", {length: 255}).references(() => price.id),
	quantity: integer("quantity")
})

export const template = createTable("template", {
	id: varchar("id", {length: 255}).primaryKey(),
	name: varchar("name", {length: 50}),
	content: varchar("content", {length: 5000})
})