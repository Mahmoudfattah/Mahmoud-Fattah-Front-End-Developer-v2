import { FolderKanban } from "lucide-react";

export default function ProjectsPage() {
  return (
    <section>
      <div className="mb-7">
        <p className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>Workspace</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight">Projects</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--color-muted)" }}>Manage the projects displayed on your portfolio.</p>
      </div>
      <div
        className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-12 text-center"
        style={{ backgroundColor: "var(--color-bg-projects)", borderColor: "var(--border-color)" }}
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: "var(--color-bgtech-projects)", color: "var(--color-primary)" }}>
          <FolderKanban size={22} />
        </div>
        <h3 className="text-base font-semibold">Your projects will appear here</h3>
        <p className="mt-2 max-w-sm text-sm" style={{ color: "var(--color-muted)" }}>Project management tools are coming soon.</p>
      </div>
    </section>
  );
}
