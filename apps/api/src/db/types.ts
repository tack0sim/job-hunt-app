import type { companies, jobs, applications } from "./schema.ts";

export type Company = typeof companies.$inferSelect;
export type CompanyInsert = typeof companies.$inferInsert;

export type Job = typeof jobs.$inferSelect;
export type JobInsert = typeof jobs.$inferInsert;

export type Application = typeof applications.$inferSelect;
export type ApplicationInsert = typeof applications.$inferInsert;
