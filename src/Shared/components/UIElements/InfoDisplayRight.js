import React, { useContext } from 'react'
import { DarkModeContext } from '../../../Shared/context/dark-mode-context';
import './InfoDisplayRight.css'
import { FaWeight } from 'react-icons/fa'

const InfoDisplayRight = props => {
  const mode = useContext(DarkModeContext)
  return (
   <div className={mode.darkMode ? "dark-infoRight-container" : "light-infoRight-container"}>
      <div  className="info-space">
        <div className={mode.darkMode ? "dark-right-info-line__Holder" : "light-right-info-line__Holder"}>
          <h2 >{props.title}</h2>
        </div>
        <div className={mode.darkMode ? "dark-right-info-line__Two" : "light-right-info-line__Two"}></div>
       
      </div>
    <div className={mode.darkMode ? "dark-infoRight-bubble" : "light-infoRight-bubble"}>
      <div className={mode.darkMode ? "dark-infoRight-bubble-second" : "light-infoRight-bubble-second"}>
        <div className={mode.darkMode ? "dark-infoRight-bubble-third" : "light-infoRight-bubble-third"}>
          <div className={mode.darkMode ? "dark-infoRight-bubble-inner" : "light-infoRight-bubble-inner"}>
            {props.children}
            <h2 className={mode.darkMode ? "dark-infoRight-bubble-info" : "light-infoRight-bubble-info"}>{props.data}</h2>
          </div>
        </div>
      </div>

    </div>
   </div>
  )
}

export default InfoDisplayRight;