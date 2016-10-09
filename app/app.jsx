class App extends React.PureComponent {
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
