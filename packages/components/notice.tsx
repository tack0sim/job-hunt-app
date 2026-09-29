"use client";

export function Notice({
	message,
	onDismiss,
}: {
	message: string;
	onDismiss: () => void;
}) {
	return (
		<div className="mt-8 flex items-center gap-[9px] border border-ink bg-notice-bg px-[13px] py-2.5 font-mono text-[11px]">
			<span className="text-notice-green">●</span>
			{message}
			<button
				className="ml-auto border-0 bg-transparent text-[17px]"
				onClick={onDismiss}
				aria-label="Dismiss notification"
			>
				×
			</button>
		</div>
	);
}
