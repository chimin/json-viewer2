import React from 'react';
import { prettyPrintJson } from '../utils';
import './Styles.scss';

export const PrettyPrintViewer = ({ json }: {
  json: any
}) => (
    <div className="pretty-print-viewer">{prettyPrintJson(json)}</div>
  );
