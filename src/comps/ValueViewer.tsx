import React from 'react';
import { formatValue } from '../utils';
import './Styles.css';

export const ValueViewer = (props: { value: any }) => {
  if (typeof props.value === 'string') {
    if (props.value.match(/https?:\/\//)) {
      return (
        <span className="value">
          <a href={props.value} target="_blank">{props.value}</a>
        </span>
      );
    }

    return (
      <span className="value string">{props.value}</span>
    );
  }

  return (
    <span className="value">{formatValue(props.value)}</span>
  );
};