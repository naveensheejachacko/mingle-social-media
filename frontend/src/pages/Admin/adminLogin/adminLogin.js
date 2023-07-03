import background from "../../../../src/Images/admin_background.jpg";
import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminLogin } from "../../../Redux/adminSlice";
import axios from "../../../utils/axios";
import { adminLogin } from "../../../utils/Constants";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import './adminLogin.css'

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      return toast.error("Please fill the components.");
    }
    const data = JSON.stringify({
      email,
      password,
    });
      axios
        .post(adminLogin,data,{
          headers: { "Content-Type":"application/json" },
        })
        .then(( response ) => {

          if (
            response.data.status === "Wrong Password" ||
            response.data.status === "Email is not found"
            
          ) {
            // console.log("wrong password wrong email if")
            toast.error(data.message);
          }
          else {
            Cookies.set("jwt-admin", String(response.data.jwt));
            Cookies.set("role", String(response.data.role));
          dispatch(
            setAdminLogin({
              email: email,
              //   password:password,
              // loggedIn:true
              admin: response.data.role,
              token: response.data.jwt,
            })
          )
          navigate("users");
          }
    })

  };
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <div
              className="my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "500px" }}
            >
              <form       
                onSubmit={handleLogin}
                noValidate
                sx={{ mt: 1 }}>
              <MDBCardBody
                className="p-5 w-100 d-flex flex-column"
              >
                <h1
                  className="fw-bold mb-2 text-center"
                  style={{ color: "white" }}
                >
                  WELCOME ADMIN
                </h1>
                <p className=" mb-3" style={{ color: "white" }}>
                  Please enter your login and password!
                </p>

                <input
                  className="mb-4 mx-auto"
                  value={email}
                  name="email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    borderRadius: "16px",
                    width: "20rem",
                    display: "block",
                    backgroundColor: "transparent",
                    padding: ".7rem",
                    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                    border: "none",
                  }}
                  label="Email address"
                  id="formControlLg 1"
                  placeholder="Email"
                  type="email"
                  size="lg"
                />

                <input
                  className="mb-4 mx-auto"
                  value={password}
                  name="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  style={{
                    borderRadius: "16px",
                    width: "20rem",
                    display: "block",
                    backgroundColor: "transparent",
                    padding: ".7rem",
                    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                    border: "none",
                  }}
                  label="Password"
                  id="formControlLg"
                  placeholder="Passord"
                  type="password"
                  size="lg"
                />

                {/* < input Class='mb-4 '
               style={{
                borderRadius: "16px",
                width: "20rem",
                display: "block",
                backgroundColor: "transparent",
                padding: ".7rem",
                boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                border: "none",
              }} label='Email address' id='formControlLg' placeholder="Email" type='email' size="lg"/>
              < input Class='mb-4 '  style={{
                    borderRadius: "16px",
                    width: "20rem",
                    display: "block",
                    backgroundColor: "transparent",
                    padding: ".7rem",
                    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                    border: "none",
                  }}label='Password' id='formControlLg' placeholder="Passord" type='password' size="lg"/> */}

                <MDBBtn
                  type="submit"
                  className="mx-auto my-4"
                  style={{
                    borderRadius: "16px",
                    width: "150px",
                    display: "block",
                  }}
                  size="lg"
                >
                  Login
                </MDBBtn>
              </MDBCardBody>
              </form>
            </div>
            
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default AdminLogin;
