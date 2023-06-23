import React from "react";
import "./CurrentUserProfile.scss";

import AddPost from "../../../components/User/AddPost/AddPost";
import ListPost from "../../../components/User/ListPost/ListPost";
import UserPost from "../../../components/User/UserPosts/UserPosts";
import { useSelector,useDispatch } from "react-redux";
import { login } from "../../../Redux/userSlice";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { CommentsDisabledOutlined, Edit } from "@mui/icons-material";
import { BiEdit } from "react-icons/bi";
import { FcCompactCamera } from "react-icons/fc";
import { Modal, Button } from "react-bootstrap";

import SkeltonLoad from "../SkeltonLoad/SkeltonLoad";
import Loading from '../LoadingComponent/Loading'
import { baseUrl } from "../../../utils/Constants";


function CurrentUserProfile() {

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);




  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);





  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [coverPicture, setCoverPicture] = useState(null);
  const [profilePicture,setProfilePicture] = useState(null)
  const user_id = useSelector((state) => state.user?.user_id);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
// user following followers count


  useEffect(() => {
    const fetchFollowersCount = async () => {
      try {
        const response = await axios.get(`${baseUrl}posts/followers_list/${user_id}`);
        const followers = response.data.length;
        setFollowersCount(followers);
      } catch (error) {
        console.error(error);
      }
    };
  
    const fetchFollowingCount = async () => {
      try {
        const response = await axios.get(`${baseUrl}posts/following_list/${user_id}`);
        // console.log(response,'following count');
        const following = response.data.length;
        setFollowingCount(following);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchFollowersCount();
    fetchFollowingCount();
  }, [user_id]);
  





// get user by id

  useEffect(() => {
    axios
      .get(`${baseUrl}getUserById/${user_id}`)
      .then((response) => setUserDetails(response.data))
      .catch((error) => console.log(error));
  }, [user_id]);

  if (!userDetails) {
    return (   
<SkeltonLoad />
    )
  }
  // const userName=useSelector((state)=>state.user?.user)





  // cover pic Edit

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCoverPicture(file);
  };


  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };



  const handleCloseModal1 = () => {
    setShowModal1(false);
  };

  const handleShowModal1 = () => {
    setShowModal1(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (coverPicture) {
      const formData = new FormData();
      formData.append("cover_picture", coverPicture);

      try {
        setLoading(true);
        const response = await axios.post(
          `${baseUrl}changeCover/${user_id}/`,
          formData
        );
        // console.log(response.data);
        handleCloseModal();
        // Handle the response as needed
        setUserDetails((prevUserDetails) => ({
          ...prevUserDetails,
          cover_picture: response.data.cover_picture_url,
        }));
      } catch (error) {
        console.error(error);
      }
      finally {
        // Set loading back to false after the API call is completed
        setLoading(false);
      }


    }
  };

  if (loading) {
    return <Loading />;
  }


  // profilePicture
  const handleProfilePictureUpload = async () => {
    if (profilePicture) {
      const formData = new FormData();
      formData.append('profile_picture', profilePicture);
  
      try {
        setLoading(true);

        const response = await axios.post(`${baseUrl}changeProfilePic/${user_id}/`, formData);
        // console.log(response.data); 
        // Handle the response as needed
        setShowModal1(false); 
        // Close the modal after successful upload
        setUserDetails((prevUserDetails) => ({
          ...prevUserDetails,
          profile_picture: response.data.profile_picture_url,
        }));
        dispatch(
          login({
            ...user,
            profilePic:response.data.profile_picture_url,
          })
        );


      } catch (error) {
        console.error(error);
      }
      finally {
        // Set loading back to false after the API call is completed
        setLoading(false);
      }
    }
  };










// console.log(user_id,userId,'userrrrrrr');


  return (
    <>





      <div className="profile">
        <div className="images">
        
            <div className="editIcon">
              <label htmlFor="coverPictureInput">
                <BiEdit  onClick={handleShowModal} />
              </label>  
            </div>
          
          
          <img src={decodeURIComponent(userDetails?.cover_picture).replace(
            "/https:",
            "https:"
          )}
          style={{ width: "95%" }}
          alt=""
          className="cover"
          />
          {/* <div className="images">
            
            {user_id == userId &&(

<label htmlFor="profilePictureInput">
                <BiEdit  style={{ marginLeft: "13em", marginTop: "3em" }} onClick={handleShowModal1} />
              </label>

            )}
           
          </div> */}


          <img
            src={decodeURIComponent(userDetails?.profile_picture).replace(
              "/https:",
              "https://"
            )}
            alt="profile picture"
            className="profilePic"

            onClick={handleShowModal1}
          />

          
          
        </div>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Upload Cover Picture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <input
                id="coverPictureInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <Button type="submit">Upload</Button>
            </form>
          </Modal.Body>
        </Modal>

        <div className="profileContainer">
          <div className="uInfo">
            <div className="left"></div>
            <div className="center">

            <br />
              <span className="userName">
          {userDetails.username &&
          userDetails.username.charAt(0).toUpperCase() + userDetails.username.slice(1)
        }</span>
              
              <span className="useremail">{userDetails.email}</span>
              <div className="info">
                {/* <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div> */}

 <button className="primary"> Followers: {followersCount}</button>
 <button className="primary">Following: {followingCount}</button>

    </div>
                <div className="item">
                  {/* <LanguageIcon /> */}
                  {/* <span>lama.dev</span> */}
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

     {/* Profile Picture Modal */}
     <Modal show={showModal1} onHide={handleCloseModal1}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            id="profilePictureInput"
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button> */}
          <Button variant="primary" onClick={handleProfilePictureUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>


      {/* <AddPost /> */}
      {/* <UserPost  /> */}
    </>
  );
}

export default CurrentUserProfile;
