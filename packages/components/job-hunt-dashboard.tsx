"use client";

import { useMemo, useState, type FormEvent } from "react";
import type { Company, Job, View } from "@job-hunt/types";
import { AddCompanyModal } from "./add-company-modal";
import { CompanyGrid } from "./company-grid";
import { JobTable } from "./job-table";
import { Notice } from "./notice";
import { Overview } from "./overview";
import { PageHeading } from "./page-heading";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { Topbar } from "./topbar";

export function JobHuntDashboard({
	initialCompanies,
	initialJobs,
}: {
	initialCompanies: Company[];
	initialJobs: Job[];
}) {
	const [companies, setCompanies] = useState(initialCompanies);
	const [jobs, setJobs] = useState(initialJobs);
	const [activeView, setActiveView] = useState<View>("overview");
	const [query, setQuery] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [showCompanyForm, setShowCompanyForm] = useState(false);
	const [notice, setNotice] = useState(
		"Demo data loaded — ready to connect to your API",
	);

	const filteredJobs = useMemo(() => {
		const normalized = query.toLowerCase();
		return jobs.filter((job) => {
			const company =
				companies.find((item) => item.id === job.companyId)?.name ?? "";
			return `${job.title} ${company}`.toLowerCase().includes(normalized);
		});
	}, [companies, jobs, query]);

	const counts = {
		total: jobs.length,
		applied: jobs.filter((job) => job.status === "applied").length,
		interviews: jobs.filter((job) => job.status === "interview").length,
	};

	const addCompany = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const name = companyName.trim();
		if (!name) return;

		const optimistic = { id: `local-${Date.now()}`, name };
		setCompanies((current) => [...current, optimistic]);
		setCompanyName("");
		setShowCompanyForm(false);
		setNotice(`${name} added to your company list`);

		try {
			await fetch("http://localhost:3000/companies", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name }),
			});
		} catch {
			setNotice(`${name} added locally — API will sync when it is available`);
		}
	};

	const applyTo = (jobId: string) => {
		setJobs((current) =>
			current.map((job) =>
				job.id === jobId ? { ...job, status: "applied" } : job,
			),
		);
		setNotice("Application added to your pipeline");
	};

	const companyNameFor = (companyId: string) =>
		companies.find((company) => company.id === companyId)?.name ??
		"Unknown company";

	const pageTitle =
		activeView === "overview"
			? "Good morning, Talha."
			: activeView === "companies"
				? "Companies"
				: "Applications";

	const pageSubtitle =
		activeView === "overview"
			? "Keep the momentum going. Your next opportunity is in here somewhere."
			: activeView === "companies"
				? "A living list of places worth working at."
				: "Every application, one clear next step.";

	return (
		<main className="flex min-h-screen">
			<Sidebar
				activeView={activeView}
				setActiveView={setActiveView}
				companyCount={companies.length}
				applicationCount={counts.applied}
				appliedCount={counts.applied}
			/>
			<section className="min-w-0 flex-1">
				<Topbar activeView={activeView} />
				<div className="mx-auto max-w-[1160px] px-[42px] pt-[54px] pb-20">
					<PageHeading
						title={pageTitle}
						subtitle={pageSubtitle}
						onAddCompany={() => setShowCompanyForm(true)}
					/>
					{notice && (
						<Notice message={notice} onDismiss={() => setNotice("")} />
					)}

					{activeView === "overview" && (
						<Overview
							companies={companies}
							jobs={jobs}
							counts={counts}
							companyNameFor={companyNameFor}
							applyTo={applyTo}
							onViewApplications={() => setActiveView("applications")}
							onViewCompanies={() => setActiveView("companies")}
						/>
					)}

					{activeView !== "overview" && (
						<section className="mt-[38px]">
							<Toolbar
								view={activeView}
								query={query}
								onQueryChange={setQuery}
							/>
							{activeView === "companies" ? (
								<CompanyGrid companies={companies} jobs={jobs} />
							) : (
								<JobTable
									jobs={filteredJobs}
									companyNameFor={companyNameFor}
									applyTo={applyTo}
								/>
							)}
						</section>
					)}
				</div>
			</section>
			{showCompanyForm && (
				<AddCompanyModal
					companyName={companyName}
					onCompanyNameChange={setCompanyName}
					onClose={() => setShowCompanyForm(false)}
					onSubmit={addCompany}
				/>
			)}
		</main>
	);
}

export const demoCompanies: Company[] = [
	{ id: "1", name: "Linear" },
	{ id: "2", name: "Vercel" },
	{ id: "3", name: "Arc" },
	{ id: "4", name: "Notion" },
];

export const demoJobs: Job[] = [
	{
		id: "j1",
		title: "Senior Product Designer",
		companyId: "1",
		platform: "Company website",
		status: "interview",
	},
	{
		id: "j2",
		title: "Frontend Engineer",
		companyId: "2",
		platform: "LinkedIn",
		status: "applied",
	},
	{
		id: "j3",
		title: "Design Engineer",
		companyId: "3",
		platform: "Company website",
		status: "saved",
	},
	{
		id: "j4",
		title: "Product Designer",
		companyId: "4",
		platform: "Pracuj",
		status: "saved",
	},
	{
		id: "j5",
		title: "Staff Frontend Engineer",
		companyId: "2",
		platform: "Email",
		status: "saved",
	},
];

export default JobHuntDashboard;
