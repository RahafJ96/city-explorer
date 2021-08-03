import React from 'react';

class Weather extends React.Component {
  render() {
    return(
      this.props.weather.map((item) => (
        <div>
          <p><h6>Date:</h6> {item.date}</p>
          <p><h6>Description:</h6> {item.description}
          <br/>____ ____ ____ </p>
        </div>
      ))
    )
  }
}

export default Weather;