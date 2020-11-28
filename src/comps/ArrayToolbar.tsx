import React from 'react';
import { ArrayShowType } from '../types';

export const ArrayToolbar = (props: {
  showType: ArrayShowType, setShowType: (value: ArrayShowType) => void
}) => (
    <div className="toolbar-panel horizontal-panel">
      <label>
        <input type="radio" checked={props.showType == 'list'} onChange={() => props.setShowType('list')} />
          List
      </label>

      <label>
        <input type="radio" checked={props.showType == 'table'} onChange={() => props.setShowType('table')} />
          Table
      </label>
    </div>
  );
