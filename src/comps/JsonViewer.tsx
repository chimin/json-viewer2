import React, { useState } from 'react';
import {
  defaultValueMetadata, JsonViewerType, TreeAction, TreeActionType,
} from '../types';
import { useLastState } from '../utils';
import { RootViewer } from './RootViewer';
import { JsonViewerHeader } from './JsonViewerHeader';
import { PrettyPrintViewer } from './PrettyPrintViewer';
import { RawViewer } from './RawViewer';
import { TreeActionContext } from './TreeActionContext';

export const JsonViewer = ({ json, raw }: {
  json: any,
  raw: HTMLElement,
}) => {
  const [action, setAction] = useState<TreeAction>();
  const [viewerType, setViewerType] = useLastState<JsonViewerType>('jsonViewerType', 'raw');

  const triggerAction = async (actionType: TreeActionType, path: string[]): Promise<void> => new Promise(resolve => {
    const states: Record<string, boolean> = {};
    const stateKey = JSON.stringify(path);
    setAction({
      type: actionType,
      path,
      registerInProgress: targetPath => {
        states[stateKey] = false;
      },
      registerCompleted: targetPath => {
        states[stateKey] = true;
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
      <JsonViewerHeader viewerType={viewerType} setViewerType={setViewerType} />
      <div className="body">
        {
          viewerType == 'tree-view' ? (
            <TreeActionContext.Provider value={{ action, triggerAction, stopAction }}>
              <RootViewer value={json} valueMetadata={defaultValueMetadata} />
            </TreeActionContext.Provider>
          ) :
            viewerType == 'pretty-print' ? <PrettyPrintViewer json={json} /> :
              viewerType == 'raw' ? <RawViewer raw={raw} /> :
                null
        }
      </div>
    </div>
  );
};
