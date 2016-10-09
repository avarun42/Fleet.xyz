import React, { Component, PropTypes } from 'react';
import { omit } from 'lodash';

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
      otherPositions: {},
    };
  }

  componentWillMount() {
    const positionChanged = position => {
      this.setState({ curPosition: position.coords, isLoading: false });

      const locationToEmit = Object.assign({}, position, { VIN: this.VIN });
      this.props.socket.emit('location', locationToEmit);
    };

    this.props.socket.on('location pack', msg => {
      this.setState({ otherPositions: new Map(omit(msg, this.VIN)) });
    });

    gm.info.getCurrentPosition(positionChanged, true);
    gm.info.watchPosition(positionChanged, true);
  }

  render() {
    const { isLoading, curPosition, otherPositions } = this.state;
    const myPosition = `(${curPosition.latitude}, ${curPosition.longitude})`;

    return (
      isLoading
        ? <div>Loading...</div>
        : (
        <div>
          <p>Your VIN is: {this.VIN}</p>
          <p>Your current location is: {myPosition}</p>
          <Map curPosition={curPosition} otherPositions={Array.from(otherPositions)} />
        </div>
      )
    );
  }
}

MapDisplay.propTypes = {
  socket: PropTypes.instanceOf(io.Socket),
};

module.exports = MapDisplay;
