export type Company = { id: string; name: string };
export type Job = {
	id: string;
	title: string;
	companyId: string;
	platform: string;
	status: "saved" | "applied" | "interview" | "rejected";
};
export type View = "overview" | "companies" | "applications";

export const statusLabel: Record<Job["status"], string> = {
	saved: "Saved",
	applied: "Applied",
	interview: "Interview",
	rejected: "Rejected",
};
