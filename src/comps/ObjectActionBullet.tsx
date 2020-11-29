import React from 'react';

export const ObjectActionBullet = ({
  valueIsSimpleType, isExpanded, setExpanded, paddingLeft,
}: {
  valueIsSimpleType: boolean,
  isExpanded: boolean,
  setExpanded: (value: boolean) => void,
  paddingLeft: string
}) => (
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
              <span className="icon clickable" style={{ paddingLeft }} onClick={() => setExpanded(false)}>
                <i className="fas fa-chevron-down" />
              </span>
            ) :
            (
              <span className="icon clickable" style={{ paddingLeft }} onClick={() => setExpanded(true)}>
                <i className="fas fa-chevron-right" />
              </span>
            )
      }
    </span>
  );
