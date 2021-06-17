import React from 'react';
import './IconAnimation.css';


const DarkIconAnimation = ({loading, size}) => {
  // const [loading, setLoading] = useState(true);

  // const loadingHandler = () => {
  //   loading(!loading)
  // }

  return (
    <div className={`loaderContainer ${size}`}>
      <div className={loading ? "dark-spin-iconWrapper" : "dark-static-iconWrapper"}></div>

    <div
    // onClick={loadingHandler}
      className={
        loading
          ? 'icon-animation-wrapper-spin'
          : 'icon-animation-wrapper-static'
      }
    >
      <div className={loading ? "dark-spinning-side-icon" : "dark-static-side-icon"}></div>
      <div className={loading ? 'spin-first-c' : 'static-first-c'}>
        <h3 style={{color: "white"}}>C</h3>
        <div style={{color: "white"}} className={loading ? 'word-holder-spin' : 'word-holder-static'}>
          OACH
         
        </div>
      </div>
      <div className={loading ? "spin-divider" : 'static-divider'}></div>
      <div className={loading ? 'spin-second-c' : 'static-second-c'}>
        <h3 style={{color: "white"}}>C</h3>
        <div style={{color: "white"}} className={loading ? 'second-word-holder-spin' : 'second-word-holder-static'}>
         
          ONSOLE
        </div>
      </div>

    </div>
    </div>
  );
};

export default DarkIconAnimation;
