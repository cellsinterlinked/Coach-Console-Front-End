import React, { useContext } from 'react'
import { DarkModeContext } from '../../context/dark-mode-context';
import './ModeToggle.css'

const ModeToggle = props => {
const mode = useContext(DarkModeContext);


return (
  <div className="toggle-container">
          <span style={{ color: mode.darkMode ? "grey" : "yellow" }}>☀︎</span>
          <span className="toggle">
            <input

              checked={mode.darkMode}
              // onChange={() => mode.setDarkMode(prevMode => !prevMode)}

              id="checkbox"
              className="checkbox"
              type="checkbox"
            />
            <label htmlFor="checkbox" />
          </span>
          <span style={{ color: mode.darkMode ? "slateblue" : "grey" }}>☾</span>
          {/* <button onClick={() => setDarkMode(prevMode => !prevMode)}>
          Toggle
        </button> */}
        </div>
)
}

export default ModeToggle;
