import React from 'react';
import './AddPost.scss';
import { PermMedia, Label } from "@mui/icons-material";
// import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Cookies from 'js-cookie';
import { ADD_POST } from "../../../utils/Constants";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from '../../../utils/axios';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import MovieIcon from '@mui/icons-material/Movie';

import { baseUrl } from '../../../utils/Constants';
import Loading from '../LoadingComponent/Loading'
import { setHomePosts } from '../../../Redux/userSlice';


function AddPost() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const [loading, setLoading] = useState(false);


  const user_id = useSelector((state) => state.user?.user_id);
  const userName = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  const homePosts = useSelector((state) => state?.post?.posts);
  const profilePic = useSelector((state) => state.user?.profilePic);

  const PostAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('video', videoFile);
    formData.append('content', content);
    const token = Cookies.get('jwt_user');
    if (content === '') {
      console.log('empty string');
      return toast.error("Can't add an empty post!!");
    } else {
      try {

        setLoading(true);
        const response = await axios.post(`${baseUrl}posts/addposts/${user_id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          toast.success('Post Added successfully');
          setContent('');
          setFile(null);
          setVideoFile(null);
          dispatch(setHomePosts(response.data.data))
        } else if (response.status === 400) {
          toast.error('Error 400');
          navigate('/');
        } else {
          toast.error('Failed to add post');
          navigate('/');
        }
      } catch (error) {
        console.log('Error', error);
      }
      finally {
        // Set loading back to false after the API call is completed
        setLoading(false);
      }
    }
  };

  const setImage = (e) => {
    setFile(e.target.files[0]);
  };


  const setVideo = (e) => {
    setVideoFile(e.target.files[0]);

  };



  if (loading) {
    return <Loading />;
  }



  return (
    <div className='share'>
      <div className="shareWrapper">
        <form encType="multipart/form-data" onSubmit={PostAdd}>
          <div className="shareTop">
            <img src={profilePic} className="shareProfileImg" alt="Profile Picture" />
            <input
              value={content}
              placeholder="What's on your mind ?"
              onChange={(e) => { setContent(e.target.value) }}
              className='shareInput'
            />




            <Toaster
              position="top-center"
              reverseOrder={false}
            />
          </div>
          <hr className='shareHr' />
          <div className="shareBottom">
            <div className="shareOptions">
              <input
                accept=".jpg, .jpeg, .png"
                onChange={(e) => {
                  setImage(e);
                }}
                type="file"
                id="post"
                name="post"
                style={{ display: "none" }}
              />
              <label htmlFor="post">
                <div className="posItem">
                  <span style={{ color: 'black', cursor: 'pointer' }}><AddAPhotoIcon /></span>
                  {/* <label>add image</label> */}
                </div>
              </label>
              <input
  accept=".mp4, .mov, .avi"
  onChange={(e) => {
    setVideo(e);
  }}
  type="file"
  id="postVideo"
  name="postVideo"
  style={{ display: "none" }}
/>
<label htmlFor="postVideo">
  <div className="posItem">
    <span style={{ color: 'black', cursor: 'pointer' }}><MovieIcon /></span>
  </div>
</label>
            </div>
            <button className='shareButton'>Share</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
