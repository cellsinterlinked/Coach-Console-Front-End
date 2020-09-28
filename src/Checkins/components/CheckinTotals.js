import React, { useState, useEffect, useContext } from "react";
import "./CheckinTotals.css";
import Card from "../../Shared/components/UIElements/Card";
import Button from "../../Shared/components/FormElements/Button";
import LoadingSpinner from "../../Shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../Shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import { useHistory } from "react-router-dom";
import Modal from "../../Shared/components/UIElements/Modal";
import { DarkModeContext } from "../../App";
import StatsCompare from "./StatsCompare";
import MeasurementsCompare from "./MeasurementsCompare";
import Slider from "../../Shared/components/UIElements/Slider";

const CheckinTotals = props => {
  const {themeMode} = useContext(DarkModeContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loadedAthlete, setLoadedAthlete] = useState();

  const history = useHistory();
  const clientId = props.clientId;

  useEffect(() => {
    const fetchAthlete = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/athletes/${clientId}`
        );
        setLoadedAthlete(responseData.athlete.name);
      } catch (err) {}
    };
    fetchAthlete();
  }, [sendRequest, clientId]);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/athletes/${props.clientId}`,
        "DELETE"
      );
      history.push(`/clients`);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
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
          className={themeMode === 'darkTheme' ? "dark-warning-text" : "light-warning-text"}
        >
          Do you want to delete this client?
        </p>
      </Modal>

      <Card
        className={themeMode === 'darkTheme' ? "dark-totals-card" : "light-totals-card"}
      >
        {isLoading && <LoadingSpinner asOverlay />}
          <h1 className="client-name">{loadedAthlete}</h1>
        <div className="totals-info">
          <Slider items={props.items} />


        </div>
        <footer>
          <div
            className={
              themeMode === 'darkTheme'
                ? "dark-checkin-item__actions"
                : "light-checkin-item__actions"
            }
          >
            <Button danger onClick={showDeleteWarningHandler} size="small">
              Delete Client
            </Button>

          <div className="new-checkin-box">
            <Button
              to={`/${props.clientId}/newcheckin`}
              buttonStyle="new-checkin__button"
              size="small"
              >
              New Checkin
            </Button>
          </div>

          <br />

          <div className="new-checkin-box">
            <Button
              to={`/${props.clientId}/editclient`}
              buttonStyle="new-checkin__button"
              size="small"
              >
              Update Client
            </Button>
          </div>
              </div>

        </footer>
      </Card>
    </React.Fragment>
  );
};

export default CheckinTotals;
