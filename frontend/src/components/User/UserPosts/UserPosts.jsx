import './UserPosts.scss'
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";

// import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';


import { AiOutlineComment } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";




// import {Users,Posts} from "../../../dummyData";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";

import Swal from 'sweetalert2';
import toast,{Toaster} from 'react-hot-toast'

import axios from "axios";
import { fetchPosts } from "../../../Redux/postSlice";


import { useParams } from "react-router-dom";


export default function UserPost({ post }) {
  const { userId } = useParams();

  const [posts, setPosts] = useState([]);

  const user_id = useSelector((state) => state.user?.user_id);
  const profilePic=useSelector((state)=> state.user?.profilePic)
  // console.log(useSelector((state)=>state.user?.user_id),'lllllllllll')
  const userName = useSelector((state) => state.user?.user?.user);
  const [anchorEl, setAnchorEl] = useState(null);

  // const [commentwriting, setcommentwriting] = useState("");


  const [commentBoxOpen, setCommentBoxOpen] = useState({});





  


  const [liked, setLiked] = useState(false);

  let likebutton = async (id) => {
    let response = await fetch(
      `http://127.0.0.1:8000/posts/isliked/${user_id}/`,
      {
        method: "POST",
        headers: {
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


  const [values,setValues] = useState('')
  const [postcomment,setPostcomment] = useState([])
// addComments
  let hangleChange = (e)=>{
    setValues(
      
      {
        ...values,
        comment: e.target.value})


  }
  let addComment = async (postId) => {

    if (!values.comment) {
      console.log('empty string');
      return toast.error("Can't add an empty post!!");
    } else {

    let response = await fetch(`http://127.0.0.1:8000/posts/addcomments/${user_id}/${postId}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({values})

    })
    let data = await response.json()
    

    if (response.status === 200) {
      
      // alert('success')
      toast.success('comment added')
      setValues({...values, comment: ''});
      

    } else {
      alert('failed')

    }
    // post();
  }
  }
  // gettingcommetns for posts
  let getComments = async (postId)=>{
    console.log(post,'post id from getdata')


    let response = await fetch(`http://127.0.0.1:8000/posts/getcomments/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    })
    let data = await response.json()


    if (response.status === 200) {

      setPostcomment(data)


    } else {
      alert("Something went wrong!!")

    }
    // post();
  }
// delete comment
let deleteComment = async (id)=>{

  let response = await fetch(`http://127.0.0.1:8000/posts/deletecomment/${id}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

  })
  let data = await response.json()

  if (response.status === 200) {
    // console.log(data,'get comments')
    toast.success('comment deleted')
    fetchPosts()

  } else {
    alert("Something went wrong!!")

  }
  // post();

}




  useEffect(() => {
    getComments()
  }, [postcomment])








// getingpost

  useEffect(() => {
    async function fetchPosts() {
      const response = await axios.get(`http://127.0.0.1:8000/posts/userPost/${userId}/`);
      setPosts(response.data.data);
 

      // console.log(response.data,'*******')
     
    } 
    fetchPosts(); 
  },[]);
// cloudify
  // const cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: 'dtnbd0res' });





// delete Post

const handleMenuClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleMenuClose = () => {
  setAnchorEl(null);
};

// const handleDeleteClick =async (postId) => {
//   // handle delete logic here
//   let response = await fetch(`http://127.0.0.1:8000/posts/deletePost/${postId}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },

//   })
//   let data = await response.json()
  

//   if (response.status === 200) {
//     toast.success('deleted')
//     fetchPosts()
//   } else {
//     // logoutUser()
//     alert('failed')

//   }
// };

const handleDeleteClick = async (postId) => {
  // show confirmation dialog
  const confirmDelete = await Swal.fire({
    title: 'Are you sure you want to delete this post?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Delete'
  })

  if (confirmDelete.isConfirmed) {
    // handle delete logic here
    let response = await fetch(`http://127.0.0.1:8000/posts/deletePost/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    let data = await response.json()

    if (response.status === 200) {
      toast.success('deleted')
    } else {
      alert('failed')
    }
  }
}

  // useEffect(() => {
  //     dispatch(fetchPosts());
  //   }, [dispatch]);

  return (
    <div className="posts">
       {posts.length === 0 ? (
        <div style={{marginLeft:"3.5em"}}   className=" mt-3">
          <img src="../assets/nopost.jpeg" alt="No Post Available" />
          
        </div>
      ) :( 

         posts.map((post) => (
        <div key={post.id} className="post">
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <img
                  className="shareProfileImg"
                  src={profilePic}
                  alt=""
                />
                 <div>
                <span className="postUsername">{post.user.fullname}</span>
                <br />
                <span style={{marginLeft:"0.6em"}} className="postDate">{moment(post.created_at).fromNow()}</span>

                </div>
                {/* <span className="postDate">{new Date(post.created_at).toDateString()}</span> */}
              </div>
              {/* {user_id==post.user.id?


              <div className="postTopRight">
                <IconButton onClick={handleMenuClick}>
                  <MoreVert />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={()=>{{handleDeleteClick(post.id)}}}>Delete</MenuItem>
                </Menu>
              </div>
              :null} */}
            </div>
            <div className="postCenter">
              <span className="postText">{post?.content}</span>

              <img
                className="postImg"
                src={decodeURIComponent(post?.image).replace('/https:', 'https:')}                
                alt=""
              />
            </div>


            <div className="postBottom">
              <div className="postBottomLeft">
                <img
                  className="likeIcon"
                  src="../assets/like.png"
                  onClick={() => {
                    likebutton(post.id)}
                  }
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

                <AiOutlineComment
                  size={25}
                  flex="1"
                  onClick={() =>{ handleCommentClick(post.id);
                    getComments(post.id)}}
                />

              </div>
              {user_id==post.user.id?



<BsTrash3  size={20}  onClick={() => handleDeleteClick(post.id)} />


:null}
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
                  onChange={hangleChange} value={values.comment}
                />
                <button className="addCommentbtn" onClick={() => {{addComment(post.id)};{handleCommentClick(post.id)}}}  >Post</button>
              </div>

{postcomment?

              postcomment?.map((com) => ( 
              <div key={com.id} className="commetncontent" style={{ alignItems: "center" }}>
              
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    className="PostImage"
                    src="assets/person/2.jpeg"
                    alt=""
                  />

                  {/* {item.profile === '' ? 
                  <img src={`https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} className="PostImage" alt="" /> : <img src={`${item.profile}`} className="PostImage" alt="" />
                } */}
                  <p style={{ marginLeft: "6px", fontSize: 18, marginTop: 6 }}>
                    {com.user_na}
                    {
              (user_id == com.user )&&
            <span onClick={()=>{{deleteComment(com.id)};{ handleCommentClick(post.id)  }} }style={{marginLeft:'3vh'}} >  <BsTrash3  style={{ marginLeft: "5em"}} /></span>
            }

                  
                  </p>
                </div>
                <p
                  style={{
                    marginLeft: "55px",
                    textAlign: "start",
                    marginTop: -16,
                  }}
                >
                  {com.comment}
                  
                </p>
                
             

              </div>
               )):null }





              

            
            </div>



          )}

        </div>
      ))


)}


      
    </div>
  );
}
