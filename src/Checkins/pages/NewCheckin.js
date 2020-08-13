import React, { useState, useContext } from "react"; //use callback will wrap out ageinputhandler and give it dependencies so it doesnt keep rerendering and causing and infinite loop
import Input from "../../Shared/components/FormElements/Input";
import Button from "../../Shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE } from "../../Shared/util/validators";
import { useForm } from "../../Shared/hooks/form-hook";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import "./CheckinForm.css";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../../Shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../Shared/components/UIElements/ErrorModal";
import ImageUpload from "../../Shared/components/FormElements/ImageUpload";
import { DarkModeContext } from "../../Shared/context/dark-mode-context";
import { FaInfoCircle } from "react-icons/fa";
import Modal from "../../Shared/components/UIElements/Modal";


const NewCheckin = () => {
  const mode = useContext(DarkModeContext);

  const [gender, setGender] = useState();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [ bfDisplay, setBfDisplay ] = useState(false);
  const [ notesDisplay, setNotesDisplay] = useState(false);
  const [ picDisplay, setPicDisplay] = useState(false);
  const [measureDisplay, setMeasureDisplay] = useState(false);

  const client = useParams().clientId;

  const [formState, inputHandler] = useForm(
    {
      age: {
        value: 0,
        isValid: false
      },
      weeks: {
        value: "",
        isValid: false
      },
      weight: {
        value: "",
        isValid: false
      },
      date: {
        value: "",
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
        value: "",
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      },
      neck_inch: {
        value: 0,
        isValid: false
      },
      arm_inch: {
        value: 0,
        isValid: false
      },
      chest_inch: {
        value: 0,
        isValid: false
      },
      waist_inch: {
        value: 0,
        isValid: false
      },
      hips_inch: {
        value: 0,
        isValid: false
      },
      thigh_inch: {
        value: 0,
        isValid: false
      },
      calf_inch: {
        value: 0,
        isValid: false
      },
    },
    false
  );

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

  const bfChecked = () => {
    setBfDisplay(true);
  };

  const bfUnchecked = () => {
    setBfDisplay(false);
  }

  const notesChecked = () => {
     setNotesDisplay(true)
  
  }
  const notesUnchecked = () => {
    setNotesDisplay(false);
  }

  const imageChecked = () => {
     setPicDisplay(true)
  }

  const imageUnchecked = () => {
    setPicDisplay(false)
  }

  const measurementsChecked = () => {
    setMeasureDisplay(true);
  }

  const measurementsUnchecked = () => {
    setMeasureDisplay(false);
  }


  const checkinSubmitHandler = async event => {
    event.preventDefault();
    const theFat = findSum(formState);
    const fatMass = formState.inputs.weight.value * (theFat * .01);
    const leanBodyMass = formState.inputs.weight.value - (formState.inputs.weight.value * (theFat * .01));
    console.log({
      date: formState.inputs.date.value,
      weight: formState.inputs.weight.value,
      bodyFat: theFat,
      weeksOut: formState.inputs.weeks.value,
      athlete: client,
      image: formState.inputs.image.value,
      bodyMass : leanBodyMass,
      fatMass
    });
    try {
      const formData = new FormData();
      formData.append("date", formState.inputs.date.value);
      formData.append("weight", formState.inputs.weight.value);
      formData.append("bodyFat", theFat);
      formData.append("weeksOut", formState.inputs.weeks.value);
      formData.append("athlete", client);
      formData.append("image", formState.inputs.image.value);
      formData.append("chest", formState.inputs.chest.value);
      formData.append("axilla", formState.inputs.axilla.value);
      formData.append("tricep", formState.inputs.tricep.value);
      formData.append("subscapular", formState.inputs.subscapular.value);
      formData.append("abdominal", formState.inputs.abdominal.value);
      formData.append("suprailiac", formState.inputs.suprailiac.value);
      formData.append("thigh", formState.inputs.thigh.value);
      formData.append("notes", formState.inputs.notes.value);
      formData.append("fatMass", fatMass);
      formData.append("leanBodyMass", leanBodyMass);


      console.log("date", formState.inputs.date.value);
      console.log("weight", formState.inputs.weight.value);
      console.log("bodyFat", theFat);
      console.log("weeksOut", formState.inputs.weeks.value);
      console.log("athlete", client);
      console.log("image", formState.inputs.image.value);
      console.log(formData.get("date"));
      // something differnt
      await sendRequest("http://localhost:5000/api/checkins", "POST", formData);
      history.push("/" + client + "/checkins");
    } catch (err) {
      console.log(err);
    }
  };

  const findSum = formState => {
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
      yourFatAss =
        495 / (1.112 - (0.00043499 * total) + (0.00000055 * total * total) - (0.00028826 * age.value)) - 450 ;
    } else if (gender === "2") {
      yourFatAss =
        495 / (1.097 - (0.00046971 * total) + (0.00000056 * total * total) - (0.00012828 * age.value)) - 450 ;
        
    }

    
    // console.log(yourFatAss)
    return yourFatAss;

    
  };

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

      <form
        className={mode.darkMode ? "dark-checkin-form" : "light-checkin-form"}
        onSubmit={checkinSubmitHandler}
      >
        {isLoading && <LoadingSpinner asOverlay />}
        <h2 className="title-checkin">New Checkin</h2>
        <div className="selectors-container">
          <div className={mode.darkMode ? "dark-selectors" : "light-selectors"}>
            <select
              value={gender}
              onChange={event => setGender(event.target.value)}
              id="sex"
              name="sex"
            >
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
              errorText="Please enter the week of training "
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
              errorText="Please enter weight in pounds"
            />
            <p className="measure">Lbs</p>
          </div>
        </div>

        <div className="measurements-form">
          <div className={mode.darkMode ? "dark-input__Check" : "light-input__Check"}>

          <div className={mode.darkMode ? "dark-input-toggle-container" : "light-input-toggle-container"}>
          <span style={{ color: bfDisplay ? "grey" : "#5fa8d3" }}>No</span>
          <span className={mode.darkMode ? "dark-input-toggle" : "light-input-toggle"}> 
              <input  
              checked={bfDisplay}
              onChange={bfDisplay ? bfUnchecked : bfChecked } 
              id="bfCheckbox"
              className="checkbox"
              type="checkbox"
            />
          <label htmlFor="bfCheckbox" />
          </span>
          <span style={{ color: bfDisplay ? "#5fa8d3" : "grey" }}>Yes</span>
        </div>

        <p>Log Caliper Data?</p>



          </div>
          <div className={"input-shrinky " + (bfDisplay ? "input-expanded" : "")}>
        
          <div className="caliper-directions-box">
            <p>
              Using a caliper, please pinch the listed areas and input the
              corresponding measurements in millimeters. If you are unsure how
              to do this please click the info icon next to its respective
              input.
            </p>
          </div>
          <div className="inputLine">
            <div
              className="info-circle__border"
              onClick={showInstructionsHandler}
            >
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
          </div>

          <div className={mode.darkMode ? "dark-input__Check" : "light-input__Check"}>
          <div className={mode.darkMode ? "dark-input-toggle-container" : "light-input-toggle-container"}>
          <span style={{ color: notesDisplay ? "grey" : "#5fa8d3" }}>No</span>
          <span className={mode.darkMode ? "dark-input-toggle" : "light-input-toggle"}> 
              <input  
              checked={notesDisplay}
              onChange={notesDisplay ? notesUnchecked : notesChecked} 
              id="notesCheckbox"
              className="checkbox"
              type="checkbox"
            />
          <label htmlFor="notesCheckbox" />
          </span>
          <span style={{ color: notesDisplay ? "#5fa8d3" : "grey" }}>Yes</span>
        </div>

        <p>Log Notes?</p>
        </div>



        
        <div className={"input-shrinky " + (notesDisplay ? "input-expanded" : "")}>
        <div className="caliper-directions-box">
          <p>
            Leave notes regarding nutrition, training, or any changes since the
            last check in.{" "}
          </p>
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
        </div>



        <div className={mode.darkMode ? "dark-input__Check" : "light-input__Check"}>
          <div className={mode.darkMode ? "dark-input-toggle-container" : "light-input-toggle-container"}>
          <span style={{ color: picDisplay ? "grey" : "#5fa8d3" }}>No</span>
          <span className={mode.darkMode ? "dark-input-toggle" : "light-input-toggle"}> 
              <input  
              checked={picDisplay}
              onChange={picDisplay ? imageUnchecked : imageChecked} 
              id="imageCheckbox"
              className="checkbox"
              type="checkbox"
            />
          <label htmlFor="imageCheckbox" />
          </span>
          <span style={{ color: picDisplay ? "#5fa8d3" : "grey" }}>Yes</span>
        </div>

        <p>Upload Progess Photos?</p>
        </div>










        <div className={"input-shrinky " + (picDisplay ? "input-expanded" : "")}>
        <div className="caliper-directions-box">
          <p>
            Upload a progress picture of your client from the date of this check
            in.{" "}
          </p>
        </div>
        <div className="checkin-image-box">
          <ImageUpload center id="image" onInput={inputHandler} errorText="" />
        </div>
        </div>


{/* TESTING */}

        <div className={mode.darkMode ? "dark-input__Check" : "light-input__Check"}>
          <div className={mode.darkMode ? "dark-input-toggle-container" : "light-input-toggle-container"}>
          <span style={{ color: notesDisplay ? "grey" : "#5fa8d3" }}>No</span>
          <span className={mode.darkMode ? "dark-input-toggle" : "light-input-toggle"}> 
              <input  
              checked={measureDisplay}
              onChange={measureDisplay ? measurementsUnchecked : measurementsChecked} 
              id="measurementsCheckbox"
              className="checkbox"
              type="checkbox"
            />
          <label htmlFor="measurementsCheckbox" />
          </span>
          <span style={{ color: measureDisplay ? "#5fa8d3" : "grey" }}>Yes</span>
        </div>

        <p>Log Measurements?</p>
        </div>



        
        <div className={"input-shrinky " + (measureDisplay ? "input-expanded" : "")}>
        <div className="caliper-directions-box">
          <p>
            Take measurements in inches of each area of the body
          </p>
        </div>


        <div className="inputLine">
            <div className="info-circle__border">
              <div className="info-circle">
                <FaInfoCircle className="info-icon" size="1.7em" />
              </div>
            </div>
            <div className="typeBox">
              <Input
                id="neck_inch"
                element="input"
                type="number"
                labelText="Neck"
                importedStyle="num"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter valid measurement in inches"
              />
            </div>
            <p className="measure">"</p>
          </div>




          <div className="inputLine">
            <div className="info-circle__border">
              <div className="info-circle">
                <FaInfoCircle className="info-icon" size="1.7em" />
              </div>
            </div>
            <div className="typeBox">
              <Input
                id="arm_inch"
                element="input"
                type="number"
                labelText="Arm"
                importedStyle="num"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter valid measurement in inches"
              />
            </div>
            <p className="measure">"</p>
          </div>





          <div className="inputLine">
            <div className="info-circle__border">
              <div className="info-circle">
                <FaInfoCircle className="info-icon" size="1.7em" />
              </div>
            </div>
            <div className="typeBox">
              <Input
                id="chest_inch"
                element="input"
                type="number"
                labelText="Chest"
                importedStyle="num"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter valid measurement in inches"
              />
            </div>
            <p className="measure">"</p>
          </div>





          <div className="inputLine">
            <div className="info-circle__border">
              <div className="info-circle">
                <FaInfoCircle className="info-icon" size="1.7em" />
              </div>
            </div>
            <div className="typeBox">
              <Input
                id="waist_inch"
                element="input"
                type="number"
                labelText="Waist"
                importedStyle="num"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter valid measurement in inches"
              />
            </div>
            <p className="measure">"</p>
          </div>





          <div className="inputLine">
            <div className="info-circle__border">
              <div className="info-circle">
                <FaInfoCircle className="info-icon" size="1.7em" />
              </div>
            </div>
            <div className="typeBox">
              <Input
                id="hips_inch"
                element="input"
                type="number"
                labelText="Hips"
                importedStyle="num"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter valid measurement in inches"
              />
            </div>
            <p className="measure">"</p>
          </div>



          <div className="inputLine">
            <div className="info-circle__border">
              <div className="info-circle">
                <FaInfoCircle className="info-icon" size="1.7em" />
              </div>
            </div>
            <div className="typeBox">
              <Input
                id="thigh_inch"
                element="input"
                type="number"
                labelText="Thigh"
                importedStyle="num"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter valid measurement in inches"
              />
            </div>
            <p className="measure">"</p>
          </div>



          <div className="inputLine">
            <div className="info-circle__border">
              <div className="info-circle">
                <FaInfoCircle className="info-icon" size="1.7em" />
              </div>
            </div>
            <div className="typeBox">
              <Input
                id="calf_inch"
                element="input"
                type="number"
                labelText="Calf"
                importedStyle="num"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter valid measurement in inches"
              />
            </div>
            <p className="measure">"</p>
          </div>








        </div>


        

    {/* END TESTING     */}
        
        <div className="submit-checkin" style={{marginTop: "2rem"}}>
          <Button
            type="submit"
            disabled={!formState.isValid}
          >
            Add Checkin
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default NewCheckin;
