import React, { useState, useContext, useEffect} from "react";
import Input from '../../../Shared/components/FormElements/Input'
import Button from '../../../Shared/components/FormElements/Button'
import {VALIDATOR_REQUIRE} from '../../../Shared/util/validators'
import { useForm } from '../../../Shared/hooks/form-hook';
import '../../pages/CheckinForm.css'
import { DarkModeContext } from '../../../Shared/context/dark-mode-context'
import { FaInfoCircle } from "react-icons/fa";

const CheckInNotes = ({next}) => {
  const mode = useContext(DarkModeContext);
    const [formState, inputHandler] = useForm({
      notes: {
        value: "",
        isValid: false
      }
    })

    const submitHandler = (e) => {
      e.preventDefault()
      next(formState.inputs)
    }


  return (
    <form className={mode.darkMode ? "dark-checkin-form" : "light-checkin-form"} onSubmit={submitHandler}>
      <h2 className={mode.darkMode ? "dark-title-checkin" : "light-title-checkin"}>Leave Some Notes</h2>
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

export default CheckInNotes;