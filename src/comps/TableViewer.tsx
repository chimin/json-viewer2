import React from 'react';
import { getTableColumns, isNullOrUndefined, isValueType, useLastState, useLastStateJson } from '../utils';
import { EmptyIndicator } from './EmptyIndicator';
import { TableObjectViewer } from './TableObjectViewer';
import { ValueViewer } from './ValueViewer';

export const TableViewer = (props: { json: {}[], path: string }) => {
  if (props.json.length == 0) {
    return <EmptyIndicator />;
  }

  const [sorts, setSorts] = useLastStateJson<SortInfo[]>(`${props.path}.sorts`, []);
  const columns = getTableColumns(props.json);

  const updateSort = (key: string) => {
    const current = sorts.find(a => a.key == key);
    setSorts(sorts
      .filter(a => a.key != key)
      .concat({ key, reverse: current ? !current.reverse : false }));
  };

  const rows = sortRows(props.json, sorts);

  return (
    <table className="table-viewer">
      <thead>
        <tr>
          <th className="clickable" onClick={() => setSorts([])}>#</th>
          {columns.map(column => (
            <th key={column} className="clickable" onClick={() => updateSort(column)}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.index}>
            <th>{row.index}</th>
            {columns.map(column => (
              <td key={column}>
                {!Object.keys(row.data).includes(column) ? null :
                  isValueType(row.data[column]) ?
                    <ValueViewer value={row.data[column]} /> :
                    <TableObjectViewer json={row.data[column]} path={`${props.path}/${row.index}/${column}`} />}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

interface SortInfo {
  key: string;
  reverse: boolean;
}

function sortRows(list: {}[], sorts: SortInfo[]) {
  const rows = list.map((row, index) => ({ data: row, index }));
  if (sorts?.length) {
    for (const sort of sorts) {
      rows.sort((a, b) => {
        const va = a.data[sort.key];
        const vb = b.data[sort.key];
        const r = !isNullOrUndefined(va) && isNullOrUndefined(vb) ? -1 :
          isNullOrUndefined(va) && !isNullOrUndefined(vb) ? 1 :
            va - vb;
        return !sort.reverse ? r : -r;
      });
    }
  }
  return rows;
}
