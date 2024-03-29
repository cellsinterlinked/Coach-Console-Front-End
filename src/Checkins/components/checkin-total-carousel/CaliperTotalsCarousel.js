import React, { useContext} from 'react';
import {DarkModeContext} from "../../../Shared/context/dark-mode-context";
import "../CheckinTotals.css";
import MeasurementsCompare from '../MeasurementsCompare';

const CaliperTotalsCarousel = props => {
  const mode = useContext(DarkModeContext)

  const totalsHandler = (measurement) => {
    let first, last;
    let newArr = [...props.items]

    props.items.forEach((item, index) => {
      if (item[measurement]) {
        first = item[measurement]
        return
      }
    })

    newArr.reverse().forEach((item, index) => {
      if (item[measurement]) {
        last = item[measurement]
        return
      }
    })
    return first - last
  }
  
  return(
    <React.Fragment>
    <div
    
            className={
              mode.darkMode ? "dark-compare-labels" : "light-compare-labels"
            }
          >
            <p className="compare-date__Label">Date</p>
            <p className="compare-chest__Label">Ch</p>
            <p className="compare-axilla__Label">Ax</p>
            <p className="compare-tricep__Label">Tr</p>
            <p className="compare-subscapular__Label">Sub</p>
            <p className="compare-abdominal__Label">Ab</p>
            <p className="compare-suprailiac__Label">Sup</p>
            <p className="compare-thigh__Label">Th</p>
          </div>
          {props.items.map(checkin => (
            <MeasurementsCompare
              date={checkin.date.toString().slice(0, 10)}
              key={checkin.id}
              chest={checkin.chest}
              axilla={checkin.axilla}
              tricep={checkin.tricep}
              subscapular={checkin.subscapular}
              abdominal={checkin.abdominal}
              suprailiac={checkin.suprailiac}
              thigh={checkin.thigh}
            />
          ))}
          <div
            className={mode.darkMode ? "dark-for-shadow" : "light-for-shadow"}
          >
            <div
              className={
                mode.darkMode ? "dark-measure-totals" : "light-measure-totals"
              }
            >
              <p>TOTALS</p>
              <p>
                {totalsHandler('chest') || "-"}
              </p>
              <p>
                {totalsHandler('axilla') || "-"}
              </p>
              <p>
                {totalsHandler('tricep') || "-"}
              </p>
              <p>
                {totalsHandler('subscapular') || "-"}
              </p>
              <p>
                {totalsHandler('abdominal') || "-"}
              </p>
              <p>
                {totalsHandler('suprailiac') || "-"}
              </p>
              <p>
                {totalsHandler('thigh') || "-"}
              </p>
            </div>
          </div>
  </React.Fragment>
  )
}

export default CaliperTotalsCarousel;

