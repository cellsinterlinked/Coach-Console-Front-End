import React, { useContext } from "react";
import { DarkModeContext } from "../../../App";
import "../CheckinTotals.css";
import TapeCompare from "../TapeCompare";

const MeasurementTotalsCarousel = props => {
  const {themeMode} = useContext(DarkModeContext);

  return (
    <React.Fragment>
      <div
        className={
          themeMode === 'darkTheme' ? "dark-compare-labels" : "light-compare-labels"
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
      <div className={themeMode === 'darkTheme' ? "dark-for-shadow" : "light-for-shadow"}>
        <div
          className={
            themeMode === 'darkTheme' ? "dark-measure-totals" : "light-measure-totals"
          }
        >
          <p>TOTALS</p>
          <p>
            {props.items[0].neckMeasure - props.items[props.items.length - 1].neckMeasure}
          </p>
          <p>
            {props.items[0].armMeasure - props.items[props.items.length - 1].armMeasure}
          </p>
          <p>
            {props.items[0].chestMeasure - props.items[props.items.length - 1].chestMeasure}
          </p>
          <p>
            {props.items[0].waistMeasure -
              props.items[props.items.length - 1].waistMeasure}
          </p>
          <p>
            {props.items[0].hipsMeasure -
              props.items[props.items.length - 1].hipsMeasure}
          </p>
          <p>
            {props.items[0].thighMeasure -
              props.items[props.items.length - 1].thighMeasure}
          </p>
          <p>
            {props.items[0].calfMeasure - props.items[props.items.length - 1].calfMeasure}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MeasurementTotalsCarousel;