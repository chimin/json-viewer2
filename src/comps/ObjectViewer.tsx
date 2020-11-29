import React from 'react';
import { ObjectRowSortType, ValueViewerType } from '../types';
import { compare } from '../utils';
import { EmptyIndicator } from './EmptyIndicator';
import { ObjectRowViewer } from './ObjectRowViewer';
import { ObjectTableViewer } from './ObjectTableViewer';

export const ObjectViewer = ({
  value, path, level, viewerType, sortType,
}: {
  value: any,
  path: string,
  level: number,
  viewerType: ValueViewerType,
  sortType: ObjectRowSortType
}) => {
  const keys = getSortedKeys(value, sortType);
  if (keys.length == 0) {
    return <EmptyIndicator level={level} />;
  }

  if (viewerType == 'table-view') {
    return <ObjectTableViewer value={value} path={path} level={level} />;
  }

  return (
    <>
      {keys.map(key => <ObjectRowViewer key={key} value={value[key]} label={key} path={`${path}/${key}`} level={level} />)}
    </>
  );
};

function getSortedKeys(value: any, sortType: ObjectRowSortType) {
  if (sortType != 'default') {
    if (Array.isArray(value)) {
      return getSortedArrayKeys(value, sortType == 'desc');
    }

    return getSortedObjectKeys(value, sortType == 'desc');
  }

  return Object.keys(value);
}

function getSortedArrayKeys(value: any[], reverse: boolean) {
  return value
    .map((data, index) => ({ data, index }))
    .sort((a, b) => compare(a.data, b.data) * (reverse ? -1 : 1))
    .map(item => item.index.toString());
}

function getSortedObjectKeys(value: {}, reverse: boolean) {
  return Object.keys(value)
    .sort((a, b) => compare(a, b) * (reverse ? -1 : 1));
}
