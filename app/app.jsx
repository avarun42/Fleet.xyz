import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.curLocation = null;
  }

  componentWillMount() {
    gm.info.getCurrentPosition(position => {
      this.curLocation = position;
    }, true);
  }

  render() {
    return (
      <div>
        <h1>{this.props.msg}. Your VIN is: {gm.info.getVIN()}</h1>
        <p>Your current location is: {this.curLocation}</p>
      </div>
    );
  }
}

App.propTypes = {
  msg: React.PropTypes.string,
};

module.exports = App;
