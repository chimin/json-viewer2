import React from 'react';
import { JsonShowType } from '../types';

export const JsonViewerHeader = ({ showType, setShowType }: {
  showType: JsonShowType,
  setShowType: (value: JsonShowType) => void
}) => (
    <div className="json-viewer-header">
      <label>
        <input type="radio" checked={showType == 'tree-view'} onClick={() => setShowType('tree-view')} />
        Tree view
      </label>
      <label>
        <input type="radio" checked={showType == 'pretty-print'} onClick={() => setShowType('pretty-print')} />
        Pretty print
      </label>
      <label>
        <input type="radio" checked={showType == 'raw'} onClick={() => setShowType('raw')} />
        Raw
      </label>
    </div>
  );
