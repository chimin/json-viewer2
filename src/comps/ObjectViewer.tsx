import React from 'react';
import { ValueViewerType } from '../types';
import { EmptyIndicator } from './EmptyIndicator';
import { ObjectRowViewer } from './ObjectRowViewer';
import { ObjectTableViewer } from './ObjectTableViewer';

export const ObjectViewer = ({
  value, path, level, viewerType,
}: {
  value: any,
  path: string,
  level: number,
  viewerType: ValueViewerType
}) => {
  const keys = Object.keys(value);
  if (keys.length == 0) {
    return <EmptyIndicator level={level} />;
  }

  if (viewerType == 'table-view') {
    return <ObjectTableViewer value={value} path={path} level={level} />;
  }

  return (
    <>
      {keys.map(key => <ObjectRowViewer key={key} value={value[key]} label={key} path={path} level={level} />)}
    </>
  );
};
