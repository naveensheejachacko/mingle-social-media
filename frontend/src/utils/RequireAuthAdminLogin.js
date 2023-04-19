import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export const RequireAuthLoginUser = () => {
    const token = Cookies.get('jwt_user')
    return (
        token
            ? <Outlet />
            : <Navigate to='/login' />
    )
}


//not necessary

import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export const RequireAuthLogin = () => {
    console.log("Inside Auth Function");
    const token = Cookies.get('jwt-admin')
    console.log(token);
    return (
        token
            ? <Outlet />
            : <Navigate to='/adminn/' />
    )
}

export const LoginPageRender = () => {
    const token = Cookies.get('jwt-admin')
    return (
        token
            ? <Navigate to='/adminn' />
            : <Outlet />
    )
}