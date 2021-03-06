import React, { PropTypes, Component } from 'react';
import GoogleMap from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';

const K_WIDTH = 40;
const K_HEIGHT = 40;

const imageMarkerStyle = {
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  textAlign: 'center',
  padding: 4,
};

class Map extends Component {
  render() {
    const { longitude, latitude } = this.props.curPosition;
    const coordinates = [latitude, longitude];

    const { otherPositions } = this.props;
    const otherCars = [];
    let [minLat, maxLat, minLng, maxLng] = [100, 0, 100, 0];


    otherPositions.forEach((position, i) => {

      if (position.latitude < minLat) {
        minLat = position.latitude;
      } else if (position.latitude > maxLat) {
        maxLat = position.latitude;
      } else if (position.longitude < minLng) {
        minLng = position.longitude;
      } else if (position.longitude > maxLng) {
        maxLng = position.longitude;
      }

      otherCars.push(
        <img
          alt="Fleet Car"
          src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDQ3LjY0NSA0NDcuNjQ1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NDcuNjQ1IDQ0Ny42NDU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNDQ3LjYzOSwyNDQuNDAyYzAtOC44MDUtMS45ODgtMTcuMjE1LTUuNTc4LTI0LjkwOWMtMC4zNy0xLjk1Ni0wLjc5My0zLjkwOS0xLjMyMi01Ljg5bC0zOC44ODQtOTYuMzY1bC0wLjI2My0wLjg2NyAgIGMtMTMuNjA1LTQwLjUwOS0zMi45NjMtNzguMDAxLTgyLjA0OS03OC4wMDFIMTMxLjg2OGMtNTAuMjk2LDAtNjguMDY5LDM4LjQyMS04MS45NzIsNzcuNzc2bC00MC42NzMsOTYuNiAgIEMzLjM0MywyMjIuMTY3LDAsMjMyLjk0NCwwLDI0NC40MDJ2MjkuOTg2YzAsNC42MzYsMC41NDgsOS4xNzEsMS41OSwxMy41MzlDMC41NzcsMjkwLjU2NiwwLDI5My40MSwwLDI5Ni40MDh2ODkuMTg1ICAgYzAsMTMuMDc4LDEwLjYwMiwyMy42ODIsMjMuNjgsMjMuNjgyaDQ5LjE0YzEzLjA3MSwwLDIzLjY3My0xMC42MDQsMjMuNjczLTIzLjY4MnYtNDQuNTk5aDI1Ny40NnY0NC41OTkgICBjMCwxMy4wNzgsMTAuNjA0LDIzLjY4MiwyMy42ODMsMjMuNjgyaDQ2LjMyNmMxMy4wODMsMCwyMy42ODMtMTAuNjA0LDIzLjY4My0yMy42ODJ2LTg5LjE5NWMwLTIuOTg3LTAuNTgzLTUuODQ0LTEuNTg4LTguNDc0ICAgYzEuMDM4LTQuMzc1LDEuNTg4LTguOTA1LDEuNTg4LTEzLjU0di0yOS45ODFINDQ3LjYzOXogTTc4Ljc1NCwxMjUuODIxYzE1LjQ4My00My42ODMsMjcuOTM0LTU3LjAxOCw1My4xMTQtNTcuMDE4aDE4Ny42NjQgICBjMjQuOTk1LDAsMzguOTEzLDE0Ljg3Myw1My4wNTYsNTYuODNsMjguMzc1LDU3LjUwMmMtOS4yNjUtMy40MzEtMTkuNDYxLTUuMzM1LTMwLjE3My01LjMzNUg3Ni44NDkgICBjLTkuNjQ1LDAtMTguODYyLDEuNTUxLTI3LjM2Niw0LjM1OEw3OC43NTQsMTI1LjgyMXogTTEwMy4xMjksMjg1Ljc3Nkg1MS4yODFjLTkuMzM1LDAtMTYuOTA2LTcuNTc4LTE2LjkwNi0xNi45MTIgICBjMC05LjMzNyw3LjU3MS0xNi45MSwxNi45MDYtMTYuOTFoNTEuODQ4YzkuMzM5LDAsMTYuOTEsNy41NzMsMTYuOTEsMTYuOTFDMTIwLjAzOSwyNzguMTk4LDExMi40NjMsMjg1Ljc3NiwxMDMuMTI5LDI4NS43NzZ6ICAgIE0yODYuMjg0LDI4Mi4zODloLTEyMC42Yy01LjkxMywwLTEwLjcwNC00Ljc5NC0xMC43MDQtMTAuNzA0YzAtNS45MjEsNC43OTEtMTAuNzEzLDEwLjcwNC0xMC43MTNoMTIwLjYgICBjNS45MiwwLDEwLjcxLDQuNzkyLDEwLjcxLDEwLjcxM0MyOTYuOTk0LDI3Ny41OTUsMjkyLjIwNCwyODIuMzg5LDI4Ni4yODQsMjgyLjM4OXogTTM5NS4wNTEsMjg1Ljc3NmgtNTEuODQ2ICAgYy05LjM0MywwLTE2LjkxLTcuNTc4LTE2LjkxLTE2LjkxMmMwLTkuMzM3LDcuNTczLTE2LjkxLDE2LjkxLTE2LjkxaDUxLjg0NmM5LjM0MywwLDE2LjkxNiw3LjU3MywxNi45MTYsMTYuOTEgICBDNDExLjk2NywyNzguMTk4LDQwNC4zOTQsMjg1Ljc3NiwzOTUuMDUxLDI4NS43NzZ6IiBmaWxsPSIjMDA2REYwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="
          key={i}
          style={imageMarkerStyle}
          lat={position.latitude}
          lng={position.longitude}
        />
      );
    });

    // Formatting map bounds
    const bounds = {
      nw: {
        lat: maxLat,
        lng: minLng
      },
      se: {
        lat: minLat,
        lng: maxLng
      }
    };

    const size = {
      width: 800,
      height: 300
    };
    const {center, zoom} = fitBounds(bounds, size);

    return (
      <div className="map" style={{ width: '100%', height: '300px' }}>
        <GoogleMap
          center={center}
          zoom={zoom}
        >

          {/* Icon made by http://www.flaticon.com/authors/freepik from flatiron.com */}
          <img
            alt="My Car"
            src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDQ3LjY0NSA0NDcuNjQ1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NDcuNjQ1IDQ0Ny42NDU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNDQ3LjYzOSwyNDQuNDAyYzAtOC44MDUtMS45ODgtMTcuMjE1LTUuNTc4LTI0LjkwOWMtMC4zNy0xLjk1Ni0wLjc5My0zLjkwOS0xLjMyMi01Ljg5bC0zOC44ODQtOTYuMzY1bC0wLjI2My0wLjg2NyAgIGMtMTMuNjA1LTQwLjUwOS0zMi45NjMtNzguMDAxLTgyLjA0OS03OC4wMDFIMTMxLjg2OGMtNTAuMjk2LDAtNjguMDY5LDM4LjQyMS04MS45NzIsNzcuNzc2bC00MC42NzMsOTYuNiAgIEMzLjM0MywyMjIuMTY3LDAsMjMyLjk0NCwwLDI0NC40MDJ2MjkuOTg2YzAsNC42MzYsMC41NDgsOS4xNzEsMS41OSwxMy41MzlDMC41NzcsMjkwLjU2NiwwLDI5My40MSwwLDI5Ni40MDh2ODkuMTg1ICAgYzAsMTMuMDc4LDEwLjYwMiwyMy42ODIsMjMuNjgsMjMuNjgyaDQ5LjE0YzEzLjA3MSwwLDIzLjY3My0xMC42MDQsMjMuNjczLTIzLjY4MnYtNDQuNTk5aDI1Ny40NnY0NC41OTkgICBjMCwxMy4wNzgsMTAuNjA0LDIzLjY4MiwyMy42ODMsMjMuNjgyaDQ2LjMyNmMxMy4wODMsMCwyMy42ODMtMTAuNjA0LDIzLjY4My0yMy42ODJ2LTg5LjE5NWMwLTIuOTg3LTAuNTgzLTUuODQ0LTEuNTg4LTguNDc0ICAgYzEuMDM4LTQuMzc1LDEuNTg4LTguOTA1LDEuNTg4LTEzLjU0di0yOS45ODFINDQ3LjYzOXogTTc4Ljc1NCwxMjUuODIxYzE1LjQ4My00My42ODMsMjcuOTM0LTU3LjAxOCw1My4xMTQtNTcuMDE4aDE4Ny42NjQgICBjMjQuOTk1LDAsMzguOTEzLDE0Ljg3Myw1My4wNTYsNTYuODNsMjguMzc1LDU3LjUwMmMtOS4yNjUtMy40MzEtMTkuNDYxLTUuMzM1LTMwLjE3My01LjMzNUg3Ni44NDkgICBjLTkuNjQ1LDAtMTguODYyLDEuNTUxLTI3LjM2Niw0LjM1OEw3OC43NTQsMTI1LjgyMXogTTEwMy4xMjksMjg1Ljc3Nkg1MS4yODFjLTkuMzM1LDAtMTYuOTA2LTcuNTc4LTE2LjkwNi0xNi45MTIgICBjMC05LjMzNyw3LjU3MS0xNi45MSwxNi45MDYtMTYuOTFoNTEuODQ4YzkuMzM5LDAsMTYuOTEsNy41NzMsMTYuOTEsMTYuOTFDMTIwLjAzOSwyNzguMTk4LDExMi40NjMsMjg1Ljc3NiwxMDMuMTI5LDI4NS43NzZ6ICAgIE0yODYuMjg0LDI4Mi4zODloLTEyMC42Yy01LjkxMywwLTEwLjcwNC00Ljc5NC0xMC43MDQtMTAuNzA0YzAtNS45MjEsNC43OTEtMTAuNzEzLDEwLjcwNC0xMC43MTNoMTIwLjYgICBjNS45MiwwLDEwLjcxLDQuNzkyLDEwLjcxLDEwLjcxM0MyOTYuOTk0LDI3Ny41OTUsMjkyLjIwNCwyODIuMzg5LDI4Ni4yODQsMjgyLjM4OXogTTM5NS4wNTEsMjg1Ljc3NmgtNTEuODQ2ICAgYy05LjM0MywwLTE2LjkxLTcuNTc4LTE2LjkxLTE2LjkxMmMwLTkuMzM3LDcuNTczLTE2LjkxLDE2LjkxLTE2LjkxaDUxLjg0NmM5LjM0MywwLDE2LjkxNiw3LjU3MywxNi45MTYsMTYuOTEgICBDNDExLjk2NywyNzguMTk4LDQwNC4zOTQsMjg1Ljc3NiwzOTUuMDUxLDI4NS43NzZ6IiBmaWxsPSIjMTc1YzEzIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="
            style={imageMarkerStyle}
            lat={latitude}
            lng={longitude}
          />

          {otherCars}

        </GoogleMap>
      </div>
    );
  }
}

Map.propTypes = {
  curPosition: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
  otherPositions: PropTypes.arrayOf(PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  })),
};

module.exports = Map;
