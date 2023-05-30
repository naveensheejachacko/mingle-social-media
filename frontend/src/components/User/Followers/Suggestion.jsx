
import { Margin } from '@mui/icons-material';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import axios from "axios";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import './Suggestion.scss';

import { Link } from "react-router-dom";



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







  return (
    <div className="card-container">
      {suggestions.map((user) => (
        <Card key={user.id} className="card">
          <Card.Img style={{ borderRadius: "50%" }} variant="top"  src={user.profile_picture} className="rounded"/>
          <Card.Body>
            <Card.Title>{user.fullname}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
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
    );
    

}

export default Suggestion