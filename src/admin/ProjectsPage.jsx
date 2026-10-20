import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Check,
  ChevronDown,
  CirclePlus,
  Eye,
  EyeOff,
  LoaderCircle,
  Pencil,
  Search,
  Trash2,
  X,
} from "lucide-react";
import {
  createProject,
  deleteProject,
  listAllProjects,
  updateProject,
} from "./projectsAdminApi";
import ProjectFormDrawer from "./ProjectFormDrawer";

const statusStyles = {
  published: { label: "Published", dot: "#00c950", bg: "rgba(0,201,80,0.15)", text: "#00c950" },
  draft: { label: "Draft", dot: "#fe9a00", bg: "rgba(254,154,0,0.12)", text: "#fe9a00" },
};

function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(onDismiss, 3800);
    return () => window.clearTimeout(timeout);
  }, [toast, onDismiss]);

  if (!toast) return null;
  const success = toast.type === "success";

  return (
    <div
      role={success ? "status" : "alert"}
      className="fixed bottom-5 right-5 z-[70] flex max-w-[calc(100vw-2.5rem)] items-center gap-3 rounded-xl border px-4 py-3 text-sm shadow-xl"
      style={{
        backgroundColor: "var(--color-bg-projects)",
        borderColor: success ? "var(--color-secondary)" : "var(--color-third)",
        color: "var(--color-text)",
        boxShadow: "var(--shadow)",
      }}
    >
      {success ? <Check size={17} style={{ color: "var(--color-secondary)" }} /> : <AlertCircle size={17} style={{ color: "var(--color-third)" }} />}
      <span>{toast.message}</span>
      <button type="button" aria-label="Dismiss notification" onClick={onDismiss} className="ml-1" style={{ color: "var(--color-muted)" }}><X size={15} /></button>
    </div>
  );
}

function VisibilityToggle({ project, onToggle, disabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={project.is_visible}
      aria-label={`${project.is_visible ? "Hide" : "Show"} ${project.title} on public site`}
      disabled={disabled}
      onClick={() => onToggle(project)}
      className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-50"
      style={{ backgroundColor: project.is_visible ? "var(--color-primary)" : "var(--border-color)" }}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${project.is_visible ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

function ProjectThumbnail({ project }) {
  return (
    <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md" style={{ backgroundColor: "var(--color-bgtech-projects)" }}>
      {project.image_url ? (
        <img
          src={project.image_url}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
          style={{ objectPosition: project.image_position || "50% 50%", transform: `scale(${project.image_scale ?? 1})` }}
        />
      ) : (
        <div className="flex h-full items-center justify-center text-[10px]" style={{ color: "var(--color-muted)" }}>No image</div>
      )}
    </div>
  );
}

function StatusBadge({ project, onToggle, disabled }) {
  const style = statusStyles[project.status] ?? statusStyles.draft;
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onToggle(project)}
      title="Click to change status"
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10px] font-semibold transition-opacity hover:opacity-80 disabled:opacity-50"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: style.dot }} />
      {style.label}
    </button>
  );
}

function SkeletonRows() {
  return (
    <div className="animate-pulse divide-y" style={{ borderColor: "var(--border-color)" }}>
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="flex items-center gap-4 px-5 py-4">
          <div className="h-12 w-16 rounded-md" style={{ backgroundColor: "var(--color-bgtech-projects)" }} />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 rounded" style={{ backgroundColor: "var(--color-bgtech-projects)" }} />
            <div className="h-3 w-1/5 rounded" style={{ backgroundColor: "var(--color-bgtech-projects)" }} />
          </div>
          <div className="hidden h-6 w-20 rounded-md sm:block" style={{ backgroundColor: "var(--color-bgtech-projects)" }} />
          <div className="h-6 w-11 rounded-full" style={{ backgroundColor: "var(--color-bgtech-projects)" }} />
        </div>
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [drawerProject, setDrawerProject] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [pendingIds, setPendingIds] = useState(() => new Set());
  const [toast, setToast] = useState(null);

  function showToast(type, message) {
    setToast({ type, message, id: Date.now() });
  }

  useEffect(() => {
    let isMounted = true;
    listAllProjects()
      .then((rows) => {
        if (isMounted) setProjects(rows);
      })
      .catch((error) => {
        console.error("Failed to load admin projects.", error);
        if (isMounted) showToast("error", error.message || "Could not load projects.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesQuery = !needle || [
        project.title,
        project.role,
        ...(project.tech_stack ?? []),
      ].some((value) => value?.toLowerCase().includes(needle));

      const matchesFilter = filter === "all"
        || (filter === "published" && project.status === "published")
        || (filter === "draft" && project.status === "draft")
        || (filter === "hidden" && !project.is_visible);

      return matchesQuery && matchesFilter;
    });
  }, [projects, query, filter]);

  function openCreate() {
    setDrawerProject(null);
    setDrawerOpen(true);
  }

  function openEdit(project) {
    setDrawerProject(project);
    setDrawerOpen(true);
  }

  async function saveProject(data) {
    try {
      if (drawerProject) {
        const updated = await updateProject(drawerProject.id, data);
        setProjects((current) => current.map((item) => item.id === updated.id ? updated : item));
        showToast("success", "Project updated.");
      } else {
        const created = await createProject(data);
        setProjects((current) => [...current, created].sort((left, right) => left.sort_order - right.sort_order));
        showToast("success", "Project created.");
      }
      setDrawerOpen(false);
    } catch (error) {
      console.error("Failed to save project.", error);
      showToast("error", error.message || "Could not save project.");
      throw error;
    }
  }

  async function toggleStatus(project) {
    const previousStatus = project.status;
    const status = previousStatus === "published" ? "draft" : "published";
    setPendingIds((current) => new Set(current).add(project.id));
    setProjects((current) => current.map((item) => item.id === project.id ? { ...item, status } : item));
    try {
      const updated = await updateProject(project.id, { status });
      setProjects((current) => current.map((item) => item.id === updated.id ? updated : item));
      showToast("success", `${updated.title} marked ${status}.`);
    } catch (error) {
      setProjects((current) => current.map((item) => item.id === project.id ? { ...item, status: previousStatus } : item));
      console.error("Failed to update project status.", error);
      showToast("error", error.message || "Could not update project status.");
    } finally {
      setPendingIds((current) => {
        const next = new Set(current);
        next.delete(project.id);
        return next;
      });
    }
  }

  async function toggleVisibility(project) {
    const previousVisibility = project.is_visible;
    const is_visible = !previousVisibility;
    setPendingIds((current) => new Set(current).add(project.id));
    setProjects((current) => current.map((item) => item.id === project.id ? { ...item, is_visible } : item));
    try {
      const updated = await updateProject(project.id, { is_visible });
      setProjects((current) => current.map((item) => item.id === updated.id ? updated : item));
      showToast("success", `${updated.title} ${is_visible ? "is visible on" : "hidden from"} the public site.`);
    } catch (error) {
      setProjects((current) => current.map((item) => item.id === project.id ? { ...item, is_visible: previousVisibility } : item));
      console.error("Failed to update project visibility.", error);
      showToast("error", error.message || "Could not update project visibility.");
    } finally {
      setPendingIds((current) => {
        const next = new Set(current);
        next.delete(project.id);
        return next;
      });
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteProject(deleteTarget.id);
      setProjects((current) => current.filter((project) => project.id !== deleteTarget.id));
      showToast("success", `${deleteTarget.title} deleted.`);
      setDeleteTarget(null);
    } catch (error) {
      console.error("Failed to delete project.", error);
      showToast("error", error.message || "Could not delete project.");
    } finally {
      setDeleting(false);
    }
  }

  const projectRows = filteredProjects.map((project) => (
    <tr key={project.id} className="border-t transition-colors hover:bg-[var(--color-bgtech-projects)]/40" style={{ borderColor: "var(--border-color)" }}>
      <td className="px-5 py-3">
        <div className="flex min-w-52 items-center gap-3">
          <ProjectThumbnail project={project} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{project.title}</p>
            <p className="mt-0.5 truncate text-xs" style={{ color: "var(--color-muted)" }}>{project.role}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <StatusBadge project={project} onToggle={toggleStatus} disabled={pendingIds.has(project.id)} />
      </td>
      <td className="px-4 py-3">
        <VisibilityToggle project={project} onToggle={toggleVisibility} disabled={pendingIds.has(project.id)} />
      </td>
      <td className="px-4 py-3 text-sm" style={{ color: "var(--color-muted)" }}>{project.tech_stack?.length ?? 0}</td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-1">
          <button type="button" onClick={() => openEdit(project)} aria-label={`Edit ${project.title}`} className="rounded-lg p-2 transition hover:bg-[var(--color-bgtech-projects)]" style={{ color: "var(--color-muted)" }}><Pencil size={16} /></button>
          <button type="button" onClick={() => setDeleteTarget(project)} aria-label={`Delete ${project.title}`} className="rounded-lg p-2 transition hover:bg-[var(--color-bgtech-projects)]" style={{ color: "var(--color-third)" }}><Trash2 size={16} /></button>
        </div>
      </td>
    </tr>
  ));

  const projectCards = filteredProjects.map((project) => (
    <article key={project.id} className="rounded-xl border p-4" style={{ backgroundColor: "var(--color-bg-projects)", borderColor: "var(--border-color)" }}>
      <div className="flex items-start gap-3">
        <ProjectThumbnail project={project} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold">{project.title}</h3>
          <p className="mt-1 truncate text-xs" style={{ color: "var(--color-muted)" }}>{project.role}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusBadge project={project} onToggle={toggleStatus} disabled={pendingIds.has(project.id)} />
            <span className="text-xs" style={{ color: "var(--color-muted)" }}>{project.tech_stack?.length ?? 0} technologies</span>
          </div>
        </div>
        <div className="flex gap-1">
          <button type="button" onClick={() => openEdit(project)} aria-label={`Edit ${project.title}`} className="rounded-lg p-2" style={{ color: "var(--color-muted)" }}><Pencil size={16} /></button>
          <button type="button" onClick={() => setDeleteTarget(project)} aria-label={`Delete ${project.title}`} className="rounded-lg p-2" style={{ color: "var(--color-third)" }}><Trash2 size={16} /></button>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t pt-3" style={{ borderColor: "var(--border-color)" }}>
        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--color-muted)" }}>
          {project.is_visible ? <Eye size={15} /> : <EyeOff size={15} />}
          {project.is_visible ? "Visible on site" : "Hidden from site"}
        </div>
        <VisibilityToggle project={project} onToggle={toggleVisibility} disabled={pendingIds.has(project.id)} />
      </div>
    </article>
  ));

  return (
    <section>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>Workspace</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">Projects</h2>
          <p className="mt-2 text-sm" style={{ color: "var(--color-muted)" }}>Manage the projects displayed on your portfolio.</p>
        </div>
        <button type="button" onClick={openCreate} className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition hover:opacity-90" style={{ backgroundColor: "var(--color-primary)", color: "var(--color-bg)" }}>
          <CirclePlus size={17} />
          Add project
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-muted)" }} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title, role, or technology"
            aria-label="Search projects"
            className="w-full rounded-lg border py-2.5 pl-9 pr-3 text-sm outline-none focus:ring-2"
            style={{ backgroundColor: "var(--color-bg-projects)", borderColor: "var(--border-color)", color: "var(--color-text)", "--tw-ring-color": "var(--color-primary)" }}
          />
        </label>
        <label className="relative sm:w-44">
          <select value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filter projects by status" className="w-full appearance-none rounded-lg border py-2.5 pl-3 pr-9 text-sm outline-none focus:ring-2" style={{ backgroundColor: "var(--color-bg-projects)", borderColor: "var(--border-color)", color: "var(--color-text)", "--tw-ring-color": "var(--color-primary)" }}>
            <option value="all">All projects</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="hidden">Hidden</option>
          </select>
          <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-muted)" }} />
        </label>
      </div>

      <div className="overflow-hidden rounded-xl border" style={{ backgroundColor: "var(--color-bg-projects)", borderColor: "var(--border-color)" }}>
        {loading ? (
          <SkeletonRows />
        ) : filteredProjects.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: "var(--color-bgtech-projects)", color: "var(--color-primary)" }}>
              <Search size={21} />
            </div>
            <h3 className="text-base font-semibold">{projects.length ? "No projects match your filters" : "No projects yet"}</h3>
            <p className="mt-2 max-w-sm text-sm" style={{ color: "var(--color-muted)" }}>
              {projects.length ? "Try another search or filter, or add a project." : "Add your first project to start building your portfolio list."}
            </p>
            {!projects.length && <button type="button" onClick={openCreate} className="mt-5 rounded-lg px-4 py-2 text-sm font-semibold" style={{ backgroundColor: "var(--color-primary)", color: "var(--color-bg)" }}>Add project</button>}
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[760px] text-left">
                <thead>
                  <tr className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--color-muted)", backgroundColor: "var(--color-bgtech-projects)" }}>
                    <th className="px-5 py-3">Project</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Visible</th>
                    <th className="px-4 py-3">Tech</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>{projectRows}</tbody>
              </table>
            </div>
            <div className="grid gap-3 p-3 md:hidden">{projectCards}</div>
          </>
        )}
      </div>

      {!loading && filteredProjects.length > 0 && (
        <p className="mt-3 text-xs" style={{ color: "var(--color-muted)" }}>{filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}</p>
      )}

      {drawerOpen && (
        <ProjectFormDrawer
          project={drawerProject}
          onClose={() => setDrawerOpen(false)}
          onSave={saveProject}
        />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/55 p-4">
          <section role="alertdialog" aria-modal="true" aria-labelledby="delete-project-title" className="w-full max-w-md rounded-2xl border p-6 shadow-2xl" style={{ backgroundColor: "var(--color-bg-projects)", borderColor: "var(--border-color)", color: "var(--color-text)" }}>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(255,0,122,0.12)", color: "var(--color-third)" }}><Trash2 size={19} /></div>
            <h3 id="delete-project-title" className="text-lg font-bold">Delete project?</h3>
            <p className="mt-2 text-sm leading-6" style={{ color: "var(--color-muted)" }}>This will permanently delete <strong style={{ color: "var(--color-text)" }}>{deleteTarget.title}</strong>. This action cannot be undone.</p>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" disabled={deleting} onClick={() => setDeleteTarget(null)} className="rounded-lg border px-4 py-2.5 text-sm font-medium disabled:opacity-50" style={{ borderColor: "var(--border-color)" }}>Cancel</button>
              <button type="button" disabled={deleting} onClick={confirmDelete} className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold disabled:opacity-60" style={{ backgroundColor: "var(--color-third)", color: "white" }}>
                {deleting && <LoaderCircle size={15} className="animate-spin" />}
                {deleting ? "Deleting..." : "Delete project"}
              </button>
            </div>
          </section>
        </div>
      )}

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </section>
  );
}
