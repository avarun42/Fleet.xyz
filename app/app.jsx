import React from 'react';
import {omit} from 'lodash';
import Map from './map';

class App extends React.Component {
    constructor() {
        super();
        this.VIN = gm.info.getVIN();
        this.state = {
            curPosition: {
                latitude: null,
                longitude: null,
                heading: null,
                altitude: null,
            },
            otherLocations: {},
        };
    }

    componentWillMount() {
        const positionChanged = position => {
            this.setState({curPosition: position.coords});

            const locationToEmit = Object.assign({}, position, {VIN: this.VIN});
            this.props.socket.emit('location', locationToEmit);
        };

        this.props.socket.on('location pack', msg => {
            this.setState({otherLocations: omit(msg, this.VIN)});
        });

        gm.info.getCurrentPosition(positionChanged, true);
        gm.info.watchPosition(positionChanged, true);
    }

    render() {
        const curPosition = `(${this.state.curPosition.latitude}, ${this.state.curPosition.longitude})`;

        return (
            <div>
                <h1>{this.props.msg}. Your VIN is: {this.VIN}</h1>
                <p>Your current location is: {curPosition}</p>
                <Map curPosition={this.state.curPosition}/>
            </div>
        );
    }
}

App.propTypes = {
    msg: React.PropTypes.string,
    socket: React.PropTypes.instanceOf(io.Socket),
};

module.exports = App;
