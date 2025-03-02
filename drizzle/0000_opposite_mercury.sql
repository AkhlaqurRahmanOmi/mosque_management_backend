CREATE TABLE "donations" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"donor_name" text,
	"amount" integer NOT NULL,
	"date" timestamp DEFAULT now(),
	"payment_method" text NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "expenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"cost_type" text NOT NULL,
	"amount" integer NOT NULL,
	"date" timestamp DEFAULT now(),
	"paid_by" text NOT NULL,
	"notes" text,
	"payment_method" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" varchar(50) DEFAULT 'user' NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"otp" varchar(6),
	"otp_expires_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
