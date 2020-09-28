import React, { useContext } from 'react'
import { DarkModeContext } from '../../../App';
import './InfoDisplayLeft.css'

const InfoDisplayLeft = props => {
  const {themeMode} = useContext(DarkModeContext);
  return (
   <div className={themeMode === 'darkTheme' ? "dark-infoLeft-container" : "light-infoLeft-container"}>
    <div className={themeMode === 'darkTheme' ? "dark-infoLeft-bubble" : "light-infoLeft-bubble"}>
      <div className={themeMode === 'darkTheme' ? "dark-infoLeft-bubble-second" : "light-infoLeft-bubble-second"}>
        <div className={themeMode === 'darkTheme' ? "dark-infoLeft-bubble-third" : "light-infoLeft-bubble-third"}>
          <div className={themeMode === 'darkTheme' ? "dark-infoLeft-bubble-inner" : "light-infoLeft-bubble-inner"}>
            {props.children}
            <h2 className={themeMode === 'darkTheme' ? "dark-infoLeft-bubble-info" : "light-infoLeft-bubble-info"}>{props.data}</h2>
          </div>
        </div>
      </div>

    </div>
      <div  className="info-space">
        <div className={themeMode === 'darkTheme' ? "dark-left-info-line__Two" : "light-left-info-line__Two"}></div>
        <div className={themeMode === 'darkTheme' ? "dark-left-info-line__Holder" : "light-left-info-line__Holder"}>
          <h2 >{props.title}</h2>
        </div>
      </div>
   </div>
  )
}

export default InfoDisplayLeft;