import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import AdminLayout from "./AdminLayout";
import LoginPage from "./LoginPage";
import ProjectsPage from "./ProjectsPage";
import ProtectedRoute from "./ProtectedRoute";

function AdminRoutes() {
  useEffect(() => {
    const previousRobots = document.querySelector('meta[name="robots"]');
    const previousContent = previousRobots?.getAttribute("content");
    const robotsMeta = previousRobots ?? document.createElement("meta");
    robotsMeta.name = "robots";
    robotsMeta.content = "noindex, nofollow";
    if (!previousRobots) document.head.appendChild(robotsMeta);

    return () => {
      if (previousRobots) {
        if (previousContent === null) previousRobots.removeAttribute("content");
        else previousRobots.setAttribute("content", previousContent);
      } else {
        robotsMeta.remove();
      }
    };
  }, []);

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/projects" replace />} />
          <Route path="projects" element={<ProjectsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/admin/projects" replace />} />
    </Routes>
  );
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <AdminRoutes />
    </AuthProvider>
  );
}
