
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

function Directions(){
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes')
  const [directionService, setDirectionService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routes, setRoutes] = useState([])
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex]
  const leg = selected?.legs[0];


  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionService || !directionsRenderer) return;

    directionService.route({
      origin: "san diego, CA",
      destination: "Los Angelas, CA",
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    })
    .then(res => {
      directionsRenderer.setDirections(res);
      setRoutes(response.routes);

    })
  }, [directionService, directionsRenderer]);

  if (!leg) return null;

  return <div className="directions">
    <h2>{selected.summary}</h2>
  </div>



}
