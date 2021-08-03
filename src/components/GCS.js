import React from 'react';

class LatLon extends React.Component {
  render() {
    return(
      <>
        <br/>
        <h4 className="text-center">Welcome to {this.props.city}</h4>
        <p className="text-center">{this.props.city} is located at {this.props.lat} by {this.props.lon}</p>
      </>
    )
  }
}

export default LatLon;