export type JsonViewerType = 'tree-view' | 'pretty-print' | 'raw';
export type ValueViewerType = 'tree-view' | 'table-view';
export type ObjectRowSortType = 'default' | 'asc' | 'desc';

export interface ValueMetadata {
  path: string;
  label: string;
  level: number;
}

export const defaultValueMetadata: ValueMetadata = {
  path: '',
  label: '',
  level: 0,
};
