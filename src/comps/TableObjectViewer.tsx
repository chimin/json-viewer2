import React from 'react';
import { useLastStateBoolean } from '../utils';
import { ObjectViewer } from './ObjectViewer';
import { SimplifiedOjectViewer } from './SimplifiedObjectViewer';

export const TableObjectViewer = (props: { json: any, path: string }) => {
  const [isExpanded, setExpanded] = useLastStateBoolean(`${props.path}.isExpanded`, false);

  return (
    <div className="table-object-viewer">
      <div className="button">
        {isExpanded ?
          <i className="fas fa-chevron-down clickable" onClick={() => setExpanded(false)} /> :
          <i className="fas fa-chevron-right clickable" onClick={() => setExpanded(true)} />}
        {!isExpanded ? <SimplifiedOjectViewer json={props.json} /> : null}
      </div>
      {isExpanded ? <ObjectViewer json={props.json} path={props.path} /> : null}
    </div>
  );
};
