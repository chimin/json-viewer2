import React from 'react';
import { ValueViewerType } from '../types';
import { isTableType, useLastState, useLastStateBoolean } from '../utils';
import { ObjectActionBullet } from './ObjectActionBullet';
import { ObjectViewer } from './ObjectViewer';
import { SimpleValueViewer } from './SimpleValueViewer';
import { ValueViewerTypeSelection } from './ValueViewerTypeSelection';

export const RootObjectViewer = ({ value, path }: {
  value: any,
  path: string
}) => {
  const [isExpanded, setExpanded] = useLastStateBoolean(`${path}.isExpanded`, false);
  const [valueViewerType, setValueViewerType] = useLastState<ValueViewerType>(`${path}.valueViewerType`, 'tree-view');
  const valueIsTableType = isTableType(value);

  return (
    <div className="root-object-viewer">
      <div className="header-row highlight-on-hover">
        <ObjectActionBullet
          valueIsSimpleType={false}
          isExpanded={isExpanded}
          setExpanded={setExpanded}
          paddingLeft=".5rem"
        />
        {
          !isExpanded ?
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
        isExpanded ?
          (
            <div>
              <ObjectViewer
                value={value}
                path={path}
                level={0}
                viewerType={valueIsTableType ? valueViewerType : 'tree-view'}
              />
            </div>
          ) :
          null
      }
    </div>
  );
};
