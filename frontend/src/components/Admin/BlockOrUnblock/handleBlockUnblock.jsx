
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../utils/Constants';
import Swal from 'sweetalert2';
const BlockUnblockButton = ({ userId }) => {
  const [isBlocked, setIsBlocked] = useState(false);

  const handleBlockUnblock = () => {
    const url = `${baseUrl}adminn/block-unblock-user/${userId}/`;

    // if (window.confirm(`Are you sure you want to ${isBlocked ? 'unblock' : 'block'} this user?`)) {
      Swal.fire({
        title: `Are you sure you want to ${isBlocked ? 'unblock' : 'block'} this user?`,
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
        setIsBlocked(!isBlocked);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    });
    };


  useEffect(() => {
    const url1= `${baseUrl}adminn/user/${userId}/`;
  
    axios
      .get(url1)
      .then((response) => {
        setIsBlocked(response.data.is_blocked);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
 

  return (
<button type="button" className={"btn " + (isBlocked ? "btn-danger" : "btn-primary")} onClick={handleBlockUnblock}>
  {isBlocked ? 'Unblock' : 'Block User'}
</button>



  );
};

export default BlockUnblockButton;
