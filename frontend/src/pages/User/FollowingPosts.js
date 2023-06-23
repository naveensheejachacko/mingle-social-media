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
<div>
<Navbar />
<div style={{ display: "flex" }}>
  <Sidebar />
  <div style={{ flex: 6 }}>
<div className="home"> 
<AddPost />
<ListFingPost />
</div>
  </div>
  <Rightbar />
</div>
</div>
    </>
  );
}
export default HomePage;
