import { Outlet } from "react-router-dom"
import Footer from "../../footer"
import Header from "../../header"

    export default function LayoutUser(){
        return(
            <>
             <Header></Header>
                <div className="d-flex">
                <div className="flex-grow-1 p-4">
                <Outlet/>
                </div>
                </div>
                <Footer></Footer>
                </>
        )


    }