import React, { useState, useContext, useEffect} from "react";
import Input from '../../../Shared/components/FormElements/Input'
import Button from '../../../Shared/components/FormElements/Button'
import {VALIDATOR_REQUIRE} from '../../../Shared/util/validators'
import { useForm } from '../../../Shared/hooks/form-hook';
import '../../pages/CheckinForm.css'
import { DarkModeContext } from '../../../Shared/context/dark-mode-context'
import { FaInfoCircle } from "react-icons/fa";

const CheckInMeasurements = ({next}) => {
  const mode = useContext(DarkModeContext);
  const [formState, inputHandler] = useForm(
    {
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



    })

    const submitHandler = (e) => {
      e.preventDefault()
      next(formState.inputs)
    }

  return (
    <form  className={mode.darkMode ? "dark-checkin-form" : "light-checkin-form"} onSubmit={submitHandler}>
      <h2 className={mode.darkMode ? "dark-title-checkin" : "light-title-checkin"}>Log Body Measurements</h2>
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

export default CheckInMeasurements;