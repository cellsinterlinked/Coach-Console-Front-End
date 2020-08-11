import React, { useState, useContext } from 'react';
import './Slider.css';
import Chart from '../../../Checkins/components/Chart';
import {FaChevronLeft} from 'react-icons/fa';
import {FaChevronRight} from 'react-icons/fa';
import {DarkModeContext} from '../../context/dark-mode-context';

const Slider = (props) => {
  const mode = useContext(DarkModeContext)
  let slideArr = [<Chart />, 2,3,4];

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
  }

  const measureHandler = () => {
    setX(-100);
    console.log(x);
  }

  const psychHandler = () => {
    setX(-200);
    console.log(x);
  }
  return(
    <React.Fragment>
    <div className={mode.darkMode ? "dark-selection-row" : "light-selection-row"}>
      <button onClick={bfHandler}></button>
      <button onClick={measureHandler}></button>
      <button onClick={psychHandler}></button>
      <button></button>

    </div>
    <div className={mode.darkMode ? "dark-chart-container" : "light-chart-container"}>
    <div className="slider">
      {
        slideArr.map((item,index) => {
          return(
            <div key={index} className="slide" style={{transform: `translateX(${x}%)`}}>
            {item}
            </div>
          )
        })
      }
  <button id="goLeft" onClick={goLeft}><FaChevronLeft style={{height: "5rem"}} /></button>
  <button id="goRight" onClick={goRight}><FaChevronRight style={{height: "5rem"}} /></button>
    </div>
  </div>
  </React.Fragment>
  )
}

export default Slider;