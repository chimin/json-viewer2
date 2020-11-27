import React, { useState } from 'react';
import { getLastState, isValueType, setLastState } from '../utils';
import { ObjectViewer } from './ObjectViewer';
import './Styles.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { ValueViewer } from './ValueViewer';

export const ObjectFieldViewer = (props: { name: string, value: any, path: string }) => {
  const [isExpanded, setExpanded] = useState(getLastState(`${props.path}.isExpanded`) == '1');
  const valueType = isValueType(props.value);

  const updateExpanded = value => {
    setExpanded(value);
    setLastState(`${props.path}.isExpanded`, value ? '1' : '0');
  };

  return (
    <>
      <div className="object-field-viewer">
        <span className="name">
          {!valueType ?
            (isExpanded ?
              <i className="fas fa-chevron-down clickable" onClick={() => updateExpanded(false)} /> :
              <i className="fas fa-chevron-right clickable" onClick={() => updateExpanded(true)} />) :
            <i className="far fa-circle" />}
          {props.name}
        </span>
        {valueType ? <ValueViewer value={props.value} /> : null}
      </div>
      {!valueType && isExpanded ? (
        <div className="object-inner-viewer">
          <ObjectViewer json={props.value} path={props.path} />
        </div>
      ) : null}
    </>
  );
};
