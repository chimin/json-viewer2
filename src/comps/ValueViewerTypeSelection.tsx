import React from 'react';
import { ValueViewerType } from '../types';

export const ValueViewerTypeSelection = ({ viewerType, setViewerType }: {
  viewerType: ValueViewerType,
  setViewerType: (value: ValueViewerType) => void
}) => (
    <div className="selection-panel">
      <label className={`icon clickable ${viewerType == 'tree-view' ? 'checked' : ''}`}>
        <input type="radio" checked={viewerType == 'tree-view'} onClick={() => setViewerType('tree-view')} />
        <i className="fas fa-stream" />
      </label>
      <label className={`icon clickable ${viewerType == 'table-view' ? 'checked' : ''}`}>
        <input type="radio" checked={viewerType == 'table-view'} onClick={() => setViewerType('table-view')} />
        <i className="fas fa-table" />
      </label>
    </div>
  );
