import React, { useContext } from 'react'
import { DarkModeContext } from '../../../Shared/context/dark-mode-context';
import './InfoDisplayLeft.css'
import { GiPincers } from 'react-icons/gi'

const InfoDisplayLeft = props => {
  const mode = useContext(DarkModeContext)
  return (
   <div className={mode.darkMode ? "dark-infoLeft-container" : "light-infoLeft-container"}>
    <div className={mode.darkMode ? "dark-infoLeft-bubble" : "light-infoLeft-bubble"}>
      <div className={mode.darkMode ? "dark-infoLeft-bubble-second" : "light-infoLeft-bubble-second"}>
        <div className={mode.darkMode ? "dark-infoLeft-bubble-third" : "light-infoLeft-bubble-third"}>
          <div className={mode.darkMode ? "dark-infoLeft-bubble-inner" : "light-infoLeft-bubble-inner"}>
            {props.children}
            <h2 className={mode.darkMode ? "dark-infoLeft-bubble-info" : "light-infoLeft-bubble-info"}>{props.data}</h2>
          </div>
        </div>
      </div>

    </div>
      <div  className="info-space">
        <div className={mode.darkMode ? "dark-left-info-line__Two" : "light-left-info-line__Two"}></div>
        <div className={mode.darkMode ? "dark-left-info-line__Holder" : "light-left-info-line__Holder"}>
          <h2 >{props.title}</h2>
        </div>
      </div>
   </div>
  )
}

export default InfoDisplayLeft;