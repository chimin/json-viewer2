import React from 'react';
import { ValueViewerType } from '../types';

export const ValueViewerTypeSelection = ({ viewerType, setViewerType }: {
  viewerType: ValueViewerType,
  setViewerType: (value: ValueViewerType) => void
}) => (
    <div className="selection-panel">
      <label>
        <input type="radio" checked={viewerType == 'tree-view'} onClick={() => setViewerType('tree-view')} />
        Tree
      </label>
      <label>
        <input type="radio" checked={viewerType == 'table-view'} onClick={() => setViewerType('table-view')} />
        Table
      </label>
    </div>
  );
