import React, { useState, useContext } from 'react';
import Button from '../../Shared/components/FormElements/Button';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import './CheckinForm.css';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import { DarkModeContext } from '../../Shared/context/dark-mode-context';
import Modal from '../../Shared/components/UIElements/Modal';
import MainNavigation from '../../Shared/components/Navigation/MainNavigation';
import CheckInBasics from '../components/new-checkin-components/CheckInBasics';
import CheckInSliders from '../components/new-checkin-components/CheckInSliders';
import CheckInBf from '../components/new-checkin-components/CheckInBf';
import CheckInNotes from '../components/new-checkin-components/CheckInNotes';
import CheckInPictures from '../components/new-checkin-components/CheckInPictures';
import CheckInMeasurements from '../components/new-checkin-components/CheckInMeasurements';
import CheckInCardio from '../components/new-checkin-components/CheckInCardio';
import CheckInFinal from '../components/new-checkin-components/CheckInFinal';
import IconAnimation from '../../Shared/components/UIElements/IconAnimation';

const NewCheckin = () => {
  const mode = useContext(DarkModeContext);

  const [formTotal, setFormTotal] = useState({});
  const [pageNum, setPageNum] = useState(0);

  const [gender, setGender] = useState();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [bfDisplay, setBfDisplay] = useState(false);
  const [notesDisplay, setNotesDisplay] = useState(false);
  const [picDisplay, setPicDisplay] = useState(false);
  const [measureDisplay, setMeasureDisplay] = useState(false);
  const [cardioDisplay, setCardioDisplay] = useState(false);

  const [finalFat, setFinalFat] = useState();
  const [finalFatMass, setFinalFatMass] = useState();
  const [finalLeanBodyMass, setFinalLeanBodyMass] = useState();

  const client = useParams().clientId;
  const history = useHistory();

  const showInstructionsHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelInstructionsHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmInstructionsHandler = () => {
    setShowConfirmModal(false);
  };

  const secondNext = (inputs) => {
    const newTotals = { ...formTotal, ...inputs };
    setFormTotal(newTotals);

    if (bfDisplay) {
      setPageNum(2);
    } else if (notesDisplay) {
      setPageNum(3);
    } else if (picDisplay) {
      setPageNum(4);
    } else if (measureDisplay) {
      setPageNum(5);
    } else if (cardioDisplay) {
      setPageNum(6);
    } else {
      setPageNum(7);
    }
  };

  const thirdNext = (inputs, formState) => {
    const newTotals = { ...formTotal, ...inputs };
    setFormTotal(newTotals);

    bodyFatHandler(formState);

    if (notesDisplay) {
      setPageNum(3);
    } else if (picDisplay) {
      setPageNum(4);
    } else if (measureDisplay) {
      setPageNum(5);
    } else if (cardioDisplay) {
      setPageNum(6);
    } else {
      setPageNum(7);
    }
  };

  const fourthNext = (inputs) => {
    const newTotals = { ...formTotal, ...inputs };
    setFormTotal(newTotals);

    if (picDisplay) {
      setPageNum(4);
    } else if (measureDisplay) {
      setPageNum(5);
    } else if (cardioDisplay) {
      setPageNum(6);
    } else {
      setPageNum(7);
    }
  };

  const fifthNext = (inputs) => {
    const newTotals = { ...formTotal, images: inputs };
    setFormTotal(newTotals);
    if (measureDisplay) {
      setPageNum(5);
    } else if (cardioDisplay) {
      setPageNum(6);
    } else {
      setPageNum(7);
    }
    console.log(newTotals);
  };

  const sixthNext = (inputs) => {
    const newTotals = { ...formTotal, ...inputs };
    setFormTotal(newTotals);

    if (cardioDisplay) {
      setPageNum(6);
    } else {
      setPageNum(7);
    }
    console.log(formTotal)
  };

  const seventhNext = (inputs) => {
    const newTotals = { ...formTotal, ...inputs };
    setFormTotal(newTotals);

    setPageNum(7);
  };

  const bodyFatHandler = (formState) => {
    console.log(gender);
    console.log(formState);
    const findSum = (formState) => {
      const {
        chest,
        axilla,
        tricep,
        subscapular,
        abdominal,
        suprailiac,
        thigh,
      } = formState.inputs;

      const age = formTotal.age.value;
      console.log(age);
      const total =
        Number(chest.value) +
        Number(axilla.value) +
        Number(tricep.value) +
        Number(abdominal.value) +
        Number(subscapular.value) +
        Number(thigh.value) +
        Number(suprailiac.value);
      console.log(total);
      let yourFatAss;
      if (gender === '1') {
        yourFatAss =
          495 /
            (1.112 -
              0.00043499 * total +
              0.00000055 * total * total -
              0.00028826 * age) -
          450;
      } else if (gender === '2') {
        yourFatAss =
          495 /
            (1.097 -
              0.00046971 * total +
              0.00000056 * total * total -
              0.00012828 * age) -
          450;
      }
      console.log(yourFatAss);
      return yourFatAss;
    };
    const theFat = findSum(formState);
    const fatMass = formTotal.weight.value * (theFat * 0.01);
    const leanBodyMass =
      formTotal.weight.value - formTotal.weight.value * (theFat * 0.01);

    setFinalFat(theFat);
    setFinalFatMass(fatMass);
    setFinalLeanBodyMass(leanBodyMass);
  };

  const checkinSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formTotal.date && formData.append('date', formTotal.date.value);
      formTotal.weight && formData.append('weight', formTotal.weight.value);
      finalFat && formData.append('bodyFat', finalFat);
      formTotal.weeks && formData.append('weeksOut', formTotal.weeks.value);
      formData.append('athlete', client);

      if (formTotal.images) {
        formTotal.images.forEach((image) =>
          formData.append('image', image.value)
        );
      }
      gender && formData.append('gender', gender)
      formTotal.age && formData.append('age', formTotal.age.value)
      formTotal.chest && formData.append('chest', formTotal.chest.value);
      formTotal.axilla && formData.append('axilla', formTotal.axilla.value);
      formTotal.tricep && formData.append('tricep', formTotal.tricep.value);
      formTotal.subscapular &&
        formData.append('subscapular', formTotal.subscapular.value);
      formTotal.abdominal &&
        formData.append('abdominal', formTotal.abdominal.value);
      formTotal.suprailiac &&
        formData.append('suprailiac', formTotal.suprailiac.value);
      formTotal.thigh && formData.append('thigh', formTotal.thigh.value);
      formTotal.notes && formData.append('notes', formTotal.notes.value);
      finalFatMass && formData.append('fatMass', finalFatMass);
      finalLeanBodyMass && formData.append('leanBodyMass', finalLeanBodyMass);
      formTotal.neck_inch &&
        formData.append('neckMeasure', formTotal.neck_inch.value);
      formTotal.arm_inch &&
        formData.append('armMeasure', formTotal.arm_inch.value);
      formTotal.chest_inch &&
        formData.append('chestMeasure', formTotal.chest_inch.value);
      formTotal.waist_inch &&
        formData.append('waistMeasure', formTotal.waist_inch.value);
      formTotal.hips_inch &&
        formData.append('hipsMeasure', formTotal.hips_inch.value);
      formTotal.thigh_inch &&
        formData.append('thighMeasure', formTotal.thigh_inch.value);
      formTotal.calf_inch &&
        formData.append('calfMeasure', formTotal.calf_inch.value);
      formTotal.cardio_duration &&
        formData.append('cardioDuration', formTotal.cardio_duration.value);
      formTotal.cardio_calories &&
        formData.append('cardioCalories', formTotal.cardio_calories.value);
      formTotal.cardio_type &&
        formData.append('cardioType', formTotal.cardio_type.value)
      formTotal.cardio_sessions &&
        formData.append('cardioSessions', formTotal.cardio_sessions.value)

      console.log(formData);
      await sendRequest('http://localhost:5000/api/checkins', 'POST', formData);
      history.push('/' + client + '/checkins');
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return (
    <li className={mode.darkMode ? 'dark-client-item' : 'light-client-item'}>
    <div className="center loaderOverlay">
      <IconAnimation loading={isLoading} />
    </div>
    </li>

    )
  }

  return (
    <div
      className={
        mode.darkMode
          ? 'new-checkin-container dark-new-checkin-container'
          : 'new-checkin-container'
      }
    >
      <MainNavigation />
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelInstructionsHandler}
        header="Pinch and measure area shown in the picture"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={confirmInstructionsHandler}>
              Got It!
            </Button>
          </React.Fragment>
        }
      >
        <div className="instructions-image__box">
          <img
            src="http://www.dhresource.com/albu_770902509_00-1.0x0/body-fat-measurement-testing-calipers-skinfold.jpg"
            alt="pinch here"
          ></img>
        </div>
      </Modal>

      {pageNum === 0 && (
        <CheckInSliders
          setBfDisplay={setBfDisplay}
          bfDisplay={bfDisplay}
          setNotesDisplay={setNotesDisplay}
          notesDisplay={notesDisplay}
          picDisplay={picDisplay}
          setPicDisplay={setPicDisplay}
          measureDisplay={measureDisplay}
          setMeasureDisplay={setMeasureDisplay}
          cardioDisplay={cardioDisplay}
          setCardioDisplay={setCardioDisplay}
          setPageNum={setPageNum}
        />
      )}

      {pageNum === 1 && (
        <CheckInBasics
          next={secondNext}
          gender={gender}
          setGender={setGender}
        />
      )}

      {pageNum === 2 && (
        <CheckInBf
          next={thirdNext}
          showInstructionsHandler={showInstructionsHandler}
          bodyFatHandler={bodyFatHandler}
        />
      )}

      {pageNum === 3 && <CheckInNotes next={fourthNext} />}

      {pageNum === 4 && <CheckInPictures next={fifthNext} />}

      {pageNum === 5 && <CheckInMeasurements next={sixthNext} />}

      {pageNum === 6 && <CheckInCardio next={seventhNext} />}

      {pageNum === 7 && (
        <CheckInFinal checkinSubmitHandler={checkinSubmitHandler} />
      )}

      
    </div>
  );
};

export default NewCheckin;
