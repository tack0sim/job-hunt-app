CREATE TYPE "application_type" AS ENUM('initiative', 'advertised');
--> statement-breakpoint
CREATE TYPE "application_status" AS ENUM('pending', 'accepted', 'rejected');
--> statement-breakpoint
CREATE TYPE "platform" AS ENUM('linkedin', 'email', 'company_website', 'pracuj');
--> statement-breakpoint
CREATE TABLE "applications" (
	"id" uuid PRIMARY KEY NOT NULL,
	"job_id" uuid NOT NULL,
	"company_id" uuid NOT NULL,
	"type" "application_type" DEFAULT 'advertised' NOT NULL,
	"status" "application_status" DEFAULT 'pending' NOT NULL,
	"salary" numeric(8, 2),
	"applied_at" date DEFAULT now() NOT NULL,
	"updated_at" date
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"company_id" uuid,
	"platform" "platform" DEFAULT 'company_website' NOT NULL,
	"url" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;