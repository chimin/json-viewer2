import React from 'react';
import { ArrayShowType } from '../types';
import { isTableType, useLastState, useLastStateBoolean } from '../utils';
import { ArrayToolbar } from './ArrayToolbar';
import { ObjectViewer } from './ObjectViewer';
import { SimplifiedOjectViewer } from './SimplifiedObjectViewer';
import { SortToolbar } from './SortToolbar';
import { TableViewer } from './TableViewer';

export const TableObjectViewer = (props: { json: any, path: string }) => {
  const [isExpanded, setExpanded] = useLastStateBoolean(`${props.path}.isExpanded`, false);
  const [arrayShowType, setArrayShowType] = useLastState<ArrayShowType>(`${props.path}.arrayShowType`, 'list');
  const [objectSort, setObjectSort] = useLastStateBoolean(`${props.path}.objectSort`, false);
  const tableType = isTableType(props.json);

  return (
    <div className="table-object-viewer">
      <div className="header">
        {isExpanded ?
          (
            <span className="button clickable" onClick={() => setExpanded(false)}>
              <i className="fas fa-chevron-down clickable" />
            </span>
          ) :
          (
            <span className="button clickable" onClick={() => setExpanded(true)}>
              <i className="fas fa-chevron-right clickable" />
            </span>
          )}
        <span>
          {!isExpanded ? <SimplifiedOjectViewer json={props.json} /> :
            tableType ? <ArrayToolbar showType={arrayShowType} setShowType={setArrayShowType} /> :
              (
                <span className="toolbar">
                  <SortToolbar sort={objectSort} setSort={setObjectSort} />
                </span>
              )}
        </span>
      </div>
      {isExpanded ? (
        tableType && arrayShowType == 'table' ?
          <TableViewer json={props.json} path={props.path} /> :
          <ObjectViewer json={props.json} path={props.path} level={0} sort={objectSort} />
      ) : null}
    </div>
  );
};
