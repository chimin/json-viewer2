import React from 'react';
import {
 buildJsonPath, compare, computeNestingOffset, getTableColumns, getTableRows, useLastStateJson,
} from '../utils';
import { RootViewer } from './RootViewer';

export const ObjectTableViewer = ({ value, path, level }: {
  value: {}[] | {},
  path: string,
  level: number
}) => {
  const [sorts, setSorts] = useLastStateJson<SortInfo[]>(`${path}.sorts`, []);
  const columns = getTableColumns(value);
  const rows = sortTableRows(getTableRows(value), sorts);
  const paddingLeft = `${computeNestingOffset(level)}rem`;

  const addSort = (column: string) => {
    const current = sorts.find(a => a.column == column);
    setSorts(sorts
      .filter(a => a.column != column)
      .concat({ column, reverse: current ? !current.reverse : false }));
  };

  return (
    <div className="object-table-viewer" style={{ paddingLeft }}>
      <table>
        <thead>
          <tr>
            <th className="clickable" onClick={() => setSorts([])} title="Clear sort">#</th>
            {columns.map(column => (
              <th key={column} className="clickable" onClick={() => addSort(column)} title="Sort">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            rows.map(row => (
              <tr key={row.key}>
                <th title={buildJsonPath(`${path}/${row.key}`)}>{row.key}</th>
                {columns.map(column => (
                  <td key={column} title={buildJsonPath(`${path}/${row.key}/${column}`)}>
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

interface SortInfo {
  column: string;
  reverse: boolean;
}

function sortTableRows(rows: { value: any; key: string; }[], sorts: SortInfo[]) {
  if (!sorts?.length) {
    return rows;
  }

  const sortedRows = rows.slice();
  for (const sort of sorts) {
    sortedRows.sort((a, b) => {
      const va = a.value[sort.column];
      const vb = b.value[sort.column];
      const r = compare(va, vb);
      return sort.reverse ? -r : r;
    });
  }
  return sortedRows;
}
