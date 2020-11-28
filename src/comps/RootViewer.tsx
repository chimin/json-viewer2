import React from 'react';
import { isSimpleType } from '../utils';
import { RootObjectViewer } from './RootObjectViewer';
import { SimpleValueViewer } from './SimpleValueViewer';

export const RootViewer = ({ value, path }: {
  value: any,
  path: string
}) => (
    <>
      {
        isSimpleType(value) ?
          <SimpleValueViewer value={value} /> :
          <RootObjectViewer value={value} path={path} />
      }
    </>
  );
