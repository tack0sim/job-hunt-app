import { Router, type Request, type Response } from "express";
import db from "../db/index.ts";
import { applications, jobs } from "../db/schema.ts";
import type {
	Application,
	ApplicationInsert,
	Company,
	Job,
} from "../db/types.ts";
import { eq, and } from "drizzle-orm";

const applicationsRouter = Router();

const uuidRegex =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// GET - fetch all applications, optional ?status= and ?type= filters
applicationsRouter.get("/", async (req: Request, res: Response) => {
	const { status, type } = req.query as {
		status?: Application["status"];
		type?: Application["type"];
	};

	const validStatuses: Application["status"][] = [
		"pending",
		"accepted",
		"rejected",
	];
	const validTypes: Application["type"][] = ["initiative", "advertised"];

	if (status && !validStatuses.includes(status)) {
		return res
			.status(400)
			.json({ message: `status must be one of: ${validStatuses.join(", ")}` });
	}

	if (type && !validTypes.includes(type)) {
		return res
			.status(400)
			.json({ message: `type must be one of: ${validTypes.join(", ")}` });
	}

	try {
		const conditions = [
			status ? eq(applications.status, status) : undefined,
			type ? eq(applications.type, type) : undefined,
		].filter(Boolean) as Parameters<typeof and>;

		const result = conditions.length
			? await db
					.select()
					.from(applications)
					.where(and(...conditions))
			: await db.select().from(applications);

		res.status(200).json({ message: "Fetched all applications", data: result });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to fetch applications", error });
	}
});

// POST - create a new application
applicationsRouter.post("/", async (req: Request, res: Response) => {
	const {
		company_id,
		job_id,
		type,
		status,
		salary,
	}: Pick<ApplicationInsert, "type" | "status" | "salary"> & {
		company_id: Company["id"];
		job_id?: Job["id"];
	} = req.body;

	if (!company_id || !uuidRegex.test(company_id)) {
		return res
			.status(400)
			.json({ message: "company_id is required and must be a valid UUID" });
	}

	if (!type || !["initiative", "advertised"].includes(type)) {
		return res.status(400).json({
			message: "type is required and must be 'initiative' or 'advertised'",
		});
	}

	if (type === "advertised") {
		if (!job_id) {
			return res
				.status(400)
				.json({ message: "job_id is required for advertised applications" });
		}
		if (!uuidRegex.test(job_id)) {
			return res.status(400).json({ message: "job_id must be a valid UUID" });
		}

		const [job] = await db.select().from(jobs).where(eq(jobs.id, job_id));
		if (!job) {
			return res
				.status(404)
				.json({ message: `Job with ID: ${job_id} not found` });
		}
		if (job.company !== company_id) {
			return res.status(400).json({
				message: `company_id does not match the company on job ${job_id}. Expected: ${job.company}`,
			});
		}
	}

	if (type === "initiative" && job_id) {
		return res.status(400).json({
			message: "job_id must not be provided for initiative applications",
		});
	}

	try {
		await db.insert(applications).values({
			company: company_id,
			job: job_id ?? null,
			type,
			status,
			salary,
		});
		res.status(201).json({ message: "Created application" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to create application", error });
	}
});

// PUT - update an application by ID (status and salary only, updatedAt auto-set)
applicationsRouter.put("/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const applicationId = id as string;
	const { status, salary }: Pick<ApplicationInsert, "status" | "salary"> =
		req.body;

	if (!uuidRegex.test(applicationId)) {
		return res.status(400).json({ message: "ID must be a valid UUID" });
	}

	if (!status && salary === undefined) {
		return res
			.status(400)
			.json({ message: "At least one of status or salary is required" });
	}

	const validStatuses: Application["status"][] = [
		"pending",
		"accepted",
		"rejected",
	];
	if (status && !validStatuses.includes(status)) {
		return res
			.status(400)
			.json({ message: `status must be one of: ${validStatuses.join(", ")}` });
	}

	try {
		const exists = await db
			.select()
			.from(applications)
			.where(eq(applications.id, applicationId));
		if (!exists.length) {
			return res
				.status(404)
				.json({ message: `Application with ID: ${applicationId} not found` });
		}

		const updates: Partial<ApplicationInsert> = {
			updatedAt: new Date().toISOString().split("T")[0],
		};
		if (status) updates.status = status;
		if (salary !== undefined) updates.salary = salary;

		await db
			.update(applications)
			.set(updates)
			.where(eq(applications.id, applicationId));
		res
			.status(200)
			.json({ message: `Updated application with ID: ${applicationId}` });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: `Failed to update application with ID: ${applicationId}`,
			error,
		});
	}
});

// DELETE - delete an application by ID
applicationsRouter.delete("/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const applicationId = id as string;

	if (!uuidRegex.test(applicationId)) {
		return res.status(400).json({ message: "ID must be a valid UUID" });
	}

	try {
		const exists = await db
			.select()
			.from(applications)
			.where(eq(applications.id, applicationId));
		if (!exists.length) {
			return res
				.status(404)
				.json({ message: `Application with ID: ${applicationId} not found` });
		}

		await db.delete(applications).where(eq(applications.id, applicationId));
		res
			.status(200)
			.json({ message: `Deleted application with ID: ${applicationId}` });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({
				message: `Failed to delete application with ID: ${applicationId}`,
				error,
			});
	}
});

export default applicationsRouter;
