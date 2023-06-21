import React from 'react'
import Rightbar from "../../components/User/Rightbar/Rightbar";
import Navbar from "../../components/User/Navbar/Navbar";
import Sidebar from "../../components/User/Sidebar/Sidebar";
import CurrentUserPost from '../../components/User/CurrentUser/CurrentUserPost';
import CurrentUserProfile from '../../components/User/CurrentUser/CurrentUserProfile';
import "./HomePage.scss";


function CurrentProfile() {
  return (
    <>
      <div>
<Navbar />
<div style={{ display: "flex" }}>
  <Sidebar />
  <div style={{ flex: 6 }}>
<div className="home"> 
<CurrentUserProfile />
<CurrentUserPost />
  

</div>
  </div>
  <Rightbar />
</div>
</div>

    </>
  )
}

export default CurrentProfile;