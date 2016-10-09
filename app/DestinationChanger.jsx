import React, { Component, PropTypes } from 'react';

class DestinationChanger extends Component {
  constructor() {
    super();
    this.destinationRetrieved = this.destinationRetrieved.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  destinationRetrieved(destination) {
    this.props.socket.emit('destination', destination);
    this.props.changeViewCallback('MapDisplay');
  }

  handleSubmit() {
    const getDestinationCallback = gm.nav.getDestination(this.destinationRetrieved, true);
    gm.nav.setDestination({ address: '2301 Vanderbilt Place Nashville TN 37235' }, getDestinationCallback, true);
  }

  render() {
    return (
      <div>
        <p>Would you like to share your destination with the other members of your fleet?
        Make sure you have selected a destination through the GM Nav.</p>
        <button onClick={this.handleSubmit} type="submit">OK</button>
      </div>
    );
  }
}

DestinationChanger.propTypes = {
  socket: PropTypes.instanceOf(io.Socket),
  changeViewCallback: PropTypes.func.isRequired,
};


module.exports = DestinationChanger;
