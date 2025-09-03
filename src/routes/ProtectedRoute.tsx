import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/slice/store";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
