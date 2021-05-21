import React, {useState, useEffect, useContext} from 'react';
import './CheckinPage.css';
import './CheckinRotate.css';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import {DarkModeContext} from '../../Shared/context/dark-mode-context';
import MainNavigation from '../../Shared/components/Navigation/MainNavigation';
import {FaWeight} from 'react-icons/fa';
import { GiPincers } from "react-icons/gi";
import { GiMuscularTorso } from "react-icons/gi";
import {IoIosBody} from 'react-icons/io';
import { GiRun } from 'react-icons/gi';


const CheckinPage = () => {

  
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const[loadedCheckins, setLoadedCheckins] = useState();
  const [exactCheckin, setExactCheckins] = useState()
  const mode = useContext(DarkModeContext);
  const checkinId = useParams().checkinId;
  const clientId = useParams().clientId

  const [currentSpoke, setCurrentSpoke] = useState(1)
  const [prevBigPic, setPrevBigPic] = useState(0)
  const [newBigPic, setNewBigPic] = useState(0)
  

  const prevTestArray = [
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F0%2F06%2FKitten_in_Rizal_Park%252C_Manila.jpg%2F1200px-Kitten_in_Rizal_Park%252C_Manila.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.jedicraftgirl.com%2Fwp-content%2Fuploads%2F2015%2F01%2Fbengal-kitten-7.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fexternal-preview.redd.it%2FkBQHa5SohMM7vSaNW8I8NgFXYVQt0SG5RRlYriGe0JI.jpg%3Fauto%3Dwebp%26s%3Da227e530deab278ea084ce0eb892af186a0a3717&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapertag.com%2Fwallpaper%2Ffull%2Fd%2Fd%2Fb%2F881831-amazing-cute-kitten-pictures-wallpaper-1080x1920-cell-phone.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsussextravelclinic.com%2Fwp-content%2Fuploads%2F2016%2F01%2Fkitten-istock.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F0%2F0b%2FHeilige_Birma_Kitten.jpg%2F1200px-Heilige_Birma_Kitten.jpg&f=1&nofb=1"


  ]

  const newTestArray = [
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rescuepets.com.au%2Fapp%2Fuploads%2F1%2F886d92993c90c6a6bd6308706c4a24ac951c7272a515d64392214ee7d170dab4.jpg-1500x.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F6%2F66%2FAn_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg%2F1200px-An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fdev.veterinarians.com%2Fwp-content%2Fuploads%2F2019%2F02%2Fbengal-cat-commonly-found-from-cat-breeder.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcmkt-image-prd.freetls.fastly.net%2F0.1.0%2Fps%2F6711634%2F1820%2F2730%2Fm1%2Ffpnw%2Fwm1%2Fnpnmycgwlhr8vnb8zl9gtxxn3cd2w0zr0qmohbnnfbacv097kzgovomld1tzlgg3-.jpg%3F1563632550%26s%3D8637185b5f40d4b7e7332e14e0bf34ce&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.fineartamerica.com%2Fimages%2Fartworkimages%2Fmediumlarge%2F1%2Fportrait-gray-tabby-cat-maika-777.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fjooinn.com%2Fimages%2Fgray-cat-12.jpg&f=1&nofb=1"



  ]

  useEffect(() => {
    const fetchCheckins = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/checkins/athlete/${clientId}`);
        setLoadedCheckins(responseData.checkins)
        setExactCheckins(responseData.checkins.filter(checkin => checkin.id === checkinId ))
        

      } catch (err) {}
    };
    fetchCheckins();
  }, [sendRequest, clientId, checkinId]);


  const turner = (num) => {
    setCurrentSpoke(num)
  }

  return (
    <div className={mode.darkMode ? "dark-checkin-page-container" : "light-checkin-page-container"}>
      <MainNavigation />
    
      <div className={mode.darkMode ? "dark-ghost-wheel-container" : "light-ghost-wheel-container" }>


      <div className={`wheel-container wheel${currentSpoke}`}>
        
        <div className={mode.darkMode ? `dark-wheel-center` : `light-wheel-center`}>
        <div className={mode.darkMode ? `dark-ghost-center one${currentSpoke}` : `light-ghost-center one${currentSpoke}`}></div>
          <div className="test-spoke"></div>
        <div className={mode.darkMode ? "first-spoke dark-spoke-container" : "first-spoke light-spoke-container"}>
            <div className={mode.darkMode ? "spoke-box1-dark" : "spoke-box1-light"}></div>
            <div className={mode.darkMode ? `spoke-box2-dark onebar${currentSpoke}` : `spoke-box2-light onebar${currentSpoke}`}></div>
            <div style={{width: currentSpoke === 1 ? "5rem" : "3rem", height: currentSpoke === 1 ? "5rem": "3rem", right: currentSpoke === 1 ? "-1.6rem" : "-0.55rem",  padding: currentSpoke === 1 ? "12px" : "8px"}} 
                  onClick={() => turner(1)} className={mode.darkMode ? `spoke-box3-dark one${currentSpoke}` : `spoke-box3-light one${currentSpoke}`}>
                    <FaWeight className={mode.darkMode ? `dark-spoke1-icon ` : `light-spoke1-icon`} style={{ color: currentSpoke === 1 ? "#b618ff" : "white"}}/>
                    <p style={{opacity: currentSpoke === 1 ? "1" : "0", transition: "all 0.3s"}} className={mode.darkMode ? "dark-spoke-label" : 'light-spoke-label'}>Weight</p>
                    </div>
        </div>

        <div className={mode.darkMode ? "second-spoke dark-spoke-container" : "second-spoke light-spoke-container"}>
            <div className={mode.darkMode ? "spoke-box1-dark" : "spoke-box1-light"}></div>
            <div className={mode.darkMode ? `spoke-box2-dark twobar${currentSpoke}` : `spoke-box2-light twobar${currentSpoke}`}></div>
            <div style={{width: currentSpoke === 2 ? "5rem" : "3rem", height: currentSpoke === 2 ? "5rem": "3rem", right: currentSpoke === 2 ? "-1.6rem" : "-0.55rem", padding: currentSpoke === 2 ? "12px" : "8px"}}
            onClick={() => turner(2)} className={mode.darkMode ? `spoke-box3-dark two${currentSpoke}` : `spoke-box3-light two${currentSpoke}`}>
              <GiPincers className={mode.darkMode ? "dark-spoke1-icon" : "light-spoke1-icon"} style={{ color: currentSpoke === 2 ? "#b618ff" : "white"}}/>
              <p style={{opacity: currentSpoke === 2 ? "1" : "0", transition: "all 0.3s"}}className={mode.darkMode ? "dark-spoke-label" : 'light-spoke-label'}>BodyFat</p>
              </div>
        </div>

        <div className={mode.darkMode ? "third-spoke dark-spoke-container" : "third-spoke light-spoke-container"}>
            <div  className={mode.darkMode ? "spoke-box1-dark" : "spoke-box1-light"}></div>
            <div  className={mode.darkMode ? `spoke-box2-dark threebar${currentSpoke}` : `spoke-box2-light threebar${currentSpoke}`}></div>
            <div style={{width: currentSpoke === 3 ? "5rem" : "3rem", height: currentSpoke === 3 ? "5rem": "3rem", right: currentSpoke === 3 ? "-1.6rem" : "-0.55rem" , padding: currentSpoke === 3 ? "12px" : "8px"}}
            onClick={() => turner(3)} className={mode.darkMode ? `spoke-box3-dark three${currentSpoke}` : `spoke-box3-light three${currentSpoke}`}><GiMuscularTorso 
            className={mode.darkMode ? "dark-spoke1-icon" : "light-spoke1-icon"} style={{ color: currentSpoke === 3 ? "#b618ff" : "white"}}/>
            <p style={{opacity: currentSpoke === 3 ? "1" : "0", transition: "all 0.3s"}}className={mode.darkMode ? "dark-spoke-label" : 'light-spoke-label'}>Pictures</p>
            </div>
        </div>

        <div className={mode.darkMode ? "fourth-spoke dark-spoke-container" : "fourth-spoke light-spoke-container"}>
            <div className={mode.darkMode ? "spoke-box1-dark" : "spoke-box1-light"}></div>
            <div className={mode.darkMode ? `spoke-box2-dark fourbar${currentSpoke}` : `spoke-box2-light fourbar${currentSpoke}`}></div>
            <div style={{width: currentSpoke === 4 ? "5rem" : "3rem", height: currentSpoke === 4 ? "5rem": "3rem", right: currentSpoke === 4 ? "-1.6rem" : "-0.55rem" , padding: currentSpoke === 4 ? "12px" : "8px"}}
            onClick={() => turner(4)} className={mode.darkMode ? `spoke-box3-dark four${currentSpoke}` : `spoke-box3-light four${currentSpoke}`}>
              <IoIosBody className={mode.darkMode ? "dark-spoke1-icon" : "light-spoke1-icon"} style={{ color: currentSpoke === 4 ? "#b618ff" : "white"}} />
              <p style={{opacity: currentSpoke === 4 ? "1" : "0", transition: "all 0.3s"}}className={mode.darkMode ? "dark-spoke-label" : 'light-spoke-label'}>Measure</p>
              </div>
        </div>

        <div className={mode.darkMode ? "fifth-spoke dark-spoke-container" : "fifth-spoke light-spoke-container"}>
            <div className={mode.darkMode ? `spoke-box1-dark icon${currentSpoke}` : `spoke-box1-light`}></div>
            <div className={mode.darkMode ? `spoke-box2-dark fivebar${currentSpoke}` : `spoke-box2-light fivebar${currentSpoke}`}></div>
            <div style={{width: currentSpoke === 5 ? "5rem" : "3rem", height: currentSpoke === 5 ? "5rem": "3rem", right: currentSpoke === 5 ? "-1.6rem" : "-0.55rem" , padding: currentSpoke === 5 ? "12px" : "8px"}} 
              onClick={() => turner(5)}className={mode.darkMode ? `spoke-box3-dark five${currentSpoke}` : `spoke-box3-light five${currentSpoke}`}>
                <GiRun className={mode.darkMode ? "dark-spoke1-icon" : "light-spoke1-icon"} style={{ color: currentSpoke === 5 ? "#b618ff" : "white"}}/>
                <p style={{opacity: currentSpoke === 5 ? "1" : "0", transition: "all 0.3s"}}className={mode.darkMode ? "dark-spoke-label" : 'light-spoke-label'}>Cardio</p>
                </div>
        </div>

        
        </div>
      </div>

      </div>
    <div className='checkin-stats-wrapper'>
     {currentSpoke === 1 && <div className={mode.darkMode ? "dark-wheel-info-box" : "light-wheel-info-box"}>
     <div className="wheel-info-box__wrapper">
          <div className="wheel-info-column bf-column1">
            <p style={{color: mode.darkMode ? "white" : "black"}}>Date</p>
            <p style={{color: mode.darkMode ? "white" : "black"}}>Weight</p>
            <p style={{color: mode.darkMode ? "white" : "black"}}>Lean Mass</p>
            <p style={{color: mode.darkMode ? "white" : "black"}}>Fat Mass</p>
            <p style={{color: mode.darkMode ? "white" : "black"}}>Total Weeks</p>
            
             </div>
          <div className="wheel-info-column">
              <p style={{color: mode.darkMode ? "white" : "black"}}>Current</p>
              <p className="info-highlight">10</p>
              <p className="info-highlight">8</p>
              <p className="info-highlight">12</p>
              <p className="info-highlight">14</p>
              <p className="info-highlight">7</p>
              <p className="info-highlight">9</p>
              <p className="info-highlight">13</p>
              <p className="info-highlight">9</p>
             </div>
          <div className="wheel-info-column">
              <p style={{color: mode.darkMode ? "white" : "black"}} >Prev</p>
              <p className="info-highlight">11</p>
              <p className="info-highlight">10</p>
              <p className="info-highlight">14</p>
              <p className="info-highlight">15</p>
              <p className="info-highlight">8</p>
              <p className="info-highlight">10</p>
              <p className="info-highlight">14</p>
              <p className="info-highlight">9</p>
             </div>
          <div className="wheel-info-column">
            <p style={{color: mode.darkMode ? "white" : "black"}}>Progress</p>
            <p className="info-highlight">1%</p>
              <p className="info-highlight">2mm</p>
              <p className="info-highlight">2mm</p>
              <p className="info-highlight">1mm</p>
              <p className="info-highlight">1mm</p>
              <p className="info-highlight">1mm</p>
              <p className="info-highlight">1mm</p>
              <p className="info-highlight">0mm</p>
             </div>
        
        </div>

      </div>}

      {currentSpoke === 2 && <div className={mode.darkMode ? "dark-wheel-info-box" : "light-wheel-info-box"}>
        <div className="wheel-info-box__wrapper">
          <div className="wheel-info-column bf-column1">
            <p style={{color: mode.darkMode ? "white" : "black"}}>Fat%</p>
            <p  style={{color: mode.darkMode ? "white" : "black"}}>Chest</p>
            <p style={{color: mode.darkMode ? "white" : "black"}}>Axilla</p>
            <p style={{color: mode.darkMode ? "white" : "black"}}>Tricep</p>
            <p style={{color: mode.darkMode ? "white" : "black"}}>Subsc</p>
            <p style={{color: mode.darkMode ? "white" : "black"}}>Abdom</p>
            <p style={{color: mode.darkMode ? "white" : "black"}}>Supra</p>
            <p style={{color: mode.darkMode ? "white" : "black"}}>Thigh</p>
             </div>
          <div className="wheel-info-column">
              <p style={{color: mode.darkMode ? "white" : "black"}}>Current</p>
              <p className="info-highlight">10</p>
              <p className="info-highlight">8</p>
              <p className="info-highlight">12</p>
              <p className="info-highlight">14</p>
              <p className="info-highlight">7</p>
              <p className="info-highlight">9</p>
              <p className="info-highlight">13</p>
              <p className="info-highlight">9</p>
             </div>
          <div className="wheel-info-column">
              <p style={{color: mode.darkMode ? "white" : "black"}}>Prev</p>
              <p className="info-highlight">11</p>
              <p className="info-highlight">10</p>
              <p className="info-highlight">14</p>
              <p className="info-highlight">15</p>
              <p className="info-highlight">8</p>
              <p className="info-highlight">10</p>
              <p className="info-highlight">14</p>
              <p className="info-highlight">9</p>
             </div>
          <div className="wheel-info-column">
            <p style={{color: mode.darkMode ? "white" : "black"}}>Progress</p>
            <p className="info-highlight">1%</p>
              <p className="info-highlight">2mm</p>
              <p className="info-highlight">2mm</p>
              <p className="info-highlight">1mm</p>
              <p className="info-highlight">1mm</p>
              <p className="info-highlight">1mm</p>
              <p className="info-highlight">1mm</p>
              <p className="info-highlight">0mm</p>
             </div>
        
        </div>
      </div>}

      {currentSpoke === 3 && <div className={mode.darkMode ? "dark-wheel-info-box" : "light-wheel-info-box"}>
        <div className="wheel-info-box__wrapper">


          <div className="picture-info-column">
            <p style={{color: mode.darkMode ? "white" : "black"}}>Previous Check In</p>
            <img src={prevTestArray[prevBigPic]} alt=""/>
          </div>


          <div className="picture-info-column">
            <p style={{color: mode.darkMode ? "white" : "black"}}>Current Check In</p>
          <img src={newTestArray[newBigPic]} alt=""/>
            </div>


          <div className="picture-preview-wrapper">
            <div className= "picture-preview-list">
              {prevTestArray.map((picture, index) => <div key={picture}  className="kitten-wrapper"><img onClick={() => setPrevBigPic(index)} alt="" src={picture}/></div>)}
            </div>


            <div className="picture-preview-list">
              {newTestArray.map((picture, index) => <div key={picture}  className="kitten-wrapper"><img onClick={() => setNewBigPic(index)} alt="" src={picture}/></div>)}
              </div>


          </div>
          </div>

      </div>}

      {currentSpoke === 4 && <div className={mode.darkMode ? "dark-wheel-info-box" : "light-wheel-info-box"}>
      <div className="wheel-info-box__wrapper">
          <div className="wheel-info-column bf-column1">
            <p style={{color: mode.darkMode ? "white" : "black"}}>Total</p>
            <p style={{color: mode.darkMode ? "white" : "black"}} >Neck</p>
            <p style={{color: mode.darkMode ? "white" : "black"}}>Arm</p>
            <p style={{color: mode.darkMode ? "white" : "black"}}>Chest</p>
            <p style={{color: mode.darkMode ? "white" : "black"}}>Waist</p>
            <p style={{color: mode.darkMode ? "white" : "black"}}>Hips</p>
            <p style={{color: mode.darkMode ? "white" : "black"}}>Thigh</p>
            <p style={{color: mode.darkMode ? "white" : "black"}}>Calf</p>
             </div>
          <div className="wheel-info-column">
              <p style={{color: mode.darkMode ? "white" : "black"}}>Current</p>
              <p className="info-highlight">10</p>
              <p className="info-highlight">8</p>
              <p className="info-highlight">12</p>
              <p className="info-highlight">14</p>
              <p className="info-highlight">7</p>
              <p className="info-highlight">9</p>
              <p className="info-highlight">13</p>
              <p className="info-highlight">9</p>
             </div>
          <div className="wheel-info-column">
              <p style={{color: mode.darkMode ? "white" : "black"}} >Prev</p>
              <p className="info-highlight">11</p>
              <p className="info-highlight">10</p>
              <p className="info-highlight">14</p>
              <p className="info-highlight">15</p>
              <p className="info-highlight">8</p>
              <p className="info-highlight">10</p>
              <p className="info-highlight">14</p>
              <p className="info-highlight">9</p>
             </div>
          <div className="wheel-info-column">
            <p style={{color: mode.darkMode ? "white" : "black"}}>Progress</p>
            <p className="info-highlight">10in</p>
              <p className="info-highlight">2in</p>
              <p className="info-highlight">2in</p>
              <p className="info-highlight">1in</p>
              <p className="info-highlight">1in</p>
              <p className="info-highlight">1in</p>
              <p className="info-highlight">1in</p>
              <p className="info-highlight">0in</p>
             </div>
        
        </div>

      </div>}

      {currentSpoke === 5 && <div className={mode.darkMode ? "dark-wheel-info-box" : "light-wheel-info-box"}>
      <div className="wheel-info-box__wrapper">
          <div className="wheel-info-column bf-column1">
            <p style={{color: mode.darkMode ? "white" : "black"}}>Total</p>
            <p style={{color: mode.darkMode ? "white" : "black"}}>Days</p>
            <p style={{color: mode.darkMode ? "white" : "black"}}> Session Time</p>
            <p style={{color: mode.darkMode ? "white" : "black"}}>Calories</p>
            <p style={{color: mode.darkMode ? "white" : "black"}}>Type</p>
            
             </div>
          <div className="wheel-info-column">
              <p style={{color: mode.darkMode ? "white" : "black"}}>Current</p>
              <p className="info-highlight">50</p>
              <p className="info-highlight">5</p>
              <p className="info-highlight">10</p>
              <p className="info-highlight">1000</p>
              <p className="info-highlight">Run</p>
              
             </div>
          <div className="wheel-info-column">
              <p style={{color: mode.darkMode ? "white" : "black"}}>Prev</p>
              <p className="info-highlight">40</p>
              <p className="info-highlight">4</p>
              <p className="info-highlight">10</p>
              <p className="info-highlight">800</p>
              <p className="info-highlight">Run</p>
              
             </div>
          <div className="wheel-info-column">
            <p style={{color: mode.darkMode ? "white" : "black"}}>Progress</p>
            <p className="info-highlight">10Mins</p>
              <p className="info-highlight">1Days</p>
              <p className="info-highlight">0Mins</p>
              <p className="info-highlight">200Cals</p>
              <p className="info-highlight"> --</p>
             
             </div>
        
        </div>


    </div>}


      </div>
    </div>
  )
}

export default CheckinPage;