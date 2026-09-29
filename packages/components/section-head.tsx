"use client";

export function SectionHead({
	title,
	description,
	actionLabel,
	onAction,
}: {
	title: string;
	description: string;
	actionLabel: string;
	onAction: () => void;
}) {
	return (
		<div className="mb-4 flex items-center justify-between gap-5">
			<div>
				<h2 className="m-0 mb-[5px] text-[18px] tracking-[-0.5px]">{title}</h2>
				<p className="m-0 text-[13px] text-muted">{description}</p>
			</div>
			<button
				className="border-0 bg-transparent text-xs font-bold"
				onClick={onAction}
			>
				{actionLabel} <span className="ml-[5px] text-[18px]">→</span>
			</button>
		</div>
	);
}
