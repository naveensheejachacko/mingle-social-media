
import { Margin } from '@mui/icons-material';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function Suggestion() {
  return (
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
      <Button variant="primary" style={{borderRadius:'10px'}}>Follow</Button>
      <Button variant="light" style={{borderRadius:'10px',Margin:'5px'}}>View Profile</Button>{' '}
    </Card.Body>
  </Card>
  )
}

export default Suggestion