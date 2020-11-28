import React from 'react';
import { isNullOrUndefined } from '../utils';
import { EmptyIndicator } from './EmptyIndicator';
import { ObjectFieldViewer } from './ObjectFieldViewer';

export const ObjectArrayViewer = (props: { json: any[], path: string, level: number, sort: boolean }) => {
  if (props.json.length == 0) {
    return <EmptyIndicator />;
  }

  const items = sortItems(props.json, props.sort);

  return (
    <>
      {items.map(item => (
        <ObjectFieldViewer
          key={item.index}
          name={item.index.toString()}
          json={item.data}
          path={`${props.path}/${item.index}`}
          level={props.level}
        />
      ))}
    </>
  );
};

function sortItems(list: any[], sort: boolean) {
  const items = list.map((item, index) => ({ data: item, index }));
  if (sort) {
    items.sort((a, b) => {
      const va = a.data;
      const vb = b.data;
      const r = !isNullOrUndefined(va) && isNullOrUndefined(vb) ? -1 :
        isNullOrUndefined(va) && !isNullOrUndefined(vb) ? 1 :
          va - vb;
      return r;
    });
  }
  return items;
}
