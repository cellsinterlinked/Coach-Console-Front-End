import React, { useContext } from 'react';
import { DarkModeContext } from '../../App';
import "./MeasurementsCompare.css"

const TapeCompare = props => {
  const {themeMode} = useContext(DarkModeContext);

  return (
    <div className={themeMode === 'darkTheme' ? "dark-measurement-compare-container" : "light-measurement-compare-container" }>
        <p>{props.date}</p>
        <p>{props.neckMeasure}</p>
        <p>{props.armMeasure}</p>
        <p>{props.chestMeasure}</p>
        <p>{props.waistMeasure}</p>
        <p>{props.hipsMeasure}</p>
        <p>{props.thighMeasure}</p>
        <p>{props.calfMeasure}</p>
    </div>
  )
}

export default TapeCompare;