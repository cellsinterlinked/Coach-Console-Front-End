import React, { useState, useContext, useEffect} from "react";
import Input from '../../../Shared/components/FormElements/Input'
import Button from '../../../Shared/components/FormElements/Button'
import {VALIDATOR_REQUIRE} from '../../../Shared/util/validators'
import { useForm } from '../../../Shared/hooks/form-hook';
import '../../pages/CheckinForm.css'
import { DarkModeContext } from '../../../Shared/context/dark-mode-context'
import { FaInfoCircle } from "react-icons/fa";

 const CheckInCardio = ({next}) => {
  const mode = useContext(DarkModeContext);
  const [formState, inputHandler] = useForm(
    {
      cardio_duration: {
        value: 0,
        isValid: false
      },
      cardio_calories: {
        value: 0,
        isValid: false
      }

    })

    const submitHandler = (e) => {
      e.preventDefault()
      next(formState.inputs)
    }
   
   return (
    <form className={mode.darkMode ? "dark-checkin-form" : "light-checkin-form"} onSubmit={submitHandler}>
      <h2 className={mode.darkMode ? "dark-title-checkin" : "light-title-checkin"}>Log Weekly Cardio</h2>
       <div className="caliper-directions-box">
          <p>
            Enter the duration of cardio done this week and or calories burnt doing cardio. 
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
                id="cardio_duration"
                element="input"
                type="number"
                labelText="Duration (minutes)"
                importedStyle="num"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter total cardio in minutes"
              />
            </div>
            
          </div>




          <div className="inputLine">
            <div className="info-circle__border">
              <div className="info-circle">
                <FaInfoCircle className="info-icon" size="1.7em" />
              </div>
            </div>
            <div className="typeBox">
              <Input
                id="cardio_calories"
                element="input"
                type="number"
                labelText="Calories"
                importedStyle="num"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter total calories burnt"
              />
            </div>
      
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

 export default CheckInCardio