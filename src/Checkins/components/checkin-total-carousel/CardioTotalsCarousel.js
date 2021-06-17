import React, { useContext } from "react";
import { DarkModeContext } from "../../../Shared/context/dark-mode-context";
import "../CheckinTotals.css";
import CardioList from '../CardioList';


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
        <p className="stats-bodyfat__Label">Calories</p>
        <p className="stats-weight__Label">Duration</p>
        <p className="stats-week__Label">Type</p>
        <p className="stats-leanbm__Label">Sessions</p>
      </div>
      {props.items.map(checkin => (
        <CardioList
          key={checkin.id}
          date={checkin.date.toString().slice(0, 10)}
          caloriesBurnt={checkin.cardioCalories}
          duration={checkin.cardioDuration}
          type={checkin.cardioType}
          sessions={checkin.cardioSessions}
        />
      ))}
      <div className={mode.darkMode ? "dark-for-shadow" : "light-for-shadow"}>
        <div
          className={mode.darkMode ? "dark-stat-totals" : "light-stat-totals"}
        >
          <p>TOTALS</p>
          <p>
          {Math.round(totalsHandler('cardioCalories')) || "-"}
            
          </p>
          <p>
            {Math.round(totalsHandler('cardioDuration')) || "-"}
            lbs
          </p>
          <p>--</p>
          <p>
            {Math.round(
              totalsHandler('cardioSessions')
            )}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BasicTotalsCarousel;
