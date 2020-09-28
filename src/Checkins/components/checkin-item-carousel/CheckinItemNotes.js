import React, {useContext} from 'react';
import { DarkModeContext } from '../../../App';
import './CheckinItemCarousel.css';
import {IoIosPaper} from "react-icons/io";


const CheckinData = props => {

  const {themeMode} = useContext(DarkModeContext);
  return (
    <div className={themeMode === 'darkTheme' ? "dark-checkin-notes__dataBox" : "light-checkin-notes__dataBox"}>
    <div className="notes-top-row">
      <div className={themeMode === 'darkTheme' ? "dark-notesBox__iconContainer" : "light-notesBox__iconContainer"}>
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