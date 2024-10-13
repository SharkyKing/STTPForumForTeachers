import React from 'react';

const LoadableComponent = ({ children, loading }) => {
    
  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>
};

export default LoadableComponent;
