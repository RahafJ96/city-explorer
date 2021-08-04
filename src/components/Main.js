import React from 'react';
import { Container, Row, Col, } from 'react-bootstrap';
import Search from './Search';
import axios from 'axios';
import GCS from './GCS';
import Map from './Map';
import Weather from './Weather';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayError: false,
            displayMap: false,
            errorMessage: '',
            latitude: '',
            loc: '',
            longitude: '',
            searchQuery: '',
            weather: [],
        }
    }

    updateCity = (event) => {
        this.setState({ 
        searchQuery: event.target.value 
        });
    }

    displayLatLon = async () => {
        const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_MAP_KEY}&q=${this.state.searchQuery}&format=json`;
        let loc;

        try {
            loc = await axios.get(url)
            this.setState({
                loc: loc.data[0].display_name,
                latitude: loc.data[0].lat,
                longitude: loc.data[0].lon,
                displayMap: true,
                displayError: false
            });
            this.displayWeather(loc.data[0].lat, loc.data[0].lon)

        } catch (error) {
            
            this.setState({
                displayMap: false,
                displayError: true,
                errorMessage: "ERROR"
            });
        }
    }

    displayWeather = async (lat, lon) => {
        try {
            const weather = await axios.get(`http://localhost:3004/weather?searchQuery=${this.state.searchQuery}&lon=${this.state.longitude}&lat=${this.state.latitude}`);
            console.log(weather);
            this.setState({
                weather: weather.data
            })
        } catch (error) {
            this.setState({
                displayMap: false,
                displayError: true,
                errorMessage: "ERROR"
            })
        }
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Search
                            updateCity={this.updateCity}
                            displayLatLon={this.displayLatLon}
                            hasError={this.state.displayError}
                        />
                    </Col>
                </Row>
                {this.state.displayMap &&
                    <>
                        <Row>
                            <Col>
                                <GCS
                                    city={this.state.loc}
                                    lat={this.state.latitude}
                                    lon={this.state.longitude}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Map
                                    img_url={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_MAP_KEY}&center=${this.state.latitude},${this.state.longitude}&format=jpg`}
                                    city={this.state.loc}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Weather
                                    weather={this.state.weather}
                                />
                            </Col>
                        </Row>
                    </>
                }
            </Container>
        )
    }
}

export default Main;