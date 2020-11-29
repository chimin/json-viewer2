import React from 'react';
import { defaultValueMetadata, JsonViewerType } from '../types';
import { useLastState } from '../utils';
import { RootViewer } from './RootViewer';
import { JsonViewerHeader } from './JsonViewerHeader';
import { PrettyPrintViewer } from './PrettyPrintViewer';
import { RawViewer } from './RawViewer';

export const JsonViewer = ({ json, raw }: {
  json: any,
  raw: HTMLElement,
}) => {
  const [viewerType, setViewerType] = useLastState<JsonViewerType>('jsonViewerType', 'raw');

  return (
    <div className="json-viewer">
      <JsonViewerHeader viewerType={viewerType} setViewerType={setViewerType} />
      <div className="body">
        {
          viewerType == 'tree-view' ? <RootViewer value={json} valueMetadata={defaultValueMetadata} /> :
            viewerType == 'pretty-print' ? <PrettyPrintViewer json={json} /> :
              viewerType == 'raw' ? <RawViewer raw={raw} /> :
                null
        }
      </div>
    </div>
  );
};
