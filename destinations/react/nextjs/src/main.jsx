import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import MapSpace from './App.jsx'
import NavBar from './navbar.jsx'



// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar />
    <MapSpace />
  </React.StrictMode>
)
