import React from 'react';
import {Form,Button,Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

class Search extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.displayLatLon();
  }

  render() {
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="cityName">
          <Form.Label>Search for City:</Form.Label>
          <Form.Control onChange={this.props.updateCity} type="text" placeholder="Enter a City" />
        </Form.Group>
        {this.props.hasError && 
          <>
            <Alert variant="danger">
              <strong className="mr-auto">Error {' '}</strong>
            </Alert>
          </>
        }
        <br/>
        
        <Button className="buttonSearch btn-outline-primary text-white btn-lg" variant="dark" type="submit">Explore!</Button>
  
      </Form>
    )
  }
}

export default Search;