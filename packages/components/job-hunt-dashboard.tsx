"use client"

import { FormEvent, useMemo, useState } from "react"

export type Company = { id: string; name: string }
export type Job = { id: string; title: string; companyId: string; platform: string; status: "saved" | "applied" | "interview" }
export type View = "overview" | "companies" | "applications"

const statusLabel = { saved: "Saved", applied: "Applied", interview: "Interview" }

export function JobHuntDashboard({ initialCompanies, initialJobs }: { initialCompanies: Company[]; initialJobs: Job[] }) {
  const [companies, setCompanies] = useState(initialCompanies)
  const [jobs, setJobs] = useState(initialJobs)
  const [activeView, setActiveView] = useState<View>("overview")
  const [query, setQuery] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [showCompanyForm, setShowCompanyForm] = useState(false)
  const [notice, setNotice] = useState("Demo data loaded — ready to connect to your API")

  const filteredJobs = useMemo(() => {
    const normalized = query.toLowerCase()
    return jobs.filter((job) => {
      const company = companies.find((item) => item.id === job.companyId)?.name ?? ""
      return `${job.title} ${company}`.toLowerCase().includes(normalized)
    })
  }, [companies, jobs, query])

  const counts = {
    total: jobs.length,
    applied: jobs.filter((job) => job.status === "applied").length,
    interviews: jobs.filter((job) => job.status === "interview").length,
  }

  const addCompany = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const name = companyName.trim()
    if (!name) return

    const optimistic = { id: `local-${Date.now()}`, name }
    setCompanies((current) => [...current, optimistic])
    setCompanyName("")
    setShowCompanyForm(false)
    setNotice(`${name} added to your company list`)

    try {
      await fetch("http://localhost:3000/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })
    } catch {
      setNotice(`${name} added locally — API will sync when it is available`)
    }
  }

  const applyTo = (jobId: string) => {
    setJobs((current) => current.map((job) => job.id === jobId ? { ...job, status: "applied" } : job))
    setNotice("Application added to your pipeline")
  }

  const companyNameFor = (companyId: string) => companies.find((company) => company.id === companyId)?.name ?? "Unknown company"
  const pageTitle = activeView === "overview" ? "Good morning, Talha." : activeView === "companies" ? "Companies" : "Applications"
  const pageSubtitle = activeView === "overview" ? "Keep the momentum going. Your next opportunity is in here somewhere." : activeView === "companies" ? "A living list of places worth working at." : "Every application, one clear next step."

  return (
    <main className="app-shell">
      <Sidebar activeView={activeView} setActiveView={setActiveView} companyCount={companies.length} applicationCount={counts.applied} appliedCount={counts.applied} />
      <section className="content">
        <Topbar activeView={activeView} />
        <div className="page-wrap">
          <PageHeading title={pageTitle} subtitle={pageSubtitle} onAddCompany={() => setShowCompanyForm(true)} />
          {notice && <Notice message={notice} onDismiss={() => setNotice("")} />}

          {activeView === "overview" && (
            <Overview companies={companies} jobs={jobs} counts={counts} companyNameFor={companyNameFor} applyTo={applyTo} onViewApplications={() => setActiveView("applications")} onViewCompanies={() => setActiveView("companies")} />
          )}

          {activeView !== "overview" && (
            <section className="section-block full-view">
              <Toolbar view={activeView} query={query} onQueryChange={setQuery} />
              {activeView === "companies" ? <CompanyGrid companies={companies} jobs={jobs} /> : <JobTable jobs={filteredJobs} companyNameFor={companyNameFor} applyTo={applyTo} />}
            </section>
          )}
        </div>
      </section>
      {showCompanyForm && <AddCompanyModal companyName={companyName} onCompanyNameChange={setCompanyName} onClose={() => setShowCompanyForm(false)} onSubmit={addCompany} />}
    </main>
  )
}

function Sidebar({ activeView, setActiveView, companyCount, applicationCount, appliedCount }: { activeView: View; setActiveView: (view: View) => void; companyCount: number; applicationCount: number; appliedCount: number }) {
  return <aside className="sidebar">
    <div className="brand"><span className="brand-mark">P</span><span>pipeline<span className="brand-dot">.</span></span></div>
    <div className="workspace-label">Workspace</div>
    <nav className="nav-list" aria-label="Main navigation">
      <NavItem active={activeView === "overview"} onClick={() => setActiveView("overview")} icon="▦" label="Overview" shortcut="⌘ 1" />
      <NavItem active={activeView === "companies"} onClick={() => setActiveView("companies")} icon="▤" label="Companies" count={companyCount} />
      <NavItem active={activeView === "applications"} onClick={() => setActiveView("applications")} icon="↗" label="Applications" count={applicationCount} />
    </nav>
    <div className="sidebar-bottom">
      <div className="progress-label"><span>Weekly goal</span><strong>{appliedCount}/5</strong></div>
      <div className="progress-track"><div style={{ width: `${Math.min(appliedCount / 5 * 100, 100)}%` }} /></div>
      <div className="profile"><div className="avatar">TS</div><div><strong>Talha Simsek</strong><span>Personal workspace</span></div><span className="profile-menu">•••</span></div>
    </div>
  </aside>
}

function NavItem({ active, onClick, icon, label, shortcut, count }: { active: boolean; onClick: () => void; icon: string; label: string; shortcut?: string; count?: number }) {
  return <button className={`nav-item ${active ? "active" : ""}`} onClick={onClick}><span>{icon}</span>{label}{shortcut ? <b>{shortcut}</b> : count !== undefined ? <em>{count}</em> : null}</button>
}

function Topbar({ activeView }: { activeView: View }) {
  const label = activeView === "overview" ? "Overview" : activeView === "companies" ? "Companies" : "Applications"
  return <header className="topbar"><div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{label}</strong></div><div className="top-actions"><span className="sync-dot" /> API connected <button className="icon-button" aria-label="Notifications">♧</button><button className="help-button" aria-label="Help">?</button></div></header>
}

function PageHeading({ title, subtitle, onAddCompany }: { title: string; subtitle: string; onAddCompany: () => void }) {
  return <div className="page-heading"><div><p className="eyebrow">MONDAY, SEPTEMBER 29, 2026</p><h1>{title}</h1><p className="subheading">{subtitle}</p></div><button className="primary-button" onClick={onAddCompany}>+ Add company</button></div>
}

function Notice({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return <div className="notice"><span>●</span>{message}<button onClick={onDismiss} aria-label="Dismiss notification">×</button></div>
}

function Overview({ companies, jobs, counts, companyNameFor, applyTo, onViewApplications, onViewCompanies }: { companies: Company[]; jobs: Job[]; counts: { total: number; applied: number; interviews: number }; companyNameFor: (id: string) => string; applyTo: (id: string) => void; onViewApplications: () => void; onViewCompanies: () => void }) {
  return <>
    <div className="stat-grid"><StatCard className="yellow" label="Roles in pipeline" value={counts.total} note="+2 this week" /><StatCard className="pink" label="Applications sent" value={counts.applied} note="Keep going" /><StatCard className="cyan" label="Interviews" value={counts.interviews} note="1 upcoming" /></div>
    <section className="section-block"><SectionHead title="Active pipeline" description="Roles that deserve your attention." actionLabel="View all roles" onAction={onViewApplications} /><JobTable jobs={jobs.slice(0, 4)} companyNameFor={companyNameFor} applyTo={applyTo} /></section>
    <section className="lower-grid"><div className="section-block compact"><SectionHead title="Your companies" description={`${companies.length} companies in your orbit.`} actionLabel="See all" onAction={onViewCompanies} /><CompanyList companies={companies.slice(0, 4)} jobs={jobs} /></div><div className="tip-card"><span className="tip-label">FIELD NOTE 04</span><h3>Small steps<br /><em>compound.</em></h3><p>One thoughtful application beats ten rushed ones. Keep moving.</p><div className="tip-line" /></div></section>
  </>
}

function StatCard({ className, label, value, note }: { className: string; label: string; value: number; note: string }) {
  return <div className={`stat-card ${className}`}><span>{label}</span><strong>{value}</strong><small>{note} <i>↗</i></small></div>
}

function SectionHead({ title, description, actionLabel, onAction }: { title: string; description: string; actionLabel: string; onAction: () => void }) {
  return <div className="section-head"><div><h2>{title}</h2><p>{description}</p></div><button className="text-button" onClick={onAction}>{actionLabel} <span>→</span></button></div>
}

function CompanyList({ companies, jobs }: { companies: Company[]; jobs: Job[] }) {
  return <div className="company-list">{companies.map((company) => <div className="company-row" key={company.id}><div className="company-logo">{company.name.slice(0, 1)}</div><strong>{company.name}</strong><span>{jobs.filter((job) => job.companyId === company.id).length} open roles</span></div>)}</div>
}

function CompanyGrid({ companies, jobs }: { companies: Company[]; jobs: Job[] }) {
  return <div className="company-grid">{companies.map((company) => <div className="company-card" key={company.id}><div className="company-logo large">{company.name.slice(0, 1)}</div><div><h3>{company.name}</h3><p>{jobs.filter((job) => job.companyId === company.id).length} roles tracked</p></div><span>→</span></div>)}</div>
}

function Toolbar({ view, query, onQueryChange }: { view: View; query: string; onQueryChange: (value: string) => void }) {
  return <div className="toolbar"><div className="search-box"><span>⌕</span><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={`Search ${view}...`} aria-label={`Search ${view}`} /></div><button className="filter-button">Filter <span>⌄</span></button></div>
}

export function JobTable({ jobs, companyNameFor, applyTo }: { jobs: Job[]; companyNameFor: (id: string) => string; applyTo: (id: string) => void }) {
  return <div className="job-table"><div className="table-head"><span>ROLE</span><span>COMPANY</span><span>STATUS</span><span>PLATFORM</span><span /></div>{jobs.map((job) => <div className="job-row" key={job.id}><div className="role-cell"><div className="role-icon">{job.title.slice(0, 1)}</div><strong>{job.title}</strong></div><span className="company-cell">{companyNameFor(job.companyId)}</span><span><span className={`status ${job.status}`}>{statusLabel[job.status]}</span></span><span className="platform-cell">{job.platform}</span>{job.status === "saved" ? <button className="row-action" onClick={() => applyTo(job.id)}>Apply <span>↗</span></button> : <button className="row-action quiet" aria-label={`More actions for ${job.title}`}>•••</button>}</div>)}</div>
}

function AddCompanyModal({ companyName, onCompanyNameChange, onClose, onSubmit }: { companyName: string; onCompanyNameChange: (value: string) => void; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <div className="modal-backdrop" onClick={onClose}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="add-company-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close dialog">×</button><p className="eyebrow">NEW COMPANY</p><h2 id="add-company-title">Add to your orbit.</h2><p className="modal-copy">Track roles and applications from a company you care about.</p><form onSubmit={onSubmit}><label htmlFor="company-name">Company name</label><input id="company-name" autoFocus value={companyName} onChange={(event) => onCompanyNameChange(event.target.value)} placeholder="e.g. Figma" /><button className="primary-button" type="submit">Add company <span>→</span></button></form></div></div>
}

export const demoCompanies: Company[] = [{ id: "1", name: "Linear" }, { id: "2", name: "Vercel" }, { id: "3", name: "Arc" }, { id: "4", name: "Notion" }]
export const demoJobs: Job[] = [
  { id: "j1", title: "Senior Product Designer", companyId: "1", platform: "Company website", status: "interview" },
  { id: "j2", title: "Frontend Engineer", companyId: "2", platform: "LinkedIn", status: "applied" },
  { id: "j3", title: "Design Engineer", companyId: "3", platform: "Company website", status: "saved" },
  { id: "j4", title: "Product Designer", companyId: "4", platform: "Pracuj", status: "saved" },
  { id: "j5", title: "Staff Frontend Engineer", companyId: "2", platform: "Email", status: "saved" },
]

export default JobHuntDashboard
