import {
  pgTable,
  serial,
  text,
  timestamp,
  decimal,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";

// Singleton table for store-wide settings like Gas Price
export const storeSettings = pgTable("store_settings", {
  id: serial("id").primaryKey(),
  // Using text for currency to avoid float precision issues, cast to number in app
  price: decimal("price", { precision: 10, scale: 2 })
    .notNull()
    .default("1000.00"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const stockEnum = pgEnum("stock_status", [
  "in-stock",
  "low-stock",
  "out-of-stock",
]);
export const shopEnum = pgEnum("shop_location", ["Under-G", "Randa", "Both"]);

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  stock: stockEnum("stock").notNull().default("in-stock"),
  shop: shopEnum("shop").notNull().default("Both"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const solarProjects = pgTable("solar_projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(), // e.g., "3.5KVA Hostel Setup"
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  completedAt: timestamp("completed_at"),
});
