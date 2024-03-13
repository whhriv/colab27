import { useState, useEffect } from 'react'
import { APIProvider, Map, useMapsLibrary, useMap } from "@vis.gl/react-google-maps"

export default function GetDirectionMapOver() {
    const stretch = {
        "strech1": { origin: "San Diego, CA", destination: "Temecula, CA" },
        "stretch2": { origin: "Poway, CA", destination: "Oceanside, CA" },
        // Add more stretch as needed
    };

    // Call the getDirections function with the DirectionsX function and stretch dictionary
    const directionsMap = getDirections(DirectionsX, stretch);

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <APIProvider apiKey='AIzaSyAR-r8GJmwcm-9s2gqKkKHa3K4Km145a7Q'>
                <Map>
                    {Object.keys(directionsMap).map((key) => (
                        <DirectionsX key={key} directions={directionsMap[key]} />
                    ))}
                </Map>
            </APIProvider>
        </div>
    )
}

function DirectionsX({ directions }) {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes')
    const [directionsService, setDirectionsService] = useState();
    const [directionsRenderer, setDirectionsRenderer] = useState();
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))
    }, [routesLibrary, map]);

    useEffect(() => {
        if (!directionsService || !directionsRenderer) return;

        directionsService.route({
            origin: directions.origin,
            destination: directions.destination,
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
    }, [directionsService, directionsRenderer, directions]);

    // Return null here or JSX for rendering the directions, depending on your needs
    return null;
}

function getDirections(directions, stretch) {
    let directionsMap = {};

    // Iterate over each key-value pair in the stretch dictionary
    for (let key in stretch) {
        if (stretch.hasOwnProperty(key)) {
            // Extract origin and destination from the current location
            const { origin, destination } = stretch[key];

            // Call the DirectionsX function with origin and destination
            directionsMap[key] = { origin, destination };
        }
    }

    return directionsMap;
}

