import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Map from './components/Map';
import Weather from './components/Weather';
import Movies from './components/Movies';

class App extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      displayName: '',
      lon: '',
      lat: '',
      errorMsg: 'Bad Response',
      displayErr: false,
      showMap: false,
      showCard: false,
      weather: [],
      movies: []
    }

  }





  getLocationData = async (event) => {
    event.preventDefault();
    const city = event.target.city.value;

    const URL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${city}&format=json`;
    try {

      let locationResult = await axios.get(URL)
      this.setState({
        displayName: locationResult.data[0].display_name,
        lon: locationResult.data[0].lon,
        lat: locationResult.data[0].lat,
        showMap: true,
        displayErr: false,
      })

      const urlServer = `http://localhost:3010/getWeather?lat=${this.state.lat}&lon=${this.state.lon}&cityName=${city}`
      let weatherResult = await axios.get(urlServer)
      this.setState({
        weather: weatherResult.data,
        showCard: true
      })
      const urlMovies = `http://localhost:3010/movies?city=${city}`
      let moviesResult = await axios.get(urlMovies)
      this.setState({
        movies: moviesResult.data
      })
    }
    catch {
      this.setState({
        showMap: false,
        displayErr: true,
        showCard: false
      }
      )
    }

    // let URL = `${process.env.REACT_APP_SERVER_URL}/weather?lat=${this.state.lat}&lon=${this.state.lon}&searchQuery=city`;
    let weatherData = await axios.get(URL);
    this.setState({
      weatherInfoArr: weatherData.data
    })
    console.log(weatherData);
  }
  render() {
    return (
      <>
        <Header/>

        <Form onSubmit={this.getLocationData} className="text-center formSet">
          <Form.Label className='seachLabel'><h4>Search for a City here: </h4></Form.Label>
          <input className="inputButton" type='text' placeholder='Enter City' name='city' />
          <button className="buttonSearch btn-primary text-white btn-lg" type='submit'>Explore!</button>
        </Form>

        <Map
          displayName={this.state.displayName}
          lon={this.state.lon}
          lat={this.state.lat}
          showMap={this.state.showMap}
          displayErr={this.state.displayErr}
          errorMsg={this.state.errorMsg}
          showCard={this.state.showCard}

        />
        <Weather showCard={this.state.showCard} weather={this.state.weather} ></Weather>
        <Movies showCard={this.state.showCard} movies={this.state.movies} ></Movies>
        <Footer/>
      </>

    )

  }
}

export default App;