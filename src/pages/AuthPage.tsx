import { Outlet } from "react-router-dom";

function AuthPage() {
  return (
      <div className="flex items-center justify-center">
        <Outlet />
      </div>
  );
}

export default AuthPage;
