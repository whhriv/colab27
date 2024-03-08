import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router';

const CreateRoute  = () => {
   
    const [start, setStart] = useState[]
    const [stop1, setStop1] = useState[]
    const [stop2, setStop2] = useState[]
    const [stop3, setStop3] = useState[]
    const [stop4, setStop4] = useState[]
    const [finalDestination, setFinalDestination] = useState[]

      {
          title: '',
          description: '',
'
      }
  )

  const userData = localStorage.getItem('user')
  console.log('USER DATA SHOULD BE HERE',userData)
 
  const navigate = useNavigate()


  return (

    <>
           <Body sidebar>
               <h1 className="text-center">Create a new Ski</h1>
               <Container>
               <Card className='bg-transparent m-3'>
                   <Card.Body>
                       <Form onSubmit={createSki}>
                           <Form.Label htmlFor='title'>Start</Form.Label>
                           <Form.Control value={start.location} name='start' onChange={handleInputChange} />
   
                           <Form.Label htmlFor='make'>Stop1</Form.Label>
                           <Form.Control value={stop1.location} name='stop1' onChange={handleInputChange} />
   
                           <Form.Label htmlFor='model'>stop2</Form.Label>
                           <Form.Control value={fstop1.location} name='stop2'  onChange={handleInputChange} />
   
                           <Form.Label htmlFor='length'>stop3</Form.Label>
                           <Form.Control value={stop1.location} name='stop3' onChange={handleInputChange} />
   
                           <Form.Label htmlFor='description'>Stop</Form.Label>
                           <Form.Control value={finalDestination.location} name='description'  onChange={handleInputChange} />
   

   
                           <Button type='submit' variant='outline-success' className='w-100 mt-3'>Add Ski</Button>
                           
                       </Form>
                       
                       
                   </Card.Body>
               </Card>
               </Container>
               </Body>
           </>
     );
    }  