import React from 'react';
import { ArrayShowType } from '../types';
import { isTableType, useLastState, useLastStateBoolean } from '../utils';
import { ArrayToolbar } from './ArrayToolbar';
import { ObjectViewer } from './ObjectViewer';
import { SortToolbar } from './SortToolbar';
import { TableViewer } from './TableViewer';

export const RootViewer = (props: { json: any }) => {
  const [arrayShowType, setArrayShowType] = useLastState<ArrayShowType>('arrayShowType', 'list');
  const [objectSort, setObjectSort] = useLastStateBoolean('objectSort', false);
  const tableType = isTableType(props.json);

  return (
    <div className="root-viewer">
      <div>
        {
          tableType ?
            <ArrayToolbar showType={arrayShowType} setShowType={setArrayShowType} /> :
            (
              <span className="toolbar">
                <SortToolbar sort={objectSort} setSort={setObjectSort} />
              </span>
            )
        }
      </div>
      <div>
        {
          tableType && arrayShowType == 'table' ?
            <TableViewer json={props.json} path="" /> :
            <ObjectViewer json={props.json} path="" level={0} sort={objectSort} />
        }
      </div>
    </div>
  );
};
