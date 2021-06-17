import React, { useContext } from "react";
import { DarkModeContext } from "../../../Shared/context/dark-mode-context";
import "../CheckinTotals.css";
import TapeCompare from "../TapeCompare";

const MeasurementTotalsCarousel = props => {
  const mode = useContext(DarkModeContext);


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

  return (
    <React.Fragment>
      <div
        className={
          mode.darkMode ? "dark-compare-labels" : "light-compare-labels"
        }
      >
        <p className="compare-date__Label">Date</p>
        <p className="compare-chest__Label">Neck</p>
        <p className="compare-axilla__Label">Arm</p>
        <p className="compare-tricep__Label">Chest</p>
        <p className="compare-subscapular__Label">Waist</p>
        <p className="compare-abdominal__Label">Hips</p>
        <p className="compare-suprailiac__Label">Thigh</p>
        <p className="compare-thigh__Label">Calf</p>
      </div>
      {props.items.map(checkin => (
        <TapeCompare
          date={checkin.date.toString().slice(0, 10)}
          key={checkin.id}
          neckMeasure={checkin.neckMeasure}
          armMeasure={checkin.armMeasure}
          chestMeasure={checkin.chestMeasure}
          waistMeasure={checkin.waistMeasure}
          hipsMeasure={checkin.hipsMeasure}
          thighMeasure={checkin.thighMeasure}
          calfMeasure={checkin.calfMeasure}
        />
      ))}
      <div className={mode.darkMode ? "dark-for-shadow" : "light-for-shadow"}>
        <div
          className={
            mode.darkMode ? "dark-measure-totals" : "light-measure-totals"
          }
        >
          <p>TOTALS</p>
          <p>
            {/* {props.items[0].neckMeasure - props.items[props.items.length - 1].neckMeasure} */}
            {totalsHandler('neckMeasure') || "-"}
          </p>
          <p>
            {totalsHandler('armMeasure') || "-"}
          </p>
          <p>
            {totalsHandler('chestMeasure') || "-"}
          </p>
          <p>
            {totalsHandler('waistMeasure') || "-"}
          </p>
          <p>
            {totalsHandler('hipsMeasure') || "-"}
          </p>
          <p>
            {totalsHandler('thighMeasure') || "-"}
          </p>
          <p>
            {totalsHandler('calfMeasure') || "-"}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MeasurementTotalsCarousel;