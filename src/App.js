import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Clients from './Clients/pages/Clients'
import Auth from './User/pages/Auth';
import MainNavigation from './Shared/components/Navigation/MainNavigation';
import ClientCheckins from './Checkins/pages/ClientCheckins';
import NewCheckin from './Checkins/pages/NewCheckin';
import UpdateCheckin from './Checkins/pages/UpdateCheckin';
import NewClient from './Clients/pages/NewClient';
import EditClient from './Clients/pages/EditClient';
import Landing from './User/pages/Landing';
import { AuthContext } from './Shared/context/auth-context';
import { DarkModeContext } from './Shared/context/dark-mode-context';

/// look at video 50 on react front end about letting only the user's clients be displayed. 
function App() {

  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // change to true?
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true)
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setUserId(null);
  }, []);

  const toggleDark = useCallback(() => {
    setDarkMode(true)
    console.log("going dark!")
  }, []);

  const toggleLight = useCallback(() => {
    setDarkMode(false)
    console.log("get lit!")
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
    <Switch>
      <Route path="/:clientId/checkins" exact>
        <ClientCheckins/>
      </Route>
    
      <Route path="/clients">
        <Clients />
      </Route> 

      <Route path="/newclient">
        <NewClient />
      </Route>

      <Route path="/:clientId/editclient">
        <EditClient />
      </Route>

      <Route path="/:clientId/newcheckin" exact>
        <NewCheckin/>
      </Route> 

      <Route path="/:checkinId/updateCheckin" exact>
        <UpdateCheckin/>
      </Route> 
      <Redirect to="/clients" />
    </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/landing" exact>
        <Landing  />
      </Route>

        <Route path="/auth" exact>
        <Auth />
      </Route>
      <Redirect to="/auth" />
      </Switch>
    )
  }

  return (
  <DarkModeContext.Provider
    value={{
      darkMode: darkMode,
      toggleDark: toggleDark,
      toggleLight: toggleLight
    }}>
  <AuthContext.Provider 
    value={{
      isLoggedIn: isLoggedIn, 
      userId: userId,
      login: login, 
      logout: logout
      }}>
  <Router>
      
    <MainNavigation />
    <main>
      {routes}
    </main>
  </Router>

  </AuthContext.Provider>
  </DarkModeContext.Provider>
  )
};

export default App;







