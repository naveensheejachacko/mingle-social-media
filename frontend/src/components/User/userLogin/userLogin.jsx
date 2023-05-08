import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../Redux/userSlice";
import Cookies from "js-cookie";
import axios from "../../../utils/axios";
import "./userLogin.scss";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";



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
import { Button } from "@chakra-ui/react";


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
    axios
      .post(userLogin, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (
          response.data.status === "Wrong Password" ||
          response.data.status === "Email is not found"
        ) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Email or Password is incorrect",
            showConfirmButton: false,
            timer: 1500,
          });
        } 
        else if (response.data.status === "User is blocked") {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "This user is blocked. Access is restricted.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        else {
          Cookies.set("jwt_user", String(response.data.jwt));
          Cookies.set("role", String(response.data.role));
          Cookies.set("id", String(response.data.id));
          // Cookies.set("fullname", String(response.data.fullname));
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(
            login({
              email: email,
              //   password:password,
              // loggedIn:true
              user: response.data.fullname,
              token: response.data.jwt,
              user_id:response.data.id,
            })
          );
          navigate("home");
        }
      });
  };
// const signInWithGoogle= async ()=>{

//   signInWithPopup(auth,provider)
// .then((result)=>{axios.post(`http://127.0.0.1:8000/googleLogin`,{
//   fullname:result.user.displayName,
//   email:result.user.email,

// })
// }).then((response)=>{
//   Cookies.set("jwt_user", String(response.data.jwt));
//   Cookies.set("role", String(response.data.role));
//   Cookies.set("id", String(response.data.id));
  
//   dispatch(login({

//     user: response.data.fullname,
//     token: response.data.jwt,
//     user_id:response.data.id,
//   }

//   ))


//   navigate("home");
// })


// }

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const response = await axios.post('http://127.0.0.1:8000/googleLogin', {
      fullname: result.user.displayName,
      email: result.user.email,
    });
    
    Cookies.set('jwt_user', String(response.data.jwt));
    Cookies.set('role', String(response.data.role));
    Cookies.set('id', String(response.data.id));

    dispatch(login({
      user: response.data.fullname,
      token: response.data.jwt,
      user_id: response.data.id,
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

      <MDBContainer fluid className="p-4">
        <form onSubmit={(e) => handleLogin(e)}>
          <MDBCol className="mx-auto" md="6">
            <MDBCard className="my-5">
            <div style={{ textAlign: "center" }}>
              <h3 className="mt-5" style={{ fontSize: "3em" }}>
                
                <b>Getting Started</b>
              </h3>
              <p style={{ fontSize: "1em" }}>
                
                <b> Login to your account and connect with the people</b>
              </p>
              </div>
              <Button
                className="mx-auto my-4"
                style={{
                  backgroundColor: "#D9D9D9",
                  borderRadius: "16px",

                  display: "block",
                }}
                size="lg"
                type="button" 
                 onClick={signInWithGoogle} >
                  <FaGoogle />
                connect with Google
              </Button>

              <div
                style={{
                  width: "60%",
                  borderBottom: "1px solid black",
                  position: "relative",
                  margin: "auto",
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
            </MDBCard>
          </MDBCol>
        </form>
        <div className="para">
           Have an account?
                  <Link className="userLogin" to="/signup">
                    Sign up here
                  </Link>
                  </div>

      </MDBContainer>
    </>
  );
}
export default UserLogin;
