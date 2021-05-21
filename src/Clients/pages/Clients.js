import React, { useEffect, useState, useContext } from 'react'
import ClientList from '../components/ClientList';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../Shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import './Clients.css'
import {DarkModeContext} from '../../Shared/context/dark-mode-context';
import MainNavigation from '../../Shared/components/Navigation/MainNavigation';



const Clients = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedAthletes, setLoadedAthletes] = useState()

  

  const mode = useContext(DarkModeContext)



  useEffect(() => {
    const fetchAthletes = async () => {
      
      try {
        const responseData =  await sendRequest(
          'http://localhost:5000/api/athletes'
          ); 
        setLoadedAthletes(responseData.athletes);
      } catch (err) {}
     
    };
    fetchAthletes();
  }, [sendRequest])

  

  return (
    <React.Fragment>
      <MainNavigation />

      <div className={mode.darkMode ? "client-page dark-client-page" : "client-page"}>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedAthletes && <ClientList items={loadedAthletes}/>}

      </div>
    </React.Fragment>
  )

}
        

export default Clients;
