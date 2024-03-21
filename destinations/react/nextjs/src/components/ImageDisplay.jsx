
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const ImageDisplay = ({ navigateToRoute }) => {
  const navigate = useNavigate()
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/createRoute');
    }, 2500);

    return () => clearTimeout(timeout);
  }, [navigateToRoute]);

  return (
    <div>
      <img src="smart_route_logo.png" alt="Your Image" />
    </div>
  );
};

export default ImageDisplay;