import React from 'react';

export const RawViewer = (props: { raw: HTMLElement }) => (
  <div dangerouslySetInnerHTML={{ __html: props.raw.outerHTML }} />
);
