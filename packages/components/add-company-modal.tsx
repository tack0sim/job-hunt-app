"use client";

import type { FormEvent } from "react";
import { Dialog } from "./ui";

export function AddCompanyModal({
	companyName,
	onCompanyNameChange,
	onClose,
	onSubmit,
}: {
	companyName: string;
	onCompanyNameChange: (value: string) => void;
	onClose: () => void;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
	return (
		<Dialog titleId="add-company-title" onClose={onClose}>
			<button
				className="absolute right-3.5 top-2.5 border-0 bg-transparent text-2xl"
				onClick={onClose}
				aria-label="Close dialog"
			>
				×
			</button>
			<p className="m-0 mb-2.5 font-mono text-[10px] tracking-widest text-muted">
				NEW COMPANY
			</p>
			<h2
				id="add-company-title"
				className="m-0 mb-[9px] text-[30px] tracking-[-1.5px]"
			>
				Add to your orbit.
			</h2>
			<p className="m-0 mb-[25px] text-[13px] text-muted">
				Track roles and applications from a company you care about.
			</p>
			<form className="flex flex-col gap-[9px]" onSubmit={onSubmit}>
				<label
					className="font-mono text-[10px] uppercase"
					htmlFor="company-name"
				>
					Company name
				</label>
				<input
					id="company-name"
					className="mb-[9px] border-2 border-ink bg-white px-[13px] py-[13px] outline-none focus:shadow-[3px_3px_0_#f0a8b9]"
					autoFocus
					value={companyName}
					onChange={(e) => onCompanyNameChange(e.target.value)}
					placeholder="e.g. Figma"
				/>
				<button
					className="border-2 border-ink bg-ink px-4 py-3 text-xs font-bold text-paper shadow-[4px_4px_0_#f4d44d] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#f4d44d]"
					type="submit"
				>
					Add company <span>→</span>
				</button>
			</form>
		</Dialog>
	);
}
