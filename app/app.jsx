import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.curLocation = null;
  }

  componentWillMount() {
    this.curLocation = gm.info.getCurrentPosition();
  }

  render() {
    return (
      <h1>{this.props.msg}. Your VIN is: {gm.info.getVIN()}</h1>
    );
  }
}

App.propTypes = {
  msg: React.PropTypes.string,
};

module.exports = App;
