import React, { useState, useContext } from 'react';                     //use callback will wrap out ageinputhandler and give it dependencies so it doesnt keep rerendering and causing and infinite loop
import Input from '../../Shared/components/FormElements/Input';
import Button from '../../Shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE } from '../../Shared/util/validators';
import { useForm } from '../../Shared/hooks/form-hook';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import './CheckinForm.css'
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from '../../Shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import ImageUpload from '../../Shared/components/FormElements/ImageUpload';
import { DarkModeContext } from '../../Shared/context/dark-mode-context';
import { FaInfoCircle } from "react-icons/fa";
import Modal from '../../Shared/components/UIElements/Modal';


const NewCheckin = () => {
  const mode = useContext(DarkModeContext);

  const [gender, setGender] = useState()
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

 const client = useParams().clientId


  const [formState, inputHandler] = useForm({
      age: {
        value: 0,
        isValid: false
      },
      weeks: {
        value: 0,
        isValid: false
      },
      weight: {
        value: 0,
        isValid: false
      },
      date: {
        value: '',
        isValid: false
      },
      chest: {
        value: 0,
        isValid: false
      },
      axilla: {
        value: 0,
        isValid: false
      },
      tricep: {
        value: 0,
        isValid: false
      },
      subscapular: {
        value: 0,
        isValid: false
      },
      abdominal: {
        value: 0,
        isValid: false
      },
      suprailiac: {
        value: 0,
        isValid: false
      },
      thigh: {
        value: 0,
        isValid: false
      },
      notes: {
        value: '',
        isValid: false
      },
      // image: {
      //   value: null,
      //   isValid: false
      // }
      
    },
   false
  );

  const history = useHistory();

  const showInstructionsHandler = () => {
    setShowConfirmModal(true)
  }

  const cancelInstructionsHandler = () => {
    setShowConfirmModal(false)
  }

  const confirmInstructionsHandler = () => {
    setShowConfirmModal(false)
  }
  
  const checkinSubmitHandler = async event => {
    event.preventDefault();
    const theFat = findSum(formState);

    console.log({
      date: formState.inputs.date.value,
      weight: formState.inputs.weight.value,
      bodyFat: theFat,
      weeksOut: formState.inputs.weeks.value,
      athlete: client,
      // image: formState.inputs.image.value
    })
    try {
      const formData = new FormData();
      formData.append('date', formState.inputs.date.value);
      formData.append('weight', formState.inputs.weight.value);
      formData.append('bodyFat', theFat);
      formData.append('weeksOut', formState.inputs.weeks.value);
      formData.append('athlete', client);
      
      console.log('date', formState.inputs.date.value);
      console.log('weight', formState.inputs.weight.value);
      console.log('bodyFat', theFat);
      console.log('weeksOut', formState.inputs.weeks.value);
      console.log('athlete', client);
      console.log('image', formState.inputs.image.value);
      console.log(formData.get('date'));
      // something differnt
      await sendRequest(
        'http://localhost:5000/api/checkins',
        'POST',
        formData);
      history.push(`/${client}/checkins`)
    } catch (err) {
      console.log(err);
    }
  };
  
  const findSum = (formState) => {
    const {
      age,
      chest,
      axilla,
      tricep,
      subscapular,
      abdominal,
      suprailiac,
      thigh
    } = formState.inputs;

    const total = 
      Number(chest.value) + 
      Number(axilla.value) +
      Number(tricep.value) +
      Number(abdominal.value) +
      Number(subscapular.value) +
      Number(thigh.value) +
      Number(suprailiac.value);
    
    let yourFatAss;
    if (gender === "1") {
     yourFatAss = 1.112 - (0.00043499 * total) + (0.00000055 * total^2) - (0.00028826 * age.value)

    } else if (gender === "2") {
     yourFatAss = 1.097 - (0.00046971 * total) + (0.00000056 * total) - (0.00012828 * age.value)
    
    };
    // console.log(yourFatAss)
    return yourFatAss;
    
    
  }
  
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal 
      show={showConfirmModal}
      onCancel={cancelInstructionsHandler}
      header="Pinch and measure area shown in the picture" 
      footerClass="place-item__modal-actions" 
      footer={
      <React.Fragment>
        <Button  inverse onClick={confirmInstructionsHandler}>Got It!</Button>
      </React.Fragment>
    }>
    <div className="instructions-image__box">
          <img src="http://www.dhresource.com/albu_770902509_00-1.0x0/body-fat-measurement-testing-calipers-skinfold.jpg"></img>
          </div>
    </Modal>

    <form className={mode.darkMode ? "dark-checkin-form" : "light-checkin-form"} onSubmit={checkinSubmitHandler}>
    {isLoading && <LoadingSpinner asOverlay />}
    <h2 className="title-checkin">New Checkin</h2>
    <div className="selectors-container">
      <div className={mode.darkMode ? "dark-selectors" : "light-selectors"}>
        <select value={gender} onChange={(event) =>  setGender(event.target.value)} id="sex" name="sex">
          <option value="0">Select Sex</option>
          <option value="1">Male</option>
          <option value="2">Female</option>
        </select>
        </div>
      </div>
      <div className="checkin-basics">
      <div className="inputLine">
      <Input 
      id="date"
      labelText="Date" 
      element="input" 
      type="date" 
      errorText="Please enter valid date" 
      validators={[VALIDATOR_REQUIRE()]} 
      onInput={inputHandler}
      
      />
      <p className="measure-trans">Wks</p>
      </div>
      <div className="inputLine">
    <Input 
      id="age"
      labelText="Age" 
      element="input" 
      type="number" 
      errorText="Please enter valid age" 
      validators={[VALIDATOR_REQUIRE()]} 
      onInput={inputHandler}
      
      />
      <p className="measure">Yrs</p>
      </div>


      <div className="inputLine">
    <Input 
      id="weeks"
      labelText="Week#" 
      element="input" 
      type="number"  
      importedStyle=""
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
      />
      <p className="measure">Wks</p>
      </div>

      <div className="inputLine">
    <Input
      id="weight" 
      element="input" 
      type="number" 
      labelText="Weight"
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
      />
      <p className="measure">Lbs</p>
      </div>
      </div>
      

    <div className="measurements-form">
    <div className="caliper-directions-box">
      <p>Using a caliper, please pinch the listed areas and input the corresponding 
        measurements in millimeters. If you are unsure how to do this please click 
        the info icon next to its respective input.</p>
    </div>
    <div className="inputLine">
    <div className="info-circle__border" onClick={showInstructionsHandler}>
    <div className="info-circle">
    <FaInfoCircle className="info-icon" size="1.7em" />
    </div>
    </div>
    <div className="typeBox">
    <Input
      id="chest" 
      element="input" 
      type="number" 
      labelText="Chest" 
      importedStyle="num" 
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
      errorText="Please enter valid measurement in millimeters" 
      />
      </div>
      <p className="measure">MM</p>
      </div>


      
    <div className="inputLine">
    <div className="info-circle__border">
    <div className="info-circle">
    <FaInfoCircle className="info-icon" size="1.7em" />
    </div>
    </div>
    <div className="typeBox">
    <Input 
      id="axilla"
      element="input" 
      type="number" 
      labelText="Axilla" 
      importedStyle="num" 
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
      errorText="Please enter valid measurement in millimeters" 
      />
    </div>
      <p className="measure">MM</p>
    </div>


    <div className="inputLine">
    <div className="info-circle__border">
    <div className="info-circle">
    <FaInfoCircle className="info-icon" size="1.7em" />
    </div>
    </div>
    <div className="typeBox">
    <Input 
      id="tricep"
      element="input" 
      type="number" 
      labelText="Tricep" 
      importedStyle="num" 
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
      errorText="Please enter valid measurement in millimeters" 
      />
    </div>
      <p className="measure">MM</p>
    </div>


    <div className="inputLine">
    <div className="info-circle__border">
    <div className="info-circle">
    <FaInfoCircle className="info-icon" size="1.7em" />
    </div>
    </div>
    <div className="typeBox">
    <Input 
      id="subscapular"
      element="input" 
      type="number" 
      labelText="Subscapular" 
      importedStyle="num" 
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
      errorText="Please enter valid measurement in millimeters" 
      />
    </div>
      <p className="measure">MM</p>
    </div>

      

    <div className="inputLine">
    <div className="info-circle__border">
    <div className="info-circle">
    <FaInfoCircle className="info-icon" size="1.7em" />
    </div>
    </div>
    <div className="typeBox">
    <Input 
      id="abdominal"
      element="input" 
      type="number" 
      labelText="Abdominal" 
      importedStyle="num" 
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
      errorText="Please enter valid measurement in millimeters" 
      />
    </div>
      <p className="measure">MM</p>
    </div>

    <div className="inputLine">
    <div className="info-circle__border">
    <div className="info-circle">
    <FaInfoCircle className="info-icon" size="1.7em" />
    </div>
    </div>
    <div className="typeBox">
    <Input
      id="suprailiac"
      element="input" 
      type="number" 
      labelText="Suprailiac" 
      importedStyle="num" 
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
      errorText="Please enter valid measurement in millimeters" 
      />
    </div>
      <p className="measure">MM</p>
    </div>

    <div className="inputLine">
    <div className="info-circle__border">
    <div className="info-circle">
    <FaInfoCircle className="info-icon" size="1.7em" />
    </div>
    </div>
    <div className="typeBox">
    <Input 
      id="thigh"
      element="input" 
      type="number" 
      labelText="Thigh" 
      importedStyle="num" 
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
      errorText="Please enter valid measurement in millimeters" 
      />
    </div>
    <p className="measure">MM</p>
    </div>
    </div>
    <div className="caliper-directions-box">
      <p>Leave notes regarding nutrition, training, or any changes since the last check in. </p>
    </div>
    <div className="notesBox">
    <Input 
      id="notes"
      type="text" 
      labelText="Notes" 
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
      />
    </div>
    <div className="caliper-directions-box">
      <p>Upload a progress picture of your client from the date of this check in.  </p>
    </div>
    <div className="checkin-image-box">  
    <ImageUpload
      center
      id="image"
      onInput={inputHandler}
      
      />
    </div>

    <div className="submit-checkin">
      <Button 
        // buttonStyle="submit-button" 
        type="submit" disabled={!formState.isValid} 
        >Add Checkin</Button>
    </div>
    </form>
    </React.Fragment>
   )
 }
 
 export default NewCheckin
    
    
    



