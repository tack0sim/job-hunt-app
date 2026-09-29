"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

export function Button({
	className = "",
	children,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
}
