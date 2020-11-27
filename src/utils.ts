export function isValueType(value: any) {
  return value === null || value === undefined || typeof value !== 'object';
}

export function formatValue(value: any) {
  return value === null ? 'null' :
    value === undefined ? 'undefined' :
      value.toString();
}

export function isTableType(value: any) {
  return Array.isArray(value) && value.every(a => !isValueType(a));
}

export function getTableColumns(value: {}[]) {
  return Array.from(new Set(value.flatMap(a => Object.keys(a))));
}

export function getLastState(key: string) {
  return localStorage.getItem(`json-viewer2.${key}`);
}

export function setLastState(key: string, value: string) {
  localStorage.setItem(`json-viewer2.${key}`, value);
}
