import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ImageDisplay = () => {
  const history = useHistory();

  useEffect(() => {
    const timeout = setTimeout(() => {
      history.push('/createRoute');
    }, 1000);

    return () => clearTimeout(timeout);
  }, [history]);

  return (
    <div>
      <img src="smart_route_logo.png" alt="SmartRoute" />
    </div>
  );
};

export default ImageDisplay;
