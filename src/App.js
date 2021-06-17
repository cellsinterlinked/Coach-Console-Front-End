import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Clients from './Clients/pages/Clients'
import Auth from './User/pages/Auth';
import ClientCheckins from './Checkins/pages/ClientCheckins';
import NewCheckin from './Checkins/pages/NewCheckin';
import UpdateCheckin from './Checkins/pages/UpdateCheckin';
import NewClient from './Clients/pages/NewClient';
import EditClient from './Clients/pages/EditClient';
import Landing from './User/pages/Landing';
import { AuthContext } from './Shared/context/auth-context';
import { DarkModeContext } from './Shared/context/dark-mode-context';
import CheckinPage from './Checkins/pages/CheckinPage';
import { useAuth } from './Shared/hooks/auth-hook';
import { modes } from 'react-transition-group/SwitchTransition';



function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkTheme') ? JSON.parse(localStorage.getItem('darkTheme')) : false);
  const { token, login, logout, userId} = useAuth();
  
  
  const toggleDark = useCallback(() => {
    setDarkMode(true)
    localStorage.setItem('darkTheme', JSON.stringify(true))
  }, []);

  const toggleLight = useCallback(() => {
    setDarkMode(false)
    localStorage.setItem('darkTheme', JSON.stringify(false))
  }, []);

  let routes;

  if (token) {
    routes = (
    <Switch>
      <Route path='/:clientId/checkins' exact>
        <ClientCheckins/>
      </Route>

      <Route path='/clients'>
        <Clients />
      </Route>

      <Route path='/newclient'>
        <NewClient />
      </Route>

      <Route path='/:clientId/editclient'>
        <EditClient />
      </Route>

      <Route path='/:clientId/newcheckin' exact>
        <NewCheckin/>
      </Route>

      <Route path='/:checkinId/updateCheckin' exact>
        <UpdateCheckin/>
      </Route>

      <Route path='/:clientId/:checkinId' exact>
        <CheckinPage/>
      </Route>
      <Redirect to='/clients' />
    </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path='/landing' exact>
        <Landing  />
      </Route>

        <Route path='/auth' exact>
        <Auth />
      </Route>
      <Redirect to='/auth' />
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
					isLoggedIn: !!token,
          token: token,
					userId: userId,
					login: login,
					logout: logout,
				}}
			>
				<Router>
					{/* <MainNavigation /> */}
					<main className={darkMode ? "darkBacking" : "lightBacking"}>{routes}</main>
				</Router>
			</AuthContext.Provider>
      </DarkModeContext.Provider>
		
  );
};

export default App;
