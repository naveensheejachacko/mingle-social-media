import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";


export  function AuthorizeAdmin({children}){
    const adminToken=Cookies.get("jwt-admin");
console.log(adminToken)
    if(!adminToken) return <Navigate to={'/adminn/'}/>

    return children;
}


export  function ProtectAdmin({children}){
    const adminToken=Cookies.get("jwt-admin");

    if(adminToken) return <Navigate to={'dashboard'}/>
   
    return children;

}