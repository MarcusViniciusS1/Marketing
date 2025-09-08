import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./componentes/header";
import Footer from "./componentes/footer";
import Home from "./componentes/paginas/home";
import Campanhas from "./componentes/paginas/projeto/Campanhas";
import CriarCampanha from "./componentes/paginas/projeto/CriarCampanha";
import Leads from "./componentes/paginas/projeto/Leads";
import Login from "./componentes/paginas/projeto/Login";
import Relatorios from "./componentes/paginas/projeto/Relatorios";

function AppRoutes() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campanhas" element={<Campanhas />} />
        <Route path="/criarcampanha" element={<CriarCampanha />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/relatorios" element={<Relatorios />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default AppRoutes;
