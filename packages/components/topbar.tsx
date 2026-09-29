"use client";

import type { View } from "@job-hunt/types";

const viewLabel: Record<View, string> = {
	overview: "Overview",
	companies: "Companies",
	applications: "Applications",
};

export function Topbar({ activeView }: { activeView: View }) {
	const label = viewLabel[activeView];
	return (
		<header className="flex h-[72px] items-center justify-between border-b border-line-gray px-[42px]">
			<div className="flex gap-2.5 text-xs">
				<span className="font-normal text-muted">Workspace</span>
				<b className="font-normal text-muted">/</b>
				<strong>{label}</strong>
			</div>
			<div className="flex items-center gap-3 font-mono text-[10px] text-muted">
				<span className="h-[7px] w-[7px] rounded-full bg-green" />
				API connected{" "}
				<button
					className="border-0 bg-transparent text-[17px]"
					aria-label="Notifications"
				>
					♧
				</button>
				<button
					className="h-5 w-5 rounded-full border border-border-muted font-mono text-xs"
					aria-label="Help"
				>
					?
				</button>
			</div>
		</header>
	);
}
