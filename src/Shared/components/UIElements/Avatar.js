import React, {useContext} from 'react';
import { DarkModeContext } from '../../context/dark-mode-context';

import './Avatar.css';

const Avatar = props => {
  const mode = useContext(DarkModeContext);

  return (
    <div className={mode.darkMode ? 'dark-avatar-container' : 'light-avatar-container'}>
    <div className={mode.darkMode ? "dark-avatar" : 'light-avatar'}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>


    </div>
  );
};

export default Avatar;