import React, { useContext } from 'react'
import { DarkModeContext } from '../../context/dark-mode-context';
import './ModeToggle.css'

const ModeToggle = props => {
const mode = useContext(DarkModeContext);


return (
  <div className={mode.darkMode ? "dark-toggle-container" : "light-toggle-container"}>
          <span style={{ color: mode.darkMode ? "grey" : "yellow" }}>☀︎</span>
          <span className={mode.darkMode ? "dark-toggle" : "light-toggle"}>
            <input

              checked={mode.darkMode}
              onChange={mode.darkMode ? mode.toggleLight : mode.toggleDark}

              id="checkbox"
              className="checkbox"
              type="checkbox"
            />
            <label htmlFor="checkbox" />
          </span>
          <span style={{ color: mode.darkMode ? "slateblue" : "grey" }}>☾</span>
        </div>
)
}

export default ModeToggle;
