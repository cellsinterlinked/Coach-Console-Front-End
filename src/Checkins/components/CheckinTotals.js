import React, { useState, useEffect, useContext } from 'react';
import './CheckinTotals.css';
import Card from '../../Shared/components/UIElements/Card'
import Button from '../../Shared/components/FormElements/Button';
import LoadingSpinner from '../../Shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import { useHistory } from 'react-router-dom';
import Modal from '../../Shared/components/UIElements/Modal';
import { DarkModeContext } from '../../Shared/context/dark-mode-context';
import StatsCompare from './StatsCompare';
import MeasurementsCompare from './MeasurementsCompare';
import Chart from '../components/Chart';

const CheckinTotals = props => {
  const mode = useContext(DarkModeContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loadedAthlete, setLoadedAthlete] = useState()

  const history = useHistory();
  const clientId = props.clientId;

  useEffect(() => {
    const fetchAthlete = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/athletes/${clientId}`);
        setLoadedAthlete(responseData.athlete.name)
      } catch (err) {}
    }
    fetchAthlete();
  }, [sendRequest, clientId])




  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true)
  };
  
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  }

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try{
      await sendRequest(
        `http://localhost:5000/api/athletes/${props.clientId}`,
        'DELETE'
      );
      history.push(`/clients`);

    } catch (err) {}
  }

  return (
    <React.Fragment>
    <ErrorModal error={error} onClear={clearError}/>
    <Modal 
      show={showConfirmModal}
      onCancel={cancelDeleteHandler}
      header="Are you sure?" 
      footerClass="place-item__modal-actions" 
      footer={
      <React.Fragment>
        <Button  inverse onClick={cancelDeleteHandler}>Cancel</Button>
        <Button  danger onClick={confirmDeleteHandler}>Delete</Button>

      </React.Fragment>
    }>
    <p className={mode.darkMode ? "dark-warning-text" : "light-warning-text"}>Do you want to delete this client?</p>
    </Modal>
    


    <Card className={mode.darkMode ? "dark-totals-card" : "light-totals-card"} >
    {isLoading && <LoadingSpinner asOverlay />}
    <div className="totals-info">

    <div className={mode.darkMode ? "dark-chart-container" : "light-chart-container"}>
    <Chart />
    </div>

    <h1 className="client-name">{loadedAthlete}</h1>
    
    <div className={mode.darkMode ? "dark-stats-labels" : "light-stats-labels"}>
      <p className="stats-date__Label">Date</p>
      <p className="stats-bodyfat__Label">Body Fat</p>
      <p className="stats-weight__Label">Weight</p>
      <p className="stats-week__Label">Week</p>
      <p className="stats-leanbm__Label">Lean BM</p>

    </div>
    <StatsCompare />
    <StatsCompare />
    <div className={mode.darkMode ? "dark-for-shadow" : "light-for-shadow"}>
    <div className={mode.darkMode ? "dark-stat-totals" : "light-stat-totals"}>
      <p>TOTALS</p>
      <p>0%</p>
      <p>0lbs</p>
      <p>4</p>
      <p>0</p>
    </div>
    </div>

    <div className={mode.darkMode ? "dark-compare-labels" : "light-compare-labels"}>
      <p className="compare-date__Label">Date</p>
      <p className="compare-chest__Label">Ch</p>
      <p className="compare-axilla__Label">Ax</p>
      <p className="compare-tricep__Label">Tr</p>
      <p className="compare-subscapular__Label">Sub</p>
      <p className="compare-abdominal__Label">Ab</p>
      <p className="compare-suprailiac__Label">Sup</p>
      <p className="compare-thigh__Label">Th</p>
    </div>
    <MeasurementsCompare />
    <MeasurementsCompare />
    <div className={mode.darkMode ? "dark-for-shadow" : "light-for-shadow"}>
    <div className={mode.darkMode ? "dark-measure-totals" : "light-measure-totals"}>
      <p>TOTALS</p>
      <p>0</p>
      <p>0</p>
      <p>0</p>
      <p>0</p>
      <p>0</p>
      <p>o</p>
      <p>0</p>
    </div>
    </div>
    <br />
    <br />
    

    
    
    </div>
    <footer>
    
    <div className={mode.darkMode ? "dark-checkin-item__actions" : "light-checkin-item__actions"}>
        <Button danger onClick={showDeleteWarningHandler}>Delete Client</Button>
      </div>
   
    
    <div className="new-checkin-box">
      <Button
      to={`/${props.clientId}/newcheckin`}
      buttonStyle="new-checkin__button"
      >New Checkin</Button>
    </div>
    
    <br/>
    
    <div className="new-checkin-box">
      <Button
      to={`/${props.clientId}/editclient`}
      buttonStyle="new-checkin__button"
      >Update Client</Button>
    </div>
    

    </footer>
    </Card>
    </React.Fragment>
    
  )
}

export default CheckinTotals;