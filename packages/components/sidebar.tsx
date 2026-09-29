"use client";

import type { View } from "@job-hunt/types";
import { NavItem } from "./nav-item";

export function Sidebar({
	activeView,
	setActiveView,
	companyCount,
	applicationCount,
	appliedCount,
}: {
	activeView: View;
	setActiveView: (view: View) => void;
	companyCount: number;
	applicationCount: number;
	appliedCount: number;
}) {
	return (
		<aside className="w-[236px] shrink-0 border-r-2 border-ink bg-sidebar px-[18px] pt-[30px] pb-5 flex flex-col">
			<div className="mx-[10px] mb-[65px] flex items-center gap-2.5 text-xl font-bold tracking-tighter">
				<span className="grid h-[27px] w-[27px] -rotate-[7deg] place-items-center border-2 border-ink bg-ink text-[15px] text-yellow">
					P
				</span>
				<span>
					pipeline<span className="text-red">.</span>
				</span>
			</div>
			<div className="mx-[10px] mb-3 font-mono text-[10px] tracking-widest text-muted uppercase">
				Workspace
			</div>
			<nav className="flex flex-col gap-[5px]" aria-label="Main navigation">
				<NavItem
					active={activeView === "overview"}
					onClick={() => setActiveView("overview")}
					icon="▦"
					label="Overview"
					shortcut="⌘ 1"
				/>
				<NavItem
					active={activeView === "companies"}
					onClick={() => setActiveView("companies")}
					icon="▤"
					label="Companies"
					count={companyCount}
				/>
				<NavItem
					active={activeView === "applications"}
					onClick={() => setActiveView("applications")}
					icon="↗"
					label="Applications"
					count={applicationCount}
				/>
			</nav>
			<div className="mt-auto">
				<div className="flex items-center justify-between text-[11px]">
					<span>Weekly goal</span>
					<strong className="font-mono text-[11px]">{appliedCount}/5</strong>
				</div>
				<div className="my-2 mb-[30px] h-[7px] border border-ink bg-soft-gray">
					<div
						className="h-full border-r border-ink bg-yellow"
						style={{ width: `${Math.min((appliedCount / 5) * 100, 100)}%` }}
					/>
				</div>
				<div className="flex items-center gap-2 border-t border-profile-border pt-[18px]">
					<div className="grid h-[30px] w-[30px] place-items-center rounded-full border-2 border-ink bg-pink font-mono text-[10px]">
						TS
					</div>
					<div>
						<strong className="block text-[11px]">Talha Simsek</strong>
						<span className="mt-0.5 block text-[11px] text-muted">
							Personal workspace
						</span>
					</div>
					<span className="ml-auto text-[13px]">•••</span>
				</div>
			</div>
		</aside>
	);
}
