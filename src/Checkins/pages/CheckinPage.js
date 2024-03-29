import React, { useState, useEffect, useContext } from 'react';
import './CheckinPage.css';
import './CheckinRotate.css';
import '../components/CheckinTotals.css';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import { DarkModeContext } from '../../Shared/context/dark-mode-context';
import MainNavigation from '../../Shared/components/Navigation/MainNavigation';
import { FaWeight } from 'react-icons/fa';
import { GiPincers } from 'react-icons/gi';
import { GiMuscularTorso } from 'react-icons/gi';
import { IoIosBody } from 'react-icons/io';
import { GiRun } from 'react-icons/gi';
import Button from '../../Shared/components/FormElements/Button';
import Modal from '../../Shared/components/UIElements/Modal.js'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../Shared/context/auth-context';
import IconAnimation from '../../Shared/components/UIElements/IconAnimation';
import DarkIconAnimation from '../../Shared/components/UIElements/DarkIconAnimation';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';

const CheckinPage = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCheckins, setLoadedCheckins] = useState();
  const [exactCheckin, setExactCheckins] = useState();
  const [previousCheckin, setPreviousCheckin] = useState();
  const mode = useContext(DarkModeContext);
  const auth = useContext(AuthContext)
  const checkinId = useParams().checkinId;
  const clientId = useParams().clientId;
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [currentSpoke, setCurrentSpoke] = useState(1);
  const [prevBigPic, setPrevBigPic] = useState(0);
  const [newBigPic, setNewBigPic] = useState(0);
  const history = useHistory();


  useEffect(() => {
    const fetchCheckins = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/checkins/athlete/${clientId}`,
          'GET',
          null,
          {
            Authorization: 'Bearer ' + auth.token
          }
        );
        setLoadedCheckins(responseData.checkins);
        setExactCheckins(
          responseData.checkins.filter((checkin) => checkin.id === checkinId)
        );
        let checkinIndex = responseData.checkins.findIndex(
          (checkin) => checkin.id === checkinId
        );
        setPreviousCheckin(responseData.checkins[checkinIndex - 1]);
      } catch (err) {
        console.log(err)
      }
    };
    fetchCheckins();
  }, [sendRequest, clientId, checkinId, auth.token]);

  const turner = (num) => {
    setCurrentSpoke(num);
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/checkins/${checkinId}`,
        "DELETE",
        null,
        {
          Authorization: 'Bearer ' + auth.token
        }
      );
      history.push(`/${clientId}/checkins`);
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <>
    { !mode.darkMode && <div className="center loaderOverlay">
      <IconAnimation loading={isLoading} />
    </div>}

    {mode.darkMode && <div className="center dark-loaderOverlay">
      <DarkIconAnimation loading={isLoading} />
    </div>}
    </>
    )
  }



  return (
    <div
    
      className={
        mode.darkMode
          ? 'dark-checkin-page-container'
          : 'light-checkin-page-container'
      }
    >
      <MainNavigation />
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p
          className={mode.darkMode ? "dark-warning-text" : "light-warning-text"}
        >
          Do you want to delete this check-in?
        </p>
      </Modal>

      <div
        className={
          mode.darkMode
            ? 'dark-ghost-wheel-container'
            : 'light-ghost-wheel-container'
        }
      >
        <div className={`wheel-container wheel${currentSpoke}`}>
          <div
            className={
              mode.darkMode ? `dark-wheel-center` : `light-wheel-center`
            }
          >
            <div
              className={
                mode.darkMode
                  ? `dark-ghost-center one${currentSpoke}`
                  : `light-ghost-center one${currentSpoke}`
              }
            ></div>
            <div className="test-spoke"></div>
            <div
              className={
                mode.darkMode
                  ? 'first-spoke dark-spoke-container'
                  : 'first-spoke light-spoke-container'
              }
            >
              <div
                className={
                  mode.darkMode ? 'spoke-box1-dark' : 'spoke-box1-light'
                }
              ></div>
              <div
                className={
                  mode.darkMode
                    ? `spoke-box2-dark onebar${currentSpoke}`
                    : `spoke-box2-light onebar${currentSpoke}`
                }
              ></div>
              <div
                style={{
                  width: currentSpoke === 1 ? '5rem' : '3rem',
                  height: currentSpoke === 1 ? '5rem' : '3rem',
                  right: currentSpoke === 1 ? '-1.6rem' : '-0.55rem',
                  padding: currentSpoke === 1 ? '12px' : '8px',
                }}
                onClick={() => turner(1)}
                className={
                  mode.darkMode
                    ? `spoke-box3-dark one${currentSpoke}`
                    : `spoke-box3-light one${currentSpoke}`
                }
              >
                <FaWeight
                  className={
                    mode.darkMode ? `dark-spoke1-icon ` : `light-spoke1-icon`
                  }
                  style={{ color: currentSpoke === 1 ? '#b618ff' : 'white' }}
                />
                <p
                  style={{
                    opacity: currentSpoke === 1 ? '1' : '0',
                    transition: 'all 0.3s',
                  }}
                  className={
                    mode.darkMode ? 'dark-spoke-label' : 'light-spoke-label'
                  }
                >
                  Weight
                </p>
              </div>
            </div>

            <div
              className={
                mode.darkMode
                  ? 'second-spoke dark-spoke-container'
                  : 'second-spoke light-spoke-container'
              }
            >
              <div
                className={
                  mode.darkMode ? 'spoke-box1-dark' : 'spoke-box1-light'
                }
              ></div>
              <div
                className={
                  mode.darkMode
                    ? `spoke-box2-dark twobar${currentSpoke}`
                    : `spoke-box2-light twobar${currentSpoke}`
                }
              ></div>
              <div
                style={{
                  width: currentSpoke === 2 ? '5rem' : '3rem',
                  height: currentSpoke === 2 ? '5rem' : '3rem',
                  right: currentSpoke === 2 ? '-1.6rem' : '-0.55rem',
                  padding: currentSpoke === 2 ? '12px' : '8px',
                }}
                onClick={() => turner(2)}
                className={
                  mode.darkMode
                    ? `spoke-box3-dark two${currentSpoke}`
                    : `spoke-box3-light two${currentSpoke}`
                }
              >
                <GiPincers
                  className={
                    mode.darkMode ? 'dark-spoke1-icon' : 'light-spoke1-icon'
                  }
                  style={{ color: currentSpoke === 2 ? '#b618ff' : 'white' }}
                />
                <p
                  style={{
                    opacity: currentSpoke === 2 ? '1' : '0',
                    transition: 'all 0.3s',
                  }}
                  className={
                    mode.darkMode ? 'dark-spoke-label' : 'light-spoke-label'
                  }
                >
                  BodyFat
                </p>
              </div>
            </div>

            <div
              className={
                mode.darkMode
                  ? 'third-spoke dark-spoke-container'
                  : 'third-spoke light-spoke-container'
              }
            >
              <div
                className={
                  mode.darkMode ? 'spoke-box1-dark' : 'spoke-box1-light'
                }
              ></div>
              <div
                className={
                  mode.darkMode
                    ? `spoke-box2-dark threebar${currentSpoke}`
                    : `spoke-box2-light threebar${currentSpoke}`
                }
              ></div>
              <div
                style={{
                  width: currentSpoke === 3 ? '5rem' : '3rem',
                  height: currentSpoke === 3 ? '5rem' : '3rem',
                  right: currentSpoke === 3 ? '-1.6rem' : '-0.55rem',
                  padding: currentSpoke === 3 ? '12px' : '8px',
                }}
                onClick={() => turner(3)}
                className={
                  mode.darkMode
                    ? `spoke-box3-dark three${currentSpoke}`
                    : `spoke-box3-light three${currentSpoke}`
                }
              >
                <GiMuscularTorso
                  className={
                    mode.darkMode ? 'dark-spoke1-icon' : 'light-spoke1-icon'
                  }
                  style={{ color: currentSpoke === 3 ? '#b618ff' : 'white' }}
                />
                <p
                  style={{
                    opacity: currentSpoke === 3 ? '1' : '0',
                    transition: 'all 0.3s',
                  }}
                  className={
                    mode.darkMode ? 'dark-spoke-label' : 'light-spoke-label'
                  }
                >
                  Pictures
                </p>
              </div>
            </div>

            <div
              className={
                mode.darkMode
                  ? 'fourth-spoke dark-spoke-container'
                  : 'fourth-spoke light-spoke-container'
              }
            >
              <div
                className={
                  mode.darkMode ? 'spoke-box1-dark' : 'spoke-box1-light'
                }
              ></div>
              <div
                className={
                  mode.darkMode
                    ? `spoke-box2-dark fourbar${currentSpoke}`
                    : `spoke-box2-light fourbar${currentSpoke}`
                }
              ></div>
              <div
                style={{
                  width: currentSpoke === 4 ? '5rem' : '3rem',
                  height: currentSpoke === 4 ? '5rem' : '3rem',
                  right: currentSpoke === 4 ? '-1.6rem' : '-0.55rem',
                  padding: currentSpoke === 4 ? '12px' : '8px',
                }}
                onClick={() => turner(4)}
                className={
                  mode.darkMode
                    ? `spoke-box3-dark four${currentSpoke}`
                    : `spoke-box3-light four${currentSpoke}`
                }
              >
                <IoIosBody
                  className={
                    mode.darkMode ? 'dark-spoke1-icon' : 'light-spoke1-icon'
                  }
                  style={{ color: currentSpoke === 4 ? '#b618ff' : 'white' }}
                />
                <p
                  style={{
                    opacity: currentSpoke === 4 ? '1' : '0',
                    transition: 'all 0.3s',
                  }}
                  className={
                    mode.darkMode ? 'dark-spoke-label' : 'light-spoke-label'
                  }
                >
                  Measure
                </p>
              </div>
            </div>

            <div
              className={
                mode.darkMode
                  ? 'fifth-spoke dark-spoke-container'
                  : 'fifth-spoke light-spoke-container'
              }
            >
              <div
                className={
                  mode.darkMode
                    ? `spoke-box1-dark icon${currentSpoke}`
                    : `spoke-box1-light`
                }
              ></div>
              <div
                className={
                  mode.darkMode
                    ? `spoke-box2-dark fivebar${currentSpoke}`
                    : `spoke-box2-light fivebar${currentSpoke}`
                }
              ></div>
              <div
                style={{
                  width: currentSpoke === 5 ? '5rem' : '3rem',
                  height: currentSpoke === 5 ? '5rem' : '3rem',
                  right: currentSpoke === 5 ? '-1.6rem' : '-0.55rem',
                  padding: currentSpoke === 5 ? '12px' : '8px',
                }}
                onClick={() => turner(5)}
                className={
                  mode.darkMode
                    ? `spoke-box3-dark five${currentSpoke}`
                    : `spoke-box3-light five${currentSpoke}`
                }
              >
                <GiRun
                  className={
                    mode.darkMode ? 'dark-spoke1-icon' : 'light-spoke1-icon'
                  }
                  style={{ color: currentSpoke === 5 ? '#b618ff' : 'white' }}
                />
                <p
                  style={{
                    opacity: currentSpoke === 5 ? '1' : '0',
                    transition: 'all 0.3s',
                  }}
                  className={
                    mode.darkMode ? 'dark-spoke-label' : 'light-spoke-label'
                  }
                >
                  Cardio
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        


      </div>

      


      {exactCheckin && (
        <div className="checkin-stats-wrapper">
          {currentSpoke === 1 && (
            <div
              className={
                mode.darkMode ? 'dark-wheel-info-box' : 'light-wheel-info-box'
              }
            >
              <div className="wheel-info-box__wrapper">
                <div className="wheel-info-column bf-column1">
                  <p style={{ opacity: '0' }}>---</p>
                  <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                    Date
                  </p>
                  <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                    Weight
                  </p>
                  <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                    Lean Mass
                  </p>
                  <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                    Fat Mass
                  </p>
                  <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                    Total Weeks
                  </p>
                </div>










                <div className="wheel-info-column">
                  <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                    Current
                  </p>
                  <p className="info-highlight">
                    {exactCheckin[0].date.slice(0, 10)}
                  </p>
                  <p className="info-highlight">{exactCheckin[0].weight}</p>


                  {exactCheckin[0].leanBodyMass ? <p className="info-highlight">
                    {exactCheckin[0].leanBodyMass.toFixed(1)}
                  </p> : <p className="info-highlight">
                    -
                  </p> }
          
                  {exactCheckin[0].fatMass ? <p className="info-highlight">
                    {exactCheckin[0].fatMass.toFixed(1)}
                  </p> : <p className="info-highlight"> - </p>}


                  <p className="info-highlight">{exactCheckin[0].weeksOut}</p>
                </div>




                

                
                  <div className="wheel-info-column">
                    <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                      Prev
                    </p>
                    <p className="info-highlight">
                      {previousCheckin ? previousCheckin.date.slice(0, 10) : "-"}
                    </p>
                    <p className="info-highlight">{previousCheckin ? previousCheckin.weight : '-'}</p>
                    <p className="info-highlight">
                      {previousCheckin && previousCheckin.leanBodyMass ? previousCheckin.leanBodyMass.toFixed(1) : '-'}
                    </p>
                    <p className="info-highlight">
                      {previousCheckin && previousCheckin.fatMass ? previousCheckin.fatMass.toFixed(1) : '-'}
                    </p>
                    <p className="info-highlight">{previousCheckin ? previousCheckin.weeksOut : '-'}</p>
                  </div>
                

                 








                
                  <div className="wheel-info-column">
                    <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                      Progress
                    </p>
                    <p className="info-highlight">---</p>
                    <p className="info-highlight">
                      {previousCheckin ? exactCheckin[0].weight - previousCheckin.weight + `lbs` : '-'}
                    </p>
                    <p className="info-highlight">
                      {previousCheckin && previousCheckin.leanBodyMass && exactCheckin[0].leanBodyMass ?
                        (exactCheckin[0].leanBodyMass.toFixed(1) -
                        previousCheckin.leanBodyMass.toFixed(1)
                      ).toFixed(1) + `lbs` : '-'}
                    
                    </p>
                    <p className="info-highlight">
                      {previousCheckin && previousCheckin.fatMass && exactCheckin[0].fatMass ?
                      (
                        exactCheckin[0].fatMass.toFixed(1) -
                        previousCheckin.fatMass.toFixed(1)
                      ).toFixed(1) + `lbs` : '-'}
                      
                    </p>
                    <p className="info-highlight">
                      {previousCheckin ? exactCheckin[0].weeksOut - previousCheckin.weeksOut + `wks`: '-'}
                    </p>
                  </div>
              



              </div>
            </div>
          )}

          {currentSpoke === 2 && !exactCheckin[0].bodyFat && (
            <div
              className={
                mode.darkMode ? 'dark-wheel-info-box' : 'light-wheel-info-box'
              }
            >
              <div className="wheel-info-box__wrapper">
                <h1
                  className={
                    mode.darkMode ? 'dark-no-data-title' : 'light-no-data-title'
                  }
                >
                  No Caliper Data Submitted
                </h1>
              </div>
            </div>
          )}

          {currentSpoke === 2 && exactCheckin[0].bodyFat && (
            <div
              className={
                mode.darkMode ? 'dark-wheel-info-box' : 'light-wheel-info-box'
              }
            >
              {exactCheckin && (
                <div className="wheel-info-box__wrapper">
                  <div className="wheel-info-column bf-column1">
                    <p style={{ opacity: '0' }}>---</p>
                    <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                      Fat%
                    </p>
                    <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                      Chest
                    </p>
                    <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                      Axilla
                    </p>
                    <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                      Tricep
                    </p>
                    <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                      Subsc
                    </p>
                    <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                      Abdom
                    </p>
                    <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                      Supra
                    </p>
                    <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                      Thigh
                    </p>
                  </div>
                  <div className="wheel-info-column">
                    <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                      Current
                    </p>
                    <p className="info-highlight">
                      {exactCheckin[0].bodyFat.toFixed(1)}%
                    </p>
                    <p className="info-highlight">{exactCheckin[0].chest}mm</p>
                    <p className="info-highlight">{exactCheckin[0].axilla}mm</p>
                    <p className="info-highlight">{exactCheckin[0].tricep}mm</p>
                    <p className="info-highlight">
                      {exactCheckin[0].subscapular}mm
                    </p>
                    <p className="info-highlight">
                      {exactCheckin[0].abdominal}mm
                    </p>
                    <p className="info-highlight">
                      {exactCheckin[0].suprailiac}mm
                    </p>
                    <p className="info-highlight">{exactCheckin[0].thigh}mm</p>
                  </div>


                  
                    <div className="wheel-info-column">
                      <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                        Prev
                      </p>
                      <p className="info-highlight">
                        {previousCheckin && previousCheckin.bodyFat ? previousCheckin.bodyFat.toFixed(1) + "%" : "-"}
                      </p>
                      <p className="info-highlight">
                      {previousCheckin && previousCheckin.chest ? previousCheckin.chest.toFixed(1) + "mm" : "-"}
                      </p>
                      <p className="info-highlight">
                      {previousCheckin && previousCheckin.axilla ? previousCheckin.axilla.toFixed(1) + "mm" : "-"}
                      </p>
                      <p className="info-highlight">
                      {previousCheckin && previousCheckin.tricep ? previousCheckin.tricep.toFixed(1) + "mm" : "-"}
                      </p>
                      <p className="info-highlight">
                      {previousCheckin && previousCheckin.subscapular ? previousCheckin.subscapular.toFixed(1) + "mm" : "-"}
                      </p>
                      <p className="info-highlight">
                      {previousCheckin && previousCheckin.abdominal ? previousCheckin.abdominal.toFixed(1) + "mm" : "-"}
                      </p>
                      <p className="info-highlight">
                         {previousCheckin && previousCheckin.suprailiac ? previousCheckin.suprailiac.toFixed(1) + "mm" : "-"}
                      </p>
                      <p className="info-highlight">
                      {previousCheckin && previousCheckin.thigh ? previousCheckin.thigh.toFixed(1) + "mm" : "-"}
                      </p>
                    </div>
                  


                  {previousCheckin && (
                    <div className="wheel-info-column">
                      <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                        Progress
                      </p>
                    
                      <p className="info-highlight">
                        {previousCheckin && previousCheckin.bodyFat ? (
                          exactCheckin[0].bodyFat.toFixed(1) -
                          previousCheckin.bodyFat.toFixed(1)
                        ).toFixed(1) + "%" : "-"}
                        
                      </p>
                      <p className="info-highlight">
                        {previousCheckin && previousCheckin.chest ? exactCheckin[0].chest - previousCheckin.chest + "mm" : "-"}
                      </p>
                      <p className="info-highlight">
                      {previousCheckin && previousCheckin.axilla ? exactCheckin[0].axilla - previousCheckin.axilla + "mm" : "-"}
                      </p>
                      <p className="info-highlight">
                      {previousCheckin && previousCheckin.tricep ? exactCheckin[0].tricep - previousCheckin.tricep + "mm" : "-"}
                      </p>
                      <p className="info-highlight">
                      {previousCheckin && previousCheckin.subscapular ? exactCheckin[0].subscapular - previousCheckin.subscapular + "mm" : "-"}
                      </p>
                      <p className="info-highlight">
                      {previousCheckin && previousCheckin.abdominal ? exactCheckin[0].abdominal - previousCheckin.abdominal + "mm" : "-"}
                        
                      </p>
                      <p className="info-highlight">
                      {previousCheckin && previousCheckin.suprailiac ? exactCheckin[0].suprailiac - previousCheckin.suprailiac + "mm" : "-"}
                      </p>
                      <p className="info-highlight">
                      {previousCheckin && previousCheckin.thigh ? exactCheckin[0].thigh - previousCheckin.thigh + "mm" : "-"}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {currentSpoke === 3 && !exactCheckin[0].image[0] && (
            <div
              className={
                mode.darkMode ? 'dark-wheel-info-box' : 'light-wheel-info-box'
              }
            >
              <div className="wheel-info-box__wrapper">
                <h1
                  className={
                    mode.darkMode ? 'dark-no-data-title' : 'light-no-data-title'
                  }
                >
                  No Images Submitted
                </h1>
              </div>
            </div>
          )}

          {currentSpoke === 3 && exactCheckin[0].image[0] && (
            <div
              className={
                mode.darkMode ? 'dark-wheel-info-box' : 'light-wheel-info-box'
              }
            >
              <div className="wheel-info-box__wrapper">
                <div className="picture-info-column">
                  <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                    Previous Check In
                  </p>
                  {previousCheckin && previousCheckin.image[0] && <img
                    src={previousCheckin.image[prevBigPic]}
                    alt=""
                  />}
                </div>

                <div className="picture-info-column">
                  <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                    Current Check In
                  </p>
                  <img
                    src={exactCheckin[0].image[newBigPic]}
                    alt=""
                  />
                </div>

                <div className="picture-preview-wrapper">
                  {previousCheckin && previousCheckin.image[0] ? <div className="picture-preview-list">
                    {previousCheckin.image.map((picture, index) => (
                      <div key={picture} className="kitten-wrapper">
                        <img
                          onClick={() => setPrevBigPic(index)}
                          alt=""
                          src={picture}
                        />
                      </div>
                    ))}
                  </div> : <div className="picture-preview-list"></div>}

                  <div className="picture-preview-list">
                    {exactCheckin[0].image.map((picture, index) => (
                      <div key={picture} className="kitten-wrapper">
                        <img
                          onClick={() => setNewBigPic(index)}
                          alt=""
                          src={picture}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentSpoke === 4 && !exactCheckin[0].neckMeasure && (
            <div
              className={
                mode.darkMode ? 'dark-wheel-info-box' : 'light-wheel-info-box'
              }
            >
              <div className="wheel-info-box__wrapper">
                <h1
                  className={
                    mode.darkMode ? 'dark-no-data-title' : 'light-no-data-title'
                  }
                >
                  No Measurements Were Submitted
                </h1>
              </div>
            </div>
          )}

          {currentSpoke === 4 && exactCheckin[0].neckMeasure && (
            <div
              className={
                mode.darkMode ? 'dark-wheel-info-box' : 'light-wheel-info-box'
              }
            >
              {exactCheckin && (
                <div className="wheel-info-box__wrapper">
                  <div className="wheel-info-column bf-column1">
                    <p style={{ opacity: '0' }}>---</p>
                    <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                      Total
                    </p>
                    <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                      Neck
                    </p>
                    <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                      Arm
                    </p>
                    <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                      Chest
                    </p>
                    <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                      Waist
                    </p>
                    <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                      Hips
                    </p>
                    <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                      Thigh
                    </p>
                    <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                      Calf
                    </p>
                  </div>
                  <div className="wheel-info-column">
                    <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                      Current
                    </p>
                    <p className="info-highlight">
                      {exactCheckin[0].neckMeasure +
                        exactCheckin[0].armMeasure +
                        exactCheckin[0].chestMeasure +
                        exactCheckin[0].waistMeasure +
                        exactCheckin[0].hipsMeasure +
                        exactCheckin[0].thighMeasure +
                        exactCheckin[0].calfMeasure}
                      "
                    </p>
                    <p className="info-highlight">
                      {exactCheckin[0].neckMeasure}"
                    </p>
                    <p className="info-highlight">
                      {exactCheckin[0].armMeasure}"
                    </p>
                    <p className="info-highlight">
                      {exactCheckin[0].chestMeasure}"
                    </p>
                    <p className="info-highlight">
                      {exactCheckin[0].waistMeasure}"
                    </p>
                    <p className="info-highlight">
                      {exactCheckin[0].hipsMeasure}"
                    </p>
                    <p className="info-highlight">
                      {exactCheckin[0].thighMeasure}"
                    </p>
                    <p className="info-highlight">
                      {exactCheckin[0].calfMeasure}"
                    </p>
                  </div>
                  {previousCheckin && (
                    <div className="wheel-info-column">
                      <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                        Prev
                      </p>
                      <p className="info-highlight">
                        {previousCheckin.neckMeasure ? previousCheckin.neckMeasure +
                          previousCheckin.armMeasure +
                          previousCheckin.chestMeasure +
                          previousCheckin.waistMeasure +
                          previousCheckin.hipsMeasure +
                          previousCheckin.thighMeasure +
                          previousCheckin.calfMeasure + '' : '-'}
                        
                      </p>
                        <p className="info-highlight">
                        {previousCheckin.neckMeasure ? previousCheckin.neckMeasure + '' : "-"}
                      </p>
                      <p className="info-highlight">
                      {previousCheckin.armMeasure ? previousCheckin.armMeasure + '' : "-"}
                      </p>
                      <p className="info-highlight">
                      {previousCheckin.chestMeasure ? previousCheckin.chestMeasure + '' : "-"}
                      </p>
                      <p className="info-highlight">
                      {previousCheckin.waistMeasure ? previousCheckin.waistMeasure + '' : "-"}
                      </p>
                      <p className="info-highlight">
                      {previousCheckin.hipsMeasure ? previousCheckin.hipsMeasure + '' : "-"}
                      </p>
                      <p className="info-highlight">
                      {previousCheckin.thighMeasure ? previousCheckin.thighMeasure + '' : "-"}
                      </p>
                      <p className="info-highlight">
                      {previousCheckin.calfMeasure ? previousCheckin.calfMeasure + '' : "-"}
                      </p>
                    </div>
                  )}
                  {previousCheckin && (
                    <div className="wheel-info-column">
                      <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                        Progress
                      </p>
                      <p className="info-highlight">
                        {previousCheckin.neckMeasure ? (exactCheckin[0].neckMeasure +
                          exactCheckin[0].armMeasure +
                          exactCheckin[0].chestMeasure +
                          exactCheckin[0].waistMeasure +
                          exactCheckin[0].hipsMeasure +
                          exactCheckin[0].thighMeasure +
                          exactCheckin[0].calfMeasure) -
                          (previousCheckin.neckMeasure +
                            previousCheckin.armMeasure +
                            previousCheckin.chestMeasure +
                            previousCheckin.waistMeasure +
                            previousCheckin.hipsMeasure +
                            previousCheckin.thighMeasure +
                            previousCheckin.calfMeasure) + `"` : '-'}
                      
                      </p>
                      <p className="info-highlight">
                        {previousCheckin.neckMeasure ? exactCheckin[0].neckMeasure - previousCheckin.neckMeasure + `"`  : "-"}
                        
                      </p>
                      <p className="info-highlight">
                        {previousCheckin.neckMeasure ? exactCheckin[0].armMeasure -
                          previousCheckin.armMeasure + `"` : "-"}
                        
                      </p>
                      <p className="info-highlight">
                        {previousCheckin.neckMeasure ? exactCheckin[0].chestMeasure -
                          previousCheckin.chestMeasure + `"` : '-'}
                        
                      </p>
                      <p className="info-highlight">
                        {previousCheckin.neckMeasure ? exactCheckin[0].waistMeasure -
                          previousCheckin.waistMeasure + `"`: '-'}
                        
                      </p>
                      <p className="info-highlight">
                        {previousCheckin.neckMeasure ? exactCheckin[0].hipsMeasure -
                          previousCheckin.hipsMeasure + `"`: '-' }
                        
                      </p>
                      <p className="info-highlight">
                        {previousCheckin.neckMeasure ? exactCheckin[0].thighMeasure -
                          previousCheckin.thighMeasure + `"`: '-'}
                        
                      </p>
                      <p className="info-highlight">
                        {previousCheckin.neckMeasure ? exactCheckin[0].calfMeasure -
                          previousCheckin.calfMeasure + `"`: '-'}
                        
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {currentSpoke === 5 && !exactCheckin[0].cardioDuration && (
            <div
              className={
                mode.darkMode ? 'dark-wheel-info-box' : 'light-wheel-info-box'
              }
            >
              <div className="wheel-info-box__wrapper">
                <h1
                  className={
                    mode.darkMode ? 'dark-no-data-title' : 'light-no-data-title'
                  }
                >
                  No Cardio Data Submitted
                </h1>
              </div>
            </div>
          )}

          {currentSpoke === 5 && exactCheckin[0].cardioDuration && (
            <div
              className={
                mode.darkMode ? 'dark-wheel-info-box' : 'light-wheel-info-box'
              }
            >
              <div className="wheel-info-box__wrapper">
                <div className="wheel-info-column bf-column1">
                  <p style={{ opacity: '0' }}>---</p>
                  <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                    Time
                  </p>
                  <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                    Days
                  </p>
                  <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                    Calories
                  </p>
                  <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                    Type
                  </p>
                </div>


                <div className="wheel-info-column">
                  <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                    Current
                  </p>
                 <p className="info-highlight">{exactCheckin[0] && exactCheckin[0].cardioDuration ? exactCheckin[0].cardioDuration + "mins" : "-"}</p>
                 <p className="info-highlight">{exactCheckin[0] && exactCheckin[0].cardioSessions ? exactCheckin[0].cardioSessions : "-"}</p>
                 <p className="info-highlight">{exactCheckin[0] && exactCheckin[0].cardioCalories ? exactCheckin[0].cardioCalories : "-"}</p>
                 <p className="info-highlight">{exactCheckin[0] && exactCheckin[0].cardioType ? exactCheckin[0].cardioType  : "-"}</p>
                 
                </div>
                <div className="wheel-info-column">
                  <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                    Prev
                  </p>
                  <p className="info-highlight">{previousCheckin && previousCheckin.cardioDuration ? previousCheckin.cardioDuration + "mins" : "-"}</p>
                  <p className="info-highlight">{previousCheckin && previousCheckin.cardioSessions ? previousCheckin.cardioSessions : "-"}</p>
                  <p className="info-highlight">{previousCheckin && previousCheckin.cardioCalories ? previousCheckin.cardioCalories : "-"}</p>
                  <p className="info-highlight">{previousCheckin && previousCheckin.cardioType ? previousCheckin.cardioType : "-"}</p>
                </div>
                <div className="wheel-info-column">
                  <p style={{ color: mode.darkMode ? 'white' : 'black' }}>
                    Progress
                  </p>
                  <p className="info-highlight">{previousCheckin && previousCheckin.cardioDuration && exactCheckin[0].cardioDuration ? exactCheckin[0].cardioDuration - previousCheckin.cardioDuration : "-"}</p>
                  <p className="info-highlight">{previousCheckin && previousCheckin.cardioSessions && exactCheckin[0].cardioSessions ? exactCheckin[0].cardioSessions - previousCheckin.cardioSessions : "-"}</p>
                  <p className="info-highlight">{previousCheckin && previousCheckin.cardioCalories && exactCheckin[0].cardioCalories ? exactCheckin[0].cardioCalories - previousCheckin.cardioCalories : "-"}</p>
                  <p className="info-highlight">--</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {exactCheckin && exactCheckin[0].notes && 
      <div className={mode.darkMode ? "dark-notes-display-wrapper" : "notes-display-wrapper"}>
      <h2>NOTES</h2>
        <p>{exactCheckin[0].notes}</p>
      </div>}

<div className={mode.darkMode ? "dark-divider" : "light-divider"}></div>
        <footer>

          <div
            className={
              mode.darkMode
                ? "dark-checkin-page__actions"
                : "light-checkin-page__actions"
            }
          >
            <Button danger  size="small" onClick={showDeleteWarningHandler}>
              Delete Check-In
            </Button>
            <Button
              to={`/${checkinId}/updateCheckin`}
              buttonStyle="new-checkin__button"
              size="small"
              >
              Update Check-In
            </Button>
              </div>
          
        </footer>

    </div>
  );
};

export default CheckinPage;
