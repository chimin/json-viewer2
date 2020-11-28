import React from 'react';
import { isTableType, isValueType, useLastState, useLastStateBoolean } from '../utils';
import { ObjectViewer } from './ObjectViewer';
import './Styles.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { ValueViewer } from './ValueViewer';
import { SimplifiedOjectViewer } from './SimplifiedObjectViewer';
import { ArrayToolbar } from './ArrayToolbar';
import { ArrayShowType } from '../types';
import { TableViewer } from './TableViewer';

export const ObjectFieldViewer = (props: { name: string, value: any, path: string, level: number }) => {
  const [isExpanded, setExpanded] = useLastStateBoolean(`${props.path}.isExpanded`, false);
  const [arrayShowType, setArrayShowType] = useLastState<ArrayShowType>(`${props.path}.arrayShowType`, 'list');
  const valueType = isValueType(props.value);
  const tableType = isTableType(props.value);
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
        <span style={{ paddingRight: `${sidePositionOffset}rem` }}>
          {valueType ? <ValueViewer value={props.value} /> :
            !isExpanded ? <SimplifiedOjectViewer json={props.value} /> :
              tableType ? <ArrayToolbar showType={arrayShowType} setShowType={setArrayShowType} /> :
                null}
        </span>
      </div>
      {
        !valueType && isExpanded ? (
          <div className="object-inner-viewer">
            {
              tableType && arrayShowType == 'table' ?
                <TableViewer json={props.value} path={props.path} /> :
                <ObjectViewer json={props.value} path={props.path} level={props.level + 1} />
            }
          </div>
        ) : null
      }
    </>
  );
};
