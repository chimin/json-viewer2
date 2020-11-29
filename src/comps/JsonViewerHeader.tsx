import React from 'react';
import { JsonViewerType } from '../types';

export const JsonViewerHeader = ({ viewerType, setViewerType }: {
  viewerType: JsonViewerType,
  setViewerType: (value: JsonViewerType) => void
}) => (
    <div className="json-viewer-header">
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
  );
