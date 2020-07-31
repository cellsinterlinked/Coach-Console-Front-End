import React, { useContext } from 'react';
import { DarkModeContext } from '../../Shared/context/dark-mode-context';
import "./MeasurementsCompare.css"

const MeasurementsCompare = props => {
  const mode = useContext(DarkModeContext);

  return (
    <div className={mode.darkMode ? "dark-measurement-compare-container" : "light-measurement-compare-container" }>
        <p>10/10/2020</p>
        <p>6</p>
        <p>7</p>
        <p>14</p>
        <p>10</p>
        <p>5</p>
        <p>9</p>
        <p>11</p>
    </div>
  )
}

export default MeasurementsCompare;