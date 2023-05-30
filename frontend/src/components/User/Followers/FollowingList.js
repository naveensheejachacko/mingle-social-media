
import { Margin } from '@mui/icons-material';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import axios from "axios";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import './FollowingList.scss';

import { Link } from "react-router-dom";



function FollowingList() {

    const [followingList, setFollowingList] = useState([]);
    const [unfollowing, setunFollowing] = useState(false);

    const user_id = useSelector((state) => state.user?.user_id);

    useEffect(() => {
      fetchFollowingList();
    }, []);
  
    const fetchFollowingList = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/posts/following_list/${user_id}/`); // Replace with your API endpoint URL
        setFollowingList(response.data);
      } catch (error) {
        console.error(error);
      }
    };



    const handleUnFollowUser = async (unfingId) => {
      try {
        const response = await axios.post(`http://127.0.0.1:8000/posts/follow_user/${user_id}/${unfingId}/`);
        setunFollowing(true);
        // toast.success('success')
        fetchFollowingList();

      } catch (error) {
        console.error(error);
      }
      
    };







  return (
    <div className="card-container">
      {followingList.map((user) => (
        <Card key={user.id} className="card">
          <Card.Img style={{ borderRadius: "50%" }} variant="top"  src={user.profile_picture} className="rounded"/>
          <Card.Body>
            <Card.Title> {user.fullname}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
            <div className="button-container">
              <Button variant="danger" size='sm' onClick={() => { handleUnFollowUser(user.id) }} style={{ borderRadius: '10px' }}>unfollow</Button>
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

export default FollowingList;