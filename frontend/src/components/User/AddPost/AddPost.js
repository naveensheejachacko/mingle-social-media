import React from 'react'
import './AddPost.scss'
import {PermMedia, Label} from "@mui/icons-material"
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { ADD_POST } from "../../../utils/Constants"; 
import {useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPosts } from '../../../Redux/userSlice';


import axios from '../../../utils/axios';
function AddPost() {
  const navigate=useNavigate();
  const [content, setContent] = useState('')
  const [file, setFile] = useState(null)

  const user_id=useSelector((state)=>state.user?.user?.user_id)
  const userName=useSelector((state)=>state.user?.user?.user)
  
  
  const generateError = (err) =>
    toast.error(err, {
      position: 'bottom-right',
    })

    let PostAdd = async (e) => {


      e.preventDefault()
      const formData = new FormData();
      formData.append('image', file)
      formData.append('content', content)
      const token=Cookies.get('jwt_user')
      if (content === '') {
        toast.error(`Cannot add an empty post`,{theme:"dark"},{position:'top-right'})
      } else {
  
        let response = await fetch(`http://127.0.0.1:8000/posts/addposts/${user_id}`, {
          method: 'POST',
          body: formData,
          headers:{Authorization:`Bearer ${token}` } })

        let data = await response.json()
        if (response.status === 200){
          console.log(data)
          toast.success('successfully added post')
        }
        else if(response.status === 400) {
          generateError("an error occured")
          navigate('/')
        } else {
          generateError('failed to add post')
          navigate('/')
        }
      }
      setContent('');
      setImage('');
    }
    const setImage = (e) => {
      setFile(e.target.files[0])
    }
  





  // const user_id=useSelector((state)=>state.user?.user?.user_id)
  // const userName=useSelector((state)=>state.user?.user?.user)

  
  // console.log(user_id);
  // // const [open, setOpen] = useState(false);
  // const [post,setPost]=useState("")

  // const [images,setImage]=useState("");
  // const [isImage,setIsImage]=useState(false);
  // // const [content,setContent]=useState("")


  // const dispatch=useDispatch();
  // const handleChange=(e)=>{
  //   setImage(e.target.files[0])
  //   setIsImage(images.name)
  // }

  // const handleSubmit = async(e)=>{
  //   try{
  //     if(post.trim()===""){
  //       return toast.error("Please fill the component")
  //     }
      
  //     // setLoading(true)
  //   const formData=new FormData();
  //   formData.append("user_id",user_id);
  //   formData.append("content",post);
  //   formData.append("userName",userName)
  //   if(images){
  //     console.log(images,"iamge")
  //     formData.append('image',images)
  //   }
  //   const token=Cookies.get('jwt_user')
  //   // console.log(token)

  //   const response=await fetch(`http://127.0.0.1:8000/posts/addposts/${user_id}`,{
  //   method: 'POST',
  //   body: formData,
  //   headers: {'Authorization':`Bearer ${token}` } });
  //   if(response.data.success){
  //     // setLoading(false);
  //     dispatch(setPosts(response.data.posts));
  //     setIsImage("")

  //     // setOpen(false)

  //   }else{
  //     setIsImage("")
  //     setPost("")
  //     // setLoading(false);
  //     toast.error("oops something went wrong")
  //   }
  //   }catch(err){
  //     toast.error("oops something went wrong")
  //   }
  // }




  return (
    

    <div className='share'>
    <div className="shareWrapper">
    <form encType="multipart/form-data" onSubmit={PostAdd}>
      <div className="shareTop">
          <img className='shareProfileImg' src="assets/person/1.jpeg" alt="" />
          <input value={content} placeholder={`What's on your mind ${userName}?`} 
          onChange={(e) => { setContent(e.target.value) }}
          className='shareInput'/>
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
          <button  className='shareButton'>Share</button>
      </div>
      </form>
    </div>
  </div>



  )
}

export default AddPost