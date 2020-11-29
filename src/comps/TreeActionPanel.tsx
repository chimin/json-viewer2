import React from 'react';

export const TreeActionPanel = ({ onClickCollapseAll, onClickExpandAll }: {
  onClickCollapseAll: () => void,
  onClickExpandAll: () => void,
}) => (
    <div className="selection-panel">
      <label className="icon clickable" title="Collapse all">
        <input type="button" onClick={() => onClickCollapseAll()} />
        <i className="fas fa-compress-alt" />
      </label>
      <label className="icon clickable" title="Expand all">
        <input type="button" onClick={() => onClickExpandAll()} />
        <i className="fas fa-expand-arrows-alt" />
      </label>
    </div>
  );
