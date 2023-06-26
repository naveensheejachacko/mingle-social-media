
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../utils/Constants';
import Swal from 'sweetalert2';
const PostAction = ({reportId }) => {
  const [isApproved,setIsApproved] = useState(false);

  const handlepost= () => {
    const url = `${baseUrl}adminn/approveReport/${reportId}/`;

    // if (window.confirm(`Are you sure you want to ${isBlocked ? 'unblock' : 'block'} this user?`)) {
      Swal.fire({
        title: `Are you sure you want to ${isApproved ? 'show' : 'hide'} this post?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
    
    
    axios
      .patch(url)
      .then((response) => {
        setIsApproved(!isApproved);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    });
    };


  useEffect(() => {
    const url1= `${baseUrl}adminn/rPost/${reportId}/`;
  
    axios
      .get(url1)
      .then((response) => {
        setIsApproved(response.data.approved);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
 

  return (
<button type="button" className={"btn " + (isApproved ? "btn-danger" : "btn-primary")} onClick={handlepost}>
  {isApproved ? 'show' : 'hide'}
</button>



  );
};

export default PostAction;
