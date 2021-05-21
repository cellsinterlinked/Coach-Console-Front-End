import React, { useState, useContext } from "react";
import "./Slider.css";
import WeightChart from "../../../Checkins/components/WeightChart";
import { DarkModeContext } from "../../context/dark-mode-context";
import { GiRun } from "react-icons/gi";
import { FaWeight } from "react-icons/fa";
import { GiBiceps } from "react-icons/gi";
import { GiPincers } from "react-icons/gi";
import BodyFatChart from "../../../Checkins/components/BodyFatChart";
import CardioChart from "../../../Checkins/components/CardioChart";
import MeasurementChart from "../../../Checkins/components/MeasurementsChart";
import BasicTotalsCarousel from '../../../Checkins/components/checkin-total-carousel/BasicTotalsCarousel';
import CaliperTotalsCarousel from '../../../Checkins/components/checkin-total-carousel/CaliperTotalsCarousel';
import MeasurementTotalsCarousel from '../../../Checkins/components/checkin-total-carousel/MeasurementTotalsCarousel';




const Slider = props => {
  const mode = useContext(DarkModeContext);
  let slideArr = [
    <WeightChart items={props.items} />,
    <BodyFatChart items={props.items} />,
    <MeasurementChart items={props.items} />,
    <CardioChart items={props.items} />
  ];
  let slideArr2 = [
  <BasicTotalsCarousel  items={props.items}/>, 
  <CaliperTotalsCarousel items={props.items}/>,
  <MeasurementTotalsCarousel items={props.items}/>,
   3, 4];

  const [x, setX] = useState(0);

  const goLeft = () => {
    x === 0 ? setX(-100 * (slideArr.length - 1)) : setX(x + 100);
  };

  const goRight = () => {
    x === -100 * (slideArr.length - 1) ? setX(0) : setX(x - 100);
  };

  const bfHandler = () => {
    setX(0);
  };

  const measureHandler = () => {
    setX(-100);
  };

  const psychHandler = () => {
    setX(-200);
  };

  const cardioHandler = () => {
    setX(-300);
  };
  return (
    <React.Fragment>
      <div className={mode.darkMode ? "dark-selection-row" : "light-selection-row"}>
        {mode.darkMode && <button className={x === 0 ? "selector-inset" : "selector-dark" }  onClick={bfHandler}>
          <FaWeight
            style={{ height: "1.8rem", color: "#969696", width: "auto" }}
          />
          </button>}

        {!mode.darkMode && <button className={x === 0 ? "selector-inset" : "selector-normal" }  onClick={bfHandler}>
          <FaWeight
            style={{ height: "1.8rem", color: "#969696", width: "auto" }}
          />
          </button>}

        {mode.darkMode && <button className={x === -100 ? "selector-inset" : "selector-dark" } onClick={measureHandler}>
          <GiPincers
            style={{ height: "1.8rem", color: "#969696", width: "auto" }}
          />
        </button>}

        
        {!mode.darkMode && <button className={x === -100 ? "selector-inset" : "selector-normal" } onClick={measureHandler}>
          <GiPincers
            style={{ height: "1.8rem", color: "#969696", width: "auto" }}
          />
        </button>}

        {mode.darkMode && <button className={x === -200 ? "selector-inset" : "selector-dark" } onClick={psychHandler}>
          <GiBiceps
            style={{ height: "1.8rem", color: "#969696", width: "auto" }}
          />
        </button>}

        {!mode.darkMode && <button className={x === -200 ? "selector-inset" : "selector-normal" } onClick={psychHandler}>
          <GiBiceps
            style={{ height: "1.8rem", color: "#969696", width: "auto" }}
          />
        </button>}

        {mode.darkMode && <button className={x === -300 ? "selector-inset" : "selector-dark" }onClick={cardioHandler}>
          <GiRun
            style={{ height: "1.8rem", color: "#969696", width: "auto" }}
          />
        </button>}

        {!mode.darkMode && <button className={x === -300 ? "selector-inset" : "selector-normal" }onClick={cardioHandler}>
          <GiRun
            style={{ height: "1.8rem", color: "#969696", width: "auto" }}
          />
        </button>}

      </div>
      <div
        className={
          mode.darkMode ? "dark-chart-container" : "light-chart-container"
        }
      >
        <div className="slider">
          {slideArr.map((item, index) => {
            return (
              <div
                key={index}
                className={!mode.darkMode ? "slide slide-light" : "slide slide-dark"}
                style={{ transform: `translateX(${x}%)` }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
          <div className={mode.darkMode ? "dark-infoTotals__container" : "light-infoTotals__container"}>
          <div className="slider">
          {slideArr2.map((item, index) => {
            return (
              <div
                key={index}
                className="slide"
                style={{ transform: `translateX(${x}%)` }}
              >
                {item}
              </div>
            );
          })}
          <button id="goLeft" onClick={goLeft}>
          </button>
          <button id="goRight" onClick={goRight}>
          </button>
        </div>



          </div>






    </React.Fragment>
  );
};

export default Slider;
