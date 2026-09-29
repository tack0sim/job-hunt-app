import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from "react"

type ClassNameProps = { className?: string }

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`primary-button ${className}`} {...props} />
}

export function IconButton({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`icon-button ${className}`} {...props} />
}

export function Badge({ tone, children }: { tone: string; children: ReactNode }) {
  return <span className={`status ${tone}`}>{children}</span>
}

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement> & ClassNameProps) {
  return <div className={className} {...props} />
}

export function SearchInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <div className="search-box"><span aria-hidden="true">⌕</span><input {...props} /></div>
}

export function Modal({ titleId, children, onDismiss }: { titleId: string; children: ReactNode; onDismiss: () => void }) {
  return <div className="modal-backdrop" onClick={onDismiss}><div className="modal" role="dialog" aria-modal="true" aria-labelledby={titleId} onClick={(event) => event.stopPropagation()}>{children}</div></div>
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>
}

export function SectionHead({ title, description, actionLabel, onAction }: { title: string; description: string; actionLabel: string; onAction: () => void }) {
  return <div className="section-head"><div><h2>{title}</h2><p>{description}</p></div><button className="text-button" onClick={onAction}>{actionLabel} <span>→</span></button></div>
}

export function Notice({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return <div className="notice"><span aria-hidden="true">●</span>{message}<button onClick={onDismiss} aria-label="Dismiss notification">×</button></div>
}

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => <input {...props} />
export type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Progress({ value }: { value: number }) {
  return <div className="progress-track" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}><div style={{ width: `${value}%` }} /></div>
}

export function Logo() {
  return <div className="brand"><span className="brand-mark">P</span><span>pipeline<span className="brand-dot">.</span></span></div>
}

export function Avatar({ children }: { children: ReactNode }) {
  return <div className="avatar" aria-hidden="true">{children}</div>
}

export function CloseButton({ onClick, label }: { onClick: () => void; label: string }) {
  return <button className="modal-close" onClick={onClick} aria-label={label}>×</button>
}

export function FieldLabel({ children, htmlFor }: { children: ReactNode; htmlFor: string }) {
  return <label htmlFor={htmlFor}>{children}</label>
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <Input className="text-input" {...props} />
}

export type { HTMLAttributes, InputHTMLAttributes }

export { Card as Surface }

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="empty-state">{children}</div>
}

export function InlineAction({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className="row-action" {...props}>{children}</button>
}

export function Shell({ children }: { children: ReactNode }) {
  return <main className="app-shell">{children}</main>
}

export function Content({ children }: { children: ReactNode }) {
  return <section className="content">{children}</section>
}

export function PageContainer({ children }: { children: ReactNode }) {
  return <div className="page-wrap">{children}</div>
}

export function TopbarFrame({ children }: { children: ReactNode }) {
  return <header className="topbar">{children}</header>
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`section-block ${className}`}>{children}</section>
}

export function Grid({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

export function SmallButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className="filter-button" {...props}>{children}</button>
}

export function DialogForm({ children, ...props }: React.FormHTMLAttributes<HTMLFormElement>) {
  return <form {...props}>{children}</form>
}

export function MutedText({ children }: { children: ReactNode }) {
  return <p className="modal-copy">{children}</p>
}

export function Heading({ children }: { children: ReactNode }) {
  return <h1>{children}</h1>
}

export function Subheading({ children }: { children: ReactNode }) {
  return <p className="subheading">{children}</p>
}

export function StatValue({ children }: { children: ReactNode }) {
  return <strong>{children}</strong>
}

export function StatNote({ children }: { children: ReactNode }) {
  return <small>{children}</small>
}

export function Divider() {
  return <div className="tip-line" aria-hidden="true" />
}

export function DismissibleNotice() { return null }

export function FormButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <Button type="submit" {...props}>{children}</Button>
}

export function MenuButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className="row-action quiet" {...props}>{children}</button>
}

export function Label({ children }: { children: ReactNode }) { return <span>{children}</span> }

export function Chip({ children }: { children: ReactNode }) { return <span className="status saved">{children}</span> }

export function Icon({ children }: { children: ReactNode }) { return <span aria-hidden="true">{children}</span> }

export function ToolbarButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <SmallButton {...props}>{children}</SmallButton> }

export function DialogTitle({ children, id }: { children: ReactNode; id: string }) { return <h2 id={id}>{children}</h2> }

export function CloseIcon() { return <span aria-hidden="true">×</span> }

export function ArrowIcon() { return <span aria-hidden="true">→</span> }

export function DotIcon() { return <span aria-hidden="true">●</span> }

export function MoreIcon() { return <span aria-hidden="true">•••</span> }

export function SearchIcon() { return <span aria-hidden="true">⌕</span> }

export function ExternalIcon() { return <span aria-hidden="true">↗</span> }

export function CaretIcon() { return <span aria-hidden="true">⌄</span> }

export function CalendarIcon() { return <span aria-hidden="true">▦</span> }

export function CompanyIcon() { return <span aria-hidden="true">▤</span> }

export function ApplicationIcon() { return <span aria-hidden="true">↗</span> }

export function HelpIcon() { return <span aria-hidden="true">?</span> }

export function NotificationIcon() { return <span aria-hidden="true">♧</span> }

export function SyncIndicator() { return <span className="sync-dot" aria-label="Connected" /> }

export function Count({ children }: { children: ReactNode }) { return <em>{children}</em> }

export function Shortcut({ children }: { children: ReactNode }) { return <b>{children}</b> }

export function Field({ children }: { children: ReactNode }) { return <div className="form-field">{children}</div> }

export function FormActions({ children }: { children: ReactNode }) { return <div className="form-actions">{children}</div> }

export function ModalHeader({ children }: { children: ReactNode }) { return <div className="modal-header">{children}</div> }

export function ModalBody({ children }: { children: ReactNode }) { return <div className="modal-body">{children}</div> }

export function ModalFooter({ children }: { children: ReactNode }) { return <div className="modal-footer">{children}</div> }

export function StatusText({ children }: { children: ReactNode }) { return <span>{children}</span> }

export function ListItem({ children }: { children: ReactNode }) { return <div className="company-row">{children}</div> }

export function TableCell({ children, className = "" }: { children: ReactNode; className?: string }) { return <span className={className}>{children}</span> }

export function IconBox({ children, className = "" }: { children: ReactNode; className?: string }) { return <div className={className}>{children}</div> }

export function TextButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <button className="text-button" {...props}>{children}</button> }

export function NavButton({ children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) { return <button className={`nav-item ${className}`} {...props}>{children}</button> }

export function Profile({ children }: { children: ReactNode }) { return <div className="profile">{children}</div> }

export function CardTitle({ children }: { children: ReactNode }) { return <h3>{children}</h3> }

export function CardDescription({ children }: { children: ReactNode }) { return <p>{children}</p> }

export function StatusDot() { return <span className="sync-dot" /> }

export function Viewport({ children }: { children: ReactNode }) { return <div>{children}</div> }

export function Stack({ children, className = "" }: { children: ReactNode; className?: string }) { return <div className={className}>{children}</div> }

export function VisuallyHidden({ children }: { children: ReactNode }) { return <span className="sr-only">{children}</span> }

export function PlainButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <button {...props}>{children}</button> }

export function FormError({ children }: { children: ReactNode }) { return <p role="alert">{children}</p> }

export function CompanyMark({ children, className = "" }: { children: ReactNode; className?: string }) { return <div className={`company-logo ${className}`}>{children}</div> }

export function RoleMark({ children }: { children: ReactNode }) { return <div className="role-icon">{children}</div> }

export function StatusBadge({ children, tone }: { children: ReactNode; tone: string }) { return <Badge tone={tone}>{children}</Badge> }

export function NotificationButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <IconButton aria-label="Notifications" {...props}>{children}</IconButton> }

export function HelpButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <button className="help-button" aria-label="Help" {...props}>{children}</button> }

export function TextField({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) { return <Field><FieldLabel htmlFor={props.id ?? "field"}>{label}</FieldLabel><TextInput {...props} /></Field> }

export function Form({ children, ...props }: React.FormHTMLAttributes<HTMLFormElement>) { return <form {...props}>{children}</form> }

export function DialogClose({ onClick }: { onClick: () => void }) { return <CloseButton onClick={onClick} label="Close dialog" /> }

export function Announcement({ children }: { children: ReactNode }) { return <div className="notice">{children}</div> }

export function Metric({ className, label, value, note }: { className: string; label: string; value: number; note: string }) { return <Card className={`stat-card ${className}`}><span>{label}</span><StatValue>{value}</StatValue><StatNote>{note} <i>↗</i></StatNote></Card> }

export function LogoMark({ children }: { children: ReactNode }) { return <div className="company-logo">{children}</div> }

export function ActionLink({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <TextButton {...props}>{children}</TextButton> }

export function ToolbarFrame({ children }: { children: ReactNode }) { return <div className="toolbar">{children}</div> }

export function Breadcrumb({ children }: { children: ReactNode }) { return <div className="breadcrumb">{children}</div> }

export function PageHeader({ children }: { children: ReactNode }) { return <div className="page-heading">{children}</div> }

export function ActionBar({ children }: { children: ReactNode }) { return <div className="top-actions">{children}</div> }

export function SurfaceSection({ children, className = "" }: { children: ReactNode; className?: string }) { return <section className={`section-block ${className}`}>{children}</section> }

export function List({ children }: { children: ReactNode }) { return <div className="company-list">{children}</div> }

export function GridItem({ children }: { children: ReactNode }) { return <div>{children}</div> }

export function Tip({ children }: { children: ReactNode }) { return <div className="tip-card">{children}</div> }

export function Table({ children }: { children: ReactNode }) { return <div className="job-table">{children}</div> }

export function TableHeader({ children }: { children: ReactNode }) { return <div className="table-head">{children}</div> }

export function TableRow({ children }: { children: ReactNode }) { return <div className="job-row">{children}</div> }

export function FormDialog({ children, ...props }: React.FormHTMLAttributes<HTMLFormElement>) { return <form {...props}>{children}</form> }

export function ButtonLabel({ children }: { children: ReactNode }) { return <span>{children}</span> }

export function ContentHeading({ children }: { children: ReactNode }) { return <div>{children}</div> }

export function StatGrid({ children }: { children: ReactNode }) { return <div className="stat-grid">{children}</div> }

export function LowerGrid({ children }: { children: ReactNode }) { return <div className="lower-grid">{children}</div> }

export function CompanyGridFrame({ children }: { children: ReactNode }) { return <div className="company-grid">{children}</div> }

export function CompanyCard({ children }: { children: ReactNode }) { return <div className="company-card">{children}</div> }

export function StatusIndicator({ children }: { children: ReactNode }) { return <span>{children}</span> }

export function ProgressLabel({ children }: { children: ReactNode }) { return <div className="progress-label">{children}</div> }

export function SidebarBottom({ children }: { children: ReactNode }) { return <div className="sidebar-bottom">{children}</div> }

export function Navigation({ children }: { children: ReactNode }) { return <nav className="nav-list" aria-label="Main navigation">{children}</nav> }

export function WorkspaceLabel({ children }: { children: ReactNode }) { return <div className="workspace-label">{children}</div> }

export function SidebarFrame({ children }: { children: ReactNode }) { return <aside className="sidebar">{children}</aside> }

export function ToolButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <button className="filter-button" {...props}>{children}</button> }

export function ApplicationStatus({ status, children }: { status: string; children: ReactNode }) { return <Badge tone={status}>{children}</Badge> }

export function ActionButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <button className="row-action" {...props}>{children}</button> }

export function CompanyName({ children }: { children: ReactNode }) { return <strong>{children}</strong> }

export function RoleName({ children }: { children: ReactNode }) { return <strong>{children}</strong> }

export function Platform({ children }: { children: ReactNode }) { return <span className="platform-cell">{children}</span> }

export function CompanyNameCell({ children }: { children: ReactNode }) { return <span className="company-cell">{children}</span> }

export function RoleCell({ children }: { children: ReactNode }) { return <div className="role-cell">{children}</div> }

export function CompanyRoleCount({ children }: { children: ReactNode }) { return <span>{children}</span> }

export function FormCopy({ children }: { children: ReactNode }) { return <p className="modal-copy">{children}</p> }

export function FormTitle({ children }: { children: ReactNode }) { return <h2>{children}</h2> }

export function FormEyebrow({ children }: { children: ReactNode }) { return <Eyebrow>{children}</Eyebrow> }

export function FormClose({ onClick }: { onClick: () => void }) { return <CloseButton onClick={onClick} label="Close dialog" /> }

export function HeaderTitle({ children }: { children: ReactNode }) { return <h1>{children}</h1> }

export function HeaderSubtitle({ children }: { children: ReactNode }) { return <Subheading>{children}</Subheading> }

export function PrimaryAction({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <Button {...props}>{children}</Button> }

export function CompanyForm({ children, ...props }: React.FormHTMLAttributes<HTMLFormElement>) { return <form {...props}>{children}</form> }

export function DataList({ children }: { children: ReactNode }) { return <div className="company-list">{children}</div> }

export function DataGrid({ children }: { children: ReactNode }) { return <div className="company-grid">{children}</div> }

export function SearchToolbar({ children }: { children: ReactNode }) { return <div className="toolbar">{children}</div> }

export function TableAction({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <button className="row-action" {...props}>{children}</button> }

export function QuietAction({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <button className="row-action quiet" {...props}>{children}</button> }

export function Status({ children, tone }: { children: ReactNode; tone: string }) { return <Badge tone={tone}>{children}</Badge> }

export function RoleIcon({ children }: { children: ReactNode }) { return <RoleMark>{children}</RoleMark> }

export function CompanyLogo({ children, className = "" }: { children: ReactNode; className?: string }) { return <CompanyMark className={className}>{children}</CompanyMark> }

export function ModalSurface({ children }: { children: ReactNode }) { return <div className="modal">{children}</div> }

export function FormInput(props: InputHTMLAttributes<HTMLInputElement>) { return <TextInput {...props} /> }

export function FormLabel({ children, htmlFor }: { children: ReactNode; htmlFor: string }) { return <FieldLabel htmlFor={htmlFor}>{children}</FieldLabel> }

export function PrimaryButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <Button {...props}>{children}</Button> }

export function AddIcon() { return <span aria-hidden="true">+</span> }

export function Pagination() { return null }

export function AppShell({ children }: { children: ReactNode }) { return <Shell>{children}</Shell> }

export function MainContent({ children }: { children: ReactNode }) { return <Content>{children}</Content> }

export function PageBody({ children }: { children: ReactNode }) { return <PageContainer>{children}</PageContainer> }

export function FormModal({ children, onDismiss, titleId }: { children: ReactNode; onDismiss: () => void; titleId: string }) { return <Modal onDismiss={onDismiss} titleId={titleId}>{children}</Modal> }

export function DialogActions({ children }: { children: ReactNode }) { return <div className="form-actions">{children}</div> }

export function DialogDescription({ children }: { children: ReactNode }) { return <MutedText>{children}</MutedText> }

export function DialogInput(props: InputHTMLAttributes<HTMLInputElement>) { return <TextInput {...props} /> }

export function DialogSubmit({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <FormButton {...props}>{children}</FormButton> }

export function DashboardSection({ children, className = "" }: { children: ReactNode; className?: string }) { return <Section className={className}>{children}</Section> }

export function HeaderActions({ children }: { children: ReactNode }) { return <div className="top-actions">{children}</div> }

export function NavigationItem({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <NavButton {...props}>{children}</NavButton> }

export function CompanyCount({ children }: { children: ReactNode }) { return <span>{children}</span> }

export function JobCount({ children }: { children: ReactNode }) { return <span>{children}</span> }

export function HelpLink({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <HelpButton {...props}>{children}</HelpButton> }

export function NotificationLink({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <NotificationButton {...props}>{children}</NotificationButton> }

export function ConnectedStatus({ children }: { children: ReactNode }) { return <div><SyncIndicator /> {children}</div> }

export function DateLabel({ children }: { children: ReactNode }) { return <Eyebrow>{children}</Eyebrow> }

export function AddCompanyButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <PrimaryButton {...props}>{children}</PrimaryButton> }

export function PipelineStat({ children }: { children: ReactNode }) { return <div>{children}</div> }

export function CompanyRoleIcon({ children }: { children: ReactNode }) { return <CompanyMark>{children}</CompanyMark> }

export function TipLabel({ children }: { children: ReactNode }) { return <span className="tip-label">{children}</span> }

export function TipHeading({ children }: { children: ReactNode }) { return <h3>{children}</h3> }

export function TipCopy({ children }: { children: ReactNode }) { return <p>{children}</p> }

export function TipDivider() { return <Divider /> }

export function ApplicationTable({ children }: { children: ReactNode }) { return <Table>{children}</Table> }

export function CompanyCollection({ children }: { children: ReactNode }) { return <DataGrid>{children}</DataGrid> }

export function CompanyCollectionItem({ children }: { children: ReactNode }) { return <CompanyCard>{children}</CompanyCard> }

export function CompanyCollectionList({ children }: { children: ReactNode }) { return <DataList>{children}</DataList> }

export function CompanyCollectionRow({ children }: { children: ReactNode }) { return <ListItem>{children}</ListItem> }

export function QueryInput(props: InputHTMLAttributes<HTMLInputElement>) { return <SearchInput {...props} /> }

export function FilterButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <ToolButton {...props}>{children}</ToolButton> }

export function CompanyFormModal({ children, onDismiss, titleId }: { children: ReactNode; onDismiss: () => void; titleId: string }) { return <FormModal onDismiss={onDismiss} titleId={titleId}>{children}</FormModal> }

export function ActionIcon({ children }: { children: ReactNode }) { return <span aria-hidden="true">{children}</span> }

export function ScreenReaderOnly({ children }: { children: ReactNode }) { return <VisuallyHidden>{children}</VisuallyHidden> }

export function FocusRing() { return null }

export function Tooltip({ children }: { children: ReactNode }) { return <>{children}</> }

export function DialogOverlay({ children }: { children: ReactNode }) { return <>{children}</> }

export function LoadingIndicator() { return null }

export function ErrorMessage({ children }: { children: ReactNode }) { return <p role="alert">{children}</p> }

export function NoResults({ children }: { children: ReactNode }) { return <EmptyState>{children}</EmptyState> }

export function DashboardLayout({ children }: { children: ReactNode }) { return <Shell>{children}</Shell> }

export function SidebarLayout({ children }: { children: ReactNode }) { return <SidebarFrame>{children}</SidebarFrame> }

export function MainLayout({ children }: { children: ReactNode }) { return <Content>{children}</Content> }

export function ToolbarInput(props: InputHTMLAttributes<HTMLInputElement>) { return <SearchInput {...props} /> }

export function CardAction({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <TextButton {...props}>{children}</TextButton> }

export function UserProfile({ children }: { children: ReactNode }) { return <Profile>{children}</Profile> }

export function StatCard({ className, label, value, note }: { className: string; label: string; value: number; note: string }) { return <Metric className={className} label={label} value={value} note={note} /> }

export function CompanyItem({ children }: { children: ReactNode }) { return <ListItem>{children}</ListItem> }

export function JobItem({ children }: { children: ReactNode }) { return <TableRow>{children}</TableRow> }

export function JobStatus({ children, tone }: { children: ReactNode; tone: string }) { return <Status tone={tone}>{children}</Status> }

export function CompanySummary({ children }: { children: ReactNode }) { return <CardDescription>{children}</CardDescription> }

export function FormHeading({ children }: { children: ReactNode }) { return <FormTitle>{children}</FormTitle> }

export function DialogContent({ children }: { children: ReactNode }) { return <ModalSurface>{children}</ModalSurface> }

export function DashboardHeader({ children }: { children: ReactNode }) { return <PageHeader>{children}</PageHeader> }

export function DashboardNav({ children }: { children: ReactNode }) { return <Navigation>{children}</Navigation> }

export function DashboardSidebar({ children }: { children: ReactNode }) { return <SidebarFrame>{children}</SidebarFrame> }

export function DashboardToolbar({ children }: { children: ReactNode }) { return <ToolbarFrame>{children}</ToolbarFrame> }

export function DashboardNotice({ children }: { children: ReactNode }) { return <Announcement>{children}</Announcement> }

export function DashboardTable({ children }: { children: ReactNode }) { return <Table>{children}</Table> }

export function DashboardCard({ children, className = "" }: { children: ReactNode; className?: string }) { return <Card className={className}>{children}</Card> }

export function DashboardMetric({ children }: { children: ReactNode }) { return <div>{children}</div> }

export function DashboardModal({ children, onDismiss, titleId }: { children: ReactNode; onDismiss: () => void; titleId: string }) { return <Modal onDismiss={onDismiss} titleId={titleId}>{children}</Modal> }

export function DashboardForm({ children, ...props }: React.FormHTMLAttributes<HTMLFormElement>) { return <form {...props}>{children}</form> }

export function DashboardInput(props: InputHTMLAttributes<HTMLInputElement>) { return <TextInput {...props} /> }

export function DashboardButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <Button {...props}>{children}</Button> }

export function DashboardDialogTitle({ children, id }: { children: ReactNode; id: string }) { return <DialogTitle id={id}>{children}</DialogTitle> }

export function DashboardDialogDescription({ children }: { children: ReactNode }) { return <DialogDescription>{children}</DialogDescription> }

export function DashboardDialogClose({ onClick }: { onClick: () => void }) { return <DialogClose onClick={onClick} /> }

export function DashboardDialogSubmit({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <DialogSubmit {...props}>{children}</DialogSubmit> }

export function DashboardField({ children }: { children: ReactNode }) { return <Field>{children}</Field> }

export function DashboardLabel({ children, htmlFor }: { children: ReactNode; htmlFor: string }) { return <FormLabel htmlFor={htmlFor}>{children}</FormLabel> }

export function DashboardLogo() { return <Logo /> }

export function DashboardAvatar({ children }: { children: ReactNode }) { return <Avatar>{children}</Avatar> }

export function DashboardProgress({ value }: { value: number }) { return <Progress value={value} /> }

export function DashboardCount({ children }: { children: ReactNode }) { return <Count>{children}</Count> }

export function DashboardShortcut({ children }: { children: ReactNode }) { return <Shortcut>{children}</Shortcut> }

export function DashboardCompanyMark({ children }: { children: ReactNode }) { return <CompanyMark>{children}</CompanyMark> }

export function DashboardRoleMark({ children }: { children: ReactNode }) { return <RoleMark>{children}</RoleMark> }

export function DashboardStatus({ children, tone }: { children: ReactNode; tone: string }) { return <StatusBadge tone={tone}>{children}</StatusBadge> }

export function DashboardTableAction({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <TableAction {...props}>{children}</TableAction> }

export function DashboardQuietAction({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <QuietAction {...props}>{children}</QuietAction> }

export function DashboardSearch(props: InputHTMLAttributes<HTMLInputElement>) { return <QueryInput {...props} /> }

export function DashboardFilter({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <FilterButton {...props}>{children}</FilterButton> }

export function DashboardSectionHead(props: { title: string; description: string; actionLabel: string; onAction: () => void }) { return <SectionHead {...props} /> }

export function DashboardTip({ children }: { children: ReactNode }) { return <Tip>{children}</Tip> }

export function DashboardCompanyCard({ children }: { children: ReactNode }) { return <CompanyCard>{children}</CompanyCard> }

export function DashboardCompanyList({ children }: { children: ReactNode }) { return <CompanyList>{children}</CompanyList> }

export function CompanyList({ children }: { children: ReactNode }) { return <div className="company-list">{children}</div> }

export function CompanyRow({ children }: { children: ReactNode }) { return <div className="company-row">{children}</div> }

export function JobRow({ children }: { children: ReactNode }) { return <div className="job-row">{children}</div> }

export function JobTableHeader({ children }: { children: ReactNode }) { return <div className="table-head">{children}</div> }

export function JobTableCell({ children, className = "" }: { children: ReactNode; className?: string }) { return <span className={className}>{children}</span> }

export function CompanyPageGrid({ children }: { children: ReactNode }) { return <div className="company-grid">{children}</div> }

export function AddCompanyDialog({ children, onDismiss, titleId }: { children: ReactNode; onDismiss: () => void; titleId: string }) { return <Modal onDismiss={onDismiss} titleId={titleId}>{children}</Modal> }

export function DashboardPageHeading({ children }: { children: ReactNode }) { return <PageHeader>{children}</PageHeader> }

export function DashboardPageActions({ children }: { children: ReactNode }) { return <div>{children}</div> }

export function DashboardToolbarSearch(props: InputHTMLAttributes<HTMLInputElement>) { return <SearchInput {...props} /> }

export function DashboardToolbarFilter({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <FilterButton {...props}>{children}</FilterButton> }

export function DashboardPrimaryButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <PrimaryButton {...props}>{children}</PrimaryButton> }

export function DashboardClose({ onClick }: { onClick: () => void }) { return <CloseButton onClick={onClick} label="Close dialog" /> }

export function DashboardCompanyForm({ children, ...props }: React.FormHTMLAttributes<HTMLFormElement>) { return <form {...props}>{children}</form> }

export function DashboardCompanyInput(props: InputHTMLAttributes<HTMLInputElement>) { return <TextInput {...props} /> }

export function DashboardCompanyLabel({ children, htmlFor }: { children: ReactNode; htmlFor: string }) { return <FormLabel htmlFor={htmlFor}>{children}</FormLabel> }

export function DashboardCompanySubmit({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <PrimaryButton {...props}>{children}</PrimaryButton> }

export function DashboardCompanyTitle({ children, id }: { children: ReactNode; id: string }) { return <h2 id={id}>{children}</h2> }

export function DashboardCompanyCopy({ children }: { children: ReactNode }) { return <p className="modal-copy">{children}</p> }

export function DashboardCompanyEyebrow({ children }: { children: ReactNode }) { return <Eyebrow>{children}</Eyebrow> }

export function DashboardCompanyClose({ onClick }: { onClick: () => void }) { return <CloseButton onClick={onClick} label="Close dialog" /> }

export function DashboardCompanyDialog({ children, onDismiss, titleId }: { children: ReactNode; onDismiss: () => void; titleId: string }) { return <Modal onDismiss={onDismiss} titleId={titleId}>{children}</Modal> }

export function DashboardCompanyFormField({ children }: { children: ReactNode }) { return <Field>{children}</Field> }

export function DashboardCompanyFormLabel({ children, htmlFor }: { children: ReactNode; htmlFor: string }) { return <FormLabel htmlFor={htmlFor}>{children}</FormLabel> }

export function DashboardCompanyFormInput(props: InputHTMLAttributes<HTMLInputElement>) { return <TextInput {...props} /> }

export function DashboardCompanyFormButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <PrimaryButton {...props}>{children}</PrimaryButton> }

export function DashboardCompanyDialogContent({ children }: { children: ReactNode }) { return <ModalSurface>{children}</ModalSurface> }

export function DashboardCompanyDialogHeader({ children }: { children: ReactNode }) { return <ModalHeader>{children}</ModalHeader> }

export function DashboardCompanyDialogBody({ children }: { children: ReactNode }) { return <ModalBody>{children}</ModalBody> }

export function DashboardCompanyDialogFooter({ children }: { children: ReactNode }) { return <ModalFooter>{children}</ModalFooter> }

export function DashboardCompanyDialogTitle({ children, id }: { children: ReactNode; id: string }) { return <DialogTitle id={id}>{children}</DialogTitle> }

export function DashboardCompanyDialogDescription({ children }: { children: ReactNode }) { return <DialogDescription>{children}</DialogDescription> }

export function DashboardCompanyDialogClose({ onClick }: { onClick: () => void }) { return <DialogClose onClick={onClick} /> }

export function DashboardCompanyDialogAction({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <DialogSubmit {...props}>{children}</DialogSubmit> }

export function DashboardCompanyDialogLabel({ children, htmlFor }: { children: ReactNode; htmlFor: string }) { return <FormLabel htmlFor={htmlFor}>{children}</FormLabel> }

export function DashboardCompanyDialogInput(props: InputHTMLAttributes<HTMLInputElement>) { return <DialogInput {...props} /> }

export function DashboardCompanyDialogForm({ children, ...props }: React.FormHTMLAttributes<HTMLFormElement>) { return <form {...props}>{children}</form> }

export function DashboardCompanyDialogActions({ children }: { children: ReactNode }) { return <DialogActions>{children}</DialogActions> }

export function DashboardCompanyDialogSubmit({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <DialogSubmit {...props}>{children}</DialogSubmit> }

export function DashboardCompanyDialogDismiss({ onClick }: { onClick: () => void }) { return <DialogClose onClick={onClick} /> }
