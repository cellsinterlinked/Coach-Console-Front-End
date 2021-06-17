import React, {useState, useContext} from 'react';
import './IconEntrance.css';
import { DarkModeContext } from '../../context/dark-mode-context';


const IconEntrance = ({cancel}) => {
  const [loading, setLoading] = useState(true);
  const mode = useContext(DarkModeContext)

  const loadingHandler = () => {
    cancel(false)
  }

  setTimeout(function() {
    setLoading(false)
  }, 3000)

  return (
    <div className={`loaderContainer `}>
      {mode.darkMode ? <div className= {loading ? "dark-spin-iconWrapper" : "dark-static-iconWrapper"}> </div> : <div className={loading ? "spin-iconWrapper" : "static-iconWrapper"}></div>}

    <div
    onClick={loadingHandler}
      className={
        loading
          ? 'icon-animation-wrapper-spin'
          : 'icon-animation-wrapper-static'
      }
    >
      
      {mode.darkMode ? <div className={loading ? "spinningTopIcon" : "dark-staticTopIcon"}></div> : <div className={loading ? "spinningTopIcon" : "staticTopIcon"}></div>}
      <div className={loading ? 'spin-first-c' : 'static-first-c'}>
        <h3 style={{color: mode.darkMode ? "white" : "black" }}>C</h3>
        <div style={{color: mode.darkMode ? "white" : "black" }} className={loading ? 'word-holder-spin' : 'word-holder-static'}>
          OACH
         
        </div>
      </div>
      <div className={loading ? "spin-divider" : 'static-divider'}></div>
      <div className={loading ? 'spin-second-c' : 'static-second-c'}>
        <h3 style={{color: mode.darkMode ? "white" : "black" }}>C</h3>
        <div  style={{color: mode.darkMode ? "white" : "black" }} className={loading ? 'second-word-holder-spin' : 'second-word-holder-static'}>
         
          ONSOLE
        </div>
      </div>

    </div>
    </div>
  );
};

export default IconEntrance;
