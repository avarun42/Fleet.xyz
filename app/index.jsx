/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

const App = require('./app');

const socket = io.connect('https://fleetxyz.azurewebsites.net', { reconnect: true });

ReactDOM.render(
  <App msg="Hello MHacks" socket={socket} />,
  document.getElementById('main')
);
