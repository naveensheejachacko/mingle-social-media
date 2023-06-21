import React from 'react'
import DetailedPost from '../../../components/Admin/ReportPost/DetailedPost'


import './adminPostHandle.scss'
import Navbar from '../../../components/Admin/Navbar/Navbar'
import Sidebar from '../../../components/Admin/Sidebar/Sidebar'


function DetailPost() {
  return (
    <div className="postList">
    <Sidebar />
    <div className="homeContainer">
        <Navbar />
    <div className="listContainer">
        <div className="listTitle">Posts</div>
    </div>
    <div style={{margin:"15px"}} >
    <DetailedPost />
    </div>
    </div>
</div>
  )
}

export default DetailPost