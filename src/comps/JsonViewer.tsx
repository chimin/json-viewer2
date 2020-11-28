import React from 'react';
import { isTableType, useLastState } from '../utils';
import { ObjectViewer } from './ObjectViewer';
import { PrettyPrintViewer } from './PrettyPrintViewer';
import { RawViewer } from './RawViewer';
import { RootViewer } from './RootViewer';
import './Styles.css';

export const JsonViewer = (props: { json: any, raw: HTMLElement }) => {
  const [showType, setShowType] = useLastState<'raw' | 'pretty-print' | 'tree-view'>('showType', 'raw');

  return (
    <div className="vertical-panel">
      <div className="root-header horizontal-panel">
        <label>
          <input type="radio" checked={showType == 'tree-view'} onChange={() => setShowType('tree-view')} />
          Tree view
        </label>

        <label>
          <input type="radio" checked={showType == 'pretty-print'} onChange={() => setShowType('pretty-print')} />
          Pretty print
        </label>

        <label>
          <input type="radio" checked={showType == 'raw'} onChange={() => setShowType('raw')} />
          Raw
        </label>
      </div>
      <div>
        {showType == 'tree-view' ? <RootViewer json={props.json} /> :
          showType == 'pretty-print' ? <PrettyPrintViewer json={props.json} /> :
            showType == 'raw' ? <RawViewer raw={props.raw} /> :
              null}
      </div>
    </div>
  );
};
