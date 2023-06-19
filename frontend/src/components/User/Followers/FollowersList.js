import { Margin } from "@mui/icons-material";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./FollowingList.css";

import { Link } from "react-router-dom";
import NoDataAvailable from "../NoDataAvailable/NoDataAvailable";
import SkeltonCard from "../SkeltonLoad/SkeltonCard";

function FollowersList() {
  const user_id = useSelector((state) => state.user?.user_id);
  const [followersList, setFollowersList] = useState([]);

  const handleFollowUser = async (fingId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/posts/follow_user/${user_id}/${fingId}/`
      );
      console.log(response);
      // Refresh the followers list
      fetchFollowersList();
    } catch (error) {
      console.error(error);
    }
  };
  const handleUnFollowUser = async (fingId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/posts/follow_user/${user_id}/${fingId}/`
      );
      console.log(response);
      // Refresh the followers list
      fetchFollowersList();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFollowersList = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/posts/followers_list/${user_id}/`
      );
      setFollowersList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFollowersList();
  }, []);

  return (
    <>
    
<div className="following-container">

      {followersList?.length === 0 ? (
        <>
          <NoDataAvailable data={"Followers"} />
          <SkeltonCard />
          <SkeltonCard />
          {/* <SkeltonCard /> */}
        </>
      ) : (

        <>

          {followersList.map((user) => (
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
                <Card.Title> {user.fullname}</Card.Title>
                
                <div className="button-container">
                  {/* <Button variant="danger" size='sm' onClick={() => { handleUnFollowUser(user.id) }} style={{ borderRadius: '10px' }}>unfollow</Button> */}

                  {/* <Button

variant={user.following ? "danger" : "primary"}
size="sm"
onClick={() => handleFollowUser(user.id)}
style={{ borderRadius: '10px' }}
>
{following ? "Unfollow" : "Follow"}
</Button> */}

                  {user.following ? (
                    <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleUnFollowUser(user.id)}
                    style={{ borderRadius: "10px" }}
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleFollowUser(user.id)}
                    style={{ borderRadius: "10px" }}
                    >
                      Follow
                    </Button>
                  )}

                  <Link to={`/profile/${user.id}`}>
                    <Button
                variant="secondary"
                size="sm"
                style={{ borderRadius: "10px" }}
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

export default FollowersList;
