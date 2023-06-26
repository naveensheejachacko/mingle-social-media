import React, { useEffect, useState } from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { useParams } from 'react-router-dom';
import moment from 'moment'
import axios from 'axios'
import Cookies from 'js-cookie';

import { baseUrl } from '../../../utils/Constants';

// import { fetchPostDetailsById } from '../../../api/AdminServices';

function DetailedPost() {

    const {postId}=useParams();
    const [postDetails,setPostDetails]=useState(null)
    // const token = Cookies.get('jwt_user');


    useEffect(() => {
      fetchPostDetails();
    }, []);
  
    const fetchPostDetails = async () => {
      try {
        const res = await axios.get(`${baseUrl}adminn/getPostById/${postId}`);
        setPostDetails(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };


  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
   <Card variant="outlined" sx={{ width: 520 }}>
    {
        postDetails?.image && 
    <CardOverflow>
      <AspectRatio ratio="2">
        <img
          src={decodeURIComponent(postDetails?.image).replace(
            "/https:",
            "https://"
          )}
          alt=""
        />
      </AspectRatio>
    </CardOverflow>
    }
   {
    postDetails?.video && 
    <CardOverflow>
      <AspectRatio ratio="2">
      <video
            autoPlay
            loop
            muted
            // poster="https://assets.codepen.io/6093409/river.jpg"
          >
            <source
                    src={decodeURIComponent(postDetails?.video).replace(
                      "/https:",
                      "https:/"
                    )}
              type="video/mp4"
            />
          </video>
      </AspectRatio>
    </CardOverflow>
    }

    <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
     {postDetails?.user?.fullname}
    </Typography>
    <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
      {postDetails?.content}
    </Typography>
    <Divider />
    <CardOverflow
      variant="soft"
      sx={{
        display: 'flex',
        gap: 1.5,
        py: 1.5,
        px: 'var(--Card-padding)',
        bgcolor: 'background.level1',
      }}
    >
      {/* <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
        {postDetails?.likes?.length} Likes
      </Typography> */}
      <Divider orientation="vertical" />
      {/* <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
      {moment(postDetails?.createdAt).fromNow()}
      </Typography> */}
    </CardOverflow>
  </Card> 
  </div>
  )
}

export default DetailedPost