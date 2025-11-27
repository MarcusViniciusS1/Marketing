import { Route, Routes } from "react-router-dom";
import LayoutLogin from "./components/layouts/layoutLogin";
import LayoutMain from "./components/layouts/layoutMain";

import Login from "./pages/User/login";
import CadastrarUsuario from "./pages/User/cadastrarUsuario";
import RecuperarSenha from "./pages/User/recuperarSenha"; 
import ResetarSenha from "./pages/User/resetarSenha"; 

import Dashboard from "./pages/Admin/dashboard";
import ListaCampanhas from "./pages/Admin/campanhas/lista";
import FormCampanha from "./pages/Admin/campanhas/formulario";

// Agora usamos apenas a LISTA e o FORMULÁRIO unificados
import ListaEmpresas from "./pages/Admin/empresa/lista";
import FormularioEmpresaAdmin from "./pages/Admin/empresa/formulario";

import ListaUsuarios from "./pages/Admin/usuarios/lista";
import FormularioUsuario from "./pages/Admin/usuarios/formulario";

export default function AppRoutes() {
    return (
       <Routes>
          <Route element={<LayoutLogin />}>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<CadastrarUsuario />} />
            <Route path="/recuperarSenha" element={<RecuperarSenha />} />
            <Route path="/registrarNovaSenha" element={<ResetarSenha />} />
          </Route>

          <Route element={<LayoutMain />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Empresas Unificadas */}
            <Route path="/empresas" element={<ListaEmpresas />} />
            <Route path="/empresa/nova" element={<FormularioEmpresaAdmin />} />
            <Route path="/empresa/:id/editar" element={<FormularioEmpresaAdmin />} />

            {/* Campanhas */}
            <Route path="/campanhas" element={<ListaCampanhas />} />
            <Route path="/campanhas/nova" element={<FormCampanha />} />
            <Route path="/campanhas/:id/editar" element={<FormCampanha />} />
            
            {/* Equipe */}
            <Route path="/usuarios" element={<ListaUsuarios />} />
            <Route path="/usuarios/novo" element={<FormularioUsuario />} />
            <Route path="/usuarios/:id/editar" element={<FormularioUsuario />} />
          </Route>
       </Routes>
    );
}