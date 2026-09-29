"use client";

import type { Company, Job } from "@job-hunt/types";

export function CompanyGrid({
	companies,
	jobs,
}: {
	companies: Company[];
	jobs: Job[];
}) {
	return (
		<div className="grid grid-cols-2 gap-3">
			{companies.map((company) => (
				<div
					className="flex items-center gap-3.5 border-2 border-ink bg-card-white p-[18px] shadow-[3px_3px_0_#cbc8c0]"
					key={company.id}
				>
					<div className="grid h-[42px] w-[42px] place-items-center border border-ink bg-pink text-[18px] font-bold">
						{company.name.slice(0, 1)}
					</div>
					<div>
						<h3 className="m-0 mb-[5px] text-base">{company.name}</h3>
						<p className="m-0 text-[13px] text-muted">
							{jobs.filter((job) => job.companyId === company.id).length} roles
							tracked
						</p>
					</div>
					<span className="ml-auto text-xl">→</span>
				</div>
			))}
		</div>
	);
}
