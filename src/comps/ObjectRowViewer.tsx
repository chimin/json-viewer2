import React from 'react';
import {
  computeNestingOffset, isSimpleType, useLastStateBoolean,
} from '../utils';
import { ObjectViewer } from './ObjectViewer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ObjectRowValueViewer } from './ObjectRowValueViewer';

export const ObjectRowViewer = ({
  value, label, path, level,
}: {
  value: any,
  label: string,
  path: string,
  level: number
}) => {
  const [isExpanded, setExpanded] = useLastStateBoolean(`${path}.isExpanded`, false);
  const valueIsSimpleType = isSimpleType(value);
  const iconPaddingLeft = `${computeNestingOffset(level)}rem`;

  return (
    <div className="object-row-viewer">
      <div className="value-row highlight-on-hover">
        {
          valueIsSimpleType ?
            (
              <span className="icon" style={{ paddingLeft: iconPaddingLeft }}>
                <i className="far fa-circle" />
              </span>
            ) :
            isExpanded ?
              (
                <span className="icon clickable" style={{ paddingLeft: iconPaddingLeft }} onClick={() => setExpanded(false)}>
                  <i className="fas fa-chevron-down" />
                </span>
              ) :
              (
                <span className="icon clickable" style={{ paddingLeft: iconPaddingLeft }} onClick={() => setExpanded(true)}>
                  <i className="fas fa-chevron-right" />
                </span>
              )
        }
        <span className="label">{label}</span>
        {
          valueIsSimpleType || !isExpanded ?
            <ObjectRowValueViewer value={value} /> :
            null
        }
      </div>
      {
        !valueIsSimpleType && isExpanded ?
          <ObjectViewer value={value} path={`${path}/${label}`} level={level + 1} /> :
          null
      }
    </div>
  );
};
