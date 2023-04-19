import React from 'react'
import Navbar from '../../../components/Admin/Navbar/Navbar'
import Sidebar from '../../../components/Admin/Sidebar/Sidebar'
import UserList from '../../../components/Admin/UserList/UserList'

import './AdminUserList.scss'


function AdminUserList() {
  return (
    <div className="userList">
        <Sidebar />
        <div className="homeContainer">
            <Navbar />
        <div className="listContainer">
            <div className="listTitle">User List</div>
        </div>
        <div style={{margin:"15px"}} >
        <UserList/>
        </div>
        </div>
    </div>
  )
}

export default AdminUserList