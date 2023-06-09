import React, { useState } from "react";
import "./Navbar.scss";
import axios from "axios";

import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

function Navbar() {
  // const userName=useSelector((state)=>state.user?.user?.user);

  const [query, setQuery] = useState("");
  // const [results, setResults] = useState([]);
  const [searchError, setSearchErr] = useState(true)
  const navigate = useNavigate()


  const handleSearchChange = (e) => {
    if (e.target.value.trim() === "") {
      setSearchErr(true)
    } else {
      setSearchErr(false)
    }
    setQuery(e.target.value)
  }


  const handleSearchSubmit = async (e) => {
    if (searchError) {
      toast.error("Please fill the search", {
        position: "top-right"
      })
    }
    else {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/profileSearch?query=${query}`);
      setQuery("")
      navigate('/searchResults', { state: { data: response.data } })
    } catch (error) {
      console.error(error);
    }
  };
}

  return (
    // <div className="userNavbar">
    // <div className="wrapper">
    <>
      <div className="main">
        {/* <!-- Another variation with a button --> */}
        <div className="input-group">
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              className="form-control"
              placeholder="Search on mingle"
            />{" "}
          <SearchOutlinedIcon onClick={handleSearchSubmit} />

          
        </div>
      </div>

      <div className="right">
        <div className="user">
          {/* 
        {userName && <p>Welcome, {userName}!</p>} */}
        </div>
      </div>
    </>
    //   </div>

    // </div>
  );
}

export default Navbar;
