import React, { useState, useContext } from "react";
import "./Slider.css";
import WeightChart from "../../../Checkins/components/WeightChart";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { DarkModeContext } from "../../context/dark-mode-context";
import { GiRun } from "react-icons/gi";
import { FaWeight } from "react-icons/fa";
import { GiBiceps } from "react-icons/gi";
import { GiPincers } from "react-icons/gi";
import BodyFatChart from "../../../Checkins/components/BodyFatChart";
import CardioChart from "../../../Checkins/components/CardioChart";
import MeasurementChart from "../../../Checkins/components/MeasurementsChart";

const Slider = props => {
  const mode = useContext(DarkModeContext);
  let slideArr = [
    <WeightChart items={props.items} />,
    <BodyFatChart items={props.items} />,
    <MeasurementChart items={props.items} />,
    <CardioChart items={props.items} />
  ];

  const [x, setX] = useState(0);

  const goLeft = () => {
    x === 0 ? setX(-100 * (slideArr.length - 1)) : setX(x + 100);
    console.log(x);
  };

  const goRight = () => {
    x === -100 * (slideArr.length - 1) ? setX(0) : setX(x - 100);
    console.log(x);
  };

  const bfHandler = () => {
    setX(0);
    console.log(x);
  };

  const measureHandler = () => {
    setX(-100);
    console.log(x);
  };

  const psychHandler = () => {
    setX(-200);
    console.log(x);
  };

  const cardioHandler = () => {
    setX(-300);
    console.log(x);
  };
  return (
    <React.Fragment>
      <div
        className={mode.darkMode ? "dark-selection-row" : "light-selection-row"}
      >
        <button onClick={bfHandler}>
          <FaWeight
            style={{ height: "1.8rem", color: "#969696", width: "auto" }}
          />
        </button>
        <button onClick={measureHandler}>
          <GiPincers
            style={{ height: "1.8rem", color: "#969696", width: "auto" }}
          />
        </button>
        <button onClick={psychHandler}>
          <GiBiceps
            style={{ height: "1.8rem", color: "#969696", width: "auto" }}
          />
        </button>
        <button onClick={cardioHandler}>
          <GiRun
            style={{ height: "1.8rem", color: "#969696", width: "auto" }}
          />
        </button>
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
                className="slide"
                style={{ transform: `translateX(${x}%)` }}
              >
                {item}
              </div>
            );
          })}
          <button id="goLeft" onClick={goLeft}>
            <FaChevronLeft style={{ height: "5rem" }} />
          </button>
          <button id="goRight" onClick={goRight}>
            <FaChevronRight style={{ height: "5rem" }} />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Slider;
