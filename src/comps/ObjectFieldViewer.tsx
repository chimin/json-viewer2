import React from 'react';
import {
 isTableType, isValueType, useLastState, useLastStateBoolean,
} from '../utils';
import { ObjectViewer } from './ObjectViewer';
import './Styles.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { ValueViewer } from './ValueViewer';
import { SimplifiedOjectViewer } from './SimplifiedObjectViewer';
import { ArrayToolbar } from './ArrayToolbar';
import { ArrayShowType } from '../types';
import { TableViewer } from './TableViewer';
import { SortToolbar } from './SortToolbar';

export const ObjectFieldViewer = (props: { name: string, json: any, path: string, level: number }) => {
  const [isExpanded, setExpanded] = useLastStateBoolean(`${props.path}.isExpanded`, false);
  const [arrayShowType, setArrayShowType] = useLastState<ArrayShowType>(`${props.path}.arrayShowType`, 'list');
  const [objectSort, setObjectSort] = useLastStateBoolean(`${props.path}.sort`, false);
  const valueType = isValueType(props.json);
  const tableType = isTableType(props.json);
  const sidePositionOffset = 0.7;
  const leftPositionOffset = sidePositionOffset + 1.1 * props.level;

  return (
    <>
      <div
        className="object-field-viewer"
        style={{
          marginLeft: `-${leftPositionOffset}rem`,
          marginRight: `-${sidePositionOffset}rem`,
        }}
      >
        {!valueType ?
          (isExpanded ?
            (
              <span
                className="button clickable"
                style={{ paddingLeft: `${leftPositionOffset}rem` }}
                onClick={() => setExpanded(false)}
              >
                <i className="fas fa-chevron-down " />
              </span>
            ) :
            (
              <span
                className="button clickable"
                style={{ paddingLeft: `${leftPositionOffset}rem` }}
                onClick={() => setExpanded(true)}
              >
                <i className="fas fa-chevron-right " />
              </span>
            )) :
          (
            <span
              className="button"
              style={{ paddingLeft: `${leftPositionOffset}rem` }}
            >
              <i className="far fa-circle" />
            </span>
          )}
        <span className="name">
          {props.name}
        </span>
        {valueType ?
          (
            <span style={{ paddingRight: `${sidePositionOffset}rem` }}>
              <ValueViewer value={props.json} />
            </span>
          ) :
          !isExpanded ?
            (
              <span style={{ paddingRight: `${sidePositionOffset}rem` }}>
                <SimplifiedOjectViewer json={props.json} />
              </span>
            ) :
            tableType ? (
              <span style={{ paddingRight: `${sidePositionOffset}rem`, alignSelf: 'center' }}>
                <ArrayToolbar showType={arrayShowType} setShowType={setArrayShowType} />
              </span>
            ) :
              (
                <span style={{ paddingRight: `${sidePositionOffset}rem`, alignSelf: 'center' }}>
                  <SortToolbar sort={objectSort} setSort={setObjectSort} />
                </span>
              )}
      </div>
      {
        !valueType && isExpanded ? (
          <div className="object-inner-viewer">
            {
              tableType && arrayShowType == 'table' ?
                <TableViewer json={props.json} path={props.path} /> :
                <ObjectViewer json={props.json} path={props.path} level={props.level + 1} sort={objectSort} />
            }
          </div>
        ) : null
      }
    </>
  );
};
