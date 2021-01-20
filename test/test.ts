import React from 'react';
import ReactDOM from 'react-dom';
import { JsonViewer } from '../src/comps/JsonViewer';

require('../src/comps/Styles.scss').default.use();
require('../node_modules/@fortawesome/fontawesome-free/css/all.min.css').default.use();

const json = require('./swagger.json');

const hidden = document.createElement('div');
hidden.textContent = '...';
hidden.style.display = 'none';
document.body.appendChild(hidden);

const raw = document.createElement('pre');
raw.style.cssText = 'word-wrap: break-word; white-space: pre-wrap;';
raw.textContent = JSON.stringify(json);

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(React.createElement(JsonViewer, { json, raw }), container);
