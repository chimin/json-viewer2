export function isValueType(value: any) {
  return value === null || value === undefined || typeof value !== 'object';
}

export function formatValue(value: any) {
  return value === null ? 'null' :
    value === undefined ? 'undefined' :
      value.toString();
}

export function formatSimplifiedObject(value: any) {
  const allKeys = Object.keys(value);
  if (allKeys.length == 0) {
    return '';
  }

  const simplifiedKeys = allKeys.filter(a => typeof value[a] !== 'object').slice(0, 3);
  if (simplifiedKeys.length == 0) {
    return '...';
  }

  if (Array.isArray(value)) {
    const items = simplifiedKeys.map(a => JSON.stringify(value[a])).join(', ');
    const ending = allKeys.length > simplifiedKeys.length ? '...' : ']';
    return `[ ${items} ${ending}`;
  }

  const items = simplifiedKeys.map(a => `"${a}": ${JSON.stringify(value[a])}`).join(', ');
  const ending = allKeys.length > simplifiedKeys.length ? '...' : '}';
  return `{ ${items} ${ending}`;
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
