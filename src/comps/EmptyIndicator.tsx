import React from 'react';
import { ValueMetadata } from '../types';
import { NestingPadding } from './NestingPadding';

export const EmptyIndicator = ({ valueMetadata: { level } }: {
  valueMetadata: ValueMetadata
}) => (
  <div className="empty-indicator highlight-on-hover">
    <NestingPadding level={level} />
    -- empty --
  </div>
);
