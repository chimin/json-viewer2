import React, { useContext } from 'react';
import { TreeActionContext } from './TreeActionContext';

export const ObjectActionBullet = ({
  valueIsSimpleType, isExpanded, setExpanded, paddingLeft,
}: {
  valueIsSimpleType: boolean,
  isExpanded: boolean,
  setExpanded: (value: boolean) => void,
  paddingLeft: string
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
            <span className="icon" style={{ paddingLeft }}>
              <i className="far fa-circle" />
            </span>
          ) :
          isExpanded ?
            (
              <span className="icon clickable" style={{ paddingLeft }} onClick={() => updateExpanded(false)} title="Collapse">
                <i className="fas fa-chevron-down" />
              </span>
            ) :
            (
              <span className="icon clickable" style={{ paddingLeft }} onClick={() => updateExpanded(true)} title="Expand">
                <i className="fas fa-chevron-right" />
              </span>
            )
      }
    </span>
  );
};