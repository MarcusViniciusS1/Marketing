import { useState } from "react";
import Header from "../header";
import Sidebar from "../sidebar";
import { Outlet } from "react-router-dom";

function LayoutAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div
        className="flex-grow-1 p-3"
        style={{
          transition: "margin-left 0.3s",
          marginLeft: sidebarOpen ? "250px" : "0px", // ajusta largura conforme sidebar
        }}
      >
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutAdmin;
