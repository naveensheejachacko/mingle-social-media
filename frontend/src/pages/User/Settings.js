import React from 'react'
import './Settings.scss'
import Sidebar from "../../components/User/Sidebar/Sidebar";
import Navbar from "../../components/User/Navbar/Navbar";
import Rightbar from "../../components/User/Rightbar/Rightbar";

import UserSettings from '../../components/User/UserProfile/UserSettings';
function Settings() {
  return (
    <>
      <div>
<Navbar />
<div style={{ display: "flex" }}>
  <Sidebar />
  <div style={{ flex: 6 }}>
<div className="home"> 
<UserSettings />
  

</div>
  </div>
  <Rightbar />
</div>
</div>

  </>
  )
}

export default Settings