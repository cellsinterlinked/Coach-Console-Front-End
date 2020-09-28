import React, {useContext} from 'react';
import { DarkModeContext } from '../../../Shared/context/dark-mode-context';
import './CheckinItemCarousel.css';
import {IoIosPaper} from "react-icons/io";


const CheckinData = props => {
  
  const mode = useContext(DarkModeContext)
  return (
    <div className={mode.darkMode ? "dark-checkin-notes__dataBox" : "light-checkin-notes__dataBox"}>
    <div className="notes-top-row">
      <div className={mode.darkMode ? "dark-notesBox__iconContainer" : "light-notesBox__iconContainer"}>
        <IoIosPaper style={{ height: "2rem", width: "auto", color: "purple" }} />
      </div>
    <h2>Notes</h2>
    </div>
    <div className="notes-text__box">
    <p>{props.notes}</p>
    </div>

    </div>
  )

}

export default CheckinData;