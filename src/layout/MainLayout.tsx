import Footer from "@/components/shared/Footer";
import NavBar from "@/components/shared/NavBar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <NavBar />
      <div className="px-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
