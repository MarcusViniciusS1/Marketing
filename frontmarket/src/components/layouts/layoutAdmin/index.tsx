

import { Outlet } from "react-router-dom";
import Header from "../../header";
import Sidebar from "../../sidebar";
import Footer from "../../footer";

export default function LayoutAdmin(){
    return(
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


