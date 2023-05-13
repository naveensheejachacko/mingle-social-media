import React from 'react'
import UserProfile from '../../components/User/UserProfile/UserProfile'
import Rightbar from "../../components/User/Rightbar/Rightbar";
import Navbar from "../../components/User/Navbar/Navbar";
import Sidebar from "../../components/User/Sidebar/Sidebar";
import AddPost from "../../components/User/AddPost/AddPost"
import UserPosts from '../../components/User/UserPosts/UserPosts';
import "./HomePage.scss";


function Profile() {
  return (
    <>
      <div className="userHome">
      <Sidebar />
      
      <div className="homeContainer">
      <Navbar />

      <UserProfile />
      {/* <AddPost /> */}
      {/* <UserPosts /> */}
      

      </div>
      <div className="Rightbar">     
       <Rightbar />
</div>
      </div>

    </>
  )
}

export default Profile;