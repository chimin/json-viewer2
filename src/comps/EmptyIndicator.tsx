import React from 'react';
import { ValueMetadata } from '../types';
import { computeNestingOffset } from '../utils';

export const EmptyIndicator = ({ valueMetadata: { level } }: {
  valueMetadata: ValueMetadata
}) => {
  const paddingLeft = `${computeNestingOffset(level)}rem`;

  return (
    <div className="empty-indicator highlight-on-hover" style={{ paddingLeft }}>-- empty --</div>
  );
};
