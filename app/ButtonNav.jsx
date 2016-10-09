import React, { PropTypes, Component } from 'react';

class ButtonNav extends Component {
  componentWillMount() {
    const { changeViewCallback } = this.props;

    this.destinationChangerCallback = () => changeViewCallback('DestinationChanger');
    this.messageSenderCallback = () => changeViewCallback('SendMessage');
    this.mapDisplayCallback = () => changeViewCallback('MapDisplay');
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.destinationChangerCallback}>Choose Destination</button>
        <button type="button" onClick={this.messageSenderCallback}>Send Message</button>
        <button type="button" onClick={this.mapDisplayCallback}>Map</button>
      </div>
    );
  }
}

ButtonNav.propTypes = {
  changeViewCallback: PropTypes.func.isRequired,
};

module.exports = ButtonNav;
