/// <reference path="../node_modules/web-ext-types/global/index.d.ts" />
/* global browser */

import { useEffect, useState } from 'react';

export function isNullOrUndefined(value: any) {
  return value === null || value === undefined;
}

export function isSimpleType(value: any) {
  return isNullOrUndefined(value) || typeof value !== 'object';
}

export function isArrayTableType(value: any) {
  return Array.isArray(value) && value.every(a => !isSimpleType(a));
}

export function isObjectTableType(value: any) {
  return typeof value === 'object' && !Array.isArray(value) && Object.values(value).every(a => !isSimpleType(a));
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
  return 1 + 1.6 * level;
}

export function prettyPrintJson(value: any) {
  return JSON.stringify(value, undefined, 2);
}

export function getArrayTableColumns(value: {}[]) {
  return Array.from(new Set(value.flatMap(a => Object.keys(a))));
}

export function getObjectTableColumns(value: {}) {
  return Array.from(new Set(Object.values(value).flatMap(a => Object.keys(a))));
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
