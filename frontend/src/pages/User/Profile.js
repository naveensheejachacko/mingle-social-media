import React from 'react'
import UserProfile from '../../components/User/UserProfile/UserProfile'
import Rightbar from "../../components/User/Rightbar/Rightbar";
import Navbar from "../../components/User/Navbar/Navbar";
import Sidebar from "../../components/User/Sidebar/Sidebar";
import AddPost from "../../components/User/AddPost/AddPost"
import UserPost from "../../components/User/UserPosts/UserPosts";

import "./HomePage.scss";


function Profile() {
  return (
    <>
      <div>
<Navbar />
<div style={{ display: "flex" }}>
  <Sidebar />
  <div style={{ flex: 6 }}>
<div className="home"> 
<UserProfile />
<UserPost />
  

</div>
  </div>
  <Rightbar />
</div>
</div>

    </>
  )
}

export default Profile;