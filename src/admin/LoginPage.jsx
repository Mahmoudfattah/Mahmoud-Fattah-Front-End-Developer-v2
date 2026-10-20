import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function getLoginError(error) {
  const message = error?.message?.toLowerCase() ?? "";
  if (message.includes("invalid login credentials")) return "The email or password is incorrect.";
  if (message.includes("email not confirmed")) return "Please confirm your email before signing in.";
  if (message.includes("too many requests")) return "Too many attempts. Please wait a moment and try again.";
  return error?.message || "Unable to sign in. Please try again.";
}

export default function LoginPage() {
  const { session, user, loading: authLoading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: "var(--color-bg)" }}>
        <div role="status" aria-label="Loading" className="h-9 w-9 animate-spin rounded-full border-4 border-current border-r-transparent" style={{ color: "var(--color-primary)" }} />
      </div>
    );
  }

  if (session && user?.email?.toLowerCase() === import.meta.env.VITE_ADMIN_EMAIL?.toLowerCase()) {
    return <Navigate to="/admin/projects" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      await signIn(email.trim(), password);
    } catch (error) {
      setErrorMessage(getLoginError(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}>
      <section
        className="w-full max-w-md rounded-2xl border p-7 shadow-xl sm:p-9"
        style={{ backgroundColor: "var(--color-bg-projects)", borderColor: "var(--border-color)", boxShadow: "var(--shadow)" }}
      >
        <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: "var(--color-bgtech-projects)", color: "var(--color-primary)" }}>
          <LockKeyhole aria-hidden="true" size={22} />
        </div>
        <p className="mb-2 text-sm font-semibold" style={{ color: "var(--color-primary)" }}>Portfolio admin</p>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--color-muted)" }}>Sign in to manage your portfolio.</p>

        <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="admin-email" className="block text-sm font-medium">Email</label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2"
              style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--border-color)", color: "var(--color-text)", "--tw-ring-color": "var(--color-primary)" }}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="admin-password" className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border px-3 py-2.5 pr-11 text-sm outline-none transition focus:ring-2"
                style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--border-color)", color: "var(--color-text)", "--tw-ring-color": "var(--color-primary)" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex items-center px-3"
                style={{ color: "var(--color-muted)" }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {errorMessage && (
            <p role="alert" className="rounded-lg border px-3 py-2.5 text-sm" style={{ borderColor: "var(--color-third)", color: "var(--color-third)", backgroundColor: "var(--color-bg)" }}>
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
            style={{ backgroundColor: "var(--color-primary)", color: "var(--color-bg)" }}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
