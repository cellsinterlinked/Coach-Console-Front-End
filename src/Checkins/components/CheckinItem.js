import React, { useState, useContext } from "react";
import Card from "../../Shared/components/UIElements/Card";
import Button from "../../Shared/components/FormElements/Button";
import Modal from "../../Shared/components/UIElements/Modal";
import "./CheckinItem.css";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import LoadingSpinner from "../../Shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../Shared/components/UIElements/ErrorModal";
import { DarkModeContext } from "../../Shared/context/dark-mode-context";
import { GiPincers } from "react-icons/gi";
import { FaWeight } from "react-icons/fa";
import { GoCalendar } from "react-icons/go";
import { FaCalendarWeek } from "react-icons/fa";
import { GiMuscularTorso } from "react-icons/gi";
import ImageRotate from "../../Shared/components/UIElements/ImageRotate";
import CheckinData from "../components/CheckinData";
import {FaArrowDown} from 'react-icons/fa';
import CheckinItemCarousel from '../components/checkin-item-carousel/CheckinItemCarousel';

const CheckinItem = props => {
  const mode = useContext(DarkModeContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [expand, setExpand] = useState(false);
  const [enlargeNotes, setEnlargeNotes] = useState(false);
  const [enlargeMeasurements, setEnlargeMeasurements] = useState(false);
  

  const extend = () => {
    setExpand(true);
  };

  const shrink = () => {
    setExpand(false);
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  const confirmDeleteHandler = async () => {
    console.log(props.id);
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/checkins/${props.id}`,
        "DELETE"
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="checkin-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p
          className={mode.darkMode ? "dark-warning-text" : "light-warning-text"}
        >
          Do you want to proceed and delete this checkin?
        </p>
      </Modal>
      <li
        className={mode.darkMode ? "dark-checkin-item" : "light-checkin-item"}
      >
        <Card
          className={
            mode.darkMode
              ? "dark-checkin-item__content"
              : "light-checkin-item__content"
          }
        >
          {isLoading && <LoadingSpinner asOverlay />}
          <div
            className={
              mode.darkMode ? "dark-date__display" : "light-date__display"
            }
            onClick={expand ? shrink : extend}
          >
            <p>{props.date.toString().slice(0, 10)}</p>
            <div className={expand ? "up-Arrow-Box" : "down-Arrow-Box"}>
            <FaArrowDown style={{color: "#009edd"}} />
            </div>

          </div>
          <div className={"input-shrinky " + (expand ? "input-expanded" : "")}>
            <ImageRotate />
            <div className="checkin-item-data__Box">






          <CheckinItemCarousel
           date={props.date.toString().slice(0, 10)}
           weight={props.weight}
           weeksOut={props.weeksOut}
           bodyFat={Math.round(props.bodyFat)}
           leanBodyMass={Math.round(props.leanBodyMass)}
           notes={props.notes}
           neckMeasure={props.neckMeasure}
           armMeasure={props.armMeasure}
           chestMeasure={props.chestMeasure}
           waistMeasure={props.waistMeasure}
           hipsMeasure={props.hipsMeasure}
           thighMeasure={props.thighMeasure}
           calfMeasure={props.calfMeasure}
           chest={props.chest}
           axilla={props.axilla}
           tricep={props.tricep}
           subscapular={props.subscapular}
           abdominal={props.abdominal}
           suprailiac={props.suprailiac}
           thigh={props.thigh}
           cardioDuration={props.cardioDuration}
           cardioCalories={props.cardioCalories}

          
          />


            </div>

            {/* <div className={mode.darkMode ? "dark-checkin-item__image" : "light-checkin-item__image"}>
            
        {/* <img src={`http://localhost:5000/${props.image}`} alt={props.title} /> */}

            <div
              className={
                mode.darkMode
                  ? "dark-checkin-item__actions"
                  : "light-checkin-item__actions"
              }
            >
              <Button to={`/${props.id}/updateCheckin`}>Update</Button>
              <Button danger onClick={showDeleteWarningHandler}>
                Delete
              </Button>
            </div>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default CheckinItem;
