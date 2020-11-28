import React from 'react';
import ReactDOM from 'react-dom';
import { JsonViewer } from './comps/JsonViewer';

setup();

function getJsonElement() {
  if (document.body.firstElementChild &&
    document.body.firstElementChild == document.body.lastElementChild &&
    document.body.firstElementChild.tagName == 'PRE'
  ) {
    const content = document.body.firstElementChild.textContent;
    if (content.match(/^[{[]/)) {
      return document.body.firstElementChild;
    }
  }
  return undefined;
}

function parseJson(raw: Element) {
  try {
    return JSON.parse(raw.textContent);
  } catch {
    return undefined;
  }
}

function setup() {
  const raw = getJsonElement();
  if (!raw) {
    return;
  }

  const json = parseJson(raw);
  if (!json) {
    return;
  }

  const container = document.createElement('div');
  document.body.innerHTML = '';
  document.body.appendChild(container);
  ReactDOM.render(React.createElement(JsonViewer, { json, raw }), container);
}
