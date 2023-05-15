import React from 'react'
import './UserProfile.scss'

import AddPost from "../../../components/User/AddPost/AddPost"
import ListPost from "../../../components/User/ListPost/ListPost";
import UserPost from '../../../components/User/UserPosts/UserPosts';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';


function UserProfile() {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);


  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/getUserById/${userId}`)
      .then(response => setUserDetails(response.data))
      .catch(error => console.log(error));
  }, [userId]);


  if (!userDetails) {
    return <div>Loading...</div>;
  }
    // const userName=useSelector((state)=>state.user?.user)

  return (
    <>
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img
          src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            {/* <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a> */}
          </div>
          <div className="center">
            <span className='userName'>{userDetails.username}</span>
            <br />
            <span  className="useremail" >{userDetails.email}</span>
            <div className="info">
              {/* <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div> */}
              <div className="item">
                {/* <LanguageIcon /> */}
                {/* <span>lama.dev</span> */}
              </div>
            </div>
            {/* <button>follow</button> */}
          </div>
          <div className="right">
            {/* <EmailOutlinedIcon /> */}
            {/* <MoreVertIcon /> */}
          </div>
        </div>

      </div>
    </div>
    {/* <AddPost /> */}
      <UserPost  />

    </>
  )
}

export default UserProfile;