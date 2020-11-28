import React from 'react';
import { EmptyIndicator } from './EmptyIndicator';
import { ObjectRowViewer } from './ObjectRowViewer';

export const ObjectViewer = ({ value, path, level }: {
  value: any,
  path: string,
  level: number
}) => {
  const keys = Object.keys(value);
  if (keys.length == 0) {
    return <EmptyIndicator level={level} />;
  }

  return (
    <>
      {keys.map(key => <ObjectRowViewer key={key} value={value[key]} label={key} path={path} level={level} />)}
    </>
  );
};
