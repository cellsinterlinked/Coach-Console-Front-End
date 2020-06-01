import React, { useContext } from "react";
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css'


const NavLinks = props => {
  const auth = useContext(AuthContext);
 return (
  <ul className="nav-links">

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

  <li>
    <NavLink to="/auth" exact>{auth.isLoggedIn ? "LOGOUT" : "LOGIN"}</NavLink>
  </li>
  
  </ul>


 )
}

export default NavLinks;