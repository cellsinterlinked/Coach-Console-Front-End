import React, { useContext, useState, useEffect } from 'react';
import Avatar from '../../Shared/components/UIElements/Avatar';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../Shared/context/dark-mode-context';
import './ClientItem.css';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import { AuthContext } from '../../Shared/context/auth-context';
import IconAnimation from '../../Shared/components/UIElements/IconAnimation';
import DarkIconAnimation from '../../Shared/components/UIElements/DarkIconAnimation';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';


const ClientItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCheckins, setLoadedCheckins] = useState([]);
  const [lastCheckin, setLastCheckin] = useState();
  const mode = useContext(DarkModeContext);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchCheckins = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/checkins/athlete/${props.id}`,
          'GET',
          null,
          {
            Authorization: 'Bearer ' + auth.token
          }

        );
        setLoadedCheckins(responseData.checkins);
        setLastCheckin(responseData.checkins[responseData.checkins.length - 1])
      } catch (err) {}
    };
    fetchCheckins();
  }, [auth.token, props.id, sendRequest ]);

  // useEffect(() => {
  //   if (loadedCheckins) {
  //     setLastCheckin(loadedCheckins[loadedCheckins.length - 1]);
  //     console.log(loadedCheckins[loadedCheckins.length - 1]);
  //   }
  // }, [loadedCheckins]);

  if (isLoading) {
    return (
    <li className={mode.darkMode ? 'dark-client-item' : 'light-client-item'}>
    <div className="center box-fill">
      {mode.darkMode ? <DarkIconAnimation loading={isLoading} /> : <IconAnimation loading={isLoading} />}
    </div>
    </li>

    )
  }

  return (
    <>
    {/* <ErrorModal error={error} onClear={clearError} /> */}
    <li className={mode.darkMode ? 'dark-client-item' : 'light-client-item'}>
      <Link to={`/${props.id}/checkins`} >
        <div className="client-background-image">
          {/* {loadedCheckins.length > 0 && (
            <div className="background-image-filter"></div>
          )} */}
          {loadedCheckins.length > 0 && (
            <img style={{filter: "grayscale(100%)"}}
              alt=""
              src={loadedCheckins[loadedCheckins.length - 1].image[0]}
            />
          )}
          {loadedCheckins.length === 0 && (
            <div className="background-placeholder" alt="" />
          )}
        </div>
        <div
          className={
            mode.darkMode
              ? 'dark-client-item__image'
              : 'light-client-item__image'
          }
        >
          <Avatar
            image={props.image}
            alt={props.name}
          />
        </div>
        <div
          className={
            mode.darkMode ? 'dark-client-item__info' : 'light-client-item__info'
          }
        >
          <h2>{props.name}</h2>
          <h3>
            {props.checkinCount}{' '}
            {props.checkinCount === 1 ? 'Checkin' : 'Checkins'}
          </h3>
        </div>
        <div className="banner-container">
          <div className="banner-list">
            <div
              style={{ background: 'linear-gradient(#6d17cb, #2876f9)' }}
              className="banner-circle-display"
            >
              {lastCheckin && <p>{lastCheckin.weeksOut}</p>}
            </div>
            <p>Weeks</p>
          </div>
          <div className="banner-list">
            <div
              style={{ background: 'linear-gradient(#14557b, #7fcec5)' }}
              className="banner-circle-display"
            >
              {lastCheckin && <p>{lastCheckin.weight}</p>}
            </div>
            <p>Weight</p>
          </div>
          <div className="banner-list">
            <div
              style={{ background: 'linear-gradient(#5f0a87,#a4508b)' }}
              className="banner-circle-display"
            >
              {lastCheckin && lastCheckin.bodyFat && <p>{lastCheckin.bodyFat.toFixed(2)}</p>}
            </div>
            <p>BodyFat</p>
          </div>
        </div>
      </Link>
    </li>
    </>
  );
};

export default ClientItem;
