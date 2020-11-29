import React from 'react';
import { ObjectRowSortType } from '../types';

export const ObjectRowSortTypeSelection = ({ sortType, setSortType, field }: {
  sortType: ObjectRowSortType,
  setSortType: (value: ObjectRowSortType) => void,
  field: string
}) => (
    <div className="selection-panel">
      {
        sortType == 'asc' ?
          (
            <label className="icon clickable checked" title="Clear sort">
              <input type="button" onClick={() => setSortType('default')} />
              <i className="fas fa-sort-alpha-up" />
            </label>
          ) :
          (
            <label className="icon clickable" title={`Sort ${field} ascending`}>
              <input type="button" onClick={() => setSortType('asc')} />
              <i className="fas fa-sort-alpha-up" />
            </label>
          )
      }
      {
        sortType == 'desc' ?
          (
            <label className="icon clickable checked" title="Clear sort">
              <input type="button" onClick={() => setSortType('default')} />
              <i className="fas fa-sort-alpha-down" />
            </label>
          ) :
          (
            <label className="icon clickable" title={`Sort ${field} descending`}>
              <input type="button" onClick={() => setSortType('desc')} />
              <i className="fas fa-sort-alpha-down" />
            </label>
          )
      }

    </div>
  );
