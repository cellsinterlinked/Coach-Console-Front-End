import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { DarkModeContext } from '../../context/dark-mode-context';
import './SideDrawer.css';

const SideDrawer = props => {
  const mode = useContext(DarkModeContext)

  const content = 
  
  <CSSTransition
    in={props.show}
    timeout={200}
    classNames="slide-in-left"
    mountOnEnter
    unmountOnExit
    >
    <aside className={mode.darkMode ? "dark-side-drawer" : "light-side-drawer"} onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>

    
    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;
