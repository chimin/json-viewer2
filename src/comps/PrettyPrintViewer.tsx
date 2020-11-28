import React from 'react';
import './Styles.css';

export const PrettyPrintViewer = (props: { json: any }) => {
  const raw = JSON.stringify(props.json, undefined, 2);
  return <div className="pretty-print-viewer">{raw}</div>;
};
