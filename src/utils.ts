/// <reference path="../node_modules/web-ext-types/global/index.d.ts" />
/* global browser */

import { useEffect, useState } from 'react';

export function isNullOrUndefined(value: any) {
  return value === null || value === undefined;
}

export function isSimpleType(value: any) {
  return isNullOrUndefined(value) || typeof value !== 'object';
}

export function isTableType(value: {}[] | {}) {
  if (Array.isArray(value)) {
    return value.every(a => !isSimpleType(a));
  }

  if (typeof value === 'object') {
    return Object.values(value).every(a => !isSimpleType(a));
  }

  return false;
}

export function isLink(value: string) {
  return value.match(/^https?:\/\/.*$/);
}

export function formatSimpleValue(value: any) {
  return value === null ? 'null' : value === undefined ? 'undefined' : value.toString();
}

export function summarizeComplexValue(value: any) {
  const allKeys = Object.keys(value);
  if (allKeys.length == 0) {
    return Array.isArray(value) ? '[]' : '{}';
  }

  const simplifiedKeys = allKeys.filter(a => typeof value[a] !== 'object').slice(0, 3);
  if (simplifiedKeys.length == 0) {
    return Array.isArray(value) ? '[ ... ]' : '{ ... }';

  }

  if (Array.isArray(value)) {
    const items = simplifiedKeys.map(a => JSON.stringify(value[a])).join(', ');
    const ellipse = allKeys.length > simplifiedKeys.length ? '...' : '';
    return `[ ${items} ${ellipse} ]`;
  }

  const items = simplifiedKeys.map(a => `"${a}": ${JSON.stringify(value[a])}`).join(', ');
  const ellipse = allKeys.length > simplifiedKeys.length ? '...' : '';
  return `{ ${items} ${ellipse} }`;
}

export function computeNestingOffset(level: number) {
  return 0.5 + 1.5 * level;
}

export function buildJsonPath(path: string) {
  const elements = path.split(/\//);
  let str = '';
  for (const element of elements) {
    if (element.match(/^[0-9]+$/)) {
      str += `[${element}]`;
    } else if (element.match(/^[a-z][a-z0-9_$]*$/i)) {
      str += `.${element}`;
    } else if (element.length) {
      str += `[${JSON.stringify(element)}]`;
    }
  }
  return str.replace(/^\.*/, '');
}

export function prettyPrintJson(value: any) {
  return JSON.stringify(value, undefined, 2);
}

export function getTableColumns(table: {}[] | {}) {
  if (Array.isArray(table)) {
    return Array.from(new Set(table.flatMap(a => Object.keys(a))));
  }

  return Array.from(new Set(Object.values(table).flatMap(a => Object.keys(a))));
}

export function getTableRows(table: {}[] | {}) {
  if (Array.isArray(table)) {
    return table.map((value, key) => ({ value, key: key.toString() }));
  }

  return Object.keys(table)
    .map(key => ({ value: table[key], key }))
    .sort((a, b) => compare(a.key, b.key));
}

export function compare(a: any, b: any) {
  return !isNullOrUndefined(a) && isNullOrUndefined(b) ? -1 :
    isNullOrUndefined(a) && !isNullOrUndefined(b) ? 1 :
      typeof a === 'string' && typeof b === 'string' ? a.localeCompare(b) :
        typeof a === 'object' && typeof b === 'object' ? summarizeComplexValue(a).localeCompare(summarizeComplexValue(b)) :
          a - b;
}

export async function getLastState(key: string) {
  return (await browser.storage.sync.get(key))[key]?.toString();
}

export async function setLastState(key: string, value: string) {
  const obj = {};
  obj[key] = value;
  await browser.storage.sync.set(obj);
}

export function useLastState<T extends string>(key: string, defaultValue: T):
  [T, (value: T) => void] {

  const [value, setter] = useState(defaultValue);

  useEffect(() => {
    (async () => {
      setter((await getLastState(key) as T) || defaultValue);
    })();
  });

  const statefulSetter = async (newValue: T) => {
    setter(newValue);
    await setLastState(key, newValue);
  };

  return [value, statefulSetter];
}

export function useLastStateBoolean(key: string, defaultValue: boolean):
  [boolean, (value: boolean) => void] {

  const [value, setter] = useState(defaultValue);

  useEffect(() => {
    (async () => {
      const lastValue = await getLastState(key);
      setter(!isNullOrUndefined(lastValue) ? lastValue == '1' : defaultValue);
    })();
  });

  const statefulSetter = async (newValue: boolean) => {
    setter(newValue);
    await setLastState(key, newValue ? '1' : '0');
  };

  return [value, statefulSetter];
}

export function useLastStateJson<T>(key: string, defaultValue: T):
  [T, (value: T) => void] {

  const [value, setter] = useLastState<string>(key, '');

  const transformingSetter = (newValue: T) => (
    setter(!isNullOrUndefined(newValue) ? JSON.stringify(newValue) : '')
  );

  return [value ? JSON.parse(value) : defaultValue, transformingSetter];
}
