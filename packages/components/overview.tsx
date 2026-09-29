"use client";

import type { Company, Job } from "@job-hunt/types";
import { CompanyList } from "./company-list";
import { JobTable } from "./job-table";
import { SectionHead } from "./section-head";
import { StatCard } from "./stat-card";

export function Overview({
	companies,
	jobs,
	counts,
	companyNameFor,
	applyTo,
	onViewApplications,
	onViewCompanies,
}: {
	companies: Company[];
	jobs: Job[];
	counts: { total: number; applied: number; interviews: number };
	companyNameFor: (id: string) => string;
	applyTo: (id: string) => void;
	onViewApplications: () => void;
	onViewCompanies: () => void;
}) {
	return (
		<>
			<div className="mt-[26px] mb-12 grid grid-cols-3 gap-3.5">
				<StatCard
					className="yellow"
					label="Roles in pipeline"
					value={counts.total}
					note="+2 this week"
				/>
				<StatCard
					className="pink"
					label="Applications sent"
					value={counts.applied}
					note="Keep going"
				/>
				<StatCard
					className="cyan"
					label="Interviews"
					value={counts.interviews}
					note="1 upcoming"
				/>
			</div>
			<section className="mt-0">
				<SectionHead
					title="Active pipeline"
					description="Roles that deserve your attention."
					actionLabel="View all roles"
					onAction={onViewApplications}
				/>
				<JobTable
					jobs={jobs.slice(0, 4)}
					companyNameFor={companyNameFor}
					applyTo={applyTo}
				/>
			</section>
			<section className="mt-[54px] grid grid-cols-[1.4fr_1fr] gap-[42px]">
				<div className="min-w-0">
					<SectionHead
						title="Your companies"
						description={`${companies.length} companies in your orbit.`}
						actionLabel="See all"
						onAction={onViewCompanies}
					/>
					<CompanyList companies={companies.slice(0, 4)} jobs={jobs} />
				</div>
				<div className="relative min-h-[190px] bg-ink p-[25px] text-paper">
					<span className="font-mono text-[10px] tracking-widest text-yellow">
						FIELD NOTE 04
					</span>
					<h3 className="mt-[26px] mb-3 text-[26px] leading-[1.05] tracking-[-1px]">
						Small steps
						<br />
						<em className="text-yellow not-italic">compound.</em>
					</h3>
					<p className="max-w-[220px] text-xs leading-relaxed text-tip-text">
						One thoughtful application beats ten rushed ones. Keep moving.
					</p>
					<div className="absolute right-[25px] bottom-7 h-[3px] w-[45px] bg-pink" />
				</div>
			</section>
		</>
	);
}
