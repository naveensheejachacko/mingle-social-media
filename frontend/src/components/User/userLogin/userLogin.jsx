import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../Redux/userSlice";
import Cookies from "js-cookie";
import axios from "../../../utils/axios";
import { baseUrl } from "../../../utils/Constants";
import "./userLogin.scss";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";

import toast,{Toaster} from 'react-hot-toast'


import {
  MDBBtn,
  MDBContainer,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBNavbar,
  MDBContainers,
} from "mdb-react-ui-kit";
import { userLogin,loginGoogle } from "../../../utils/Constants";
import {auth,provider} from "../../../firebase";
import { signInWithPopup } from "firebase/auth";
import GoogleButton from "../GoogleButton/GoogleButton";



function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) =>{
    e.preventDefault();
    const data = JSON.stringify({
      email,
      password,
    });
    if (
      password.length ===0 ||
      email.length==0
      
    ) {


      toast.error('All Fields Required');

      // Swal.fire({
      //   position: "center",
      //   icon: "warning",
      //   title: "Please Fill all Fields",
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
    }

else{
    axios
      .post(userLogin, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (
          response.data.status === "Wrong Password" ||
          response.data.status === "Email is not found"
        ) {
          // Swal.fire({
          //   position: "center",
          //   icon: "error",
          //   title: "Email or Password is incorrect",
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
          toast.error('Invalid Credentials');

        } 
        else if (response.data.status === "User is blocked") {
          // Swal.fire({
          //   position: "center",
          //   icon: "error",
          //   title: "This user is blocked. Access is restricted.",
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
          toast.error('User Restricted');

        }
        else {
          Cookies.set("jwt_user", String(response.data.jwt));
          Cookies.set("role", String(response.data.role));
          Cookies.set("id", String(response.data.id));
          // Cookies.set("fullname", String(response.data.fullname));
          // Swal.fire({
          //   position: "center",
          //   icon: "success",
          //   title: "Login Successfully",
          //   showConfirmButton: false,
          //   timer: 1500,
          // });            
          toast.success('Login Success');

          dispatch(
            login({
              email: email,
              //   password:password,
              // loggedIn:true
              user: response.data.fullname,
              token: response.data.jwt,
              user_id:response.data.id,
              profilePic:response.data.profile_picture
            })
          );
          navigate("home");
        }
      });
    }
  };

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const response = await axios.post(`${baseUrl}googleLogin`, {
      fullname: result.user.displayName,
      email: result.user.email,
    });
    
    Cookies.set('jwt_user', String(response.data.jwt));
    Cookies.set('role', String(response.data.role));
    Cookies.set('id', String(response.data.id));

    dispatch(login({
      user: response.data.fullname,
      email:response.data.email,
      token: response.data.jwt,
      user_id: response.data.id,
      profilePic:response.data.profile_picture
    }));

    navigate('home');
  } catch (error) {
    console.log(error);
  }
};
  return (
    <>
      <MDBNavbar light bgColor="light">
        <MDBContainer fluid>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              style={{ width: "31px", height: "31px", marginRight: "10px" }}
              src="../../../Images/logo.jpg"
              alt=""
            />
            <span
              className="navbar-text"
              style={{
                fontFamily: "Iceberg",
                fontWeight: "bold",
                color: "black",
              }}
            >
              
              mingle
            </span>
          </div>
        </MDBContainer>
      </MDBNavbar>

      {/* <MDBContainer className='mt-5 mb-5 shadow-5'> */}
       
          <MDBCol className="mx-auto" md="6">
            {/* <MDBCard className="my-3  py-4"> */}
            <div style={{ textAlign: "center" ,marginTop:'2em'}}>
              <h3  style={{ fontSize: "3em" }}>
                
                <b>Getting Started</b>
              </h3>
              <p style={{ fontSize: "1em" }}>
                
                <b> Login to your account and connect with the people</b>
              </p>
              </div>
              <button
                className="mx-auto my-4"
                style={{
                  backgroundColor: "#D9D9D9",
                  borderRadius: "16px",

                  display: "block",
                }}
                size="lg"
                type="button" 
                 onClick={signInWithGoogle} >
<GoogleButton />
              </button>

              <form onSubmit={(e) => handleLogin(e)}>
              <div
                style={{
                  width: "60%",
                  borderBottom: "1px solid black",
                  position: "relative",
                  margin: "auto",
                  marginBottom:"2em"
                }}
              >
                <span
                  style={{
        
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    padding: "0 10px",
                  }}
                >
                  OR
                </span>
              </div>
              <div
                className="emailField"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",

                }}
              >
                <input
                  className="form-control mb-2"
                  style={{
                    borderRadius: "16px",
                    width: "20rem",
                    display: "block",
                    backgroundColor: "#fff",
                    padding: ".7rem",
                    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                    border: "none",
                  }}
                  
                  label="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                  id="form1"
                  type="email"
                />
                {/* <span className="text-danger">{emailError}</span> */}
              </div>

              <div
                className="passwordField"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <input
                  className="form-control mb-2"
                  style={{
                    borderRadius: "16px",
                    width: "20rem",
                    display: "block",
                    backgroundColor: "#fff",
                    padding: ".7rem",
                    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                    border: "none",
                  }}
                  defaultValue="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                  type="password"
                  name="password"
                  id="form2"
                />
                {/* <span className="text-danger">{passwordError}</span> */}
              </div>

              <MDBBtn
                className="mx-auto my-4"
                style={{
                  backgroundColor: "#1DAEFF",
                  borderRadius: "16px",
                  width: "150px",
                  display: "block",
                }}
                size="lg"
              >
                Login
              </MDBBtn>
              </form>
            {/* </MDBCard> */}
          </MDBCol>
       
<div  style={{ textAlign: "center" }}  className="para">
<Link className="userLogin"  to="/otpLogin" >Login with OTP</Link></div>


        <div style={{ textAlign: "center" }}className="para">
           Have an account?
                  <Link className="userLogin" to="/signup">
                    Sign up here
                  </Link>
                  </div>
<Toaster />
      {/* </MDBContainer> */}
    </>
  );
}
export default UserLogin;
