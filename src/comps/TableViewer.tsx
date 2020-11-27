import React from 'react';
import { getTableColumns, isValueType } from '../utils';
import { ObjectViewer } from './ObjectViewer';
import { ValueViewer } from './ValueViewer';

export const TableViewer = (props: { json: any, path: string }) => {
    const columns = getTableColumns(props.json);
    return (
        <table className="table-viewer">
            <thead>
                <th></th>
                {columns.map(column => <th>{column}</th>)}
            </thead>
            <tbody>
                {props.json.map((row, index) =>
                    <tr key={index}>
                        <th>{index}</th>
                        {columns.map(column =>
                            <td>
                                {isValueType(row[column]) ?
                                    <ValueViewer value={row[column]} /> :
                                    <ObjectViewer json={row[column]} path={`${props.path}/${index}/${column}`} />}
                            </td>)}
                    </tr>)}
            </tbody>
        </table>
    );
};