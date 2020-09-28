import React, {useContext} from 'react';
import { DarkModeContext } from '../../Shared/context/dark-mode-context';
import './CheckinData.css';

const CheckinData = props => {
  const mode = useContext(DarkModeContext)
  return (
    <div className={mode.darkMode ? "dark-checkin-item__dataBox" : "light-checkin-item__dataBox"}>
      <div className={mode.darkMode ? "dark-dataBox__iconContainer" : "light-dataBox__iconContainer"}>
        {props.children}
      </div>
    <div className="data-text__box">
    <h2>{props.dataTitle}</h2>
    <p>{props.data}</p>
    </div>

    </div>
  )

}

export default CheckinData;