import React, { useEffect, useState } from 'react';
import EndPoint from '../Endpoint';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children, id }) => {
  const { isAuth, loading, checkAuth, user } = useAuth();
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);
  const [idCurrent, setIdCurrent] = useState(id);
  const [oldID, setOldId] = useState(null);

  useEffect(() => {
    if(id !== idCurrent || !oldID){
      setOldId(idCurrent);
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
    
    return <EndPoint.panels.Loading/>;
  }

  return isAuth ? children : <Navigate to="/" />; 
};

export default PrivateRoute;
