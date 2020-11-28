import React from 'react';
import { ComplexValueViewer } from './ComplexValueViewer';

export const RootViewer = ({ value }: {
  value: any
}) => (
    <ComplexValueViewer value={value} path="" level={0} />
  );
