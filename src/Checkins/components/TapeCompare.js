import React, { useContext } from 'react';
import { DarkModeContext } from '../../Shared/context/dark-mode-context';
import "./MeasurementsCompare.css"

const TapeCompare = props => {
  const mode = useContext(DarkModeContext);

  return (
    <div className={mode.darkMode ? "dark-measurement-compare-container" : "light-measurement-compare-container" }>
        <p>{props.date}</p>
        <p>{props.neckMeasure ? props.neckMeasure : `-`}</p>
        <p>{props.armMeasure ? props.armMeasure : `-`}</p>
        <p>{props.chestMeasure ? props.chestMeasure : `-` }</p>
        <p>{props.waistMeasure ? props.waistMeasure : `-`}</p>
        <p>{props.hipsMeasure ? props.hipsMeasure : `-`} </p>
        <p>{props.thighMeasure ? props.thighMeasure : `-`}</p>
        <p>{props.calfMeasure ? props.calfMeasure : `-`}</p>
    </div>
  )
}

export default TapeCompare;