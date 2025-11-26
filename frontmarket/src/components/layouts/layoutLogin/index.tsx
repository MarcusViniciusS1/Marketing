import { Outlet } from "react-router-dom";

export default  function LayoutLogin(){
     return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
      <div
        className="card shadow-lg p-4 border-0"
        style={{ maxWidth: "520px", width: "100%", backgroundColor: "#1e1e1e" }}
      >
       

        <Outlet />
      </div>
    </div>
  );
}