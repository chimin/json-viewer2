import React from 'react';

export const NestingPadding = ({ level }: { level: number }) => (
  <div style={{ height: '100%', display: 'inline-block' }}>
    <div style={{ width: '.5rem', height: '100%', display: 'inline-block' }} />
    {Array.from(Array(level).keys()).map(i => (
      <div key={i} className="nesting" style={{ width: '1.4rem', height: '100%', display: 'inline-block' }} />
    ))}
  </div>
);
