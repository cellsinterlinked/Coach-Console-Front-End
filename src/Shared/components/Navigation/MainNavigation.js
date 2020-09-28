import React, { useState } from 'react';
import Header from './Header';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import './MainNavigation.css';
import {BsFillPeopleFill} from "react-icons/bs";
import {BsPersonPlusFill} from "react-icons/bs";
import {BsUnlockFill} from "react-icons/bs";
import {BsLockFill} from "react-icons/bs";
import {RiLogoutCircleLine} from "react-icons/ri"

const MainNavigation = props => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawer = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawer = () => {
    setDrawerIsOpen(false);
  }

  return (
    <React.Fragment>
      {drawerIsOpen ? <Backdrop onClick={closeDrawer} /> : null}
    <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
    <nav className="main-navigation__drawer-nav">
    <NavLinks 
      peopleIcon={<BsFillPeopleFill style={{marginLeft: "0.5rem", marginRight: "3rem", height: "1.5rem", width: "auto"}} />}
      addPersonIcon={<BsPersonPlusFill style={{marginLeft: "0.5rem", marginRight: "3rem", height: "1.5rem", width: "auto"}} />}
      authIcon={<BsUnlockFill style={{marginLeft: "0.5rem", marginRight: "3rem", height: "1.5rem", width: "auto"}} /> }
      logoutIcon={<RiLogoutCircleLine style={{marginLeft: "0.5rem", marginRight: "3rem", height: "1.5rem", width: "auto"}} />  }
    />
    </nav>
    </SideDrawer>
    <Header>
      <button className="main-navigation__menu-btn" onClick={openDrawer}>
      <span />
      <span />
      <span />
    </button>
     <h1 className="header-title">Coach Console</h1>

     <nav className="main-navigation__header-nav">
      <NavLinks />
     </nav>
    </Header>
    </React.Fragment>

  )
}

export default MainNavigation;