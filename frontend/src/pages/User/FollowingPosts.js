import React from "react";
import Sidebar from "../../components/User/Sidebar/Sidebar";
import "./FollowingPosts.scss";
import Navbar from "../../components/User/Navbar/Navbar";
import AddPost from "../../components/User/AddPost/AddPost"
import ListFingPost from "../../components/User/ListFingPost/ListFingPost";

import { useState } from "react";
import Rightbar from "../../components/User/Rightbar/Rightbar";
function HomePage() {


  const [viewposts, setViewposts] = useState([])
  return (
    <>
      <div className="userHome">
      <Sidebar />
      
      <div className="homeContainer">
      <Navbar />
      <AddPost />
      <ListFingPost />

      </div>
      <div className="Rightbar">     
       <Rightbar />
</div>
      </div>

    </>
  );
}
export default HomePage;
