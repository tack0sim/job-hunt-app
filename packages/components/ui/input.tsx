"use client";

export function SearchInput({
	value,
	onChange,
	placeholder,
	label,
}: {
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	label: string;
}) {
	return (
		<div className="flex w-full max-w-[320px] items-center gap-[9px] border-2 border-ink bg-white px-3 py-[9px]">
			<span className="text-[21px]" aria-hidden="true">
				⌕
			</span>
			<input
				className="w-full border-0 bg-transparent text-xs outline-none"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				aria-label={label}
			/>
		</div>
	);
}
