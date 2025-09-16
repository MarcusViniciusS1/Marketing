import { Outlet } from "react-router-dom";

function LayoutLogin() {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div className="row w-100">

        {/* Coluna onde o Outlet renderiza Login / Cadastro */}
        <div className="container ">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4 bg-white p-4 rounded shadow" >
            <Outlet />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutLogin;
