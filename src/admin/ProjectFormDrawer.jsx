import { useEffect, useMemo, useState } from "react";
import { Image, Plus, X } from "lucide-react";

const emptyProject = {
  title: "",
  role: "",
  status: "published",
  is_visible: true,
  description: "",
  live_url: "",
  repo_url: "",
  image_url: "",
  image_position: "50% 50%",
  image_scale: 1,
  tech_stack: [],
};

const statusStyles = {
  published: { label: "Published", dot: "#00c950", bg: "rgba(0,201,80,0.15)", text: "#00c950" },
  draft: { label: "Draft", dot: "#fe9a00", bg: "rgba(254,154,0,0.12)", text: "#fe9a00" },
};

function projectToForm(project) {
  return {
    title: project.title ?? "",
    role: project.role ?? "",
    status: project.status ?? "published",
    is_visible: project.is_visible ?? true,
    description: project.description ?? "",
    live_url: project.live_url ?? "",
    repo_url: project.repo_url ?? "",
    image_url: project.image_url ?? "",
    image_position: project.image_position ?? "50% 50%",
    image_scale: project.image_scale ?? 1,
    tech_stack: project.tech_stack ?? [],
  };
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors"
      style={{ backgroundColor: checked ? "var(--color-primary)" : "var(--border-color)" }}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

function ProjectPreview({ project }) {
  const status = statusStyles[project.status];

  return (
    <div
      className="flex flex-col overflow-hidden rounded-xl border"
      style={{ backgroundColor: "var(--color-bg-projects)", borderColor: "var(--border-color)" }}
    >
      <div className="block h-40 w-full overflow-hidden">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title || "Project preview"}
            className="h-full w-full object-cover"
            style={{ objectPosition: project.image_position, transform: `scale(${project.image_scale})` }}
          />
        ) : (
          <div className="flex h-full items-center justify-center" style={{ backgroundColor: "var(--color-bgtech-projects)", color: "var(--color-muted)" }}>
            <Image size={28} />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 p-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate pt-1 text-base font-semibold" style={{ color: "var(--color-text)" }}>{project.title || "Project title"}</h3>
          <span className="flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1 text-[10px] font-semibold" style={{ backgroundColor: status.bg, color: status.text }}>
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: status.dot }} />
            {status.label}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <span style={{ color: "var(--color-muted)" }}>Role:</span>
          <span className="truncate font-semibold" style={{ color: "var(--color-role-projects)" }}>{project.role || "Project role"}</span>
        </div>
        <p className="line-clamp-4 min-h-16 text-xs leading-4" style={{ color: "var(--color-text-projects)" }}>
          {project.description || "Your project description will appear here."}
        </p>
        <div className="mt-2 flex min-h-5 flex-wrap gap-1">
          {project.tech_stack.map((tech) => (
            <span key={tech} className="rounded-md bg-[var(--color-bgtech-projects)] px-1.5 py-0.5 text-[10px] font-semibold" style={{ color: "var(--color-text)" }}>{tech}</span>
          ))}
        </div>
      </div>
      <div className="mt-auto flex flex-wrap gap-2 px-3 pb-3">
        {project.live_url && <span className="rounded-md px-2.5 py-1.5 text-[10px] font-semibold" style={{ backgroundColor: "var(--color-live-projects)", color: "var(--color-bg)" }}>Website</span>}
        {project.repo_url && <span className="rounded-md px-2.5 py-1.5 text-[10px] font-semibold" style={{ backgroundColor: "var(--color-live-projects)", color: "var(--color-bg)" }}>Source</span>}
      </div>
    </div>
  );
}

const labelClass = "mb-1.5 block text-xs font-semibold";
const inputClass = "w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2";

export default function ProjectFormDrawer({ project, onClose, onSave }) {
  const [form, setForm] = useState(() => project ? projectToForm(project) : { ...emptyProject });
  const [initialForm] = useState(() => JSON.stringify(project ? projectToForm(project) : emptyProject));
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const isDirty = useMemo(() => JSON.stringify(form) !== initialForm, [form, initialForm]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") requestClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  function requestClose() {
    if (saving) return;
    if (isDirty && !window.confirm("Discard your unsaved changes?")) return;
    onClose();
  }

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function addTags(value) {
    const additions = value.split(",").map((tag) => tag.trim()).filter(Boolean);
    if (!additions.length) return;
    setForm((current) => {
      const existing = new Set(current.tech_stack.map((tag) => tag.toLowerCase()));
      const unique = additions.filter((tag) => {
        const normalized = tag.toLowerCase();
        if (existing.has(normalized)) return false;
        existing.add(normalized);
        return true;
      });
      return { ...current, tech_stack: [...current.tech_stack, ...unique] };
    });
    setTagInput("");
  }

  function handleTagKeyDown(event) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTags(tagInput);
    } else if (event.key === "Backspace" && !tagInput && form.tech_stack.length) {
      updateField("tech_stack", form.tech_stack.slice(0, -1));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    for (const key of ["live_url", "repo_url"]) {
      const value = form[key].trim();
      if (value && !/^https?:\/\/.+/i.test(value)) nextErrors[key] = "Enter a URL starting with http:// or https://.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSaving(true);
    try {
      await onSave({
        ...form,
        title: form.title.trim(),
        role: form.role.trim(),
        description: form.description.trim() || null,
        live_url: form.live_url.trim() || null,
        repo_url: form.repo_url.trim() || null,
        image_url: form.image_url.trim() || null,
        image_position: form.image_position.trim() || "50% 50%",
      });
    } catch {
      setSaving(false);
      return;
    }
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" aria-label="Close editor" className="absolute inset-0 hidden bg-black/50 md:block" onClick={requestClose} />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-form-title"
        className="absolute inset-0 flex flex-col overflow-hidden border-l md:left-auto md:w-full md:max-w-2xl"
        style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)", borderColor: "var(--border-color)" }}
      >
        <header className="flex shrink-0 items-center justify-between border-b px-5 py-4 sm:px-7" style={{ borderColor: "var(--border-color)" }}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>{project ? "Edit project" : "New project"}</p>
            <h2 id="project-form-title" className="mt-1 text-lg font-bold">{project ? "Update project details" : "Add a project"}</h2>
          </div>
          <button type="button" aria-label="Close editor" onClick={requestClose} className="rounded-lg p-2 transition hover:bg-[var(--color-bgtech-projects)]">
            <X size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-7">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-muted)" }}>Live preview</p>
              <ProjectPreview project={form} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="project-title">Title <span style={{ color: "var(--color-third)" }}>*</span></label>
                <input id="project-title" required autoFocus value={form.title} onChange={(event) => updateField("title", event.target.value)} className={inputClass} style={{ backgroundColor: "var(--color-bg-projects)", borderColor: "var(--border-color)", color: "var(--color-text)" }} />
              </div>
              <div>
                <label className={labelClass} htmlFor="project-role">Role <span style={{ color: "var(--color-third)" }}>*</span></label>
                <input id="project-role" required value={form.role} onChange={(event) => updateField("role", event.target.value)} className={inputClass} style={{ backgroundColor: "var(--color-bg-projects)", borderColor: "var(--border-color)", color: "var(--color-text)" }} />
              </div>
              <div>
                <label className={labelClass} htmlFor="project-status">Status</label>
                <select id="project-status" value={form.status} onChange={(event) => updateField("status", event.target.value)} className={inputClass} style={{ backgroundColor: "var(--color-bg-projects)", borderColor: "var(--border-color)", color: "var(--color-text)" }}>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div className="flex items-center justify-between rounded-lg border px-3 py-2" style={{ borderColor: "var(--border-color)" }}>
                <div>
                  <p className="text-sm font-medium">Visible</p>
                  <p className="text-xs" style={{ color: "var(--color-muted)" }}>Show on public site</p>
                </div>
                <Toggle checked={form.is_visible} onChange={(value) => updateField("is_visible", value)} label="Visible on public site" />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-semibold" htmlFor="project-description">Description</label>
                <span className="text-[11px]" style={{ color: "var(--color-muted)" }}>{form.description.length} characters</span>
              </div>
              <textarea id="project-description" rows={4} value={form.description} onChange={(event) => updateField("description", event.target.value)} className={inputClass} style={{ backgroundColor: "var(--color-bg-projects)", borderColor: "var(--border-color)", color: "var(--color-text)" }} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["live_url", "Live URL"],
                ["repo_url", "Repository URL"],
                ["image_url", "Image URL"],
              ].map(([key, label]) => (
                <div key={key} className={key === "image_url" ? "sm:col-span-2" : ""}>
                  <label className={labelClass} htmlFor={`project-${key}`}>{label}</label>
                  <input id={`project-${key}`} type="text" value={form[key]} onChange={(event) => updateField(key, event.target.value)} className={inputClass} style={{ backgroundColor: "var(--color-bg-projects)", borderColor: errors[key] ? "var(--color-third)" : "var(--border-color)", color: "var(--color-text)" }} />
                  {errors[key] && <p className="mt-1 text-xs" style={{ color: "var(--color-third)" }}>{errors[key]}</p>}
                </div>
              ))}
              <div>
                <label className={labelClass} htmlFor="project-image-position">Image position</label>
                <input id="project-image-position" type="text" value={form.image_position} onChange={(event) => updateField("image_position", event.target.value)} className={inputClass} style={{ backgroundColor: "var(--color-bg-projects)", borderColor: "var(--border-color)", color: "var(--color-text)" }} />
              </div>
              <div>
                <label className={labelClass} htmlFor="project-image-scale">Image scale: {Number(form.image_scale).toFixed(2)}</label>
                <input id="project-image-scale" type="range" min="0.5" max="2" step="0.05" value={form.image_scale} onChange={(event) => updateField("image_scale", Number(event.target.value))} className="mt-2 w-full accent-[var(--color-primary)]" />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="project-tech-stack">Tech stack</label>
              <div className="flex min-h-11 flex-wrap items-center gap-1.5 rounded-lg border p-2 focus-within:ring-2" style={{ backgroundColor: "var(--color-bg-projects)", borderColor: "var(--border-color)" }}>
                {form.tech_stack.map((tech) => (
                  <span key={tech} className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium" style={{ backgroundColor: "var(--color-bgtech-projects)" }}>
                    {tech}
                    <button type="button" aria-label={`Remove ${tech}`} onClick={() => updateField("tech_stack", form.tech_stack.filter((item) => item !== tech))} className="rounded-sm" style={{ color: "var(--color-muted)" }}><X size={12} /></button>
                  </span>
                ))}
                <input
                  id="project-tech-stack"
                  value={tagInput}
                  onChange={(event) => setTagInput(event.target.value)}
                  onKeyDown={handleTagKeyDown}
                  onBlur={() => tagInput && addTags(tagInput)}
                  placeholder="Type a technology and press Enter"
                  className="min-w-40 flex-1 bg-transparent px-1 py-1 text-xs outline-none"
                  style={{ color: "var(--color-text)" }}
                />
              </div>
            </div>
          </div>

          <footer className="flex shrink-0 justify-end gap-2 border-t px-5 py-4 sm:px-7" style={{ borderColor: "var(--border-color)", backgroundColor: "var(--color-bg)" }}>
            <button type="button" disabled={saving} onClick={requestClose} className="rounded-lg border px-4 py-2.5 text-sm font-medium disabled:opacity-50" style={{ borderColor: "var(--border-color)" }}>Cancel</button>
            <button type="submit" disabled={saving || !form.title.trim() || !form.role.trim()} className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50" style={{ backgroundColor: "var(--color-primary)", color: "var(--color-bg)" }}>
              {!saving && <Plus size={16} />}
              {saving ? "Saving..." : project ? "Save changes" : "Create project"}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}
