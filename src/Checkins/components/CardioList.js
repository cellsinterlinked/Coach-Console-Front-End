import React, { useContext } from 'react'
import { DarkModeContext } from '../../Shared/context/dark-mode-context';
import './StatsCompare.css';

const CardioList = props => {
  const mode = useContext(DarkModeContext)

  return(
    <div className={mode.darkMode ? "dark-compare-container" : "light-compare-container"} >
      <p>{props.date}</p>
      <p>{props.caloriesBurnt}</p>
      <p>{props.duration}</p>
      <p>{props.type}</p>
      <p>{props.sessions}</p>

    </div>
  )
}

export default CardioList;