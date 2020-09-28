import React, { useContext } from 'react';
import { DarkModeContext } from '../../App';
import "./MeasurementsCompare.css"

const MeasurementsCompare = props => {
  const {themeMode} = useContext(DarkModeContext);

  return (
    <div className={themeMode === 'darkTheme' ? "dark-measurement-compare-container" : "light-measurement-compare-container" }>
        <p>{props.date}</p>
        <p>{props.chest}</p>
        <p>{props.axilla}</p>
        <p>{props.tricep}</p>
        <p>{props.subscapular}</p>
        <p>{props.abdominal}</p>
        <p>{props.suprailiac}</p>
        <p>{props.thigh}</p>
    </div>
  )
}

export default MeasurementsCompare;