import React,{useEffect, useState} from 'react'
import Rightbar from "../../components/User/Rightbar/Rightbar";
import Navbar from "../../components/User/Navbar/Navbar";
import Sidebar from "../../components/User/Sidebar/Sidebar";
import SearchData from '../../components/User/Search/SearchData';
import NoDataAvailable from '../../components/User/NoDataAvailable/NoDataAvailable';

import { useLocation } from 'react-router-dom';

function SearchResult() {


    const location=useLocation();
    const userData=location?.state?.data;
    const [users,setUsers]=useState([])

    useEffect(()=>{
        setUsers(userData)
      },[userData])





    

  return (
    <>
    <div className="userHome">
    <Sidebar />
    
    <div className="homeContainer">
    <Navbar />


    {
      userData?.length===0 ? <NoDataAvailable data={"users"}/>
      :
       <SearchData users={users}/>
    }


    </div>
    <div className="Rightbar">     
    <Rightbar />
    </div>
    </div>
  </>
  )
}
export default SearchResult