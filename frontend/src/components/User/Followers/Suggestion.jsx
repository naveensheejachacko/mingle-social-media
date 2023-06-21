
import { Margin } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import axios from "axios";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import './Suggestion.css';

import { Link } from "react-router-dom";

import SkeltonCard from '../SkeltonLoad/SkeltonCard';

import { baseUrl } from '../../../utils/Constants';

function Suggestion() {


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



    const handleRemoveUser = async (suggestionId) => {
      try {
        const response = await axios.post(`${baseUrl}posts/removeSuggestion/${user_id}/${suggestionId}/`);
        const { suggestions, removed_user } = response.data;
    
        // Update the suggestions state with the updated suggestions
        fetchUserSuggestions();    
        // Do something with the removed_user details
        // console.log('Removed User:', removed_user);
      } catch (error) {
        console.error(error);
      }
    };
    


  return (
    <>
<div className="suggestion-container">
{suggestions?.length === 0 ? (
  <>
    <SkeltonCard />
    <SkeltonCard />
    <SkeltonCard />
  </>
) : (
  <>
    {suggestions.map((user) => (
      <Card key={user.id} style={{marginTop:'20px'}} className="scard">
        <Card.Img
          style={{
            width: '250px', // Set the desired width
            height: '250px',
            borderRadius: '50%',
            position: 'relative',
          }}
          variant="top"
          src={user.profile_picture}
          className="rounded"
        />
        <CloseIcon
          className="close-icon"
          onClick={() => {
            handleRemoveUser(user.id);
          }}
          color="primary"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 1,
          }}
        />
        <Card.Body>
          <Card.Title>{user.fullname}</Card.Title>
          <div className="button-container">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                handleFollowUser(user.id);
              }}
              style={{ borderRadius: '10px' }}
            >
              Follow
            </Button>
            <Link to={`/profile/${user.id}`}>
              <Button
                variant="secondary"
                size="sm"
                style={{ borderRadius: '10px' }}
              >
                Profile
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    ))}
  </>
)}
</div>




    </>
    );
    

}

export default Suggestion