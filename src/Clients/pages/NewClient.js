import React, { useContext } from 'react';
import Input from '../../Shared/components/FormElements/Input';
import Button from '../../Shared/components/FormElements/Button';
import { useForm } from '../../Shared/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../../Shared/util/validators';
import './ClientForm.css';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import { AuthContext } from '../../Shared/context/auth-context';
import { DarkModeContext } from '../../Shared/context/dark-mode-context';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../Shared/components/UIElements/LoadingSpinner';
import { useHistory } from 'react-router-dom';
import ImageUpload from '../../Shared/components/FormElements/ImageUpload';

const NewClient = () => {
  const mode = useContext(DarkModeContext)
  const auth = useContext(AuthContext)

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm({
    name: {
      value: '',
      isValid: false
    },
    image: {
      value: null,
      isValid: false
    },
  },
 false
);

const history = useHistory();

const newClientSubmitHandler = async event => {
  event.preventDefault();
  console.log(formState.inputs);
  try {
    const formData = new FormData();
    formData.append('name', formState.inputs.name.value);
    formData.append('image', formState.inputs.image.value);
    formData.append('creator', auth.userId);
    await sendRequest(
      'http://localhost:5000/api/athletes', 
      'POST', 
      formData);
      history.push('/clients');   
  } catch (err) {}
  
}


return(
  <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
  <form className={mode.darkMode ? "dark-new-client__form" : "light-new-client__form"} onSubmit={newClientSubmitHandler}>
    {isLoading && <LoadingSpinner asOverlay />}
  <h2 className={mode.darkMode ? "dark-create-client-head" : "light-create-client-head"}>CREATE A NEW CLIENT</h2>
  <br />
    <Input 
      id="name"
      labelText="Name" 
      element="input" 
      type="text"  
      errorText="Please enter valid name" 
      validators={[VALIDATOR_REQUIRE()]} 
      onInput={inputHandler}
      importedStyle="new-client__inputs"
    />

    <ImageUpload 
      center 
      id="image" 
      onInput={inputHandler} 
      errorText="" />
    {/* <Input 
      id="image"
      label="Photo" 
      element="input" 
      type="file" 
      errorText="Please upload a photo" 
      validators={[VALIDATOR_REQUIRE()]} 
      onInput={inputHandler}
      importedStyle="new-client__inputs"
      /> */}
    <div className={mode.darkMode ? "dark-new-client-button__box" : "light-new-client-button__box"}>
    <Button
      type="submit"
      disabled={!formState.isValid}
      buttonStyle="new-client-button"
    >CREATE NEW CLIENT</Button>
    </div>
  </form>
  </React.Fragment>
)
}

export default NewClient;