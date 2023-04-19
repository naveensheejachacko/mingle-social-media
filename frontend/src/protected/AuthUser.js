import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export  function AuthorizeUser({children}){
    const token=Cookies.get('jwt_user');

    if(!token) return <Navigate to={'/'}/>

    return children
}

export function ProtectUser({children}){
    const token=Cookies.get('jwt_user');

    if(token) return <Navigate to={'/home'}/>

    return children;
}