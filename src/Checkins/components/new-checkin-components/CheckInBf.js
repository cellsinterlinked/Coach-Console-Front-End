import React, { useState, useContext, useEffect} from "react";
import Input from '../../../Shared/components/FormElements/Input'
import Button from '../../../Shared/components/FormElements/Button'
import {VALIDATOR_REQUIRE} from '../../../Shared/util/validators'
import { useForm } from '../../../Shared/hooks/form-hook';
import '../../pages/CheckinForm.css'
import { DarkModeContext } from '../../../Shared/context/dark-mode-context'
import { FaInfoCircle } from "react-icons/fa";

const CheckInBf = ({showInstructionsHandler, next, loadedCheckin}) => {
  const mode = useContext(DarkModeContext);


  const [formState, inputHandler] = useForm({
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
    }

  })

  

  const submitHandler = (e) => {
    e.preventDefault();
    next(formState.inputs, formState)
  }


  return(
    <form  className={mode.darkMode ? "dark-checkin-form" : "light-checkin-form"} onSubmit={submitHandler}>
      <h2 className={mode.darkMode ? "dark-title-checkin" : "light-title-checkin"}>Log Body Fat Measurements</h2>
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

          <div className="submit-checkin" style={{marginTop: "2rem"}}>
          <Button
            type="submit"
            disabled={!formState.isValid}
          >
            Next
          </Button>
        </div>
          </form>
          
    
    
  )
}

export default CheckInBf;