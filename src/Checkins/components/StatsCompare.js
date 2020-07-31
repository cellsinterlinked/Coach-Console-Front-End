import React, { useContext } from 'react'
import { DarkModeContext } from '../../Shared/context/dark-mode-context';
import './StatsCompare.css';

const StatsCompare = props => {
  const mode = useContext(DarkModeContext)

  return(
    <div className={mode.darkMode ? "dark-compare-container" : "light-compare-container"} >
      <p>10/10/2020</p>
      <p>15%</p>
      <p>140</p>
      <p>4</p>
      <p>119</p>

    </div>
  )
}

export default StatsCompare;