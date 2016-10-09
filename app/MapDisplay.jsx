import React, { Component, PropTypes } from 'react';
import { omit, values } from 'lodash';

import Map from './Map';

class MapDisplay extends Component {
  constructor() {
    super();
    this.VIN = gm.info.getVIN();
    this.state = {
      isLoading: true,
      curPosition: {
        latitude: null,
        longitude: null,
        heading: null,
        altitude: null,
      },
      otherCars: [],
    };
  }

  componentWillMount() {
    const positionChanged = position => {
      this.setState({ curPosition: position.coords, isLoading: false });

      const locationToEmit = Object.assign({}, position, { VIN: gm.info.getVIN() });
      this.props.socket.emit('location', locationToEmit);
    };

    this.props.socket.on('location pack', msg => {
      const otherCars = values(omit(msg, gm.info.getVIN()));
      this.setState({ otherCars });
    });

    gm.info.getCurrentPosition(positionChanged, true);
    gm.info.watchPosition(positionChanged, true);
  }

  render() {
    const { isLoading, curPosition, otherCars } = this.state;
    const myPosition = `(${curPosition.latitude}, ${curPosition.longitude})`;
    console.log(otherCars);

    return (
      isLoading
        ? <div>Loading...</div>
        : (
        <div>
          <p>Your VIN is: {gm.info.getVIN()}. Your current location is: {myPosition}</p>
          <Map curPosition={curPosition} otherPositions={otherCars.map(car => car.coords)} />
        </div>
      )
    );
  }
}

MapDisplay.propTypes = {
  socket: PropTypes.instanceOf(io.Socket),
};

module.exports = MapDisplay;
