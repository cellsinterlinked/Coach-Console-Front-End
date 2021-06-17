import React, { useContext, useEffect} from "react";
import Input from '../../../Shared/components/FormElements/Input'
import Button from '../../../Shared/components/FormElements/Button'
import {VALIDATOR_REQUIRE} from '../../../Shared/util/validators'
import { useForm } from '../../../Shared/hooks/form-hook';
import '../../pages/CheckinForm.css'
import { DarkModeContext } from '../../../Shared/context/dark-mode-context'
import { FaInfoCircle } from "react-icons/fa";

const CheckInMeasurements = ({next, loadedCheckin}) => {
  const mode = useContext(DarkModeContext);
  const [formState, inputHandler, setFormData] = useForm(
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

    useEffect(() => {
      if(loadedCheckin) {
        setFormData(

          {
            neck_inch: {
              value: loadedCheckin.neckMeasure,
              isValid: true
            },
            arm_inch: {
              value: loadedCheckin.armMeasure,
              isValid: true
            },
            chest_inch: {
              value: loadedCheckin.chestMeasure,
              isValid: true
            },
            waist_inch: {
              value: loadedCheckin.waistMeasure,
              isValid: true
            },
            hips_inch: {
              value: loadedCheckin.hipsMeasure,
              isValid: true
            },
            thigh_inch: {
              value: loadedCheckin.thighMeasure,
              isValid: true
            },
            calf_inch: {
              value: loadedCheckin.calfMeasure,
              isValid: true
            },
          }
        )
      }
    }, [loadedCheckin, setFormData])




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
                initialValue={loadedCheckin ? loadedCheckin.neckMeasure : ''}
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
                initialValue={loadedCheckin ? loadedCheckin.armMeasure : ''}
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
                initialValue={loadedCheckin ? loadedCheckin.chestMeasure : ''}
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
                initialValue={loadedCheckin ? loadedCheckin.waistMeasure : ''}
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
                initialValue={loadedCheckin ? loadedCheckin.hipsMeasure : ''}
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
                initialValue={loadedCheckin ? loadedCheckin.thighMeasure : ''}
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
                initialValue={loadedCheckin ? loadedCheckin.calfMeasure : ''}
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