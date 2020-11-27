import React, { useState } from 'react';
import { ObjectViewer } from './ObjectViewer';
import { RawViewer } from './RawViewer';
import { ObjectFieldViewer } from './ObjectFieldViewer';
import './Styles.css';

export const JsonViewer = (props: { json: any }) => {
    const [isFormatted, setFormatted] = useState(true);
    return (
        <div className="vertical-panel">
            <div className="horizontal-panel">
                <span>
                    <input type="radio" name="type" value="formatted" id="formatted" checked={isFormatted} onChange={() => setFormatted(true)} />
                    <label htmlFor="formatted">Formatted</label>
                </span>

                <span>
                    <input type="radio" name="type" value="raw" id="raw" checked={!isFormatted} onChange={() => setFormatted(false)} />
                    <label htmlFor="raw">Raw</label>
                </span>
            </div>
            <div>
                {isFormatted ?
                    <ObjectViewer json={props.json} path="" /> :
                    <RawViewer json={props.json} />}
            </div>
        </div>);
};