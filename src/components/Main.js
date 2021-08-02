import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import App from '../App';
// import './App.css';


class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            lat: '',
            lon: '',
            showMap: false,
            errMsg: 'Unable to Geocode !! ',
            displayErr: false,
            showInfo: false

        }
        console.log(this.state.showInfo);
    }

    getLocationData = async (event) => {
        event.preventDefault();

        let cityName = event.target.city.value;
        //  console.log(cityName);

        let URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${cityName}&format=json`;

        try {

            let locResult = await axios.get(URL);

            this.setState({
                displayName: locResult.data[0].display_name,
                lat: locResult.data[0].lat,
                lon: locResult.data[0].lon,
                showMap: true,
                showInfo: true,

            })
        }

        catch {
            this.setState({
                // displayMap:false,
                displayErr: true,

            })
        }

    }

    // getShow=()=>{
    //     this.setState({
    //         showInfo=true,

    //     })
    // }



    render() {
        return (
            <>
                <div>
                    <h1>
                        City Explorer
                    </h1>
                    <Form onSubmit={this.getLocationData}>
                        <Row className="align-items-center">
                            <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
                                City Name:
                            </Form.Label>
                            <Col sm={3} className="my-1">
                                <Form.Control id="inlineFormInputName" placeholder="Enter City" name='city' />
                            </Col>
                            <Col xs="auto" className="my-1">
                                <Button type="submit">Explore!</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Card onChange={this.getLocationData} showInfo={this.state.showInfo}>
                        
                        <Card.Body>
                            <h4>{this.state.displayName}</h4>
                            <h6>Latitude:</h6>{this.state.lat} <h6>Longitude:</h6>{this.state.lon}<br/>
                    {
                        this.state.showMap && <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${this.state.lat},${this.state.lon}& zoom=18`} alt="map" />
                    }
                    {
                        this.state.displayErr && this.state.errMsg
                    }
                        </Card.Body>
                    </Card>

                    <p>

                    </p>




                </div>
            </>
        )
    }
}

export default Main;