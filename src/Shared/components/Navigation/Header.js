import React, { useState, useContext, useEffect } from 'react';
import { DarkModeContext } from '../../../Shared/context/dark-mode-context';
import './Header.css';
import { debounce} from '../../util/helpers';

const Header = props => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);     
  const [visible, setVisible] = useState(true); 

  const handleScroll = debounce(() => {     
    // find current scroll position
    const currentScrollPos = window.pageYOffset;

    // set state based on location info (explained in more detail below)
    setVisible((prevScrollPos > currentScrollPos) || currentScrollPos < 10);

    // set state to new scroll position
    setPrevScrollPos(currentScrollPos);
  }, 0)

  useEffect(() => {    
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);

  }, [prevScrollPos, visible, handleScroll]);

  const mode = useContext(DarkModeContext)

  return (
    <header style={{top: visible ? "0" : '-70px', transition: "top 0.6s"}}className={mode.darkMode ? "dark-main-header" : "light-main-header" }>
    {props.children}
    </header>
  )
};

export default Header;