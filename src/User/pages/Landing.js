import React, { useState, useEffect } from 'react';
import './Landing.css';

const Landing = (props) => {

 const darkMode = props.darkMode;
  return (
  <div className={darkMode ? "dark-background" : "light-background"}>
    <h1>Animation Input</h1>
   <div className="form">
    
    <h2 className={darkMode ? "dark-text" : "light-text"}>{darkMode ? "Dark Mode" : "Light Mode"}</h2>
   
   </div>


  </div>
  )
}

export default Landing;