import React from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {userLogout} from "../utils/Constants";
import {logout} from '../Redux/userSlice'
import Cookies from "js-cookie";

function HomePage(){
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const userLogout = () => {
        Cookies.remove("jwt_user")
        Cookies.remove("role","user")
        Cookies.remove("id");
        dispatch(logout());
        navigate('/')
    
      }


    // const handleLogout = async () => {
    //     try {
    //       const response = await fetch('/logout', {
    //         method: 'POST',
    //         headers: {
    //           'Cache-Control': 'no-cache, max-age=0',
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({}),
    //         credentials: 'include' // include cookies in the request
    //       });
    //       const data = await response.json();
    //       // handle the response data
    //         Cookies.remove("jwt_user")
    //         Cookies.remove("role","user")
    //         Cookies.remove("id");
    //         dispatch(logout());

    //     } catch (error) {
    //       // handle the error
    //     }
    //   };




    return(
        <>
        <h1>hello</h1>
        <button onClick={userLogout} className="submit_btn">Logout</button>
    </>
        )
}
export default HomePage;