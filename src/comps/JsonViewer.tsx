import React, { useState } from 'react';
import { ObjectViewer } from './ObjectViewer';
import { RawViewer } from './RawViewer';
import './Styles.css';

export const JsonViewer = (props: { json: any }) => {
  const [isFormatted, setFormatted] = useState(true);
  return (
    <div className="vertical-panel">
      <div className="horizontal-panel">
        <label>
          <input type="radio" name="type" value="formatted" checked={isFormatted} onChange={() => setFormatted(true)} />
          Formatted
        </label>

        <label>
          <input type="radio" name="type" value="raw" checked={!isFormatted} onChange={() => setFormatted(false)} />
          Raw
        </label>
      </div>
      <div>
        {isFormatted ?
          <ObjectViewer json={props.json} path="" /> :
          <RawViewer json={props.json} />}
      </div>
    </div>
  );
};
