import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


function GridComplexExample() {
  return (
    <div data-bs-theme='dark'>
    <Form data-bs-theme="dark">
      <Row className="mb-3">
        <Form.Group as={Col} controlId="startloc">
          <Form.Label>Start</Form.Label>
          <Form.Control type="start" placeholder="Starting Location" />
        </Form.Group>

        <Form.Group as={Col} controlId="destination">
          <Form.Label>Final Destination</Form.Label>
          <Form.Control type="destination" placeholder="Final Destination" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="stop1">
        <Form.Label>First Stop</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="stop2">
        <Form.Label>Second Stop</Form.Label>
        <Form.Control placeholder="666 Fake St" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="stop2">
        <Form.Label>Third Stop</Form.Label>
        <Form.Control placeholder="4318 Valeta St" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Other</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Ways</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Save Route?" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Route!
      </Button>
    </Form>
    </div>
  );
}

export default GridComplexExample;