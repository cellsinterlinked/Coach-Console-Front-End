import React, { useEffect, useState, useContext } from 'react';
import ClientList from '../components/ClientList';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import './Clients.css';
import { DarkModeContext } from '../../Shared/context/dark-mode-context';
import MainNavigation from '../../Shared/components/Navigation/MainNavigation';
import { AuthContext } from '../../Shared/context/auth-context';
import IconAnimation from '../../Shared/components/UIElements/IconAnimation';
import DarkIconAnimation from '../../Shared/components/UIElements/DarkIconAnimation';
import IconEntrance from '../../Shared/components/UIElements/IconEntrance';
import Button from '../../Shared/components/FormElements/Button';

const Clients = () => {
  const mode = useContext(DarkModeContext);
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedAthletes, setLoadedAthletes] = useState();
  const [intro, setIntro] =  useState(localStorage.getItem('intro') ? false : true)
 
  
  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/athletes',
          'GET',
          null,
          {
            Authorization: 'Bearer ' + auth.token,
          }
        );
        setLoadedAthletes(responseData.athletes);
      } catch (err) {}
    };
    fetchAthletes();
  }, [auth.token, sendRequest]);

  setTimeout(function() {
    setIntro(false)
  }, 6000)

  
  if(intro) {
    return (
      <div className={mode.darkMode ? "center dark-loaderOverlay loaderFade" : "center loaderOverlay loaderFade"}>
      <IconEntrance cancel={setIntro}/>
    </div>

)
}

if (isLoading && !intro) {
  return (
    <>
  { !mode.darkMode && <div className="center loaderOverlay">
    <IconAnimation loading={isLoading} />
  </div>}

  {mode.darkMode && <div className="center loaderOverlay">
    <DarkIconAnimation loading={isLoading} />
  </div>}
  </>
  )
}
  return (
    <div style={{animation: "pageEnter 1s"}}>
      <MainNavigation />


      <div
        className={
          mode.darkMode ? 'client-page dark-client-page' : 'client-page'
        }
      >
        <ErrorModal error={error} onClear={clearError} />
        {/* {isLoading && (
          <div className="center loaderOverlay">
            <IconAnimation loading={isLoading} />
          </div>
        )} */}
        {!isLoading && loadedAthletes && <ClientList items={loadedAthletes} />}
        {!isLoading && !loadedAthletes && <div className={mode.darkMode ? "dark-get-started-wrapper" : "light-get-started-wrapper"}>
          <h1>Get Started By Creating Your First Client!</h1>
          <div style={{margin: "auto", width: "10rem"}}>
          <Button to='/newclient'>NEW CLIENT</Button>
          </div>
        </div>}
      </div>
    </div>
    
  );
};

export default Clients;
