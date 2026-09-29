"use client"

import type { FormEvent } from "react"

export function CompanyForm({
  value,
  onChange,
  onSubmit,
}: {
  value: string
  onChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
  return (
    <form className="flex flex-col gap-[9px]" onSubmit={onSubmit}>
      <label className="font-mono text-[10px] uppercase" htmlFor="company-name">
        Company name
      </label>
      <input
        id="company-name"
        className="mb-[9px] border-2 border-ink bg-white px-[13px] py-[13px] outline-none focus:shadow-[3px_3px_0_#f0a8b9]"
        autoFocus
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="e.g. Figma"
      />
    </form>
  )
}
