/// <reference path="../node_modules/web-ext-types/global/index.d.ts" />
/* global browser */

import { useEffect, useState } from 'react';
import ndjsonParse from 'ndjson-parse';
import yaml from 'js-yaml';

export function isNullOrUndefined(value: any) {
  return value === null || value === undefined;
}

export function isSimpleType(value: any) {
  return isNullOrUndefined(value) || typeof value !== 'object';
}

export function isTableType(value: {}[] | {}) {
  if (Array.isArray(value)) {
    return value.every(a => isNullOrUndefined(a) || !isSimpleType(a));
  }

  if (typeof value === 'object') {
    return Object.values(value).every(a => isNullOrUndefined(a) || !isSimpleType(a));
  }

  return false;
}

export function isLink(value: string) {
  return value.match(/^https?:\/\/.*$/);
}

export function isEmptyObjectOrArray(value: any) {
  return !value || Object.keys(value).length == 0;
}

export function checkShouldBeJsonObject(value: string) {
  return value.match(/^[{[]/);
}

export function parseJson(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
}

export function parseNdjson(value: string) {
  try {
    return ndjsonParse(value);
  } catch {
    return undefined;
  }
}

export function checkShouldBeSwaggerJson(json: any) {
  return /\d+(\.\d+)*/.test(json.swagger);
}

export function checkShouldBeSwaggerYaml(value: string) {
  return !!value.split(/\r?\n/, 10).find(line => line.match(/^swagger:(.*)$/));
}

export function parseYaml(value: string) {
  try {
    return yaml.load(value);
  } catch {
    return undefined;
  }
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

export function isPathDescendantOf(path: string[], target: string[]) {
  return target && target.length < path.length && target.every((p, index) => p == path[index]);
}

export function buildJsonPath(path: string[]) {
  let str = '';
  for (const element of path) {
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
    return Array.from(new Set(table.flatMap(a => (a ? Object.keys(a) : []))));
  }

  return Array.from(new Set(Object.values(table).flatMap(a => (a ? Object.keys(a) : []))));
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

const cachedLastStates: { key: string, value: string }[] = [];

export async function getLastState(key: string) {
  const cachedItem = cachedLastStates.filter(a => a.key == key).pop();
  if (cachedItem) {
    return new Promise(resolve => requestAnimationFrame(() => resolve(cachedItem.value)));
  }
  return (await browser.storage.local.get(key))[key]?.toString();
}

export function setLastState(key: string, value: string) {
  const cachedItem = { key, value };
  cachedLastStates.push(cachedItem);

  (async () => {
    await browser.storage.local.set({ [key]: value });

    const cachedIndex = cachedLastStates.indexOf(cachedItem);
    if (cachedIndex >= 0) {
      cachedLastStates.splice(cachedIndex, 1);
    }
  })();

  return new Promise(resolve => requestAnimationFrame(resolve));
}

export function useLastState<T extends string>(key: string, defaultValue: T):
  [T, (value: T) => void] {

  const [value, setter] = useState(defaultValue);

  let cancelInit = false;
  useEffect(() => {
    (async () => {
      const lastValue = await getLastState(key) as T;
      if (!cancelInit && lastValue) {
        setter(lastValue || defaultValue);
      }
    })();
    return () => {
      cancelInit = true;
    };
  }, []);

  const statefulSetter = async (newValue: T) => {
    cancelInit = true;
    await setLastState(key, newValue);
    setter(newValue);
  };

  return [value, statefulSetter];
}

export function useLastStateBoolean(key: string, defaultValue: boolean):
  [boolean, (value: boolean) => void] {

  const [value, setter] = useState(defaultValue);

  let cancelInit = false;
  useEffect(() => {
    (async () => {
      const lastValue = await getLastState(key);
      if (!cancelInit) {
        setter(!isNullOrUndefined(lastValue) ? lastValue == '1' : defaultValue);
      }
    })();
    return () => {
      cancelInit = true;
    };
  }, []);

  const statefulSetter = async (newValue: boolean) => {
    cancelInit = true;
    await setLastState(key, newValue ? '1' : '0');
    setter(newValue);
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
