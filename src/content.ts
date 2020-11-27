import React from 'react';
import ReactDOM from 'react-dom';
import { JsonViewer } from './comps/JsonViewer';

format();

function format() {
    const json = getJson();
    if (!json) {
        return;
    }

    const container = document.createElement('div');
    document.body.innerHTML = '';
    document.body.appendChild(container);
    ReactDOM.render(React.createElement(JsonViewer, { json }), container);
}

function getJson() {
    if (document.body.firstElementChild && document.body.firstElementChild == document.body.lastElementChild && document.body.firstElementChild.tagName == 'PRE') {
        const content = document.body.firstElementChild.textContent;
        if (content.match(/^[{\[]/)) {
            try {
                return JSON.parse(content);
            } catch {
                // ignore error
            }
        }
    }
    return undefined;
}
