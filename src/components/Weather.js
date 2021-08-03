import React from 'react';

class Weather extends React.Component {
  render() {
    return(
      this.props.weather.map((day, i) => (
        <div>
          <p><h6>Day:</h6> {day.date}</p>
          <p><h6>Description:</h6> {day.description}
          <br/>____ ____ ____ </p>
        </div>
      ))
    )
  }
}

export default Weather;