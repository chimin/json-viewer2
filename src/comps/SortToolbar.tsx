import React from 'react';

export const SortToolbar = (props: {
  sort: boolean, setSort: (value: boolean) => void
}) => (
    <div className="toolbar-panel horizontal-panel">
      <label>
        <input type="radio" checked={!props.sort} onChange={() => props.setSort(false)} />
          No sort
      </label>

      <label>
        <input type="radio" checked={props.sort} onChange={() => props.setSort(true)} />
          Sort
      </label>
    </div>
  );
