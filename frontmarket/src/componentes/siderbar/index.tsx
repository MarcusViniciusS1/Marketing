import { useState } from "react";


function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sidebar">
      <div className="logo">
        {/* Logo Dark em Base64 */}
        <img
          src="src/img/logo.png"
          alt="logo"
          width={64}
          height={64}
        />
      </div>

      <ul>
        <li>
          <a href="/">Home</a>
        </li>

        <li>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="collapse-btn"
          >
            Marketing
            <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
          </button>

          <ul className={`submenu ${isOpen ? "open" : ""}`}>
            <li>
              <a href="/ampanhas">Campanhas</a>
            </li>
            <li>
              <a href="/criarcampanhas">Criar Campanha</a>
            </li>
            <li>
              <a href="/leads">Leads</a>
            </li>
            <li>
              <a href="/criar campanhas">Relatórios</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>

          </ul>
        </li>
      </ul>


      <style jsx>{`
        .sidebar {
          width: 250px;
          background: #212529;
          color: #fff;
          min-height: 100vh;
          padding: 15px;
        }

        .logo {
          text-align: center;
          margin-bottom: 20px;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        li {
          margin: 8px 0;
        }

        a {
          color: #adb5bd;
          text-decoration: none;
          display: block;
          padding: 10px;
          border-radius: 6px;
          transition: background 0.3s;
        }

        a:hover {
          background: #343a40;
          color: #fff;
        }

        .collapse-btn {
          background: none;
          border: none;
          color: #adb5bd;
          cursor: pointer;
          padding: 10px;
          width: 100%;
          text-align: left;
          border-radius: 6px;
          font-size: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.3s;
        }

        .collapse-btn:hover {
          background: #343a40;
          color: #fff;
        }

        .arrow {
          transition: transform 0.3s ease;
        }

        .arrow.open {
          transform: rotate(180deg);
        }

        .submenu {
          list-style: none;
          padding-left: 15px;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
        }

        .submenu.open {
          max-height: 500px; /* suficiente para expandir */
        }
      `}</style>
    </div>
  );
}

export default Sidebar;
