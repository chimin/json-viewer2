import React, { useContext, useEffect } from 'react';
import {
  buildJsonPath,
  computeNestingOffset, isEmptyObjectOrArray, isPathDescendantOf, isSimpleType, isTableType, useLastState, useLastStateBoolean,
} from '../utils';
import { ObjectViewer } from './ObjectViewer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { SimpleValueViewer } from './SimpleValueViewer';
import { ValueViewerTypeSelection } from './ValueViewerTypeSelection';
import {
  ObjectRowSortType, ValueMetadata, ValueViewerType,
} from '../types';
import { ObjectActionBullet } from './ObjectActionBullet';
import { ObjectRowSortTypeSelection } from './ObjectRowSortTypeSelection';
import { TreeActionPanel } from './TreeActionPanel';
import { TreeActionContext } from './TreeActionContext';

export const ObjectRowViewer = ({ value, valueMetadata }: {
  value: any,
  valueMetadata: ValueMetadata
}) => {
  const treeActionContext = useContext(TreeActionContext);
  const { path, label, level } = valueMetadata;
  const [isExpanded, setExpanded] = useLastStateBoolean(`${path}.isExpanded`, false);
  const [valueViewerType, setValueViewerType] = useLastState<ValueViewerType>(`${path}.valueViewerType`, 'tree-view');
  const [sortType, setSortType] = useLastState<ObjectRowSortType>(`${path}.sortType`, 'default');
  const valueIsSimpleType = isSimpleType(value);
  const valueIsTableType = !valueIsSimpleType && isTableType(value);
  const effectiveValueViewerType = valueIsTableType ? valueViewerType : 'tree-view';
  const iconPaddingLeft = `${computeNestingOffset(level)}rem`;

  useEffect(() => {
    if (isPathDescendantOf(path, treeActionContext.action?.path)) {
      switch (treeActionContext.action.type) {
        case 'collapse-all':
          if (isExpanded) {
            treeActionContext.action.registerInProgress(path);
            setExpanded(false);
          } else {
            treeActionContext.action.registerCompleted(path);
          }
          break;
        case 'expand-all':
          if (!isExpanded) {
            treeActionContext.action.registerInProgress(path);
            setExpanded(true);
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
    <div className="object-row-viewer">
      <div className="value-row highlight-on-hover">
        <ObjectActionBullet
          valueIsSimpleType={valueIsSimpleType}
          isExpanded={isExpanded}
          setExpanded={setExpanded}
          paddingLeft={iconPaddingLeft}
        />
        <span className="label" title={buildJsonPath(path)}>{label}</span>
        {
          valueIsSimpleType || !isExpanded ?
            <SimpleValueViewer value={value} /> :
            null
        }
        {
          isExpanded && !isEmptyObjectOrArray(value) ? (
            <div>
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
                    ) : null
                }
                {
                  !valueIsSimpleType ?
                    (
                      <TreeActionPanel
                        onClickCollapseAll={() => treeActionContext.triggerAction('collapse-all', path)}
                        onClickExpandAll={() => treeActionContext.triggerAction('expand-all', path)}
                      />
                    ) : null
                }
              </span>
            </div>
          ) : null
        }
      </div>
      {
        !valueIsSimpleType && isExpanded ?
          (
            <ObjectViewer
              value={value}
              valueMetadata={{ ...valueMetadata, level: level + 1 }}
              viewerType={effectiveValueViewerType}
              sortType={sortType}
            />
          ) :
          null
      }
    </div>
  );
};
