import React, { useContext } from 'react';
import { DarkModeContext } from '../../../App';
import './Header.css';

const Header = props => {
  const {themeMode} = useContext(DarkModeContext);

  return (
    <header className={themeMode === 'darkTheme' ? "dark-main-header" : "light-main-header" }>
    {props.children}
    </header>
  )
};

export default Header;