import React from 'react'
import "./Suggestionbar.scss";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import toast,{Toaster} from 'react-hot-toast'
import { Link } from "react-router-dom";
import { baseUrl } from '../../../utils/Constants';


const SuggestionBar = () => {
  const user_id = useSelector((state) => state.user?.user_id);

    const [suggestions, setSuggestions] = useState([]);
  
    const [following, setFollowing] = useState(false);



      const fetchUserSuggestions = async () => {
        try {
          const response = await axios.get(`${baseUrl}posts/user_suggestions/${user_id}/`, {
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
        const response = await axios.post(`${baseUrl}posts/follow_user/${user_id}/${fingId}/`);
        setFollowing(true);
        // toast.success('success')
        fetchUserSuggestions();

      } catch (error) {
        console.error(error);
      }
      
    };




  return (

<>
{suggestions.length==0 ?"":(



    <div className='suggestionContainer1'>

          <div className="item">

<>
          <span style={{fontWeight:'bold'}}>Suggestions For You</span>
          {suggestions.map((user) => (
<div className="suggestionBar">


          <div className="user">
            <div key={user.id} className="userInfo">
              <img
                src={user.profile_picture}
                alt=""
              />

<Link to={`/profile/${user.id}`}> 
              <span >{user.fullname}</span>
              </Link>
            </div>
            <div className="buttons">
              
            <Button className="button" variant="primary" onClick={()=>{{handleFollowUser(user.id)}}}  style={{borderRadius:'10px'}}>Follow</Button>
            {/* <Toaster /> */}
              {/* <button>follow</button> */}
              {/* <button>dismiss</button> */}
            </div>
          </div>



          </div>
          ))}
          </>

        </div>
        </div>
        )}
        </>
  )}
  export default SuggestionBar;
