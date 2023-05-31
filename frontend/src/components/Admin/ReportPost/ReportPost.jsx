import React from 'react'

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
  return (
    <>    
      <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Nos</TableCell>
          <TableCell align="right">Content</TableCell>
          <TableCell align="right">Image</TableCell>
          <TableCell align="right">User Name</TableCell>
          <TableCell align="right">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {/* {usersList
        .sort((a, b) => a.fullname.localeCompare(b.fullname))
        .map((user, index) => ( */}
          <TableRow
            
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {/* {index + 1} */}
            </TableCell>
            
            <TableCell align="right">content</TableCell>
            <TableCell align="right">image</TableCell>
            <TableCell align="right">username</TableCell>
            {/* <TableCell align="right"> <img src={user.profile_picture} alt="Profile Picture" className='shareProfileImg' /></TableCell> */}
            {/* <TableCell align="right" key={user.id}>

           <PostAction userId={user.id} /></TableCell> */}
        
          </TableRow>
      {/* ))} */}
      </TableBody>
    </Table>
    <Toaster />
  </TableContainer>
  </>
  )
}

export default ReportPost