import "./ListPost.scss";
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";


// import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';

import { AiOutlineComment } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { MdReportGmailerrorred } from "react-icons/md";

// import {Users,Posts} from "../../../dummyData";
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { setExplorePosts } from "../../../Redux/userSlice";
import moment from "moment";
import Cookies from 'js-cookie';


import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

import axios from "axios";
// import { fetchPosts } from "../../../Redux/postSlice";

import { Link } from "react-router-dom";
import ReportPostModal from "../Modal/ReportPostModal";

// import { fetchPosts } from "../../../Redux/postSlice";

import SkeltonLoad from '../SkeltonLoad/SkeltonLoad'
import { baseUrl } from "../../../utils/Constants";

export default function ListPost() {
  // console.log(post,'postttttttt')
  const dispatch = useDispatch()

  const user_id = useSelector((state) => state.user?.user_id);

  // console.log(useSelector((state)=>state.user?.user_id),'lllllllllll')
  const userName = useSelector((state) => state.user?.user?.user);
  const profilePic = useSelector((state) => state.user?.profilePic);
  const explorePosts = useSelector((state) => state?.user?.explorePosts);

  const token = Cookies.get('jwt_user');

  // const [anchorEl, setAnchorEl] = useState(null);

  // const [commentwriting, setcommentwriting] = useState("");

  const [commentBoxOpen, setCommentBoxOpen] = useState({});

  const [liked, setLiked] = useState(false);

  let likebutton = async (id) => {
    let response = await fetch(
      `${baseUrl}posts/isliked/${user_id}/`,
      {
        method: "POST",
        headers: {
           "Authorization": `Bearer ${token}` ,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );
    let data = await response.json();
    if (response.status === 200) {
      if (liked) {
        setLiked(false);
      } else {
        setLiked(true);
      }
      // post();
    } else {
      alert("Something went wrong!!");
    }
  };

  // comment functionalty

  const handleCommentClick = (postId) => {
    setCommentBoxOpen((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const [values, setValues] = useState("");
  const [postcomment, setPostcomment] = useState([]);
  // addComments
  let hangleChange = (e) => {
    setValues({
      ...values,
      comment: e.target.value,
    });
  };
  let addComment = async (postId) => {
    if (!values.comment) {
      // console.log("empty string");
      return toast.error("Can't add an empty post!!");
    } else {
      let response = await fetch(
        `${baseUrl}posts/addcomments/${user_id}/${postId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ values }),
        }
      );
      let data = await response.json();

      if (response.status === 200) {
        // alert('success')
        toast.success("comment added");
        setValues({ ...values, comment: "" });
      } else {
        alert("failed");
      }
      // post();
    }
  };
  // gettingcommetns for posts
  let getComments = async (postId) => {
    // console.log(postId, "post id from getdata");

    let response = await fetch(
      `${baseUrl}posts/getcomments/${postId}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await response.json();

    if (response.status === 200) {
      setPostcomment(data);
    } else {
      alert("Something went wrong!!");
    }
    // post();
  };
  // delete comment
  let deleteComment = async (id) => {
    let response = await fetch(
      `${baseUrl}posts/deletecomment/${id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await response.json();

    if (response.status === 200) {
      // console.log(data,'get comments')
      toast.success("comment deleted");
    } else {
      alert("Something went wrong!!");
    }
    // post();
  };

  useEffect(() => {
    getComments();
  }, [postcomment]);





  // const [loading, setLoading] = useState(false);


  const fetchPosts = async () => {
    // setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}posts/getPosts/${user_id}`
      );
      dispatch(setExplorePosts(response.data.data))

      // console.log(response.data)
    } catch (error) {
      console.error(error);
    }
    finally {
      // Set loading back to false after the API call is completed
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [liked]); 
  


  // delete Post

  // const handleMenuClick = (event) => {
  //   setAnchorEl(event?.currentTarget);
  // };

  // report post

  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const handleReportClick = (postId) => {
    setSelectedPostId(postId);
    setShowReportModal(true);
  };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };


  // const handleDeleteClick = async (id) => {
  //   // show confirmation dialog
  //   const confirmDelete = await Swal.fire({
  //     title: "Are you sure you want to delete this post?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Delete",
  //   });

  //   // delete the post if the user confirms
  //   if (confirmDelete.isConfirmed) {
  //     const response = await axios.delete(
  //       `${baseUrl}posts/deletePost/${id}`
  //     );
  //     if (response.status === 200) {
  //       setPosts(posts.filter((post) => post.id !== id));
  //       toast.success("Post deleted successfully");
  //       // fetchPosts();
  //     } else {
  //       toast.error("Failed to delete post");
  //     }
  //   }
  // };

  // useEffect(() => {
  //     dispatch(fetchPosts());
  //   }, [dispatch]);

  // if (loading) {
  //   return( <SkeltonLoad />)
  // }




  return (
    <div className="posts">
      {/* {explorePosts.length === 0 ? (
        
 <SkeltonLoad />


      ) : ( */}


       { explorePosts.map((post, index) => (



        <div  className="post">
          <div className="postWrapper">
            <div className="postTop">
              <div key={post.id}  className="postTopLeft">
                <img
                  src={post?.user?.profile_picture}
                  className="shareProfileImg"
                  alt="Profile Picture"
                />

                <div>
                  <Link to={`/profile/${post.user.id}`}>
                    <span key={post.user.id} className="postUsername">
                      {" "}
                      {post.user.fullname && post.user.fullname.charAt(0).toUpperCase() + post.user.fullname.slice(1)}
                    </span>
                  </Link>

                  <br />
                  <span style={{ marginLeft: "0.6em" }} className="postDate">
                    {moment(post.created_at).fromNow()}
                  </span>
                </div>

                {/* <span className="postDate">{new Date(post.created_at).toDateString()}</span> */}
              </div>

              {user_id == post.user.id ? null : (
                <div className="postTopRight" id={post.id}>
                  <MdReportGmailerrorred
                    onClick={() => handleReportClick(post.id)}
                  />

                  {selectedPostId === post.id && (
                    <ReportPostModal postId={post.id} userId={user_id} />
                  )}
                </div>
              )}
            </div>
            <span className="postText">{post?.content}</span>

            <div className="postCenter">

  <img
    className="postImg"
    src={decodeURIComponent(post?.image).replace(
      "/https:",
      "https://"
    )}
    alt=""
  />

  {post?.video && (
    <video
      className="postVideo"
      src={decodeURIComponent(post?.video).replace(
        "/https:",
        "https:/"
      )}
      controls
    ></video>
  )}
</div>
            <div className="postBottom">
              <div className="postBottomLeft">
                <img
                  className="likeIcon"
                  src="assets/like.png"
                  onClick={() => {
                    likebutton(post.id);
                  }}
                  flex="1"
                  variant="ghost"
                />

                {post.liked_post.length > 0 && (
                  <span>
                    {post.liked_post.length}{" "}
                    {post.liked_post.length === 1
                      ? "person liked"
                      : "people like"}
                  </span>
                )}
              </div>

              <div className="postBottomRight">
                {/* <AiOutlineComment   onClick={handleshow } size={40}flex='1' /> */}

                <AiOutlineComment style={{cursor:'pointer'}}
                  size={25}
                  flex="1"
                  onClick={() => {
                    handleCommentClick(post.id);
                    getComments(post.id);
                  }}
                />
              </div>
            </div>
          </div>

          {commentBoxOpen[post.id] && (
            <div style={{ padding: "10px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* <img src={`${users.other.profile}`} className="PostImage" alt="" /> */}
                {/* <p style={{marginLeft:"6px"}}>Suman</p> */}

                <input
                  type="text"
                  className="commentinput"
                  placeholder="Write your thought"
                  onChange={hangleChange}
                  value={values.comment}
                />
                <button
                  className="addCommentbtn"
                  onClick={() => {
                    {
                      addComment(post.id);
                    }
                    {
                      handleCommentClick(post.id);
                    }
                  }}
                >
                  Post
                </button>
              </div>

              {postcomment
                ? postcomment?.map((com) => (
                    <div
                      key={com.id}
                      className="commetncontent"
                      style={{ alignItems: "center" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          className="PostImage"
                          src="https://res.cloudinary.com/dtnbd0res/image/upload/v1684419108/profile_picture/sywfducryop3fhv0cxd8.png"
                          alt=""
                        />

                        {/* {item.profile === '' ? 
                  <img src={`https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} className="PostImage" alt="" /> : <img src={`${item.profile}`} className="PostImage" alt="" />
                } */}
                        <p
                          
                          style={{
                            marginLeft: "6px",
                            fontSize: 18,
                            marginTop: 8,
                            fontWeight:'bold'
                          }}
                        >
                          {com.user_na}



                          
                          {user_id == com.user && (
                            <span
                              onClick={() => {
                                {
                                  deleteComment(com.id);
                                }
                                {
                                  handleCommentClick(post.id);
                                }
                              }}
                              style={{ marginLeft: "3vh" }}
                            >
                              {" "}
                              <BsTrash3 style={{ marginLeft: "1em" ,cursor:'pointer'}} />
                            </span>
                          )}

                          <p
                        style={{
                          marginLeft: "5px",
                          textAlign: "start",
                          color:'black',
                          fontSize:'15px'
                          // marginTop: -16,
                        }}
                      >
                        {com.comment}
                      </p>

                        </p>
                      </div>

                    </div>
                  ))
                : null}
            </div>
          )}
        </div>



      )

      
      // )
      )}




    </div>
  );
}
