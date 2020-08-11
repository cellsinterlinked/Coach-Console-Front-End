import React, { useState, useContext } from 'react';
import './ImageRotate.css';
import Chart from '../../../Checkins/components/Chart';
import {FaChevronLeft} from 'react-icons/fa';
import {FaChevronRight} from 'react-icons/fa';
import {DarkModeContext} from '../../context/dark-mode-context';
import Skinny from '../../Resources/Skinny.jpeg';
import Buff from '../../Resources/buff.png';
import ImgComp from '../../components/UIElements/ImgComp';

const Slider = (props) => {
  const mode = useContext(DarkModeContext)
  let slideArr = [<ImgComp src={Skinny} />, <ImgComp src={Buff} />];

  const [x, setX] = useState(0);

  const goLeft = () => {
    x === 0 ? setX(-100 * (slideArr.length - 1)) : setX(x + 100);
    console.log(x);
  };

  const goRight = () => {
    x === -100 * (slideArr.length - 1) ? setX(0) : setX(x - 100);
    console.log(x);
  };

  return(
    <React.Fragment>
    
    <div className={mode.darkMode ? "dark-image-rotate-container" : "light-image-rotate-container"}>
    <div className="image-carousel">
      {
        slideArr.map((item,index) => {
          return(
            <div key={index} className="rotate" style={{transform: `translateX(${x}%)`}}>
            {item}
            </div>
          )
        })
      }
  <button id="rotateLeft" onClick={goLeft}><FaChevronLeft style={{height: "5rem"}} /></button>
  <button id="rotateRight" onClick={goRight}><FaChevronRight style={{height: "5rem"}} /></button>
    </div>
  </div>
  </React.Fragment>
  )
}

export default Slider;