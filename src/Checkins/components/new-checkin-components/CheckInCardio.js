import React, {useContext, useEffect} from "react";
import Input from '../../../Shared/components/FormElements/Input'
import Button from '../../../Shared/components/FormElements/Button'
import {VALIDATOR_REQUIRE} from '../../../Shared/util/validators'
import { useForm } from '../../../Shared/hooks/form-hook';
import '../../pages/CheckinForm.css'
import { DarkModeContext } from '../../../Shared/context/dark-mode-context'

 const CheckInCardio = ({next, loadedCheckin}) => {
  const mode = useContext(DarkModeContext);
  const [formState, inputHandler, setFormData] = useForm(
    {
      cardio_duration: {
        value: 0,
        isValid: false
      },
      cardio_calories: {
        value: 0,
        isValid: false
      },
      cardio_type: {
        value: '',
        isValid: false
      },
      cardio_sessions: {
        value: 0,
        isValid: false
      }

    })

    useEffect(() => {
      if(loadedCheckin) {
        setFormData(
          {
            cardio_duration: {
              value: loadedCheckin.cardioDuration,
              isValid: true
            },
            cardio_calories: {
              value: loadedCheckin.cardioDuration,
              isValid: true
            },
            cardio_type: {
              value: loadedCheckin.cardioType,
              isValid: true
            },
            cardio_sessions: {
              value: loadedCheckin.cardioSessions,
              isValid: true
            }
          }
        )
      }
    }, [loadedCheckin, setFormData])

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
            {/* <div className="info-circle__border">
              <div className="info-circle">
                <FaInfoCircle className="info-icon" size="1.7em" />
              </div>
            </div> */}
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
                initialValue={loadedCheckin ? loadedCheckin.cardioDuration : ''}
              />
            </div>
            
          </div>




          <div className="inputLine">
            {/* <div className="info-circle__border">
              <div className="info-circle">
                <FaInfoCircle className="info-icon" size="1.7em" />
              </div>
            </div> */}
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
                initialValue={loadedCheckin ? loadedCheckin.cardioCalories : ''}
              />
            </div>
      
          </div>

          <div className="inputLine">
            {/* <div className="info-circle__border">
              <div className="info-circle">
                <FaInfoCircle className="info-icon" size="1.7em" />
              </div>
            </div> */}
            <div className="typeBox">
              <Input
                id="cardio_type"
                element="input"
                type="text"
                labelText="Type"
                importedStyle="num"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter the type of cardio"
                initialValue={loadedCheckin ? loadedCheckin.cardioType : ''}
              />
            </div>
      
          </div>

          <div className="inputLine">
            {/* <div className="info-circle__border">
              <div className="info-circle">
                <FaInfoCircle className="info-icon" size="1.7em" />
              </div>
            </div> */}
            <div className="typeBox">
              <Input
                id="cardio_sessions"
                element="input"
                type="number"
                labelText="Sessions"
                importedStyle="num"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter the number of cardio sessions"
                initialValue={loadedCheckin ? loadedCheckin.cardioSessions : ''}
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