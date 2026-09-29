"use client";

const colorMap: Record<string, string> = {
	yellow: "bg-yellow",
	pink: "bg-pink",
	cyan: "bg-cyan",
};

export function StatCard({
	className,
	label,
	value,
	note,
}: {
	className: string;
	label: string;
	value: number;
	note: string;
}) {
	const colorClass = colorMap[className] ?? className;

	return (
		<div
			className={`min-h-[138px] border-2 border-ink p-5 shadow-[5px_5px_0_#171717] ${colorClass}`}
		>
			<span className="block font-mono text-[11px]">{label}</span>
			<strong className="my-[17px] mb-[13px] block text-[47px] leading-none tracking-[-3px]">
				{value}
			</strong>
			<small className="block font-mono text-[11px]">
				{note} <i className="text-[15px] not-italic">↗</i>
			</small>
		</div>
	);
}
