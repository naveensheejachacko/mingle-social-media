import React, { useEffect, useState } from "react";

import axios from '../../../utils/axios';
import Cookies from 'js-cookie';

import toast, { Toaster } from 'react-hot-toast'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PostAction from '../../Admin/PostAction/PostAction'




function ReportPost() {


  const [reportedPosts, setReportedPosts] = useState([]);

  useEffect(() => {
    fetchReportedPosts();
  }, []);

  const fetchReportedPosts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/adminn/rPostList");
      setReportedPosts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching reported posts:", error);
    }
  };


  const uniqueReportedPosts = reportedPosts.reduce((uniquePosts, post) => {
    // Check if the post ID already exists in uniquePosts
    const existingPost = uniquePosts.find((uniquePost) => uniquePost.post.id === post.post.id);

    if (!existingPost) {
      // If the post ID doesn't exist, add the post to uniquePosts
      uniquePosts.push(post);
    }

    return uniquePosts;
  }, []);




  return (
    <>    
      <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="right">Report Id</TableCell>
          <TableCell align="right">Post ID</TableCell>
          <TableCell align="right">Content</TableCell>
          <TableCell align="right"  >Image</TableCell>
          {/* <TableCell align="right"  >Reason</TableCell> */}
          <TableCell align="right">Count</TableCell>
          <TableCell align="right">Action</TableCell>
        </TableRow>
      </TableHead>
      
      <TableBody>
    

{uniqueReportedPosts.map((post) => (
          <TableRow
          key={post.id}
            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="right"> {post.id}</TableCell>
            <TableCell align="right"> {post.post.id}</TableCell>
            <TableCell align="right">{post.post.content}</TableCell>
            <TableCell align="right"  style={{height:'50px',width:'50px'}}>
              <img src={decodeURIComponent(post.post.image).replace('/https:', 'https:')} alt='postimage'/> 
            {/* < img src={post.post.image} /> */}
            </TableCell>
            <TableCell align="right">{post.post.report_count}</TableCell>

            {/* <TableCell align="right"> <img src={user.profile_picture} alt="Profile Picture" className='shareProfileImg' /></TableCell> */}
            {/* <TableCell align="right" key={user.id}>

           <PostAction userId={user.id} /></TableCell> */}
         <PostAction reportId={post.id} />
          </TableRow>
         

))}


      </TableBody>
    </Table>
    <Toaster />
  </TableContainer>
  </>
  )
}

export default ReportPost