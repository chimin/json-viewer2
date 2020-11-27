import React from 'react';
import './Styles.css';

export const RawViewer = (props: { json: any }) => {
  const raw = JSON.stringify(props.json, undefined, 2);
  return <div className="raw-viewer">{raw}</div>;
};
