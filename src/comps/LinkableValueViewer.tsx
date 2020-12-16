import React from 'react';

export const LinkableValueViewer = ({ value }: { value: string }) => {
  const matches = Array.from(value.matchAll(/https?:\/\/[^\s'"]*/g));
  if (!matches.length) {
    return <>{value}</>;
  }

  const elements: JSX.Element[] = [];
  for (let i = 0; i < matches.length; i++) {
    const lastEndIndex = i > 0 ? matches[i - 1].index + matches[i - 1][0].length : 0;
    const text = value.substring(lastEndIndex, matches[i].index);
    const link = value.substr(matches[i].index, matches[i][0].length);
    elements.push(<React.Fragment key={text}>{text}</React.Fragment>);
    elements.push(<Link key={link} value={link} />);
  }

  const lastMatch = matches[matches.length - 1];
  const lastText = value.substring(lastMatch.index + lastMatch[0].length, value.length);
  elements.push(<React.Fragment key={lastText}>{lastText}</React.Fragment>);

  return <>{elements}</>;
};

const Link = ({ value }: { value: string }) => (
  <a className="link clickable" href={value} target="_blank">{value}</a>
);