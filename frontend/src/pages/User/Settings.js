import React from 'react'
import './Settings.scss'
import Sidebar from "../../components/User/Sidebar/Sidebar";
import Navbar from "../../components/User/Navbar/Navbar";
import Rightbar from "../../components/User/Rightbar/Rightbar";

import UserSettings from '../../components/User/UserProfile/UserSettings';
function Settings() {
  return (
    <>
    <div className="userSettings">
    <Sidebar />
    
    <div className="settingsContainer">
    <Navbar />
    <div className="container">
      <div className="row">
        <div className="col-md-10">
<UserSettings />
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