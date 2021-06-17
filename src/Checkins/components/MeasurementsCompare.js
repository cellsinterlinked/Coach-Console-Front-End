import React, { useContext } from 'react';
import { DarkModeContext } from '../../Shared/context/dark-mode-context';
import "./MeasurementsCompare.css"

const MeasurementsCompare = props => {
  const mode = useContext(DarkModeContext);

  return (
    <div className={mode.darkMode ? "dark-measurement-compare-container" : "light-measurement-compare-container" }>
        <p>{props.date}</p>
        <p>{props.chest ? props.chest : `-` }</p>
        <p>{props.axilla ? props.axilla : `-`}</p>
        <p>{props.tricep ? props.tricep : `-`}</p>
        <p>{props.subscapular ? props.subscapular : `-`}</p>
        <p>{props.abdominal ? props.abdominal : `-`}</p>
        <p>{props.suprailiac ? props.suprailiac : `-`}</p>
        <p>{props.thigh ? props.thigh : `-`}</p>
    </div>
  )
}

export default MeasurementsCompare;