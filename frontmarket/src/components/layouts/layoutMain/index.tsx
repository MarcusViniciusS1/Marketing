import { Outlet } from "react-router-dom";
import Sidebar from "../../sidebar";
import Header from "../../header";
import Footer from "../../footer";



export default function LayoutMain() {
  
  

  return (
           <>
            
                   <Header></Header>
                   <div className="d-flex">
                   <Sidebar></Sidebar>
                   <div className="flex-grow-1 p-4">
                   <Outlet/>
                   </div>
                   </div>
                   <Footer></Footer>
                   </>
       
  );
}
