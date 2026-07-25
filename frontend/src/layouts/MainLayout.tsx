import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-100">
        {/* Later we'll add a Navbar here */}

        <main className="p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;