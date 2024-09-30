import { Outlet } from "react-router-dom"
import LandingHeader from "./bars/LandingHeader"
const FullLayout = () =>{
    return (
        <div>
            <LandingHeader />
            <Outlet />
        </div>
    )
}

export default FullLayout