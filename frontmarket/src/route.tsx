import Footer from "./componentes/footer";
import Header from "./componentes/header";
import Home from "./componentes/paginas/home";
import Sidebar from "./componentes/siderbar";

function Route() {
  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="flex-grow-1 p-4">
          <Home />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Route;
