import "./ListPost.scss";
// import { MoreVert } from "@mui/icons-material";


import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import {  Button } from '@chakra-ui/react'


import {Users,Posts} from "../../../dummyData";
import { useState,useEffect } from "react";
import {useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import moment from 'moment';


import axios from 'axios';
export default function ListPost({ post }) {

  const [posts, setPosts] = useState([]);

  const user_id=useSelector((state)=>state.user?.user?.user_id)
  const userName=useSelector((state)=>state.user?.user?.user)


  // const [like,setLike] = useState(post.like)
  // const [isLiked,setIsLiked] = useState(false)

  // const likeHandler =()=>{
  //   setLike(isLiked ? like-1 : like+1)
  //   setIsLiked(!isLiked)

  const [liked, setLiked] = useState(false)
  let likebutton = async (id) => {

    let response = await fetch(`http://127.0.0.1:8000/posts/isliked/${user_id}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })

    })
    let data = await response.json()
    if (response.status === 200) {
        if (liked) {

            setLiked(false)
        } else {
            setLiked(true)
        }
        post()
        
    } else {
        alert("Something went wrong!!")

    }
}


  useEffect(() => {
    async function fetchPosts() {
      const response = await axios.get(`http://127.0.0.1:8000/posts/getPosts`);
      setPosts(response.data.data);
      console.log(response.data,'*******')
    }
    fetchPosts();
  }, [posts]);
  return (
    <div className="posts">
    {posts.map((post) => (
      <div key={post.id} className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img className='shareProfileImg' src="assets/person/1.jpeg" alt="" />
              <span className="postUsername">{post.user.fullname}</span>
              <br/>
              <span className="postDate">{moment(post.created_at).fromNow()}</span>

              {/* <span className="postDate">{new Date(post.created_at).toDateString()}</span> */}
            </div>
            {/* <div className="postTopRight">
              <MoreVert />
            </div> */}
          </div>
          <div className="postCenter">
            <span className="postText">{post.content}</span>

            <img className="postImg" src={'http://127.0.0.1:8000/'+post.image} alt="" /> 

          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
            {/* <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
            <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" /> */}

<img className="likeIcon" src="assets/like.png" onClick={() => { likebutton(post.id) }} flex='1' variant='ghost' />
                         {/* <span><FavoriteOutlinedIcon style={{ color: 'blue' }} /></span> */}
                         {post.liked_post.length > 0 &&

                        <span>{post.liked_post.length} {post.liked_post.length=== 1 ? "person liked" : "people like"}
                        </span> 
                      }
            {/* <span className="postLikeCounter">{like} people like it</span> */}
            </div>
            <div className="postBottomRight">
              {/* <span className="postCommentText">{post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}</span> */}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
}




