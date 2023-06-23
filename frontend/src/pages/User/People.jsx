import React from "react";
import Sidebar from "../../components/User/Sidebar/Sidebar";
// import "./HomePage.scss";
import Navbar from "../../components/User/Navbar/Navbar";
import ConnectionList from "../../components/User/Followers/ConnectionList";
import { useState } from "react";
function HomePage() {


  return (
    <>
<div >
<Navbar />
<div style={{ display: "flex" }}>
  <Sidebar />
  <div style={{ flex: 6 }}>
  <div className="homePeople"> 
  <ConnectionList />
</div>
  </div>
</div>
</div>

    </>
  );
}
export default HomePage;
