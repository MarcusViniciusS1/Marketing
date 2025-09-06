
function Sidebar() {
  return (
    <div>
      <div>
        <img src="" alt="logo" />
      </div>

      <ul>
        <li>
          <a href="/">Home</a>
        </li>

        <li>
          <a href="#submenucadastro" className="collapse" id="submenu">
            Cadastro
          </a>

          {/* Submenu sempre visível */}
          <ul className="submenu open">
            <li>
              <a href="/usuario">Usuário</a>
            </li>
            <li>
              <a href="/carrinho">Carrinho</a>
            </li>
                        <li>
              <a href="/criar campanhas">Criar Campanhas</a>
            </li>
            <li>
                <a href="/login">Login</a>
            </li>
            <li>
                <a href="/campanhas">Campanhas</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;