import React from 'react';
import { isValueType, useLastStateBoolean } from '../utils';
import { ObjectViewer } from './ObjectViewer';
import './Styles.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { ValueViewer } from './ValueViewer';
import { SimplifiedOjectViewer } from './SimplifiedObjectViewer';

export const ObjectFieldViewer = (props: { name: string, value: any, path: string }) => {
  const [isExpanded, setExpanded] = useLastStateBoolean(`${props.path}.isExpanded`, false);
  const valueType = isValueType(props.value);

  return (
    <>
      <div className="object-field-viewer">
        <span className="name">
          {!valueType ?
            (isExpanded ?
              <i className="fas fa-chevron-down clickable" onClick={() => setExpanded(false)} /> :
              <i className="fas fa-chevron-right clickable" onClick={() => setExpanded(true)} />) :
            <i className="far fa-circle" />}
          {props.name}
        </span>
        {valueType ? <ValueViewer value={props.value} /> :
          !isExpanded ? <SimplifiedOjectViewer json={props.value} path={props.path} /> :
            null}
      </div>
      {!valueType && isExpanded ? (
        <div className="object-inner-viewer">
          <ObjectViewer json={props.value} path={props.path} />
        </div>
      ) : null}
    </>
  );
};
