import React from "react";
import Sidebar from "../../components/User/Sidebar/Sidebar";
import "./HomePage.scss";
import Navbar from "../../components/User/Navbar/Navbar";
import AddPost from "../../components/User/AddPost/AddPost"
// import ListPost from "../../components/User/ListPost/ListPost";
import Posts from "../../pages/Posts/Posts"
function HomePage() {
  return (
    <>
      <div className="userHome">
      <Sidebar />
      
      <div className="homeContainer">
      <Navbar />
      <AddPost />
      <Posts />

      



      
      </div>
      </div>

    </>
  );
}
export default HomePage;
