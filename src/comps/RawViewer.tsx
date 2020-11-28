import React from 'react';

export const RawViewer = ({ raw }: {
  raw: HTMLElement
}) => (
    <div className="raw-viewer" dangerouslySetInnerHTML={{ __html: raw.outerHTML }} />
  );
