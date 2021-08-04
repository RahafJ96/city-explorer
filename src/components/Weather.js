import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import {Col,Container,Row} from 'react-bootstrap';



class Weather extends React.Component {

  render() {
    return (
      <>

        {
          this.props.showCard && this.props.weather.map(element => {
            return (
              <Container fluid="md">
                <Row >
                  <Col>
              <Card className="text-center" >
                <Card.Body>
                  <Card.Title>{element.date}</Card.Title>
                  <Card.Text>{element.description}</Card.Text>
                </Card.Body>
              </Card>
              </Col>
                </Row>
                </Container>

            )
          })
        }


      </>
    )
  }


}

export default Weather;