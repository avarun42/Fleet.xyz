import React from 'react';

class DestinationChanger extends React.Component {
  render() {
    return null;
  }
}

DestinationChanger.propTypes = {
  socket: React.PropTypes.instanceOf(io.Socket),
};

module.exports = DestinationChanger;
