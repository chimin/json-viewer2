import React from 'react';
import { JsonViewerType } from '../types';

export const JsonViewerHeader = ({ viewerType, setViewerType, isSwaggerJson }: {
  viewerType: JsonViewerType,
  setViewerType: (value: JsonViewerType) => void,
  isSwaggerJson: boolean,
}) => (
  <div className="app">
    <div className="json-viewer-header">
      {isSwaggerJson ? (
        <label>
          <input type="radio" checked={viewerType == 'swagger-view'} onChange={() => setViewerType('swagger-view')} />
        Swagger view
        </label>
      ) : null}
      <label>
        <input type="radio" checked={viewerType == 'tree-view'} onChange={() => setViewerType('tree-view')} />
        Tree view
      </label>
      <label>
        <input type="radio" checked={viewerType == 'pretty-print'} onChange={() => setViewerType('pretty-print')} />
        Pretty print
      </label>
      <label>
        <input type="radio" checked={viewerType == 'raw'} onChange={() => setViewerType('raw')} />
        Raw
      </label>
    </div>
  </div>
);
