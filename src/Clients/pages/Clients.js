import React, { useEffect, useState } from 'react'
import ClientList from '../components/ClientList';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../Shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../Shared/hooks/http-hook';


const Clients = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedAthletes, setLoadedAthletes] = useState()



  useEffect(() => {
    const fetchAthletes = async () => {
      
      try {
        const responseData =  await sendRequest(
          'http://localhost:5000/api/athletes'
          ); //dont make a useEffect async, but make an async function within it (fetchAthletes)
  
        
        
        setLoadedAthletes(responseData.athletes);
      } catch (err) {}
     
    };
    fetchAthletes();
  }, [sendRequest])

  

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedAthletes && <ClientList items={loadedAthletes}/>}
    </React.Fragment>
  )

}
        

export default Clients;
