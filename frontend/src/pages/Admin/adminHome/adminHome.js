import React from 'react'
import AdminNavbar from '../../../components/Admin/Navbar/Navbar'
import AdminSidebar from '../../../components/Admin/Sidebar/Sidebar'
import './adminHome.scss'
import UserList from '../../../components/Admin/UserList/UserList'
function AdminHome() {
  return (
  <>
  <div className='adminHome'>
    <AdminSidebar />
  <div className="homeContainer">
  <AdminNavbar />
  
  </div>  
  
 
  </div>

    </>
  )
}

export default AdminHome;