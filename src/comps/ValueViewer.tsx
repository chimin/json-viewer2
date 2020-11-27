import React, { useState } from 'react';
import { formatValue, isValueType } from '../utils';
import { ObjectViewer } from './ObjectViewer';
import './Styles.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const ValueViewer = (props: { name: string, value: any }) => {
    const [isExpanded, setExpanded] = useState(false);
    const valueType = isValueType(props.value);
    return (
        <>
            <div className="value-viewer">
                <span className="name">
                    {!valueType ?
                        isExpanded ?
                            <i className="fas fa-chevron-down clickable" onClick={() => setExpanded(false)}></i> :
                            <i className="fas fa-chevron-right clickable" onClick={() => setExpanded(true)}></i> :
                        <i className="far fa-circle"></i>}
                    {props.name}
                </span>
                {valueType ?
                    <span className={typeof props.value === 'string' ? 'value string' : 'value'}>{formatValue(props.value)}</span> :
                    null}
            </div>
            {!valueType ?
                <div className="inner-object-viewer" style={{ display: isExpanded ? '' : 'none' }}>
                    <ObjectViewer json={props.value} />
                </div> :
                null
            }
        </>)
};
