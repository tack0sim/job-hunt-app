"use client";

import type { Company, Job } from "@job-hunt/types";

export function CompanyList({
	companies,
	jobs,
}: {
	companies: Company[];
	jobs: Job[];
}) {
	return (
		<div className="border-t-2 border-ink">
			{companies.map((company) => (
				<div
					className="flex items-center gap-3 border-b border-line-gray px-[5px] py-3 text-xs"
					key={company.id}
				>
					<div className="grid h-[30px] w-[30px] place-items-center border border-ink bg-yellow font-bold">
						{company.name.slice(0, 1)}
					</div>
					<strong>{company.name}</strong>
					<span className="ml-auto font-mono text-[10px] text-muted">
						{jobs.filter((job) => job.companyId === company.id).length} open
						roles
					</span>
				</div>
			))}
		</div>
	);
}
