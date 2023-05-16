import React from "react";
import Sidebar from "../../components/User/Sidebar/Sidebar";
import "./HomePage.scss";
import Navbar from "../../components/User/Navbar/Navbar";
import ConnectionList from "../../components/User/Followers/ConnectionList";
import { useState } from "react";
function HomePage() {


  return (
    <>
      <div className="userHome">
      <Sidebar />
      
      <div className="homeContainer">
      <Navbar />
      <ConnectionList />

      </div>
      <div className="Rightbar">     
       {/* <Rightbar /> */}



<div />






</div>
      </div>

    </>
  );
}
export default HomePage;
