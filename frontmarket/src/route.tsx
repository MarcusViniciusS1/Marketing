import { Route, Routes, Navigate } from "react-router-dom";
import LayoutAdmin from "./components/LayoutAdmin/index";
import Login from "./pages/login";
import Home from "./pages/home";
import LayoutLogin from "./components/LayoutLogin";
import Cadastro from "./pages/cadastrese";
import Campanhas from "./pages/campanhas/index";
import Relatorios from "./pages/relatorios";
import Leads from "./pages/leaders";
import Usuario from "./pages/usuario";

function AppRoutes() {
    return (
        <Routes>
            {/* Rotas públicas */}
            <Route element={<LayoutLogin />}>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
            </Route>

            <Route element={<LayoutAdmin />}>
                <Route path="/home" element={<Home />} />
                <Route path="/usuarios" element={<Usuario />} />
                <Route path="/campanhas" element={<Campanhas />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/relatorios" element={<Relatorios />} />
            </Route>

            {/* Redirect da raiz (/) para /home */}
            <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
    );
}

export default AppRoutes;
