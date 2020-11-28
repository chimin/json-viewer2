import React from 'react';
import { computeNestingOffset } from '../utils';

export const EmptyIndicator = ({ level }: {
  level: number
}) => {
  const paddingLeft = `${computeNestingOffset(level)}rem`;

  return (
    <div className="highlight-on-hover" style={{ paddingLeft }}>-- empty --</div>
  );
};
