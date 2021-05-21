import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Input from '../../Shared/components/FormElements/Input';
import Button from '../../Shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, } from '../../Shared/util/validators';
import Card from '../../Shared/components/UIElements/Card';
import { useForm } from '../../Shared/hooks/form-hook';
import './CheckinForm.css';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import LoadingSpinner from '../../Shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import { DarkModeContext } from '../../Shared/context/dark-mode-context';






const UpdateCheckin = () => {
  const mode = useContext(DarkModeContext);

  const loadedClient = useRef(null)

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedCheckin, setLoadedCheckin] = useState();

  const checkinId = useParams().checkinId;

  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm({
    date: {
      value: '',
      isValid: true
    },
    weight: {
      value: '',
      isValid: false
    },
    weeksOut: {
      value: '',
      isValid: false
    },
    bodyFat: {
      value: '',
      isValid: false
    },
    notes: {
      value: '',
      isValid: false
    }
  }, false)



  useEffect(() => {
    const fetchCheckin = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/checkins/${checkinId}`);
        setLoadedCheckin(responseData.checkin)
        loadedClient.current = responseData.checkin.athlete
        setFormData(
          {
            date: {
              value: responseData.checkin.date,
              isValid: true
            },
            weight: {
              value: responseData.checkin.weight,
              isValid: true
            },
            weeksOut: {
              value: responseData.checkin.weeksOut,
              isValid: true
            },
            bodyFat: {
              value: responseData.checkin.bodyFat,
              isValid: true
            },
            notes: {
              value: responseData.checkin.notes,
              isValid: true
            }
          }, true
        )
      } catch (err) {}
    }
    fetchCheckin();
  }, [sendRequest, checkinId, setFormData])

   

    const checkinUpdateSubmitHandler = async event => {
      event.preventDefault();
      try{
        await sendRequest(
          `http://localhost:5000/api/checkins/${checkinId}`,
          'PATCH',
          JSON.stringify({
            date: formState.inputs.date.value,
            weight: formState.inputs.weight.value,
            bodyFat: formState.inputs.bodyFat.value,
            weeksOut: formState.inputs.weeksOut.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        history.push('/' + loadedClient.current + '/checkins');
        

      } catch (err) {
        console.log(err);
      }
    };

    
    
    if (isLoading) {
      return <div className="center">
      <Card>
        <LoadingSpinner />
      </Card>
    </div>
    }

    if (!loadedCheckin && !error) {
      return <div className="center">
        <Card>
          <h2>Cound not find checkin!</h2>
        </Card>
      </div>
    }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
    {!isLoading && loadedCheckin && <form className={mode.darkMode ? "dark-checkin-form" : "light-checkin-form"} onSubmit={checkinUpdateSubmitHandler}>
    <h2 className={mode.darkMode ? "dark-checkin-title" : "light-checkin-title"}>What would you like to change?</h2>
    <br />
    <br />
    <div className="input-group__4">
    <Input 
      id="date"
      element= "input"
      type="date"
      labelText="Date"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid date."
      onInput={inputHandler}
      initialValue={loadedCheckin.date}
      initialValid={true}
      importedStyle="group-4"
    />
    <Input 
      id="weight"
      element= "input"
      type="text"
      labelText="Weight"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid weight."
      onInput={inputHandler}
      initialValue={loadedCheckin.weight}
      initialValid={true}
      importedStyle="group-4"
    />
    <Input 
      id="weeksOut"
      element= "input"
      type="text"
      labelText="Weeks Out"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter week of diet."
      onInput={inputHandler}
      initialValue={loadedCheckin.weeksOut}
      initialValid={true}
      importedStyle="group-4"
    />
    <Input 
      id="bodyfat"
      element= "input"
      type="text"
      labelText="BodyFat %"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid bf%."
      onInput={inputHandler}
      initialValue={loadedCheckin.bodyFat}
      initialValid={true}
      importedStyle="group-4"
    />
    </div>
    <div className="button-box">
    <Button 
      type="submit" 
      disabled={!formState.isValid}
      buttonStyle="update-button"
      >UPDATE CHECKIN</Button>
    </div>

  </form>}
  </React.Fragment> 
  
    )
  
}

export default UpdateCheckin;