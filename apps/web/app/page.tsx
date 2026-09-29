import JobHuntDashboard, { demoCompanies, demoJobs } from "@job-hunt/components/job-hunt-dashboard"

export default function Home() {
  return <JobHuntDashboard initialCompanies={demoCompanies} initialJobs={demoJobs} />
}
