import React, { useContext } from "react";
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import { DarkModeContext } from '../../context/dark-mode-context';
import ModeToggle from '../FormElements/ModeToggle';
import './NavLinks.css'


const NavLinks = props => {
  const auth = useContext(AuthContext);
  const mode = useContext(DarkModeContext)


 return (
  <ul className={mode.darkMode ? "dark-nav-links" : "light-nav-links"}>

  {auth.isLoggedIn && (
  <li>
    <NavLink to="/clients" exact>
    <div>{props.peopleIcon}</div>
    MY CLIENTS
    
    </NavLink>
    <div>{props.arrow}</div>
  </li>
  )}

  {auth.isLoggedIn && (
  <li>
    <NavLink to="/newclient" exact>
    <div>{props.addPersonIcon}</div>
    NEW CLIENT</NavLink>
  </li>
  )}

{!auth.isLoggedIn && (
    <li>
      <NavLink to="/auth">
      <div>
        {props.authIcon}
      </div>
      AUTHENTICATE
      </NavLink>
    </li>
  )}

    {auth.isLoggedIn && (
      <li >
        <NavLink to="/auth" onClick={auth.logout}>
        <div>{props.logoutIcon}</div>
        LOGOUT</NavLink>
      </li>

     
    )}
  <li >
      <ModeToggle  onClick={mode.darkMode ? mode.toggleLight : mode.toggleDark}/>
  </li>
  
  
  </ul>


 )
}

export default NavLinks;