import React from 'react';
import { isTableType } from '../utils';
import './Styles.css';
import { TableViewer } from './TableViewer';
import { ObjectFieldViewer } from './ObjectFieldViewer';

export const ObjectViewer = (props: { json: any, path: string, level: number }) => {
  const keys = Object.keys(props.json);
  if (keys.length == 0) {
    return <div className="value empty">n/a</div>;
  }

  return (
    <>
      {keys.map(key => (
        <ObjectFieldViewer
          key={key}
          name={key}
          value={props.json[key]}
          path={`${props.path}/${key}`}
          level={props.level}
        />
      ))}
    </>
  );
};
