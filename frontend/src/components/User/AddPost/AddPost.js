import React from 'react'
import './AddPost.scss'
import {PermMedia, Label} from "@mui/icons-material"
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

// import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { ADD_POST } from "../../../utils/Constants"; 
import {useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import toast,{Toaster} from 'react-hot-toast'
import { setHomePosts} from '../../../Redux/userSlice';




import axios from '../../../utils/axios';
function AddPost() {
  const navigate=useNavigate();
  const [content, setContent] = useState('')
  const [file, setFile] = useState(null)

  const user_id=useSelector((state)=>state.user?.user_id)
  const userName=useSelector((state)=>state.user?.user)
  

  const dispatch=useDispatch();

    let PostAdd = async (e) => {


      e.preventDefault()
      const formData = new FormData();
      formData.append('image', file)
      formData.append('content', content)
      const token=Cookies.get('jwt_user')
      if (content === '') {
        console.log("empty string");
        return toast.error("Cant add an empty post!!")
      } else {
  
        let response = await fetch(`http://127.0.0.1:8000/posts/addposts/${user_id}`, {
          method: 'POST',
          body: formData,
          headers:{Authorization:`Bearer ${token}` } })

        let data = await response.json()
        if (response.status === 200){
          // console.log(data)


          dispatch(setHomePosts(data.posts))
          console.log("home")


          toast.success("Post Added successfully")
          setContent('');
          setFile(null);
        }
        else if(response.status === 400) {
          toast.error("Error 400")
          navigate('/')
        } else {
          toast.error("Failed to add post")

          navigate('/')
        }
      }
      setContent('');
      setFile(null);
    }
    const setImage = (e) => {
      setFile(e.target.files[0])
    }






  return (
    

    <div className='share'>
    <div className="shareWrapper">
    <form encType="multipart/form-data" onSubmit={PostAdd}>
      <div className="shareTop">
          <img className='shareProfileImg' src="assets/person/1.jpeg" alt="" />
          <input value={content} placeholder={`What's on your mind ${userName}?`} 
          onChange={(e) => { setContent(e.target.value) }}
          className='shareInput'/>
          <Toaster
            position="top-right"
            reverseOrder={false} />
      </div>
      <hr className='shareHr'/>
      <div className="shareBottom">
          <div className="shareOptions">
          {/* <div className="shareOption">
                    <PermMedia htmlColor="tomato" id="post" className="shareIcon" onChange={(e) => {setImage(e)}}   />
                    <span className="shareOptionText">Photo or Video</span>
                </div> */}

<input accept=".jpg, .jpeg, .png" onChange={(e) => {
                setImage(e)
              }} type="file" id="post" name="post" style={{ display: "none" }} />
              <label htmlFor="post">

                <div className="item">
                  <img src="" alt="" />
                  <span style={{ color: 'black' }}><AddPhotoAlternateOutlinedIcon /></span>
                  <label>add image</label>
                </div>
              </label>


          </div>
          <button   className='shareButton'>Share</button>
      </div>
      </form>
    </div>
  </div>



  )
}

export default AddPost