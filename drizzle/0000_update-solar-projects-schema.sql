CREATE TYPE "public"."shop_location" AS ENUM('Under-G', 'Randa', 'Both');--> statement-breakpoint
CREATE TYPE "public"."stock_status" AS ENUM('in-stock', 'low-stock', 'out-of-stock');--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"category" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"stock" "stock_status" DEFAULT 'in-stock' NOT NULL,
	"shop" "shop_location" DEFAULT 'Both' NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "solar_projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"image" text NOT NULL,
	"location" text,
	"kva" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "store_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"price" numeric(10, 2) DEFAULT '1000.00' NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
