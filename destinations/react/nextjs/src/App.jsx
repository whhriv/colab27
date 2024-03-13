import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MapSpace from './components/MapSpace';
import CreateRoute from './components/AddRemoveStop'
import NavBar from './components/navbar'
import Directions from './components/Input/Directions'
import TabInputButton from './components/Input/TabInput';
// import UserLocation from './components/UserLocation'
import LocationSearch from './components/LocationSearch';
import ParentComponent from './components/ParentComponent';
import APIComponent from './components/geolocation/APIComponent'


export default function App() {
  const [startLocation, setStartLocation] = useState("");
  const [stops, setStops] = useState([]);

  const handleFormSubmit = (start, stops) => {
    setStartLocation(start);
    setStops(stops);
  };

  return (
   
    <BrowserRouter>
      <Container >
        <NavBar  />
          <Routes>
          <Route path='/parentcomponent' element={<ParentComponent />}/>
          <Route path='/mapspace' element={<MapSpace />}/>
          <Route path='/createroute' element={<CreateRoute />}/>
          <Route path='/directions' element={<Directions />}/>
          <Route path='/tabinputbutton' element={<TabInputButton />}/>
          <Route path='/locationsearch' element={<LocationSearch />}/>
          <Route path='/apicomponent' element={<APIComponent/>}/>
          
        </Routes>
      </Container>
    </BrowserRouter>
   
  )
}