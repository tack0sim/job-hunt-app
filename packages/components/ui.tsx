"use client"

import type { ButtonHTMLAttributes, FormEvent, InputHTMLAttributes, ReactNode } from "react"

export function Button({ className = "", children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={className} {...props}>{children}</button>
}

export function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={className}>{children}</div>
}

export function Modal({ titleId, onClose, children }: { titleId: string; onClose: () => void; children: ReactNode }) {
  return <div className="modal-backdrop" onClick={onClose}><div className="modal" role="dialog" aria-modal="true" aria-labelledby={titleId} onClick={(event) => event.stopPropagation()}>{children}</div></div>
}

export function SearchInput({ value, onChange, placeholder, label }: { value: string; onChange: (value: string) => void; placeholder: string; label: string }) {
  return <div className="search-box"><span aria-hidden="true">⌕</span><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} aria-label={label} /></div>
}

export function CompanyForm({ value, onChange, onSubmit }: { value: string; onChange: (value: string) => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <form onSubmit={onSubmit}><label htmlFor="company-name">Company name</label><input id="company-name" autoFocus value={value} onChange={(event) => onChange(event.target.value)} placeholder="e.g. Figma" /></form>
}

export type InputProps = InputHTMLAttributes<HTMLInputElement>
export type { ReactNode }
export { Button as ActionButton }
export { Card as SurfaceCard }
export { Modal as Dialog }
export { SearchInput as SearchField }
export { CompanyForm as FormFields }
export type { FormEvent }
export type { InputProps }
export type { ButtonHTMLAttributes }
export type { InputHTMLAttributes }
export type { ReactNode as Node }
