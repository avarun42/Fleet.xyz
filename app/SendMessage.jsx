import React, { Component, PropTypes } from 'react';

class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSubmit() {
    this.props.socket.emit('message', this.state.message);
    this.props.changeViewCallback('MapDisplay');
  }

  render() {
    return (
      <div>
        <p>Send a message to the other members of your Fleet: <input type="text" onChange={this.handleChange} /></p>
        <button onClick={this.handleSubmit} type="submit">Submit</button>
      </div>
    );
  }
}

SendMessage.propTypes = {
  socket: PropTypes.instanceOf(io.Socket),
  changeViewCallback: PropTypes.func.isRequired,
};

module.exports = SendMessage;
