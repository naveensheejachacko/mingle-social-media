import React from 'react'
import './Settings.scss'
import Sidebar from "../../components/User/Sidebar/Sidebar";
import Navbar from "../../components/User/Navbar/Navbar";
import Rightbar from "../../components/User/Rightbar/Rightbar";

import ChangePasswordForm from '../../components/User/UserProfile/ChangePassword';
import UpdateDetails from '../../components/User/UserProfile/UpdateDetails';
function Settings() {
  return (
    <>
    <div className="userSettings">
    <Sidebar />
    
    <div className="settingsContainer">
    <Navbar />
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <ChangePasswordForm />
        </div>
        <div className="col-md-6">
          <UpdateDetails />
        </div>
      </div>
    </div>



    </div>
    <div className="Rightbar">     
     <Rightbar />
</div>
    </div>

  </>
  )
}

export default Settings