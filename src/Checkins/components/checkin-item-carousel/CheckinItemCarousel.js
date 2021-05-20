import React, { useState, useContext } from "react";
import CheckinItemBasics from './CheckinItemBasics';
import './CheckinItemCarousel.css';
import {DarkModeContext} from '../../../Shared/context/dark-mode-context';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import CheckinItemNotes from "./CheckinItemNotes";
import CheckinItemMeasurements from './CheckinItemMeasurements';
import CheckinItemCaliper from './CheckinItemCaliper';
import CheckinItemCardio from './CheckinItemCardio';


const CheckinItemCarousel = props => {
  const mode = useContext(DarkModeContext);
  let slideArr = [
    <CheckinItemBasics
    date={props.date}
    weeksOut={props.weeksOut}
    bodyFat={props.bodyFat} 
    weight={props.weight}
    leanBodyMass={props.leanBodyMass}/>, 
    <CheckinItemNotes
    notes={props.notes}/>, 
    <CheckinItemMeasurements 
    neckMeasure={props.neckMeasure}
    armMeasure={props.armMeasure}
    chestMeasure={props.chestMeasure}
    waistMeasure={props.waistMeasure}
    hipsMeasure={props.hipsMeasure}
    thighMeasure={props.thighMeasure}
    calfMeasure={props.calfMeasure}/>,
    <CheckinItemCaliper 
    chest={props.chest}
    axilla={props.axilla}
    tricep={props.tricep}
    subscapular={props.subscapular}
    abdominal={props.abdominal}
    suprailiac={props.suprailiac}
    thigh={props.thigh}/>,
    <CheckinItemCardio
    cardioDuration={props.cardioDuration}
    cardioCalories={props.cardioCalories} />
   ]


const [x, setX] = useState(0);

  const goLeft = () => {
    x === 0 ? setX(-100 * (slideArr.length - 1)) : setX(x + 100);
    console.log(x);
  };

  const goRight = () => {
    x === -100 * (slideArr.length - 1) ? setX(0) : setX(x - 100);
    console.log(x);
  };

  const mainHandler = () => {
    setX(0);
    console.log(x);
  };

  const caliperHandler = () => {
    setX(-100);
    console.log(x);
  };

  const measureHandler = () => {
    setX(-200);
    console.log(x);
  };

  const cardioHandler = () => {
    setX(-300);
    console.log(x);
  };

  const notesHandler = () => {
    setX(-400);
    console.log(x);
  }

  return (
    <React.Fragment>
      <div className={mode.darkMode ? "dark-checkinInfo-selector" : "light-checkinInfo-selector"}>
        {/* <FaChevronLeft onClick={goLeft} style={{height: "2rem", color: "#808080"}} /> */}
        <div className={x === 0 ? "selection-light" : "selection-dark"} onClick={mainHandler}></div>
        <div className={x === -100 ? "selection-light" : "selection-dark"} onClick={caliperHandler}></div>
        <div className={x === -200 ? "selection-light" : "selection-dark"} onClick={measureHandler}></div>
        <div className={x === -300 ? "selection-light" : "selection-dark"} onClick={cardioHandler}></div>
        <div className={x === -400 ? "selection-light" : "selection-dark"} onClick={notesHandler}></div>
        {/* <FaChevronRight onClick={goRight} style={{height: "2rem", color: "#808080"}}/> */}
      </div>
      <div className={mode.darkMode ? "dark-checkInfo-container" : "light-checkInfo-container"}>
        <div className="checkinInfo__Slider">
          {slideArr.map((item, index) => {
            return (
              <div
                key={index}
                className="checkinInfo__slide"
                style={{ transform: `translateX(${x}%)`}}
                >
                {item}
                </div>
            );
          })}
          <button id="checkinItem__goLeft" onClick={goLeft}></button>
          <button id="checkinItem__goRight" onClick={goRight}></button>
        
        </div>
      
      
      
      
      </div>
      
    </React.Fragment>
  );
};

export default CheckinItemCarousel;
