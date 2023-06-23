import React, { useState,useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { login } from "../../../Redux/userSlice";
import toast,{Toaster} from 'react-hot-toast'
import './UpdateDetails.css'
import { baseUrl } from "../../../utils/Constants";

function UpdateDetails() {

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


  const user_id = useSelector((state) => state.user?.user_id);
  const userEmail = useSelector((state) => state.user.email);
  const user = useSelector((state) => state.user);


  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();





  if (
    fullname.length === 0 ||
    phone_number.length === 0   ||
    phone_number.length<10||
    gender.length===0 ||
    email.length==0
    
  ) {
    toast.error("All Fields Required")
  } else {
    const data = {
      fullname,
      email,
      phone_number,
      gender,
    };
    axios
      .post(`${baseUrl}updateUserDetails/${user_id}/`, data)
      .then((response) => {
        // console.log(response,'userrrrrr redirect')
        dispatch(
          login({
            ...user,
            user: response.data.fullname,
            email: response.data.email,
          })
        );

        toast.success('Details Updated');
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error occurred while updating details",
          showConfirmButton: false,
          timer: 1500,
        });
      });

     
  }
};

const handleNameChange = (e) => {
  setFullName(e.target.value);
  if (!/^[A-Za-z, ]{3,}$/.test(e.target.value)) {
    setFullNameError("Atleast 3 letters");
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

// const handlePasswordChange = (e) => {
//   setPassword(e.target.value);
//   if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(e.target.value)) {
//     setPasswordError("Password length must contains 5 letters and 1 number ");
//   } else {
//     setPasswordError("");
//   }
// };

const handleGenderChange = (e) => {
  setGender(e.target.value);
  if (!e.target.value) {
    setGenderError("Gender field cannot be empty");
  } else {
    setGenderError("");
  }
};



useEffect(() => {
  // Fetch user details from the backend API
  axios
    .get(`${baseUrl}getUserById/${user_id}/`)
    .then((response) => {
      
      const userDetails = response.data;
      setFullName(userDetails.username);
      setEmail(userDetails.email);
      setPhone_number(userDetails.phoneNumber);
      setGender(userDetails.gender);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);






  return (
<>
<main className="col-md-12 mt-5">
        <article className="card2 custom-card-width "  >
          <header className="card-header">
            <strong className="d-inline-block mr-3">Update Account</strong>
          </header>
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <Toaster />
                    <input
                      type="text"
                      value={fullname}
                      onChange={handleNameChange}
                      placeholder="Enter Your FullName"
                      className="form-control"
                      style={{ width: '250px' }}
                    />
                    <span className="text-danger">{fullnameError}</span>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter Email"
                      className="form-control"
                      value={email}
                      onChange={handleEmailChange}
                      style={{ width: '250px' }}
                    />
                    <span className="text-danger">{emailError}</span>
                  </div>
                  <div className="form-group">
                    <label>Mobile</label>
                    <input
                      type="number"
                      name="phone"
                      value={phone_number}
                      style={{ width: '250px' }}
                      onChange={handlePhoneNumberChange}
                      className="form-control"
                    />
                    <span className="text-danger">{phone_numberError}</span>
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      className="genderField form-select"
                      value={gender}
                      style={{ width: '250px' }}
                      onChange={handleGenderChange}
                      aria-label="Default select example"
                    >
                      <option value="" disabled>Gender</option>
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
                  </div>
                  <input
                    type="submit"
                    value="Update Details"
                    className="btn btn-primary col-12 mt-5"
                  />
                </form>
              </div>
            </div>
          </div>
        </article>
      </main>

</>
  )
}

export default UpdateDetails