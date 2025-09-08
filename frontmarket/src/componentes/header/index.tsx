import { useState } from "react";
import Sidebar from "../siderbar/index"; 

// Define os tipos das propriedades (props) recebidas pelo Header
type HeaderProps = {
  userName: string;      // Nome do usuário que será exibido 
  userImage?: string;    // Imagem do usuário (opcional), caso não seja passada, usa a default
};

function Header({ userName, userImage }: HeaderProps) {
  // Estado que controla se a sidebar está aberta ou fechada
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Imagem padrão de usuario
  const defaultUserImage =
    "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgdmlld0JveD0iMCAwIDI0IDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMiAxMmE1IDUgMCAxIDAgMC0xMCA1IDUgMCAwIDAgMCAxMHpNNC4yIDIwLjQyYTIuMDAyIDIgMCAwIDEgMS40Ni0zLjM4QzYuNDcgMTUuODggOS4wMiAxNSA5IDE1aDYuMDAxYzIuMDEzIDAgNC41NDMuODggNS4zMiAyLjA0YTItMiAwIDAgMSAxLjQ2IDMuMzhDMTcuMDMgMjAuODUgMTQuNzQgMjIgMTIgMjJhMTAuNzYyIDEwLjc2MiAwIDAgMS03LjgtMS41OHoiLz48L3N2Zz4=";

  // Ícone em Base64 do menu três linhas
  const menuIcon =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48bGluZSB4MT0iMyIgeTE9IjYiIHgyPSIyMSIgeTI9IjYiLz48bGluZSB4MT0iMyIgeTE9IjEyIiB4Mj0iMjEiIHkyPSIxMiIvPjxsaW5lIHgxPSIzIiB5MT0iMTgiIHgyPSIyMSIgeTI9IjE4Ii8+PC9zdmc+";

  return (
    <>
      <header className="bg-dark">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 w-100">
          
          {/*abre/fecha a sidebar */}
          <button
            className="btn btn-dark me-3"
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            style={{ display: "flex", alignItems: "center", padding: "5px" }}
          >
            <img src={menuIcon} alt="Menu" width={32} height={32} />
          </button>

 
          <a className="navbar-brand" href="/">Home</a>


          <div className="navbar-nav">
            <a className="nav-link" href="/usuarios">Usuários</a>
          </div>

          {/* Menu do usuário */}
          <div className="dropdown ms-auto">
            <a
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              href="#"
              id="userMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {/* Exibe imagem do usuário, se não tiver usa a padrão */}
              <img
                src={userImage || defaultUserImage}
                alt="user"
                className="rounded-circle me-2"
                width={40}
                height={40}
              />
            </a>

            {/* Usuario  */}
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
              <li><span className="dropdown-item-text fw-bold">{userName}</span></li>
              <li><a className="dropdown-item" href="/editar">Editar usuário</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item text-danger" href="/logout">Sair</a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Sidebar Controle abre e fecha */}
      <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
    </>
  );
}

export default Header;
