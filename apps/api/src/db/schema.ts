import { integer, pgTable, varchar, pgEnum, numeric, date, uuid } from "drizzle-orm/pg-core";

const applicationTypes = pgEnum("application_type", ["initiative", "advertised"]);
const applicationStatuses = pgEnum("application_status", ["pending", "accepted", "rejected"]);
const platforms = pgEnum("platform", ["linkedin", "email", "company_website", "pracuj"]);


export const companies = pgTable("companies", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull().unique(),
});

export const jobs = pgTable("jobs", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 255 }).notNull(),
    company: uuid("company_id").references(() => companies.id),
    platform: platforms().notNull().default("company_website"),
    url: varchar({ length: 255 }),
});

export const applications = pgTable("applications", {
    id: uuid().primaryKey().defaultRandom(),
    job: uuid("job_id").notNull().references(() => jobs.id),
    company: uuid("company_id").notNull().references(() => companies.id),
    type: applicationTypes().notNull().default("advertised"),
    status: applicationStatuses().notNull().default("pending"),
    salary: numeric("salary", {precision: 8, scale: 2}),
    appliedAt: date("applied_at").notNull().defaultNow(),
    updatedAt: date("updated_at")
});