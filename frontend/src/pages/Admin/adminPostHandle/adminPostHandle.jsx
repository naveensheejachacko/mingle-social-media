import React from 'react'
import './adminPostHandle.scss'
import Navbar from '../../../components/Admin/Navbar/Navbar'
import Sidebar from '../../../components/Admin/Sidebar/Sidebar'
import ReportPost from '../../../components/Admin/ReportPost/ReportPost'

function adminPostHandle() {
  return (
    <div className="postList">
    <Sidebar />
    <div className="homeContainer">
        <Navbar />
    <div className="listContainer">
        <div className="listTitle">Posts</div>
    </div>
    <div style={{margin:"15px"}} >
    <ReportPost />
    </div>
    </div>
</div>
  )
}

export default adminPostHandle