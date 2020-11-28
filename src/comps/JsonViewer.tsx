import React from 'react';
import { useLastState } from '../utils';
import { ObjectViewer } from './ObjectViewer';
import { PrettyPrintViewer } from './PrettyPrintViewer';
import { RawViewer } from './RawViewer';
import './Styles.css';

export const JsonViewer = (props: { json: any, raw: HTMLElement }) => {
  const [showType, setShowType] = useLastState<'raw' | 'pretty-print' | 'tree-view'>('showType', 'raw');

  return (
    <div className="vertical-panel">
      <div className="horizontal-panel">
        <label>
          <input type="radio" checked={showType == 'tree-view'} onChange={() => setShowType('tree-view')} />
          Tree View
        </label>

        <label>
          <input type="radio" checked={showType == 'pretty-print'} onChange={() => setShowType('pretty-print')} />
          Pretty Print
        </label>

        <label>
          <input type="radio" checked={showType == 'raw'} onChange={() => setShowType('raw')} />
          Raw
        </label>
      </div>
      <div>
        {showType == 'tree-view' ? <ObjectViewer json={props.json} path="" level={0} /> :
          showType == 'pretty-print' ? <PrettyPrintViewer json={props.json} /> :
            showType == 'raw' ? <RawViewer raw={props.raw} /> :
              null}
      </div>
    </div>
  );
};
