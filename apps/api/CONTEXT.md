# Job Hunt App — API

A personal job application tracker that records companies, job listings, and the user's applications to them.

## Language

**Company**:
An employer the user targets for a job application.
_Avoid_: Employer, organisation

**Job**:
A specific role listing at a Company, discovered on a Platform.
_Avoid_: Role, position, listing, posting

**Application**:
A record of the user applying to a Job (advertised) or directly to a Company (initiative).
_Avoid_: Submission

**Advertised Application**:
An Application made in response to a specific Job listing. Requires a Job reference.
_Avoid_: Job application

**Initiative Application**:
An Application made directly to a Company without a specific Job listing (speculative outreach). Has no Job reference.
_Avoid_: Speculative application, cold application

**Platform**:
The channel through which a Job was discovered (e.g. LinkedIn, company website).
_Avoid_: Source, channel

**Application Status**:
The current state of an Application: `pending`, `accepted`, or `rejected`.
_Avoid_: State, stage
