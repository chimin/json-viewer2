import React from 'react';
import {
  formatSimpleValue, isLink, isSimpleType, summarizeComplexValue,
} from '../utils';
import { LinkableValueViewer } from './LinkableValueViewer';

export const SimpleValueViewer = ({ value }: {
  value: any
}) => (
  <>
    {
      typeof value === 'string' ?
        isLink(value) ?
          <a href={value} target="_blank" className="simple-value link clickable">{value}</a> :
          <span className="simple-value string"><LinkableValueViewer value={value} /></span> :
        isSimpleType(value) ?
          <span className="simple-value">{formatSimpleValue(value)}</span> :
          <span className="simple-value complex"><LinkableValueViewer value={summarizeComplexValue(value)} /></span>
    }
  </>
);
