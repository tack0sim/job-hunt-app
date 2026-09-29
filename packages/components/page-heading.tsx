"use client";

export function PageHeading({
	title,
	subtitle,
	onAddCompany,
}: {
	title: string;
	subtitle: string;
	onAddCompany: () => void;
}) {
	return (
		<div className="flex items-end justify-between gap-5">
			<div>
				<p className="m-0 mb-2.5 font-mono text-[10px] tracking-widest text-muted">
					MONDAY, SEPTEMBER 29, 2026
				</p>
				<h1
					className="m-0 mb-3 leading-none tracking-[-2px]"
					style={{ fontSize: "clamp(30px, 4vw, 44px)" }}
				>
					{title}
				</h1>
				<p className="m-0 text-[13px] text-muted">{subtitle}</p>
			</div>
			<button
				className="border-2 border-ink bg-ink px-4 py-3 text-xs font-bold text-paper shadow-[4px_4px_0_#f4d44d] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#f4d44d]"
				onClick={onAddCompany}
			>
				+ Add company
			</button>
		</div>
	);
}
