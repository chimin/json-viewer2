import React from 'react';
import { ValueMetadata } from '../types';
import { isSimpleType } from '../utils';
import { RootObjectViewer } from './RootObjectViewer';
import { SimpleValueViewer } from './SimpleValueViewer';

export const RootViewer = ({ value, valueMetadata }: {
  value: any,
  valueMetadata: ValueMetadata
}) => (
    <>
      {
        value === undefined || value === null ?
          null :
          isSimpleType(value) ?
            <SimpleValueViewer value={value} /> :
            <RootObjectViewer value={value} valueMetadata={valueMetadata} />
      }
    </>
  );
