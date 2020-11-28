import React from 'react';
import { useLastStateBoolean } from '../utils';
import { ObjectViewer } from './ObjectViewer';
import { SimplifiedOjectViewer } from './SimplifiedObjectViewer';

export const TableObjectViewer = (props: { json: any, path: string }) => {
  const [isExpanded, setExpanded] = useLastStateBoolean(`${props.path}.isExpanded`, false);

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
          {!isExpanded ? <SimplifiedOjectViewer json={props.json} /> : null}
        </span>
      </div>
      {isExpanded ? <ObjectViewer json={props.json} path={props.path} level={0} /> : null}
    </div>
  );
};
