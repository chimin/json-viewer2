export type JsonViewerType = 'swagger-view' | 'tree-view' | 'pretty-print' | 'raw';
export type ValueViewerType = 'tree-view' | 'table-view';
export type ObjectRowSortType = 'default' | 'asc' | 'desc';

export interface ValueMetadata {
  path: string[];
  label: string;
  level: number;
}

export const defaultValueMetadata: ValueMetadata = {
  path: [],
  label: '',
  level: 0,
};

export type TreeActionType = 'expand-all' | 'collapse-all';

export interface TreeAction {
  type: TreeActionType;
  path: string[];
  registerInProgress: (path: string[]) => void;
  registerCompleted: (path: string[]) => void;
}
