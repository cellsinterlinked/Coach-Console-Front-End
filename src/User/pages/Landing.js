import React, { useContext } from 'react';
import { DarkModeContext } from '../../App';
import './Landing.css';

const Landing = () => {
  const {themeMode} = useContext(DarkModeContext);
  return (
  <div className={themeMode === 'darkTheme' ? "dark-background" : "light-background"}>
    <h1>Animation Input</h1>
   <div className="form">

    <h2 className={themeMode === 'darkTheme' ? "dark-text" : "light-text"}>{themeMode === 'darkTheme' ? "Dark Mode" : "Light Mode"}</h2>

   </div>


  </div>
  )
}

export default Landing;