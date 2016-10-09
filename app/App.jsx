import React, { PropTypes, Component } from 'react';
import { findIndex } from 'lodash';

const ButtonNav = require('./ButtonNav');
const DestinationChanger = require('./DestinationChanger');
const MapDisplay = require('./MapDisplay');
const SendMessage = require('./SendMessage');

class App extends Component {
  constructor() {
    super();

    this.changeView = this.changeView.bind(this);

    const socket = io.connect('https://fleetxyz.azurewebsites.net', { reconnect: true });
    socket.on('message', msg => gm.ui.showAlert({
      alertTitle: 'New Message from your Fleet!',
      alertDetail: msg,
      primaryButtonText: 'Reply to fleet',
      primaryAction: this.changeView('SendMessage'),
      secondaryButtonText: 'View Map',
      secondaryAction: this.changeView('MapDisplay'),
      thirdButtonText: 'Dismiss',
    }));

    this.panelConfig = [{
      component: <MapDisplay socket={socket} />,
      name: 'MapDisplay',
    }, {
      component: <DestinationChanger socket={socket} />,
      name: 'DestinationChanger',
    }, {
      component: <SendMessage socket={socket} changeViewCallback={this.changeView} />,
      name: 'SendMessage',
    }];

    // Display Map at beginning
    this.state = { curComponent: this.panelConfig[findIndex(this.panelConfig, ['name', 'MapDisplay'])].component };
  }

  changeView(panelName) {
    const curPanel = findIndex(this.panelConfig, ['name', panelName]);
    this.setState({ curComponent: this.panelConfig[curPanel].component });
  }

  render() {
    return (
      <div>
        {this.state.curComponent}
        <ButtonNav changeViewCallback={this.changeView} />
      </div>
    );
  }
}

App.propTypes = {
  socket: PropTypes.instanceOf(io.Socket),
};

module.exports = App;
