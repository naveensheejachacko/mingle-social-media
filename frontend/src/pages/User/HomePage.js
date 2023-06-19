import React from "react";
import Sidebar from "../../components/User/Sidebar/Sidebar";
import "./HomePage.scss";
import Navbar from "../../components/User/Navbar/Navbar";
import AddPost from "../../components/User/AddPost/AddPost"
// import ListPost from "../../components/User/ListPost/ListPost";
import Posts from "../../pages/Posts/Posts"
import { useState } from "react";
import Rightbar from "../../components/User/Rightbar/Rightbar";
function HomePage() {


  const [viewposts, setViewposts] = useState([])
  return (
    <>
{/* //       <div className="userHome">
//       <Sidebar />
      
//       <div className="homeContainer">
//       <Navbar />
//       <AddPost />
//       <Posts />

//       </div>
//       <div className="Rightbar">     
//        <Rightbar />
// </div>
//       </div> */}


<div>
<Navbar />
<div style={{ display: "flex" }}>
  <Sidebar />
  <div style={{ flex: 6 }}>
<div className="home"> 
<AddPost />
<Posts />
  

</div>
  </div>
  <Rightbar />
</div>
</div>
    </>
  );
}
export default HomePage;
