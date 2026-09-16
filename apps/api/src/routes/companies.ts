import { Router, type Request, type Response } from "express";
import db from "../db/index.ts";
import { companies } from "../db/schema.ts";
import { eq } from "drizzle-orm";

const companiesRouter = Router();

// GET - fetch all companies
companiesRouter.get("/", async (req: Request, res: Response) => {
    try {
        const allCompanies = await db.select().from(companies);
        res.status(200).json({ message: "Fetched all companies", data: allCompanies });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch companies", error });
    }
});

// POST - create a new company
companiesRouter.post("/", async (req: Request, res: Response) => {
    const { name }: { name: string } = req.body;
    // Validate name input
    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    if (typeof name !== "string") {
        return res.status(400).json({ message: "Name must be a string" });
    }

    try {
        // check if company with the same name already exists
        const exists = await db.select().from(companies).where(eq(companies.name, name));
        if (exists.length > 0) {
            return res.status(409).json({ message: `Company with name: ${name} already exists`, data: exists });
        }

        // create new company record
        await db.insert(companies).values({name});
        res.status(201).json({ message: `Created company with name: ${name}` });
    } catch (error) {
        res.status(501).json({ message: `Failed to create company with name: ${name}`, error });
    }
});

// DELETE - delete a company record by ID
companiesRouter.delete("/:id", async (req: Request, res: Response) => {
    const { id }= req.params;
    const companyId = id as string;
    if (!companyId) {
        return res.status(400).json({ message: "ID is required" });
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(companyId)) {
        return res.status(400).json({ message: "ID must be a valid UUID string" });
    }
    try {
        // check if company exists before attempting to delete
        const exists = await db.select().from(companies).where(eq(companies.id, companyId));
        if (!exists.length) {
            return res.status(404).json({ message: `Company with ID: ${companyId} not found` });
        }
        // delete the company record
        const deleted = await db.delete(companies).where(eq(companies.id, companyId));
        res.status(201).json({ message: `Deleted company with ID: ${companyId}`, data: deleted.rows });
    } catch (error) {
        res.status(501).json({ message: `Failed to delete company with ID: ${companyId}`, error });
    }
});


export default companiesRouter;