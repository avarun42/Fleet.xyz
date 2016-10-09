/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

const App = require('./app');

ReactDOM.render(
  <App msg="Hello MHacks" />,
  document.getElementById('main')
);
