import React from 'react';
import { IRouteLayoutConfig } from '@/components/Exception/data';
import { Exception403, Exception404 } from '@/components/Exception';

const WithExceptionOpChildren: React.FC<{
  currentPathConfig?: IRouteLayoutConfig;
  children: any;
}> = (props) => {
  const { children, currentPathConfig } = props;

  if (!currentPathConfig) {
    return <Exception404 />;
  }

  if (currentPathConfig.unAccessible || currentPathConfig.unaccessible) {
    return <Exception403 />;
  }
  return children;
};

export default WithExceptionOpChildren;
