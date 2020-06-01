import React from 'react';                     //use callback will wrap out ageinputhandler and give it dependencies so it doesnt keep rerendering and causing and infinite loop
import Input from '../../Shared/components/FormElements/Input';
import Button from '../../Shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE } from '../../Shared/util/validators';
import { useForm } from '../../Shared/hooks/form-hook';
import './CheckinForm.css'

const NewCheckin = () => {

  const [formState, inputHandler] = useForm({
      age: {
        value: 0,
        isValid: false
      },
      weeks: {
        value: 0,
        isValid: false
      },
      weight: {
        value: 0,
        isValid: false
      },
      date: {
        value: '',
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
        value: '',
        isValid: false
      }
      
    },
   false
  );

 const checkinSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
    

  };

  // const bfSubmitHandler = (formState) => {
  //   if (formState.sex.value === 1) {
  //     1.112 - 
  //   }
  // }
// var sum = 0

//   const findSum = (formState) => {
//     sum = 4 + 4 + 4
//   }
  
  // const maleBf = 1.112 - (0.00043499 * sum) + (0.00000055 * sum^2) - (0.00028826 * age);
  // const femaleBf = 1.097 - (0.00046971 * sum) + (0.00000056 * sum ) - (0.00012828 * age)
  // const sum = 59
  

  return (
    <form className="checkin-form" onSubmit={checkinSubmitHandler}>
    <p className="title-checkin">New Checkin</p>
    <div className="selectors">
      <select id="sex" name="sex" className="drop-down">
        <option value="0">Select Sex</option>
        <option value="1">Male</option>
        <option value="2">Female</option>
      </select>
      <Input 
      id="date"
      label="date" 
      element="input" 
      type="date" 
      importedStyle="num" 
      errorText="Please enter valid date" 
      validators={[VALIDATOR_REQUIRE()]} 
      onInput={inputHandler}
      
      />
    <Input 
      id="age"
      label="Age" 
      element="input" 
      type="number" 
      importedStyle="num" 
      errorText="Please enter valid age" 
      validators={[VALIDATOR_REQUIRE()]} 
      onInput={inputHandler}
      
      />

    <Input 
      id="weeks"
      label="Week#" 
      element="input" 
      type="number"  
      importedStyle="num"
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
      />
    </div>

    <Input
      id="weight" 
      element="input" 
      type="number" 
      label="Weight"
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
      />

    <div className="measurements-form">
    <Input
      id="chest" 
      element="input" 
      type="number" 
      label="Chest" 
      importedStyle="num" 
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
      />

    <Input 
      id="axilla"
      element="input" 
      type="number" 
      label="Axilla" 
      importedStyle="num" 
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
      />

    <Input 
      id="tricep"
      element="input" 
      type="number" 
      label="Tricep" 
      importedStyle="num" 
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
      />

    <Input 
      id="subscapular"
      element="input" 
      type="number" 
      label="Subscapular" 
      importedStyle="num" 
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
      />

    <Input 
      id="abdominal"
      element="input" 
      type="number" 
      label="Abdominal" 
      importedStyle="num" 
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
      />

    <Input
      id="suprailiac"
      element="input" 
      type="number" 
      label="Suprailiac" 
      importedStyle="num" 
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
      />

    <Input 
      id="thigh"
      element="input" 
      type="number" 
      label="Thigh" 
      importedStyle="num" 
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
      />
    </div>

    <Input 
      id="notes"
      type="text" 
      label="Notes" 
      validators={[VALIDATOR_REQUIRE()]}
      onInput={inputHandler}
      />

    <div className="submit-checkin">
      <Button 
        // buttonStyle="submit-button" 
        type="submit" disabled={!formState.isValid} 
        >Add Checkin</Button>
    </div>
    </form>
   )
 }
 
 export default NewCheckin
    
    
    



