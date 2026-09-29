"use client";

export function NavItem({
	active,
	onClick,
	icon,
	label,
	shortcut,
	count,
}: {
	active: boolean;
	onClick: () => void;
	icon: string;
	label: string;
	shortcut?: string;
	count?: number;
}) {
	return (
		<button
			type="button"
			className={`w-full border-0 px-2.5 py-2.5 flex items-center gap-3 text-left text-[13px] font-semibold ${active ? "bg-ink text-paper shadow-[3px_3px_0_#a29f95]" : ""}`}
			onClick={onClick}
		>
			<span className="w-4.5 text-[18px]">{icon}</span>
			{label}
			{shortcut ? (
				<b
					className={`ml-auto font-mono text-[10px] ${active ? "text-paper" : "text-muted"}`}
				>
					{shortcut}
				</b>
			) : count !== undefined ? (
				<em
					className={`ml-auto px-1.5 py-0.5 font-mono text-[10px] not-italic ${active ? "bg-yellow text-ink" : "bg-tag-gray"}`}
				>
					{count}
				</em>
			) : null}
		</button>
	);
}
