import React, { useContext } from 'react';
import { NestingPadding } from './NestingPadding';
import { TreeActionContext } from './TreeActionContext';

export const ObjectActionBullet = ({
  valueIsSimpleType, isExpanded, setExpanded, level,
}: {
  valueIsSimpleType: boolean,
  isExpanded: boolean,
  setExpanded: (value: boolean) => void,
  level: number
}) => {
  const treeActionContext = useContext(TreeActionContext);

  const updateExpanded = (newValue: boolean) => {
    treeActionContext.stopAction();
    setExpanded(newValue);
  };

  return (
    <span className="object-action-bullet">
      {
        valueIsSimpleType ?
          (
            <span className="icon">
              <NestingPadding level={level} />
              <div className="image">
                <i className="far fa-circle" />
              </div>
            </span>
          ) :
          isExpanded ?
            (
              <span className="icon clickable" onClick={() => updateExpanded(false)} title="Collapse">
                <NestingPadding level={level} />
                <div className="image">
                  <i className="fas fa-chevron-down" />
                </div>
              </span>
            ) :
            (
              <span className="icon clickable" onClick={() => updateExpanded(true)} title="Expand">
                <NestingPadding level={level} />
                <div className="image">
                  <i className="fas fa-chevron-right" />
                </div>
              </span>
            )
      }
    </span>
  );
};