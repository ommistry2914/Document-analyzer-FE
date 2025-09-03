import { Route } from "react-router-dom";
import Home from "@/pages/Home";
import Setting from "@/pages/Setting";
import ProtectedRoute from "./ProtectedRoute";

function ProtectedRoutes() {
  return (
    <>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/setting" element={<Setting />} />
      </Route>
    </>
  );
}

export default ProtectedRoutes;
