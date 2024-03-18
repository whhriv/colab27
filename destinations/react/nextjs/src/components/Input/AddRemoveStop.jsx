
import React, { useState, createContext, useContext } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
// import GetDirectionMapOver from "../geolocation/GetDirectionsMapOver";

// const ResponsesContext = createContext(null)

const AddRemoveStop = () => {
  const [fields, setFields] = useState([{ label: "Stop", type: "text" }]);
  const [start, setStart] = useState("");
  
  const ResponsesContext = createContext(null)
  const [responses, setResponses] = useState(null)

  const navigate = useNavigate()
  const addField = () => {
    setFields([...fields, { label: "Stop", type: "text" }]);
  };

  const removeField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleChange = (index, event) => {
    const updatedFields = [...fields];
    updatedFields[index].value = event.target.value;
    console.log(updatedFields)
    setFields(updatedFields);
  };
// Saves Start and Stop  Variables

const handleFormSubmit = (e) => {
  e.preventDefault();

  let startingLocation = start;
  const stops = fields.map((field) => field.value);
  
  const directionsRequests = [];

  for (let i = 0; i < stops.length; i++) {
    const request = {
      origin: startingLocation, // Ensure origin is a string
      destination: stops[i],   // Ensure destination is a string
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    };
    directionsRequests.push(request);

    startingLocation = stops[i];
  }

  // Fetch directions for each request
  const directionsService = new google.maps.DirectionsService();
  const directionsPromises = directionsRequests.map((request) => {
    return new Promise((resolve, reject) => {
      directionsService.route(request, (response, status) => {
        if (status === 'OK') {
          resolve(response);
          // console.log('ARS:: fetch response', response) // CHECK THIS
        } else {
          reject(new Error(`Error fetching directions: ${status}`));
        }
      });
    });
  });

  // Handle all direction requests asynchronously
  Promise.all(directionsPromises)
    .then((responses) => {
      // DATA RETREIVAL AND HANDLING
      // console.log('DIRECTION RESPONSES:', responses)
      console.log('DIRECTION RESPONSES[0].request:', responses[0].request)

      setResponses(responses)
      navigate('/GetDirectionsMapOver')

// ORIGIN - DESTINATION
// let dataResponse = responses
            for (let i = 0; i < responses.length; i++) {
              sessionStorage.setItem(`stretches${i + 1}`, JSON.stringify(responses[i].request));
              // console.log('STRETCHES-LOOP', sessionStorage.getItem(`stretches${i + 1}`));
            }

            for (let i = 0; i < responses.length; i++) {
              sessionStorage.setItem(`origin${i + 1}`, JSON.stringify(responses[i].request.origin));
              // console.log('ORIGIN-LOOP', sessionStorage.getItem(`origin${i + 1}`));
            }
            for (let i = 0; i < responses.length; i++) {
              sessionStorage.setItem(`destination${i + 1}`, JSON.stringify(responses[i].request.destination));
              // console.log('DESTINATION-LOOP', sessionStorage.getItem(`destination${i + 1}`));
            }
            // for (let i = 0; i < responses.length; i++) {
            //   sessionStorage.setItem(`seconds${i + 1}`, JSON.stringify(responses[i].routes[i].legs[i].duration));
            //   console.log('Time-Loooop', sessionStorage.getItem(`seconds${i + 1}`));

            // }


    })
    .catch((error) => {
      console.error("Error fetching directions:", error);
    });
  // console.log(dataResponse)
  navigate('/GetDirectionsMapOver');
};


  return (
    <div>
      <FloatingLabel controlId="start" label="Start">
        <Form.Control
          className="w-90"
          type="text"
          placeholder="Start"
          value={start}
          id="startInput"
          size="sm"
          onChange={(e) => {setStart(e.target.value); sessionStorage.setItem("startPoint", e.target.value);}}
        />
      </FloatingLabel>
      {fields.map((field, index) => (
        <div key={index}>
          <FloatingLabel controlId={`stop${index}`} label="Stop">
            <Form.Control
              className="w-100"
              type="text"
              placeholder="Stop"
              value={field.value || ""}
              onChange={(e) => handleChange(index, e)}
              size="sm"
            />
            <Button variant="outline-danger" className="btn btn-float-right" onClick={() => removeField(index)}>
              X
            </Button>
          </FloatingLabel>
        </div>
      ))}
      <Button variant="primary" onClick={addField}>
        Add Stop
      </Button>
      <Button variant="success" onClick={handleFormSubmit}>Create your Route</Button>
    </div>
  );
};

export default AddRemoveStop;
