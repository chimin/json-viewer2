import React from 'react';
import ReactDOM from 'react-dom';
import { JsonViewer } from './comps/JsonViewer';
import {
 parseJson, parseNdjson, parseYaml, checkShouldBeJsonObject, checkShouldBeSwaggerYaml,
} from './utils';

setup();

function getRawElement() {
  if (document.body.firstElementChild &&
    document.body.firstElementChild == document.body.lastElementChild &&
    document.body.firstElementChild.tagName == 'PRE'
  ) {
    return document.body.firstElementChild;
  }
  return undefined;
}

function setup() {
  const raw = getRawElement();
  if (!raw) {
    return;
  }

  const json = checkShouldBeJsonObject(raw.textContent) ? parseJson(raw.textContent) || parseNdjson(raw.textContent) :
    checkShouldBeSwaggerYaml(raw.textContent) ? parseYaml(raw.textContent) :
      undefined;
  if (!json) {
    return;
  }

  require('./comps/Styles.scss').default.use();
  require('../node_modules/@fortawesome/fontawesome-free/css/all.min.css').default.use();

  const container = document.createElement('div');
  document.body.innerHTML = '';
  document.body.appendChild(container);
  ReactDOM.render(React.createElement(JsonViewer, { json, raw }), container);
}
