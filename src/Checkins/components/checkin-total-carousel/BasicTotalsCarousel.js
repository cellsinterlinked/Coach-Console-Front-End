import React, { useContext } from "react";
import { DarkModeContext } from "../../../Shared/context/dark-mode-context";
import "../CheckinTotals.css";
import StatsCompare from "../StatsCompare";


const BasicTotalsCarousel = props => {
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
        className={mode.darkMode ? "dark-stats-labels" : "light-stats-labels"}
      >
        <p className="stats-date__Label">Date</p>
        <p className="stats-bodyfat__Label">Body Fat</p>
        <p className="stats-weight__Label">Weight</p>
        <p className="stats-week__Label">Week</p>
        <p className="stats-leanbm__Label">Lean BM</p>
      </div>
      {props.items.map(checkin => (
        <StatsCompare
          key={checkin.id}
          date={checkin.date.toString().slice(0, 10)}
          weight={checkin.weight}
          bodyFat={checkin.bodyFat}
          leanBodyMass={checkin.leanBodyMass}
          weeksOut={checkin.weeksOut}
        />
      ))}
      <div className={mode.darkMode ? "dark-for-shadow" : "light-for-shadow"}>
        <div
          className={mode.darkMode ? "dark-stat-totals" : "light-stat-totals"}
        >
          <p>TOTALS</p>
          <p>
          {Math.round(totalsHandler('bodyFat')) || "-"}
            
          </p>
          <p>
            {props.items[0].weight - props.items[props.items.length - 1].weight}
            lbs
          </p>
          <p>{props.items[props.items.length - 1].weeksOut}</p>
          <p>
            {Math.round(
              totalsHandler('leanBodyMass')
            ) || "-"}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BasicTotalsCarousel;
