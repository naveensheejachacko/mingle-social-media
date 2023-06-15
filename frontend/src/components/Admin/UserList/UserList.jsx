import React,{useEffect,useState} from 'react'
// import { BLOCK_USER_URL,UNBLOCK_USER_URL } from '../../../utils/Constants'
import BlockUnblockButton from '../BlockOrUnblock/handleBlockUnblock';

import { USER_LIST } from '../../../utils/Constants'
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

import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch'


import './UserList.scss'




function UserList({userId}) {

    const [usersList, setUsers] = useState([]);


  
  
    useEffect(() => {
      getUserDetails();
    }, [])
  
    const adminToken = Cookies.get("jwt-admin");
    const getUserDetails = async () => {
      try {
        axios.get(USER_LIST, { headers: { "Authorization": `Bearer ${adminToken}` } }).then((response) => {
          setUsers(response.data);
  
        }).catch((err) => {
          console.log(err, "catch error in userFetching")
        })
      } catch (err) {
        console.log(err)
      }
    }

  return (

    <>      <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Nos</TableCell>
          <TableCell align="right">Name</TableCell>
          <TableCell align="right">Email</TableCell>
          <TableCell align="right">Phone Number</TableCell>
          <TableCell align="right">Gender</TableCell>
          <TableCell align="right">Profile Picture</TableCell>
          <TableCell align="right">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {usersList
        .sort((a, b) => a.fullname.localeCompare(b.fullname))
        .map((user, index) => (
          <TableRow
            key={user.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {index + 1}
            </TableCell>
            
            <TableCell align="right">{user.fullname}</TableCell>
            <TableCell align="right">{user.email}</TableCell>
            <TableCell align="right">{user.phone_number}</TableCell>
            <TableCell align="right">{user.gender}</TableCell>
            <TableCell align="right"> <img src={user.profile_picture} alt="Profile Picture" className='shareProfileImg' /></TableCell>
            <TableCell align="right" key={user.id}>

           <BlockUnblockButton userId={user.id} /></TableCell>
        
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Toaster />
  </TableContainer>
  </>

    
  )
}

export default UserList