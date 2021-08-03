import React from 'react';
import Image from 'react-bootstrap/Image';

class Map extends React.Component {
  render() {
    return(
        <section className="text-center">
        <Image  src={this.props.img_url} alt={this.props.city} title={this.props.city}   />
    </section>
    )
  }
}

export default Map;