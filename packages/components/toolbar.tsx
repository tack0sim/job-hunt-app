"use client";

import type { View } from "@job-hunt/types";
import { SearchInput } from "./ui";

export function Toolbar({
	view,
	query,
	onQueryChange,
}: {
	view: View;
	query: string;
	onQueryChange: (value: string) => void;
}) {
	return (
		<div className="mb-5 flex items-center justify-between gap-5">
			<SearchInput
				value={query}
				onChange={onQueryChange}
				placeholder={`Search ${view}...`}
				label={`Search ${view}`}
			/>
			<button className="border border-ink bg-transparent px-3 py-[9px] text-[11px]">
				Filter <span>⌄</span>
			</button>
		</div>
	);
}
