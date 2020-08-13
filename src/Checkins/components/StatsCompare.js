import React, { useContext } from 'react'
import { DarkModeContext } from '../../Shared/context/dark-mode-context';
import './StatsCompare.css';

const StatsCompare = props => {
  const mode = useContext(DarkModeContext)

  return(
    <div className={mode.darkMode ? "dark-compare-container" : "light-compare-container"} >
      <p>{props.date}</p>
      <p>{Math.round(props.bodyFat * 10) / 10}</p>
      <p>{props.weight}</p>
      <p>{props.weeksOut}</p>
      <p>{Math.round(props.leanBodyMass * 10) / 10}</p>

    </div>
  )
}

export default StatsCompare;