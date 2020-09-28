import React, { useContext } from 'react'
import { DarkModeContext } from '../../App';
import './StatsCompare.css';

const StatsCompare = props => {
  const {themeMode} = useContext(DarkModeContext);

  return(
    <div className={themeMode === 'darkTheme' ? "dark-compare-container" : "light-compare-container"} >
      <p>{props.date}</p>
      <p>{Math.round(props.bodyFat * 10) / 10}</p>
      <p>{props.weight}</p>
      <p>{props.weeksOut}</p>
      <p>{Math.round(props.leanBodyMass * 10) / 10}</p>

    </div>
  )
}

export default StatsCompare;