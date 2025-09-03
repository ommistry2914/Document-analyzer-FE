import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/slice/store";
import PublicRoutes from "./PublicRoute";
import ProtectedRoutes from "./ProtectedRoute";

function AppRoutes() {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <Routes>
      {!token ? (
        <>
          <PublicRoutes />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          <ProtectedRoutes />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
}

export default AppRoutes;
