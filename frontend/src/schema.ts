import { integer, pgTableCreator, timestamp, varchar } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `is442_${name}`);

export const user = createTable("user", {
	username: varchar("username", { length: 32 }).primaryKey(),
	password: varchar("password"),
	roles: varchar("roles"),
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
	salesDate: timestamp("sales_date"),
	saleType: varchar("sale_type", {length: 50}),
	shippingMethod: varchar("shipping_method", {length: 50}),
	address: varchar("address", {length: 50})
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

export const template = createTable("template", {
	id: varchar("id", {length: 32}).primaryKey(),
	name: varchar("name", {length: 50}),
	content: varchar("content", {length: 5000})
})