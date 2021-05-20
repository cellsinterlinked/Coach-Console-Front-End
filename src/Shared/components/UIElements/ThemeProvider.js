import React, {useContext} from 'react'
import {DarkModeContext} from '../../context/dark-mode-context';



const ThemeProvider = () => {

  const mode = useContext(DarkModeContext)
  return (
    <div className = {mode.darkMode ? "darkTheme" : "lightTheme"}>

    </div>
  )
}

export default ThemeProvider;