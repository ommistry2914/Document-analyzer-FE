import { Outlet } from "react-router-dom";

function AuthPage() {
  return (
      <div className="flex-1 h-full flex items-center justify-center">
        <Outlet />
      </div>
  );
}

export default AuthPage;
