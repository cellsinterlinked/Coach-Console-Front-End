import React, { useContext, useEffect} from "react";
import Input from '../../../Shared/components/FormElements//Input';
import Button from '../../../Shared/components/FormElements/Button'
import {VALIDATOR_REQUIRE} from '../../../Shared/util/validators'
import { useForm } from '../../../Shared/hooks/form-hook';
import '../../pages/CheckinForm.css'
import { DarkModeContext } from '../../../Shared/context/dark-mode-context'

 const CheckInBasics = ({next, gender, setGender, loadedCheckin}) => {
  const mode = useContext(DarkModeContext);

  const today = () => {
    const timeElapsed = Date.now();
    const newTime = new Date(timeElapsed)
    const now = newTime.toISOString().slice(0,10)
    return now;
  }
  const [formState, inputHandler, setFormData] = useForm(
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
    }
  )

  useEffect(() => {
    if (loadedCheckin) {
    
      setFormData(
        {
          age: {
            value: loadedCheckin.age,
            isValid: true
          },
          weeks: {
            value: loadedCheckin.weeksOut,
            isValid: true
          },
          weight: {
            value: loadedCheckin.weight,
            isValid: true
          },
          date: {
            value: loadedCheckin.date.slice(0, 10),
            isValid: true
          },
        }
      )
    }
  }, [loadedCheckin, setFormData])

  const submitHandler = (e) => {
    e.preventDefault();
    next(formState.inputs)
  }

    
  return (
   <div >
     <form className={mode.darkMode ? "dark-checkin-form" : "light-checkin-form"} onSubmit={submitHandler}>
     <h2 className={mode.darkMode ? "dark-title-checkin" : "light-title-checkin"}>Log The Basics</h2>
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
              initialValue={loadedCheckin ? loadedCheckin.date.slice(0, 10) : today()}

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
              initialValue={loadedCheckin ? loadedCheckin.age : ""}
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
              initialValue={loadedCheckin ? loadedCheckin.weeksOut : ""}
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
              initialValue={loadedCheckin ? loadedCheckin.weight : ""}
            />
            <p className="measure">Lbs</p>
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
     <button onClick={() => console.log(loadedCheckin)}> click Me</button>

   </div>

    )

 };

 export default CheckInBasics;