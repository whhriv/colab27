import React, { useState } from 'react';

const MapComponent = () => {
 
  const [start, setStart] = useState("Halifax, NS");
  const [waypoints, setWaypoints] = useState([]);
  const [end, setEnd] = useState("Vancouver, BC");

  
  const handleSubmit = () => {
    
  };

  return (
    <div id="container">
      <div id="map"></div>
      <div id="sidebar">
        <div>
          <b>Start:</b>
          <select value={start} onChange={(e) => setStart(e.target.value)}>
            <option value="Halifax, NS">Halifax, NS</option>
            <option value="Boston, MA">Boston, MA</option>
            <option value="New York, NY">New York, NY</option>
            <option value="Miami, FL">Miami, FL</option>
          </select>
          <br />
          <b>Waypoints:</b> <br />
          <i>(Ctrl+Click or Cmd+Click for multiple selection)</i> <br />
          <select multiple value={waypoints} onChange={(e) => setWaypoints(Array.from(e.target.selectedOptions, option => option.value))}>
            <option value="montreal, quebec">Montreal, QBC</option>
            <option value="toronto, ont">Toronto, ONT</option>
            <option value="chicago, il">Chicago</option>
            <option value="winnipeg, mb">Winnipeg</option>
            <option value="fargo, nd">Fargo</option>
            <option value="calgary, ab">Calgary</option>
            <option value="spokane, wa">Spokane</option>
          </select>
          <br />
          <b>End:</b>
          <select value={end} onChange={(e) => setEnd(e.target.value)}>
            <option value="Vancouver, BC">Vancouver, BC</option>
            <option value="Seattle, WA">Seattle, WA</option>
            <option value="San Francisco, CA">San Francisco, CA</option>
            <option value="Los Angeles, CA">Los Angeles, CA</option>
          </select>
          <br />
          <input type="submit" id="submit" onClick={handleSubmit} />
        </div>
        <div id="directions-panel"></div>
      </div>
    </div>
  );
};

export default MapComponent;
