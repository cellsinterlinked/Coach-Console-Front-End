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

const Clients = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedAthletes, setLoadedAthletes] = useState();

  const mode = useContext(DarkModeContext);
  const auth = useContext(AuthContext);

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

  if (isLoading) {
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
       
      </div>
    </div>
  );
};

export default Clients;
