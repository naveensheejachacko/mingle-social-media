import React, { useState } from "react";
// import "./Navbar.scss";
import axios from "axios";

import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast'
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { baseUrl } from "../../../utils/Constants";
function Searches() {


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
        setQuery("")
        toast.error("Please fill the search", {
          position: "top-right"
          
        })
      }
      else {
      try {
        const response = await axios.get(`${baseUrl}profileSearch?query=${query}`);
        
        navigate('/searchResults', { state: { data: response.data } })
      } catch (error) {
        
        console.error(error);
      }
    };
  }




  return (
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
      <SearchOutlinedIcon style={{pointer:'cursor'}} onClick={handleSearchSubmit} />

      <Toaster  />
    </div>
  </div>
  )
}

export default Searches