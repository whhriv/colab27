import { useState, useEffect } from 'react'
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps"

export default function MapSpace() {
      const position = {
        lat: 42.3265,
        lng: -122.8756
    }

    return (
      <div style={{height: "100vh", width: "100%"}}>
        <APIProvider apiKey='AIzaSyAR-r8GJmwcm-9s2gqKkKHa3K4Km145a7Q'>

          <Map center={position} zoom={9}></Map>

        </APIProvider>  
      </div>
    )

}

