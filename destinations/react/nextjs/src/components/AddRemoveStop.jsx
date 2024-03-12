import React, { useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useNavigate } from 'react-router-dom'



const AddRemoveStop = () => {
  const [fields, setFields] = useState([{ label: "Stop", type: "text" }]);
  const [start, setStart] = useState("");
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
    const startLocation = start;
    const stops = fields.map(field => field.value);
    console.log('Stop Point Dict', stops);
    console.log('start location',startLocation);
    navigate('/Directions')
    
  };

  // const createRouteFunc = () => {
  //   const startLocation = start;
  //   const stops = fields.map(field => field.value);
  //   console.log(stops);
  //   console.log(startLocation);
  // };

  return (
    <div>
      <FloatingLabel controlId="start" label="Start">
        <Form.Control
          className="w-90"
          type="text"
          placeholder="Start"
          value={start}
          size="sm"
          onChange={(e) => setStart(e.target.value)}
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
            <Button variant="outline-danger" className="btn-float-right" onClick={() => removeField(index)}>
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
