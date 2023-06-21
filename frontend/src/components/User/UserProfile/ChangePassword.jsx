import React, { useState } from "react";
import axios from "axios";
import toast,{Toaster} from 'react-hot-toast'
import { useSelector } from 'react-redux';
import './ChangePassword.css'
import { baseUrl } from "../../../utils/Constants";


const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const user_id=useSelector((state)=>state.user?.user_id)


  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    if (
      newPassword.length === 0 ||
      confirmPassword.length ===0
    ){
      toast.error('password cant be Null');
      return;
    }
    if (newPassword !== confirmPassword) {
        toast.error('Passwords do not match');

      setMessage("Passwords do not match");
      return;
    }
else{
    // Send the form data to the backend API endpoint
    axios
      .post(`${baseUrl}updatePassword/${user_id}/`, {
        current_password: currentPassword,
        new_password: newPassword,
      })
      .then((response) => {
        
        if (response.data.status === "success") {
            setMessage(response.data.status);
            toast.success('Password updated');
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
          } else {
            setMessage("Invalid current password");
            toast.error('Incorrect current password ');
          }

      })
      .catch((response) => {
        setMessage(response.data.error);
        toast.error('error');

      });
  };
  }
  
    return (



      <main className="col-md-12 mt-5">
      <article className="card1 custom-card-width">
        <header className="card-header">
          <strong className="d-inline-block mr-6">Change Your Password</strong>
        </header>
        <div className="card-body">
          <div className="row">
            <div  className="col-md-12 d-flex justify-content-center">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Current Password</label>
                  <Toaster />
                  <input
                    type="password"
                    name="current_password"
                    placeholder="Current Password"
                    className="form-control"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    style={{ width: '250px' }}
                  />
                </div>
                <div className="form-group">
                  <label>Create New Password</label>
                  <input
                    type="password"
                    name="new_password"
                    placeholder="Create New Password"
                    className="form-control"
                    value={newPassword}
                    style={{ width: '250px' }}
                    onChange={(e) => setNewPassword(e.target.value)}

                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm Your Password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ width: '250px' }}
                  />
                </div>
                <input
                  type="submit"
                  value="Save Changes"
                  className="btn btn-primary col-12 mt-3 "
                  style={{ width: '150px' }}
                />
              </form>
            </div>
          </div>
        </div>
      </article>
    </main>
    );
  };
  
  export default ChangePasswordForm;
  