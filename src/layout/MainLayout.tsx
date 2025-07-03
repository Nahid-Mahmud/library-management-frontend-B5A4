import NavBar from "@/components/shared/NavBar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
