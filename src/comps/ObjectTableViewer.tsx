import React from 'react';
import { computeNestingOffset, getTableColumns, getTableRows } from '../utils';
import { RootViewer } from './RootViewer';

export const ObjectTableViewer = ({ value, path, level }: {
  value: {}[] | {},
  path: string,
  level: number
}) => {
  const columns = getTableColumns(value);
  const rows = getTableRows(value);
  const paddingLeft = `${computeNestingOffset(level)}rem`;

  return (
    <div className="object-table-viewer" style={{ paddingLeft }}>
      <table>
        <thead>
          <tr>
            <th>#</th>
            {columns.map(column => <th key={column}>{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {
            rows.map(row => (
              <tr key={row.key}>
                <th>{row.key}</th>
                {columns.map(column => (
                  <td key={column}>
                    <RootViewer value={row.value[column]} path={`${path}/${row.key}/${column}`} />
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};