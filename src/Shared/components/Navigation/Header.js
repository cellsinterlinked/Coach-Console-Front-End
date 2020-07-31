import React, { useContext } from 'react';
import { DarkModeContext } from '../../../Shared/context/dark-mode-context';
import './Header.css';

const Header = props => {
  const mode = useContext(DarkModeContext)

  return (
    <header className={mode.darkMode ? "dark-main-header" : "light-main-header" }>
    {props.children}
    </header>
  )
};

export default Header;