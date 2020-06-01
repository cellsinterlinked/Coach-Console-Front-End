import React, { useState, useContext } from 'react'
import Card from '../../Shared/components/UIElements/Card';
import Button from '../../Shared/components/FormElements/Button';
import Input from '../../Shared/components/FormElements/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../Shared/util/validators'; 
import { useForm } from '../../Shared/hooks/form-hook';
import { AuthContext } from '../../Shared/context/auth-context';

import './Auth.css'

const Auth = () => {
  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true)

  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    }
  }, false)

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData({name: undefined}, 
        formState.inputs.email.isValid && 
        formState.inputs.password.isValid); //when we are in login mode we drop the form input of name and only worry about the other two  
    } else {                              //when in signup mode
      setFormData({
        ...formState.inputs,              //include name in the form data
        name: {
          value: '',
          isValid: false
        }
      },
      false
      )
    }
    setIsLoginMode(prevMode => !prevMode);
  }
  

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login()
  }

  return (
  <Card className="authentication">
    <h2>Login Required</h2>
    <hr />
    <form onSubmit={authSubmitHandler}>
      {!isLoginMode && (
      <Input 
        element="input"
        id="name"
        type="text"
        label="Your Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter your name."
        onInput={inputHandler}
        importedStyle="box"
      />
      )}
      <Input 
        id="email" 
        element="input" 
        type="email" 
        label="email" 
        validators={[VALIDATOR_EMAIL()]} 
        errorText="Please enter a valid email address."
        onInput={inputHandler}
        importedStyle="box"
        />
        <Input 
        id="password" 
        element="input" 
        type="password" 
        label="password" 
        validators={[VALIDATOR_MINLENGTH(5)]} 
        errorText="Please enter a password (minimum 5 characters)."
        onInput={inputHandler}
        importedStyle="box"
        />
        <Button 
          type="submit" 
          disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}</Button>
    </form>
    <Button 
      inverse 
      onClick={switchModeHandler}>
      {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
  </Card>
  )
}

export default Auth;
