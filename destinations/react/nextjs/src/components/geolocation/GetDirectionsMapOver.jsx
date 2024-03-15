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







////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////






// import React, { useState, useEffect } from 'react';
// import { APIProvider, Map, useMapsLibrary, useMap } from "@vis.gl/react-google-maps";

// export default function GetDirectionMapOver() {
    
    
    
//     const [responses, setResponses] = useState([]);

//     useEffect(() => {
//         const storedResponses = JSON.parse(sessionStorage.getItem(`stretches1`));
//         if (storedResponses) {
//             setResponses(storedResponses);
//         }
//     }, []);

//     // const stretchData = sessionStorage.getItem("waypoints");
//     // const stretch = stretchData ? JSON.parse(stretchData) : {};

//     const directionsMap = getDirections(responses);

//     useEffect(() => {
//         console.log("Retrieved directions responses:", responses);
//         // Use the directionsResponses object as needed






        
//     }, [responses]);

//     return (
//         <div style={{ height: "100vh", width: "100%" }}>
//             <APIProvider apiKey='AIzaSyAR-r8GJmwcm-9s2gqKkKHa3K4Km145a7Q'>
//                 <Map>
//                     {Object.keys(directionsMap).map((key) => (
//                         <DirectionsX key={key} directions={directionsMap[key]} responses={responses} />
//                     ))}
//                 </Map>
//             </APIProvider>
//         </div>
//     );
// }

// function DirectionsX({ directions, responses }) {
//     const map = useMap();
//     const routesLibrary = useMapsLibrary('routes')
//     const [directionsService, setDirectionsService] = useState();
//     const [directionsRenderer, setDirectionsRenderer] = useState();
//     const [routes, setRoutes] = useState([]);

//     useEffect(() => {
//         if (!routesLibrary || !map) return;

//         const service = new routesLibrary.DirectionsService();
//         const renderer = new routesLibrary.DirectionsRenderer({ map });

//         setDirectionsService(service);
//         setDirectionsRenderer(renderer);

//         return () => {
//             renderer.setMap(null);
//         };
//     }, [routesLibrary, map]);

//     useEffect(() => {
//         if (!directionsService || !directionsRenderer || !responses) return;

//         // Your logic to use responses here

//         console.log("Directions responses:", responses);
//     }, [directionsService, directionsRenderer, responses]);

//     return null; // Return null or JSX for rendering the directions
// }

// function getDirections(stretch) {
//     let directionsMap = {};

//     for (let key in stretch) {
//         if (stretch.hasOwnProperty(key)) {
//             const { origin, destination } = stretch[key];
//             directionsMap[key] = { origin, destination };
//         }
//     }

//     return directionsMap;
// }










////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


// import { useState, useEffect, useContext } from 'react'
// import { APIProvider, Map, useMapsLibrary, useMap } from "@vis.gl/react-google-maps"
// import AddRemoveStop from '../Input/AddRemoveStop'


// // const responses = useContext(ResponsesContext)
// // console.log('in GDMO responses', responses)


// export default function GetDirectionMapOver() {
//     // const responses = useContext(ResponsesContext)
//     //     console.log('in GDMO responses', responses)



//     // const userOrigin = sessionStorage.getItem(`origin1`);
//     // console.log(userOrigin)
//     // const stretchData = sessionStorage.getItem("waypoints");
//     // console.log('stretchDATAGDMO:', stretchData)
//     // const stretch = stretchData ? JSON.parse(stretchData) : {};

//     const directionsMap = getDirections(stretch);
    
    
//     useEffect(() => {
//         const directionsResponses = JSON.parse(sessionStorage.getItem("directionsResponses"));
//         console.log("Retrieved directions responses:", directionsResponses);
//         // Use the directionsResponses object as needed
//       }, []);



//     return (
//         <div style={{ height: "100vh", width: "100%" }}>
//             <APIProvider apiKey='AIzaSyAR-r8GJmwcm-9s2gqKkKHa3K4Km145a7Q'>
//                 <Map>
//                     {Object.keys(directionsMap).map((key) => (
//                         <DirectionsX key={key} directions={directionsMap[key]} />
//                     ))}
//                 </Map>
//             </APIProvider>
//         </div>
//     )
// }

// function DirectionsX({ directions }) {
//     const map = useMap();
//     const routesLibrary = useMapsLibrary('routes')
//     const [directionsService, setDirectionsService] = useState();
//     const [directionsRenderer, setDirectionsRenderer] = useState();
//     const [routes, setRoutes] = useState([]);

   
    

//     useEffect(() => {
//         if (!routesLibrary || !map) return;

//         const service = new routesLibrary.DirectionsService();
//         const renderer = new routesLibrary.DirectionsRenderer({ map });

//         setDirectionsService(service);
//         setDirectionsRenderer(renderer);

//         return () => {
//             renderer.setMap(null);
//         };
//     }, [routesLibrary, map]);

//     const directionDecoder = () => {
//         let returnResults = []
//         for (let i = 0; i < responses.length; i++) {
//             sessionStorage.getItem(`stretches${i + 1}`, JSON.parse(responses[i].request));
//             returnResults.push(JSON.parse(responses[i]))
//             console.log('directiondecoder:', sessionStorage.getItem(`stretches${i + 1}`));
            
//           }
//         //   return returnResults
//     }
//     useEffect(() => {
//         if (!directionsService || !directionsRenderer) return;

        
        
        
//         // directionsService.route({
//         //     origin: stretches[0],
//         //     destination: directions.destination,
//         //     travelMode: google.maps.TravelMode.DRIVING,
//         //     provideRouteAlternatives: true,
//         // })
       
//         directionsService.route({
//             origin: sessionStorage.getItem(`origin0`),
//             destination: sessionStorage.getItem(`destination0`),
//             travelMode: google.maps.TravelMode.DRIVING,
//             provideRouteAlternatives: true,
//         })

//         // const decodedOrigin = directionDecoder()
       
       
//         // directionsService.route({
//         //     origin: decodedOrigin,
//         //     destination: sessionStorage.getItem(`destination0`),
//         //     travelMode: google.maps.TravelMode.DRIVING,
//         //     provideRouteAlternatives: true,
//         // })


//         .then((res) => {
//             directionsRenderer.setDirections(res);
//             setRoutes(res.routes);
//         })
//         .catch(error => {
//             console.log("Error fetching directions:", error);
//         })
//     }, [directionsService, directionsRenderer, directions]);

//     // Return null here or JSX for rendering the directions, depending on your needs
//     return null;
// }

// function getDirections(stretch) {
//     let directionsMap = {};

//     for (let key in stretch) {
//         if (stretch.hasOwnProperty(key)) {
//             const { origin, destination } = stretch[key];
//             directionsMap[key] = { origin, destination };
//         }
//     }

//     return directionsMap;
// }

// let stretches = sessionStorage.getItem("waypoints")
// console.log('STRETCHES from GDMO', stretches)





// import { useState, useEffect } from 'react'
// import { APIProvider, Map, useMapsLibrary, useMap } from "@vis.gl/react-google-maps"


// //STRETCH is being used here, as it gets repetative using "routes" when using react
// // routes to create a bunch of routes for a routing app mapping routes of mapped routes on
// // some maps.  
// // What I mean to say is STRETCH= Origin->destination, or it is the actual route

// export default function GetDirectionMapOver() {
//     // const stretch = {
//     //     "strech1": { origin: "San Diego, CA", destination: "Temecula, CA" },
//     //     "stretch2": { origin: "Poway, CA", destination: "Oceanside, CA" }

//     // };

//     // const stretch = JSON.parse(sessionStorage.getItem("waypoints"));
//     const stretchData = sessionStorage.getItem("waypoints");
//     const stretch = stretchData ? JSON.parse(stretchData) : {};

//     const directionsMap = getDirections(stretch);


//     // const directionsMap = getDirections(DirectionsX, stretch);

//     return (
//         <div style={{ height: "100vh", width: "100%" }}>
//             <APIProvider apiKey='AIzaSyAR-r8GJmwcm-9s2gqKkKHa3K4Km145a7Q'>
//                 <Map>
//                     {Object.keys(directionsMap).map((key) => (
//                         <DirectionsX key={key} directions={directionsMap[key]} />
//                     ))}
//                 </Map>
//             </APIProvider>
//         </div>
//     )
// }

// function DirectionsX({ directions }) {
//     const map = useMap();
//     const routesLibrary = useMapsLibrary('routes')
//     const [directionsService, setDirectionsService] = useState();
//     const [directionsRenderer, setDirectionsRenderer] = useState();
//     const [routes, setRoutes] = useState([]);

//     useEffect(() => {
//         if (!routesLibrary || !map) return;
//         setDirectionsService(new routesLibrary.DirectionsService());
//         setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))
//     }, [routesLibrary, map]);

//     useEffect(() => {
//         if (!directionsService || !directionsRenderer) return;

//         directionsService.route({
//             origin: directions.origin,
//             destination: directions.destination,
//             travelMode: google.maps.TravelMode.DRIVING,
//             provideRouteAlternatives: true,
//         })
//         .then((res) => {
//             directionsRenderer.setDirections(res);
//             console.log('routes', res)
//             setRoutes(res.routes);
//         })
//         .catch(error => {
//             console.log("error fetching directions:", error)
//         })
//     }, [directionsService, directionsRenderer, directions]);

//     // Return null here or JSX for rendering the directions, depending on your needs
//     return null;
// }

// function getDirections(directions, stretch) {
//     let directionsMap = {};

//     // Iterate over each key-value pair in the stretch dictionary
//     for (let key in stretch) {
//         if (stretch.hasOwnProperty(key)) {
//             // Extract origin and destination from the current location
//             const { origin, destination } = stretch[key];

//             // Call the DirectionsX function with origin and destination
//             directionsMap[key] = { origin, destination };
//         }
//     }
//     console.log(directionsMap)
//     return directionsMap;
// }

// let stretches = sessionStorage.getItem("waypoints")
// console.log('STRETCHES from MapSpace',stretches)