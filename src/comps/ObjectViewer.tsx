import React from 'react';
import { ObjectRowSortType, ValueMetadata, ValueViewerType } from '../types';
import { compare } from '../utils';
import { EmptyIndicator } from './EmptyIndicator';
import { ObjectRowViewer } from './ObjectRowViewer';
import { ObjectTableViewer } from './ObjectTableViewer';

export const ObjectViewer = ({
  value, valueMetadata, viewerType, sortType,
}: {
  value: any,
  valueMetadata: ValueMetadata,
  viewerType: ValueViewerType,
  sortType: ObjectRowSortType
}) => {
  const { path } = valueMetadata;

  const keys = getSortedKeys(value, sortType);
  if (keys.length == 0) {
    return <EmptyIndicator valueMetadata={valueMetadata} />;
  }

  if (viewerType == 'table-view') {
    return <ObjectTableViewer value={value} valueMetadata={valueMetadata} />;
  }

  return (
    <>
      {
        keys.map(key => (
          <ObjectRowViewer
            key={key}
            value={value[key]}
            valueMetadata={{ ...valueMetadata, path: path.concat(key), label: key }}
          />
        ))
      }
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
