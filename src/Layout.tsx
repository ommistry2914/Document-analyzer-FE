import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { useSelector } from "react-redux";
import type { RootState } from "./slice/store";
import { Outlet, useLocation } from "react-router-dom";
import { routes } from "./data/sidebarData";

export default function Layout() {
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();

  const currentRoute = routes.find((r) => r.url === location.pathname);
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <h1>
            {currentRoute ? currentRoute.title : ""}
          </h1>
        </header>
        <div className="flex flex-1 flex-col overflow-hidden">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
