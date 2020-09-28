import React, { useContext } from 'react'
import { DarkModeContext } from '../../../App';
import './InfoDisplayRight.css'


const InfoDisplayRight = props => {
  const {themeMode} = useContext(DarkModeContext);
  return (
   <div className={themeMode === 'darkTheme' ? "dark-infoRight-container" : "light-infoRight-container"}>
      <div  className="info-space">
        <div className={themeMode === 'darkTheme' ? "dark-right-info-line__Holder" : "light-right-info-line__Holder"}>
          <h2 >{props.title}</h2>
        </div>
        <div className={themeMode === 'darkTheme' ? "dark-right-info-line__Two" : "light-right-info-line__Two"}></div>

      </div>
    <div className={themeMode === 'darkTheme' ? "dark-infoRight-bubble" : "light-infoRight-bubble"}>
      <div className={themeMode === 'darkTheme' ? "dark-infoRight-bubble-second" : "light-infoRight-bubble-second"}>
        <div className={themeMode === 'darkTheme' ? "dark-infoRight-bubble-third" : "light-infoRight-bubble-third"}>
          <div className={themeMode === 'darkTheme' ? "dark-infoRight-bubble-inner" : "light-infoRight-bubble-inner"}>
            {props.children}
            <h2 className={themeMode === 'darkTheme' ? "dark-infoRight-bubble-info" : "light-infoRight-bubble-info"}>{props.data}</h2>
          </div>
        </div>
      </div>

    </div>
   </div>
  )
}

export default InfoDisplayRight;