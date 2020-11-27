import React from 'react';
import { formatSimplifiedObject } from '../utils';

export const SimplifiedOjectViewer = (props: { json: any, path: string }) => (
  <span className="value simplified">{formatSimplifiedObject(props.json)}</span>
);
