import React, { useState } from 'react';
import { getLastState, setLastState } from '../utils';
import { ObjectViewer } from './ObjectViewer';
import { SimplifiedOjectViewer } from './SimplifiedObjectViewer';

export const TableObjectViewer = (props: { json: any, path: string }) => {
  const [isExpanded, setExpanded] = useState(getLastState(`${props.path}.isExpanded`) == '1');

  const updateExpanded = value => {
    setExpanded(value);
    setLastState(`${props.path}.isExpanded`, value ? '1' : '0');
  };

  return (
    <div className="table-object-viewer">
      <div className={isExpanded ? 'button expanded' : 'button'}>
        {isExpanded ?
          <i className="fas fa-chevron-down clickable" onClick={() => updateExpanded(false)} /> :
          <i className="fas fa-chevron-right clickable" onClick={() => updateExpanded(true)} />}
        {!isExpanded ? <SimplifiedOjectViewer json={props.json} path={props.path} /> : null}
      </div>
      {isExpanded ? <ObjectViewer json={props.json} path={props.path} /> : null}
    </div>
  );
};
