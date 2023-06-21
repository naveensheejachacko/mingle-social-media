import React from 'react'
import './SearchData.scss'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function SearchData({users}) {
  return (
    

    <div className="card-container">
      {users.map((user) => (
        <Card key={user.id} className="card">
          <Card.Img  style={{ width: "250px",height:"250px",borderRadius: "50%" }} variant="top"  src={user.profile_picture} className="rounded"/>
          <Card.Body>
            <Card.Title>{user.fullname}</Card.Title>
            <Card.Text>
            </Card.Text>
            <div className="button-container">
              {/* <Button variant="primary" size='sm' onClick={() => { handleFollowUser(user.id) }} style={{ borderRadius: '10px' }}>Follow</Button> */}
              <Link to={`/profile/${user.id}`}>            
              <Button
                variant="secondary"
                size="sm"
                style={{ borderRadius: "10px" }}
                >
                    View Profile
                    </Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

export default SearchData;