import React from 'react';
import {
  computeNestingOffset, isSimpleType, isTableType, useLastState, useLastStateBoolean,
} from '../utils';
import { ObjectViewer } from './ObjectViewer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { SimpleValueViewer } from './SimpleValueViewer';
import { ValueViewerTypeSelection } from './ValueViewerTypeSelection';
import { ValueViewerType } from '../types';
import { ObjectActionBullet } from './ObjectActionBullet';

export const ObjectRowViewer = ({
  value, label, path, level,
}: {
  value: any,
  label: string,
  path: string,
  level: number
}) => {
  const [isExpanded, setExpanded] = useLastStateBoolean(`${path}.isExpanded`, false);
  const [valueViewerType, setValueViewerType] = useLastState<ValueViewerType>(`${path}.valueViewerType`, 'tree-view');
  const valueIsSimpleType = isSimpleType(value);
  const valueIsTableType = !valueIsSimpleType && isTableType(value);
  const iconPaddingLeft = `${computeNestingOffset(level)}rem`;

  return (
    <div className="object-row-viewer">
      <div className="value-row highlight-on-hover">
        <ObjectActionBullet
          valueIsSimpleType={valueIsSimpleType}
          isExpanded={isExpanded}
          setExpanded={setExpanded}
          paddingLeft={iconPaddingLeft}
        />
        <span className="label">{label}</span>
        {
          valueIsSimpleType || !isExpanded ?
            <SimpleValueViewer value={value} /> :
            null
        }
        {
          valueIsTableType && isExpanded ?
            (
              <span className="toolbar">
                <ValueViewerTypeSelection viewerType={valueViewerType} setViewerType={setValueViewerType} />
              </span>
            ) :
            null
        }
      </div>
      {
        !valueIsSimpleType && isExpanded ?
          (
            <ObjectViewer
              value={value}
              path={`${path}/${label}`}
              level={level + 1}
              viewerType={valueIsTableType ? valueViewerType : 'tree-view'}
            />
          ) :
          null
      }
    </div>
  );
};
