import React from 'react'
import "./Rightbar.scss";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";

const SuggestionBar = () => {
  const user_id = useSelector((state) => state.user?.user_id);

    const [suggestions, setSuggestions] = useState([]);
  
    const [following, setFollowing] = useState(false);



      const fetchUserSuggestions = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/posts/user_suggestions/${user_id}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
      
          });
          setSuggestions(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      useEffect(()=>{
        fetchUserSuggestions();
      },[])
  




    const handleFollowUser = async (fingId) => {
      try {
        const response = await axios.post(`http://127.0.0.1:8000/posts/follow_user/${user_id}/${fingId}/`);
        setFollowing(true);
        fetchUserSuggestions();
      } catch (error) {
        console.error(error);
      }
      
    };




  return (
    <>
        <div className="item">
            
          <span>Suggestions For You</span>
          {suggestions.map((user) => (
<div className="suggestionBar">


          <div className="user">
            <div key={user.id} className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <span >{user.fullname}</span>
            </div>
            <div className="buttons">
            <Button className="button" variant="primary" onClick={()=>{{handleFollowUser(user.id)}}}  style={{borderRadius:'10px'}}>Follow</Button>

              {/* <button>follow</button> */}
              {/* <button>dismiss</button> */}
            </div>
          </div>



          </div>
          ))}
        </div>
        </>
  )}
  export default SuggestionBar;
