import React, { useState } from 'react';
import Card from '../../Shared/components/UIElements/Card';
import Button from '../../Shared/components/FormElements/Button';
import Modal from '../../Shared/components/UIElements/Modal';
import './CheckinItem.css';



const CheckinItem = props => {
const [showConfirmModal, setShowConfirmModal] = useState(false);

const showDeleteWarningHandler = () => {
  setShowConfirmModal(true)
};

const cancelDeleteHandler = () => {
  setShowConfirmModal(false);
}
const confirmDeleteHandler = () => {
  setShowConfirmModal(false);
  console.log('DELETING...');
}


  return (
  <React.Fragment>
    <Modal 
      show={showConfirmModal}
      onCancel={cancelDeleteHandler}
      header="Are you sure?" 
      footerClass="place-item__modal-actions" 
      footer={
      <React.Fragment>
        <Button inverse onClick={cancelDeleteHandler}>Cancel</Button>
        <Button danger onCLick={confirmDeleteHandler}>Delete</Button>

      </React.Fragment>
    }>
    <p>Do you want to proceed and delete this checkin?</p>
    </Modal>
    <li className="checkin-item">
    <Card className="checkin-item__content">
      <div className="checkin-item__image">
        <img src={props.image} alt={props.title} />
      </div>
      <div className="checkin-item__info">
        <h2>Date: {props.date} </h2>
        <hr />
        <p>Weight: {props.weight} lbs</p>
        <hr />
        <p>Weeks In: {props.weeks_in} weeks</p>
        <hr/>
        <p>Bodyfat: {props.bodyfat} %</p>
        <hr/>
        <p>Loss this week: {props.week_loss} %Bodyfat</p>
        <hr />
        <p>Notes: {props.notes}</p>
        <p></p>
      </div>
      <div className="checkin-item__actions">
        <Button to={`/${props.id}/updateCheckin`}>Update</Button>
        <Button danger onClick={showDeleteWarningHandler}>Delete</Button>
      </div>
      
    
    
    
    </Card>
    </li>
  </React.Fragment>
  )
}

export default CheckinItem;





