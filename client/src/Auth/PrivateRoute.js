import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children, id }) => {
  const { isAuth, loading, checkAuth, user } = useAuth();
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);
  const [idCurrent, setIdCurrent] = useState(id);

  useEffect(() => {
    if(id !== idCurrent){
      setAuthChecked(false);
      setIdCurrent(id)

      const checkAuthentication = async () => {
        await checkAuth(); 
        setAuthChecked(true);
      };
    
    checkAuthentication();
    }

  }, [location.pathname,id ,idCurrent ,checkAuth]);

  if ((loading || !authChecked) || (id !== idCurrent)) {
    
    return <h1>LOADING...</h1>;
  }

  return isAuth ? children : <Navigate to="/" />; 
};

export default PrivateRoute;
