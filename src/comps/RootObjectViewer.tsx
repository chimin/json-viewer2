import React from 'react';
import { ObjectRowSortType, ValueMetadata, ValueViewerType } from '../types';
import { isTableType, useLastState, useLastStateBoolean } from '../utils';
import { ObjectActionBullet } from './ObjectActionBullet';
import { ObjectRowSortTypeSelection } from './ObjectRowSortTypeSelection';
import { ObjectViewer } from './ObjectViewer';
import { SimpleValueViewer } from './SimpleValueViewer';
import { ValueViewerTypeSelection } from './ValueViewerTypeSelection';

export const RootObjectViewer = ({ value, valueMetadata }: {
  value: any,
  valueMetadata: ValueMetadata
}) => {
  const { path } = valueMetadata;
  const [isExpanded, setExpanded] = useLastStateBoolean(`${path}.isExpanded`, false);
  const [valueViewerType, setValueViewerType] = useLastState<ValueViewerType>(`${path}.valueViewerType`, 'tree-view');
  const [sortType, setSortType] = useLastState<ObjectRowSortType>(`${path}.sortType`, 'default');
  const valueIsTableType = isTableType(value);
  const effectiveValueViewerType = valueIsTableType ? valueViewerType : 'tree-view';

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
          isExpanded ? (
            <span className="toolbar">
              {
                valueIsTableType ?
                  <ValueViewerTypeSelection viewerType={valueViewerType} setViewerType={setValueViewerType} /> :
                  null
              }
              {
                effectiveValueViewerType == 'tree-view' ?
                  (
                    <ObjectRowSortTypeSelection
                      sortType={sortType}
                      setSortType={setSortType}
                      field={Array.isArray(value) ? 'value' : 'label'}
                    />
                  ) :
                  null
              }
            </span>
          ) : null
        }
      </div>
      {
        isExpanded ?
          (
            <div>
              <ObjectViewer
                value={value}
                valueMetadata={{ ...valueMetadata, level: 0 }}
                viewerType={effectiveValueViewerType}
                sortType={sortType}
              />
            </div>
          ) :
          null
      }
    </div>
  );
};
