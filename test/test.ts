import React from "react";
import ReactDOM from "react-dom";
import { JsonViewer } from "../src/comps/JsonViewer";

const json = require('./test.json');

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(React.createElement(JsonViewer, { json }), container);
