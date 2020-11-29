import React, { useContext, useEffect } from 'react';
import {
 ObjectRowSortType, ValueMetadata, ValueViewerType,
} from '../types';
import {
 isEmptyObjectOrArray, isPathStartsWith, isTableType, useLastState, useLastStateBoolean,
} from '../utils';
import { ObjectActionBullet } from './ObjectActionBullet';
import { ObjectRowSortTypeSelection } from './ObjectRowSortTypeSelection';
import { ObjectViewer } from './ObjectViewer';
import { SimpleValueViewer } from './SimpleValueViewer';
import { TreeActionContext } from './TreeActionContext';
import { TreeActionPanel } from './TreeActionPanel';
import { ValueViewerTypeSelection } from './ValueViewerTypeSelection';

export const RootObjectViewer = ({ value, valueMetadata }: {
  value: any,
  valueMetadata: ValueMetadata
}) => {
  const treeActionContext = useContext(TreeActionContext);
  const { path } = valueMetadata;
  const [isExpanded, setExpanded] = useLastStateBoolean(`${path}.isExpanded`, false);
  const [valueViewerType, setValueViewerType] = useLastState<ValueViewerType>(`${path}.valueViewerType`, 'tree-view');
  const [sortType, setSortType] = useLastState<ObjectRowSortType>(`${path}.sortType`, 'default');
  const valueIsTableType = isTableType(value);
  const effectiveValueViewerType = valueIsTableType ? valueViewerType : 'tree-view';

  useEffect(() => {
    if (isPathStartsWith(path, treeActionContext.action?.path)) {
      switch (treeActionContext.action.type) {
        case 'collapse-all':
          if (isExpanded) {
            setExpanded(false);
            treeActionContext.action.registerInProgress(path);
          } else {
            treeActionContext.action.registerCompleted(path);
          }
          break;
        case 'expand-all':
          if (!isExpanded) {
            setExpanded(true);
            treeActionContext.action.registerInProgress(path);
          } else {
            treeActionContext.action.registerCompleted(path);
          }
          break;
        default:
          break;
      }
    }
  }, [treeActionContext.action, isExpanded]);

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
          isExpanded && !isEmptyObjectOrArray(value) ? (
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
              <TreeActionPanel
                onClickCollapseAll={() => treeActionContext.triggerAction('collapse-all', path)}
                onClickExpandAll={() => treeActionContext.triggerAction('expand-all', path)}
              />
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
