import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { logout } from "@/slice/authSlice";

export default function Home() {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Welcome to Home Page 🎉</h1>
      <Button className="mt-4" onClick={() => dispatch(logout())}>
        Logout
      </Button>
    </div>
  );
}
