import React from 'react';
import {
 formatSimpleValue, isLink, isSimpleType, summarizeComplexValue,
} from '../utils';

export const ObjectRowValueViewer = ({ value }: {
  value: any
}) => (
    <>
      {
        typeof value === 'string' ?
          isLink(value) ?
            <a href={value} target="_blank" className="value link">{value}</a> :
            <span className="value string">{value}</span> :
          isSimpleType(value) ?
            <span className="value">{formatSimpleValue(value)}</span> :
            <span className="value complex">{summarizeComplexValue(value)}</span>
      }
    </>
  );
