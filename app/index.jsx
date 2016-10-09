/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

const App = require('./app');

ReactDOM.render(
  <App msg="test" />,
  document.getElementById('main')
);
