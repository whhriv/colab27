import Container from 'react-bootstrap/Container';
// import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MapSpace from './components/MapSpace';
import CreateRoute from './components/CreateRoute'
import NavBar from './components/navbar'

export default function App() {

  return (
    <BrowserRouter>
      <Container data-bs-theme='dark'>
        <NavBar  />
          <Routes>
          <Route path='/mapspace' element={<MapSpace />}/>
          <Route path='/createroute' element={<CreateRoute />}/>
          
        </Routes>
      </Container>
    </BrowserRouter>
  )
}