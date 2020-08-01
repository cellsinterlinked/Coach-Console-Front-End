import React, { useState, useEffect } from 'react';
import CheckinList from '../components/CheckinList';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../Shared/hooks/http-hook'
import LoadingSpinner from '../../Shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';



const Checkins = props => {
  const[loadedCheckins, setLoadedCheckins] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const clientId = useParams().clientId;

  useEffect(() => {
    const fetchCheckins = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/checkins/athlete/${clientId}`);
        setLoadedCheckins(responseData.checkins)
        

      } catch (err) {}
    };
    fetchCheckins();
  }, [sendRequest, clientId]);


const checkinDeleteHandler = (deletedCheckinId) => {
    console.log(deletedCheckinId)
    setLoadedCheckins(prevCheckins => 
      prevCheckins.filter(checkin => checkin.id !==deletedCheckinId)
      );
  };


return (
<React.Fragment>
<ErrorModal error={error} onClear={clearError} />
{isLoading && (
  <div className="center">
    <LoadingSpinner />
  </div>
)}


{!isLoading && loadedCheckins && <CheckinList items={loadedCheckins} onDeleteCheckin={checkinDeleteHandler} clientId={clientId} />}
</React.Fragment>
)
};

export default Checkins;


