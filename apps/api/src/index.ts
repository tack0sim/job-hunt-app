import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import companiesRouter from "./routes/companies.ts";

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.use(cors({ origin: `${process.env.ORIGIN}` }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(201).json({ message: "Response from api home endpoint" });
});

// companies router
app.use("/companies", companiesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});