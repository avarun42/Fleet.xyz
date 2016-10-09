import React, {Component} from 'react';
import otherCar from '../src/car-compact.svg';
import myCar from '../src/my-car.svg';

import GoogleMap from 'google-map-react';

const K_WIDTH = 40;
const K_HEIGHT = 40;

const imageMarkerStyle = {
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  textAlign: 'center',
  padding: 4
};

export default class Map extends Component {

  render() {
    const {longitude, latitude} = this.props.curPosition;
    const coordinates = [longitude, latitude];

    const {otherPositions} = this.props;
    let otherCars = [];
    Object.keys(otherPositions).forEach(position => {
      otherCars.push(
        <img src={otherCar}
             style={imageMarkerStyle}
             lat={position.coordinates.latitude}
             lng={position.coordinates.longitude}/>
      );
    });

    return (
      <div className="map" style={{width: "100%", height: "1000px"}}>
        <GoogleMap
          center={coordinates}
          zoom={9}
          onGoogleApiLoaded={({map, maps}) => console.log('Map:', map, 'Maps:', maps)}>

          {/* Icon made by http://www.flaticon.com/authors/freepik from flatiron.com */}
          <img src={myCar} style={imageMarkerStyle} lat={latitude} lng={longitude}/>

          {otherCars.length ? otherCars : null}

        </GoogleMap>
      </div>
    );
  }
}

Map.propTypes = {
  curPosition: {
    latitude: React.PropTypes.number.isRequired,
    longitude: React.PropTypes.number.isRequired
  },
  otherPositions: React.PropTypes.object.isRequired
};
