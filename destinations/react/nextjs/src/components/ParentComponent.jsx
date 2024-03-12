// Parent component
import React, { useState } from "react";
import AddRemoveStop from "./AddRemoveStop";
import DirectionMapSpace from "./MapSpace";
// import DirectionMapSpace from "./DirectionMapSpace";

function ParentComponent() {
  const [start, setStart] = useState("");
  const [stops, setStops] = useState([]);

  const handleStartChange = (value) => {
    setStart(value);
  };

  const handleStopsChange = (values) => {
    setStops(values);
  };

  return (
    <div>
      <AddRemoveStop
        start={start}
        stops={stops}
        onStartChange={handleStartChange}
        onStopsChange={handleStopsChange}
      />
      <DirectionMapSpace start={start} stops={stops} />
    </div>
  );
}

export default ParentComponent;
