import React from 'react';
import { isTableType, isValueType } from '../utils';
import { JsonViewer } from './jsonViewer';
import './Styles.css';
import { TableViewer } from './TableViewer';
import { ObjectFieldViewer } from './ObjectFieldViewer';

export const ObjectViewer = (props: { json: any, path: string }) => {
    if (isTableType(props.json)) {
        return <TableViewer json={props.json} path={props.path} />;
    } else {
        const keys = Object.keys(props.json);
        return (<>{keys.map(key => <ObjectFieldViewer key={key} name={key} value={props.json[key]} path={`${props.path}/${key}`} />)}</>);
    }
};
