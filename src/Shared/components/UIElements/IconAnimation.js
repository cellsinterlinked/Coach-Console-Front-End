import React from 'react';
import './IconAnimation.css';


const IconAnimation = ({loading, size}) => {
  // const [loading, setLoading] = useState(true);

  // const loadingHandler = () => {
  //   loading(!loading)
  // }

  return (
    <div className={`loaderContainer ${size}`}>
      <div className={loading ? "spin-iconWrapper" : "static-iconWrapper"}></div>

    <div
    // onClick={loadingHandler}
      className={
        loading
          ? 'icon-animation-wrapper-spin'
          : 'icon-animation-wrapper-static'
      }
    >
      <div className={loading ? "spinning-side-icon" : "static-side-icon"}></div>
      <div className={loading ? 'spin-first-c' : 'static-first-c'}>
        <h3>C</h3>
        <div className={loading ? 'word-holder-spin' : 'word-holder-static'}>
          OACH
         
        </div>
      </div>
      <div className={loading ? "spin-divider" : 'static-divider'}></div>
      <div className={loading ? 'spin-second-c' : 'static-second-c'}>
        <h3>C</h3>
        <div className={loading ? 'second-word-holder-spin' : 'second-word-holder-static'}>
         
          ONSOLE
        </div>
      </div>

    </div>
    </div>
  );
};

export default IconAnimation;
