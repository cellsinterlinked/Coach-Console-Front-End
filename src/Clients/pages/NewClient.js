import React from 'react';
import Input from '../../Shared/components/FormElements/Input';
import Button from '../../Shared/components/FormElements/Button';
import { useForm } from '../../Shared/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../../Shared/util/validators';
import './ClientForm.css';

const NewClient = () => {

  const [formState, inputHandler] = useForm({
    name: {
      value: '',
      isValid: false
    },
    image: {
      value: '',
      isValid: false
    },
  },
 false
);

const newClientSubmitHandler = event => {
  event.preventDefault();
  console.log(formState.inputs)
}


return(
  <form className="new-client__form" onSubmit={newClientSubmitHandler}>
  <h2>CREATE A NEW CLIENT</h2>
  <hr />
    <Input 
      id="name"
      label="Name" 
      element="input" 
      type="text"  
      errorText="Please enter valid name" 
      validators={[VALIDATOR_REQUIRE()]} 
      onInput={inputHandler}
      importedStyle="new-client__inputs"
    />
    <Input 
      id="image"
      label="Photo" 
      element="input" 
      type="file" 
      errorText="Please upload a photo" 
      validators={[VALIDATOR_REQUIRE()]} 
      onInput={inputHandler}
      importedStyle="new-client__inputs"
      />
    <div className="new-client-button__box">
    <Button
      type="submit"
      disabled={!formState.isValid}
      buttonStyle="new-client-button"
    >CREATE NEW CLIENT</Button>
    </div>
  </form>
)
}

export default NewClient;