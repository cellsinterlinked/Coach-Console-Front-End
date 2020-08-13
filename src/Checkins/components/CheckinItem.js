import React, { useState, useContext } from 'react';
import Card from '../../Shared/components/UIElements/Card';
import Button from '../../Shared/components/FormElements/Button';
import Modal from '../../Shared/components/UIElements/Modal';
import './CheckinItem.css';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import LoadingSpinner from '../../Shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import { DarkModeContext } from '../../Shared/context/dark-mode-context';
import InfoDisplayLeft from '../../Shared/components/UIElements/InfoDisplayLeft';
import InfoDisplayRight from '../../Shared/components/UIElements/InfoDisplayRight';
import { GiPincers } from 'react-icons/gi';
import { FaWeight } from 'react-icons/fa';
import { GoCalendar } from 'react-icons/go';
import { FaCalendarWeek } from 'react-icons/fa';
import { GiMuscularTorso } from 'react-icons/gi';
import NotesDisplay from '../../Shared/components/UIElements/NotesDisplay';
import ImageRotate from '../../Shared/components/UIElements/ImageRotate';


const CheckinItem = props => {
const mode = useContext(DarkModeContext);

const { isLoading, error, sendRequest, clearError } = useHttpClient();
const [showConfirmModal, setShowConfirmModal] = useState(false);
const [expand, setExpand] = useState(false);
// const date = props.date;
// const sDate = date.toString();

const extend = () => {
  setExpand(true);
}

const shrink = () => {
  setExpand(false);
}

const showDeleteWarningHandler = () => {
  setShowConfirmModal(true)
};

const cancelDeleteHandler = () => {
  setShowConfirmModal(false);
}
const confirmDeleteHandler = async () => {
  console.log(props.id);
  setShowConfirmModal(false);
  try {
    await sendRequest(
      `http://localhost:5000/api/checkins/${props.id}`, 
      'DELETE'
      );
      props.onDelete(props.id)
  } catch (err) {}
  ;
}


  return (
  <React.Fragment>
    <ErrorModal error={error} onClear={clearError}/>
    <Modal 
      show={showConfirmModal}
      onCancel={cancelDeleteHandler}
      header="Are you sure?" 
      footerClass="checkin-item__modal-actions" 
      footer={
      <React.Fragment>
        <Button inverse onClick={cancelDeleteHandler}>Cancel</Button>
        <Button danger onClick={confirmDeleteHandler}>Delete</Button>

      </React.Fragment>
    }>
    <p className={mode.darkMode ? "dark-warning-text" : "light-warning-text"}>Do you want to proceed and delete this checkin?</p>
    </Modal>
    <li className={mode.darkMode ? "dark-checkin-item" : "light-checkin-item"} >
    <Card className={mode.darkMode ? "dark-checkin-item__content" : "light-checkin-item__content"}>
    {isLoading && <LoadingSpinner asOverlay />}
      <div className={mode.darkMode ? "dark-date__display" : "light-date__display"} onClick={expand ? shrink: extend}>
        <p>put in responsive date</p>
      </div>
      <div className={"input-shrinky " + (expand ? "input-expanded" : "")}>

      <ImageRotate/>

      {/* <div className={mode.darkMode ? "dark-checkin-item__image" : "light-checkin-item__image"}>
            <img src={"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimg2.wikia.nocookie.net%2F__cb20120103161626%2Ffinalfantasy%2Fimages%2F5%2F5b%2FJessie-ffvii-highres.png&f=1&nofb=1"} alt="this is temporary" /> */}
        {/* <img src={`http://localhost:5000/${props.image}`} alt={props.title} /> */}
        {/* <br />
        <br />
      </div> */}
      <InfoDisplayLeft 
      title="Date Of Checkin"
      data={props.date}
        ><GoCalendar
        className={mode.darkMode ? "dark-infoLeft-icon" : "light-infoLeft-icon"} 
        size="1.4rem" 
        color={mode.darkMode ? "#2dbdb1" : "#009edd"} 
        align-self="center"
        />
    </InfoDisplayLeft>
    <InfoDisplayRight
    title="Body Weight"
    data={props.weight}
    ><FaWeight
    className={mode.darkMode ? "dark-infoLeft-icon" : "light-infoLeft-icon"} 
    size="1.4rem" 
    color={mode.darkMode ? "#2dbdb1" : "#009edd"}  
    align-self="center"
    />
    </InfoDisplayRight>
    <InfoDisplayLeft 
    title="Weeks In"
    data={props.weeksOut}
    ><FaCalendarWeek
    className={mode.darkMode ? "dark-infoLeft-icon" : "light-infoLeft-icon"} 
        size="1.4rem" 
        color={mode.darkMode ? "#2dbdb1" : "#009edd"}  
        align-self="center"
        />
    </InfoDisplayLeft>
    <InfoDisplayRight
    title="Body Fat Percentage"
    data={props.bodyFat}
    ><GiPincers 
    className={mode.darkMode ? "dark-infoLeft-icon" : "light-infoLeft-icon"} 
    size="1.4rem" 
    color={mode.darkMode ? "#2dbdb1" : "#009edd"} 
    align-self="center"
    />
    </InfoDisplayRight>
    <InfoDisplayLeft 
      title="Lean Body Mass"
      data={props.weight}
        ><GiMuscularTorso 
        className={mode.darkMode ? "dark-infoLeft-icon" : "light-infoLeft-icon"} 
        size="1.4rem" 
        color={mode.darkMode ? "#2dbdb1" : "#009edd"} 
        align-self="center"
        />
    </InfoDisplayLeft>
    <NotesDisplay
      notes={props.notes}
      >
      

    </NotesDisplay>






      {/* <div className="checkin-item__info">
        <h2>Date: {props.date} </h2>
        <hr />
        <p>Weight: {props.weight} lbs</p>
        <hr />
        <p>Weeks In: {props.weeksOut} weeks</p>
        <hr/>
        <p>Bodyfat: {props.bodyFat} %</p>
        <hr />
        <p>Notes: {props.notes}</p>
        <p></p>
      </div> */}
      <div className={mode.darkMode ? "dark-checkin-item__actions" : "light-checkin-item__actions"}>
        <Button to={`/${props.id}/updateCheckin`}>Update</Button>
        <Button danger onClick={showDeleteWarningHandler}>Delete</Button>
      </div>
      
    </div>
    
    
    </Card>
    </li>
  </React.Fragment>
  )
}

export default CheckinItem;





