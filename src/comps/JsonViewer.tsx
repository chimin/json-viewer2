import React from 'react';
import { JsonShowType } from '../types';
import { useLastState } from '../utils';
import { RootViewer } from './RootViewer';
import { JsonViewerHeader } from './JsonViewerHeader';
import { PrettyPrintViewer } from './PrettyPrintViewer';
import { RawViewer } from './RawViewer';

export const JsonViewer = ({ json, raw }: {
  json: any,
  raw: HTMLElement,
}) => {
  const [showType, setShowType] = useLastState<JsonShowType>('jsonShowType', 'raw');

  return (
    <div className="json-viewer">
      <JsonViewerHeader showType={showType} setShowType={setShowType} />
      <div className="body">
        {
          showType == 'tree-view' ? <RootViewer value={json} /> :
            showType == 'pretty-print' ? <PrettyPrintViewer json={json} /> :
              showType == 'raw' ? <RawViewer raw={raw} /> :
                null
        }
      </div>
    </div>
  );
};
