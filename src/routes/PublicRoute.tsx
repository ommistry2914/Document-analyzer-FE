import { Route } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import PublicRoute from "./PublicRoute";

function PublicRoutes() {
  return (
    <>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </>
  );
}

export default PublicRoutes;
