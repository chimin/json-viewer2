import React from 'react';
import ReactDOM from 'react-dom';
import { JsonViewer } from '../src/comps/JsonViewer';

const json = require('./test.json');

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
