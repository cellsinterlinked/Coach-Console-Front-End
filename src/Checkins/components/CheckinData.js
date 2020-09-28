import React, {useContext} from 'react';
import { DarkModeContext } from '../../App';
import './CheckinData.css';

const CheckinData = props => {
  const {themeMode} = useContext(DarkModeContext);
  return (
    <div className={themeMode === 'darkTheme' ? "dark-checkin-item__dataBox" : "light-checkin-item__dataBox"}>
      <div className={themeMode === 'darkTheme' ? "dark-dataBox__iconContainer" : "light-dataBox__iconContainer"}>
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