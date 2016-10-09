// Your code goes here
// React is defined globally

module.exports = React.createClass({
  render: function() {
    return <p>{this.props.msg}. Your vin is: {gm.info.getVIN()}</p>;
  }
});
