import React, { useState } from 'react';
// import GoogleMapReact from 'google-map-react'


const MapComponent = () => {
  const [directionsService] = useState(new window.google.maps.DirectionsService());
  const [directionsRenderer] = useState(new window.google.maps.DirectionsRenderer());
  const [waypoints, setWaypoints] = useState([]);
  const [summary, setSummary] = useState('');

  const calculateAndDisplayRoute = () => {
    const checkboxArray = document.getElementById("waypoints");
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;

    const selectedWaypoints = Array.from(checkboxArray.options)
      .filter(option => option.selected)
      .map(option => ({
        location: option.value,
        stopover: true
      }));

    directionsService.route({
      origin: start,
      destination: end,
      waypoints: selectedWaypoints,
      optimizeWaypoints: true,
      travelMode: window.google.maps.TravelMode.DRIVING,
    })
    .then(response => {
      directionsRenderer.setDirections(response);

      const route = response.routes[0];
      let summaryText = '';

      for (let i = 0; i < route.legs.length; i++) {
        const routeSegment = i + 1;
        summaryText += `<b>Route Segment: ${routeSegment}</b><br>`;
        summaryText += `${route.legs[i].start_address} to `;
        summaryText += `${route.legs[i].end_address}<br>`;
        summaryText += `${route.legs[i].distance.text}<br><br>`;
      }
      setSummary(summaryText);
    })
    .catch(error => {
      console.error("Directions request failed due to ", error);
      window.alert("Directions request failed due to " + error);
    });
  };

  React.useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: { lat: 41.85, lng: -87.65 },
    });

    directionsRenderer.setMap(map);

    document.getElementById("submit").addEventListener("click", calculateAndDisplayRoute);

    return () => {
      document.getElementById("submit").removeEventListener("click", calculateAndDisplayRoute);
    };
  }, []);

  return (
    <div>
      <div id="map" style={{ height: '400px' }}></div>
      <div>
        <label htmlFor="start">Start:</label>
        <input type="text" id="start" />
        <br />
        <label htmlFor="end">End:</label>
        <input type="text" id="end" />
        <br />
        <select id="waypoints" multiple>
          <option value="waypoint1">Waypoint 1</option>
          <option value="waypoint2">Waypoint 2</option>
          <option value="waypoint3">Waypoint 3</option>
        </select>
        <br />
        <button id="submit">Calculate Route</button>
      </div>
      <div id="directions-panel" dangerouslySetInnerHTML={{ __html: summary }}></div>
    </div>
  );
};

export default MapComponent;
