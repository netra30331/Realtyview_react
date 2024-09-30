import { Outlet } from "react-router-dom"
import AuthImg from '@/assets/images/auth.png'
const AuthLayout = () =>{
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-2 flex items-stretch">
            <div className="col-span-1 lg:col-span-3 xl:col-span-1">
                <Outlet />
            </div>
            <div className="hidden lg:block lg:col-span-2 xl:col-span-1">
                <img src={AuthImg} alt="authImg" className="w-[50%] min-h-screen fixed " />
            </div>
        </div>
    )
}

export default AuthLayout