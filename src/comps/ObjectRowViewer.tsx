import React from 'react';
import {
  computeNestingOffset, isSimpleType, isTableType, useLastState, useLastStateBoolean,
} from '../utils';
import { ObjectViewer } from './ObjectViewer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { SimpleValueViewer } from './SimpleValueViewer';
import { ValueViewerTypeSelection } from './ValueViewerTypeSelection';
import { ObjectRowSortType, ValueViewerType } from '../types';
import { ObjectActionBullet } from './ObjectActionBullet';
import { ObjectRowSortTypeSelection } from './ObjectRowSortTypeSelection';

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
  const [sortType, setSortType] = useLastState<ObjectRowSortType>(`${path}.sortType`, 'default');
  const valueIsSimpleType = isSimpleType(value);
  const valueIsTableType = !valueIsSimpleType && isTableType(value);
  const effectiveValueViewerType = valueIsTableType ? valueViewerType : 'tree-view';
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
          isExpanded ? (
            <span className="toolbar">
              {
                valueIsTableType ?
                  <ValueViewerTypeSelection viewerType={valueViewerType} setViewerType={setValueViewerType} /> :
                  null
              }
              {
                !valueIsSimpleType && effectiveValueViewerType == 'tree-view' ?
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
        !valueIsSimpleType && isExpanded ?
          (
            <ObjectViewer
              value={value}
              path={path}
              level={level + 1}
              viewerType={effectiveValueViewerType}
              sortType={sortType}
            />
          ) :
          null
      }
    </div>
  );
};
