"use client";

import type { ReactNode } from "react";

export function Dialog({
	titleId,
	onClose,
	children,
}: {
	titleId: string;
	onClose: () => void;
	children: ReactNode;
}) {
	return (
		<div
			className="fixed inset-0 z-[5] grid place-items-center bg-ink/55 p-5"
			onClick={onClose}
		>
			<div
				className="relative w-full max-w-[430px] border-2 border-ink bg-paper p-8 shadow-[8px_8px_0_#f4d44d]"
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
}
