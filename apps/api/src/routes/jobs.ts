import { Router, type Request, type Response } from "express";
import db from "../db/index.ts";
import { jobs, companies } from "../db/schema.ts";
import type { Company, JobInsert } from "../db/types.ts";
import { eq } from "drizzle-orm";

const jobsRouter = Router();

const uuidRegex =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// GET - fetch all jobs, optional ?company_id= filter
jobsRouter.get("/", async (req: Request, res: Response) => {
	const { company_id } = req.query;
	const companyId = company_id as string;

	if (company_id !== undefined && !uuidRegex.test(companyId)) {
		return res.status(400).json({ message: "company_id must be a valid UUID" });
	}

	try {
		const query = db.select().from(jobs);
		const result = company_id
			? await query.where(eq(jobs.company, companyId))
			: await query;
		res.status(200).json({ message: "Fetched all jobs", data: result });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to fetch jobs", error });
	}
});

// POST - create a new job
jobsRouter.post("/", async (req: Request, res: Response) => {
	const {
		title,
		company_id,
		platform,
		url,
	}: Pick<JobInsert, "title" | "platform" | "url"> & {
		company_id?: Company["id"];
	} = req.body;

	if (!title || typeof title !== "string") {
		return res
			.status(400)
			.json({ message: "title is required and must be a string" });
	}

	if (company_id !== undefined) {
		if (!uuidRegex.test(company_id)) {
			return res
				.status(400)
				.json({ message: "company_id must be a valid UUID" });
		}
		const companyExists = await db
			.select()
			.from(companies)
			.where(eq(companies.id, company_id));
		if (!companyExists.length) {
			return res
				.status(404)
				.json({ message: `Company with ID: ${company_id} not found` });
		}
	}

	try {
		await db
			.insert(jobs)
			.values({ title, company: company_id ?? null, platform, url });
		res.status(201).json({ message: `Created job: ${title}` });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to create job", error });
	}
});

// PUT - update a job by ID (title, company_id, platform, url)
jobsRouter.put("/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const jobId = id as string;

	const {
		title,
		company_id,
		platform,
		url,
	}: Partial<Pick<JobInsert, "title" | "platform" | "url">> & {
		company_id?: Company["id"];
	} = req.body;

	if (!uuidRegex.test(jobId)) {
		return res.status(400).json({ message: "ID must be a valid UUID" });
	}

	if (!title && !company_id && !platform && !url) {
		return res
			.status(400)
			.json({ message: "At least one field to update is required" });
	}

	try {
		const exists = await db.select().from(jobs).where(eq(jobs.id, jobId));
		if (!exists.length) {
			return res
				.status(404)
				.json({ message: `Job with ID: ${jobId} not found` });
		}

		if (company_id !== undefined) {
			if (!uuidRegex.test(company_id)) {
				return res
					.status(400)
					.json({ message: "company_id must be a valid UUID" });
			}
			const companyExists = await db
				.select()
				.from(companies)
				.where(eq(companies.id, company_id));
			if (!companyExists.length) {
				return res
					.status(404)
					.json({ message: `Company with ID: ${company_id} not found` });
			}
		}

		const updates: Partial<JobInsert> = {};
		if (title) updates.title = title;
		if (company_id) updates.company = company_id;
		if (platform) updates.platform = platform;
		if (url) updates.url = url;

		await db.update(jobs).set(updates).where(eq(jobs.id, jobId));
		res.status(200).json({ message: `Updated job with ID: ${id}` });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: `Failed to update job with ID: ${id}`, error });
	}
});

// DELETE - delete a job by ID (cascades to its applications via FK)
jobsRouter.delete("/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const jobId = id as string;

	if (!uuidRegex.test(jobId)) {
		return res.status(400).json({ message: "ID must be a valid UUID" });
	}

	try {
		const exists = await db.select().from(jobs).where(eq(jobs.id, jobId));
		if (!exists.length) {
			return res
				.status(404)
				.json({ message: `Job with ID: ${jobId} not found` });
		}

		await db.delete(jobs).where(eq(jobs.id, jobId));
		res.status(200).json({ message: `Deleted job with ID: ${jobId}` });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: `Failed to delete job with ID: ${jobId}`, error });
	}
});

export default jobsRouter;
