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
/// look at video 50 on react front end about letting only the user's clients be displayed. 
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true)
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false)
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
        <Route path="/" exact>
        <Landing />
      </Route>

        <Route path="/auth" exact>
        <Auth />
      </Route>
      <Redirect to="/" />
      </Switch>
    )
  }

  return (
  <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
  <Router>

    <MainNavigation />
    <main>
      {routes}
    </main>
  </Router>
  </AuthContext.Provider>
  )
};

export default App;







