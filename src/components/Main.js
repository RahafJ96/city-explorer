import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';
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
            displayErr: false

        }
    }

    getLocationData = async (event) => {
        event.preventDefault();

        let cityName = event.target.city.value;
        //  console.log(cityName);

        let URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${cityName}&format=json`;

        try {

            let locResult = await axios.get(URL);  // send req to locationIQ API
            // console.log(locResult.data[0].display_name, locResult.data[0].type);

            this.setState({
                displayName: locResult.data[0].display_name,
                lat: locResult.data[0].lat,
                lon: locResult.data[0].lon,
                showMap: true,

            })
        }

        catch {
            this.setState({
                // displayMap:false,
                displayErr: true,

            })
        }

    }



    render() {
        return (
            <>
                <div>
                    <h1>
                        City Explorer
                    </h1>
                    <Form onSubmit={this.getLocationData}>
                        <Row className="align-items-center">
                            <Col sm={3} className="my-1">
                                <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
                                    City Name:
                                </Form.Label>
                                <Form.Control id="inlineFormInputName" placeholder="Enter City" name='city' />
                            </Col>
                            <Col xs="auto" className="my-1">
                                <Button type="submit">Get Location</Button>
                            </Col>
                        </Row>
                    </Form>

                    <p>
                        {this.state.displayName}
                    </p>

                    {
                        this.state.showMap && <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${this.state.lat},${this.state.lon}& zoom=18`} alt="map" />
                    }

                    {
                        this.state.displayErr && this.state.errMsg
                    }


                </div>
            </>
        )
    }
}

export default Main;