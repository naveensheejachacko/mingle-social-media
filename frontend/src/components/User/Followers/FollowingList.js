import { Margin } from "@mui/icons-material";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./FollowingList.css";

import { Link } from "react-router-dom";

import SkeltonCard from "../SkeltonLoad/SkeltonCard";
import NoDataAvailable from "../NoDataAvailable/NoDataAvailable";
import { baseUrl } from "../../../utils/Constants";

function FollowingList() {
  const [followingList, setFollowingList] = useState([]);
  const [unfollowing, setunFollowing] = useState(false);

  const user_id = useSelector((state) => state.user?.user_id);

  useEffect(() => {
    fetchFollowingList();
  }, []);

  const fetchFollowingList = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}posts/following_list/${user_id}/`
      ); // Replace with your API endpoint URL
      setFollowingList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnFollowUser = async (unfingId) => {
    try {
      const response = await axios.post(
        `${baseUrl}posts/follow_user/${user_id}/${unfingId}/`
      );
      setunFollowing(true);
      // toast.success('success')
      fetchFollowingList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
        <div className="following-container">
    {followingList?.length === 0 ? (
      <>
        <span className='nodatapeople' style={{ backgroundColor: '#d4d4d4', width: '100%' ,borderRadius:'10px',fontWeight:'bold',fontSize:'40px'}} variant="h6" align="center">
              Please Follow People 
            </span>
        <SkeltonCard />
        <SkeltonCard />
      </>
    ) : (
<>
        {followingList.map((user) => (
          <Card key={user.id} style={{marginTop:'20px'}} className="fcard">
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
            <Card.Body>
              <Card.Title>{user.fullname}</Card.Title>
              <div className="button-container">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    handleUnFollowUser(user.id);
                  }}
                  style={{ borderRadius: '10px' }}
                  >
                  Unfollow
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

export default FollowingList;
