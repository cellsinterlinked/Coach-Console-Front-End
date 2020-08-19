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
import NotesDisplay from "../../Shared/components/UIElements/NotesDisplay";
import ImageRotate from "../../Shared/components/UIElements/ImageRotate";
import CheckinData from "../components/CheckinData";
import {FaArrowDown} from 'react-icons/fa';

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
              <CheckinData
                children={
                  <GoCalendar
                    style={{ height: "2rem", width: "auto", color: "#bf00ff" }}
                  />
                }
                dataTitle="Date of Checkin"
                data={props.date.toString().slice(0, 10)}
              />

              <CheckinData
                children={
                  <FaWeight
                    style={{ height: "2rem", width: "auto", color: "#2fc6a6" }}
                  />
                }
                dataTitle="Weight at Checkin"
                data={props.weight}
              />

              <CheckinData
                children={
                  <FaCalendarWeek
                    style={{ height: "2rem", width: "auto", color: "#db8515" }}
                  />
                }
                dataTitle="Week of Checkin"
                data={props.weeksOut}
              />

              <CheckinData
                children={
                  <GiPincers
                    style={{ height: "2rem", width: "auto", color: "#ff0000" }}
                  />
                }
                dataTitle="Body Fat%"
                data={Math.round(props.bodyFat)}
              />

              <CheckinData
                children={
                  <GiMuscularTorso
                    style={{ height: "2rem", width: "auto", color: "#006eff" }}
                  />
                }
                dataTitle="Lean Body Mass"
                data={Math.round(props.leanBodyMass)}
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
