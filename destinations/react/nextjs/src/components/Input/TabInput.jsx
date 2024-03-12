import React, { useState } from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete";

const LocationSearch = () => {
  const [location, setLocation] = useState("");

  const handleChange = (event) => {
    setLocation(event.target.value);
  };
  const googleAPIKey = 'AIzaSyDbUVVfWx2Ghaty0_o6toUor2W2UZLH1ro'

  return (
    <div>
      <ReactGoogleAutocomplete
        apiKey={googleAPIKey}
        inputPlaceholder="Enter a location"
        onChange={handleChange}
      />
      <p>Selected location: {location}</p>
    </div>
  );
};

export default LocationSearch;