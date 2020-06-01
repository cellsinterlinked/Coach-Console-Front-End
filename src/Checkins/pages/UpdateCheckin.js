import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../Shared/components/FormElements/Input';
import Button from '../../Shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, } from '../../Shared/util/validators';
import Card from '../../Shared/components/UIElements/Card';
import { useForm } from '../../Shared/hooks/form-hook';
import './CheckinForm.css'

const DUMMY_CHECKINS = [
  {
    id: "ci1",
    name: "Dana Linn Bailey",
    date: "24/04/2020",
    weight: 136.2,
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.girlswithmuscle.com%2Fimages%2Ffull%2F1217320.jpg&f=1&nofb=1",
    show_date: "01/06/2020",
    weeks_in:  6,
    bodyfat: 9.9,
    bf_loss: 1.6,
    total_loss: 8.3,
    week_loss: 2,
    client: "c2",
    creator: 'u1',
    notes: "Lowered carbs to 90per day except on refeed"

  },
  {
    id: 'ci2',
    name: "Dana Linn Bailey",
    date: "01/05/2020",
    weight: 135,
    imageUrl:"https://s-media-cache-ak0.pinimg.com/736x/d6/f0/cb/d6f0cb767b7faf274262bd6a774e41e1--chicas-fitness-fitness-girls.jpg",
    show_date: "01/06/2020",
    weeks_in: 7,
    bodyfat: 8.54,
    bf_loss: 1.36,
    total_loss: 9.5,
    week_loss: 1.2,
    client:'c2',
    creator: 'u1',
    notes: "Added extra 30 minutes of cardio twice a week"
  }
]


const UpdateCheckin = () => {
  const [isLoading, setIsLoading] = useState(true);

  const checkinId = useParams().checkinId;

  const [formState, inputHandler, setFormData] = useForm({
    date: {
      value: '',
      isValid: true
    },
    weight: {
      value: '',
      isValid: false
    },
    weeks_in: {
      value: '',
      isValid: false
    },
    bodyfat: {
      value: '',
      isValid: false
    },
    notes: {
      value: '',
      isValid: false
    }
  }, false)

  const identifiedCheckin = DUMMY_CHECKINS.find(c => c.id === checkinId)

    useEffect(() => {
  if (identifiedCheckin) {
    setFormData(
      {
        date: {
          value: identifiedCheckin.date,
          isValid: true
        },
        weight: {
          value: identifiedCheckin.weight,
          isValid: true
        },
        weeks_in: {
          value: identifiedCheckin.weeks_in,
          isValid: true
        },
        bodyfat: {
          value: identifiedCheckin.bodyfat,
          isValid: true
        },
        notes: {
          value: identifiedCheckin.notes,
          isValid: true
        }
      }, true
    )
    }
    setIsLoading(false);
  }, [setFormData, identifiedCheckin]);

    const checkinUpdateSubmitHandler = event => {
      event.preventDefault();
      console.log(formState.inputs);
    }

    if (!identifiedCheckin) {
      return <div className="center">
        <Card>
          <h2>Cound not find checkin!</h2>
        </Card>
      </div>
    }
    if (isLoading) {
      return <div className="center">
      <Card>
        <h2>Loading...</h2>
      </Card>
    </div>
    }

  return (
      
    <form className="checkin-form" onSubmit={checkinUpdateSubmitHandler}>
    <h2 className="update-title">What would you like to change?</h2>
    <hr />
    <div className="input-group__4">
    <Input 
      id="date"
      element= "input"
      type="date"
      label="Date"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid date."
      onInput={inputHandler}
      initialValue={formState.inputs.date.value}
      initialValid={formState.inputs.date.isValid}
      importedStyle="group-4"
    />
    <Input 
      id="weight"
      element= "input"
      type="text"
      label="Weight"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid weight."
      onInput={inputHandler}
      initialValue={formState.inputs.weight.value}
      initialValid={formState.inputs.weight.isValid}
      importedStyle="group-4"
    />
    <Input 
      id="weeks_in"
      element= "input"
      type="text"
      label="Weeks In"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter week of diet."
      onInput={inputHandler}
      initialValue={formState.inputs.weeks_in.value}
      initialValid={formState.inputs.weeks_in.isValid}
      importedStyle="group-4"
    />
    <Input 
      id="bodyfat"
      element= "input"
      type="text"
      label="BodyFat %"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid bf%."
      onInput={inputHandler}
      initialValue={formState.inputs.bodyfat.value}
      initialValid={formState.inputs.bodyfat.isValid}
      importedStyle="group-4"
    />
    </div>
    <Input 
      id="notes"
      type="text"
      label="notes"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid note."
      onInput={inputHandler}
      initialValue={formState.inputs.notes.value}
      initialValid={formState.inputs.notes.isValid}
      importedStyle="text-box"
    />
    <div className="button-box">
    <Button 
      type="submit" 
      disabled={!formState.isValid}
      buttonStyle="update-button"
      >UPDATE CHECKIN</Button>
    </div>

  </form>
  
    )
  
}

export default UpdateCheckin;