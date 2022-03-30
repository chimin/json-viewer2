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
      isSimpleType(value) ?
        <span className="simple-value string"><LinkableValueViewer value={formatSimpleValue(value)} /></span> :
        <span className="simple-value complex"><LinkableValueViewer value={summarizeComplexValue(value)} /></span>
    }
  </>
);
