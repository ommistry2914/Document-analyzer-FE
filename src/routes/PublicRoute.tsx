import { Route } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AuthPage from "@/pages/AuthPage";

function PublicRoutes() {
  return (
      <Route element={<AuthPage />} key="auth">
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
  );
}

export default PublicRoutes;
