import React from 'react';
import { JsonViewer } from './jsonViewer';
import './Styles.css';
import { ValueViewer } from './ValueViewer';

export const ObjectViewer = (props: { json: {} }) => {
    const keys = Object.keys(props.json);
    return (<>{keys.map(key => <ValueViewer key={key} name={key} value={props.json[key]} />)}</>);
};