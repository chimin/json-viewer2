import React from 'react';
import { formatValue } from '../utils';
import './Styles.css';

export const ValueViewer = (props: { value: any }) => (
  <span className={typeof props.value === 'string' ? 'value string' : 'value'}>
    {formatValue(props.value)}
  </span>
);
