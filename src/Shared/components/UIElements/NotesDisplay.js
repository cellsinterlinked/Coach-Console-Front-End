import React, { useContext } from 'react'
import { DarkModeContext } from '../../context/dark-mode-context';
import "./NotesDisplay.css";

const NotesDisplay = props => {
  const mode = useContext(DarkModeContext);
  return (
    <div className={mode.darkMode ? "dark-notes-display" : "light-notes-display"}>
      <h2>Notes</h2>
      
        <p>{props.notes}</p>
      
    </div>
  )
}

export default NotesDisplay;