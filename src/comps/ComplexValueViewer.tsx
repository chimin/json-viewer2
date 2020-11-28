import React from 'react';
import { ObjectViewer } from './ObjectViewer';

export const ComplexValueViewer = ({ value, path, level }: {
  value: any,
  path: string,
  level: number
}) => (
    <ObjectViewer value={value} path={path} level={level} />
  );
