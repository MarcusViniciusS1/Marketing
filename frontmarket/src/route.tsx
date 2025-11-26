import { Route, Routes } from "react-router-dom";

// Layouts
import LayoutLogin from "./components/layouts/layoutLogin";
import LayoutMain from "./components/layouts/layoutMain";

// Páginas Públicas
import Login from "./pages/User/login";
import CadastrarUsuario from "./pages/User/cadastrarUsuario";
import RecuperarSenha from "./pages/User/recuperarSenha"; // Se tiver criado
import ResetarSenha from "./pages/User/resetarSenha"; // Se tiver criado

// Páginas Administrativas (SaaS)
import Dashboard from "./pages/Admin/dashboard";

// Campanhas
import ListaCampanhas from "./pages/Admin/campanhas/lista";
import FormCampanha from "./pages/Admin/campanhas/formulario";

// Minha Empresa (Visão do Cliente)
import MinhaEmpresa from "./pages/Admin/empresa/detalhes";

// Gestão de Empresas (Visão do Admin da Plataforma)
import ListaEmpresas from "./pages/Admin/empresa/lista";
import FormularioEmpresaAdmin from "./pages/Admin/empresa/formulario";

// Usuários / Equipe
import ListaUsuarios from "./pages/Admin/usuarios/lista";
import FormularioUsuario from "./pages/Admin/usuarios/formulario";

export default function AppRoutes() {
    return (
       <Routes>
          {/* --- ROTAS PÚBLICAS --- */}
          <Route element={<LayoutLogin />}>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<CadastrarUsuario />} />
            <Route path="/recuperarSenha" element={<RecuperarSenha />} />
            <Route path="/registrarNovaSenha" element={<ResetarSenha />} />
          </Route>

          {/* --- ROTAS PRIVADAS (SISTEMA) --- */}
          <Route element={<LayoutMain />}>
            {/* Dashboard */}
            <Route path="/home" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Módulo de Campanhas */}
            <Route path="/campanhas" element={<ListaCampanhas />} />
            <Route path="/campanhas/nova" element={<FormCampanha />} />
            <Route path="/campanhas/:id/editar" element={<FormCampanha />} />

            {/* Módulo da Minha Empresa (Cliente vê seus dados) */}
            <Route path="/empresa" element={<MinhaEmpresa />} />
            
            {/* Módulo de Gestão de Empresas (Admin vê todas) */}
            <Route path="/empresas" element={<ListaEmpresas />} />
            <Route path="/empresa/nova" element={<FormularioEmpresaAdmin />} />
            <Route path="/empresa/:id/editar" element={<FormularioEmpresaAdmin />} />
            
            {/* Módulo de Usuários (Equipe) */}
            <Route path="/usuarios" element={<ListaUsuarios />} />
            <Route path="/usuarios/novo" element={<FormularioUsuario />} />
            {/* Opcional: rota de editar usuário se necessário */}
            {/* <Route path="/usuarios/:id/editar" element={<FormularioUsuario />} /> */}
          </Route>
       </Routes>
    );
}