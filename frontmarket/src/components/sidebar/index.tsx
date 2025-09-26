import React, { useState } from "react";
import { Link } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
};

const logoBase64 =
   "";
  
const Sidebar = ({ isOpen, closeSidebar }: SidebarProps) => {
  const [abrirMenu2, setAbrirMenu2] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`position-fixed top-0 vh-100 bg-dark text-white p-3 d-flex flex-column ${
          isOpen ? "start-0" : "-start-100"
        }`}
        style={{ width: "250px", transition: "left 0.3s ease", zIndex: 1000 }}
      >
        {/* Logo */}
        <div className="text-center mb-3">
          <img src={logoBase64} alt="logo" width={64} height={64} />
        </div>

        {/* Menu */}
        <ul className="list-unstyled flex-grow-1">
          {/* Home Button */}
          <li className="mb-2">
            <Link
              to="/"
              className="btn btn-dark w-100 text-start d-flex align-items-center justify-content-start"
            >
              Home
            </Link>
          </li>
                    {/* Home usuarios */}
          <li className="mb-2">
            <Link
              to="/usuarios"
              className="btn btn-dark w-100 text-start d-flex align-items-center justify-content-start"
            >
              Usuarios
            </Link>
          </li>

          {/* Marketing Collapsible */}
          <li className="mb-2">
            <button
              onClick={() => setAbrirMenu2(!abrirMenu2)}
              className="btn btn-dark w-100 d-flex justify-content-between align-items-center text-start"
            >
              Marketing
              <span>{abrirMenu2 ? "▲" : "▼"}</span>
            </button>

            <ul
              className={`list-unstyled ps-3 mt-2 collapse ${
                abrirMenu2 ? "show" : ""
              }`}
            >
              <li className="mb-1">
                <Link
                  to="/campanhas"
                  className="text-white text-decoration-none d-block px-2 py-1 rounded hover-bg-secondary"
                >
                  Campanhas
                </Link>
              </li>
              <li className="mb-1">
      
              </li>
              <li className="mb-1">
                <Link
                  to="/leads"
                  className="text-white text-decoration-none d-block px-2 py-1 rounded hover-bg-secondary"
                >
                  Leads
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  to="/relatorios"
                  className="text-white text-decoration-none d-block px-2 py-1 rounded hover-bg-secondary"
                >
                  Relatórios
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  to="/login"
                  className="text-white text-decoration-none d-block px-2 py-1 rounded hover-bg-secondary"
                >
                  Login
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 900 }}
          onClick={closeSidebar}
        ></div>
      )}

      <style>{`
        .-start-100 { left: -250px !important; }
        .hover-bg-secondary:hover { background-color: #495057 !important; }
      `}</style>
    </>
  );
};

export default Sidebar;
