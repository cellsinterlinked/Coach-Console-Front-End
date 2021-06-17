import React, { useState, useEffect, useContext } from 'react';
import CheckinList from '../components/CheckinList';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../Shared/hooks/http-hook'
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import './ClientCheckins.css';
import {DarkModeContext} from '../../Shared/context/dark-mode-context';
import MainNavigation from '../../Shared/components/Navigation/MainNavigation';
import { AuthContext } from '../../Shared/context/auth-context';
import IconAnimation from '../../Shared/components/UIElements/IconAnimation';
import DarkIconAnimation from '../../Shared/components/UIElements/DarkIconAnimation';



const ClientCheckins = props => {
  const[loadedCheckins, setLoadedCheckins] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const mode = useContext(DarkModeContext)
  const auth = useContext(AuthContext);
  const clientId = useParams().clientId;

  useEffect(() => {
    const fetchCheckins = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/checkins/athlete/${clientId}`,
        'GET',
        null,
        {
          Authorization: 'Bearer ' + auth.token
        }
        );
        setLoadedCheckins(responseData.checkins)
        console.log(responseData.checkins)
        

      } catch (err) {}
    };
    fetchCheckins();
  }, [sendRequest, clientId, auth.token]);


const checkinDeleteHandler = (deletedCheckinId) => {
    setLoadedCheckins(prevCheckins => 
      prevCheckins.filter(checkin => checkin.id !==deletedCheckinId)
      );
  };


return (
<div className={mode.darkMode ? "checkins-container dark-checkins-container" : "checkins-container"} style={{animation: "pageEnter 1s"}}>
<MainNavigation />
<ErrorModal error={error} onClear={clearError} />
{isLoading && (
  <div className={mode.darkMode ? "cnter dark-loaderOverlay" : "center loaderOverlay"}>
    {mode.darkMode ? <DarkIconAnimation loading={isLoading} /> : <IconAnimation loading={isLoading} />}
  </div>
)}
{!isLoading && loadedCheckins && (<CheckinList items={loadedCheckins} onDeleteCheckin={checkinDeleteHandler} clientId={clientId} />)}
{!isLoading && !loadedCheckins && (<CheckinList items={[]} onDeleteCheckin={checkinDeleteHandler} clientId={clientId} />)}
</div>
)
};

export default ClientCheckins;


