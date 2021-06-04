import React, { useState, useEffect, useContext } from 'react';
import CheckinList from '../components/CheckinList';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../Shared/hooks/http-hook'
import LoadingSpinner from '../../Shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import './ClientCheckins.css';
import {DarkModeContext} from '../../Shared/context/dark-mode-context';
import MainNavigation from '../../Shared/components/Navigation/MainNavigation';



const ClientCheckins = props => {
  const[loadedCheckins, setLoadedCheckins] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const mode = useContext(DarkModeContext)
  const clientId = useParams().clientId;

  useEffect(() => {
    const fetchCheckins = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/checkins/athlete/${clientId}`);
        setLoadedCheckins(responseData.checkins)
        console.log(responseData.checkins)
        

      } catch (err) {}
    };
    fetchCheckins();
  }, [sendRequest, clientId]);


const checkinDeleteHandler = (deletedCheckinId) => {
    setLoadedCheckins(prevCheckins => 
      prevCheckins.filter(checkin => checkin.id !==deletedCheckinId)
      );
  };


return (
<div className={mode.darkMode ? "checkins-container dark-checkins-container" : "checkins-container"}>
<MainNavigation />
<ErrorModal error={error} onClear={clearError} />
{isLoading && (
  <div className="center">
    <LoadingSpinner />
  </div>
)}
{!isLoading && loadedCheckins && (<CheckinList items={loadedCheckins} onDeleteCheckin={checkinDeleteHandler} clientId={clientId} />)}
{!isLoading && !loadedCheckins && (<CheckinList items={[]} onDeleteCheckin={checkinDeleteHandler} clientId={clientId} />)}
</div>
)
};

export default ClientCheckins;


