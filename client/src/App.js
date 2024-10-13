import React from 'react';
import { BrowserRouter as Router,Route, Routes  } from 'react-router-dom';
import EndPoint from './Endpoint';
import { AuthProvider, useAuth } from './Auth/AuthContext';
import PrivateRoute from './Auth/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
          <AppContent />
      </AuthProvider>
    </Router>
  );
}

const AppContent = () => {
  const { isAuth } = useAuth();
  
  return (
    <>
      {isAuth && <EndPoint.base.SidePanel/>}
      {!isAuth && <EndPoint.base.Navbar/>}
      <div className={`${isAuth ? "main-content-view" : "main-content"}`}>
      {isAuth && <EndPoint.panels.PageHeaderPanel/>}
        <Routes>
          <Route path={EndPoint.path.Home} element={<EndPoint.pages.Home/>} />
          <Route path={EndPoint.path.SignIn} element={<EndPoint.pages.SignIn/>} />
          <Route path={EndPoint.path.SignUp} element={<EndPoint.pages.SignUp/>} />
          <Route path={EndPoint.path.Profile} element={
            <PrivateRoute id={0}>
              <EndPoint.pages.Profile/>
            </PrivateRoute>
          } />
          <Route path={EndPoint.path.ForumMain} element={
            <PrivateRoute id={1}>
              <EndPoint.pages.ForumMain/>
            </PrivateRoute>
          } />
           <Route path={EndPoint.path.CreateThread} element={
            <PrivateRoute id={2}>
              <EndPoint.pages.CreateThread/>
            </PrivateRoute>
          } />
          <Route path={EndPoint.path.Admin} element={
            <PrivateRoute id={3}>
              <EndPoint.pages.Admin/>
            </PrivateRoute>
          } />
          <Route path={EndPoint.path.Grade} element={
            <PrivateRoute id={4}>
              <EndPoint.pages.Grade/>
            </PrivateRoute>
          } />
          <Route path={EndPoint.path.Category} element={
            <PrivateRoute id={5}>
              <EndPoint.pages.Category/>
            </PrivateRoute>
          } />
          <Route path={EndPoint.path.Thread} element={
            <PrivateRoute id={6}>
              <EndPoint.pages.Thread/>
            </PrivateRoute>
          } />
          <Route path={EndPoint.path.User} element={
            <PrivateRoute id={7}>
              <EndPoint.pages.User/>
            </PrivateRoute>
          } />
          <Route path={EndPoint.path.Role} element={
            <PrivateRoute id={8}>
              <EndPoint.pages.Role/>
            </PrivateRoute>
          } />
        </Routes>
      </div>
      
    </>
  );
}

export default App;
