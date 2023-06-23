import React, { useEffect, useState, useSelect } from "react";
import "./Mobile.scss";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth, provider } from "../../../firebase";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { login } from "../../../Redux/userSlice";

import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { baseUrl } from "../../../utils/Constants";



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

function Mobile() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [viewOtpForm, setViewOtpForm] = useState(false);

  const [role, setRole] = useState();
  const[fullname,setFullname]=useState();
  const [id,setId]=useState();
  const [tokenVal, setTokenVal] = useState();
  const[email,setEmail]=useState();
  const[profilePic,setProfilePic]=useState()





  const dispatch = useDispatch();
  const navigate = useNavigate();



  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {},
        defaultCountry: "IN",
      },
      auth
    );
  };

  const requestOTP = async (e) => {
    e.preventDefault();
    let mobileNumber=e.target.phone.value

    if (mobileNumber === "" || mobileNumber.length < 10)
      toast.error("please enter mobile number");
    else {
      
      const formattedMobileNumber = "+91" + mobileNumber;
      // try {
        await axios
          .post(`${baseUrl}OTPLogin`, {
            mobileNumber: mobileNumber,
          })
          .then((response) => {
            // console.log(response);
            setTokenVal(String(response.data.jwt));
            setRole(String(response.data.role));
            setId(String(response.data.id));
            setEmail(String(response.data.email))
            setFullname(String(response.data.fullname))
            setProfilePic(String(response.data.profile_picture))


            // console.log(response.data.status, "status");
            if (response.data.status === "User is blocked") {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "This user is blocked. Access is restricted.",
                showConfirmButton: false,
                timer: 1500,
              });
            } 
            if (response.data.status === "Success") {
              
              generateRecaptcha();
              let appVerifier = window.recaptchaVerifier;
              signInWithPhoneNumber(auth,formattedMobileNumber, appVerifier)
                .then((confirmationResult) => {
                  // console.log("otp sent");
                  setViewOtpForm(true);
                  window.confirmationResult = confirmationResult;
                })
                .catch((error) => {
                  toast.error(`error=> ${error.message}`);
                });
            } else {
              toast.error("mobile not registered");
            }
          });
      // } catch {
      //   toast.error("somethin went wrong");
      // }
    }
  };

  const verifyOTP = (otp) => {
    // toast.success(otp);
    if (window.confirmationResult) {
      window.confirmationResult
        .confirm(otp)
        .then((response) => {

          Cookies.set("jwt_user",tokenVal);
          Cookies.set("role", role);
          Cookies.set("id", id);


          dispatch(
            login({
              email: email,
              user: fullname,
              token:tokenVal,
              user_id: id,
              profilePic:profilePic
            })
          );
          navigate("/home");
        })
        .catch((error) => {
          toast.error(`error=> ${error.message}`);
        });
    } else {
      // Handle the case when window.confirmationResult is not available yet
      toast.error("Confirmation result is not available");
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

    
    <div className="wrapper">
      <h1 className="main-heading">Sign in</h1>
      <p className="sub-text">Sign in using your mobile number.</p>
      {!viewOtpForm ? (
        <div className="form-wrapper">
         <form id="loginForm" onSubmit={requestOTP}>
            <div className="input-field">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                autoComplete="false"
              />
            </div>
            <button className="main-button" type="submit" id="sign-in-button">
              Sign in
            </button>
          </form>
          <Toaster />
        </div>
      ) : (
        <div className="form-wrapper">
          <form
            id="otpForm"
            onSubmit={(e) => {
              e.preventDefault();
              verifyOTP(otp);
            }}
          >
            <div className="input-field">
              <label>Enter OTP</label>
              <input
                type="text"
                placeholder="One time password"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                autoComplete="false"
                
              />
            </div>
            <Toaster />
            <button className="main-button" type="submit">
              Verify OTP
            </button>
          </form>
        </div>
      )}
    </div>
    </>
  );
}

export default Mobile;
