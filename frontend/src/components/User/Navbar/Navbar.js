import React from 'react'
import './Navbar.scss'




import { useSelector } from 'react-redux';


function Navbar() {
  // const userName=useSelector((state)=>state.user?.user?.user);


  
  return (
    <div className="userNavbar">
    <div className="wrapper">

<div className="main">
  

  
  {/* <!-- Another variation with a button --> */}
  <div className="input-group">
    <input type="text" className="form-control" placeholder="Search on mingle" />      <button className="btn btn-secondary" type="button">
        <i className="fa fa-search"></i>
      </button>
    {/* <div class="input-group-append">

    </div> */}
  </div>
  
  
  
</div>


        <div className="right">
        <div className="user">
{/* 
        {userName && <p>Welcome, {userName}!</p>} */}

        </div>

        </div>
      </div>
    </div>

  )
}

export default Navbar