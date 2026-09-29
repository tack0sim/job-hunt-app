"use client";

import type { Job } from "@job-hunt/types";
import { statusLabel } from "@job-hunt/types";

const statusColorMap: Record<Job["status"], string> = {
	saved: "bg-[#e2dfd6]",
	applied: "bg-cyan",
	interview: "bg-yellow",
	rejected: "bg-pink",
}

export function JobTable({
	jobs,
	companyNameFor,
	applyTo,
}: {
	jobs: Job[];
	companyNameFor: (id: string) => string;
	applyTo: (id: string) => void;
}) {
	return (
		<div className="border-t-2 border-ink">
			<div className="grid grid-cols-[2fr_1.2fr_1fr_1fr_74px] items-center gap-4 px-2.5 py-3 font-mono text-[10px] tracking-widest text-muted">
				<span>ROLE</span>
				<span>COMPANY</span>
				<span>STATUS</span>
				<span>PLATFORM</span>
				<span />
			</div>
			{jobs.map((job) => (
				<div
					className="grid min-h-[66px] grid-cols-[2fr_1.2fr_1fr_1fr_74px] items-center gap-4 border-b border-line-gray px-2.5 py-[15px] text-xs"
					key={job.id}
				>
					<div className="flex items-center gap-2.5">
						<div className="grid h-[30px] w-[30px] place-items-center border border-ink bg-yellow font-bold">
							{job.title.slice(0, 1)}
						</div>
						<strong className="text-xs">{job.title}</strong>
					</div>
					<span className="text-muted">{companyNameFor(job.companyId)}</span>
					<span>
						<span
							className={`border border-ink px-[7px] py-[5px] font-mono text-[10px] ${statusColorMap[job.status]}`}
						>
							{statusLabel[job.status]}
						</span>
					</span>
					<span className="text-muted">{job.platform}</span>
					{job.status === "saved" ? (
						<button
							className="border border-ink bg-transparent px-2 py-[7px] text-[10px] font-bold hover:bg-ink hover:text-paper"
							onClick={() => applyTo(job.id)}
						>
							Apply <span>↗</span>
						</button>
					) : (
						<button
							className="border-0 bg-transparent text-[15px] text-muted"
							aria-label={`More actions for ${job.title}`}
						>
							•••
						</button>
					)}
				</div>
			))}
		</div>
	);
}
