import React from 'react'
import './PageNotFound.css'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {

    const navigate=useNavigate()

    return (
        <div className='ErrorPageBody'>
              <img
            style={{ width: "31px", height: "31px", marginLeft: "2rem" }}
            src="../../../Images/logo.jpg"
            alt=""
          />


<span
            className="navbar-text"
            style={{
              fontFamily: "Iceberg",
              fontWeight: "bold",
              color: "black",
            }}
          >
            mingle
          </span>
            <section className="error-container">
                <span className="four"><span className="screen-reader-text">4</span></span>
                <span className="zero"><span className="screen-reader-text">0</span></span>
                <span className="four"><span className="screen-reader-text">4</span></span>
            </section>
            <div className="link-container">
                <button className="more-link" onClick={()=>navigate(-1)}>
                    Back Home
                </button>
            </div>
        </div>
    )
}

export default PageNotFound