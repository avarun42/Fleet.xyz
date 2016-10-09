/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import { findIndex } from 'lodash';

const DestinationChanger = require('./DestinationChanger');
const MapDisplay = require('./MapDisplay');

const panelIDs = [{
  component: MapDisplay,
  name: 'MapDisplay',
}, {
  component: DestinationChanger,
  name: 'DestinationChanger',
}];

const socket = io.connect('https://fleetxyz.azurewebsites.net', { reconnect: true });
const curPanel = findIndex(panelIDs, ['name', 'MapDisplay']);
const curComponent = panelIDs[curPanel].component;

ReactDOM.render(
  <MapDisplay socket={socket} />,
  document.getElementById('main')
);
