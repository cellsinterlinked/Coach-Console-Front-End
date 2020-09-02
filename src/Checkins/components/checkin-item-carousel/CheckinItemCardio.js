import React from "react";
import CheckinData from '../CheckinData';
import './CheckinItemCarousel.css';
import {GiStopwatch } from "react-icons/gi";
import {GiBurningPassion} from "react-icons/gi";

const CheckinItemCardio = props => {
  return(
    <div className="checkinItem-inner-container">
    <CheckinData dataTitle="Total Cardio Duration" data={props.cardioDuration} children={<GiStopwatch style={{ height: "2rem", width: "auto", color: "#bf00ff" }}/>}  />
    <CheckinData dataTitle="Total Calories Burnt" data={props.cardioCalories} children={<GiBurningPassion style={{ height: "2rem", width: "auto", color: "#2fc6a6" }}/>} />
    </div>
  )
}

export default CheckinItemCardio;