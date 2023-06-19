import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userSignup } from "../../../utils/Constants";
import axios from "../../../utils/axios";
import "./userRegister.scss";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBNavbar,
  MDBContainers,
} from "mdb-react-ui-kit";

function UserSignup() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [fullnameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone_numberError, setPhone_numberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (fullname && email && phone_number && gender && password) {
    //   setAllFieldsFilled(true);
    // } else {
    //   setAllFieldsFilled(false);
    // }

    const data = JSON.stringify({
      fullname,
      email,
      phone_number,
      gender,
      password,
    });
    if (
      fullname.length === 0 ||
      password.length ===0 ||
      phone_number.length === 0 ||
      phone_number.length<10||
      password.length ===0||
      gender.length===0
      
    ) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please Fill all Fields",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      axios
        .post(userSignup, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          if (
            response.data.status === "email exists" ||
            response.data.status === "phone number exists"
          ) {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Email already exist",
              showConfirmButton: false,
              timer: 1500,
            });
            // navigate("/signup");
          } else {
            console.log(response.status);
            navigate("/");
          }
        });
    }
  };

  const handleNameChange = (e) => {
    setFullName(e.target.value);
    if (!/^[A-Za-z, ]{3,}$/.test(e.target.value)) {
      setFullNameError("Must contain at least 3 letters and no numbers");
    } else {
      setFullNameError("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(e.target.value)) {
      setEmailError("Email is not valid");
    } else {
      setEmailError("");
    }
  };

  const handlePhoneNumberChange = (e) => {
    setPhone_number(e.target.value);
    if (!/^\d{10}$/.test(e.target.value)) {
      setPhone_numberError("Phone Number is not valid");
    } else {
      setPhone_numberError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(e.target.value)) {
      setPasswordError("Password length must contains 5 letters and 1 number ");
    } else {
      setPasswordError("");
    }
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    if (!e.target.value) {
      setGenderError("Gender field cannot be empty");
    } else {
      setGenderError("");
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

      <MDBContainer
        fluid
        className="p-10 d-flex justify-content-center align-items-center"
      >
        <MDBCol md="6">
          {/* <MDBCard className="my-4"> */}
            <form onSubmit={(e) => handleSubmit(e)}>
              <h3 className="mt-4 mb-3" style={{ textAlign: "center" ,marginTop:'1.5em',fontSize:'3em'}}>
                <b>Getting Started</b>
              </h3>
              <p  style={{ textAlign: "center" ,marginTop:'1em',fontSize:'1em'}}>
                <b>
                  {" "}
                  Create and account to continue and connect with the people
                </b>
              </p>

              <input
                className="fullnameField form-control "
                style={{
                  borderRadius: "16px",

                  width: "20rem",
                  display: "block",
                  backgroundColor: "#fff",
                  padding: "1rem",
                  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                  border: "none",
                }}
                label="Full Name"
                value={fullname}
                onChange={handleNameChange}
                placeholder="Full Name"
                id="form1"
                type="text"
              />

              <span className="text-danger">{fullnameError}</span>

              <input
                className="emailField form-control "
                style={{
                  borderRadius: "16px",
                  width: "20rem",
                  display: "block",
                  backgroundColor: "#fff",
                  padding: "1rem",
                  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                  border: "none",
                }}
                label="Email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
                id="form2"
                type="email"
              />

              <span className="text-danger">{emailError}</span>

              <input
                className="passwordField form-control mb-4"
                style={{
                  borderRadius: "16px",
                  width: "20rem",
                  display: "block",
                  backgroundColor: "#fff",
                  padding: "1rem",
                  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                  border: "none",
                }}
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                type="password"
                placeholder="Password"
                id="form3"
              />

              <span className="text-danger">{passwordError}</span>

              <input
                className="phonenumberField form-control mb-4"
                style={{
                  borderRadius: "16px",
                  width: "20rem",
                  display: "block",
                  backgroundColor: "#fff",
                  padding: "1rem",
                  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                  border: "none",
                }}
                placeholder="Phone Number"
                label="Phone Number"
                value={phone_number}
                onChange={handlePhoneNumberChange}
                id="form4"
                type="number"
              />
              <span className="text-danger">{phone_numberError}</span>

              <select
                className="genderField form-select mb-4"
                style={{
                  borderRadius: "16px",
                  width: "20rem",
                  display: "block",
                  backgroundColor: "#fff",
                  padding: "1rem",
                  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                  border: "none",
                }}
                value={gender}
                onChange={handleGenderChange}
                aria-label="Default select example"
              >
                <option value="" disabled >Gender</option>
                <option value="M" selected={gender === "M"}>
                  Male
                </option>
                <option value="F" selected={gender === "F"}>
                  Female
                </option>
                <option value="O" selected={gender === "O"}>
                  Other
                </option>
              </select>
              <span className="text-danger">{genderError}</span>

              <MDBBtn
                type="submit"
                className="mx-auto my-4"
                style={{
                  backgroundColor: "#1DAEFF",
                  borderRadius: "16px",
                  width: "150px",
                  display: "block",
                }}
                size="lg"
                // disabled={!allFieldsFilled}
                // onClick={handleSubmit}
              >
                Sign Up
              </MDBBtn>

              <div className="text-center">{/* some text */}</div>
            </form>
          {/* </MDBCard> */}
          <div className="para text-center">
            Have an account?
            <Link className="userLogin" to="/">
              Sign in here
            </Link>
          </div>
        </MDBCol>
      </MDBContainer>
    </>
  );
}

export default UserSignup;
