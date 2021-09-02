import React, { useContext, useState } from 'react';
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
import MainNavigation from '../../Shared/components/Navigation/MainNavigation';
import Axios from 'axios'

const NewClient = () => {
  const mode = useContext(DarkModeContext)
  const auth = useContext(AuthContext)
  const [url, setUrl] = useState()

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



const clientSubmitHandler = async(event) => {
  event.preventDefault()
  let res;

  async function uploadImage() {
    const formData = new FormData();
    formData.append('file', formState.inputs.image.value)
    formData.append("upload_preset", "coach-console-athletes")
    formData.append('cloud_name', "dbnapmpvm")
    try {
        res = await Axios.post("https://api.cloudinary.com/v1_1/dbnapmpvm/image/upload", 
        formData
      )
      } catch (err) {
          console.log("cloudinary didn't work")
        }
      }
  
      async function newClient() {
      if (res.data.url !== undefined) {
      let responseData
      try {
        responseData = await Axios.post(
          'http://localhost:5000/api/athletes', 
          {name: formState.inputs.name.value, creator: auth.userId, image: res.data.url}, 
          {headers: {Authorization: 'Bearer ' + auth.token}})
        } catch (err) {
          console.log(`something went wrong with the call ${err}`)
        }
        console.log(responseData)
      }
    }
    
    await uploadImage()
    await newClient()
    history.push('/clients')
    
  }
  





return(
    <div className={mode.darkMode ? "new-client-container dark-new-client" : "new-client-container"} style={{animation: "pageEnter 1s"}}>
    <MainNavigation />
    <ErrorModal error={error} onClear={clearError} />
  <form className={mode.darkMode ? "dark-new-client__form" : "light-new-client__form"} onSubmit={clientSubmitHandler}>
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
    <div className={mode.darkMode ? "dark-new-client-button__box" : "light-new-client-button__box"}>
    <Button
      type="submit"
      disabled={!formState.isValid}
      buttonStyle="new-client-button"
    >CREATE NEW CLIENT</Button>
    
    </div>
  </form>
  </div>
)
}

export default NewClient;