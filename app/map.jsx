import React, {Component} from 'react';
import otherCar from './car-compact.svg';
import myCar from './my-car.svg';

import GoogleMap from 'google-map-react';

const K_WIDTH = 40;
const K_HEIGHT = 40;

const circularMarkerStyle = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,

    border: '5px solid #f44336',
    borderRadius: K_HEIGHT,
    backgroundColor: 'white',
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
};

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

    constructor(props) {
        super(props);
        this.state = {
            baseLat: 59.955413,
            baseLng: 30.337844
        };
    }

    render() {

        return (
            <div className="map" style={{width: "100%", height: "1000px"}}>
                <GoogleMap
                    center={[59.938043, 30.337157]}
                    zoom={9}
                    onGoogleApiLoaded={({map, maps}) => console.log('Map:', map, 'Maps:', maps)}>

                    {/* Icon made by http://www.flaticon.com/authors/freepik from flatiron.com */}
                    <img src={myCar} style={imageMarkerStyle} lat={this.state.baseLat} lng={this.state.baseLng}/>

                </GoogleMap>
            </div>
        );
    }
}