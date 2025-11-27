import { Route, Routes } from "react-router-dom";

// Layouts
import LayoutLogin from "./components/layouts/layoutLogin";
import LayoutMain from "./components/layouts/layoutMain";

// Páginas Públicas
import Login from "./pages/User/login";
import CadastrarUsuario from "./pages/User/cadastrarUsuario";
import RecuperarSenha from "./pages/User/recuperarSenha"; 
import ResetarSenha from "./pages/User/resetarSenha"; 

// Páginas Administrativas
import Dashboard from "./pages/Admin/dashboard";

// Módulo de Campanhas
import ListaCampanhas from "./pages/Admin/campanhas/lista";
import FormCampanha from "./pages/Admin/campanhas/formulario";

// Módulo de Empresa
import MinhaEmpresa from "./pages/Admin/empresa/detalhes";
import ListaEmpresas from "./pages/Admin/empresa/lista";
import FormularioEmpresaAdmin from "./pages/Admin/empresa/formulario";

// Módulo de Usuários
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

          {/* --- ROTAS PRIVADAS --- */}
          <Route element={<LayoutMain />}>
            
            {/* Dashboard */}
            <Route path="/home" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Campanhas */}
            <Route path="/campanhas" element={<ListaCampanhas />} />
            <Route path="/campanhas/nova" element={<FormCampanha />} />
            <Route path="/campanhas/:id/editar" element={<FormCampanha />} />

            {/* Minha Empresa (Perfil) */}
            <Route path="/empresa" element={<MinhaEmpresa />} />
            
            {/* Gestão de Empresas (Admin) */}
            {/* ESTAS ERAM AS ROTAS QUE ESTAVAM FALTANDO OU ERRADAS */}
            <Route path="/empresas" element={<ListaEmpresas />} />
            <Route path="/empresa/nova" element={<FormularioEmpresaAdmin />} />
            <Route path="/empresa/:id/editar" element={<FormularioEmpresaAdmin />} />
            
            {/* Usuários */}
            <Route path="/usuarios" element={<ListaUsuarios />} />
            <Route path="/usuarios/novo" element={<FormularioUsuario />} />
            <Route path="/usuarios/:id/editar" element={<FormularioUsuario />} />

            {/* Rota 404 (Opcional, para evitar tela branca em links errados) */}
            <Route path="*" element={<div className="p-4">Página não encontrada</div>} />

          </Route>
       </Routes>
    );
}