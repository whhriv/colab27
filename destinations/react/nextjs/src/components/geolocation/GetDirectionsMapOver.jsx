import { useState, useEffect } from 'react';
import { APIProvider, Map, useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import { getRouteTime } from '../../scripts/compareRoutes';

export default function GetDirectionMapOver() {
    const [stretches, setStretches] = useState([]);

    

    useEffect(() => {
        // Retrieve stretches from sessionStorage and convert to array
        const storedStretches = [];
        for (let i = 1; i <= sessionStorage.length; i++) {
            const storedItem = sessionStorage.getItem(`stretches${i}`);
            
            if (storedItem) {
                storedStretches.push(JSON.parse(storedItem));
            }
        }
        setStretches(storedStretches);
        getSessionStorageData()
        
    }, []);

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <APIProvider apiKey='AIzaSyAR-r8GJmwcm-9s2gqKkKHa3K4Km145a7Q'>
                <Map>
                    {stretches.map((stretch, index) => (
                        <DirectionsX key={index} stretch={stretch} />
                    ))}
                </Map>
            </APIProvider>
        </div>
    );
}

function DirectionsX({ stretch, stretches }) {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsService, setDirectionsService] = useState();
    const [directionsRenderer, setDirectionsRenderer] = useState();
    const [routes, setRoutes] = useState([]);

    // console.log(getRouteTime(stretches))

    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [routesLibrary, map]);

    useEffect(() => {
        if (!directionsService || !directionsRenderer || !stretch) return;

        directionsService.route({
            origin: stretch.origin,
            destination: stretch.destination,
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true,
        })
        .then((res) => {
            directionsRenderer.setDirections(res);
            console.log('routes', res)
            setRoutes(res.routes);
        })
        .catch(error => {
            console.log("error fetching directions:", error)
        })

                getRouteTime(stretch.origin, stretch.destination, directionsService)
                    .then(totalTime => {
                        console.log('total Route Time:', totalTime)
                    })
                    .catch(error => {
                        console.error('error calc route times', error)
                    })


    }, [directionsService, directionsRenderer, stretch]);

    // Return null here or JSX for rendering the directions, depending on your needs
    // console.log(getRouteTime(stretches))
    // console.log('TIMES', sessionStorage.getItem(TIME1, TIME2))
    return null;
    
}
// console.log(getRouteTime(stretches))
function getSessionStorageData() {
    const sessionStorageData = {};
  
    for (let i = 1; i <= sessionStorage.length; i++) {
      const stretch = JSON.parse(sessionStorage.getItem(`stretches${i}`));
      const origin = JSON.parse(sessionStorage.getItem(`origin${i}`));
      const destination = JSON.parse(sessionStorage.getItem(`destination${i}`));
      const time = JSON.parse(sessionStorage.getItem(`TIME${i}`));
  
      sessionStorageData[`stretch${i}`] = {
        origin,
        destination,
        time
      };
    }
  
    return sessionStorageData;
  }
  
getSessionStorageData()
  const sessionStorageData = getSessionStorageData();
  console.log(sessionStorageData);
  



