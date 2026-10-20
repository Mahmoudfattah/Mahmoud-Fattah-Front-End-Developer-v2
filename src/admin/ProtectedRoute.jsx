import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute() {
  const { session, user, loading, signOut } = useAuth();
  const [notAuthorized, setNotAuthorized] = useState(false);
  const signOutStarted = useRef(false);

  useEffect(() => {
    if (
      loading ||
      !session ||
      !user ||
      user.email?.toLowerCase() === import.meta.env.VITE_ADMIN_EMAIL?.toLowerCase() ||
      signOutStarted.current
    ) {
      return;
    }

    signOutStarted.current = true;
    setNotAuthorized(true);
    signOut()
      .catch((error) => {
        console.error("Failed to sign out an unauthorized user.", error);
      });
  }, [loading, session, user, signOut]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: "var(--color-bg)" }}>
        <div
          role="status"
          aria-label="Loading"
          className="h-9 w-9 animate-spin rounded-full border-4 border-current border-r-transparent"
          style={{ color: "var(--color-primary)" }}
        />
      </div>
    );
  }

  if (notAuthorized) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}>
        <p role="alert" className="text-lg font-semibold">Not authorized</p>
      </main>
    );
  }

  if (!session) return <Navigate to="/admin/login" replace />;
  if (user?.email?.toLowerCase() !== import.meta.env.VITE_ADMIN_EMAIL?.toLowerCase()) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: "var(--color-bg)" }}>
        <div
          role="status"
          aria-label="Checking authorization"
          className="h-9 w-9 animate-spin rounded-full border-4 border-current border-r-transparent"
          style={{ color: "var(--color-primary)" }}
        />
      </div>
    );
  }

  return <Outlet />;
}
