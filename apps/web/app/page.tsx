"use client"

import { FormEvent, useMemo, useState } from "react"

type Company = { id: string; name: string }
type Job = { id: string; title: string; companyId: string; platform: string; status: "saved" | "applied" | "interview" }

const demoCompanies: Company[] = [
  { id: "1", name: "Linear" },
  { id: "2", name: "Vercel" },
  { id: "3", name: "Arc" },
  { id: "4", name: "Notion" },
]

const demoJobs: Job[] = [
  { id: "j1", title: "Senior Product Designer", companyId: "1", platform: "Company website", status: "interview" },
  { id: "j2", title: "Frontend Engineer", companyId: "2", platform: "LinkedIn", status: "applied" },
  { id: "j3", title: "Design Engineer", companyId: "3", platform: "Company website", status: "saved" },
  { id: "j4", title: "Product Designer", companyId: "4", platform: "Pracuj", status: "saved" },
  { id: "j5", title: "Staff Frontend Engineer", companyId: "2", platform: "Email", status: "saved" },
]

const statusLabel = { saved: "Saved", applied: "Applied", interview: "Interview" }

export default function Home() {
  const [companies, setCompanies] = useState(demoCompanies)
  const [jobs, setJobs] = useState(demoJobs)
  const [activeView, setActiveView] = useState<"overview" | "companies" | "applications">("overview")
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
  const counts = { total: jobs.length, applied: jobs.filter((job) => job.status === "applied").length, interviews: jobs.filter((job) => job.status === "interview").length }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">P</span><span>pipeline<span className="brand-dot">.</span></span></div>
        <div className="workspace-label">Workspace</div>
        <nav className="nav-list" aria-label="Main navigation">
          <button className={`nav-item ${activeView === "overview" ? "active" : ""}`} onClick={() => setActiveView("overview")}><span>▦</span> Overview <b>⌘ 1</b></button>
          <button className={`nav-item ${activeView === "companies" ? "active" : ""}`} onClick={() => setActiveView("companies")}><span>▤</span> Companies <em>{companies.length}</em></button>
          <button className={`nav-item ${activeView === "applications" ? "active" : ""}`} onClick={() => setActiveView("applications")}><span>↗</span> Applications <em>{counts.applied}</em></button>
        </nav>
        <div className="sidebar-bottom">
          <div className="progress-label"><span>Weekly goal</span><strong>{counts.applied}/5</strong></div>
          <div className="progress-track"><div style={{ width: `${Math.min(counts.applied / 5 * 100, 100)}%` }} /></div>
          <div className="profile"><div className="avatar">TS</div><div><strong>Talha Simsek</strong><span>Personal workspace</span></div><span className="profile-menu">•••</span></div>
        </div>
      </aside>

      <section className="content">
        <header className="topbar"><div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{activeView === "overview" ? "Overview" : activeView === "companies" ? "Companies" : "Applications"}</strong></div><div className="top-actions"><span className="sync-dot" /> API connected <button className="icon-button" aria-label="Notifications">♧</button><button className="help-button">?</button></div></header>
        <div className="page-wrap">
          <div className="page-heading"><div><p className="eyebrow">MONDAY, SEPTEMBER 29, 2026</p><h1>{activeView === "overview" ? "Good morning, Talha." : activeView === "companies" ? "Companies" : "Applications"}</h1><p className="subheading">{activeView === "overview" ? "Keep the momentum going. Your next opportunity is in here somewhere." : activeView === "companies" ? "A living list of places worth working at." : "Every application, one clear next step."}</p></div><button className="primary-button" onClick={() => setShowCompanyForm(true)}>+ Add company</button></div>
          {notice && <div className="notice"><span>●</span>{notice}<button onClick={() => setNotice("")} aria-label="Dismiss notification">×</button></div>}

          {activeView === "overview" && <>
            <div className="stat-grid"><div className="stat-card yellow"><span>Roles in pipeline</span><strong>{counts.total}</strong><small>+2 this week <i>↗</i></small></div><div className="stat-card pink"><span>Applications sent</span><strong>{counts.applied}</strong><small>Keep going <i>↗</i></small></div><div className="stat-card cyan"><span>Interviews</span><strong>{counts.interviews}</strong><small>1 upcoming <i>↗</i></small></div></div>
            <section className="section-block"><div className="section-head"><div><h2>Active pipeline</h2><p>Roles that deserve your attention.</p></div><button className="text-button" onClick={() => setActiveView("applications")}>View all roles <span>→</span></button></div><JobTable jobs={filteredJobs.slice(0, 4)} companyNameFor={companyNameFor} applyTo={applyTo} /></section>
            <section className="lower-grid"><div className="section-block compact"><div className="section-head"><div><h2>Your companies</h2><p>{companies.length} companies in your orbit.</p></div><button className="text-button" onClick={() => setActiveView("companies")}>See all <span>→</span></button></div><div className="company-list">{companies.slice(0, 4).map((company) => <div className="company-row" key={company.id}><div className="company-logo">{company.name.slice(0, 1)}</div><strong>{company.name}</strong><span>{jobs.filter((job) => job.companyId === company.id).length} open roles</span></div>)}</div></div><div className="tip-card"><span className="tip-label">FIELD NOTE 04</span><h3>Small steps<br /><em>compound.</em></h3><p>One thoughtful application beats ten rushed ones. Keep moving.</p><div className="tip-line" /></div></section>
          </>}

          {activeView !== "overview" && <section className="section-block full-view"><div className="toolbar"><div className="search-box"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${activeView}...`} /></div><button className="filter-button">Filter <span>⌄</span></button></div>{activeView === "companies" ? <div className="company-grid">{companies.map((company) => <div className="company-card" key={company.id}><div className="company-logo large">{company.name.slice(0, 1)}</div><div><h3>{company.name}</h3><p>{jobs.filter((job) => job.companyId === company.id).length} roles tracked</p></div><span>→</span></div>)}</div> : <JobTable jobs={filteredJobs} companyNameFor={companyNameFor} applyTo={applyTo} />}</section>}
        </div>
      </section>
      {showCompanyForm && <div className="modal-backdrop" onClick={() => setShowCompanyForm(false)}><div className="modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowCompanyForm(false)}>×</button><p className="eyebrow">NEW COMPANY</p><h2>Add to your orbit.</h2><p className="modal-copy">Track roles and applications from a company you care about.</p><form onSubmit={addCompany}><label htmlFor="company-name">Company name</label><input id="company-name" autoFocus value={companyName} onChange={(event) => setCompanyName(event.target.value)} placeholder="e.g. Figma" /><button className="primary-button" type="submit">Add company <span>→</span></button></form></div></div>}
    </main>
  )
}

function JobTable({ jobs, companyNameFor, applyTo }: { jobs: Job[]; companyNameFor: (id: string) => string; applyTo: (id: string) => void }) {
  return <div className="job-table"><div className="table-head"><span>ROLE</span><span>COMPANY</span><span>STATUS</span><span>PLATFORM</span><span /></div>{jobs.map((job) => <div className="job-row" key={job.id}><div className="role-cell"><div className="role-icon">{job.title.slice(0, 1)}</div><strong>{job.title}</strong></div><span className="company-cell">{companyNameFor(job.companyId)}</span><span><span className={`status ${job.status}`}>{statusLabel[job.status]}</span></span><span className="platform-cell">{job.platform}</span>{job.status === "saved" ? <button className="row-action" onClick={() => applyTo(job.id)}>Apply <span>↗</span></button> : <button className="row-action quiet">•••</button>}</div>)}</div>
}
