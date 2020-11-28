import React from 'react';
import './Styles.css';
import { ObjectFieldViewer } from './ObjectFieldViewer';
import { ObjectArrayViewer } from './ObjectArrayViewer';
import { EmptyIndicator } from './EmptyIndicator';

export const ObjectViewer = (props: { json: any, path: string, level: number, sort: boolean }) => {
  if (Array.isArray(props.json)) {
    return (
      <ObjectArrayViewer
        json={props.json}
        path={props.path}
        level={props.level}
        sort={props.sort}
      />
    );
  }

  const keys = Object.keys(props.json);
  if (keys.length == 0) {
    return <EmptyIndicator />;
  }

  if (props.sort) {
    keys.sort();
  }

  return (
    <>
      {keys.map(key => (
        <ObjectFieldViewer
          key={key}
          name={key}
          json={props.json[key]}
          path={`${props.path}/${key}`}
          level={props.level}
        />
      ))}
    </>
  );
};
