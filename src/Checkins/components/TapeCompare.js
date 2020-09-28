import React, { useContext } from 'react';
import { DarkModeContext } from '../../Shared/context/dark-mode-context';
import "./MeasurementsCompare.css"

const TapeCompare = props => {
  const mode = useContext(DarkModeContext);

  return (
    <div className={mode.darkMode ? "dark-measurement-compare-container" : "light-measurement-compare-container" }>
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