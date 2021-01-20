import React, { useMemo, useState } from 'react';
import {
  defaultValueMetadata, JsonViewerType, TreeAction, TreeActionType,
} from '../types';
import { checkIsSwaggerJson, useLastState } from '../utils';
import { RootViewer } from './RootViewer';
import { JsonViewerHeader } from './JsonViewerHeader';
import { PrettyPrintViewer } from './PrettyPrintViewer';
import { RawViewer } from './RawViewer';
import { TreeActionContext } from './TreeActionContext';
import { SwaggerViewer } from './SwaggerViewer';

export const JsonViewer = ({ json, raw }: {
  json: any,
  raw: HTMLElement,
}) => {
  const [action, setAction] = useState<TreeAction>();
  const [viewerType, setViewerType] = useLastState<JsonViewerType>('jsonViewerType', 'raw');
  const isSwaggerJson = useMemo(() => checkIsSwaggerJson(json), [json]);

  const triggerAction = async (actionType: TreeActionType, path: string[]): Promise<void> => new Promise(resolve => {
    const states: Record<string, boolean> = {};
    setAction({
      type: actionType,
      path,
      registerInProgress: targetPath => {
        states[JSON.stringify(targetPath)] = false;
      },
      registerCompleted: targetPath => {
        states[JSON.stringify(targetPath)] = true;
        if (Object.values(states).every(s => s)) {
          setAction(undefined);
          resolve();
        }
      },
    });
  });

  const stopAction = () => {
    setAction(undefined);
  };

  return (
    <div className="json-viewer">
      <JsonViewerHeader viewerType={viewerType} setViewerType={setViewerType} isSwaggerJson={isSwaggerJson} />
      <div className="body">
        {
          viewerType == 'swagger-view' ? (
            <SwaggerViewer json={json} />
          ) : viewerType == 'tree-view' ? (
            <TreeActionContext.Provider value={{ action, triggerAction, stopAction }}>
              <div className="app">
                <RootViewer value={json} valueMetadata={defaultValueMetadata} />
              </div>
            </TreeActionContext.Provider>
          ) : viewerType == 'pretty-print' ? (
            <div className="app">
              <PrettyPrintViewer json={json} />
            </div>
          ) : viewerType == 'raw' ? (
            <div className="app">
              <RawViewer raw={raw} />
            </div>
          ) : null
        }
      </div>
    </div>
  );
};
