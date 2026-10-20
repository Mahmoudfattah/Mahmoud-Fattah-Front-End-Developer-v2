import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ExternalLink, LayoutDashboard, LogOut, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "./AuthProvider";

const iconSize = 18;

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signOutError, setSignOutError] = useState("");

  async function handleSignOut() {
    setSignOutError("");
    try {
      await signOut();
      navigate("/admin/login", { replace: true });
    } catch (error) {
      console.error("Failed to sign out.", error);
      setSignOutError("Could not sign out. Please try again.");
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}>
      {menuOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r p-5 transition-transform duration-200 md:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ backgroundColor: "var(--color-bg-projects)", borderColor: "var(--border-color)" }}
      >
        <div className="mb-9 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--color-primary)" }}>Portfolio</p>
            <h1 className="mt-1 text-lg font-bold">Admin studio</h1>
          </div>
          <button type="button" aria-label="Close navigation" className="rounded-lg p-2 md:hidden" onClick={() => setMenuOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--color-muted)" }}>Workspace</p>
        <nav className="space-y-1" aria-label="Admin navigation">
          <NavLink
            to="/admin/projects"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive ? "font-semibold" : "hover:bg-[var(--color-bgtech-projects)]"}`}
            style={({ isActive }) => isActive ? { backgroundColor: "var(--color-bgtech-projects)", color: "var(--color-primary)" } : { color: "var(--color-muted)" }}
          >
            <LayoutDashboard size={iconSize} />
            Projects
          </NavLink>
          {["Skills", "Services"].map((item) => (
            <div key={item} aria-disabled="true" className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium opacity-50" style={{ color: "var(--color-muted)" }}>
              <span className="flex items-center gap-3">
                <LayoutDashboard size={iconSize} />
                {item}
              </span>
              <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: "var(--color-bgtech-projects)" }}>Soon</span>
            </div>
          ))}
        </nav>

        <div className="mt-auto border-t pt-4" style={{ borderColor: "var(--border-color)" }}>
          <a href="/" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-[var(--color-bgtech-projects)]" style={{ color: "var(--color-muted)" }}>
            <ExternalLink size={iconSize} />
            View site
          </a>
        </div>
      </aside>

      <div className="min-h-screen md:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b px-4 sm:px-7" style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--border-color)" }}>
          <div className="flex min-w-0 items-center gap-3">
            <button type="button" aria-label="Open navigation" className="rounded-lg p-2 md:hidden" onClick={() => setMenuOpen(true)}>
              <Menu size={20} />
            </button>
            <span className="hidden text-sm font-medium sm:inline">Admin dashboard</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden max-w-56 truncate text-sm sm:inline" style={{ color: "var(--color-muted)" }}>{user?.email}</span>
            <button type="button" onClick={toggleTheme} aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"} className="rounded-lg p-2 transition hover:bg-[var(--color-bgtech-projects)]">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button type="button" onClick={handleSignOut} className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition hover:bg-[var(--color-bgtech-projects)]" style={{ borderColor: "var(--border-color)" }}>
              <LogOut size={16} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl p-5 sm:p-8">
          {signOutError && <p role="alert" className="mb-4 text-sm" style={{ color: "var(--color-third)" }}>{signOutError}</p>}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
