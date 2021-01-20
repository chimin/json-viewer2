import React, { useEffect, useRef } from 'react';
import swaggerUI from 'swagger-ui';

const styles = require('../../node_modules/swagger-ui/dist/swagger-ui.css').default;

export const SwaggerViewer = ({ json }: {
  json: any
}) => {
  const ref = useRef();

  useEffect(() => {
    styles.use();

    swaggerUI({
      domNode: ref.current,
      spec: json,
    });

    return () => {
      styles.unuse();
    };
  }, [json]);

  return <div ref={ref} />;
};
