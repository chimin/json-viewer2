import React from 'react';
import ReactDOM from 'react-dom';
import { JsonViewer } from '../src/comps/JsonViewer';
import { checkShouldBeSwaggerYaml, parseYaml } from '../src/utils';

require('../src/comps/Styles.scss').default.use();
require('../node_modules/@fortawesome/fontawesome-free/css/all.min.css').default.use();

// const rawContent = require('./test.json').default;

// const json = checkShouldBeSwaggerYaml(rawContent) ? parseYaml(rawContent) : undefined;
// if (!json) {
//   throw new Error('invalid raw content');
// }

const json = require('./test.json');
const rawContent = JSON.stringify(json);

const hidden = document.createElement('div');
hidden.textContent = '...';
hidden.style.display = 'none';
document.body.appendChild(hidden);

const raw = document.createElement('pre');
raw.style.cssText = 'word-wrap: break-word; white-space: pre-wrap;';
raw.textContent = rawContent;

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(React.createElement(JsonViewer, { json, raw }), container);
