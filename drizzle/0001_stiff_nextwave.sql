CREATE TABLE "mosques" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"contact_info" varchar(255),
	"created_by" serial NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "prayer_times" (
	"id" serial PRIMARY KEY NOT NULL,
	"mosque_id" integer,
	"fajr" varchar(50) NOT NULL,
	"dhuhr" varchar(50) NOT NULL,
	"asr" varchar(50) NOT NULL,
	"maghrib" varchar(50) NOT NULL,
	"isha" varchar(50) NOT NULL,
	"date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "mosques" ADD CONSTRAINT "mosques_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prayer_times" ADD CONSTRAINT "prayer_times_mosque_id_mosques_id_fk" FOREIGN KEY ("mosque_id") REFERENCES "public"."mosques"("id") ON DELETE no action ON UPDATE no action;