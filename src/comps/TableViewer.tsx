import React from 'react';
import { getTableColumns, isValueType } from '../utils';
import { ObjectViewer } from './ObjectViewer';
import { TableObjectViewer } from './TableObjectViewer';
import { ValueViewer } from './ValueViewer';

export const TableViewer = (props: { json: any, path: string }) => {
  const columns = getTableColumns(props.json);
  return (
    <table className="table-viewer">
      <thead>
        <tr>
          <th>#</th>
          {columns.map(column => <th key={column}>{column}</th>)}
        </tr>
      </thead>
      <tbody>
        {props.json.map((row, index) => (
          <tr key={index}>
            <th>{index}</th>
            {columns.map(column => (
              <td key={column}>
                {!Object.keys(row).includes(column) ? null :
                  isValueType(row[column]) ?
                    <ValueViewer value={row[column]} /> :
                    <TableObjectViewer json={row[column]} path={`${props.path}/${index}/${column}`} />}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
