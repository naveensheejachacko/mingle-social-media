
import { Margin } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import axios from "axios";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import './Suggestion.scss';

import { Link } from "react-router-dom";

import SkeltonCard from '../SkeltonLoad/SkeltonCard';



function Suggestion() {


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
        // toast.success('success')
        fetchUserSuggestions();

      } catch (error) {
        console.error(error);
      }
      
    };



    const handleRemoveUser = async (suggestionId) => {
      try {
        const response = await axios.post(`http://127.0.0.1:8000/posts/removeSuggestion/${user_id}/${suggestionId}/`);
        const { suggestions, removed_user } = response.data;
    
        // Update the suggestions state with the updated suggestions
        fetchUserSuggestions();    
        // Do something with the removed_user details
        console.log('Removed User:', removed_user);
      } catch (error) {
        console.error(error);
      }
    };
    


  return (
    <>
  {
    suggestions?.length===0 ?
    <>
    
    <SkeltonCard />
    <SkeltonCard />
    <SkeltonCard />
</>:

    <div className="card-container">
      {suggestions.map((user) => (
        <Card key={user.id} className="card">
          <CloseIcon  className="close-icon"  onClick={() => { handleRemoveUser(user.id) }}
          color="primary"/>
          <Card.Img 
          style={{ width: "250px",height:"250px",borderRadius: "50%" }}
          variant="top"  src={user.profile_picture} className="rounded"/>
          
          <Card.Body>
            <Card.Title>{user.fullname}</Card.Title>
            <Card.Text>
            </Card.Text>
            <div className="button-container">
              <Button variant="primary" size='sm' onClick={() => { handleFollowUser(user.id) }} style={{ borderRadius: '10px' }}>Follow</Button>
              <Link to={`/profile/${user.id}`}>            
              <Button variant="light" size='sm' style={{ borderRadius: '10px', margin: '5px' }}>View Profile</Button>{' '}
              </Link>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
}
    </>
    );
    

}

export default Suggestion