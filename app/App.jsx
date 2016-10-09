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

    const socket = io.connect('https://b22a83f5.ngrok.io', { reconnect: true });
    socket.on('message', msg => {
      // gm.ui.showAlert({
      //   alertTitle: 'New Message from your Fleet!',
      //   alertDetail: msg,
      //   primaryButtonText: 'Reply to fleet',
      //   primaryAction: this.changeView('SendMessage'),
      //   secondaryButtonText: 'View Map',
      //   secondaryAction: this.changeView('MapDisplay'),
      //   thirdButtonText: 'Dismiss',
      // });
      if (confirm(`New message from your fleet: ${msg}\n\nWould you like to respond?`)) this.changeView('SendMessage');
    });
    socket.on('destination', dest => {
      // gm.ui.showAlert({
      //   alertTitle: 'Your fleet leader has chosen to share his destination with you!',
      //   alertDetail: dest,
      //   primaryButtonText: 'Follow the leader',
      //   primaryAction: gm.nav.setDestination(dest, true),
      //   secondaryButtonText: 'View Map',
      //   secondaryAction: this.changeView('MapDisplay'),
      //   thirdButtonText: 'Dismiss',
      // });
      if (confirm(`Your fleet leader has chosen to share his destination with you: ${dest.address}\n\nWould you like to follow?`)) gm.nav.setDestination(dest, true);
    });

    this.panelConfig = [{
      component: <MapDisplay socket={socket} />,
      name: 'MapDisplay',
    }, {
      component: <DestinationChanger socket={socket} changeViewCallback={this.changeView} />,
      name: 'DestinationChanger',
    }, {
      component: <SendMessage socket={socket} changeViewCallback={this.changeView} />,
      name: 'SendMessage',
    }];

    // Display Map at beginning
    this.state = {
      curComponent: this.panelConfig[findIndex(this.panelConfig, ['name', 'MapDisplay'])].component,
      leaderDestination: null,
    };

    socket.on('destination', dest => {
      this.setState({ leaderDestination: dest });
    });
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
