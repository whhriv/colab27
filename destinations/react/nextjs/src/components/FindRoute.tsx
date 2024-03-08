import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router';




type RouteType = {
  id: number;
  origin: string;
  stop1: string;
  stop2: string:
  end: string:
};

type RouteProps = {
  // currentUser: UserType|null
};



const CreateRoute: React.FC<RouteProps> = () => {
  const [skis, setSkis] = useState<RouteType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType[]>([])
  const [skiFormData, setSkiFormData] = useState<Partial<RouteType>>(
    {
        title: '',
        description: '',
        make: '',
        model: '',
        length: '',
        binding: '',
        imageUrl: ''
    }
)
// let imageUrl = localStorage.getItem('imageString')
// console.log(imageUrl)
const userData = localStorage.getItem('user')
console.log('USER DATA SHOULD BE HERE',userData)
const navigate = useNavigate()
// let imgURL =  skiFormData.imageUrl?.toString()


const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSkiFormData({...skiFormData, [e.target.name]: e.target.value})
}

  const createSki = async () => {
    const userData = localStorage.getItem('user')
    console.log('UserData inside createSki',userData)

    try {
      const userData = localStorage.getItem('user')
      console.log('inside TRY',userData)

      const token = localStorage.getItem('token')
      console.log('HERE IS THE TOKEN', token)

      // const imgURL = skiFormData.imageUrl?.toString().trim()
      // console.log('IMAGE PATH',imgURL)
      // console.log('image path', skiFormData.imageUrl)

      console.log(skiFormData.userId)
      console.log('checking', token)
      
      const response = await fetch('http://127.0.0.1:5000/api/createskis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: skiFormData.title,
          description: skiFormData.description,
          make: skiFormData.make,
          model: skiFormData.model,
          length: skiFormData.length,
          binding: skiFormData.binding,
          image_url: skiFormData.imageUrl,
          user_id: userData,
        
        }),
        
      });
    
      if (response.ok) {
        // If successful, refresh the list of skis
        console.log('ski created from here in createSki fetch')
        navigate('/')
        // createSki()
      } else {
        setError('Failed to create a new ski');
      }
    } catch (error) {
      console.error('Error creating a new ski:', error);
      setError('Error creating a new ski');
    }
  };

  return (

 <>
        <Body sidebar>
            <h1 className="text-center">Create a new Ski</h1>
            <Container>
            <Card className='bg-transparent m-3'>
                <Card.Body>
                    <Form onSubmit={createSki}>
                        <Form.Label htmlFor='title'>Title</Form.Label>
                        <Form.Control value={skiFormData.title} name='title' onChange={handleInputChange} />

                        <Form.Label htmlFor='make'>Make</Form.Label>
                        <Form.Control value={skiFormData.make} name='make' onChange={handleInputChange} />

                        <Form.Label htmlFor='model'>Model</Form.Label>
                        <Form.Control value={skiFormData.model} name='model'  onChange={handleInputChange} />

                        <Form.Label htmlFor='length'>Length</Form.Label>
                        <Form.Control value={skiFormData.length} name='length' onChange={handleInputChange} />

                        <Form.Label htmlFor='binding'>Binding</Form.Label>
                        <Form.Control value={skiFormData.binding} name='binding'  onChange={handleInputChange} />

                        <Form.Label htmlFor='description'>Description</Form.Label>
                        <Form.Control value={skiFormData.description} name='description'  onChange={handleInputChange} />

                        {/* <Form.Label htmlFor='image'>Image</Form.Label> */}
                        <ImageUpload onUpload={(imageUrl) => setSkiFormData({...skiFormData, imageUrl})} />

                        

                        <Button type='submit' variant='outline-success' className='w-100 mt-3'>Add Ski</Button>
                        
                    </Form>
                    
                    
                </Card.Body>
            </Card>
            </Container>
            </Body>
        </>
  );
};

export default CreateSki