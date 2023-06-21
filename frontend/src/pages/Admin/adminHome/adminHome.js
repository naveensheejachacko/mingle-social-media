import React from 'react'
import AdminNavbar from '../../../components/Admin/Navbar/Navbar'
import AdminSidebar from '../../../components/Admin/Sidebar/Sidebar'
import './adminHome.scss'
import UserList from '../../../components/Admin/UserList/UserList'
function AdminHome() {
  return (
  <>
<div>
<AdminNavbar />
<div style={{ display: "flex" }}>
  <AdminSidebar />

</div>
</div>
    </>
  )
}

export default AdminHome;