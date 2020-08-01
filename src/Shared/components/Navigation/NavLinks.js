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
    <NavLink to="/clients" exact>MY CLIENTS</NavLink>
  </li>
  )}

  {auth.isLoggedIn && (
  <li>
    <NavLink to="/newclient" exact>NEW CLIENT</NavLink>
  </li>
  )}

{!auth.isLoggedIn && (
    <li>
      <NavLink to="/auth">AUTHENTICATE</NavLink>
    </li>
  )}

    {auth.isLoggedIn && (
      <li>
        <NavLink to="/auth" onClick={auth.logout}>LOGOUT</NavLink>
      </li>

      // for some reason we had this as a button ^ may cause issues
    )}
  <li>
      <ModeToggle  onClick={mode.darkMode ? mode.toggleLight : mode.toggleDark}/>
  </li>
  
  
  </ul>


 )
}

export default NavLinks;