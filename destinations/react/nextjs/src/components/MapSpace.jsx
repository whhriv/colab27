
import { useState, useEffect } from 'react'
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
  Marker,
} from "@vis.gl/react-google-maps"

export default function MapSpace() {
  const [currentLocation, setCurrentLocation] = useState(null);

    //   const position = {
    //     lat: 32.748994,
    //     lng: -117.231647
    // }

    
    useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }, []);

    return (
      <div style={{height: "100vh", width: "100%"}}>
        <APIProvider apiKey='AIzaSyAR-r8GJmwcm-9s2gqKkKHa3K4Km145a7Q'
        >

          <Map center={currentLocation} zoom={7}>
          <Marker position={currentLocation} />
          </Map>
          <Marker />
        </APIProvider>  
      </div>
    )

}

